/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect } from 'react'
import '@coreui/coreui/dist/css/coreui.css'
import DataTable from 'react-data-table-component'
import { CCard, CRow, CCol, CCardHeader, CCardBody, CButton } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteEmployee, getEmployees } from 'src/actions/employees.actions'
import CIcon from '@coreui/icons-react'
import { cilPenAlt, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import {SearchInput,CustomLoader,customStyles} from 'src/components/datatables/index'
import Pagination from 'src/components/datatables/Pagination'
import { get_teamleads } from 'src/helpers/Admin'

const Employees = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchText, setSearchtext] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const get_employees = useSelector((state) => state.employees)
  const get_allteamleads = useSelector((state) => state.admin)
  const [hideColumn, setHidecolumn] = useState(false)
  const [hideActionColumn, setHideActioncolumn] = useState(false)
  const dispatch = useDispatch()
  const location = useNavigate()
  const login_user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (login_user && login_user.role === 3 && get_allteamleads.get_team_leads) {
      dispatch(get_teamleads())
    }
    if (login_user && login_user.role === 4) {
      setHidecolumn(true)
    }
    if(login_user && login_user.role === 1){
      setHideActioncolumn(true)
    }
  }, [get_allteamleads.get_team_leads])

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Want to delete this employee.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
          dispatch(deleteEmployee({ user_id: id }))
          swal("Employee has been deleted!", {
            icon: "success",
          });
      } else {
        swal("Employee is safe!");
      }
    });
  }

  const handleEdit = (id) => {
    location(get_allteamleads.get_data.uploads_folder + 'admin/employees/update-employee?id='+id)
  }

  const handleCreate = () => {
    location(get_allteamleads.get_data.uploads_folder + 'admin/employees/create-employee')
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
        ),
        omit: hideActionColumn
      },
      {
        name: 'Employee ID',
        selector: (row) => `${row.employee_id}`,
        sortable: true,
      },
      {
        name: 'Employee Name',
        selector: (row) => `${row.employee_name}`,
        sortable: true,
      },
      {
        name: 'Mobile Number',
        selector: (row) => `${row.mobile_number}`,
        sortable: true,
      },
      {
        name: 'Personal Email',
        selector: (row) => `${row.email}`,
        sortable: true,
      },
      {
        name: 'Office Email',
        selector: (row) => `${row.office_email}`,
        sortable: true,
      },
      {
        name: 'Designation',
        selector: (row) => `${row.designation}`,
        sortable: true,
      },
      {
        name: 'Address',
        selector: (row) => `${row.address}`,
        sortable: true,
      },
      {
        name: 'Team Lead',
        selector: (row) => `${row.team_lead}`,
        sortable: true,
        omit: hideColumn,
      },
      {
        name: 'Created Date',
        selector: (row) => `${row.created_date}`,
        sortable: true,
      }

    ],
    [handleDelete],
  )

  let all_teamleads = get_allteamleads && get_allteamleads.team_leads
  const team_leads_data = []
  if (all_teamleads && all_teamleads.length > 0) {
    all_teamleads.forEach((element) => {
      team_leads_data.push(element._id)
    })
  }

  const fetchUsers = (page1, size = perPage, search = searchText) => {
    setLoading(true)
    const post_data = {
      page: page1,
      perPage: size,
      search: search,
      role: login_user && login_user.role,
      team_leads: team_leads_data,
      team_lead_id: login_user && login_user._id,
    }
    console.log(post_data)
    dispatch(getEmployees(post_data))
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
    if (get_employees.get_employees) {
      fetchUsers(currentPage)
    } else {
      const displayColumns = ["id","employee_name","employee_id","mobile_number","email","office_email","address","designation","team_lead","created_date"];
      var udata = Pagination(get_employees.employees, get_employees.nextPage, currentPage, perPage, displayColumns)
      setData(udata)
      setTotalRows(get_employees.total_users_count)
    }
  }, [get_employees.employees, get_employees.get_employees, get_allteamleads.get_team_leads])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-3 border-top-primary border-top-3">
            <CCardHeader>
              <CRow>
                <CCol xs={4}>
                  <strong>All Recruiters</strong>
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
                // title="Employees"
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

export default Employees
