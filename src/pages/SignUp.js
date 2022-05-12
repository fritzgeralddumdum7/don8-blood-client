import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Stepper,
  Box,
  LoadingOverlay
} from '@mantine/core';
import FirstStep from '@/components/SignUp/FirstStep';
import SecondStep from '@/components/SignUp/SecondStep';
import FinalStep from '@/components/SignUp/FinalStep';
import { User } from '@/services';

const SignUp = () => {
  const [visible, setVisible] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [active, setActive] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const nextStepHandler = () => {
    if (active === 2) {
      return
    }
    setActive(state => state += 1);
  }

  const prevStepHandler = () => {
    setActive(state => state -= 1);
  }

  const setUserInfoHandler = (user) => {
    setUserInfo(state => ({ ...state, ...user }));
  }

  useEffect(() => {
    if (isFinal) {
      setVisible(true);
      User.register({ user: userInfo })
        .then(() => {
          navigate('/login');
        })
        .finally(() => setVisible(false))
    }
  }, [userInfo, isFinal]);

  return (
    <Box>
      <LoadingOverlay visible={visible} />
      <Container size='md' pt={100} pb={150}>
        <Stepper active={active <= 2 && active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="First step" description="Create account">
            <FirstStep
              nextStepHandler={nextStepHandler}
              prevStepHandler={prevStepHandler}
              userInfo={userInfo}
              setUserInfoHandler={setUserInfoHandler}
            />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Basic Info">
            <SecondStep
              nextStepHandler={nextStepHandler}
              prevStepHandler={prevStepHandler}
              userInfo={userInfo}
              setUserInfoHandler={setUserInfoHandler}
            />
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Profile">
            <FinalStep
              role={role}
              setRole={setRole}
              nextStepHandler={nextStepHandler}
              prevStepHandler={prevStepHandler}
              userInfo={userInfo}
              setUserInfoHandler={setUserInfoHandler}
              setIsFinal={setIsFinal}
            />
          </Stepper.Step>
        </Stepper>
      </Container>
    </Box>
  );
}

export default SignUp;
