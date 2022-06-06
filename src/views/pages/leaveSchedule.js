import React, { useState, useEffect, useContext, useRef } from 'react'
//import { getStaffSchedules } from "../services/staffSchedulesService";
import axios from 'axios'

import { Redirect, useHistory } from 'react-router-dom'

import { Modal } from 'react-bootstrap'
import moment from 'moment'
import momentBusinessDays from 'moment-business-days'
//import { toast } from "react-toastify";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
import auth from '../../components/services/authService'
import Joi from 'joi-browser'
import Card from '../../components/scheduleCard'
import Swal from 'sweetalert2'

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
  //CSelect,
  CDropdownMenu,
  //CCardFooter,
  CInputGroup,
  //CForm,
} from '@coreui/react'

function LeaveSchedule(props) {
  //const currentUser = useContext(UserContext) || {};
  const user = auth.getCurrentUser()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [daysEntitled, setDaysEntitled] = useState(0)
  const [lastEntry, setLastEntry] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })
  const [depts, setDepts] = useState({})
  const [rerender, setRerender] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [daysScheduled, setDaysScheduled] = useState(0)
  const [staffSchedules, setStaffSchedules] = useState([])
  const [numberOfDaysData, setNumberOfDaysData] = useState(0)
  const [endDateData, setEndDateData] = useState(new Date())
  const [currentYear, setCurrentYear] = useState(0)
  const [countDocs, setCountDocs] = useState(0)
  const [show, setShow] = useState(false)
  const [askDelete, setAskDelete] = useState(false)
  const [departments, setDepartments] = useState([])
  const [unit, setUnit] = useState([])
  const [supervisors, setSupervisors] = useState([])

  const [yes, setYes] = useState(false)
  const [no, setNo] = useState(false)
  const [staffScheduleForm, setStaffScheduleForm] = useState({
    startDate: new Date(),
    endDate: new Date(),
    numberOfDays: '',
    staff: '',
    leaveYear: '',
    department: '',
    unit: '',
    email: '',
    fullName: '',
  })
  const [minDate, setMinDate] = useState(new Date())
  const [maxDate, setMaxDate] = useState(new Date())
  const [id, setId] = useState('')
  const endDateRef = useRef(new Date())
  const numberOfDaysRef = useRef(0)

  const deptUnit = useRef()
  const dept = useRef()
  let history = useHistory()

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
  }, [currentYear])

  useEffect(() => {
    async function getStaffSchedulesInHooks() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/staffschedules',
        {
          params: {
            staff: user._id,
            leaveYear: currentYear,
          },
        },
      )

      setStaffSchedules(results.data)
      setCountDocs(staffSchedules.length)
      setRerender(!rerender)
    }
    getStaffSchedulesInHooks()
  }, [user._id, currentYear, staffSchedules, rerender])

  useEffect(() => {
    const sumOfDays = () => {
      const days = staffSchedules
        .map((days) => days.numberOfDays)
        .reduce((prev, curr) => prev + curr, 0)
      setDaysScheduled(days)
    }
    sumOfDays()
  }, [staffSchedules, daysScheduled])

  useEffect(() => {
    async function getUserAsSupervisors() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/users/supervisor/' +
          user.department +
          '/' +
          user._id,
      )
      setSupervisors(results.data)
    }
    getUserAsSupervisors()
  }, [user.department, user._id])

  useEffect(() => {
    async function getLastEntry() {
      const lastEntryResults = await axios.get(
        'https://ugmcservice.herokuapp.com/api/staffschedules/getlatestdate/' +
          currentYear +
          '/' +
          user._id,
      )
      setLastEntry(lastEntryResults.data)
    }
    getLastEntry()
  }, [currentYear, user._id])

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
    async function getDepartments() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/departments',
      )

      setDepartments(results.data)
    }
    getDepartments()
  }, [departments])

  const handleClose = () => {
    setStaffScheduleForm({
      startDate: '',
      endDate: '',
      numberOfDays: '',
      staff: '',
      leaveYear: '',
      department: '',
      unit: '',
    })
    setShow(false)
  }
  const handleShow = () => {
    departments.map((i) =>
      setDepts({ value: i.department, label: i.department }),
    )

    // setDepts([{ value: i.department, label: i.department }])
    //);
    // console.log(departments);
    setShow(true)
  }

  const handleYes = async () => {
    const results = await axios.delete(
      'https://ugmcservice.herokuapp.com/api/staffschedules/' + id,
    )
    const schedules = staffSchedules.filter((m) => m.id !== results.data._id)
    setStaffSchedules(schedules)
    Swal.fire('OK', 'Leave Schedule Deleted !', 'success')
    setAskDelete(false)
  }

  const joiScheduleSchema = Joi.object().keys({
    startDate: Joi.date().required().label('Start Date'),
    numberOfDays: Joi.number().required().label('Number of Days'),
    endDate: Joi.date().required().label('End Date'),
    staff: Joi.string().required().label('Staff'),
    leaveYear: Joi.number().required().label('Leave Year'),
    department: Joi.string().required().label('Department'),
    unit: Joi.string().required().label('unit'),
    email: Joi.string().required().label('Email'),
    fullName: Joi.string().required().label('Full Name'),
  })
  const validateForm = () => {
    const result = Joi.validate(staffScheduleForm, joiScheduleSchema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  const handleSubmit = async (e) => {
    const validate = validateForm()
    if (validate === null) {
      setDisabled(true)
      e.preventDefault()
      setEndDateData(endDateRef.current.value)
      if (new Date(selectedDate) < new Date(minDate)) {
        setDisabled(false)
        return Swal.fire(
          'OOPS',
          'You are NOT allowed to select a date before ' +
            new Date(minDate).toDateString('dd,MMM,yyyy'),
          'info',
        )
      }
      if (new Date(endDateRef.current.value) > new Date(maxDate)) {
        setDisabled(false)
        return Swal.fire(
          'OOPS',
          'You are NOT allowed to select a date beyond ' +
            new Date(maxDate).toDateString('dd,MMM,yyyy'),
          'info',
        )
      }

      if (countDocs === 3) {
        setDisabled(false)
        return Swal.fire(
          'OOPS',
          'VOILATION: Only  three (3) schedules are permitted !',
          'info',
        )
      }

      /*setStaffScheduleForm({
        ...staffScheduleForm,
        staff: user._id,
        startDate: selectedDate,
        leaveYear: currentYear,
        numberOfDays: numberOfDaysRef.current.value,
        endDate: endDateData,
        department: dept.current.value,
        unit: deptUnit.current.value,
        email: user.email,
        fullName: user.fullName,
      });*/

      const daysSch = parseInt(daysScheduled) + parseInt(numberOfDaysData)
      if (daysSch > daysEntitled) {
        setDisabled(false)
        return Swal.fire(
          'VOILATION: You cannot EXCEED days you are entitled to : ' +
            daysEntitled,
          'info',
        )
      }

      let lastSelectedDate = new Date()
      let lastLastDate = new Date()
      const newSelectedDate = new Date(selectedDate)
      const newEndDate = new Date(endDateData)

      lastSelectedDate = new Date(lastEntry.startDate)

      lastLastDate = new Date(lastEntry.startDate)

      if (
        (newSelectedDate >= lastSelectedDate &&
          newSelectedDate <= lastLastDate) ||
        newSelectedDate <= lastSelectedDate
      ) {
        setDisabled(false)
        return Swal.fire(
          'OOPS',
          'VOILATION: Overlapping Date Suspected ! ',
          'info',
        )
      }

      const results = await axios.post(
        'https://ugmcservice.herokuapp.com/api/staffschedules',
        staffScheduleForm,
      )
      if (results.status !== 200)
        return Swal.fire('OOPS', 'Error: Schedule NOT saved!', 'error')
      if (results.status === 200) {
        Swal.fire('OK', 'Schedule saved Successfully !', 'success')
        setCountDocs(staffSchedules.length)
      } else {
        Swal.fire('OOPS', 'Error: Schedule NOT saved!', 'error')
        setDisabled(false)
      }
      setDisabled(false)
      setRerender(!rerender)
      handleClose()
    } else {
      return Swal.fire('OOPS', validate, 'warning')
    }
    setDisabled(false)
    //e.preventDefault();
  }

  const handleEndDate = (e) => {
    setEndDateData(endDateRef.current.value)
    setStaffScheduleForm({
      ...staffScheduleForm,
      endDate: endDateRef.current.value,
      email: user.email,
      fullName: user.fullName,
      //department: dept.current.value,
      //unit: deptUnit.current.value,
    })
  }

  function isWeekend(date = new Date()) {
    if (date.getDate() === 6) {
      return 6
    } else if (date.getDate() === 0) {
      return 0
    }
    //return date.getDay() === 6 || date.getDay() === 0;
  }
  let startDate = new Date()
  const handleNumberOfDayschange = (e) => {
    console.log(e.currentTarget.value)
    if (e.currentTarget.value <= daysEntitled) {
      setNumberOfDaysData(e.currentTarget.value)

      const newDate = momentBusinessDays(
        selectedDate,
        'DD-MM-YYYY',
      ).businessAdd(e.currentTarget.value)._d
      const newEndDate = moment(newDate).format('DD-MMMM-YYYY')

      setStaffScheduleForm({
        ...staffScheduleForm,
        numberOfDays: e.currentTarget.value,
        endDate: newEndDate,
        staff: user._id,
        startDate: selectedDate,
        leaveYear: currentYear,
        email: user.email,
        fullName: user.fullName,
        department: dept.current.value,
        unit: deptUnit.current.value,
      })
    } else {
      Swal.fire(
        'Days Voilation !',
        'You cannot exceed days entitled to!',
        'error',
      )
    }
    /* setStaffScheduleForm({
       ...staffScheduleForm,
       staff: user._id,
       startDate: selectedDate,
       leaveYear: currentYear,
       // numberOfDays: numberOfDaysRef.current.value,
       email: user.email,
       fullName: user.fullName,
       department: dept.current.value,
       unit: deptUnit.current.value,
     });
 */
  }

  const handleDatePicker = (sdate) => {
    setSelectedDate(sdate)
    const newDate = momentBusinessDays(sdate).businessAdd(
      numberOfDaysRef.current.value,
    )._d
    const newEndDate = moment(newDate).format('DD-MMMM-YYYY')
    endDateRef.current.value = newEndDate

    setStaffScheduleForm({
      ...staffScheduleForm,
      staff: user._id,
      leaveYear: currentYear,
      startDate: selectedDate,
      endDate: endDateRef.current.value,
      department: dept.current.value,
      unit: deptUnit.current.value,
      numberOfDays: 0,
    })
  }

  const handleDelete = async (s) => {
    setId(s._id)
    setAskDelete(!askDelete)
  }

  async function handleDepartmentChange(e) {
    const department = e.target.value
    const results = await axios.get(
      'https://ugmcservice.herokuapp.com/api/units/' + department,
    )
    setUnit(results.data)
  }

  const [sideNavExpanded, setSideNavExpanded] = useState(false)
  const cardStyle = {
    'max-width': '12rem',
    'text-align': 'center',
    height: '120px',
  }
  const contentStyle = {
    marginLeft: sideNavExpanded ? '120px' : '280px', // arbitrary values
    transition: 'margin 0.2s ease',
  }

  return (
    <div className="container-fluid">
      <CInputGroupAppend>
        <CCol></CCol>
        <CButton color="info" className="findbutton mb-3" onClick={handleShow}>
          + Make New Schedule
        </CButton>
      </CInputGroupAppend>

      <Card
        currentYear={currentYear}
        daysEntitled={daysEntitled}
        daysScheduled={daysScheduled}
        DaysRemained={daysEntitled - daysScheduled}
      />

      <CInputGroup className="mt-3 mb-3">
        <table className="table table-hover table-striped table-outline mb-0 d-none d-sm-table">
          <caption>Leave Schedules</caption>
          <thead>
            <tr>
              <th></th>
              <th>Leave Year</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>No. of Days</th>
              <th>Date Scheduled</th>
              <th>Status</th>
              <th>{}</th>
            </tr>
          </thead>
          <tbody>
            {staffSchedules.map((s, index) => (
              <tr key={s._id}>
                <td>{index + 1}</td>
                <td>{s.leaveYear}</td>
                <td>{moment(s.startDate).format('DD,MMMM,YYYY')}</td>
                <td>{moment(s.endDate).format('DD,MMMM,YYYY')}</td>
                <td>{s.numberOfDays}</td>
                <td>{moment(s.dateScheduled).format('DD,MMMM,YYYY')}</td>
                <td>{s.status}</td>
                <td>
                  {(s.status === 'Pending Approval' ||
                    s.status === 'HOU Rejected' ||
                    s.status === 'HOD Rejected') && (
                    <CButton
                      color="danger"
                      className="btnclose"
                      onClick={() => handleDelete(s)}
                      className=" "
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

      <div></div>
      <CModal
        className="modal fade"
        size="lg"
        show={show}
        data-backdrop="static"
        data-keyboard="false"
      >
        <CModalHeader closeButton>
          <CModalTitle>LEAVE MGT | LEAVE SCHEDULE </CModalTitle>
        </CModalHeader>

        <CModalBody>
          <form>
            <CRow>
              <CCol xs="12" md="12">
                <CCard>
                  <CCardHeader>LEAVE SCHEDULE</CCardHeader>
                  <CCardBody>
                    <CFormGroup row>
                      <CCol md="12">
                        <CInputGroup>
                          <div className="form-group col-sm-12">
                            <label className="mb-3">Start Date</label>
                            <DatePicker
                              className="form-control"
                              dateFormat="dd-MMMM-yyyy"
                              selected={selectedDate}
                              //value={selectedDate}
                              onChange={handleDatePicker}
                              filterDate={(date) =>
                                date.getDay() !== 0 && date.getDay() !== 6
                              }
                              showYearDropdown
                              showMonthDropdown
                              scrollableMonthYearDropdown
                              showFourColumnMonthYearPicker
                              // minDate={minDate}
                              //maxDate={maxDate}
                            />
                          </div>
                          <div className="form-group col-sm-12">
                            <label className="mb-2 mt-2">No. of Days</label>
                            <CInput
                              type="text"
                              id="numberOfDays"
                              name="numberOfDays"
                              ref={numberOfDaysRef}
                              value={staffScheduleForm.numberOfDays}
                              onChange={handleNumberOfDayschange}
                              autoComplete="off"
                            />
                          </div>
                          <div className="form-group col-sm-12">
                            <label className="mb-2 mt-2">End Date</label>
                            <CInput
                              className="form-control"
                              type="text"
                              id="endDate"
                              name="endDate"
                              value={staffScheduleForm.endDate}
                              onChange={null}
                              readOnly={true}
                              dateformat="dd-MMMM-yyyy"
                            />
                          </div>
                          <div className="form-group col-sm-12">
                            <label className="mb-2 mt-2">
                              Current Department
                            </label>
                            <select
                              ref={dept}
                              id="departmentId"
                              className="form-control classic"
                              value={staffScheduleForm.department}
                              onChange={(e) => {
                                handleDepartmentChange(e)
                                setStaffScheduleForm({
                                  ...staffScheduleForm,
                                  department: dept.current.value,
                                })
                              }}
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
                            <label className="mb-2 mt-2">Current Unit</label>
                            <select
                              id="unit"
                              ref={deptUnit}
                              className="form-control classic"
                              value={staffScheduleForm.unit}
                              onChange={(e) =>
                                setStaffScheduleForm({
                                  ...staffScheduleForm,
                                  unit: deptUnit.current.value,
                                })
                              }
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
                                  <option key={u._id} value={u.unit}>
                                    {u.unit}
                                  </option>
                                </optgroup>
                              ))}
                            </select>
                          </div>
                        </CInputGroup>
                      </CCol>

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
        className="CModal fade"
        size="lg"
        show={askDelete}
        data-backdrop="static"
        data-keyboard="false"
      >
        <CModalHeader className="CModal-header">
          <p>
            <h3>Delete leave Schedule</h3>
          </p>
        </CModalHeader>

        <CModalBody className="modal-body">
          Do you want to delete this schedule ?
          <CButton className="btn-yes m-2" onClick={handleYes} color="success">
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

export default LeaveSchedule

/*
  <CButton
                            color="success"
                            onClick={() => setVisible(!visible)}
                          >
                            + New Unit Head
                          </CButton>

 <label className="mb-3">Start Date</label>
                          <DatePicker
                            className="form-control"
                            dateFormat="dd-MMMM-yyyy"
                            selected={selectedDate}
                            //value={selectedDate}
                            onChange={handleDatePicker}
                            filterDate={(date) =>
                              date.getDay() !== 0 && date.getDay() !== 6
                            }
                            showYearDropdown
                            showMonthDropdown
                            scrollableMonthYearDropdown
                            showFourColumnMonthYearPicker
                            // minDate={minDate}
                            //maxDate={maxDate}
                          />


                          <label className="mb-3 mt-3">Number of Days</label>
                          <CInput
                            type="text"
                            id="numberOfDays"
                            name="numberOfDays"
                            ref={numberOfDaysRef}
                            value={staffScheduleForm.numberOfDaysData}
                            onChange={handleNumberOfDayschange}
                            autoComplete="off"
                          />

                          <input
                            className="form-control"
                            type="text"
                            id="endDate"
                            name="endDate"
                            ref={endDateRef}
                            value={staffScheduleForm.endDateData}
                            onChange={handleEndDate}
                            readOnly={true}
                            dateformat="dd-MMMM-yyyy"
                          />

                           <select
                            ref={dept}
                            id="departmentId"
                            className="form-control classic"
                            value={staffScheduleForm.department}
                            onChange={(e) => {
                              handleDepartmentChange(e);
                              setStaffScheduleForm({
                                ...staffScheduleForm,
                                department: dept.current.value,
                              });
                            }}
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
                                {" "}
                                <option
                                  key={m._id}
                                  value={m.department}
                                  id={m._id}
                                >
                                  {m.department}
                                </option>
                              </optgroup>
                            ))}
                          </select>

                           <select
                            id="unit"
                            ref={deptUnit}
                            className="form-control classic"
                            value={staffScheduleForm.unit}
                            onChange={(e) =>
                              setStaffScheduleForm({
                                ...staffScheduleForm,
                                unit: deptUnit.current.value,
                              })
                            }
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
                                {" "}
                                <option key={u._id} value={u.unit}>
                                  {u.unit}
                                </option>
                              </optgroup>
                            ))}
                          </select>
*/
