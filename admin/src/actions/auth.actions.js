import { authConstants } from './constants'
import axios from '../helpers/axios'
import { get_userdata } from '../helpers/Admin'

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST })
    const res = await axios.post(`/admin/signin`, {
      ...user,
    })
    if (res.status === 200) {
      const { token, user } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      })
      dispatch(get_userdata())
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}

export const saveUser = (udata) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.SAVE_USER_REQUEST })
    const res = await axios.post(`/admin/signup`, udata)

    if (res.status === 200) {
      dispatch({
        type: authConstants.SAVE_USER_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: authConstants.SAVE_USER_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updateUser = (udata) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.UPDATE_USER_REQUEST })
    const res = await axios.post(`/admin/updateUser`, udata)

    if (res.status === 200) {
      dispatch({
        type: authConstants.UPDATE_USER_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: authConstants.UPDATE_USER_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const deleteUser = (udata) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.DELETE_USER_REQUEST })
    const res = await axios.post(`/admin/deleteUser`, udata)

    if (res.status === 200) {
      dispatch({
        type: authConstants.DELETE_USER_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: authConstants.DELETE_USER_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getUsers = (udata) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_USERS_REQUEST })
    const res = await axios.post(`/admin/get_users`, udata)

    if (res.status === 200) {
      dispatch({
        type: authConstants.GET_USERS_SUCCESS,
        payload: res.data,
      })
    } else {
      dispatch({
        type: authConstants.GET_USERS_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const get_singleuser = (udata) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_SINGLEUSER_REQUEST })
    const res = await axios.post(`/admin/get_singleuser`, udata)

    if (res.status === 200) {
      dispatch({
        type: authConstants.GET_SINGLEUSER_SUCCESS,
        payload: res.data.user_data,
      })
    } else {
      if (res.status === 202) {
        dispatch({
          type: authConstants.GET_SINGLEUSER_FAILURE,
          payload: { message: res.data.message },
        })
      }
    }
  }
}

export const updateProfile = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.UPDATE_PROFILE_REQUEST })
    const res = await axios.post(`/admin/updateProfile`, user)

    if (res.status === 200) {
      // localStorage.setItem('user', JSON.stringify(res.data.user))
      dispatch({
        type: authConstants.UPDATE_PROFILE_SUCCESS,
        payload: {
          message: 'Updated Successfully',
        },
      })
      dispatch(get_userdata())
    } else {
      if (res.status === 202) {
        dispatch({
          type: authConstants.UPDATE_PROFILE_FAILURE,
          payload: { error: res.data.error },
        })
      }
    }
  }
}

export const updatePassword = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.UPDATE_PASSWORD_REQUEST })
    const res = await axios.post(`/admin/updatePassword`, user)

    if (res.status === 200) {
      dispatch({
        type: authConstants.UPDATE_PASSWORD_SUCCESS,
        payload: {
          message: 'Password Updated Successfully',
        },
      })
      dispatch(get_userdata())
    } else {
      if (res.status === 202) {
        dispatch({
          type: authConstants.UPDATE_PASSWORD_FAILURE,
          payload: { error: res.data.error },
        })
      }
    }
  }
}

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'))
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      })
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: 'Failed to login' },
      })
    }
  }
}

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST })
    const res = await axios.post(`/admin/signout`)

    if (res.status === 200) {
      localStorage.clear()
      dispatch({ type: authConstants.LOGOUT_SUCCESS })
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}
