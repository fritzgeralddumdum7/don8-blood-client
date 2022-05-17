import { useState, useEffect } from 'react';
import Wrapper from '@/components/Wrapper';
import { Table, Card, Badge, Button, Group, Drawer, Stack } from '@mantine/core';
import { Receipt } from 'tabler-icons-react';
import { Appointment } from '@/services';
import moment from 'moment';
import { useAuth } from '@/contexts/AuthProvider';

const Donations = () => {
  //for table items
  const [orgAppointments, setOrgAppointments] = useState([]);

  const auth = useAuth();

  const getOrgAppointments = () => {
    console.log(auth.user?.role);
    Appointment.getOrgDoneAppointments(auth.user?.organization_id).then((response) => {
      setOrgAppointments(response.data.data);    
    }).catch(err => console.log(err));
  };

  useEffect(() => {
    getOrgAppointments();
  }, []);

  const rows = orgAppointments.map((element) => (
    <tr key={element.id}>
      <td>{element.attributes.donor_name}</td>
      <td>{element.attributes.blood_type_name}</td>
      <td>{element.attributes.request_type_name}</td>
      <td>{element.attributes.case_name}</td>
      <td>{moment(element.attributes.date_time).format('MM/DD/YYYY hh:mm a')}</td>
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

export default Donations;