import React from 'react'
import LeaveDispatch from './views/pages/leaveDispatch'
import auth from '../src/components/services/authService'

const user = auth.getCurrentUser

const Toaster = React.lazy(() =>
  import('./views/notifications/toaster/Toaster'),
)
const Tables = React.lazy(() => import('./views/base/tables/Tables'))

const Breadcrumbs = React.lazy(() =>
  import('./views/base/breadcrumbs/Breadcrumbs'),
)
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'))

const Form = React.lazy(() => import('./views/planning/Form'))
const It = React.lazy(() => import('./views/planning/It'))
const Support = React.lazy(() => import('./views/planning/Support'))
const Empdetails = React.lazy(() => import('./views/planning/EmpDetails'))
const DBsystem = React.lazy(() => import('./views/planning/DBsystem'))
const FamDetails = React.lazy(() => import('./views/planning/FamDetails'))
const CurPosting = React.lazy(() => import('./views/planning/CurPosting'))
const Inters = React.lazy(() => import('./views/planning/Inters'))
const AddStaff = React.lazy(() => import('./views/pages/addStaff'))
const AddAdmin = React.lazy(() => import('./views/pages/addAdmin'))
const UnitHead = React.lazy(() => import('./views/pages/unitHead'))
const DeptHead = React.lazy(() => import('./views/pages/deptHead'))
const Supervisor = React.lazy(() => import('./views/pages/supervisor'))
const LeaveSchedule = React.lazy(() => import('./views/pages/leaveSchedule'))
const LeaveRequest = React.lazy(() => import('./views/pages/leaveRequest'))
const ExcuseDuty = React.lazy(() => import('./views/pages/excuseDuty'))
const LeaveResumption = React.lazy(() =>
  import('./views/pages/leaveResumption'),
)
const HOULeaveSchedulesApproval = React.lazy(() =>
  import('./views/pages/houSchedulesApproval'),
)

const HODLeaveSchedulesApproval = React.lazy(() =>
  import('./views/pages/HRSchedulesAmendment'),
)

const HODLeaveRequestsApproval = React.lazy(() =>
  import('./views/pages/applicationHODApproval'),
)

const HOURequestApproval = React.lazy(() =>
  import('./views/pages/applicationHOUApproval'),
)

//houschedulesapproval
const RecallFromLeave = React.lazy(() =>
  import('./views/pages/recallFromLeave'),
)
//const AddEmp = React.lazy(() => import('./views/base/Modal/AddEmp'));

const Academy = React.lazy(() => import('./views/setup/AcQua'))

const AppointDetails = React.lazy(() =>
  import('./views/planning/AppointDetails'),
)
const Directorate = React.lazy(() => import('./views/setup/Directorate'))
const Inst = React.lazy(() => import('./views/setup/Inst'))
const Units = React.lazy(() => import('./views/setup/Uni'))

//const Tables = React.lazy(() => import('./views/tables/Tables'));

