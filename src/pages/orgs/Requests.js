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
import { Pencil, Trash } from 'tabler-icons-react';
import AlertDialog from '@/components/AlertDialog';
import { BloodType, Case, Organization, BloodRequest, RequestType } from '@/services';

const Requests = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  //for dropdowns items
  const [cases, setCases] = useState([]); 
  const [organizations, setOrganizations] = useState([]); 
  const [requestTypes, setRequestTypes] = useState([]); 
  const [bloodTypes, setBloodTypes] = useState([]); 
  //for dropdown values
  const [valueCase, setValueCase] = useState('');
  const [valueOrganization, setValueOrganization] = useState('');
  const [valueRequestType, setValueRequestType] = useState('');
  const [valueBloodType, setValueBloodType] = useState('');
  //for table items
  const [bloodRequests, setBloodRequests] = useState([]);

  useEffect(() => {
    const getBloodRequests = () => {
      BloodRequest.getBloodRequests().then((response) => {
        setBloodRequests(response.data.data);    
      }).catch(err => console.log(err));
    };

    getBloodRequests();
  }, []);

  useEffect(() => {
    const getBloodTypes = () => {
      BloodType.getBloodTypes().then((response) => {
        setBloodTypes(response.data.data);    
      }).catch(err => console.log(err));
    };

    getBloodTypes();
  }, []);

  useEffect(() => {
    const getCases = () => {
      Case.getCases().then((response) => {
        setCases(response.data.data);    
      }).catch(err => console.log(err));
    };

    getCases();
  }, []);

  useEffect(() => {
    const getOrganizations = () => {
      Organization.getOrganizations().then((response) => {
        setOrganizations(response.data.data);    
      }).catch(err => console.log(err));
    };

    getOrganizations();
  }, []);

  useEffect(() => {
    const getRequestTypes = () => {
      RequestType.getRequestTypes().then((response) => {
        setRequestTypes(response.data.data);    
      }).catch(err => console.log(err));
    };

    getRequestTypes();
  }, []);

  const createBloodRequest = () => {
    const payload = {
      "date_time": "2022-05-10 08:00",
      "user_id": 6,
      "case_id": valueCase,
      "organization_id": valueOrganization,
      "request_type_id": valueRequestType,
      "blood_type_id": valueBloodType
    };

    BloodRequest.create(payload).then((response) => {
      setErrors(response.data.errors);      
    }).catch(err => console.log(err));
    setIsDrawerOpened(false);
  }

  const rows = bloodRequests.map((element) => (
    <tr key={element.id}>
      <td>{element.attributes.code}</td>
      <td>{element.attributes.patient_name}</td>
      <td>{element.attributes.blood_type_name}</td>
      <td>{element.attributes.request_type_name}</td>
      <td>{element.attributes.case_name}</td>
      <td>{element.attributes.date_time}</td>
      <td>
        <Badge color='red' variant="filled">Pending</Badge>
      </td>
      <td>
        <Button leftIcon={<Pencil />} onClick={() => {
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
        <Stack>
          <DatePicker placeholder="Pick date" label="Event date" required />
          <TimeInput label="Pick time" format="12" defaultValue={new Date()} />
          <Select
              label="Patient Name"
              placeholder="Select here"
              data = {[{ value: '3', label: 'Erma Win' },
              { value: '6', label: 'Vinna Vinz' },]}
              searchable
            />
          <Select
            label="Blood Type"
            placeholder="Select here"
            value = {valueBloodType}
            onChange = {setValueBloodType}
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
            value = {valueRequestType}
            onChange = {setValueRequestType}
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
            value = {valueCase}
            onChange = {setValueCase}
            data={cases.map(element => {
              let item = {};
              item["value"] = element.id;
              item["label"] = element.attributes.name;
              return item;
            })}
            searchable
          />
          <Select
            label="Organization"
            placeholder="Select here"
            value = {valueOrganization}
            onChange = {setValueOrganization}
            data={organizations.map(element => {
              let item = {};
              item["value"] = element.id;
              item["label"] = element.attributes.name;
              return item;
            })}
            searchable
          />
          <Button onClick={createBloodRequest}>Save</Button>
        </Stack>
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
              <th>Blood Request Type</th>
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
