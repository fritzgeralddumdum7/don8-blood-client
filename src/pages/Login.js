import { useState } from 'react';
import {
  Container,
  PasswordInput,
  Stack,
  Button,
  TextInput,
  Anchor,
  Group,
  Alert
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '@/contexts/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '@/services';
import API from '@/api/base';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

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

  const redirectPath = location.state?.path || '/';

  return (
    <Container size='xs'>
      <form onSubmit={form.onSubmit((values) => {
        User.login({ user: values })
          .then(res => {
            API.defaults.headers.Authorization = res.headers.authorization;
            auth.login(res.headers.authorization);
            navigate(redirectPath, { replace: true });
          }).catch(error => {
            const res = error.response.data;
            setError(res.error);
          })
      })}>
        <Stack spacing={30} pt={150}>
          {
            error && (
              <Alert sx={{ textAlign: 'center' }} color="red">
                {error}
              </Alert>
            )
          }
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
            <Anchor href="/sign-up" size='lg'>
              Create account
            </Anchor>
          </Group>
          <Button size='lg' px={50} type='submit'>
            Login
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default Login;
