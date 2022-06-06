import React, { useState, useEffect, useRef, useHistory } from 'react'
import axios from 'axios'
import Joi from 'joi-browser'
import Swal from 'sweetalert2'

import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
//import { getCurrentUser } from "../services/authService";
import { Modal } from 'react-bootstrap'
import Moment from 'moment'
import auth from '../../components/services/authService'
import { extendMoment } from 'moment-range'
import momentBusinessDays from 'moment-business-days'
import _ from 'lodash'
import RequestCard from '../../components/requestCard'
//import "react-calendar/dist/Calendar.css";

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
import { render } from 'enzyme'

const moment = extendMoment(Moment)

const LeaveRequest = () => {
  const user = auth.getCurrentUser()
  const d = new Date()

  const [leaveData, setLeaveData] = useState({
    staffId: '',
    fullName: '',
    department: '',
    email: '',
    unit: '',
    grade: '',
    leave: '',
    relievingOfficer: '',
    contactWhenAway: '',
    daysRequested: 0,
    startDate: new Date(),
    endDate: '',
    holidays: 0,
    outStandingDays: 0,
    leaveYear: 0,
    supervisor: '',
    supervisorEmail: '',
  })
  const [id, setId] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [askDelete, setAskDelete] = useState(false)
  const [daysEntitled, setDaysEntitled] = useState(0)
  const [departments, setDepartments] = useState([])
  const [unit, setUnit] = useState([])
  const [disableButton, setDisableButton] = useState(false)
  const [leaves, setLeaves] = useState([])
  const [leaveRequests, setLeaveRequests] = useState([])
  const [show, setShow] = useState(false)
  const [alertShow, setAlertShow] = useState(false)
  const [schedules, setSchedules] = useState([])
  const [pending, setPending] = useState([])
  const [rerender, setRerender] = useState(false)
  const [re, setRe] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [maxDate, setMaxDate] = useState(new Date())
  const [minDate, setMinDate] = useState(new Date())
  const [requestedDays, setRequestedDays] = useState(0)
  const [pendingApprovals, setPendingApprovals] = useState([])

  const handleClose = () => {
    setLeaveData({
      staffId: '',
      fullName: '',
      email: '',
      department: '',
      unit: '',
      grade: '',
      leave: '',
      relievingOfficer: '',
      contactWhenAway: '',
      daysRequested: 0,
      startDate: '',
      endDate: '',
      holidays: 0,
      outStandingDays: 0,
      leaveYear: 0,
      supervisor: '',
      supervisorEmail: '',
    })
    setShow(!show)
  }
  const handleShow = () => setShow(!show)
  const [workingDays, setWorkingDays] = useState([])
  const [holidays, setHolidays] = useState([])
  const [holidayDates, setHolidayDates] = useState([])
  const [stDate, setStDate] = useState(new Date())
  const [enDate, setEnDate] = useState(new Date())
  const [daysRequest, setDaysRequest] = useState(0)
  const [holidaysInyear, setHolidaysInyear] = useState(0)
  const [supervisors, setSupervisors] = useState([])
  const [currentYear, setCurrentYear] = useState(0)
  const [name, setName] = useState('')
  const [holidaysInPeriod, setHolidaysInPeriod] = useState(0)
  const [annualLeaveRequests, setAnnualLeaveRequests] = useState([])
  const [annualLeaveDays, setAnnualLeaveDays] = useState(0)
  const [staffLeaves, setStaffLeaves] = useState([])
  const requestedDaysRef = useRef()
  const endDateRef = useRef()
  const startDateRef = useRef()
  const supervisorRef = useRef()

  useEffect(() => {
    async function getDaysEntitled() {
      const entitledDays = await axios.get(
        'https://ugmcservice.herokuapp.com/api/grades/' + user.grade,
      )
      setDaysEntitled(entitledDays.data[0].days)
    }
    getDaysEntitled()
  }, [user.grade])

  useEffect(() => {
    async function getLeaves() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/leaves',
      )
      setLeaves(results.data)
    }
    getLeaves()
  }, [leaves])

  useEffect(() => {
    async function getCurrentSetYear() {
      const yearResults = await axios.get(
        'https://ugmcservice.herokuapp.com/api/leaveyear',
      )
      setCurrentYear(yearResults.data[0].leaveYear)

      setMaxDate(yearResults.data[0].endDate)
      setMinDate(yearResults.data[0].startDate)
    }
    getCurrentSetYear()
  }, [currentYear, maxDate, minDate])

  useEffect(() => {
    async function getHolidays() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/holidays/days/' + currentYear,
      )
      setHolidays(results.data)
    }
    getHolidays()
  }, [holidays, currentYear])

  useEffect(() => {
    async function getStaffLeaveRequests() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/leaverequests/requests/' +
          currentYear +
          '/' +
          user._id,
      )
      setLeaveRequests(results.data)
      setRerender(!rerender)
    }
    getStaffLeaveRequests()
  }, [leaveRequests])

  const activeLeave = leaveRequests.filter(
    (l) =>
      l.isHouApproved === false ||
      l.isHoDApproved === false ||
      l.status !== 'HOD Approved' ||
      l.dispatchStatus === 'Not Dispatched' ||
      l.resumptionStatus === 'Not Resumed',
  )

  useEffect(() => {
    async function getStaffLeaves() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/leaverequests/requests/' +
          currentYear +
          '/' +
          user._id,
      )
      setStaffLeaves(results.data)
    }
    getStaffLeaves()
  }, [currentYear, user._id, pendingApprovals])

  useEffect(() => {
    async function getStaffAnnualLeaveRequests() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/leaverequests/requests/' +
          currentYear +
          '/' +
          user._id +
          '/' +
          'Annual',
      )
      setAnnualLeaveRequests(results.data)
      setRerender(!rerender)
    }
    getStaffAnnualLeaveRequests()
  }, [currentYear, user._id, rerender])

  useEffect(() => {
    async function getStaffPendingApproval() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/leaverequests/requests/app/' +
          currentYear +
          '/' +
          user._id +
          '/' +
          'Pending Approval',
      )
      setPendingApprovals(results.data)
    }
    getStaffPendingApproval()
  }, [currentYear, user._id, pendingApprovals])

  useEffect(() => {
    async function getDepartments() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/departments',
      )
      setDepartments(results.data)
    }
    getDepartments()
  }, [departments])

  const joiHolidaySchema = Joi.object().keys({
    holiday: Joi.string().required().label('Holiday'),
    date: Joi.date().required().label('date'),
  })

  const validateEntry = () => {
    const result = Joi.validate(leaveData, joiHolidaySchema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  useEffect(() => {
    async function getSchedules() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/staffschedules/schedule/' +
          user._id +
          '/' +
          currentYear,
      )

      setSchedules(results.data)
    }
    getSchedules()
  }, [currentYear, user._id, schedules])

  useEffect(() => {
    async function getSchedulesPending() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/staffschedules/check/' +
          user._id +
          '/' +
          currentYear +
          '/' +
          'Pending Approval',
      )

      setPending(results.data)
    }
    getSchedulesPending()
  }, [pending, user._id, currentYear])

  const handleSubmit = async () => {
    console.log(activeLeave)

    if (activeLeave.length > 0) {
      return Swal.fire(
        'Oops! Active Leave Detected.',
        'You cannot proceed when there is already an ACTIVE LEAVE.',
        'error',
      )
    }
    if (schedules.length === 0) {
      return Swal.fire(
        'Oops! Leave Schedule Voilation.',
        'You have NOT Made any leave Schedules for the year.',
        'error',
      )
    }

    if (pending.length > 0) {
      return Swal.fire(
        'Voilation',
        'All your schedules must be APPROVED before you can request for days off !',
        'info',
      )
    }

    if (pendingApprovals.length > 0) {
      return Swal.fire(
        'Voilation',
        'You have leave request Pending Approval !',
        'info',
      )
    }
    if (
      new Date(leaveData.startDate) < new Date(minDate) ||
      new Date(leaveData.endDate) > new Date(maxDate) ||
      new Date(leaveData.startDate) > new Date(maxDate) ||
      new Date(leaveData.endDate) < new Date(minDate)
    ) {
      return Swal.fire(
        'Voilation',
        'Start and End Dates should be within the Current Year!',
        'info',
      )
    }
    if (
      leaveData.leave === 'Annual' &&
      leaveData.daysRequested > parseInt(daysEntitled - annualLeaveDays)
    ) {
      return Swal.fire(
        'Voilation',
        'You cannot exceed your Annual Leave Days !',
        'info',
      )
    }

    try {
      const results = await axios.post(
        'https://ugmcservice.herokuapp.com/api/leaverequests',
        leaveData,
      )

      if (results.status === 200) {
        Swal.fire(
          'Success',
          'Leave Request Submitted Successfully. Pending Approvals',
          'success',
        )

        setDisableButton(false)
        handleClose()
      } else {
        Swal.fire('Failed', 'Leave Application, FAILED !', 'error')
        setDisableButton(false)
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        Swal.fire(
          'Failed',
          'Leave Request Submission FAILED, Please try again',
          'error',
        )
      }
    }
  }

  function getDates(startDate, endDate) {
    const dates = []
    let currentDate = new Date(startDate.setHours(0, 0, 0, 0))
    const addDays = function (days) {
      const date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
    }
    while (currentDate <= endDate) {
      dates.push(currentDate)
      currentDate = addDays.call(currentDate, 1)
    }

    setHolidayDates([])
    holidays.map((d) => {
      const hdates = new Date(d.hdate)
      return holidayDates.push(hdates)
    })

    const weekDays = dates.filter((d) => !d.getDay % 6 === 0)
    const HolidaysResults = _.intersectionWith(
      weekDays,
      holidayDates,
      _.isEqual,
    )
    setHolidaysInPeriod(HolidaysResults.length)
    setWorkingDays(weekDays)
  }

  const handleDaysChange = (e) => {
    setHolidaysInyear(holidays.length)
    setDaysRequest(e.currentTarget.value)
    const newDate = momentBusinessDays(stDate, 'DD-MM-YYYY').businessAdd(
      e.currentTarget.value,
      //requestedDaysRef.current.value,
    )._d
    setLeaveData({
      ...leaveData,
      endDate: newDate.toDateString('DD-MM-YYYY'),
    })
    getDates(new Date(stDate), new Date(e.currentTarget.value))

    const endDate = momentBusinessDays(stDate, 'DD-MM-YYYY').businessAdd(
      parseInt(e.currentTarget.value) + holidaysInPeriod,
    )._d

    const currentEndDate = endDate.toDateString('DD-MM-YYYY')
    setLeaveData({
      ...leaveData,
      daysRequested: e.currentTarget.value,
      endDate: currentEndDate,
      holidays: holidaysInPeriod,
    })
  }

  const handleStartDate = (sdate) => {
    setHolidaysInyear(holidays.length)
    let dateSelected = new Date(sdate)
    setStDate(dateSelected)
    const newDate = momentBusinessDays(dateSelected, 'DD-MM-YYYY').businessAdd(
      leaveData.daysRequested,
    )._d
    setLeaveData({
      ...leaveData,
      endDate: newDate.toDateString('DD-MM-YYYY'),
    })

    getDates(new Date(dateSelected), new Date(leaveData.endDate))

    const endDate = momentBusinessDays(dateSelected, 'DD-MM-YYYY').businessAdd(
      parseInt(leaveData.daysRequested) + holidaysInPeriod,
    )._d
    const currentEndDate = endDate.toDateString('DD-MM-YYYY')
    setLeaveData({
      ...leaveData,
      email: user.email,
      startDate: dateSelected,
      endDate: currentEndDate,
      holidays: holidaysInPeriod,
    })
  }

  const handleEndDate = () => {
    setEnDate(endDateRef.current.value)
    setLeaveData({
      ...leaveData,
      endDate: endDateRef.current.value,
    })
  }

  const handleDelete = async (s) => {
    setId(s._id)
    setAskDelete(!askDelete)
  }

  async function handleDepartmentChange(e) {
    setSelectedDepartment(e.currentTarget.value)
    setLeaveData({ ...leaveData, department: e.currentTarget.value })
    const results = await axios.get(
      'https://ugmcservice.herokuapp.com/api/units/' + e.currentTarget.value,
    )
    setUnit(results.data)
    setHolidayDates(holidays.map((h) => new Date(h.date)))
  }

  async function handleUnitChange(e) {
    setLeaveData({
      ...leaveData,
      unit: e.currentTarget.value,
      email: user.email,
    })
    const results = await axios.get(
      'https://ugmcservice.herokuapp.com/api/unitsupervisor/' +
        leaveData.department +
        '/' +
        e.currentTarget.value,
    )

    setSupervisors(results.data)
  }

  const handleYes = async () => {
    try {
      await axios.delete(
        'https://ugmcservice.herokuapp.com/api/leaverequests/' + id,
      )
      const leaves = leaveRequests.filter((m) => m.id !== id)
      setRerender(!rerender)
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error('Leave application Deletion FAILED, Please try again', {
          position: toast.POSITION.BOTTOM_CENTER,
        })
      }
    }
    setAskDelete(false)
  }

  useEffect(() => {
    const sumOfRequestDays = () => {
      const days = leaveRequests
        .map((days) => days.daysRequested)
        .reduce((prev, curr) => {
          return prev + curr
        }, 0)
      setRequestedDays(days)
      //console.log(days)
    }
    sumOfRequestDays()
  }, [requestedDays, leaveRequests])

  useEffect(() => {
    const sumOfAnnualLeaveRequestDays = () => {
      const days = annualLeaveRequests
        .map((days) => days.daysRequested)
        .reduce((prev, curr) => {
          return prev + curr
        }, 0)
      setAnnualLeaveDays(days)
    }
    sumOfAnnualLeaveRequestDays()
  }, [annualLeaveDays, annualLeaveRequests])

  const cardStyle = {
    'max-width': '12rem',
    'text-align': 'center',
    height: '115px',
    width: '10rem',
  }

  const highlight = ({ activeStartDate, date, view }) => {
    if (
      holidays.find(
        (x) => new Date(x.date).valueOf() === new Date(date).valueOf(),
      )
    ) {
      return 'holidays'
    }
  }

  return (
    <div className="container-fluid">
      <CInputGroupAppend>
        <CCol></CCol>
        <CButton
          color="success"
          className="findbutton mb-3"
          onClick={handleShow}
        >
          + Make Leave Request
        </CButton>
      </CInputGroupAppend>

      <RequestCard
        currentYear={currentYear}
        daysEntitled={daysEntitled}
        daysRequested={annualLeaveDays}
        DaysRemained={daysEntitled - annualLeaveDays}
      />

      <CInputGroup className="mt-3 mb-3">
        <table className="table table-hover table-striped table-outline mb-0 d-none d-sm-table table-sm">
          <caption>Leave Requests</caption>
          <thead>
            <tr className="fs-sm">
              <th></th>
              <th>Leave</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Days</th>
              <th>Holidays</th>
              <th>Relieving Officer</th>
              <th>Approval Status</th>
              <th>Dispatched ?</th>
              <th>Resumption </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((s, index) => (
              <tr key={s._id}>
                <td>{index + 1}</td>
                <td>{s.leave}</td>
                <td>{moment(s.startDate).format('DD-MMMM-YYYY')}</td>
                <td>{moment(s.endDate).format('DD-MMMM-YYYY')}</td>
                <td>{s.daysRequested}</td>
                <td>{s.holidays}</td>
                <td>{s.relievingOfficer}</td>
                <td>{s.status}</td>
                <td>{s.dispatchStatus}</td>
                <td>{s.resumptionStatus}</td>
                <td>
                  {(s.status === 'Pending Approval' ||
                    s.status === 'HOU Rejected' ||
                    s.status === 'HOD Rejected') && (
                    <CButton
                      onClick={() => handleDelete(s)}
                      className="btn-sm"
                      color="danger"
                    >
                      Delete
                    </CButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CInputGroup>
      <CModal
        className="modal fade"
        size="lg"
        show={show}
        data-backdrop="static"
        data-keyboard="false"
      >
        <CModalHeader closeButton>
          <CModalTitle>LEAVE MGT | LEAVE REQUESTS </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form>
            <CRow>
              <CCol xs="12" md="12">
                <CCard>
                  <CCardHeader>LEAVE REQUEST</CCardHeader>
                  <CCardBody>
                    <CFormGroup row>
                      <CInputGroup>
                        <div className="form-group col-sm-12">
                          <CLabel htmlFor="departmentId" className="form-label">
                            Current Dept.
                          </CLabel>
                          <select
                            id="departmentId"
                            className="form-control classic "
                            value={leaveData.department}
                            onChange={handleDepartmentChange}
                          >
                            <optgroup>
                              <option
                                value=""
                                className="option"
                                disabled
                                selected
                              >
                                Department *
                              </option>
                            </optgroup>
                            {departments.map((m) => (
                              <optgroup>
                                {' '}
                                <option key={m._id} value={m._id} id={m._id}>
                                  {m.department}
                                </option>
                              </optgroup>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-sm-12">
                          <label htmlFor="unit" className="form-label">
                            Current Unit
                          </label>
                          <select
                            id="unit"
                            className="form-control classic"
                            value={leaveData.unit}
                            onChange={handleUnitChange}
                          >
                            <optgroup>
                              <option
                                value=""
                                className="option"
                                disabled
                                selected
                              >
                                Unit *
                              </option>
                            </optgroup>
                            {unit.map((u) => (
                              <optgroup>
                                {' '}
                                <option key={u._id} value={u._id}>
                                  {u.unit}
                                </option>
                              </optgroup>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-sm-12">
                          <label htmlFor="name" className="form-label">
                            Immediate Supervisor *
                          </label>{' '}
                          <select
                            id="name"
                            className="form-control classic"
                            value={leaveData.supervisor}
                            onChange={(e) => {
                              setLeaveData({
                                ...leaveData,
                                supervisor: e.currentTarget.value,
                                supervisorEmail: supervisors[0].email,
                              })
                            }}
                          >
                            <option value="">--Select--</option>
                            {supervisors.map((su) => (
                              <option key={su._id} value={su.user._id}>
                                {su.user.fullName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group col-sm-12">
                          <label htmlFor="leaveType" className="form-label">
                            Leave *
                          </label>

                          <select
                            id="leaveType"
                            className="form-control classic"
                            value={leaveData.leave}
                            onChange={(e) => {
                              setLeaveData({
                                ...leaveData,
                                leave: e.target.value,
                                staffId: user.staffId,
                                staff: user._id,
                                fullName: user.fullName,
                                email: user.email,
                                grade: user.grade,
                                leaveYear: currentYear,
                                outStandingDays: 0,
                                status: 'Pending Approval',
                              })
                            }}
                          >
                            <option value="" disabled selected>
                              Leave Type{' '}
                            </option>
                            {leaves.map((l) => (
                              <option key={l._id} value={l.leave} id={l._id}>
                                {l.leave}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-sm-12">
                          <label
                            htmlFor="relievingOfficer"
                            className="form-label"
                          >
                            Relieving Officer *
                          </label>

                          <CInput
                            className="form-control"
                            type="text"
                            value={leaveData.relievingOfficer}
                            // placeholder="Year"
                            onChange={(e) =>
                              setLeaveData({
                                ...leaveData,
                                relievingOfficer: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="form-group col-sm-12">
                          <label
                            htmlFor="contactWhenAway"
                            className="form-label"
                          >
                            Contact When Away *
                          </label>

                          <CInput
                            className="form-control col-sm-6"
                            type="text"
                            value={leaveData.contactWhenAway}
                            // placeholder="Year"
                            onChange={(e) =>
                              setLeaveData({
                                ...leaveData,
                                contactWhenAway: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="form-group col-sm-12">
                          <label htmlFor="daysRequested" className="form-label">
                            Days Requesting *
                          </label>
                          <CInput
                            className="form-control col-sm-4"
                            type="text"
                            ref={requestedDaysRef}
                            value={leaveData.daysRequest}
                            // placeholder="Year"
                            onChange={handleDaysChange}
                          />
                        </div>
                        <div className="form-group col-sm-12">
                          <label htmlFor="startdate" className="form-label">
                            Proposed Start Date *
                          </label>{' '}
                          <DatePicker
                            className="form-control myInput"
                            dateFormat="dd-MMMM-yyyy"
                            selected={stDate}
                            value={leaveData.startDate}
                            ref={startDateRef}
                            onChange={handleStartDate}
                            filterDate={(date) =>
                              date.getDay() !== 0 && date.getDay() !== 6
                            }
                            showYearDropdown
                            showMonthDropdown
                            scrollableMonthYearDropdown
                            showFourColumnMonthYearPicker
                          />
                        </div>

                        <div className="form-group col-sm-12">
                          <label htmlFor="endDate" className="form-label">
                            Proposed End Date *
                          </label>{' '}
                          <CInput
                            type="text"
                            className="form-control myInput"
                            dateFormat="dd-MMMM-yyyy"
                            selected={enDate}
                            ref={endDateRef}
                            value={leaveData.endDate}
                            onChange={handleEndDate}
                            readonly="readonly"
                          />
                        </div>
                      </CInputGroup>
                      <CCol md="12">
                        <CInputGroup></CInputGroup>
                      </CCol>
                      <CCol md="12">
                        <CInputGroup></CInputGroup>
                      </CCol>

                      <CCol md="12">
                        <CInputGroup></CInputGroup>
                      </CCol>
                    </CFormGroup>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </form>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            className="btnrequestsubmit float-left"
            onClick={handleSubmit}
            disabled={disabled}
          >
            <span> Submit</span>
          </CButton>

          <CButton color="danger" className="btnclose" onClick={handleClose}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        className="modal fade"
        size="sm"
        show={askDelete}
        data-backdrop="static"
        data-keyboard="false"
      >
        <CModalHeader className="modal-header">
          <p>
            <h3>Delete leave Request</h3>
          </p>
        </CModalHeader>

        <CModalBody className="modal-body">
          Do you want to delete this Request ?
          <CButton color="success" className="btn-yes m-2" onClick={handleYes}>
            Yes
          </CButton>
          <CButton
            color="danger"
            className="btn-no m-2"
            onClick={() => setAskDelete(false)}
          >
            No
          </CButton>
        </CModalBody>
      </CModal>
    </div>
  )
}

export default LeaveRequest

/*

*/
