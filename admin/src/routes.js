import React from 'react'

const Dashboard = React.lazy(() => import('./views/admin/dashboard/Dashboard'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Users = React.lazy(() => import('./views/admin/users/Users'))
const Profile = React.lazy(() => import('./views/admin/users/Profile'))
const Createuser = React.lazy(() => import('./views/admin/users/CreateUser'))
const Clients = React.lazy(() => import('./views/admin/clients/Clients'))
const CreateClient = React.lazy(() => import('./views/admin/clients/CreateClient'))
const Employees = React.lazy(() => import('./views/admin/employees/Employees'))
const CreateEmployee = React.lazy(() => import('./views/admin/employees/CreateEmployee'))
const Leads = React.lazy(() => import('./views/admin/leads/Leads'))
const CreateLead = React.lazy(() => import('./views/admin/leads/CreateLead'))

const login_user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
const routes = [
  { path: '/', exact: true, name: 'Home', assignto: [1, 2, 3, 4] },
  { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard, assignto: [] },
  { path: '/admin/login', name: 'Login', element: Login, assignto: [] },
  { path: '/admin/updateProfile', name: 'Update Profile', element: Profile, assignto: [] },
  {
    path:
      login_user && login_user.role === 3
        ? '/admin/users/create-team-lead'
        : '/admin/users/create-user',
    name: login_user && login_user.role === 3 ? 'Create Team Lead' : 'Create User',
    element: Createuser,
    assignto: [1, 2, 3],
  },
  {
    path:
      login_user && login_user.role === 3
        ? '/admin/users/update-team-lead'
        : '/admin/users/update-user',
    name: 'Update User',
    element: Createuser,
    assignto: [1, 2, 3],
  },
  {
    path: login_user && login_user.role === 3 ? '/admin/team-leads' : '/admin/users-list',
    name: login_user && login_user.role === 3 ? 'Team Leads' : 'Users',
    element: Users,
    assignto: [1, 2, 3],
  },
  {
    path: '/admin/settings/clients',
    name: 'Clients',
    element: Clients,
    assignto: [1, 2, 3],
  },
  {
    path: '/admin/settings/clients/createClient',
    name: 'Create Client',
    element: CreateClient,
    assignto: [1, 2, 3],
  },
  {
    path: '/admin/settings/clients/updateClient',
    name: 'Update Client',
    element: CreateClient,
    assignto: [1, 2, 3],
  },
  {
    path: '/admin/employees',
    name: 'Employees',
    element: Employees,
    assignto: [4],
  },
  {
    path: '/admin/employees/create-employee',
    name: 'Create Employee',
    element: CreateEmployee,
    assignto: [4],
  },
  {
    path: '/admin/employees/update-employee',
    name: 'Update Employee',
    element: CreateEmployee,
    assignto: [4],
  },
  {
    path: '/admin/leads',
    name: 'Leads',
    element: Leads,
    assignto: [3, 4],
  },
  {
    path: '/admin/leads/create-lead',
    name: 'Create Lead',
    element: CreateLead,
    assignto: [3, 4],
  },
  {
    path: '/admin/leads/update-lead',
    name: 'Update Lead',
    element: CreateLead,
    assignto: [3, 4],
  },
]

export default routes
