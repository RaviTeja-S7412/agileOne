/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { authConstants } from '../actions/constants'

const initState = {
  token: null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  users: [],
  get_users: true,
  get_singleuser: true,
  is_user_added: false,
  pageIndex: 0,
  total_pages: 0,
  total_users_count: 0,
  prevPage: false,
  nextPage: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      }
      break
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      }
      break
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      }
      break
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      }
      break
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      }
      break
    case authConstants.SAVE_USER_REQUEST:
      state = {
        ...state,
        loading: true,
        get_users: false,
        is_user_added: false,
      }
      break
    case authConstants.SAVE_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_users: true,
        is_user_added: true,
        message: action.payload.message,
      }
      break
    case authConstants.SAVE_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        get_users: false,
        is_user_added: false,
        message: action.payload.message,
      }
      break
    case authConstants.UPDATE_USER_REQUEST:
      state = {
        ...state,
        loading: true,
        get_users: false,
        is_user_added: false,
      }
      break
    case authConstants.UPDATE_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_users: true,
        is_user_added: true,
        message: action.payload.message,
      }
      break
    case authConstants.UPDATE_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        get_users: false,
        is_user_added: false,
        message: action.payload.message,
      }
      break
    case authConstants.DELETE_USER_REQUEST:
      state = {
        ...state,
        loading: true,
        get_users: false,
        is_user_added: false,
      }
      break
    case authConstants.DELETE_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_users: true,
        is_user_added: true,
        message: action.payload.message,
      }
      break
    case authConstants.DELETE_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        get_users: false,
        is_user_added: false,
        message: action.payload.message,
      }
      break
    case authConstants.GET_USERS_REQUEST:
      state = {
        ...state,
        loading: true,
        get_users: true,
        is_user_added: false,
      }
      break
    case authConstants.GET_USERS_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_users: false,
        is_user_added: false,
        users: action.payload.total_users,
        pageIndex: action.payload.pageIndex,
        total_pages: action.payload.total_pages,
        total_users_count: action.payload.total_users_count,
        prevPage: action.payload.prevPage,
        nextPage: action.payload.nextPage,
      }
      break
    case authConstants.GET_USERS_FAILURE:
      state = {
        ...state,
        loading: false,
        get_users: false,
        message: action.payload.message,
      }
      break
    case authConstants.GET_SINGLEUSER_REQUEST:
      state = {
        ...state,
        loading: true,
        get_singleuser: true,
      }
      break
    case authConstants.GET_SINGLEUSER_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_singleuser: false,
        user_data: action.payload,
      }
      break
    case authConstants.GET_SINGLEUSER_FAILURE:
      state = {
        ...state,
        loading: false,
        get_singleuser: false,
        message: action.payload.message,
      }
      break
    case authConstants.UPDATE_PROFILE_REQUEST:
      state = {
        ...state,
        loading: true,
        get_users: false,
        is_user_added: false,
      }
      break
    case authConstants.UPDATE_PROFILE_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_users: true,
        is_user_added: true,
        message: action.payload.message,
      }
      break
    case authConstants.UPDATE_PROFILE_FAILURE:
      state = {
        ...state,
        loading: false,
        get_users: false,
        is_user_added: false,
        message: action.payload.message,
      }
      break
    case authConstants.UPDATE_PASSWORD_REQUEST:
      state = {
        ...state,
        loading: true,
        get_users: false,
        is_user_added: false,
      }
      break
    case authConstants.UPDATE_PASSWORD_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_users: true,
        is_user_added: true,
        message: action.payload.message,
      }
      break
    case authConstants.UPDATE_PASSWORD_FAILURE:
      state = {
        ...state,
        loading: false,
        get_users: false,
        is_user_added: false,
        message: action.payload.message,
      }
      break
  }

  return state
}
