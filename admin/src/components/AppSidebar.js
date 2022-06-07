import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CAvatar } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import avatar8 from '../assets/images/avatars/2.jpg'

// sidebar nav config
// import navigation from '../_nav'
import { getRoutes } from 'src/actions/routes.actions'

const AppSidebar = () => {
  const udata = useSelector((state) => state.admin)
  const routes = useSelector((state) => state.routes)
  const [urlsData, seturlsData] = useState([])

  useEffect(() => {
    if (routes.get_routes) {
      getRoutes()
    } else {
      const urls = []
      if (routes.routes) {
        routes.routes.forEach((element) => {
          if (element.component === 'CNavItem') {
            urls.push({
              assignto: element.assignto,
              component: CNavItem,
              icon: <i className={`${element.icon} nav-icon`}></i>,
              name: element.name,
              to: element.to,
            })
          } else {
            const subUrls = []
            const subItems = []

            element.items.forEach((sitem) => {
              subItems.push({
                component: CNavItem,
                name: sitem.name,
                to: sitem.to,
                assignto: element.assignto,
              })
            })

            subUrls.push({
              assignto: element.assignto,
              component: CNavGroup,
              icon: <i className={`${element.icon} nav-icon`}></i>,
              name: element.name,
              to: element.to,
              items: subItems,
            })
            urls.push(subUrls[0])
          }
        })
      }
      seturlsData(urls)
      // console.log(urls)
    }
  }, [routes.get_routes])

  return (
    <CSidebar position="fixed">
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <div className="container" align="center">
          <CAvatar
            src={udata.get_data && udata.get_data.user_image ? udata.get_data.user_image : avatar8}
            size="xl"
          />
          <br />
          <small style={{ marginBottom: '20px' }}>
            <strong>
              {udata.get_data && udata.get_data.admin_name} (
              {udata.get_data && udata.get_data.role_data[0].role})<br />
            </strong>
            ({udata.get_data && udata.get_data.email})
          </small>
        </div>
        <SimpleBar>
          <AppSidebarNav items={urlsData} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler className="d-none d-lg-flex" /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
