import { useState, useEffect } from "react";
import Wrapper from "@/components/Wrapper";
import {
  Card,
  Badge,
  Button,
  Stack,
  Modal,
  Anchor,
  Group,
  Text,
  TextInput,
  Table
  
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Receipt } from "tabler-icons-react";
import AlertDialog from "@/components/AlertDialog";
import { BloodRequest, Appointment } from "@/services";
import moment from "moment";
import {formatDateTime} from '@/helpers';
import { useSelector } from 'react-redux';

const Requests = () => {
  const [opened, setOpened] = useState(false);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const [minSchedDate, setMinSchedDate] = useState(new Date());
  const [searchValue, setSearchValue] = useState('');
  //for table items
  const [bloodRequests, setBloodRequests] = useState([]);
  
  const {authUser} = useSelector(state => state.users )

  const form = useForm({
    initialValues: {
      date_time: new Date(),
      time: new Date(),
      user_id: '',
      blood_request_id: "",
    },

    validate: {
      date_time: (value) => (value ? null : "No schedule"),
      blood_request_id: (value) => (value ? null : "No selected request"),
    },
  });

  //table items
  const getBloodRequests = () => {
    if (authUser)
      BloodRequest.getOpenBloodRequestsForDonor()
        .then((response) => {
          setBloodRequests(response.data.data);
        })
        .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBloodRequests();
  }, []);

  const createAppointment = (payload) => {
    var final_date_time = formatDateTime(payload.date_time, payload.time);
    payload = {...payload, date_time: final_date_time}
    Appointment.create(payload)
      .then((response) => {
        getBloodRequests();
        setErrors(response.data.errors);
        setOpened(false);
      })
      .catch((err) => console.log(err));
  };

  //for creation of appointment on modal
  const getSpecificBloodRequest = (id) => {
    BloodRequest.getSpecificBloodRequest(id).then((response) => {
      const bloodRequest = response.data.data[0];
      //setMinSchedDate(bloodRequest.attributes.date_time);
      form.setValues({ date_time: new Date(bloodRequest.attributes.date_time), blood_request_id: id, user_id: authUser.id }); //donor's id
    })
    .catch((err) => console.log(err));
  }

  const COLUMNS = [
    'Request Code',
    'Organization',
    'Blood Type',
    'Request Type',
    'Case',
    'Schedule',
    'Status',
    'Actions'
  ];

  const rows = bloodRequests.map((element) => (
    <tr key={element.id}>
      <td>{element.attributes.code}</td>
      <td>{element.attributes.organization_name}</td>
      <td>{element.attributes.blood_type_name}</td>
      <td>{element.attributes.request_type_name}</td>
      <td>{element.attributes.case_name}</td>
      <td>
        {moment(element.attributes.date_time).format("MM/DD/YYYY hh:mm a")}
      </td>
      <td>
        <Badge color={element.attributes.is_closed? 'gray' : 'red'} variant="filled">
          {element.attributes.is_closed? 'Closed' : 'Pending'}
        </Badge>
      </td>
      <td>
        <Button
          leftIcon={<Receipt />}
          onClick={() => {
            getSpecificBloodRequest(element.id);
            setOpened(true);
            setIsEdit(true);
          }}
        >
          Make Appointment
        </Button>
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
        <form onSubmit={form.onSubmit((values) => createAppointment(values))}>
          <Stack>
            <DatePicker
              placeholder="Select date"
              label="Event date"
              minDate={minSchedDate}
              required
              {...form.getInputProps("date_time")}
            />
            <TimeInput
              label="Pick time"
              format="12"
              {...form.getInputProps("time")}
            />
            <Anchor href="/appointments">
              <Button type="submit">Save</Button>
            </Anchor>
          </Stack>
        </form>
      </Modal>
      <AlertDialog
        isToggled={isDialogOpened}
        setIsToggled={setIsDialogOpened}
        text="Would you like to delete?"
        type="delete"
      />
      <Group position="left" py='md'>
        <Text>Search:</Text>
        <TextInput
            placeholder="Organization name"
            value={searchValue} 
            onChange={(event) => setSearchValue(event.currentTarget.value)}
            onKeyUp={(event) => {
              if (event.key === 'Enter')
              console.log("H")
            }}/>        
      </Group>
      <Card shadow="sm" mt="sm">
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Request Code</th>
              <th>Organization</th>
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
};

export default Requests;
