import {
  Container,
  SimpleGrid,
  Stack,
  TextInput,
  Box,
  Title,
  Select
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import FooterAction from '@/components/SignUp/FooterAction';
import { useForm } from '@mantine/form';

const SecondStep = ({ nextStepHandler, prevStepHandler, setUserInfoHandler, userInfo }) => {
  const form = useForm({
    initialValues: userInfo,
    validate: {
      firstname: (value) => value ? null : 'First name is required',
      lastname: (value) => value ? null : 'Last name is required',
      birthday: (value) => value ? null : 'Birthday is required',
      province: (value) => value ? null : 'Province is required',
      city: (value) => value ? null : 'City is required',
      middlename: (value) => (!value || value) && null,
      address: (value) => (!value || value) && null
    },
  });

  return (
    <Box pt={50}>
      <form onSubmit={form.onSubmit((values) => {
        console.log('heheh im done')
        setUserInfoHandler(values);
        nextStepHandler();
      })}>
      <Title order={3} sx={{ textAlign: 'center' }}>Personal Information</Title>
      <Container size='lg' pt={50}>
        <Stack spacing={25}>
          <SimpleGrid cols={2} spacing={25}>
            <Box>
              <TextInput
                label="First name"
                size='lg'
                {...form.getInputProps('firstname')}
              />
            </Box>
            <TextInput
              label="Last Name"
              size='lg'
              {...form.getInputProps('lastname')}
            />
            <TextInput
              label="Middle Name"
              placeholder='Optional'
              size='lg'
              {...form.getInputProps('middleName')}
            />
            <DatePicker
              label="Birthday"
              placeholder='Select date'
              size='lg'
              {...form.getInputProps('birthday')}
            />
            <Select
              label="Province"
              placeholder="Select a province"
              size='lg'
              data={[
                { value: '1', label: 'Donor' },
                { value: '2', label: 'Organization' },
              ]}
              searchable
              {...form.getInputProps('province')}
            />
            <Select
              label="City / Municipality"
              placeholder="Select a municipality"
              size='lg'
              data={[
                { value: '1', label: 'Donor' },
                { value: '2', label: 'Organization' },
              ]}
              searchable
              {...form.getInputProps('city')}
            />
          </SimpleGrid>
          <TextInput
            label="address"
            size='lg'
            {...form.getInputProps('address')}
          />
        </Stack>
      </Container>
      <FooterAction
        nextStepHandler={nextStepHandler}
        prevStepHandler={prevStepHandler}
      />
      </form>
    </Box>
  );
}

export default SecondStep;
