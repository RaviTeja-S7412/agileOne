/* eslint-disable no-script-url */
import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../../actions/auth.actions'
import { useNavigate } from 'react-router-dom'
import avatar8 from '../../assets/images/avatars/2.jpg'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()
  const udata = useSelector((state) => state.admin)
  const location = useNavigate()
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(signout())
  }

  const Profile = () => {
    location(udata.get_data.uploads_folder + 'admin/updateProfile')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar
          src={
            udata.get_data && udata.get_data.user_image
              ? udata.get_data.uploads_folder + udata.get_data.user_image
              : avatar8
          }
          size="md"
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem onClick={Profile} style={{ cursor: 'pointer' }}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
