import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Wrapper from '@/components/Wrapper';
import Table from '@/components/Table';
import AlertDialog from '@/components/AlertDialog';
import { Badge, Button, Group } from '@mantine/core';
import { Receipt } from 'tabler-icons-react';
import { Appointment } from '@/services';
import moment from 'moment';


const Appointments = () => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [toProceed, setToProceed] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [errors, setErrors] = useState({});
  //for ui values
  const [valueDate, setValueDate] = useState(new Date());
  const [valueTime, setValueTime] = useState(new Date());
  //for table items
  const [orgAppointments, setOrgAppointments] = useState([]);
  //selected appointment
  const [appointmentId, setAppointmentId] = useState(0);

  const {authUser} = useSelector(state => state.users )

  const COLUMNS = [
    'Donor',
    'Blood Type',
    'Request Type',
    'Case',
    'Schedule',
    'Request Code',
    'Status',
    'Actions'
  ];

  const getOrgAppointments = () => {
    Appointment.getOrgAllAppointments().then((response) => {
      setOrgAppointments(response.data.data);    
    }).catch(err => console.log(err));
  };

  useEffect(() => {
    if (authUser)
      getOrgAppointments();
  }, [authUser]);

  const completeAppointment = (id) => {
    Appointment.complete(id).then((response) => {
      getOrgAppointments();      
      console.log(response.data.errors);
    }).catch(err => console.log(err));    
  }

  const cancelAppointment = () => {
    Appointment.cancel(appointmentId).then((response) => {
      getOrgAppointments();
    }).catch(err => console.log(err));
    setToProceed(false);//reset
  }

  useEffect(() => {   
    if (toProceed && transactionType === 'cancel')
      cancelAppointment();         
  }, [toProceed]);

  const rows = orgAppointments.map((element) => (
    <tr key={element.id}>
      <td>{element.attributes.donor_name}</td>
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
          <Button leftIcon={<Receipt />}
            disabled={element.attributes.is_completed}
            onClick={() => completeAppointment(element.id)}>
            Complete
          </Button>
          <Button leftIcon={<Receipt />} color='red'
            disabled={element.attributes.is_completed}
            onClick={() => {
              setIsDialogOpened(true);
              setAppointmentId(element.id);
              setTransactionType('cancel');
              setAlertMsg('Cancel appointment?')
            }}
          >
            Cancel
          </Button>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Wrapper>
      <AlertDialog
        isToggled={isDialogOpened}
        setIsToggled={setIsDialogOpened}
        setToProceed={setToProceed}
        text={alertMsg}
        type={transactionType}
      />
      <Table columns={COLUMNS} rows={orgAppointments}>
        <tbody>{rows}</tbody>
      </Table>      
    </Wrapper>
  );
}

export default Appointments;