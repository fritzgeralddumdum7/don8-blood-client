import {
  HeartHandshake,
  Mail,
  Notes,
  LayoutDashboard,
  Users
} from 'tabler-icons-react';

export const DONOR_NAV_ITEMS = [
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
  }
]

export const ORGS_NAV_ITEMS = [
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
    text: 'Patients',
    Component: Users,
    href: '/patients'
  }
]

export const ADMIN_NAV_ITEMS = []
