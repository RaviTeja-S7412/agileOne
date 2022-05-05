/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import '@coreui/coreui/dist/css/coreui.css'
import DataTable from 'react-data-table-component'
import { CCard, CRow, CCol, CCardHeader, CCardBody, CFormInput, CForm, CButton } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteClient, getClients } from 'src/actions/clients.actions'
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
const Clients = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [searchText, setSearchtext] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchVal, setSearchval] = useState('')
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
    if (get_clients.get_clients) {
      fetchUsers(currentPage)
    } else {
      const udata = []
      if (get_clients.clients) {
        var index = 0
        get_clients.clients.forEach((element) => {
          var prefix = ''
          if (get_clients.clients.length === (index+1) && get_clients.nextPage === true) {
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

            if (get_clients.clients.length === (index+1) && get_clients.nextPage === false && get_clients.clients.length >= 10) {
              prefix =  currentPage*(index+1)
            }else{
              prefix =  suffix+''+(index+1)
            }
          }
          udata.push({
            serial: prefix,
            client_name: element.client_name,
            id: element.id,
            created_date: element.created_date,
          })
          index++
        })
      }
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
                title="Clients"
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

export default Clients
