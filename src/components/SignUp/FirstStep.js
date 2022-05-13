import {
  Container,
  PasswordInput,
  Stack,
  TextInput,
  Box,
  Title
} from '@mantine/core';
import FooterAction from '@/components/SignUp/FooterAction';
import { useForm } from '@mantine/form';

const FirstStep = ({ nextStepHandler, prevStepHandler, setUserInfoHandler, userInfo }) => {
  const form = useForm({
    initialValues: userInfo,
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
      password: (value) => value ? null : 'Password is required',
      confirm_password: (value, values) => value === values.password && value ? null : 'Password does not match',
    },
  });

  return (
    <Box pt={50}>
      <form onSubmit={form.onSubmit((values) => {
        setUserInfoHandler(values);
        nextStepHandler();
      })}>
        <Title order={3} sx={{ textAlign: 'center' }}>Account Information</Title>
        <Container size='xs' pt={50}>
          <Stack spacing={20}>
            <Box>
              <TextInput
                label="Email Address"
                size='lg'
                {...form.getInputProps('email')}
              />
            </Box>
            <PasswordInput
              size='lg'
              label="Password"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              size='lg'
              label="Confirm Password"
              value={123123123}
              {...form.getInputProps('confirm_password')}
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

export default FirstStep;
