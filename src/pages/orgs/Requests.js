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
import { Pencil, Trash } from 'tabler-icons-react';
import AlertDialog from '@/components/AlertDialog';
import { BloodType, Case, BloodRequest, RequestType } from '@/services';
import moment from 'moment';

const Requests = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  //for dropdowns items
  const [cases, setCases] = useState([]); 
  const [requestTypes, setRequestTypes] = useState([]); 
  const [bloodTypes, setBloodTypes] = useState([]); 
  //for table items
  const [bloodRequests, setBloodRequests] = useState([]);
  
  const form = useForm({
    initialValues: {
      date_time: new Date(),
      user_id: 3,
      case_id: '',
      organization_id: 5,
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

  //table items
  useEffect(() => {
    const getBloodRequests = () => {
      BloodRequest.getBloodRequests().then((response) => {
        setBloodRequests(response.data.data);    
      }).catch(err => console.log(err));
    };

    getBloodRequests();
  }, []);

  //for edit on modal   
  const getSpecificBloodRequest = (id) => {
    BloodRequest.getSpecificBloodRequest(id).then((response) => {
      form.setValues({date_time: new Date(response.data.data[0].attributes.date_time),
                      user_id: response.data.data[0].attributes.user_id.toString(),
                      blood_type_id: response.data.data[0].attributes.blood_type_id.toString(),
                      request_type_id: response.data.data[0].attributes.request_type_id.toString(),
                      case_id: response.data.data[0].attributes.case_id.toString()});   
                         
      setErrors(response.data.errors);      
      console.log(form.values);
    }).catch(err => console.log(err));    
  }    

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
    BloodRequest.create(payload).then((response) => {
      setErrors(response.data.errors);
      setIsDrawerOpened(false);      
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
        <Badge color='red' variant="filled">Pending</Badge>
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
        <form onSubmit={form.onSubmit((values) => createBloodRequest(values))}>
          <Stack>
            <DatePicker 
              placeholder="Select date" 
              label="Event date" 
              required 
              {...form.getInputProps('date_time')}
            />
            <TimeInput 
              label="Pick time" 
              format="12" 
              {...form.getInputProps('date_time')}
            />
            <Select
                label="Patient Name"
                placeholder="Select here"
                {...form.getInputProps('user_id')}
                data = {[{ value: '3', label: 'Erma Win' },
                { value: '6', label: 'Vinna Vinz' },
                { value: '9', label: 'Prets' },
              ]}
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
              <th>Tran. Code</th>
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
