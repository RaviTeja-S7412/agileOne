import { leadConstants } from './constants'
import axios from '../helpers/axios'

export const createLead = (udata) => {
  return async (dispatch) => {
    dispatch({ type: leadConstants.SAVE_LEAD_REQUEST })
    const res = await axios.post(`/admin/create_lead`, udata)

    if (res.status === 200) {
      dispatch({
        type: leadConstants.SAVE_LEAD_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: leadConstants.SAVE_LEAD_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updateLead = (udata) => {
  return async (dispatch) => {
    dispatch({ type: leadConstants.UPDATE_LEAD_REQUEST })
    const res = await axios.post(`/admin/update_lead`, udata)

    if (res.status === 200) {
      dispatch({
        type: leadConstants.UPDATE_LEAD_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: leadConstants.UPDATE_LEAD_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updateStartdate = (udata) => {
  return async (dispatch) => {
    dispatch({ type: leadConstants.UPDATE_LEAD_REQUEST })
    const res = await axios.post(`/admin/update_startdate`, udata)

    if (res.status === 200) {
      dispatch({
        type: leadConstants.UPDATE_LEAD_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: leadConstants.UPDATE_LEAD_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const deleteLead = (udata) => {
  return async (dispatch) => {
    dispatch({ type: leadConstants.DELETE_LEAD_REQUEST })
    const res = await axios.post(`/admin/deleteLead`, udata)

    if (res.status === 200) {
      dispatch({
        type: leadConstants.DELETE_LEAD_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: leadConstants.DELETE_LEAD_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getLeads = (udata) => {
  return async (dispatch) => {
    dispatch({ type: leadConstants.GET_LEADS_REQUEST })
    const res = await axios.post(`/admin/get_leads`, udata)

    if (res.status === 200) {
      dispatch({
        type: leadConstants.GET_LEADS_SUCCESS,
        payload: res.data,
      })
    } else {
      dispatch({
        type: leadConstants.GET_LEADS_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const get_singlelead = (udata) => {
  return async (dispatch) => {
    dispatch({ type: leadConstants.GET_SINGLELEAD_REQUEST })
    const res = await axios.post(`/admin/get_singlelead`, udata)

    if (res.status === 200) {
      dispatch({
        type: leadConstants.GET_SINGLELEAD_SUCCESS,
        payload: res.data.lead_data,
      })
    } else {
      if (res.status === 202) {
        dispatch({
          type: leadConstants.GET_SINGLELEAD_FAILURE,
          payload: { message: res.data.message },
        })
      }
    }
  }
}
