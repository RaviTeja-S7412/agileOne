/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect } from 'react'
import '@coreui/coreui/dist/css/coreui.css'
import DataTable from 'react-data-table-component'
import { CCard, CRow, CCol, CCardHeader, CCardBody, CButton } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteClient, getClients } from 'src/actions/clients.actions'
import CIcon from '@coreui/icons-react'
import { cilPenAlt, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import {SearchInput,CustomLoader,customStyles} from 'src/components/datatables/index'
import Pagination from 'src/components/datatables/Pagination'

const Clients = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchText, setSearchtext] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const get_clients = useSelector((state) => state.clients)
  const dispatch = useDispatch()
  const location = useNavigate()

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Want to delete this client.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
          dispatch(deleteClient({ user_id: id }))
          swal("Client has been deleted!", {
            icon: "success",
          });
      } else {
        swal("Client is safe!");
      }
    });
  }

  const handleEdit = (id) => {
    location('/admin/settings/clients/updateClient?id='+id)
  }

  const handleCreate = () => {
    location('/admin/settings/clients/createClient')
  }

  const columns = useMemo(
    () => [
      {
        name: '#',
        selector: (row) => `${row.serial}`,
      },
      {
        name: 'Client Name',
        selector: (row) => `${row.client_name}`,
        sortable: true,
      },
      {
        name: 'Created Date',
        selector: (row) => `${row.created_date}`,
        sortable: true,
      },
      {
        name:"Action",
        cell: (row) => (
          <>
            <CIcon icon={cilPenAlt} customClassName="nav-icon favicon" onClick={() => handleEdit(row.id)} />
            <CIcon icon={cilTrash} customClassName="nav-icon favicon" onClick={() => handleDelete(row.id)} />
          </>
        )
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
    }
    dispatch(getClients(post_data))
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
    if (get_clients.get_clients) {
      fetchUsers(currentPage)
    } else {
      const displayColumns = ["id","client_name","created_date"];
      var udata = Pagination(get_clients.clients, get_clients.nextPage, currentPage, perPage, displayColumns)
      setData(udata)
      setTotalRows(get_clients.total_users_count)
    }
  }, [get_clients.clients, get_clients.get_clients])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-3 border-top-primary border-top-3">
            <CCardHeader>
              <CRow>
                <CCol xs={4}>
                  <strong>All Clients</strong>
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
                // title="Clients"
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

export default Clients
