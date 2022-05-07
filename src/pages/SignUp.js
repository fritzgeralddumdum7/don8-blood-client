import { useState } from 'react';
import {
  Container,
  Button,
  Group,
  Stepper,
  Box,
  Anchor,
  Text
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { custom } from '@/styles';
import FirstStep from '@/components/SignUp/FirstStep';
import SecondStep from '@/components/SignUp/SecondStep';
import FinalStep from '@/components/SignUp/FinalStep';

const SignUp = () => {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const [role, setRole] = useState('');
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
    <Box>
      <Container size='md' pt={100} pb={150}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="First step" description="Create account">
            <FirstStep />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Basic Info">
            <SecondStep />
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Profile">
            <FinalStep role={role} setRole={setRole} />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Container>
      <Group position="apart" px={30} py={50} sx={custom.stepFooter}>
        <Text size="lg">
          Already have an account?
          <Anchor href="/login" size='lg' ml={5}>
            Sign in here
          </Anchor>
        </Text>
        <Group>
          <Button variant="default" size='lg' onClick={prevStep}>Back</Button>
          <Button onClick={nextStep} size='lg'>Next step</Button>
        </Group>
      </Group>
    </Box>
  );
}

export default SignUp;
