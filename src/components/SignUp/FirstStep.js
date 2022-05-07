import {
  Container,
  PasswordInput,
  Stack,
  TextInput,
  Box,
  Title
} from '@mantine/core';

const FirstStep = () => {
  return (
    <Box pt={50}>
      <Title order={3} sx={{ textAlign: 'center' }}>Account Information</Title>
      <Container size='xs' pt={50}>
        <Stack spacing={20}>
          <Box>
            <TextInput
              label="Email Address"
              size='lg'
              required
            />
          </Box>
          <PasswordInput
            size='lg'
            label="Password"
            required
          />
          <PasswordInput
            size='lg'
            label="Confirm Password"
            required
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default FirstStep;
