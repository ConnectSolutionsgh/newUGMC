import { Redirect } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import auth from '../../components/services/authService'
import moment from 'moment'
import { toast } from 'react-toastify'
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import momentBusinessDays from 'moment-business-days'
import Swal from 'sweetalert2'
import {
  CBadge,
  CCard,
  CCardBody,
  //CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CModalFooter,
  CModalHeader,
  CModalBody,
  CCardHeader,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdownItem,
  CForm,
  //CCardFooter,
  CDropdownToggle,
  //CInputRadio,
  CDropdown,
  CModalTitle,
  //CFormText,
  //CTextarea,
  CFormGroup,
  CLabel,
  // CSwitch,
  CInput,
  //CInputFile,
  CSelect,
  CDropdownMenu,
  //CCardFooter,
  CInputGroup,
  //CForm,
} from '@coreui/react'
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
} from 'reactstrap'
const HoDAuthorisation = () => {
  const user = auth.getCurrentUser()
  const [department, setDepartment] = useState([])
  const [amendmentComment, setAmendmentComment] = useState('')
  const [unit, setUnit] = useState('')
  const [currentYear, setCurrentYear] = useState(0)
  const [minDate, setMinDate] = useState(new Date())
  const [maxDate, setMaxDate] = useState(new Date())
  const [unApprovedSchedules, setUnapprovedSchedules] = useState([])
  const [selectedForApproval, setSelectedForApproval] = useState([])
  const [search, setSearch] = useState('')
  const [rerender, setRerender] = useState(false)
  const [show, setShow] = useState(false)
  const [selectedDept, setSelectedDept] = useState('')

  const [selectedDate, setSelectedDate] = useState(new Date())

  const endDateRef = useRef()
  const numberOfDaysRef = useRef(0)
  const startDateRef = useRef()
  const fullNameRef = useRef('')
  const [numberOfDaysData, setNumberOfDaysData] = useState(0)
  const [fullName, setFullName] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [staffId, setStaffId] = useState('')
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const AmendmentCommentRef = useRef('')

  const [staffScheduleForm, setStaffScheduleForm] = useState({
    startDate: '',
    endDate: '',
    numberOfDays: '',
    amendmentComment: '',
    status: '',
    email: '',
    fullName: '',
    hrAmend: false,
  })
  const handleClose = () => {
    setShow(false)
    setStaffScheduleForm({
      startDate: '',
      endDate: '',
      numberOfDays: '',
      amendmentComment: '',
      status: 'Pending Approval',
      fullName: '',
      email: '',
      hrAmend: false,
    })
  }

  const handleShow = (s) => {
    console.log(s.staff.fullName)
    setId(s._id)
    setNumberOfDaysData(s.numberOfDays)
    setFullName(s.staff.fullName)
    setStartDate(moment(s.startDate).format('DD-MMMM-YYYY'))
    setEndDate(moment(s.endDate).format('DD-MMMM-YYYY'))
    setStaffId(s.staff.staffId)
    setEmail(s.staff.email)

    setStaffScheduleForm({
      startDate: moment(s.startDate).format('DD-MMMM-YYYY'),
      endDate: moment(s.endDate).format('DD-MMMM-YYYY'),
      numberOfDays: s.numberOfDays,
      fullName: fullName,
      email: email,
      hrAmend: true,
    })
    setShow(true)
  }

  const handleAmendmentComment = (e) => {
    setAmendmentComment(e.target.value)
    setStaffScheduleForm({
      ...staffScheduleForm,
      amendmentComment: e.target.value,
      status: 'Hou Approved',
      hrAmend: true,
    })
  }

  const handleNumberOfDayschange = (e) => {
    setNumberOfDaysData(e.target.value)
    const newDate = momentBusinessDays(startDate).businessAdd(
      parseInt(e.target.value),
    )._d
    const newEndDate = moment(newDate).format('DD-MMMM-YYYY')
    setEndDate(newEndDate)
    setStaffScheduleForm({
      ...staffScheduleForm,
      startDate: startDate,
      endDate,
      //endDate: endDateRef.current.value,
      numberOfDays: e.target.value,
      amendmentComment: AmendmentCommentRef.current.value,
      status: 'Hou Approved',
      hrAmend: true,
    })
  }

  const handleDatePicker = (sdate) => {
    setStartDate(moment(sdate).format('DD-MMMM-YYYY'))
    setSelectedDate(new Date(sdate))
    const newDate = momentBusinessDays(sdate).businessAdd(numberOfDaysData)._d
    const newEndDate = moment(newDate).format('DD-MMMM-YYYY')
    setEndDate(newEndDate)
    setStaffScheduleForm({
      ...staffScheduleForm,
      startDate: sdate,
      endDate: newEndDate,
      numberOfDays: numberOfDaysRef.current.value,
      amendmentComment: AmendmentCommentRef.current.value,
      status: 'Hou Approved',
      hrAmend: true,
    })
  }

  const handleAmend = async () => {
    const results = await axios.put(
      'https://ugmcservice.herokuapp.com/api/staffschedules/houamendschedule/' +
        id,
      staffScheduleForm,
    )
    setSelectedDept(selectedDept)

    if (results.status === 200) {
      Swal.fire('Success', 'Schedule Amended Successfully!', 'success')
    } else {
      Swal.fire('Failed', 'Error: Schedule Amendment FAILED', 'failed')
    }
    setRerender(true)
    setStaffScheduleForm({
      startDate: '',
      endDate: '',
      numberOfDays: '',
      amendmentComment: '',
      status: 'Pending Approval',
    })
    handleClose()
  }

  const handleEndDate = (e) => {
    const newEndDate = moment(e.target.value).format('DD-MMMM-YYYY')
    setEndDate(newEndDate)

    setStaffScheduleForm({
      startDate: startDate,
      endDate: e.target.value,
      numberOfDays: numberOfDaysRef.current.value,
      amendmentComment: AmendmentCommentRef.current.value,
      status: 'Hou Approved',
    })
  }

  useEffect(() => {
    async function getDepartmentsInHooks() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/departments',
      )
      setDepartment(results.data)
    }
    getDepartmentsInHooks()
  }, [department])

  useEffect(() => {
    async function getCurrentSetYear() {
      const yearResults = await axios.get(
        'https://ugmcservice.herokuapp.com/api/leaveyear',
      )

      setCurrentYear(yearResults.data[0].leaveYear)
      setMinDate(yearResults.data[0].startDate)
      setMaxDate(yearResults.data[0].endDate)
    }
    getCurrentSetYear()
  }, [currentYear, minDate, maxDate])

  useEffect(() => {
    async function getSchedules() {
      const yearResults = await axios.get(
        'https://ugmcservice.herokuapp.com/api/staffschedules/hodauthorisation/' +
          currentYear +
          '/' +
          'Hou Approved',
      )
      setUnapprovedSchedules(yearResults.data)
    }
    getSchedules()
  }, [unApprovedSchedules])

  /*async function reloadData(department) {
    const results = await axios.get(
      'https://ugmcservice.herokuapp.com/api/staffschedules/hodauthorisation/' +
        currentYear +
        '/' +
        'Hou Approved' +
        '/' +
        department,
    )
    setUnapprovedSchedules(results.data)
    setRerender(!rerender)
  }*/

  const updateHodAuthorisation = async (i) => {
    // getCheckedComment(i);
    const nowDate = new Date()
    await axios.put(
      'https://ugmcservice.herokuapp.com/api/staffschedules/hodauthorisation',
      {
        _id: i,
        status: 'HR Authorised',
        hodApprovedBy: user._id,
        hodDateApproved: nowDate.getDate(),
        hodComment: '-',
      },
    )
  }

  const handleAuthorise = () => {
    const ap = selectedForApproval.map((i) => updateHodAuthorisation(i))
    setRerender(!rerender)
    if (ap.length > 0) {
      toast.success('Staff Schedule(s) Authorised Successfully!', {
        position: toast.POSITION.TOP_CENTER,
      })
    } else {
      toast.error('Error: Schedule Authorisation FAILED', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }

  const updateHodReject = async (i) => {
    const nowDate = new Date()
    await axios.put(
      'https://ugmcservice.herokuapp.com/api/staffschedules/hodauthorisation',
      {
        _id: i,
        status: 'HOD Rejected',
        hodApprovedBy: user._id,
        hodDateApproved: nowDate.getDate(),
      },
    )
  }

  const handleReject = () => {
    const r = selectedForApproval.map((i) => updateHodReject(i))
    setRerender(!rerender)
    if (r.length > 0) {
      toast.info('Schedule(s) REJECTED!', {
        position: toast.POSITION.TOP_CENTER,
      })
    } else {
      toast.error('Error: Schedule REJECTION FAILED', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleSelectStaff = (event) => {
    const scheduleId = event.target.value

    if (!selectedForApproval.includes(scheduleId)) {
      setSelectedForApproval([...selectedForApproval, scheduleId])
    } else {
      setSelectedForApproval(
        selectedForApproval.filter((selectedId) => {
          return selectedId !== scheduleId
        }),
      )
    }
  }

  const handleSelectAll = () => {
    if (selectedForApproval.length < unApprovedSchedules.length) {
      // console.log(unApprovedSchedules.map((i) => i._id));
      setSelectedForApproval(dataTouse.map((i) => i._id))
    } else {
      setSelectedForApproval([])
    }
  }

  async function handleDepartmentChange(e) {
    setSelectedDept(e.target.value)
    const results = await axios.get(
      'https://ugmcservice.herokuapp.com/api/staffschedules/hodauthorisation/' +
        currentYear +
        '/' +
        'Hou Approved' +
        '/' +
        e.target.value,
    )
    // console.log(results.data);
    setUnapprovedSchedules(results.data)
  }

  const data = {
    schedules: unApprovedSchedules.filter(
      (item) =>
        item.staff.fullName.toLowerCase().includes(search.toLowerCase()) ||
        item.staff.staffId.includes(search.toLowerCase()),
    ),
  }

  const dataTouse = search.length === 0 ? unApprovedSchedules : data.schedules

  return (
    <div className="container-fluid">
      <CInputGroupAppend>
        <CCol className="text-center">
          <h4>APPROVED ANNUAL LEAVE SCHEDULES</h4>
        </CCol>
      </CInputGroupAppend>
      {/*  <CInputGroup className="mt-3">
        <CLabel htmlFor="departmentId" className="col-sm-3 mr-0">
          Select Department *
        </CLabel>
        <CSelect
          id="departmentId"
          className="form-control col-sm-8"
          value={selectedDept}
          onChange={(e) => handleDepartmentChange(e)}
        >
          <option value=""></option>
          {department.map((m) => (
            <option key={m._id} value={m._id} id={m._id}>
              {m.department}
            </option>
          ))}
        </CSelect>
      </CInputGroup>
          */}
      <p className="text-center">
        Search for all annual leave schedules approved by Heads Of Units with
        respect to the current year
      </p>
      <CInputGroup className="mt-1">
        <CLabel htmlFor="departmentId" className="col-sm-3" />
        <CInput
          className="col-sm-6"
          type="text"
          placeholder="Search with staffID or name"
          onChange={handleSearch}
        />
      </CInputGroup>

      <Table className="lg mt-3">
        <caption>APPROVED ANNUAL LEAVE SCHEDULES</caption>
        <thead>
          <tr>
            <th></th>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>No. of Days</th>

            <th></th>
          </tr>
        </thead>
        <tbody className="nameInput">
          {dataTouse.map((s, index) => (
            <tr key={s._id}>
              <td>{index + 1}</td>
              <td>{s.staff.staffId}</td>
              <td>{s.staff.fullName}</td>
              <td>{moment(s.startDate).format('DD,MMMM,YYYY')}</td>
              <td>{moment(s.endDate).format('DD,MMMM,YYYY')}</td>
              <td>{s.numberOfDays}</td>
              <td>
                <CButton
                  color="info"
                  className="btn-sm"
                  onClick={() => handleShow(s)}
                >
                  Amend
                </CButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <p className="hou-p">Showing {dataTouse.length} Schedules...</p>

      <CModal
        className="custom-dialog"
        show={show}
        data-backdrop="static"
        data-keyboard="false"
        size="md"
      >
        <CModalBody className="modal-body">
          <form className="row g-3">
            <CInputGroup className="mt-3">
              <CLabel htmlFor="relievingOfficer" className="col-sm-3">
                Staff ID *
              </CLabel>

              <CInput
                className="form-control col-sm-8"
                type="text"
                readOnly={true}
                value={staffId}
              />
            </CInputGroup>
            <CInputGroup className="mt-3">
              <CLabel htmlFor="contactWhenAway" className="col-sm-3">
                Full Name *
              </CLabel>

              <CInput
                className="form-control col-sm-8"
                type="text"
                readOnly={true}
                ref={fullNameRef}
                value={fullName}
              />
            </CInputGroup>
            <CInputGroup className="mt-3">
              <CLabel htmlFor="daysRequested" className="col-sm-3">
                Days *
              </CLabel>

              <CInput
                ref={numberOfDaysRef}
                className="form-contro col-sm-8"
                type="text"
                value={numberOfDaysData}
                onChange={handleNumberOfDayschange}
              />
            </CInputGroup>
            <div className="row col-sm-12">
              <CInputGroup className="mt-3">
                <div className="col-sm-3">
                  <CLabel htmlFor="startdate" className="col-sm-4">
                    New Start Date *
                  </CLabel>
                </div>
                <div className="col-sm-8">
                  <DatePicker
                    className="form-control col-sm-12"
                    dateformat="dd-MMMM-yyyy"
                    value={staffScheduleForm.startDate}
                    ref={startDateRef}
                    selected={selectedDate}
                    onChange={handleDatePicker}
                    filterDate={(date) =>
                      date.getDay() !== 0 && date.getDay() !== 6
                    }
                    showYearDropdown
                    showMonthDropdown
                    scrollableMonthYearDropdown
                    showFourColumnMonthYearPicker
                  />
                </div>
              </CInputGroup>
            </div>
            <CInputGroup className="mt-3">
              <CLabel htmlFor="endDate" className="col-sm-3">
                Proposed End Date *
              </CLabel>

              <CInput
                type="text"
                className="form-control col-sm-8"
                dateformat="dd-MMMM-yyyy"
                value={staffScheduleForm.endDate}
                readOnly="readOnly"
                onChange={handleEndDate}
              />
            </CInputGroup>
            <CInputGroup className="mt-3">
              <CLabel htmlFor="daysRequested" className="col-sm-3">
                Reason *
              </CLabel>

              <textarea
                ref={AmendmentCommentRef}
                className="form-control col-sm-8"
                type="text"
                value={amendmentComment}
                onChange={handleAmendmentComment}
              />
            </CInputGroup>
          </form>

          <CButton
            color="success"
            className=" float-right m-3"
            onClick={handleAmend}
          >
            <span> Amend</span>
          </CButton>

          <CButton
            color="danger"
            className="btnclose float-right m-3"
            onClick={handleClose}
          >
            Close
          </CButton>
        </CModalBody>
      </CModal>
    </div>
  )
}

export default HoDAuthorisation
