import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { useSelector } from 'react-redux'

// routes config
// import routes from '../routes'
import { getRoutes } from 'src/actions/routes.actions'

const AppContent = () => {
  const login_user = JSON.parse(localStorage.getItem('user'))
  const Dashboard = React.lazy(() => import('../views/admin/dashboard/Dashboard'))
  const Login = React.lazy(() => import('../views/pages/login/Login'))
  const Profile = React.lazy(() => import('../views/admin/users/Profile'))
  const dynamicroutes = useSelector((state) => state.routes)
  const [routesData, setroutesData] = useState([])

  useEffect(() => {
    if (dynamicroutes.get_routes) {
      getRoutes()
    } else {
      const urls = []
      if (dynamicroutes.routes) {
        dynamicroutes.routes.forEach((item) => {
          if (item.component === 'CNavItem') {
            urls.push({
              path: item.to,
              name: item.name,
              element: React.lazy(() => import(item.element)),
              assignto: item.assignto,
            })
          } else {
            item.items.forEach((sitem) => {
              urls.push({
                path: sitem.to,
                name: sitem.name,
                element: sitem.element,
                assignto: sitem.assignto,
              })
            })

            urls.push({
              path: item.to,
              name: item.name,
              element: React.lazy(() => import(item.element)),
              assignto: item.assignto,
            })
          }
        })
      }
      setroutesData(urls)
      console.log(urls)
    }
  }, [dynamicroutes.get_routes])

  const routes = [
    { path: '/', exact: true, name: 'Home', element: Login, assignto: [] },
    { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard, assignto: [] },
    { path: '/admin/login', name: 'Login', element: Login, assignto: [] },
    { path: '/admin/updateProfile', name: 'Update Profile', element: Profile, assignto: [] },
  ]
  routes.push(routesData)

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (route.assignto && route.assignto.includes(login_user && login_user.role)) ||
              (route.assignto && route.assignto.length === 0) ? (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            ) : (
              <Route key={idx} path={route.path} element={<Navigate to="/admin/404" replace />} />
            )
          })}
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
