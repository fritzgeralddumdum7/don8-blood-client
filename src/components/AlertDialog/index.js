import { useState } from 'react';
import {
  Modal,
  Title,
  Stack,
  Center,
  ThemeIcon,
  Group,
  Button,
  Dialog,
  Notification,
} from '@mantine/core';
import { Trash, Check } from 'tabler-icons-react';

const AlertDialog = ({ isToggled, setIsToggled, text, type }) => {
  const [isNotifOpened, setIsNotifOpened] = useState(false);

  const renderIcon = () => {
    if (type === 'delete') {
      return (
        <ThemeIcon mt={20} color='red' size='xl' sx={{
            borderRadius: 9999
          }}
        >
          <Trash
            color={'#fff'}
          />
        </ThemeIcon>
      );
    }
  }

  return (
    <>
      <Dialog
        opened={isNotifOpened}
        withCloseButton
        onClose={() => setIsNotifOpened(false)}
        size="lg"
        radius="md"
        position={{ top: 20, right: 20 }}
        p={0}
        style={{ border: 0 }}
      >
        <Notification icon={<Check size={18} />} color="teal" title="Teal notification" onClose={() => setIsNotifOpened(false)}>
          This is teal notification with icon
        </Notification>
      </Dialog>
      <Modal
        opened={isToggled}
        onClose={() => setIsToggled(false)}
        withCloseButton={false}
        centered
      >
        <Stack>
          <Center>
            {renderIcon()}
          </Center>
          <Title align='center' order={3} my={10}>{text}</Title>
          <Group position='center'>
            <Button color='red' onClick={() => setIsToggled(false)}>Cancel</Button>
            <Button onClick={() => {
              setIsToggled(false);
              setIsNotifOpened(true);
            }}>Continue</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  )
};

export default AlertDialog;
