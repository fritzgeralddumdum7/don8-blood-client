import { useState } from 'react';
import {
  Container,
  Select,
  Stack,
  TextInput,
  Box,
  Title
} from '@mantine/core';
import FooterAction from '@/components/SignUp/FooterAction';
import { useForm } from '@mantine/form';

const FinalStep = ({ role, setRole, nextStepHandler, prevStepHandler, setUserInfoHandler, userInfo, setIsFinal }) => {
  const donorValidations = {
    role: (value) => value ? null : 'Role is required',
    blood_type_id: (value) => value ? null : 'Blood type is required',
  }
  const orgValidations = {
    role: (value) => value ? null : 'Role is required',
    orgName: (value) => value ? null : 'Organization name is required',
  }
  const form = useForm({
    initialValues: userInfo,
    validate: role === '1' ? donorValidations : orgValidations,
  });
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
          onChange={(event) => {
            form.setFieldValue('blood_type_id', null);
            form.setFieldValue('role', null);
            form.setValues({ blood_type_id: event, role });
          }}
          error={form.errors.blood_type_id}
        />
      );
    } else if (role === '2') {
      return (
        <TextInput
          label="Name"
          size='lg'
          {...form.getInputProps('orgName')}
        />
      );
    }
  };

  return (
    <Box pt={50}>
      <form onSubmit={form.onSubmit((values) => {
        setUserInfoHandler(values);
        setIsFinal(true);
      })}>
        <Title order={3} sx={{ textAlign: 'center' }}>Profile Information</Title>
        <Container size='xs' pt={50}>
          <Stack spacing={20}>
            <Select
              label="Role"
              placeholder="Select a role"
              size='lg'
              data={[
                { value: '1', label: 'Donor' },
                { value: '2', label: 'Organization Member' },
              ]}
              searchable
              onChange={(event) => {
                form.setFieldValue('role', null);
                form.setFieldValue('blood_type_id', null);
                form.setFieldValue('orgName', null);
                setRole(event);
                form.setValues({ role: event });
              }}
              error={form.errors.role}
            />
            {renderRoleFields()}
          </Stack>
        </Container>
        <FooterAction
          nextStepHandler={nextStepHandler}
          prevStepHandler={prevStepHandler}
          isFinal={true}
        />
      </form>
    </Box>
  );
}

export default FinalStep;
