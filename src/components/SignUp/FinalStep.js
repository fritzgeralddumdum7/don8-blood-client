import {
  Container,
  Select,
  Stack,
  TextInput,
  Box,
  Title
} from '@mantine/core';

const FinalStep = ({ role, setRole }) => {
  const renderRoleFields = () => {
    if (role === '1') {
      return (
        <Select
          label="Blood Type"
          placeholder="Select blood type"
          size='lg'
          data={[
            { value: '1', label: 'Donor' },
            { value: '2', label: 'Organization' },
          ]}
          searchable
        />
      );
    } else if (role === '2') {
      return (
        <TextInput
          label="Name"
          size='lg'
        />
      );
    }
  };

  return (
    <Box pt={50}>
      <Title order={3} sx={{ textAlign: 'center' }}>Profile Information</Title>
      <Container size='xs' pt={50}>
        <Stack spacing={20}>
          <Select
            value={role} onChange={setRole}
            label="Role"
            placeholder="Select a role"
            size='lg'
            data={[
              { value: '1', label: 'Donor' },
              { value: '2', label: 'Organization' },
            ]}
            searchable
          />
          {renderRoleFields()}
        </Stack>
      </Container>
    </Box>
  );
}

export default FinalStep;
