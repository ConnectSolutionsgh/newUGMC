import React from 'react'
import CIcon from '@coreui/icons-react'
export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'MAIN DASHBOARDS',
    to: '/dashboard',
    icon: (
      <CIcon
        name="cil-speedometer"
        color="blue"
        customClasses="c-sidebar-nav-icon"
      />
    ),

    badge: {
      color: 'info',
      text: 'PS',
    },
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'HR DASHBOARD',
    to: '/dashboard',
    icon: (
      <CIcon
        name="cil-speedometer"
        color="blue"
        customClasses="c-sidebar-nav-icon"
      />
    ),
    badge: {
      color: 'info',
      text: 'PS',
    },
  },
  /*{
    _tag: 'CSidebarNavDropdown',
    name: 'SETUPS',
    to: '/home',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'success',
      text: 'PS',
    },
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Setup',
        to: '/setup/Leave',
        icon: 'cilNotes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Grade Setup',
        to: '/setup/Grade',
        icon: 'cilNotes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Holiday Setup',
        to: '/setup/Holidays',
        icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Year',
        to: '/setup/YearLeave',
        icon: 'cilNotes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Directorate Setup',
        to: '/setup/Directorate',
        icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Department Setup',
        to: '/setup/Depart',
        icon: 'cilNotes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Unit Setup',
        to: '/setup/Uni',
        icon: 'cilNotes',
      },
    ],
  },*/
  {
    _tag: 'CSidebarNavDropdown',
    name: 'LEAVE ADMINISTRATION',
    to: '/home',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'success',
      text: 'PS',
    },
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Annual Leave Schedule',
        to: '/leave/leaveschedule',
        icon: 'cilNotes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Requests',
        to: '/leave/leaverequest',
        icon: 'cilNotes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Excuse Duty',
        to: '/leave/excuseduty',
        icon: 'cilNotes',
      },
      /*{
        _tag: 'CSidebarNavItem',
        name: 'Leave Resumption',
        to: '/leave/leaveresumption',
        icon: 'cilNotes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Recall from Leave',
        to: '/leave/recallfromleave',
        icon: 'cilNotes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Dispatch',
        to: '/leave/dispatch',
        icon: 'cilNotes',
      },*/
    ],
  },

  /* {
    _tag: 'CSidebarNavDropdown',
    name: 'SYSTEM MANAGEMENT',
    route: '#',
    icon: 'cil-calculator',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add Staff',
        to: '/staff/addstaff',
        icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Add Admin',
        to: '/staff/addadmin',
        icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Unit Head',
        to: '/staff/unithead',
        icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Department Head',
        to: '/staff/departmenthead',
        icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Unit Supervisor',
        to: '/staff/supervisor',
        icon: 'cilNotes',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'HOD Management',
        to: '/Administration/Depart',
        icon: 'cilNotes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'HOU Management',
        to: '/Administration/Units',
        icon: 'cilNotes',
      },
    ],
  },*/
  {
    _tag: 'CSidebarNavDropdown',
    name: 'APPROVALS',
    route: '/base',
    icon: 'cil-calculator',
    _children: [
      /*{
        _tag: 'CSidebarNavDropdown',
        name: 'HOU Approvals',
        to: '/psm/Location',
        icon: 'cilNotes',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'Schedules Approval',
            to: '/approval/houschedulesapproval',
            icon: <CIcon name="cilNotes" customClasses="c-sidebar-nav-icon" />,
            badge: {
              color: 'success',
              text: 'PS',
            },
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Requests Approval',
            to: '/approval/requestapproval',
            icon: <CIcon name="cilNotes" customClasses="c-sidebar-nav-icon" />,

            badge: {
              color: 'warning',
              text: 'PS',
            },
          },
        ],
      },*/
      {
        _tag: 'CSidebarNavDropdown',
        name: 'HOD Leave Approval',
        to: '#',
        icon: 'cilNotes',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'View Leave Schedules',
            to: '/approval/hodschedulesapproval',
            icon: <CIcon name="cilNotes" customClasses="c-sidebar-nav-icon" />,

            badge: {
              color: 'danger',
              text: 'PS',
            },
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Request Approvals',
            to: '/approval/hodrequestapprovals',
            icon: <CIcon name="cilNotes" customClasses="c-sidebar-nav-icon" />,

            badge: {
              color: 'info',
              text: 'PS',
            },
          },
        ],
      },
      /* {
        _tag: 'CSidebarNavItem',
        name: 'HRM Approval',
        to: '/psm/Salaries',
        icon: 'cilNotes',
      },*/
    ],
  },

  /* {
    _tag: 'CSidebarNavItem',
    name: 'ADMINISTRATION',
    to: '/',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'danger',
      text: 'PS',
    },
  },*/
]
