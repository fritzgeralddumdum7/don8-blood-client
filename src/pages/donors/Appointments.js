import { useState, useEffect } from 'react';
import Wrapper from '@/components/Wrapper';
import { Table, Card, Badge, Button, Group, Drawer, Stack } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Receipt } from 'tabler-icons-react';
import { Appointment } from '@/services';
import moment from 'moment';

const Appointments = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  //for table items
  const [donorAppointments, setAppointments] = useState([]);
  
  const form = useForm({
    initialValues: {
      date_time: new Date(),
      user_id: 3, //change this with donor's id
      blood_request_id: '',
    },

    validate: {
      date_time: (value) => (value ? null : "No schedule"),
      blood_request_id: (value) => (value ? null : "No selected request"),
    },
  });

  //for edit on modal   
  const getSpecificAppoinment = (id) => {
    Appointment.getSpecificAppointment(id).then((response) => {
      var appointment = response.data.data[0]
      form.setValues({date_time: new Date(appointment.attributes.date_time),
                      user_id: appointment.attributes.user_id.toString(),
                      blood_request_id: appointment.attributes.blood_request_id.toString()});   
                         
      setErrors(response.data.errors);            
    }).catch(err => console.log(err));    
  }

  const updateAppointment = (payload) => {
    Appointment.update(7, payload).then((response) => { //change this with appointment id
      setErrors(response.data.errors);
      setIsDrawerOpened(false);      
      console.log(response.data.errors);
    }).catch(err => console.log(err));    
  }

  useEffect(() => {
    const getDonorAppointments = () => {
      Appointment.getDonorAppointments(6).then((response) => { //change this with donor's id
        setAppointments(response.data.data);    
      }).catch(err => console.log(err));
    };

    getDonorAppointments();
  }, []);

  const rows = donorAppointments.map((element) => (
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
          <Button leftIcon={<Receipt />} onClick={() => {
          getSpecificAppoinment(element.id);
          setIsDrawerOpened(true);
          setIsEdit(true);
          }}>
            Rebook
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
        title={isEdit ? 'Edit Appoinment' : 'Create Appoinment'}
        padding="xl"
        size="xl"
        styles={() => ({
          title: { fontWeight: 'bold' }
        })}
      >
        <form onSubmit={form.onSubmit((values) => updateAppointment(values))}>
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
            <Button type='submit'>Save</Button>
          </Stack>
        </form>        
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