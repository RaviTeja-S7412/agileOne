import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CCollapse,
  CImage,
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { get_singleuser, updateProfile, updatePassword } from 'src/actions/auth.actions'
import { useNavigate, useSearchParams } from 'react-router-dom'
import avatar8 from '../../../assets/images/avatars/2.jpg'

const UpdateProfile = () => {
  const udata = useSelector((state) => state.admin)
  const dispatch = useDispatch()
  const location = useNavigate()
  const [visibleA, setVisibleA] = useState(false)
  const [visibleB, setVisibleB] = useState(false)

  const [admin_name, setAdminname] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [profile_image, setProfileimage] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [designation, setDesignation] = useState('')
  const login_user = JSON.parse(localStorage.getItem('user'))
  const id = login_user && login_user._id

  useEffect(() => {
    if (id) {
      dispatch(get_singleuser({ user_id: id }))
    }
    if (udata && udata.is_user_added) {
      location(udata.get_data.uploads_folder + '/admin/team-leads')
    }
  }, [id, udata.is_user_added])

  useEffect(() => {
    if (udata.get_data && id) {
      setAdminname(udata.get_data && udata.get_data.admin_name)
      setEmail(udata.get_data && udata.get_data.email)
      setMobile(udata.get_data && udata.get_data.mobile)
      setDesignation(udata.get_data && udata.get_data.designation)
    }
  }, [udata.get_data, id])

  const saveProfiledata = (e) => {
    e.preventDefault()
    const fdata = new FormData()
    fdata.append('user_id', id)
    fdata.append('admin_name', admin_name)
    fdata.append('email', email)
    fdata.append('mobile', mobile)
    fdata.append('designation', designation)
    fdata.append('file', profile_image)
    fdata.append('old_picture', udata.get_data && udata.get_data.user_image)

    dispatch(updateProfile(fdata))
  }
  const updateuserPassword = (e) => {
    e.preventDefault()

    const fdata = {
      user_id: id,
      new_password: password,
      confirm_password: cpassword,
    }

    dispatch(updatePassword(fdata))
  }
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-3 border-top-primary border-top-3">
            <CCardHeader>
              <strong>Update Profile</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={6}>
                  <div className="clearfix" style={{ marginBottom: '20px' }}>
                    <CImage
                      align="center"
                      rounded
                      thumbnail
                      src={
                        udata.get_data && udata.get_data.user_image
                          ? udata.get_data.uploads_folder + udata.get_data.user_image
                          : avatar8
                      }
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-center">
                    <CButton
                      color="primary"
                      onClick={() => {
                        setVisibleA(true)
                        setVisibleB(false)
                      }}
                    >
                      Update Profile
                    </CButton>
                    <CButton
                      color="primary"
                      onClick={() => {
                        setVisibleA(false)
                        setVisibleB(true)
                      }}
                    >
                      Update Password
                    </CButton>
                  </div>
                </CCol>
                <CCol xs={6}>
                  <CRow>
                    <CCol xs={12}>
                      <CCollapse visible={visibleA}>
                        <CCard className="mt-3">
                          <CCardHeader>
                            <strong>Update Profile</strong>
                          </CCardHeader>
                          <CCardBody>
                            <CForm onSubmit={saveProfiledata} id="fdata">
                              <CRow>
                                <CCol xs={10}>
                                  <div className="mb-3">
                                    <CFormLabel htmlFor="name">Name</CFormLabel>
                                    <CFormInput
                                      type="text"
                                      id="name"
                                      name="admin_name"
                                      required
                                      placeholder="Enter Name"
                                      defaultValue={admin_name}
                                      autoComplete="off"
                                      onChange={(e) => setAdminname(e.target.value)}
                                    />
                                  </div>
                                </CCol>
                                <CCol xs={10}>
                                  <div className="mb-3">
                                    <CFormLabel htmlFor="email">Email</CFormLabel>
                                    <CFormInput
                                      type="email"
                                      name="email"
                                      id="email"
                                      required
                                      placeholder="Enter Email ID"
                                      defaultValue={email}
                                      autoComplete="off"
                                      onChange={(e) => setEmail(e.target.value)}
                                    />
                                  </div>
                                </CCol>
                                <CCol xs={10}>
                                  <div className="mb-3">
                                    <CFormLabel htmlFor="mobile">Mobile Number</CFormLabel>
                                    <CFormInput
                                      type="text"
                                      id="mobile"
                                      name="mobile"
                                      placeholder="Enter Mobile Number"
                                      defaultValue={mobile}
                                      autoComplete="off"
                                      maxLength="10"
                                      required
                                      onChange={(e) => setMobile(e.target.value)}
                                    />
                                  </div>
                                </CCol>
                                <CCol xs={10}>
                                  <div className="mb-3">
                                    <CFormLabel htmlFor="designation">Designation</CFormLabel>
                                    <CFormInput
                                      type="text"
                                      id="designation"
                                      name="designation"
                                      placeholder="Enter Designation"
                                      defaultValue={designation}
                                      autoComplete="off"
                                      required
                                      onChange={(e) => setDesignation(e.target.value)}
                                    />
                                  </div>
                                </CCol>
                                <CCol xs={10}>
                                  <div className="mb-3">
                                    <CFormLabel htmlFor="profile_image">Profile Image</CFormLabel>
                                    <CFormInput
                                      type="file"
                                      id="profile_image"
                                      name="profile_image"
                                      autoComplete="off"
                                      onChange={(e) => setProfileimage(e.target.files[0])}
                                    />
                                  </div>
                                </CCol>
                                <CCol xs={8}>
                                  <div className="mb-3">
                                    <CButton color="primary" type="submit">
                                      Submit
                                    </CButton>
                                  </div>
                                </CCol>
                              </CRow>
                            </CForm>
                          </CCardBody>
                        </CCard>
                      </CCollapse>
                    </CCol>
                    <CCol xs={12}>
                      <CCollapse visible={visibleB}>
                        <CCard className="mt-3">
                          <CCardHeader>
                            <strong>Update Password</strong>
                          </CCardHeader>
                          <CCardBody>
                            <CForm onSubmit={updateuserPassword}>
                              <CRow>
                                <CCol xs={10}>
                                  <div className="mb-3">
                                    <CFormLabel htmlFor="password">Password</CFormLabel>
                                    <CFormInput
                                      type="password"
                                      name="password"
                                      id="password"
                                      required
                                      placeholder="Enter Password"
                                      defaultValue={password}
                                      autoComplete="off"
                                      onChange={(e) => setPassword(e.target.value)}
                                    />
                                  </div>
                                </CCol>
                                <CCol xs={10}>
                                  <div className="mb-3">
                                    <CFormLabel htmlFor="cpassword">Confirm Password</CFormLabel>
                                    <CFormInput
                                      type="password"
                                      id="cpassword"
                                      name="password"
                                      placeholder="Enter Confirm Password"
                                      defaultValue={cpassword}
                                      autoComplete="off"
                                      required
                                      onChange={(e) => setCPassword(e.target.value)}
                                    />
                                  </div>
                                </CCol>
                                <CCol xs={8}>
                                  <div className="mb-3">
                                    <CButton color="primary" type="submit">
                                      Submit
                                    </CButton>
                                  </div>
                                </CCol>
                              </CRow>
                            </CForm>
                          </CCardBody>
                        </CCard>
                      </CCollapse>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default UpdateProfile
