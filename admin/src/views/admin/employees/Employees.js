/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import '@coreui/coreui/dist/css/coreui.css'
import DataTable from 'react-data-table-component'
import { CCard, CRow, CCol, CCardHeader, CCardBody, CFormInput, CForm, CButton } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteEmployee, getEmployees } from 'src/actions/employees.actions'
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
const Employees = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchText, setSearchtext] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchVal, setSearchval] = useState('')
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
    if (get_employees.get_employees) {
      fetchUsers(currentPage)
    } else {
      const udata = []
      if (get_employees.employees) {
        var index = 0
        get_employees.employees.forEach((element) => {
          var prefix = ''
          if (get_employees.employees.length === (index+1) && get_employees.nextPage === true) {
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

            if (get_employees.employees.length === (index+1) && get_employees.nextPage === false && get_employees.employees.length >= 10) {
              prefix =  currentPage*(index+1)
            }else{
              prefix =  suffix+''+(index+1)
            }
          }
          udata.push({
            serial: prefix,
            employee_id: element.employee_id,
            employee_name: element.employee_name,
            mobile_number: element.mobile_number,
            email: element.email,
            office_email: element.office_email,
            designation: element.designation,
            address: element.address,
            id: element.id,
            created_date: element.created_date,
          })
          index++
        })
      }
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
                subHeaderComponent={subHeaderComponentMemo}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Employees
