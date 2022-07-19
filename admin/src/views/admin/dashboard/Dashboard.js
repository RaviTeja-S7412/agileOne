/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { CRow, CCol, CWidgetStatsB, CWidgetStatsF } from '@coreui/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../../../assets/css/widgets.css'

const Dashboard = () => {
  const auth = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
  const admin = useSelector((state) => state.admin)
  const dashboard_data = admin.dashboard_data && admin.dashboard_data[0]

  const location = useNavigate()

  const accountsmanagerLink = () => {
    location(admin.get_data.uploads_folder + 'admin/users-list?ref=ams')
  }

  const technicalleadsLink = () => {
    if (auth && auth.role === 1) {
      location(admin.get_data.uploads_folder + 'admin/users-list?ref=teamleads')
    } else {
      location(admin.get_data.uploads_folder + 'admin/team-leads')
    }
  }

  const recruitersLink = () => {
    location(admin.get_data.uploads_folder + 'admin/employees')
  }

  const offersLink = () => {
    location(admin.get_data.uploads_folder + 'admin/consultants/offers')
  }

  const activeLink = () => {
    location(admin.get_data.uploads_folder + 'admin/consultants/active')
  }

  const exitLink = () => {
    location(admin.get_data.uploads_folder + 'admin/consultants/exit')
  }

  return (
    <>
      <CRow>
        {auth && auth.role === 1 ? (
          <CCol xs={12} sm={6} lg={3}>
            <a onClick={accountsmanagerLink} style={{ color: '#000', cursor: 'pointer' }}>
              <CWidgetStatsF
                // style={{ height: '115px' }}
                className="mb-3"
                icon={<i className="fa fa-users fa-2x"></i>}
                title="Account Managers"
                value={dashboard_data ? dashboard_data.accounts_managers_count : 0}
                color="primary"
              />
            </a>
          </CCol>
        ) : (
          ''
        )}
        {(auth && auth.role === 1) || (auth && auth.role === 3) ? (
          <CCol xs={12} sm={6} lg={3}>
            <a onClick={technicalleadsLink} style={{ color: '#000', cursor: 'pointer' }}>
              <CWidgetStatsF
                // style={{ height: '115px' }}
                className="mb-3"
                icon={<i className="fa fa-users fa-2x"></i>}
                value={
                  dashboard_data && dashboard_data.team_leads_count
                    ? dashboard_data.team_leads_count
                    : 0
                }
                title="Technical Leads"
                color="info"
              />
            </a>
          </CCol>
        ) : (
          ''
        )}
        {(auth && auth.role === 1) || (auth && auth.role === 4) ? (
          <CCol xs={12} sm={6} lg={3}>
            <a onClick={recruitersLink} style={{ color: '#000', cursor: 'pointer' }}>
              <CWidgetStatsF
                // style={{ height: '115px' }}
                className="mb-3"
                icon={<i className="fa fa-users fa-2x"></i>}
                value={dashboard_data ? dashboard_data.employees_count : 0}
                title="Recruiters"
                color="success"
              />
            </a>
          </CCol>
        ) : (
          ''
        )}
        <CCol xs={12} sm={6} lg={3}>
          <a onClick={offersLink} style={{ color: '#000', cursor: 'pointer' }}>
            <CWidgetStatsF
              // style={{ height: '115px' }}
              className="mb-3"
              icon={<i className="fa fa-users fa-2x"></i>}
              value={
                dashboard_data && dashboard_data.offer_leads_count
                  ? dashboard_data.offer_leads_count
                  : 0
              }
              title="Offers"
              color="info"
            />
          </a>
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <a onClick={activeLink} style={{ color: '#000', cursor: 'pointer' }}>
            <CWidgetStatsF
              // style={{ height: '115px' }}
              className="mb-3"
              icon={<i className="fa fa-users fa-2x"></i>}
              value={
                dashboard_data && dashboard_data.active_leads_count
                  ? dashboard_data.active_leads_count
                  : 0
              }
              title="Active Offers"
              color="success"
            />
          </a>
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <a onClick={exitLink} style={{ color: '#000', cursor: 'pointer' }}>
            <CWidgetStatsF
              // style={{ height: '115px' }}
              className="mb-3"
              icon={<i className="fa fa-users fa-2x"></i>}
              value={
                dashboard_data && dashboard_data.exit_leads_count
                  ? dashboard_data.exit_leads_count
                  : 0
              }
              title="Exit Offers"
              color="danger"
            />
          </a>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
