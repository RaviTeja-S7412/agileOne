/* eslint-disable prettier/prettier */
import React from 'react'
import { CRow, CCol, CFormInput, CForm } from '@coreui/react'
// eslint-disable-next-line react/prop-types
const SearchInput = ({ submitFunction, setSearchtext }) => {
  return (
    <>
      <CForm onSubmit={submitFunction}>
        <CRow>
          <CCol xs={12}>
            <CFormInput
              type="text"
              id="name"
              name="search"
              placeholder="Search..."
              autoComplete="off"
              onChange={(e) => setSearchtext(e.target.value)}
            />
            <input type="submit" hidden />
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default React.memo(SearchInput)
