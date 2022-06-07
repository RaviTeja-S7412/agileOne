/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { routesConstants } from '../actions/constants'

const initState = {
  loading: false,
  error: null,
  routes: [],
  get_routes: true,
  get_singleroute: true,
  is_route_added: false,
  pageIndex: 0,
  total_pages: 0,
  total_users_count: 0,
  prevPage: false,
  nextPage: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    /* case leadConstants.SAVE_ROUTE_REQUEST:
      state = {
        ...state,
        loading: true,
        get_leads: false,
        is_lead_added: false,
      }
      break
    case leadConstants.SAVE_LEAD_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_leads: true,
        is_lead_added: true,
        message: action.payload.message,
      }
      break
    case leadConstants.SAVE_LEAD_FAILURE:
      state = {
        ...state,
        loading: false,
        get_leads: false,
        is_lead_added: false,
        message: action.payload.message,
      }
      break
    case leadConstants.UPDATE_LEAD_REQUEST:
      state = {
        ...state,
        loading: true,
        get_leads: false,
        is_lead_added: false,
      }
      break
    case leadConstants.UPDATE_LEAD_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_leads: true,
        is_lead_added: true,
        message: action.payload.message,
      }
      break
    case leadConstants.UPDATE_LEAD_FAILURE:
      state = {
        ...state,
        loading: false,
        get_leads: false,
        is_lead_added: false,
        message: action.payload.message,
      }
      break
    case leadConstants.DELETE_LEAD_REQUEST:
      state = {
        ...state,
        loading: true,
        get_leads: false,
        is_lead_added: false,
      }
      break
    case leadConstants.DELETE_LEAD_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_leads: true,
        is_lead_added: true,
        message: action.payload.message,
      }
      break
    case leadConstants.DELETE_LEAD_FAILURE:
      state = {
        ...state,
        loading: false,
        get_leads: false,
        is_lead_added: false,
        message: action.payload.message,
      }
      break */
    case routesConstants.GET_ROUTES_REQUEST:
      state = {
        ...state,
        loading: true,
        get_routes: true,
        is_route_added: false,
      }
      break
    case routesConstants.GET_ROUTES_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_routes: false,
        is_route_added: false,
        routes: action.payload,
      }
      break
    case routesConstants.GET_ROUTES_FAILURE:
      state = {
        ...state,
        loading: false,
        get_routes: false,
        message: action.payload.message,
      }
      break
    /* case leadConstants.GET_SINGLELEAD_REQUEST:
      state = {
        ...state,
        loading: true,
        get_singlelead: true,
      }
      break
    case leadConstants.GET_SINGLELEAD_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_singlelead: false,
        lead_data: action.payload,
      }
      break
    case leadConstants.GET_SINGLELEAD_FAILURE:
      state = {
        ...state,
        loading: false,
        get_singlelead: false,
        message: action.payload.message,
      }
      break */
  }

  return state
}
