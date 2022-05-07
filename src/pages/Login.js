import {
  Container,
  PasswordInput,
  Stack,
  Button,
  TextInput,
  Anchor,
  Group
} from '@mantine/core';
import { useForm } from '@mantine/form';

const Login = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
      password: (value) => value ? null : 'Password is required',
    },
  });

  return (
    <Container size='xs'>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack spacing={30} pt={150}>
        <TextInput
          id="input-demo"
          size='lg'
          label="Email Address"
          placeholder='Email Address'
          {...form.getInputProps('email')}
        />
        <PasswordInput
          size='lg'
          placeholder="Password"
          {...form.getInputProps('password')}
          label="Password"
        />
        <Group position='apart'>
          <Anchor href="/reset-password" size='lg'>
            Forgot your password?
          </Anchor>
          <Button size='lg' px={50} type='submit'>
            Login
          </Button>
        </Group>
      </Stack>
      </form>
    </Container>
  );
}

export default Login;
