import authReducer from './auth.reducers'
import { combineReducers } from 'redux'
import themeReducers from './theme.reducers'
import adminReducer from './admin.reducer'
import clientsReducers from './clients.reducers'
import employeesReducers from './employees.reducers'
import leadsReducers from './leads.reducers'

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducers,
  admin: adminReducer,
  clients: clientsReducers,
  employees: employeesReducers,
  leads: leadsReducers,
})

export default rootReducer
