import {
  HeartHandshake,
  Mail,
  Notes,
  LayoutDashboard,
  Users,
  BuildingCommunity
} from 'tabler-icons-react';

export const DONOR_NAV_ITEMS = [
  {
    text: 'Dashboard',
    Component: LayoutDashboard,
    href: ['/']
  },
  {
    text: 'Requests',
    Component: HeartHandshake,
    href: ['/requests']
  },
  {
    text: 'Appointments',
    Component: Notes,
    href: ['/appointments']
  },
  {
    text: 'Organizations',
    Component: BuildingCommunity,
    href: ['/organizations']
  }
]

export const ORGS_NAV_ITEMS = [
  {
    text: 'Dashboard',
    Component: LayoutDashboard,
    href: ['/']
  },
  {
    text: 'Requests',
    Component: HeartHandshake,
    href: ['/requests']
  },
  {
    text: 'Appointments',
    Component: Notes,
    href: ['/appointments']
  },
  {
    text: 'Patients',
    Component: Users,
    href: ['/patients']
  }
]

export const ADMIN_NAV_ITEMS = [
  {
    text: 'Dashboard',
    Component: LayoutDashboard,
    href: ['/']
  },
  {
    text: 'Organizations',
    Component: BuildingCommunity,
    href: ['/organizations']
  },
  {
    text: 'Patients',
    Component: Users,
    href: ['/patients']
  },
  {
    text: 'Donors',
    Component: Users,
    href: ['/donors']
  },
  {
    text: 'Cases',
    Component: Notes,
    href: '/cases'
  },
  {
    text: 'Cases',
    Component: Notes,
    href: '/cases'
  },
]

export const ROLES = [
  {
    value: '1',
    label: 'Donor'
  },
  {
    value: '2',
    label: 'Organization Member'
  },
  {
    value: '3',
    label: 'Patient'
  }
]

export const LINE_CHART_CONFIG = {
  type: 'line',
  data: {
    datasets: []
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'right',
        align: 'start'
      },
      title: {
        display: true,
        text: 'Cases per Month',
        position: 'bottom',
        padding: 20,
        color: '#000',
        font: {
          size: 16
        }
      }
    }
  }
}
