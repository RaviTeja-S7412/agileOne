import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

// import routes from '../routes'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const Dashboard = React.lazy(() => import('../views/admin/dashboard/Dashboard'))
  const Login = React.lazy(() => import('../views/pages/login/Login'))
  const Profile = React.lazy(() => import('../views/admin/users/Profile'))
  const dynamicroutes = useSelector((state) => state.routes)
  const admin = useSelector((state) => state.admin)
  const [routesData, setroutesData] = useState([])

  useEffect(() => {
    const urls = []
    if (!dynamicroutes.getAllurlpaths) {
      dynamicroutes.urlpaths.forEach((item) => {
        urls.push({
          path: item.path,
          name: item.name,
          breadname: item.breadname,
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
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.breadname : false
  }
  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    const prevPage = localStorage.getItem('prevPage')
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
          prevPage: prevPage,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem href={admin.get_data.uploads_folder + 'admin/dashboard'}>
        Home
      </CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active
              ? { active: true }
              : {
                  href:
                    breadcrumb.pathname === '/admin/consultants'
                      ? `/admin/consultants/${breadcrumb.prevPage}`
                      : breadcrumb.pathname,
                })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
