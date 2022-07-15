/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { authConstants } from '../actions/constants'

const initialState = {
  roles: [],
  get_data: '',
  team_leads: [],
  get_team_leads: true,
  get_dashboard_data: true,
  employees: [],
  dashboard_data: [],
  get_employees: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.GET_ROLES:
      state = {
        ...state,
        roles: action.payload,
      }
      break
    case authConstants.GET_USERDATA:
      state = {
        ...state,
        get_data: action.payload,
      }
      break
    case authConstants.GET_TEAMLEADS_REQUEST:
      state = {
        ...state,
        get_team_leads: true,
      }
      break
    case authConstants.GET_TEAMLEADS_SUCCESS:
      state = {
        ...state,
        get_team_leads: false,
        team_leads: action.payload.team_leads,
      }
      break
    case authConstants.GET_TEAMLEADS_FAILURE:
      state = {
        ...state,
        get_team_leads: false,
        message: action.payload.message,
      }
      break
    case authConstants.GET_TLEMPLOYEES_REQUEST:
      state = {
        ...state,
        get_employees: true,
      }
      break
    case authConstants.GET_TLEMPLOYEES_SUCCESS:
      state = {
        ...state,
        get_employees: false,
        employees: action.payload.employees,
      }
      break
    case authConstants.GET_TLEMPLOYEES_FAILURE:
      state = {
        ...state,
        get_employees: false,
        message: action.payload.message,
      }
      break
    case authConstants.GET_DASHBOARDDATA_REQUEST:
      state = {
        ...state,
        get_dashboard_data: true,
      }
      break
    case authConstants.GET_DASHBOARDDATA_SUCCESS:
      state = {
        ...state,
        get_dashboard_data: false,
        dashboard_data: action.payload.dashboard_data,
      }
      break
    case authConstants.GET_DASHBOARDDATA_FAILURE:
      state = {
        ...state,
        get_dashboard_data: false,
        message: action.payload.message,
      }
      break
  }

  return state
}
