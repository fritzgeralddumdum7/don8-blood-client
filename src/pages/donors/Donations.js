import { useState, useEffect } from 'react';
import Wrapper from '@/components/Wrapper';
import { Table, Card, Badge, Button, Group, Drawer, Stack, Modal } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Receipt } from 'tabler-icons-react';
import { Appointment } from '@/services';
import moment from 'moment';
import { useAuth } from '@/contexts/AuthProvider';

const Donations = () => {
  const [opened, setOpened] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  //for table items
  const [donorAppointments, setDonorAppointments] = useState([]);
  //selected appointment
  const [appointmentId, setAppointmentId] = useState(0);

  const auth = useAuth();

  //table items
  const getDonorAppointments = (user_id) => {
    Appointment.getDonorDoneAppointments(user_id).then((response) => { //donor's id
      setDonorAppointments(response.data.data);    
    }).catch(err => console.log(err));
  };

  useEffect(() => {
    if (auth.user)
      getDonorAppointments(auth.user.id);
  }, [auth]);

  const rows = donorAppointments.map((element) => (
    <tr key={element.id}>
      <td>{element.attributes.organization_name}</td>
      <td>{element.attributes.blood_type_name}</td>
      <td>{element.attributes.request_type_name}</td>
      <td>{element.attributes.case_name}</td>
      <td>{moment(element.attributes.date_time).format('MM/DD/YYYY hh:mm a')}</td>
      <td>{element.attributes.blood_request_code}</td>
      <td>
        <Badge color={element.attributes.is_completed? 'green' : 'red' } variant="filled">
          {element.attributes.is_completed? 'Completed' : 'Pending'}          
        </Badge>
      </td>
      <td>
        <Group>
          <Button leftIcon={<Receipt />} color='blue'>
            View Details
          </Button>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Wrapper>
      <Card shadow="sm" mt="sm">
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Organization</th>
              <th>Blood Type</th>
              <th>Request Type</th>
              <th>Case</th>
              <th>Schedule</th>
              <th>Request Code</th>
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

export default Donations;