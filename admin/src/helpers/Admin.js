import { authConstants } from '../actions/constants'
import axios from '../helpers/axios'
import { useSelector } from 'react-redux'

export const get_userdata = () => {
  return async (dispatch) => {
    let udata = JSON.parse(localStorage.getItem('user'))
    let loginType = localStorage.getItem('loginType')
    // dispatch({ type: authConstants.GET_USERDATA });
    const res = await axios.post(`/admin/get_userdata`, {
      user_id: udata._id,
      loginType: loginType,
    })

    if (res.status === 200) {
      return dispatch({
        type: authConstants.GET_USERDATA,
        payload: { ...res.data.user },
      })
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.message },
        })
      }
    }
  }
}

export const get_roles = () => {
  return async (dispatch) => {
    const res = await axios.get(`/admin/get_roles`)

    if (res.status === 200) {
      return dispatch({
        type: authConstants.GET_ROLES,
        payload: { ...res.data },
      })
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.GET_ROLES,
          payload: { error: res.data.message },
        })
      }
    }
  }
}

export const get_teamleads = () => {
  return async (dispatch) => {
    let udata = JSON.parse(localStorage.getItem('user'))
    dispatch({ type: authConstants.GET_TEAMLEADS_REQUEST })
    const res = await axios.post(`/admin/get_teamleads`, { user_id: udata._id })
    if (res.status === 200) {
      return dispatch({
        type: authConstants.GET_TEAMLEADS_SUCCESS,
        payload: { ...res.data },
      })
    } else {
      dispatch({
        type: authConstants.GET_TEAMLEADS_FAILURE,
        payload: { error: res.data.message },
      })
    }
  }
}

export const get_employees = (team_lead_id) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_TLEMPLOYEES_REQUEST })
    const res = await axios.post(`/admin/get_tlemployees`, { user_id: team_lead_id })
    if (res.status === 200) {
      return dispatch({
        type: authConstants.GET_TLEMPLOYEES_SUCCESS,
        payload: { ...res.data },
      })
    } else {
      dispatch({
        type: authConstants.GET_TLEMPLOYEES_FAILURE,
        payload: { error: res.data.message },
      })
    }
  }
}

export const get_dashboard_data = () => {
  return async (dispatch) => {
    let udata = JSON.parse(localStorage.getItem('user'))
    dispatch({
      type: authConstants.GET_DASHBOARDDATA_REQUEST,
    })

    const res = await axios.post(`/admin/get_dashboarddata`, {
      user_id: udata._id,
      role: udata.role,
    })

    if (res.status === 200) {
      return dispatch({
        type: authConstants.GET_DASHBOARDDATA_SUCCESS,
        payload: res.data,
      })
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.GET_DASHBOARDDATA_FAILURE,
          payload: { error: res.data.message },
        })
      }
    }
  }
}

export const get_chart_data = () => {
  return async (dispatch) => {
    let udata = JSON.parse(localStorage.getItem('user'))
    dispatch({
      type: authConstants.GET_CHARTDATA_REQUEST,
    })

    const res = await axios.post(`/admin/get_chartdata`, {
      user_id: udata._id,
      role: udata.role,
    })

    if (res.status === 200) {
      return dispatch({
        type: authConstants.GET_CHARTDATA_SUCCESS,
        payload: res.data,
      })
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.GET_CHARTDATA_FAILURE,
          payload: { error: res.data.message },
        })
      }
    }
  }
}
