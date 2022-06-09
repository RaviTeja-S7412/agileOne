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

const Employees = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchText, setSearchtext] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const get_employees = useSelector((state) => state.employees)
  const dispatch = useDispatch()
  const location = useNavigate()
  const login_user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))

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
    location('/admin/employees/update-employee?id='+id)
  }
  const handleCreate = () => {
    location('/admin/employees/create-employee')
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
        name: 'Created Date',
        selector: (row) => `${row.created_date}`,
        sortable: true,
      }

    ],
    [handleDelete],
  )

  const fetchUsers = (page1, size = perPage, search = searchText) => {
    setLoading(true)
    const post_data = {
      page: page1,
      perPage: size,
      search: search,
      team_lead_id: login_user && login_user._id,
    }
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
      const displayColumns = ["id","employee_name","employee_id","mobile_number","email","office_email","address","designation","created_date"];
      var udata = Pagination(get_employees.employees, get_employees.nextPage, currentPage, perPage, displayColumns)
      setData(udata)
      setTotalRows(get_employees.total_users_count)
    }
  }, [get_employees.employees, get_employees.get_employees])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-3 border-top-primary border-top-3">
            <CCardHeader>
              <CRow>
                <CCol xs={4}>
                  <strong>All Employees</strong>
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
