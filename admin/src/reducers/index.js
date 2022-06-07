import authReducer from './auth.reducers'
import { combineReducers } from 'redux'
import adminReducer from './admin.reducer'
import clientsReducers from './clients.reducers'
import employeesReducers from './employees.reducers'
import leadsReducers from './leads.reducers'
import routesReducers from './routes.reducers'

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  clients: clientsReducers,
  employees: employeesReducers,
  leads: leadsReducers,
  routes: routesReducers,
})

export default rootReducer
