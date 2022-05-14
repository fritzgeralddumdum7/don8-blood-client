import {
  HeartHandshake,
  Mail,
  Notes,
  LayoutDashboard
} from 'tabler-icons-react';

export const NAV_ITEMS = [
  {
    text: 'Dashboard',
    Component: LayoutDashboard,
    href: '/'
  },
  {
    text: 'Requests',
    Component: Mail,
    href: '/requests'
  },
  {
    text: 'Donations',
    Component: HeartHandshake,
    href: '/donations'
  },
  {
    text: 'Appointments',
    Component: Notes,
    href: '/appointments'
  },
  {
    text: 'Organizations',
    Component: Notes,
    href: '/organizations'
  }
]
