import authReducer from './auth.reducers'
import { combineReducers } from 'redux'
import adminReducer from './admin.reducer'
import clientsReducers from './clients.reducers'
import employeesReducers from './employees.reducers'
import leadsReducers from './leads.reducers'
import routesReducers from './routes.reducers'

const appReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  clients: clientsReducers,
  employees: employeesReducers,
  leads: leadsReducers,
  routes: routesReducers,
})
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export default rootReducer
