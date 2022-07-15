import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { login } from '../../../actions/auth.actions'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [loginref, setlogin] = useState('admin')
  // const [error, errorMessage] = useState('');
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const token = window.localStorage.getItem('token')
  const udata = window.localStorage.getItem('user')
  const auth_data = useSelector((state) => state.admin)

  const userLogin = (e) => {
    e.preventDefault()
    const user = {
      email,
      password,
      loginref,
    }
    dispatch(login(user))
  }

  if (token && udata) {
    if (auth_data.get_data.uploads_folder)
      return <Navigate to={auth_data.get_data.uploads_folder + `admin/dashboard`} />
  }

  return (
    <div
      className="bg-light min-vh-100 d-flex flex-row align-items-center"
      style={{
        background: `url("/vms/images/1.jpg") left top no-repeat`,
        backgroundSize: 'cover',
      }}
    >
      <CContainer>
        <CRow className="justify-content-left">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={userLogin}>
                    <div className="row">
                      <div className="col align-self-center">
                        <img src={'/vms/images/logo1.png'} style={{ width: '100%' }} />
                      </div>
                    </div>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        onChange={(e) => setemail(e.target.value)}
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setpassword(e.target.value)}
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CFormCheck
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        label="Admin/Team Lead/AM"
                        onChange={(e) => setlogin(e.target.value)}
                        value="admin"
                        defaultChecked
                      />
                      &nbsp;
                      <CFormCheck
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        value="employee"
                        onChange={(e) => setlogin(e.target.value)}
                        label="Employee"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
