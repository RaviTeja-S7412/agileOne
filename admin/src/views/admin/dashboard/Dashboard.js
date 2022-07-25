/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { CRow, CCol, CWidgetStatsF, CCard, CButton } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../../../assets/css/widgets.css'
import { Bar, Doughnut } from 'react-chartjs-2'

import DateRangePicker from 'react-bootstrap-daterangepicker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/daterangepicker.css'
import moment from 'moment'

import 'chartjs-plugin-datalabels'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { get_chart_data } from 'src/helpers/Admin'
Chart.register(ChartDataLabels)

const Dashboard = () => {
  const auth = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()
  const admin = useSelector((state) => state.admin)
  const dashboard_data = admin.dashboard_data && admin.dashboard_data[0]
  const chart_data = admin.chart_data
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())

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

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'No`of Offers count by month',
        padding: {
          bottom: 30,
        },
        weight: 'bold',
        color: '#00325c',
        font: {
          size: 13,
        },
        align: 'start',
      },
      datalabels: {
        display: true,
        color: '#848485',
        align: 'end',
        labels: {
          title: {
            font: {
              weight: 'bold',
            },
          },
          value: {
            color: '#1f3e64',
          },
        },
        formatter: function (value) {
          return '\n' + value
        },
      },
    },
  }

  const pieoptions = {
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'No`of Offers count by categories',
        padding: {
          bottom: 30,
        },
        weight: 'bold',
        color: '#00325c',
        font: {
          size: 13,
        },
        align: 'start',
      },
      datalabels: {
        display: true,
        color: 'white',
        align: 'center',
        padding: {
          right: 0,
        },
        labels: {
          title: {
            font: {
              weight: 'bold',
            },
          },
          value: {
            color: '#1f3e64',
          },
        },
        formatter: function (value) {
          return '\n' + value
        },
      },
    },
  }

  const range = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [
      moment().subtract(1, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month'),
    ],
    'Last Year': [
      moment().subtract(1, 'year').startOf('year'),
      moment().subtract(1, 'year').endOf('year'),
    ],
  }

  const getChartdata = (event, picker) => {
    setFromDate(picker.startDate._d.toISOString())
    setToDate(picker.endDate._d.toISOString())
    dispatch(get_chart_data())
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
      <CRow>
        <CCol lg={12} align="right" style={{ marginBottom: '20px' }}>
          <DateRangePicker
            onEvent={getChartdata}
            alwaysShowCalendars={true}
            initialSettings={{
              ranges: range,
            }}
          >
            <CButton color="primary">
              {moment(fromDate).format('LL')} to {moment(toDate).format('LL')}
            </CButton>
          </DateRangePicker>
        </CCol>
        <CCol lg={8}>
          <CCard style={{ padding: '20px' }}>
            <Bar
              data={{
                // Name of the variables on x-axies for each bar
                labels: [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'June',
                  'July',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                datasets: [
                  {
                    label: 'Offers',
                    data: chart_data && chart_data.bar_offer_count,
                    backgroundColor: ['rgba(255, 205, 86, 0.5)'],
                    borderColor: ['rgb(255, 205, 86)'],
                    borderWidth: 1,
                  },
                  {
                    label: 'Active Offers',
                    data: chart_data && chart_data.bar_active_count,
                    backgroundColor: ['rgba(52, 152, 219, 0.5)'],
                    borderColor: ['rgb(52, 152, 219)'],
                    borderWidth: 1,
                  },
                  {
                    label: 'Exit Offers',
                    data: chart_data && chart_data.bar_exit_count,
                    backgroundColor: ['rgba(255, 99, 132, 0.5)'],
                    borderColor: ['rgb(255, 99, 132)'],
                    borderWidth: 1,
                  },
                ],
              }}
              options={options}
            />
          </CCard>
        </CCol>
        <CCol lg={4}>
          <CCard style={{ padding: '20px', height: '365px' }}>
            <Doughnut
              data={{
                // Name of the variables on x-axies for each bar
                labels: ['Offers', 'Active Offers', 'Exit Offers'],
                datasets: [
                  {
                    label: 'My First Dataset',
                    render: 'percentage',
                    data: chart_data && chart_data.doughnut_chart_count,
                    backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)',
                    ],
                    hoverOffset: 4,
                  },
                ],
              }}
              options={pieoptions}
            />
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
