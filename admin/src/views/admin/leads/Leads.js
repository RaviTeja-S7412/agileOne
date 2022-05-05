/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import '@coreui/coreui/dist/css/coreui.css'
import DataTable from 'react-data-table-component'
import { CCard, CRow, CCol, CCardHeader, CCardBody, CFormInput, CForm, CButton, CBadge } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteLead, getLeads } from 'src/actions/leads.actions'
import CIcon from '@coreui/icons-react'
import { cilPenAlt, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`
const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`
const CustomLoader = () => (
  <div style={{ padding: '24px' }}>
    <Spinner />
    <div>Loading...</div>
  </div>
)
const customStyles = {
  rows: {
      style: {
          minHeight: '72px', // override the row height
      },
  },
  headCells: {
      style: {
          paddingLeft: '8px', // override the cell padding for head cells
          paddingRight: '8px',
      },
  },
  cells: {
      style: {
          paddingLeft: '8px', // override the cell padding for data cells
          paddingRight: '8px',
      },
  },
};
const Leads = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchText, setSearchtext] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchVal, setSearchval] = useState('')
  const get_leads = useSelector((state) => state.leads)
  const dispatch = useDispatch()
  const location = useNavigate()
  const login_user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Want to delete this lead.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
          dispatch(deleteLead({ user_id: id }))
          swal("Lead has been deleted!", {
            icon: "success",
          });
      } else {
        swal("Lead is safe!");
      }
    });
  }

  const handleEdit = (id) => {
    location('/admin/leads/update-lead?id='+id)
  }

  const handleCreate = () => {
    location('/admin/leads/create-lead')
  }

  const columns = useMemo(
    () => [
      {
        name: '#',
        selector: (row) => `${row.serial}`,
      },
      {
        name:"Action",
        cell: (row) => (
          <>
            <CIcon icon={cilPenAlt} customClassName="nav-icon favicon" onClick={() => handleEdit(row.id)} />
            <CIcon icon={cilTrash} customClassName="nav-icon favicon" onClick={() => handleDelete(row.id)} />
          </>
        )
      },
      {
        name: 'Job ID',
        selector: (row) => `${row.job_id}`,
        sortable: true,
      },
      {
        name: 'Status',
        selector: (row) => `${row.status}`,
        cell: (row) => (
            <>
              <CBadge color={row.status === 1 ? 'success' : 'danger'}>{row.status === 1 ? 'Active' : 'Exit'}</CBadge>
            </>
        ),
        sortable: true,
      },
      {
        name: 'Candidate Name',
        selector: (row) => `${row.candidate_name}`,
        sortable: true,
        width: "100px"
      },
      {
        name: 'Direct Client',
        selector: (row) => `${row.direct_client}`,
        sortable: true,
      },
      {
        name: 'End Client',
        selector: (row) => `${row.end_client}`,
        sortable: true,
      },
      {
        name: 'Contact Number',
        selector: (row) => `${row.contact_number}`,
        sortable: true,
      },
      {
        name: 'Job Title',
        selector: (row) => `${row.job_title}`,
        sortable: true,
      },
      {
        name: 'Visa Status',
        selector: (row) => `${row.visa_status}`,
        cell: (row) => (
          <>
            <CBadge color={row.visa_status === 1 ? 'success' : 'danger'}>{row.visa_status === 1 ? 'Yes' : 'No'}</CBadge>
          </>
      ),
        sortable: true,
      },
      {
        name: 'Job Duration',
        selector: (row) => `${row.job_duration}`,
        sortable: true,
      },
      {
        name: 'Bill Rate',
        selector: (row) => `${row.bill_rate}`,
        sortable: true,
      },
      {
        name: 'Pay Rate',
        selector: (row) => `${row.pay_rate}`,
        sortable: true,
      },
      {
        name: 'Margin',
        selector: (row) => `${row.margin}`,
        sortable: true,
      },
      {
        name: 'Date Of Joining',
        selector: (row) => `${row.doj}`,
        sortable: true,
      },
      {
        name: 'Employee Name',
        selector: (row) => `${row.employee_name}`,
        sortable: true,
      },
      {
        name: 'Team Lead',
        selector: (row) => `${row.team_lead}`,
        sortable: true,
      },
      {
        name: 'Accounts Manager',
        selector: (row) => `${row.accounts_manager}`,
        sortable: true,
      },
      {
        name: 'Created Date',
        selector: (row) => `${row.created_date}`,
        sortable: true,
      },
    ],
    [handleDelete],
  )

  const fetchUsers = (page1, size = perPage, search = searchText) => {
    setLoading(true)
    const post_data = {
      page: page1,
      perPage: size,
      search: search,
      user_id: login_user && login_user._id,
      role: login_user && login_user.role,
    }
    dispatch(getLeads(post_data))
    setLoading(false)
  }

  const handlePageChange = (page) => {
    fetchUsers(page)
    setCurrentPage(page)
  }

  const handlePerRowsChange = (newPerPage, page) => {
    fetchUsers(page, newPerPage)
    setPerPage(newPerPage)
  }

  const searchData = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchUsers()
  }

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <>
      <CForm onSubmit={searchData}>
        <CRow>
          <CCol xs={12}>
            <CFormInput
              type="text"
              id="name"
              name="search"
              placeholder="Search..."
              defaultValue={searchVal}
              autoComplete="off"
              onChange={(e) => setSearchtext(e.target.value)}
            />
            <input type="submit" hidden />
          </CCol>
        </CRow>
      </CForm>
      </>
    )
  })

  useEffect(() => {
    if (get_leads.get_leads) {
      fetchUsers(currentPage)
    } else {
      const udata = []
      if (get_leads.leads) {
        var index = 0
        get_leads.leads.forEach((element) => {
          var prefix = ''
          if (get_leads.leads.length === (index+1) && get_leads.nextPage === true) {
            prefix = currentPage*(index+1)
          } else {
            var suffix = ''
            if (perPage === 50){
              suffix = currentPage-1 === 0 ? '' : (currentPage-1)*5
            } else if (perPage === 40) {
              suffix = currentPage-1 === 0 ? '' : (currentPage-1)*4
            } else if (perPage === 30) {
              suffix = currentPage-1 === 0 ? '' : (currentPage-1)*3
            } else if (perPage === 20) {
              suffix = currentPage-1 === 0 ? '' : (currentPage-1)*2
            } else if (perPage === 10) {
              suffix = currentPage-1 === 0 ? '' : (currentPage-1)
            }

            if (get_leads.leads.length === (index+1) && get_leads.nextPage === false && get_leads.leads.length >= 10) {
              prefix =  currentPage*(index+1)
            }else{
              prefix =  suffix+''+(index+1)
            }
          }
          udata.push({
            "serial": prefix,
            "id": element.id,
            "candidate_name": element.candidate_name,
            "direct_client": element.direct_client,
            "end_client": element.end_client,
            "contact_number": element.contact_number,
            "job_id": element.job_id,
            "job_title": element.job_title,
            "visa_status": element.visa_status,
            "job_duration": element.job_duration,
            "bill_rate": element.bill_rate,
            "pay_rate": element.pay_rate,
            "margin": element.margin,
            "doj": element.doj,
            "status": element.status,
            "employee_name": element.employee_name,
            "team_lead": element.team_lead,
            "accounts_manager": element.accounts_manager,
            "created_date": element.created_date,
          })
          index++
        })
      }
      setData(udata)
      setTotalRows(get_leads.total_users_count)
    }
  }, [get_leads.leads, get_leads.get_leads])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-3 border-top-primary border-top-3">
            <CCardHeader>
              <CRow>
                <CCol xs={4}>
                  <strong>All Leads</strong>
                </CCol>
                <CCol xs={8}>
                  <CButton color="primary" onClick={handleCreate} size="sm" className="float-end">
                    Create
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <DataTable
                title="Leads"
                columns={columns}
                data={data}
                progressPending={loading}
                progressComponent={<CustomLoader />}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationDefaultPage={currentPage}
                onChangeRowsPerPage={handlePerRowsChange}
                paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                onChangePage={handlePageChange}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                customStyles={customStyles}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Leads
