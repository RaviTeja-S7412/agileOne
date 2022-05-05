import React from 'react'
import { useSelector } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler, CAvatar } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import avatar8 from '../assets/images/avatars/2.jpg'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const udata = useSelector((state) => state.admin)

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
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler className="d-none d-lg-flex" /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
