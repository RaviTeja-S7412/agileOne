/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { leadConstants } from '../actions/constants'

const initState = {
  loading: false,
  error: null,
  leads: [],
  get_leads: true,
  get_singlelead: true,
  is_lead_added: false,
  pageIndex: 0,
  total_pages: 0,
  total_users_count: 0,
  prevPage: false,
  nextPage: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case leadConstants.SAVE_LEAD_REQUEST:
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
    case leadConstants.UPDATE_STARTDATE_REQUEST:
      state = {
        ...state,
        loading: true,
        get_leads: false,
        is_lead_added: false,
      }
      break
    case leadConstants.UPDATE_STARTDATE_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_leads: true,
        is_lead_added: true,
        message: action.payload.message,
      }
      break
    case leadConstants.UPDATE_STARTDATE_FAILURE:
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
      break
    case leadConstants.GET_LEADS_REQUEST:
      state = {
        ...state,
        loading: true,
        get_leads: true,
        is_lead_added: false,
      }
      break
    case leadConstants.GET_LEADS_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_leads: false,
        is_lead_added: false,
        leads: action.payload.total_users,
        pageIndex: action.payload.pageIndex,
        total_pages: action.payload.total_pages,
        total_users_count: action.payload.total_users_count,
        prevPage: action.payload.prevPage,
        nextPage: action.payload.nextPage,
      }
      break
    case leadConstants.GET_LEADS_FAILURE:
      state = {
        ...state,
        loading: false,
        get_leads: false,
        message: action.payload.message,
      }
      break
    case leadConstants.GET_SINGLELEAD_REQUEST:
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
      break
  }

  return state
}
