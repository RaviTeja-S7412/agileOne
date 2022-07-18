import { clientConstants } from './constants'
import axios from '../helpers/axios'

export const createClient = (udata) => {
  return async (dispatch) => {
    dispatch({ type: clientConstants.SAVE_CLIENT_REQUEST })
    const res = await axios.post(`/admin/create_client`, udata)

    if (res.status === 200) {
      dispatch({
        type: clientConstants.SAVE_CLIENT_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: clientConstants.SAVE_CLIENT_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updateClient = (udata) => {
  return async (dispatch) => {
    dispatch({ type: clientConstants.UPDATE_CLIENT_REQUEST })
    const res = await axios.post(`/admin/update_client`, udata)

    if (res.status === 200) {
      dispatch({
        type: clientConstants.UPDATE_CLIENT_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: clientConstants.UPDATE_CLIENT_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const deleteClient = (udata) => {
  return async (dispatch) => {
    dispatch({ type: clientConstants.DELETE_CLIENT_REQUEST })
    const res = await axios.delete(`/admin/delete_client`, { data: udata })

    if (res.status === 200) {
      dispatch({
        type: clientConstants.DELETE_CLIENT_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: clientConstants.DELETE_CLIENT_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getClients = (udata) => {
  return async (dispatch) => {
    dispatch({ type: clientConstants.GET_CLIENTS_REQUEST })
    const res = await axios.post(`/admin/get_clients`, udata)

    if (res.status === 200) {
      dispatch({
        type: clientConstants.GET_CLIENTS_SUCCESS,
        payload: res.data,
      })
    } else {
      dispatch({
        type: clientConstants.GET_CLIENTS_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const get_allclients = () => {
  return async (dispatch) => {
    dispatch({ type: clientConstants.GET_ALLCLIENTS_REQUEST })
    const res = await axios.get(`/admin/get_allclients`)

    if (res.status === 200) {
      dispatch({
        type: clientConstants.GET_ALLCLIENTS_SUCCESS,
        payload: res.data,
      })
    } else {
      dispatch({
        type: clientConstants.GET_ALLCLIENTS_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const get_singleclient = (udata) => {
  return async (dispatch) => {
    dispatch({ type: clientConstants.GET_SINGLECLIENT_REQUEST })
    const res = await axios.post(`/admin/get_singleclient`, udata)

    if (res.status === 200) {
      dispatch({
        type: clientConstants.GET_SINGLECLIENT_SUCCESS,
        payload: res.data.client_data,
      })
    } else {
      if (res.status === 202) {
        dispatch({
          type: clientConstants.GET_SINGLECLIENT_FAILURE,
          payload: { message: res.data.message },
        })
      }
    }
  }
}
