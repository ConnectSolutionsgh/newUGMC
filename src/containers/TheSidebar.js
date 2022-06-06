import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import kbthlogo from '../assets/icons/kbthlogo.png'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'
import adminNav from './adminNav'
import auth from '../components/services/authService'
import houNav from './houNav'
import hodNav from './hodNav'

const user = auth.getCurrentUser()

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img src={kbthlogo} alt="no img" width={225} height="80" />
        {/*<CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />*/}
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={
            user.isAdmin
              ? adminNav
              : user.isHeadOfUnit
              ? houNav
              : user.isHeadOfDepartment
              ? hodNav
              : navigation
          }
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
