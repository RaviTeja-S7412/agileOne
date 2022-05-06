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

const CreateClient = () => {
  const dispatch = useDispatch()
  const location = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')
  const get_employee = useSelector((state) => state.employees)
  const login_user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))

  const [employee_id, setEmployeeid] = useState('')
  const [employee_name, setEmployeename] = useState('')
  const [mobile_number, setMobilenumber] = useState('')
  const [email, setEmail] = useState('')
  const [office_email, setOfficeemail] = useState('')
  const [address, setAddress] = useState('')
  const [designation, setDesignation] = useState('')

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
      location('/admin/employees')
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
      team_lead_id: login_user && login_user._id,
    }
    if (id === null) {
      dispatch(createEmployee(fdata))
    } else {
      fdata['id'] = id
      dispatch(updateEmployee(fdata))
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-3 border-top-primary border-top-3">
            <CCardHeader>
              <strong>{id === null ? 'Create' : 'Update'} Employee</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={saveData} id="fdata">
                <CRow>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Employee ID</CFormLabel>
                      <CFormInput
                        type="text"
                        id="name"
                        name="employee_id"
                        required
                        placeholder="Enter Employee ID"
                        defaultValue={employee_id}
                        autoComplete="off"
                        onChange={(e) => setEmployeeid(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Employee Name</CFormLabel>
                      <CFormInput
                        type="text"
                        id="name"
                        name="employee_name"
                        required
                        placeholder="Enter Employee Name"
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
