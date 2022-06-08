import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { useSelector } from 'react-redux'

const AppContent = () => {
  const login_user = JSON.parse(localStorage.getItem('user'))
  const Dashboard = React.lazy(() => import('../views/admin/dashboard/Dashboard'))
  const Login = React.lazy(() => import('../views/pages/login/Login'))
  const Profile = React.lazy(() => import('../views/admin/users/Profile'))
  const dynamicroutes = useSelector((state) => state.routes)
  const [routesData, setroutesData] = useState([])

  useEffect(() => {
    const urls = []
    if (!dynamicroutes.getAllurlpaths) {
      dynamicroutes.urlpaths.forEach((item) => {
        urls.push({
          path: item.path,
          name: item.name,
          element: React.lazy(() => import(`../views/admin/${item.element}`)),
          assignto: item.assignto,
        })
      })
    }
    setroutesData(urls)
  }, [dynamicroutes.getAllurlpaths])

  const routes = [
    { path: '/', exact: true, name: 'Home', element: Login, assignto: [] },
    { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard, assignto: [] },
    { path: '/admin/login', name: 'Login', element: Login, assignto: [] },
    { path: '/admin/updateProfile', name: 'Update Profile', element: Profile, assignto: [] },
  ]
  routesData.forEach((route) => {
    routes.push(route)
  })

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
