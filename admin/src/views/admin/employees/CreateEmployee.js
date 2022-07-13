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
  CFormTextarea,
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { get_singleemployee, createEmployee, updateEmployee } from 'src/actions/employees.actions'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Select from 'react-select'
import { get_teamleads } from 'src/helpers/Admin'

const CreateClient = () => {
  const dispatch = useDispatch()
  const location = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')
  const get_employee = useSelector((state) => state.employees)
  const admin = useSelector((state) => state.admin)
  const login_user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))

  const [employee_id, setEmployeeid] = useState('')
  const [employee_name, setEmployeename] = useState('')
  const [mobile_number, setMobilenumber] = useState('')
  const [email, setEmail] = useState('')
  const [office_email, setOfficeemail] = useState('')
  const [address, setAddress] = useState('')
  const [designation, setDesignation] = useState('')
  const [empteam_lead, setempteam_lead] = useState('')
  const [team_lead, setteam_lead] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (id) {
      dispatch(get_singleemployee({ user_id: id }))
    } else {
      setEmployeeid('')
      setEmployeename('')
      setMobilenumber('')
      setEmail('')
      setOfficeemail('')
      setAddress('')
      setDesignation('')
    }
    if (get_employee && get_employee.is_employee_added) {
      location(admin.get_data.uploads_folder + 'admin/employees')
    }
  }, [id, get_employee.is_employee_added])

  useEffect(() => {
    if (get_employee.employee_data && id) {
      setEmployeeid(get_employee.employee_data && get_employee.employee_data.employee_id)
      setEmployeename(get_employee.employee_data && get_employee.employee_data.employee_name)
      setMobilenumber(get_employee.employee_data && get_employee.employee_data.mobile_number)
      setEmail(get_employee.employee_data && get_employee.employee_data.email)
      setOfficeemail(get_employee.employee_data && get_employee.employee_data.office_email)
      setAddress(get_employee.employee_data && get_employee.employee_data.address)
      setDesignation(get_employee.employee_data && get_employee.employee_data.designation)
      setempteam_lead(get_employee.employee_data && get_employee.employee_data.team_lead)
      setteam_lead(get_employee.employee_data && get_employee.employee_data.team_lead)
    }
  }, [get_employee.employee_data, id])

  const saveData = (e) => {
    e.preventDefault()
    var fdata = {
      employee_id: employee_id,
      employee_name: employee_name,
      mobile_number: mobile_number,
      email: email,
      office_email: office_email,
      address: address,
      designation: designation,
    }

    if (login_user.role == 3) {
      fdata['team_lead_id'] = typeof empteam_lead === 'object' ? empteam_lead.value : team_lead
    } else {
      fdata['team_lead_id'] = login_user && login_user._id
    }

    if (id === null) {
      fdata['password'] = password
      dispatch(createEmployee(fdata))
    } else {
      fdata['id'] = id
      dispatch(updateEmployee(fdata))
    }
  }

  let all_teamleads = admin && admin.team_leads
  const team_leads_data = []
  if (all_teamleads && all_teamleads.length > 0) {
    var index1 = 0
    all_teamleads.forEach((element) => {
      if (empteam_lead == element._id) {
        setempteam_lead(index1)
      }
      team_leads_data.push({
        label: element.admin_name,
        value: element._id,
      })
      index1++
    })
  }

  useEffect(() => {
    if (login_user.role === 3 && admin.get_team_leads) {
      dispatch(get_teamleads())
    }
  }, [admin.get_team_leads, dispatch])

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-3 border-top-primary border-top-3">
            <CCardHeader>
              <strong>{id === null ? 'Create' : 'Update'} Recruiter</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={saveData} id="fdata">
                <CRow>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Recruiter ID</CFormLabel>
                      <CFormInput
                        type="text"
                        id="name"
                        name="employee_id"
                        required
                        placeholder="Enter Recruiter ID"
                        defaultValue={employee_id}
                        autoComplete="off"
                        onChange={(e) => setEmployeeid(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Recruiter Name</CFormLabel>
                      <CFormInput
                        type="text"
                        id="name"
                        name="employee_name"
                        required
                        placeholder="Enter Recruiter Name"
                        defaultValue={employee_name}
                        autoComplete="off"
                        onChange={(e) => setEmployeename(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Mobile Number</CFormLabel>
                      <CFormInput
                        type="text"
                        id="name"
                        name="mobile_number"
                        required
                        placeholder="Enter Mobile Number"
                        defaultValue={mobile_number}
                        autoComplete="off"
                        onChange={(e) => setMobilenumber(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Email</CFormLabel>
                      <CFormInput
                        type="text"
                        id="name"
                        name="email"
                        required
                        placeholder="Enter Email"
                        defaultValue={email}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Office Email</CFormLabel>
                      <CFormInput
                        type="text"
                        id="name"
                        name="office_email"
                        required
                        placeholder="Enter Office Email"
                        defaultValue={office_email}
                        autoComplete="off"
                        onChange={(e) => setOfficeemail(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Designation</CFormLabel>
                      <CFormInput
                        type="text"
                        id="name"
                        name="designation"
                        placeholder="Enter Designation"
                        defaultValue={designation}
                        autoComplete="off"
                        onChange={(e) => setDesignation(e.target.value)}
                      />
                    </div>
                  </CCol>
                  {login_user.role === 3 ? (
                    <CCol xs={4}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="role">Team Leads</CFormLabel>
                        <Select
                          className="basic-single"
                          classNamePrefix="Select Team Lead"
                          value={team_leads_data && team_leads_data[empteam_lead]}
                          name="employee_id"
                          options={team_leads_data}
                          required
                          onChange={(e) => setempteam_lead(e)}
                        />
                      </div>
                    </CCol>
                  ) : (
                    ''
                  )}
                  {id === null ? (
                    <CCol xs={4}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="name">Password</CFormLabel>
                        <CFormInput
                          type="text"
                          id="name"
                          name="password"
                          placeholder="Enter Password"
                          defaultValue={password}
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
                      <CFormLabel htmlFor="name">Address</CFormLabel>
                      <CFormTextarea
                        type="text"
                        id="name"
                        name="address"
                        placeholder="Enter Address"
                        defaultValue={address}
                        autoComplete="off"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4} style={{ marginTop: '30px' }}>
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

export default CreateClient
