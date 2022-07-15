import { routesConstants } from './constants'
import axios from '../helpers/axios'
import { useSelector } from 'react-redux'
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

      const urls = []
      if (res.data.all_routes) {
        const auth_data = JSON.parse(localStorage.getItem('user'))
        res.data.all_routes.forEach((item) => {
          if (item.component === 'CNavItem') {
            urls.push({
              path: item.to,
              name: item.name,
              breadname: item.breadname,
              element: item.element,
              assignto: item.assignto,
            })
          } else {
            item.items.forEach((sitem) => {
              if (sitem.assignto.includes(auth_data.role)) {
                urls.push({
                  path: sitem.to,
                  name: sitem.name,
                  breadname: sitem.breadname,
                  element: sitem.element,
                  assignto: sitem.assignto,
                })
              }
            })

            urls.push({
              path: item.to,
              name: item.name,
              breadname: item.breadname,
              element: item.element,
              assignto: item.assignto,
            })
          }
        })
      }

      dispatch({
        type: routesConstants.GET_ALLURLPATHS_SUCCESS,
        payload: urls,
      })
    } else {
      dispatch({
        type: routesConstants.GET_ROUTES_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getAllurlpaths = () => {
  return async (dispatch) => {
    const dynamicroutes = useSelector((state) => state.routes)
    dispatch({ type: routesConstants.GET_ALLURLPATHS_REQUEST })
    dispatch({
      type: routesConstants.GET_ALLURLPATHS_SUCCESS,
      payload: dynamicroutes.all_routes,
    })
  }
}
