import React, { Suspense, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { Router, browserHistory } from 'react-router'
import './scss/style.scss'
import { get_dashboard_data, get_userdata } from './helpers/Admin'
import { getRoutes } from './actions/routes.actions'
import {
  authConstants,
  clientConstants,
  employeeConstants,
  leadConstants,
} from './actions/constants'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

export default function App() {
  const token = window.localStorage.getItem('token')
  const auth = useSelector((state) => state.auth)
  const admin = useSelector((state) => state.admin)
  const urls = useSelector((state) => state.routes)
  const history = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) {
      history('/vms/admin/login')
    } else {
      dispatch(get_userdata())
      if (urls && urls.get_routes) {
        dispatch(getRoutes())
      }
      if (admin.get_dashboard_data) {
        dispatch(get_dashboard_data())
      }
    }
    dispatch({ type: authConstants.GET_DASHBOARDDATA_REQUEST })
    dispatch({ type: employeeConstants.GET_EMPLOYEES_REQUEST })
    dispatch({ type: leadConstants.GET_LEADS_REQUEST })
    dispatch({ type: authConstants.GET_USERS_REQUEST })
    dispatch({ type: clientConstants.GET_CLIENTS_REQUEST })
  }, [auth.authenticate, dispatch, history, token, urls.get_routes])
  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route exact path="/vms/admin/login" name="Login Page" element={<Login />} />
        <Route exact path="/vms/admin/login" name="Login Page" element={<Login />} />
        <Route exact path="/register" name="Register Page" element={<Register />} />
        <Route exact path="/admin/404" name="Page 404" element={<Page404 />} />
        <Route exact path="/500" name="Page 500" element={<Page500 />} />
        <Route path="*" name="Home" element={<DefaultLayout />} />
      </Routes>
    </Suspense>
  )
}
