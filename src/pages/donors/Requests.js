import { useState, useEffect } from "react";
import Wrapper from "@/components/Wrapper";
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
  ListItem,
  Modal,
  Anchor,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Receipt } from "tabler-icons-react";
import AlertDialog from "@/components/AlertDialog";
import { BloodRequest, Appointment } from "@/services";
import moment from "moment";
import { useAuth } from '@/contexts/AuthProvider';
import {formatDateTime} from '@/helpers';

const Requests = () => {
  const [opened, setOpened] = useState(false);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  //for table items
  const [bloodRequests, setBloodRequests] = useState([]);
  
  const auth = useAuth();

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
    BloodRequest.getBloodRequestsPerBloodType(auth.user.blood_type_id)//get blood_type_id of the user who logged in (donor)
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
    form.setValues({ date_time: new Date(), blood_request_id: id, user_id: auth.user.id }); //donor's id
  };

  const rows = bloodRequests.map((element) => (
    <tr key={element.id}>
      <td>{element.attributes.code}</td>
      <td>{element.attributes.blood_type_name}</td>
      <td>{element.attributes.request_type_name}</td>
      <td>{element.attributes.case_name}</td>
      <td>
        {moment(element.attributes.date_time).format("MM/DD/YYYY hh:mm a")}
      </td>
      <td>
        <Badge color="red" variant="filled">
          Pending
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
      <Card shadow="sm" mt="sm">
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Tran. Code</th>
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
