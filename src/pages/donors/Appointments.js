import { useState, useEffect } from 'react';
import Wrapper from '@/components/Wrapper';
import { Badge, Button, Group, Stack, Modal, Table, Card, Badge, Select } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Receipt } from 'tabler-icons-react';
import { Appointment } from '@/services';
import moment from 'moment';
import { useSelector } from 'react-redux';
import AlertDialog from '@/components/AlertDialog';
import { formatDateTime } from '@/helpers';
import Table from "@/components/Table";
import { APPOINTMENT_SCHEDS } from '@/constant';

const Appointments = () => {
  const [opened, setOpened] = useState(false);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [toProceed, setToProceed] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const [transactionType, setTransactionType] = useState('');
  //for table items
  const [donorAppointments, setDonorAppointments] = useState([]);
  //selected appointment
  const [appointmentId, setAppointmentId] = useState(0);
  const { authUser } = useSelector(state => state.users);

  const COLUMNS = [
    'Organization',
    'Blood Type',
    'Request Type',
    'Case',
    'Schedule',
    'Request Code',
    'Status',
    'Actions'
  ];
  
  const form = useForm({
    initialValues: {
      date_time: new Date(),
      blood_request_id: '',
    },

    validate: {
      date_time: (value) => (value ? null : "No schedule"),
      blood_request_id: (value) => (value ? null : "No selected request"),
    },
  });

  //table items
  const getDonorAppointments = () => {
    Appointment.getDonorAllAppointments().then((response) => { //donor's id
      setDonorAppointments(response.data.data);    
    }).catch(err => console.log(err));
  };

  //for edit on modal   
  const getSpecificAppoinment = (id) => {
    setAppointmentId(id);
    Appointment.getSpecificAppointment(id).then((response) => {
      var appointment = response.data.data[0]
      form.setValues({date_time: new Date(appointment.attributes.date_time),
                      time: new Date(appointment.attributes.date_time),
                      user_id: appointment.attributes.user_id.toString(),
                      blood_request_id: appointment.attributes.blood_request_id.toString()});   
                         
      setErrors(response.data.errors);            
    }).catch(err => console.log(err));    
  }

  const updateAppointment = (payload) => {
    var final_date_time = formatDateTime(payload.date_time, payload.time);
    Appointment.update(appointmentId, {...payload, date_time: final_date_time}).then((response) => {
      getDonorAppointments();
      setErrors(response.data.errors);
      setOpened(false);
    }).catch(err => console.log(err));    
  }

  const cancelAppointment = () => {
    Appointment.cancel(appointmentId).then((response) => {
      getDonorAppointments();
    }).catch(err => console.log(err));
    setToProceed(false);//reset
  }

  useEffect(() => {
    getDonorAppointments();
  }, []);

  useEffect(() => {   
    if (toProceed && transactionType === 'cancel')
      cancelAppointment();         
  }, [toProceed]);

  const rows = donorAppointments.map((element) => (
    <tr key={element.id}>
      <td>{element.attributes.organization_name}</td>
      <td>{element.attributes.blood_type_name}</td>
      <td>{element.attributes.request_type_name}</td>
      <td>{element.attributes.case_name}</td>
      <td>{moment(element.attributes.date_time).format('MM/DD/YYYY hh:mm a')}</td>
      <td>{element.attributes.blood_request_code}</td>
      <td>
        <Badge color={element.attributes.is_completed? 'green' : 'red'} variant="filled">{element.attributes.is_completed? 'Completed' : 'Pending'}</Badge>
      </td>
      <td>
        <Group>
          <Button leftIcon={<Receipt />} 
            disabled={element.attributes.is_completed}
            onClick={() => {
              getSpecificAppoinment(element.id);
              setOpened(true);
              setIsEdit(true);            
          }}>
            Rebook
          </Button>
          <Button
            leftIcon={<Receipt />}
            color='red'
            disabled={element.attributes.is_completed}
            onClick={() => {
              setIsDialogOpened(true);
              setAppointmentId(element.id);
              setTransactionType('cancel');
              setAlertMsg('Cancel appointment?')
            }}>
            Cancel
          </Button>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Wrapper>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Set Schedule"
      >
        <form onSubmit={form.onSubmit((values) => updateAppointment(values))}>
          <Stack>
            <DatePicker
              placeholder="Select date"
              label="Event date"
              required
              {...form.getInputProps("date_time")}
            />
            {/* <TimeInput
              label="Pick time"
              format="12"
              {...form.getInputProps("time")}
            /> */}
            <Select
              placeholder="Select here"
              {...form.getInputProps('time')}
              data = {APPOINTMENT_SCHEDS}>
            </Select>
            <Button type="submit">Save</Button>
          </Stack>
        </form>
      </Modal>
      <AlertDialog
        isToggled={isDialogOpened}
        setIsToggled={setIsDialogOpened}
        setToProceed={setToProceed}
        text={alertMsg}
        type={transactionType}
      />
      <Table columns={COLUMNS} rows={donorAppointments}>
        <tbody>{rows}</tbody>
      </Table>
    </Wrapper>
  );
}

export default Appointments;
