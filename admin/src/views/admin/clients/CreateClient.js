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
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { get_singleclient, createClient, updateClient } from 'src/actions/clients.actions'
import { useNavigate, useSearchParams } from 'react-router-dom'

const CreateClient = () => {
  const dispatch = useDispatch()
  const location = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')
  const get_client = useSelector((state) => state.clients)
  const admin = useSelector((state) => state.admin)

  const [client_name, setClientname] = useState('')

  useEffect(() => {
    if (id) {
      dispatch(get_singleclient({ user_id: id }))
    } else {
      setClientname('')
    }
    if (get_client && get_client.is_client_added) {
      location(admin.get_data.uploads_folder + 'admin/settings/clients')
    }
  }, [id, get_client.is_client_added])

  useEffect(() => {
    if (get_client.client_data && id) {
      setClientname(get_client.client_data && get_client.client_data.client_name)
    }
  }, [get_client.client_data, id])

  const saveData = (e) => {
    e.preventDefault()
    var fdata = {
      client_name: client_name,
    }
    if (id === null) {
      dispatch(createClient(fdata))
    } else {
      fdata['id'] = id
      dispatch(updateClient(fdata))
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-3 border-top-primary border-top-3">
            <CCardHeader>
              <strong>{id === null ? 'Create' : 'Update'} Client</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={saveData} id="fdata">
                <CRow>
                  <CCol xs={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="name">Client Name</CFormLabel>
                      <CFormInput
                        type="text"
                        id="name"
                        name="client_name"
                        required
                        placeholder="Enter Client Name"
                        defaultValue={client_name}
                        autoComplete="off"
                        onChange={(e) => setClientname(e.target.value)}
                      />
                    </div>
                  </CCol>
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
