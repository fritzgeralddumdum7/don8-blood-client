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
    text: 'Appointments',
    Component: Notes,
    href: '/appointments'
  },
  {
    text: 'Patients',
    Component: Users,
    href: '/patients'
  },
  {
    text: 'Donors',
    Component: HeartHandshake,
    href: '/donors'
  }
]

export const ADMIN_NAV_ITEMS = [
  {
    text: 'Dashboard',
    Component: LayoutDashboard,
    href: '/'
  },
  {
    text: 'Organizations',
    Component: Users,
    href: '/organizations'
  },
  {
    text: 'Patients',
    Component: Users,
    href: '/patients'
  },
  {
    text: 'Donors',
    Component: Users,
    href: '/donors'
  },
]
