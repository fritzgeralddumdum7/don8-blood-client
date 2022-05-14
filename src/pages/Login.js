import { useState, useEffect } from 'react';
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
import { useAuth } from '@/contexts/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '@/services';
import API from '@/api/base';

const Login = () => {
  const auth = useAuth();
  const [isAuth, setIsAuth] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  const redirectPath = location.state?.path || '/'

  const handleLogin = () => {
    auth.login({
      email: 'prets@gmail.com',
      access_token: 1234567,
      role: 1
    });
    console.log(auth)
    navigate(redirectPath, { replace: true });
  }

  // useEffect(() => {
  //   const user = Cookies.get('don8_blood');
  //   const UNAUTH_ROUTES = [
  //     '/login',
  //     '/home',
  //     '/reset-password',
  //     '/sign-up'
  //   ];

  //   if (user) {
  //     navigate('/', { replace: true });
  //   }
  // }, [])

  return (
    <Container size='xs'>
      <form onSubmit={form.onSubmit((values) => {
        User.login({ user: values })
          .then(res => {
            console.log(res)
            API.defaults.headers.Authorization = res.headers.authorization
            auth.login(res.data, res.headers.authorization);
            // console.log(auth)
            navigate(redirectPath, { replace: true });
          })
      })}>
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
