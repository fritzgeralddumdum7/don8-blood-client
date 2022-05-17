import { useState, useEffect } from 'react';
import Wrapper from '@/components/Wrapper';
import {
  Table,
  Card,
  Badge,
  Button,
  Stack,
  TextInput,
  Select,
  Group,
  Drawer,
  Text,
  ListItem
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Clock, Pencil, Receipt, Receipt2, Trash } from 'tabler-icons-react';
import AlertDialog from '@/components/AlertDialog';
import { BloodType, Case, BloodRequest, RequestType, User } from '@/services';
import moment from 'moment';
import { useAuth } from '@/contexts/AuthProvider';
import {formatDateTime} from '@/helpers';

const Requests = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  //for dropdowns items
  const [cases, setCases] = useState([]); 
  const [requestTypes, setRequestTypes] = useState([]); 
  const [bloodTypes, setBloodTypes] = useState([]); 
  const [patients, setPatients] = useState([]); 
  //for table items
  const [bloodRequests, setBloodRequests] = useState([]);
  //selected blood request
  const [bloodRequestId, setBloodRequestId] = useState(0);
  
  const auth = useAuth();

  const form = useForm({
    initialValues: {
      date_time: new Date(),
      user_id: '', 
      case_id: '',
      request_type_id: '',
      blood_type_id: ''      
    },

    validate: {
      date_time: (value) => value ? null : 'No schedule',
      case_id: (value) => value ? null : 'No selected case',
      request_type_id: (value) => value ? null : 'No selected request type',
      blood_type_id: (value) => value ? null : 'No selected blood type',
    },
  });

  //for edit on modal   
  const getSpecificBloodRequest = (id) => {
    setBloodRequestId(id);
    BloodRequest.getSpecificBloodRequest(id).then((response) => {
      var bloodRequest = response.data.data[0];
      form.setValues({date_time: new Date(bloodRequest.attributes.date_time),
                      time: new Date(bloodRequest.attributes.date_time),
                      user_id: bloodRequest.attributes.user_id.toString(),
                      blood_type_id: bloodRequest.attributes.blood_type_id.toString(),
                      request_type_id: bloodRequest.attributes.request_type_id.toString(),
                      case_id: bloodRequest.attributes.case_id.toString()});   
                         
      setErrors(response.data.errors);            
    }).catch(err => console.log(err));    
  }    

  //table items
  const getBloodRequests = () => {
    BloodRequest.getBloodRequests().then((response) => {
      setBloodRequests(response.data.data);    
    }).catch(err => console.log(err));
  };

  useEffect(() => {
    getBloodRequests();
  }, []);

  //dropdown items
  useEffect(() => {
    const getPatients = () => {
      User.getByRole(3).then((response) => {//Role ID 3 = patient
        setPatients(response.data.data);    
      }).catch(err => console.log(err));
    };

    getPatients();
  }, []);

  //dropdown items
  useEffect(() => {
    const getBloodTypes = () => {
      BloodType.getBloodTypes().then((response) => {
        setBloodTypes(response.data.data);    
      }).catch(err => console.log(err));
    };

    getBloodTypes();
  }, []);

  //dropdown items
  useEffect(() => {
    const getCases = () => {
      Case.getCases().then((response) => {
        setCases(response.data.data);    
      }).catch(err => console.log(err));
    };

    getCases();
  }, []);

  //dropdown items
  useEffect(() => {
    const getRequestTypes = () => {
      RequestType.getRequestTypes().then((response) => {
        setRequestTypes(response.data.data);    
      }).catch(err => console.log(err));
    };

    getRequestTypes();
  }, []);

  const createBloodRequest = (payload) => {
    var final_date_time = formatDateTime(payload.date_time, payload.time);
    BloodRequest.create({...payload, date_time: final_date_time, organization_id: auth.user?.organization_id}).then((response) => {
      console.log(response.data);
      getBloodRequests();
      setErrors(response.data.errors);
      setIsDrawerOpened(false);      
    }).catch(err => console.log(err));    
  }

  const updateBloodRequest = (payload) => {
    BloodRequest.update(bloodRequestId, payload).then((response) => {
      getBloodRequests();
      setErrors(response.data.errors);
      setIsDrawerOpened(false);      
      setIsEdit(false);
      console.log(response.data.errors);
    }).catch(err => console.log(err));    
  }

  const closeBloodRequest = (id) => {
    BloodRequest.close(id).then((response) => {
      getBloodRequests();      
    }).catch(err => console.log(err));    
  }

  const rows = bloodRequests.map((element) => (
    <tr key={element.id}>
      <td>{element.attributes.code}</td>
      <td>{element.attributes.patient_name}</td>
      <td>{element.attributes.blood_type_name}</td>
      <td>{element.attributes.request_type_name}</td>
      <td>{element.attributes.case_name}</td>
      <td>{moment(element.attributes.date_time).format('MM/DD/YYYY hh:mm a')}</td>
      <td>
        <Badge color={element.attributes.is_closed? 'gray' : 'red'} variant="filled">{element.attributes.is_closed? 'Closed' : 'Pending'}</Badge>
      </td>
      <td>
        <Button leftIcon={<Pencil />} onClick={() => {
          getSpecificBloodRequest(element.id);
          setIsDrawerOpened(true);
          setIsEdit(true);
        }}>
          Edit
        </Button>
        <Button ml={8} color='red' leftIcon={<Trash />} onClick={() => setIsDialogOpened(true)}>
          Delete
        </Button>
        <Button ml={8} color='gray' leftIcon={<Clock />} onClick={() => closeBloodRequest(element.id)}>
          Close
        </Button>
      </td>
    </tr>
  ));

  return (
    <Wrapper>
      <Drawer
        opened={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
        title={isEdit ? 'Edit Request' : 'Create Request'}
        padding="xl"
        size="xl"
        styles={() => ({
          title: { fontWeight: 'bold' }
        })}
      >
        <form onSubmit={form.onSubmit((values) => isEdit? updateBloodRequest(values) : createBloodRequest(values))}>
          <Stack>
            <DatePicker 
              placeholder="Select date" 
              label="Event date" 
              minDate={new Date()}
              required 
              {...form.getInputProps('date_time')}
            />
            <TimeInput 
              label="Pick time" 
              format="12" 
              {...form.getInputProps('time')}
            />
            <Select
                label="Patient Name"
                placeholder="Select here"
                {...form.getInputProps('user_id')}
                data = {patients.map(element => {
                  let item = {};
                  item["value"] = element.id;
                  item["label"] = element.attributes.name;
                  return item;
                })}
                searchable
              />
            <Select
              label="Blood Type"
              placeholder="Select here"
              {...form.getInputProps('blood_type_id')}
              data = {bloodTypes.map(element => {
                let item = {};
                item["value"] = element.id;
                item["label"] = element.attributes.name;
                return item;
              })}
              searchable
            />
            <Select
              label="Request Type"
              placeholder="Select here"
              {...form.getInputProps('request_type_id')}
              data = {requestTypes.map(element => {
                let item = {};
                item["value"] = element.id;
                item["label"] = element.attributes.name;
                return item;
              })}
              searchable
            />
            <Select
              label="Case Type"
              placeholder="Select here"
              {...form.getInputProps('case_id')}
              data={cases.map(element => {
                let item = {};
                item["value"] = element.id;
                item["label"] = element.attributes.name;
                return item;
              })}
              searchable
            />
            <Button type='submit'>Save</Button>
          </Stack>
        </form>        
      </Drawer>
      <AlertDialog
        isToggled={isDialogOpened}
        setIsToggled={setIsDialogOpened}
        text='Would you like to delete?'
        type='delete'
      />
      <Card shadow="sm" mt='sm'>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Request Code</th>
              <th>Patient</th>
              <th>Blood Type</th>
              <th>Request Type</th>
              <th>Case</th>
              <th>Schedule</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Card>
      <Group position="right" py='md'>
        <Button onClick={() => {
          setIsDrawerOpened(true);
          setIsEdit(false);
        }}>Create Request</Button>
      </Group>
    </Wrapper>
  );
}

export default Requests;
