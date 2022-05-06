import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { useSelector } from 'react-redux'

// routes config
import routes from '../routes'

const AppContent = () => {
  const login_user = JSON.parse(localStorage.getItem('user'))
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return route.assignto.includes(login_user && login_user.role) ||
              route.assignto.length === 0 ? (
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
