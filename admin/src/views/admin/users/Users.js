/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import '@coreui/coreui/dist/css/coreui.css'
import DataTable from 'react-data-table-component'
import { CCard, CRow, CCol, CCardHeader, CCardBody, CFormInput, CForm } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser, getUsers } from 'src/actions/auth.actions'
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
const Users = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchText, setSearchtext] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchVal, setSearchval] = useState('')
  const user_data = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useNavigate()
  const login_user = JSON.parse(localStorage.getItem('user'))

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Want to delete this user.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
          dispatch(deleteUser({ user_id: id }))
          swal("User has been deleted!", {
            icon: "success",
          });
      } else {
        swal("User is safe!");
      }
    });
  }

  const editUser = (id) => {
    if (login_user.role === 3) {
      location('/admin/users/update-team-lead?id='+id)
    } else {
      location('/admin/users/update-user?id='+id)
    }
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
            <CIcon icon={cilPenAlt} customClassName="nav-icon favicon" onClick={() => editUser(row.id)} />
            <CIcon icon={cilTrash} customClassName="nav-icon favicon" onClick={() => handleDelete(row.id)} />
          </>
        )
      },
      {
        name: 'Name',
        selector: (row) => `${row.admin_name}`,
        sortable: true,
      },
      {
        name: 'Mobile',
        selector: (row) => `${row.mobile}`,
        sortable: true,
      },
      {
        name: 'Email',
        selector: (row) => `${row.email}`,
        sortable: true,
      },
      {
        name: 'Designation',
        selector: (row) => `${row.designation}`,
        sortable: true,
      },
      {
        name: 'Role',
        selector: (row) => `${row.role_name}`,
        sortable: true,
      },
      // {
      //   name: 'Created By',
      //   selector: (row) => `${row.created_by}`,
      //   sortable: true,
      // },
      // {
      //   name: 'Updated By',
      //   selector: (row) => `${row.updated_by}`,
      //   sortable: true,
      // },
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
      role: login_user && login_user.role,
      user_id: login_user && login_user._id
    }
    dispatch(getUsers(post_data))
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
    if (user_data.get_users) {
      fetchUsers(currentPage)
    } else {
      const udata = []
      if (user_data.users) {
        var index = 0
        user_data.users.forEach((element) => {
          var prefix = ''
          if (user_data.users.length === (index+1) && user_data.nextPage === true) {
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
            if (user_data.users.length === (index+1) && user_data.nextPage === false && user_data.users.length >= 10) {
              prefix =  currentPage*(index+1)
            }else{
              prefix =  suffix+''+(index+1)
            }
          }
          udata.push({
            serial: prefix,
            admin_name: element.admin_name,
            id: element.id,
            email: element.email,
            mobile: element.mobile,
            designation: element.designation,
            role_name: element.role_name,
            // created_by: element.created_by,
            // updated_by: element.updated_by,
            created_date: element.created_date,
          })
          index++
        })
      }
      setData(udata)
      setTotalRows(user_data.total_users_count)
    }
  }, [user_data.users, user_data.get_users])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-3 border-top-primary border-top-3">
            <CCardHeader>
              <strong>All {login_user && login_user.role === 3 ? 'Team Leads' : 'Users'}</strong>
            </CCardHeader>
            <CCardBody>
              <DataTable
                // title={login_user && login_user.role === 3 ? 'Team Leads' : 'Users'}
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

export default Users
