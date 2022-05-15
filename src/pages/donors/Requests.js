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
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Pencil, ArrowBigRightLines } from "tabler-icons-react";
import AlertDialog from "@/components/AlertDialog";
import { BloodRequest, Appointment } from "@/services";
import moment from "moment";

const Requests = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  //for table items
  const [bloodRequests, setBloodRequests] = useState([]);

  const form = useForm({
    initialValues: {
      date_time: new Date(),
      user_id: 3, //change this with donor's id
      blood_request_id: "",
    },

    validate: {
      date_time: (value) => (value ? null : "No schedule"),
      blood_request_id: (value) => (value ? null : "No selected request"),
    },
  });

  //table items
  useEffect(() => {
    const getBloodRequests = () => {
      BloodRequest.getBloodRequests()
        .then((response) => {
          setBloodRequests(response.data.data);
        })
        .catch((err) => console.log(err));
    };

    getBloodRequests();
  }, []);

  const createAppointment = (payload) => {
    Appointment.create(payload)
      .then((response) => {
        setErrors(response.data.errors);
        setIsDrawerOpened(false);
      })
      .catch((err) => console.log(err));
  };

  //for creation of appointment on modal
  const getSpecificBloodRequest = (id) => {
    form.setValues({ date_time: new Date(),
      blood_request_id: id,
      user_id: 3}); //change this with donor's id
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
          leftIcon={<ArrowBigRightLines />}
          onClick={() => {
            getSpecificBloodRequest(element.id);
            setIsDrawerOpened(true);
            setIsEdit(true);
          }}
        >
          Book
        </Button>
      </td>
    </tr>
  ));

  return (
    <Wrapper>
      <Drawer
        opened={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
        title={isEdit ? "Edit Request" : "Create Request"}
        padding="xl"
        size="xl"
        styles={() => ({
          title: { fontWeight: "bold" },
        })}
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
              {...form.getInputProps("date_time")}
            />
            <Button type="submit">Save</Button>
          </Stack>
        </form>
      </Drawer>
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
