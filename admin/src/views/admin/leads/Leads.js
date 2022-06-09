/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect } from 'react'
import '@coreui/coreui/dist/css/coreui.css'
import DataTable from 'react-data-table-component'
import { CCard, CRow, CCol, CCardHeader, CCardBody, CButton, CBadge } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteLead, getLeads } from 'src/actions/leads.actions'
import CIcon from '@coreui/icons-react'
import { cilPenAlt, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import {SearchInput,CustomLoader,customStyles} from 'src/components/datatables/index'
import Pagination from 'src/components/datatables/Pagination'

const Leads = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchText, setSearchtext] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
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

  useEffect(() => {
    if (get_leads.get_leads) {
      fetchUsers(currentPage)
    } else {
      const displayColumns = ["id","candidate_name","direct_client","end_client","contact_number","job_id","job_title","visa_status","job_duration","bill_rate","pay_rate","margin","doj","status","employee_name","team_lead","accounts_manager","created_date"];
      var udata = Pagination(get_leads.leads, get_leads.nextPage, currentPage, perPage, displayColumns)
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
                // title="Leads"
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
                subHeaderComponent={<SearchInput submitFunction={searchData} setSearchtext={setSearchtext} />}
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
