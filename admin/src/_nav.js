import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilListRich, cilSettings, cilSpeedometer, cilUser } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const login_user = JSON.parse(localStorage.getItem('user'))
const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    assignto: [1, 2, 3, 4],
    icon: <i className="fa fa-car nav-icon"></i>,
  },
  {
    component: CNavGroup,
    name: login_user && login_user.role === 3 ? 'Team Leads' : 'Users',
    to: login_user && login_user.role === 3 ? '/admin/team-leads' : '/admin/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    assignto: [1, 2, 3],
    items: [
      {
        component: CNavItem,
        name: login_user && login_user.role === 3 ? 'Create Team Lead' : 'Create User',
        to:
          login_user && login_user.role === 3
            ? '/admin/users/create-team-lead'
            : '/admin/users/create-user',
        assignto: [1, 2, 3],
      },
      {
        component: CNavItem,
        name: 'View',
        to: login_user && login_user.role === 3 ? '/admin/team-leads' : '/admin/users-list',
        assignto: [1, 2, 3],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Employees',
    to: '/admin/employees',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    assignto: [4],
    items: [
      {
        component: CNavItem,
        name: 'Create Employee',
        to: '/admin/employees/create-employee',
        assignto: [4],
      },
      {
        component: CNavItem,
        name: 'View',
        to: '/admin/employees',
        assignto: [4],
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Leads',
    to: '/admin/leads',
    icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
    assignto: [3, 4],
  },
  {
    component: CNavGroup,
    name: 'Settings',
    to: '/admin/settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    assignto: [1, 2, 3],
    items: [
      {
        component: CNavItem,
        name: 'Clients',
        to: '/admin/settings/clients',
        assignto: [1, 2, 3],
      },
    ],
  },
]

export default _nav
