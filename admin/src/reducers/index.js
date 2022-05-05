import authReducer from './auth.reducers'
import { combineReducers } from 'redux'
import adminReducer from './admin.reducer'
import clientsReducers from './clients.reducers'
import employeesReducers from './employees.reducers'
import leadsReducers from './leads.reducers'

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  clients: clientsReducers,
  employees: employeesReducers,
  leads: leadsReducers,
})

export default rootReducer
