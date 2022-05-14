import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Anchor,
  Group,
  Avatar,
  Menu,
  Box,
  ThemeIcon
} from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { DONOR_NAV_ITEMS, ORGS_NAV_ITEMS, ADMIN_NAV_ITEMS } from '@/constant';
import { Pencil, Power } from 'tabler-icons-react';
import { useAuth } from '@/contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Wrapper = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const date = new Date();
  const location = useLocation();
  const role = 2;
  const auth = useAuth();
  const navigate = useNavigate();

  const renderNavItems = () => {
    let items = [];
    const cookie = JSON.parse(Cookies.get('don8_blood'));

    if (cookie.user.role === 1) {
      items = DONOR_NAV_ITEMS;
    } else if (cookie.user.role === 2) {
      items = ORGS_NAV_ITEMS;
    } else {
      items = ADMIN_NAV_ITEMS;
    }

    return items.map(({ Component, text, href }, i) => {
      return (
        <Anchor key={i} p={13} underline={false} href={href} styles={() => ({
          root: {
            '&:hover': {
              backgroundColor: 'rgb(248, 249, 250)',
              borderRadius: 3
            }
          }
        })}>
          <Navbar.Section>
            <Group>
              <ThemeIcon variant='outline' size='lg'>
                <Component size={20} />
              </ThemeIcon>
              <Text>{text}</Text>
            </Group>
          </Navbar.Section>
        </Anchor>
      );
    });
  }

  const handleLogout = () => {
    auth.logout();
    navigate('/login', { replace: true });
  }

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 300 }}>
          {renderNavItems()}
        </Navbar>
      }
      footer={
        <Footer height={50} p="md">
          Avion School - © {date.getFullYear()} - {date.getFullYear() + 1}
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <Group position='right'>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Menu control={

              <Group sx={{ cursor: 'pointer' }}>
                <Avatar styles={() => ({
                  root: {
                    border: '1px solid #15aabf'
                  }
                })} color="cyan" radius="xl">MK</Avatar>
                <Box>
                  <Text size='sm' sx={{ lineHeight: '20px' }}>Ermzkie Elzkie Fritzkie</Text>
                  <Text size='sm' color='#868e96' sx={{ lineHeight: '20px' }}>ermzkie@gmail.com</Text>
                </Box>
              </Group>
            }>
              <Menu.Item icon={<Pencil size={20} />}>
                Edit Profile
              </Menu.Item>
              <Menu.Item icon={<Power size={20} />} onClick={handleLogout}>
                Logout
              </Menu.Item>
            </Menu>
          </Group>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}

export default Wrapper;
