/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { clientConstants } from '../actions/constants'

const initState = {
  loading: false,
  error: null,
  clients: [],
  all_clients: [],
  get_clients: true,
  get_allclients: true,
  get_singleclient: true,
  is_client_added: false,
  pageIndex: 0,
  total_pages: 0,
  total_users_count: 0,
  prevPage: false,
  nextPage: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case clientConstants.SAVE_CLIENT_REQUEST:
      state = {
        ...state,
        loading: true,
        get_clients: false,
        is_client_added: false,
      }
      break
    case clientConstants.SAVE_CLIENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_clients: true,
        is_client_added: true,
        message: action.payload.message,
      }
      break
    case clientConstants.SAVE_CLIENT_FAILURE:
      state = {
        ...state,
        loading: false,
        get_clients: false,
        is_client_added: false,
        message: action.payload.message,
      }
      break
    case clientConstants.UPDATE_CLIENT_REQUEST:
      state = {
        ...state,
        loading: true,
        get_clients: false,
        is_client_added: false,
      }
      break
    case clientConstants.UPDATE_CLIENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_clients: true,
        is_client_added: true,
        message: action.payload.message,
      }
      break
    case clientConstants.UPDATE_CLIENT_FAILURE:
      state = {
        ...state,
        loading: false,
        get_clients: false,
        is_client_added: false,
        message: action.payload.message,
      }
      break
    case clientConstants.DELETE_CLIENT_REQUEST:
      state = {
        ...state,
        loading: true,
        get_clients: false,
        is_client_added: false,
      }
      break
    case clientConstants.DELETE_CLIENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_clients: true,
        is_client_added: true,
        message: action.payload.message,
      }
      break
    case clientConstants.DELETE_CLIENT_FAILURE:
      state = {
        ...state,
        loading: false,
        get_clients: false,
        is_client_added: false,
        message: action.payload.message,
      }
      break
    case clientConstants.GET_CLIENTS_REQUEST:
      state = {
        ...state,
        loading: true,
        get_clients: true,
        is_client_added: false,
      }
      break
    case clientConstants.GET_CLIENTS_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_clients: false,
        is_client_added: false,
        clients: action.payload.total_users,
        pageIndex: action.payload.pageIndex,
        total_pages: action.payload.total_pages,
        total_users_count: action.payload.total_users_count,
        prevPage: action.payload.prevPage,
        nextPage: action.payload.nextPage,
      }
      break
    case clientConstants.GET_CLIENTS_FAILURE:
      state = {
        ...state,
        loading: false,
        get_clients: false,
        message: action.payload.message,
      }
      break
    case clientConstants.GET_ALLCLIENTS_REQUEST:
      state = {
        ...state,
        loading: true,
        get_allclients: true,
      }
      break
    case clientConstants.GET_ALLCLIENTS_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_allclients: false,
        all_clients: action.payload.all_clients,
      }
      break
    case clientConstants.GET_ALLCLIENTS_FAILURE:
      state = {
        ...state,
        loading: false,
        get_allclients: false,
        message: action.payload.message,
      }
      break
    case clientConstants.GET_SINGLECLIENT_REQUEST:
      state = {
        ...state,
        loading: true,
        get_singleclient: true,
      }
      break
    case clientConstants.GET_SINGLECLIENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_singleclient: false,
        client_data: action.payload,
      }
      break
    case clientConstants.GET_SINGLECLIENT_FAILURE:
      state = {
        ...state,
        loading: false,
        get_singleclient: false,
        message: action.payload.message,
      }
      break
  }

  return state
}
