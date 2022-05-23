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
export const APPOINTMENT_SCHEDS = [
  {
    value: new Date('January 1, 2022 07:30:00'),
    label: "7:30 am"                
  },
  {
    value: new Date('January 1, 2022 08:00:00'),
    label: "8:00 am"                
  },
  {
    value: new Date('January 1, 2022 08:30:00'),
    label: "8:30 am"                
  },
  {
    value: new Date('January 1, 2022 09:00:00'),
    label: "9:00 am"                
  },
  {
    value: new Date('January 1, 2022 09:30:00'),
    label: "9:30 am"                
  },
  {
    value: new Date('January 1, 2022 10:00:00'),
    label: "10:00 am"                
  },
  {
    value: new Date('January 1, 2022 10:30:00'),
    label: "10:30 am"                
  },
  {
    value: new Date('January 1, 2022 11:00:00'),
    label: "11:00 am"                
  },
  {
    value: new Date('January 1, 2022 11:30:00'),
    label: "11:30 am"                
  },
  {
    value: new Date('January 1, 2022 12:00:00'),
    label: "12:00 am"                
  },
  {
    value: new Date('January 1, 2022 13:00:00'),
    label: "1:00 pm"                
  },
  {
    value: new Date('January 1, 2022 13:30:00'),
    label: "1:30 pm"                
  },
  {
    value: new Date('January 1, 2022 14:00:00'),
    label: "2:00 pm"                
  },
  {
    value: new Date('January 1, 2022 14:30:00'),
    label: "2:30 pm"                
  },
  {
    value: new Date('January 1, 2022 15:00:00'),
    label: "3:00 pm"                
  },
  {
    value: new Date('January 1, 2022 15:30:00'),
    label: "3:30 pm"                
  },
  {
    value: new Date('January 1, 2022 16:00:00'),
    label: "4:00 pm"                
  },
  {
    value: new Date('January 1, 2022 16:30:00'),
    label: "4:30 pm"                
  },
  {
    value: new Date('January 1, 2022 17:00:00'),
    label: "5:00 pm"                
  },
]
