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

const SecondStep = () => {
  return (
    <Box pt={50}>
      <Title order={3} sx={{ textAlign: 'center' }}>Personal Information</Title>
      <Container size='lg' pt={50}>
        <Stack spacing={25}>
          <SimpleGrid cols={2} spacing={25}>
            <Box>
              <TextInput
                label="Full name"
                size='lg'
                required
              />
            </Box>
            <TextInput
              label="Last Name"
              size='lg'
              required
            />
            <TextInput
              label="Middle Name"
              size='lg'
            />
            <DatePicker
              label="Birthday"
              size='lg'
              required
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
            />
          </SimpleGrid>
          <TextInput
            label="Street"
            size='lg'
            required
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default SecondStep;
