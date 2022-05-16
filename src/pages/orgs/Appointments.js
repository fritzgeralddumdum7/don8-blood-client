import { useState, useEffect } from 'react';
import Wrapper from '@/components/Wrapper';
import { Table, Card, Badge, Button, Group, Drawer, Stack } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { Receipt } from 'tabler-icons-react';
import { Appointment } from '@/services';
import moment from 'moment';

const Appointments = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  //for ui values
  const [valueDate, setValueDate] = useState(new Date());
  const [valueTime, setValueTime] = useState(new Date());
  //for table items
  const [orgAppointments, setOrgAppointments] = useState([]);

  const getOrgAppointments = () => {
    Appointment.getAppointments().then((response) => {
      setOrgAppointments(response.data.data);    
    }).catch(err => console.log(err));
  };

  useEffect(() => {
    getOrgAppointments();
  }, []);

  const updateAppointment = () =>{
     
  }

  const rows = orgAppointments.map((element) => (
    <tr key={element.id}>
      <td>{element.attributes.donor_name}</td>
      <td>{element.attributes.blood_type_name}</td>
      <td>{element.attributes.request_type_name}</td>
      <td>{element.attributes.case_name}</td>
      <td>{moment(element.attributes.date_time).format('MM/DD/YYYY hh:mm a')}</td>
      <td>
        <Badge color='red' variant="filled">Pending</Badge>
      </td>
      <td>
        <Group>
          <Button leftIcon={<Receipt />}>
            Verify
          </Button>
          <Button leftIcon={<Receipt />} color='red'>
            Cancel
          </Button>
        </Group>
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
          <DatePicker 
            placeholder="Select date" 
            label="Event date" 
            required 
            value={valueDate}
            onChange={setValueDate}
          />
          <TimeInput 
            label="Pick time" 
            format="12" 
            value={valueTime}
            onChange={setValueTime}
          />
          <Button onClick={updateAppointment}>Save</Button>
        </Stack>
      </Drawer>
      <Card shadow="sm" mt='sm'>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Donor</th>
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
    </Wrapper>
  );
}

export default Appointments;