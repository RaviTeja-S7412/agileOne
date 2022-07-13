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
import { get_singlelead, createLead, updateLead } from 'src/actions/leads.actions'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Select from 'react-select'
import { get_allclients } from 'src/actions/clients.actions'
import { get_employees, get_teamleads } from 'src/helpers/Admin'

const CreateClient = () => {
  const dispatch = useDispatch()
  const location = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')
  const get_lead = useSelector((state) => state.leads)
  const getde_allclients = useSelector((state) => state.clients)
  const get_allteamleads = useSelector((state) => state.admin)
  const login_user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))

  const [candidate_name, setcandidate_name] = useState('')
  const [direct_client, setdirect_client] = useState('')
  const [end_client, setend_client] = useState('')
  const [fdirect_client, setFdirect_client] = useState('')
  const [fend_client, setFend_client] = useState('')
  const [contact_number, setcontact_number] = useState('')
  const [job_id, setjob_id] = useState('')
  const [job_title, setjob_title] = useState('')
  const [job_duration, setjob_duration] = useState('')
  const [visa_status, setvisa_status] = useState('')
  const [status, setstatus] = useState('')
  const [bill_rate, setbill_rate] = useState('')
  const [pay_rate, setpay_rate] = useState('')
  const [margin, setmargin] = useState('')
  const [tsd, settsd] = useState('')
  const [employee_id, setemployee_id] = useState('')
  const [femployee_id, setFemployee_id] = useState('')
  const [team_lead, setteam_lead] = useState('')
  const [accounts_manager, setaccounts_manager] = useState('')
  const [empteam_lead, setempteam_lead] = useState('')

  useEffect(() => {
    if (id) {
      dispatch(get_singlelead({ id: id }))
    } else {
      setcandidate_name('')
      setdirect_client('')
      setend_client('')
      setcontact_number('')
      setjob_id('')
      setjob_title('')
      setvisa_status('')
      setjob_duration('')
      setbill_rate('')
      setpay_rate('')
      setmargin('')
      settsd('')
      setemployee_id('')
      setteam_lead('')
      setaccounts_manager('')
    }
    if (get_lead && get_lead.is_lead_added) {
      location(get_allteamleads.get_data.uploads_folder + 'admin/consultants/offers')
    }
  }, [id, get_lead.is_lead_added])

  useEffect(() => {
    if (get_lead.lead_data && id) {
      setcandidate_name(get_lead.lead_data && get_lead.lead_data.candidate_name)
      setdirect_client(get_lead.lead_data && get_lead.lead_data.direct_client)
      setend_client(get_lead.lead_data && get_lead.lead_data.end_client)
      setFdirect_client(get_lead.lead_data && get_lead.lead_data.direct_client)
      setFend_client(get_lead.lead_data && get_lead.lead_data.end_client)
      setcontact_number(get_lead.lead_data && get_lead.lead_data.contact_number)
      setjob_id(get_lead.lead_data && get_lead.lead_data.job_id)
      setjob_title(get_lead.lead_data && get_lead.lead_data.job_title)
      setvisa_status(get_lead.lead_data && get_lead.lead_data.visa_status)
      setstatus(get_lead.lead_data && get_lead.lead_data.status)
      setjob_duration(get_lead.lead_data && get_lead.lead_data.job_duration)
      setbill_rate(get_lead.lead_data && get_lead.lead_data.bill_rate)
      setpay_rate(get_lead.lead_data && get_lead.lead_data.pay_rate)
      setmargin(get_lead.lead_data && get_lead.lead_data.margin)
      settsd(get_lead.lead_data && get_lead.lead_data.tentative_start_date)
      setemployee_id(get_lead.lead_data && get_lead.lead_data.employee_id)
      setFemployee_id(get_lead.lead_data && get_lead.lead_data.employee_id)
      setteam_lead(get_lead.lead_data && get_lead.lead_data.team_lead)
      setaccounts_manager(get_lead.lead_data && get_lead.lead_data.accounts_manager)
      setempteam_lead(get_lead.lead_data && get_lead.lead_data.team_lead)
      dispatch(get_employees(team_lead))
    }
  }, [get_lead.lead_data, id, team_lead])

  // clients start
  let all_clients = getde_allclients && getde_allclients.all_clients
  const clents_data = []
  if (all_clients && all_clients.length > 0) {
    var index = 0
    all_clients.forEach((element) => {
      if (fdirect_client == element.id) {
        setFdirect_client(index)
      }
      if (fend_client == element.id) {
        setFend_client(index)
      }
      clents_data.push({
        label: element.client_name,
        value: element.id,
      })
      index++
    })
  }

  useEffect(() => {
    if (getde_allclients.get_allclients) {
      dispatch(get_allclients())
    }
  }, [getde_allclients.get_allclients, dispatch])

  // clients end

  // team leads start

  let all_teamleads = get_allteamleads && get_allteamleads.team_leads
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
    if (login_user.role === 3 && get_allteamleads.get_team_leads) {
      dispatch(get_teamleads())
    }
  }, [get_allteamleads.get_team_leads, dispatch])

  // team leads end

  // employees start

  let all_employees = get_allteamleads && get_allteamleads.employees
  const employees_data = []
  if (all_employees && all_employees.length > 0) {
    var index = 0
    all_employees.forEach((element) => {
      if (employee_id == element._id) {
        setemployee_id(index)
      }
      employees_data.push({
        label: element.employee_name,
        value: element._id,
      })
      index++
    })
  }

  useEffect(() => {
    if (login_user.role === 4 && get_allteamleads.get_employees) {
      dispatch(get_employees(login_user._id))
    }
  }, [get_allteamleads.get_employees, dispatch])
  // employees end

  const saveData = (e) => {
    e.preventDefault()
    var fdata = {
      candidate_name: candidate_name,
      direct_client: typeof fdirect_client === 'object' ? fdirect_client.value : direct_client,
      end_client: typeof fend_client === 'object' ? fend_client.value : end_client,
      contact_number: contact_number,
      job_id: job_id,
      job_title: job_title,
      visa_status: typeof visa_status === 'object' ? visa_status.value : visa_status,
      status: typeof status === 'object' ? status.value : status,
      job_duration: job_duration,
      bill_rate: parseFloat(bill_rate),
      pay_rate: parseFloat(pay_rate),
      margin: parseFloat(margin),
      tentative_start_date: tsd,
      employee_id: typeof employee_id === 'object' ? employee_id.value : femployee_id,
      team_lead: typeof empteam_lead === 'object' ? empteam_lead.value : team_lead,
      accounts_manager: login_user.role === 3 ? login_user._id : login_user.created_by,
      user_id: login_user && login_user._id,
    }
    // console.log(fdata)
    if (id === null) {
      if (login_user.role === 4) {
        fdata['team_lead'] = login_user._id
      }
      dispatch(createLead(fdata))
    } else {
      if (login_user.role === 4) {
        fdata['team_lead'] = login_user._id
      }
      fdata['id'] = id
      dispatch(updateLead(fdata))
    }
  }

  const visastatus_data = [
    {
      label: 'No',
      value: 0,
    },
    {
      label: 'Yes',
      value: 1,
    },
  ]
  const status_data = [
    {
      label: 'Exit',
      value: 0,
    },
    {
      label: 'Active',
      value: 1,
    },
  ]
  const changeTeamlead = (tl) => {
    setempteam_lead(tl)
    setemployee_id('')
    setFemployee_id('')
    dispatch(get_employees(tl.value))
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-3 border-top-primary border-top-3">
            <CCardHeader>
              <strong>{id === null ? 'Create' : 'Update'} Offer</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={saveData} id="fdata">
                <CRow>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Job ID</CFormLabel>
                      <CFormInput
                        type="text"
                        id="name"
                        name="job_id"
                        required
                        placeholder="Enter Job ID"
                        defaultValue={job_id}
                        autoComplete="off"
                        onChange={(e) => setjob_id(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Job Title</CFormLabel>
                      <CFormInput
                        type="text"
                        id="name"
                        name="job_title"
                        required
                        placeholder="Enter Job Title"
                        defaultValue={job_title}
                        autoComplete="off"
                        onChange={(e) => setjob_title(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Job Duration</CFormLabel>
                      <CFormInput
                        type="text"
                        id="name"
                        name="job_duration"
                        required
                        placeholder="Enter Job Duration"
                        defaultValue={job_duration}
                        autoComplete="off"
                        onChange={(e) => setjob_duration(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Candidate Name</CFormLabel>
                      <CFormInput
                        type="text"
                        id="name"
                        name="candidate_name"
                        required
                        placeholder="Enter Candidate Name"
                        defaultValue={candidate_name}
                        autoComplete="off"
                        onChange={(e) => setcandidate_name(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Contact Number</CFormLabel>
                      <CFormInput
                        type="text"
                        id="name"
                        name="contact_number"
                        required
                        placeholder="Enter Contact Number"
                        defaultValue={contact_number}
                        autoComplete="off"
                        onChange={(e) => setcontact_number(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="role">Visa Status</CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="Select Visa Status"
                        value={visastatus_data && visastatus_data[visa_status]}
                        name="visa_status"
                        options={visastatus_data}
                        required
                        onChange={(e) => {
                          setvisa_status(e)
                        }}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Bill Rate</CFormLabel>
                      <CFormInput
                        type="number"
                        id="name"
                        name="bill_rate"
                        required
                        step={0.01}
                        placeholder="Enter Bill Rate"
                        defaultValue={bill_rate}
                        autoComplete="off"
                        onChange={(e) => setbill_rate(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Pay Rate</CFormLabel>
                      <CFormInput
                        type="number"
                        id="name"
                        name="pay_rate"
                        required
                        step={0.01}
                        placeholder="Enter Pay Rate"
                        defaultValue={pay_rate}
                        autoComplete="off"
                        onChange={(e) => setpay_rate(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Margin</CFormLabel>
                      <CFormInput
                        type="number"
                        id="name"
                        name="margin"
                        required
                        step={0.01}
                        placeholder="Enter Margin"
                        defaultValue={margin}
                        autoComplete="off"
                        onChange={(e) => setmargin(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="role">Direct Client</CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="Select Direct Client"
                        value={clents_data && clents_data[fdirect_client]}
                        name="direct_client"
                        options={clents_data}
                        required
                        onChange={(e) => {
                          setFdirect_client(e)
                        }}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="role">End Client</CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="Select End Client"
                        value={clents_data && clents_data[fend_client]}
                        name="end_client"
                        options={clents_data}
                        required
                        onChange={(e) => setFend_client(e)}
                      />
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Tentative Start Date</CFormLabel>
                      <CFormInput
                        type="date"
                        id="name"
                        name="tentative_start_date"
                        required
                        placeholder="Tentative Start Date"
                        defaultValue={tsd}
                        autoComplete="off"
                        onChange={(e) => settsd(e.target.value)}
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
                          onChange={(e) => changeTeamlead(e)}
                        />
                      </div>
                    </CCol>
                  ) : (
                    ''
                  )}
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="role">Employees</CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="Select Employee"
                        value={employees_data && employees_data[employee_id]}
                        name="employee_id"
                        options={employees_data}
                        required
                        onChange={(e) => setemployee_id(e)}
                      />
                    </div>
                  </CCol>
                  {/* {id != null ? (
                    <CCol xs={4}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="role">Status</CFormLabel>
                        <Select
                          className="basic-single"
                          classNamePrefix="Select Status"
                          value={status_data && status_data[status]}
                          name="status"
                          options={status_data}
                          required
                          onChange={(e) => {
                            setstatus(e)
                          }}
                        />
                      </div>
                    </CCol>
                  ) : (
                    ''
                  )} */}
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