const Jumbotrons = React.lazy(() =>
  import('./views/base/jumbotrons/Jumbotrons'),
)
const ListGroups = React.lazy(() =>
  import('./views/base/list-groups/ListGroups'),
)
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() =>
  import('./views/base/paginations/Pagnations'),
)
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const ProgressBar = React.lazy(() =>
  import('./views/base/progress-bar/ProgressBar'),
)
const Switches = React.lazy(() => import('./views/base/switches/Switches'))

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))
const BrandButtons = React.lazy(() =>
  import('./views/buttons/brand-buttons/BrandButtons'),
)
const ButtonDropdowns = React.lazy(() =>
  import('./views/buttons/button-dropdowns/ButtonDropdowns'),
)
const ButtonGroups = React.lazy(() =>
  import('./views/buttons/button-groups/ButtonGroups'),
)
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const Charts = React.lazy(() => import('./views/charts/Charts'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CoreUIIcons = React.lazy(() =>
  import('./views/icons/coreui-icons/CoreUIIcons'),
)
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() =>
  import('./views/theme/typography/Typography'),
)
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
const Users = React.lazy(() => import('./views/users/Users'))

const User = React.lazy(() => import('./views/users/User'))

const Leave = React.lazy(() => import('./views/setup/Leave'))
const YearLeave = React.lazy(() => import('./views/setup/YearLeave'))
const Holidays = React.lazy(() => import('./views/setup/Holidays'))
const Depart = React.lazy(() => import('./views/setup/Depart'))
const Grade = React.lazy(() => import('./views/setup/Grade'))
const Uni = React.lazy(() => import('./views/setup/Uni'))
const SysAdmin = React.lazy(() => import('./views/setup/SysAdmin'))
const StaffMgt = React.lazy(() => import('./views/Admin/StaffMgt'))

const Login = React.lazy(() => import('./views/setup/Login'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },

  { path: '/psm/form', name: 'Form', component: Form },
  { path: '/psm/it', name: 'It', component: It },
  { path: '/psm/support', name: 'IT Support', component: Support },
  { path: '/psm/empdetails', name: 'Employee Details', component: Empdetails },
  { path: '/psm/dbsystem', name: 'Database System', component: DBsystem },
  { path: '/psm/famdetails', name: 'Family  Details', component: FamDetails },
  { path: '/psm/curposting', name: 'Current Psoting', component: CurPosting },
  { path: '/psm/inters', name: 'Intership', component: Inters },

  //{ path: '/base/modal/addemp', name: 'AddEmp', component: AddEmp },

  { path: '/Administration/Units', name: 'Units Setup', component: Units },
  {
    path: '/psm/appointdetails',
    name: 'Appointment Details',
    component: AppointDetails,
  },
  {
    path: '/Administration/Directorate',
    name: 'Directorate Setup',
    component: Directorate,
  },
  { path: '/Administration/Inst', name: 'Institution Setup', component: Inst },

  { path: '/Setup/Leave', name: 'Leave Setup', component: Leave },
  { path: '/Setup/YearLeave', name: 'Year Leave', component: YearLeave },
  { path: '/Setup/Holidays', name: 'Calender Holidays', component: Holidays },
  {
    path: '/setup/Directorate',
    name: 'Directorate Setup',
    component: Directorate,
  },
  { path: '/setup/Depart', name: 'Department Setup', component: Depart },
  { path: '/setup/Grade', name: 'Grade Setup', component: Grade },
  { path: '/setup/Uni', name: 'Unit Setup', component: Uni },
  {
    path: '/setup/SysAdmin',
    name: 'System Administration',
    component: SysAdmin,
  },
  { path: '/Admin/StaffMgt', name: 'Staff Management', component: StaffMgt },

  {
    path: '/Administration/Academy',
    name: 'Academic Quafilification Setup',
    component: Academy,
  },

  //{ path: '/tables/tables', name: 'Tables', component: Tables },

  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  {
    path: '/buttons/button-dropdowns',
    name: 'Dropdowns',
    component: ButtonDropdowns,
  },
  {
    path: '/buttons/button-groups',
    name: 'Button Groups',
    component: ButtonGroups,
  },
  {
    path: '/buttons/brand-buttons',
    name: 'Brand Buttons',
    component: BrandButtons,
  },

  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Alerts,
    exact: true,
  },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  {
    path: '/staff/addstaff',
    name: 'Add Staff',
    component: AddStaff,
  },
  {
    path: '/staff/addadmin',
    name: 'Add Admin',
    component: AddAdmin,
  },
  {
    path: '/staff/unithead',
    name: 'Unit Head',
    component: UnitHead,
  },

  {
    path: '/staff/departmenthead',
    name: 'Department Head',
    component: DeptHead,
  },

  {
    path: '/staff/supervisor',
    name: 'Unit Supervisor',
    component: Supervisor,
  },
  {
    path: '/leave/leaveschedule',
    name: 'Leave Schedule',
    component: LeaveSchedule,
  },

  {
    path: '/leave/leaverequest',
    name: 'Leave Request',
    component: LeaveRequest,
  },
  {
    path: '/leave/excuseduty',
    name: 'Excuse Duty',
    component: ExcuseDuty,
  },
  {
    path: '/leave/leaveresumption',
    name: 'Leave Resumption',
    component: LeaveResumption,
  },
  {
    path: '/leave/recallfromleave',
    name: 'Recall from Leave',
    component: RecallFromLeave,
  },
  {
    path: '/leave/dispatch',
    name: 'Leave Dispatch',
    component: LeaveDispatch,
  },

  {
    path: '/approval/houschedulesapproval',
    name: 'Leave Schedules Approval',
    component: HOULeaveSchedulesApproval,
  },

  {
    path: '/approval/hodschedulesapproval',
    name: 'Schedules Approval',
    component: HODLeaveSchedulesApproval,
  },
  {
    path: '/approval/hodrequestapprovals',
    name: 'Request Approvals',
    component: HODLeaveRequestsApproval,
  },

  {
    path: '/approval/requestapprovals',
    name: 'Requests Approval',
    component: HOURequestApproval,
  },

  { path: '/home', exact: true, name: 'Home' },
  { path: '/login', exact: true, name: 'Login', component: Login },
]

export default routes
