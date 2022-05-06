import React from 'react'
import { CRow, CCol, CWidgetStatsB } from '@coreui/react'

const Dashboard = () => {
  return (
    <>
      <CRow>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsB
            className="mb-4"
            progress={{ color: 'success', value: 89.9 }}
            // text="Lorem ipsum dolor sit amet enim."
            title="Account Managers"
            value="3"
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsB
            className="mb-4"
            value="4"
            title="Techinical Leads"
            progress={{ color: 'info', value: 89.9 }}
            // text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsB
            className="mb-4"
            value="30"
            title="Employees"
            progress={{ color: 'warning', value: 89.9 }}
            // text="Lorem ipsum dolor sit amet enim."
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
