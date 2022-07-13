/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect } from 'react'
import '@coreui/coreui/dist/css/coreui.css'
import DataTable from 'react-data-table-component'
import { CCard, CRow, CCol, CCardHeader, CCardBody } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser, getUsers } from 'src/actions/auth.actions'
import CIcon from '@coreui/icons-react'
import { cilPenAlt, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import {SearchInput,CustomLoader,customStyles} from 'src/components/datatables/index'
import Pagination from 'src/components/datatables/Pagination'


const Users = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchText, setSearchtext] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const user_data = useSelector((state) => state.auth)
  const admin = useSelector((state) => state.admin)
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
      location(admin.get_data.uploads_folder + 'admin/team-leads/update-team-lead?id='+id)
    } else {
      location(admin.get_data.uploads_folder + 'admin/users/update-user?id='+id)
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

  useEffect(() => {
    if (user_data.get_users) {
      fetchUsers(currentPage)
    } else {
      const displayColumns = ["id","admin_name","mobile","email","designation","role_name","created_date"];
      var udata = Pagination(user_data.users, user_data.nextPage, currentPage, perPage, displayColumns)
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

export default Users
