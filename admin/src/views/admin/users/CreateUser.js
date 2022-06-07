import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
import { get_roles } from 'src/helpers/Admin'
import { get_singleuser, saveUser, updateUser } from 'src/actions/auth.actions'
import { useNavigate, useSearchParams } from 'react-router-dom'

const CreateUser = () => {
  const roles = useSelector((state) => state.admin)
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')

  const [admin_name, setAdminname] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [designation, setDesignation] = useState('')
  const [role, setRole] = useState('')
  const [urole, setURole] = useState('')
  const login_user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (id) {
      dispatch(get_singleuser({ user_id: id }))
    } else {
      setAdminname('')
      setEmail('')
      setMobile('')
      setPassword('')
      setDesignation('')
      setRole('')
    }
    if (login_user.role === 3) {
      setURole(4)
    }
    if (auth && auth.is_user_added) {
      if (roles.get_data.role === 1 || roles.get_data.role === 2) {
        location('/admin/users-list')
      } else {
        location('/admin/team-leads')
      }
    }
  }, [id, auth.is_user_added, roles.get_data.role])

  useEffect(() => {
    if (auth.user_data && id) {
      setAdminname(auth.user_data && auth.user_data.admin_name)
      setEmail(auth.user_data && auth.user_data.email)
      setMobile(auth.user_data && auth.user_data.mobile)
      setPassword(auth.user_data && auth.user_data.password)
      setDesignation(auth.user_data && auth.user_data.designation)
      setRole(auth.user_data && auth.user_data.role)
      setURole(auth.user_data && auth.user_data.role)
    }
  }, [auth.user_data, id])

  let all_roles = roles && roles.roles
  const roles_data = []
  if (all_roles && all_roles.roles) {
    var index = 0
    all_roles.roles.forEach((element) => {
      if (role == element.id) {
        setRole(index)
      }
      roles_data.push({
        label: element.role,
        value: element.id,
      })
      index++
    })
  }

  useEffect(() => {
    if (all_roles.length === 0) {
      dispatch(get_roles())
    }
  }, [all_roles, dispatch])

  const saveData = (e) => {
    e.preventDefault()
    var fdata = {
      admin_name: admin_name,
      email: email,
      mobile: mobile,
      password: password,
      designation: designation,
      role: typeof role === 'object' ? role.value : urole,
    }
    if (id === null) {
      fdata['created_by'] = roles.get_data._id
      dispatch(saveUser(fdata))
    } else {
      fdata['updated_by'] = roles.get_data._id
      fdata['user_id'] = id
      dispatch(updateUser(fdata))
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-3 border-top-primary border-top-3">
            <CCardHeader>
              <strong>
                {id === null ? 'Create' : 'Update'}{' '}
                {roles.get_data.role === 1 || roles.get_data.role === 2 ? 'User' : 'Team Lead'}
              </strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={saveData} id="fdata">
                <CRow>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">User Name</CFormLabel>
                      <CFormInput
                        type="text"
                        id="name"
                        name="admin_name"
                        required
                        placeholder="Enter Name"
                        defaultValue={admin_name}
                        autoComplete="off"
                        onChange={(e) => setAdminname(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="email">Email</CFormLabel>
                      <CFormInput
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="Enter Email ID"
                        defaultValue={email}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </CCol>
                  {id === null ? (
                    <CCol xs={4}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="password">Password</CFormLabel>
                        <CFormInput
                          type="password"
                          id="password"
                          name="password"
                          required={id === null ? true : false}
                          placeholder="Enter Password"
                          autoComplete="off"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </CCol>
                  ) : (
                    ''
                  )}
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="mobile">Mobile Number</CFormLabel>
                      <CFormInput
                        type="text"
                        id="mobile"
                        name="mobile"
                        placeholder="Enter Mobile Number"
                        defaultValue={mobile}
                        autoComplete="off"
                        maxLength="10"
                        required
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="designation">Designation</CFormLabel>
                      <CFormInput
                        type="text"
                        id="designation"
                        name="designation"
                        placeholder="Enter Designation"
                        defaultValue={designation}
                        autoComplete="off"
                        required
                        onChange={(e) => setDesignation(e.target.value)}
                      />
                    </div>
                  </CCol>
                  {roles.get_data.role === 1 || roles.get_data.role === 2 ? (
                    <CCol xs={4}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="role">Role</CFormLabel>
                        <Select
                          className="basic-single"
                          classNamePrefix="Select Roles"
                          value={roles_data && roles_data[role]}
                          name="role"
                          options={roles_data}
                          required
                          onChange={(e) => setRole(e)}
                        />
                      </div>
                    </CCol>
                  ) : (
                    ''
                  )}
                  <CCol
                    xs={4}
                    style={{ marginTop: id === null && roles.get_data.role !== 3 ? '' : '30px' }}
                  >
                    <div className="mb-3">
                      <CFormLabel htmlFor="role"></CFormLabel>
                      <CButton color="primary" type="submit">
                        Submit
                      </CButton>
                    </div>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default CreateUser
