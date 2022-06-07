import { routesConstants } from './constants'
import axios from '../helpers/axios'
/*
export const createLead = (udata) => {
  return async (dispatch) => {
    dispatch({ type: leadConstants.SAVE_ROUTE_REQUEST })
    const res = await axios.post(`/admin/create_lead`, udata)

    if (res.status === 200) {
      dispatch({
        type: leadConstants.SAVE_ROUTE_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: leadConstants.SAVE_ROUTE_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updateLead = (udata) => {
  return async (dispatch) => {
    dispatch({ type: leadConstants.UPDATE_ROUTE_REQUEST })
    const res = await axios.post(`/admin/update_lead`, udata)

    if (res.status === 200) {
      dispatch({
        type: leadConstants.UPDATE_ROUTE_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: leadConstants.UPDATE_ROUTE_FAILURE,
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
} */

export const getRoutes = () => {
  return async (dispatch) => {
    dispatch({ type: routesConstants.GET_ROUTES_REQUEST })
    const res = await axios.get(`/admin/get_allroutes`)

    if (res.status === 200) {
      dispatch({
        type: routesConstants.GET_ROUTES_SUCCESS,
        payload: res.data.all_routes,
      })
    } else {
      dispatch({
        type: routesConstants.GET_ROUTES_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}
