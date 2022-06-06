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
const HouApproval = () => {
  const user = auth.getCurrentUser()
  //console.log(user)

  const [currentYear, setCurrentYear] = useState('')
  const [minDate, setMinDate] = useState(new Date())
  const [maxDate, setMaxDate] = useState(new Date())
  const [unApprovedSchedules, setUnapprovedSchedules] = useState([])
  const [selectedForApproval, setSelectedForApproval] = useState([])
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)
  const [amendmentComment, setAmendmentComment] = useState('')
  const [amend, setAmend] = useState(false)
  const [deptUnit, setDeptUnit] = useState({})
  const [supervisor, setSupervisor] = useState({})
  const [unitHead, setUnitHead] = useState({})
  const handleClose = () => {
    setShow(false)
  }

  const [selectedDate, setSelectedDate] = useState(new Date())

  const [staffScheduleForm, setStaffScheduleForm] = useState({
    startDate: new Date(),
    endDate: new Date(),
    numberOfDays: '',
    amendmentComment: '',
    status: '',
    email: '',
    fullName: '',
    msg: '',
    amend: false,
  })

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
  const [rerender, setRerender] = useState(false)

  const handleShow = (s) => {
    setId(s._id)
    setNumberOfDaysData(s.numberOfDays)
    setFullName(s.staff.fullName)
    setStartDate(moment(s.startDate).format('DD-MMMM-YYYY'))
    setEndDate(moment(s.endDate).format('DD-MMMM-YYYY'))
    setStaffId(s.staff.staffId)
    setEmail(s.staff.email)
    setAmend(false)

    setStaffScheduleForm({
      startDate: moment(s.startDate).format('DD-MMMM-YYYY'),
      endDate: moment(s.endDate).format('DD-MMMM-YYYY'),
      numberOfDays: s.numberOfDays,
      email: s.staff.email,
      fullName: s.staff.fullName,
      amend: amend,
    })

    setShow(!show)
  }

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
    //  console.log(currentYear)
  }, [currentYear, minDate, maxDate])

  useEffect(() => {
    const getUnitHead = async () => {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/unithead/unitdept/' + user._id,
      )
      setUnitHead(results.data)
    }
    getUnitHead()
    //console.log(unitHead)
  }, [unitHead])

  /*useEffect(() => {
    const getSupervisorDeptUnit = async () => {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/unitsupervisor/' +
          deptUnit.department +
          '/' +
          deptUnit.unit +
          '/' +
          user.staffId,
      )
      setSupervisor(results.data)
    }
    getSupervisorDeptUnit()
  }, [deptUnit.department, deptUnit.unit, user.staffId])*/

  useEffect(() => {
    async function getUnapprovedSchedules() {
      if (unitHead.length !== 0) {
        const results = await axios.get(
          'https://ugmcservice.herokuapp.com/api/staffschedules/unapprovedschedules/' +
            user._id +
            '/' +
            unitHead.department +
            '/' +
            unitHead.unit +
            '/' +
            currentYear +
            '/' +
            'Pending Approval',
        )

        setUnapprovedSchedules(results.data)
        setRerender(!rerender)
      }
    }
    getUnapprovedSchedules()
    //console.log(unApprovedSchedules)
  }, [
    unApprovedSchedules,
    unitHead.unit,
    unitHead.department,
    unitHead.length,
    currentYear,
    rerender,
    user._id,
  ])

  const updateHouAuthorisation = async (
    _id,
    fullName,
    email,
    numberOfDays,
    startDate,
    endDate,
  ) => {
    const results = await axios.put(
      'https://ugmcservice.herokuapp.com/api/staffschedules/houapprovals/' +
        _id,
      {
        status: 'Hou Approved',
        houApprovedBy: user._id,
        houDateApproved: new Date(),
        comment: 'Schedule Approved',
        fullName: fullName,
        email: email,
        numberOfDays: numberOfDays,
        startDate: moment(startDate).format('DD-MMMM-YYYY'),
        endDate: moment(endDate).format('DD-MMMM-YYYY'),
      },
    )
  }

  const handleAuthorise = () => {
    unApprovedSchedules.map((i) =>
      updateHouAuthorisation(
        i._id,
        i.staff.fullName,
        i.staff.email,
        i.numberOfDays,
        i.startDate,
        i.endDate,
      ),
    )

    //getAllApproved();
  }

  const updateHouReject = async (e) => {
    await axios.put(
      'https://ugmcservice.herokuapp.com/api/staffschedules/houreject/' + e,
      {
        status: 'HOU Rejected',
        houApprovedBy: user._id,
        houDateApproved: Date.now(),
      },
    )
  }

  const handleReject = async (e) => {
    try {
      await axios.put(
        'https://ugmcservice.herokuapp.com/api/staffschedules/houreject/' + e,
        {
          status: 'HOU Rejected',
          houApprovedBy: user._id,
          houDateApproved: Date.now(),
        },
      )
      setRerender(!rerender)
      toast.info('Schedule(s) REJECTED!', {
        position: toast.POSITION.TOP_CENTER,
      })
    } catch (err) {
      toast.error('Error: Schedule(s) REJECTION FAILED', {
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

  const data = {
    schedules: unApprovedSchedules.filter(
      (item) =>
        item.staff.fullName.toLowerCase().includes(search.toLowerCase()) ||
        item.staff.staffId.toLowerCase().includes(search.toLowerCase()),
    ),
  }

  const handleNumberOfDayschange = (e) => {
    setNumberOfDaysData(e.target.value)
    const newDate = momentBusinessDays(startDate).businessAdd(
      parseInt(e.target.value),
    )._d
    const newEndDate = moment(newDate).format('DD-MMMM-YYYY')
    setEndDate(newEndDate)
    setStartDate(moment(startDate).format('DD-MMMM-YYYY'))
    setAmend(true)

    setStaffScheduleForm({
      ...staffScheduleForm,
      numberOfDays: e.target.value,
      status: 'Hou Approved',
      ammend: amend,
    })
  }

  const handleDatePicker = (sdate) => {
    setStartDate(moment(sdate).format('DD-MMMM-YYYY'))
    setSelectedDate(new Date(sdate))
    const newDate = momentBusinessDays(sdate).businessAdd(numberOfDaysData)._d
    const newEndDate = moment(newDate).format('DD-MMMM-YYYY')
    setEndDate(newEndDate)
    setAmend(true)

    setStaffScheduleForm({
      ...staffScheduleForm,
      startDate: moment(sdate).format('DD-MMMM-YYYY'),
      endDate: moment(newEndDate).format('DD-MMMM-YYYY'),
      status: 'Hou Approved',
      ammend: amend,
    })
  }

  const handleEndDate = (e) => {
    const newEndDate = moment(e.target.value).format('DD-MMMM-YYYY')
    setEndDate(newEndDate)
    setAmend(true)

    setStaffScheduleForm({
      ...staffScheduleForm,
      endDate: moment(e.target.value).format('DD-MMMM-YYYY'),
      status: 'Hou Approved',
      ammend: amend,
    })
  }

  const dataTouse = search.length === 0 ? unApprovedSchedules : data.schedules

  const handleSelectAll = () => {
    if (selectedForApproval.length < unApprovedSchedules.length) {
      setSelectedForApproval(dataTouse.map((i) => i._id))
    } else {
      setSelectedForApproval([])
    }
  }
  const handleAmend = async () => {
    const results = await axios.put(
      'https://ugmcservice.herokuapp.com/api/staffschedules/houamendschedule/' +
        id,
      staffScheduleForm,
    )

    if (results.status === 200) {
      setRerender(!rerender)
      Swal.fire('success', 'Schedule Amended Successfully!', 'success')
    } else {
      Swal.fire('Failed', 'Error: Schedule Amendment FAILED', 'error')
    }
    setAmendmentComment('')
    setStaffScheduleForm({
      startDate: '',
      endDate: '',
      numberOfDays: '',
      amendmentComment: '',
      status: 'Approval Pending',
      fullName: '',
      email: '',
      msg: '',
      ammend: false,
    })
    setShow(false)
  }

  const handleAmendmentComment = (e) => {
    setAmendmentComment(e.target.value)
    setAmend(true)

    setStaffScheduleForm({
      ...staffScheduleForm,
      amendmentComment: e.target.value,
      status: 'Hou Approved',
      ammend: amend,
    })
  }

  const handleRejection = async () => {
    const results = await axios.put(
      'https://ugmcservice.herokuapp.com/api/staffschedules/houamendschedule/' +
        id,
      {
        startDate: startDate,
        endDate: endDateRef.current.value,
        numberOfDays: numberOfDaysRef.current.value,
        amendmentComment: amendmentComment,
        status: 'Rejected',
        fullName: fullName,
        email: email,
      },
    )

    if (results.status === 200) {
      setRerender(!rerender)
      toast.success('Schedule Rejected Successfully!', {
        position: toast.POSITION.TOP_CENTER,
      })
    } else {
      toast.error('Error: Schedule Rejection FAILED', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
    setAmendmentComment('')
    setStaffScheduleForm({
      startDate: '',
      endDate: '',
      numberOfDays: '',
      amendmentComment: '',
      status: 'Approval Pending',
      fullName: '',
      email: '',
      msg: '',
    })
    setShow(false)
  }

  return (
    <div>
      <div className="row justify-content-center">
        {/*<div className="col-md-3">
          <DashSideBar />
      </div>*/}

        <div className="col-md-12">
          <div className="center">
            <div className="justify-content-center mb-3 mt-0">
              <h4>ANNUAL LEAVE SCHEDULE APPROVALS BY HEAD OF UNIT</h4>
            </div>

            <CInput
              className="col-sm-12 mt-3"
              type="text"
              placeholder="Search with staff ID or name"
              onChange={handleSearch}
            />
          </div>
          <div className="btn-group-hou">
            <CButton
              className="but btn-success mt-3 mb-3 float-right"
              onClick={handleAuthorise}
            >
              Approve all
            </CButton>
          </div>
          <Table className="lg">
            <caption>Unapproved Schedules</caption>
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
                      className="float-left"
                      size="sm"
                      onClick={() => handleShow(s)}
                    >
                      Amend
                    </CButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/*   <p className="hou-p">Showing {dataTouse.length} Schedules...</p>*/}
        </div>
      </div>

      <CModal
        className="custom-dialog"
        show={show}
        data-backdrop="static"
        data-keyboard="false"
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>LEAVE SCHEDULES | HOU AMENDMENT </CModalTitle>
        </CModalHeader>
        <CModalBody className="modal-body lg">
          <form className="row g-3">
            <CInputGroup className="mt-3">
              <CLabel htmlFor="relievingOfficer" className="col-sm-3">
                Staff ID *
              </CLabel>

              <CInput
                className="form-control col-sm-4"
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
                className="form-control col-sm-6 "
                type="text"
                readOnly={true}
                ref={fullNameRef}
                value={fullName}
              />
            </CInputGroup>

            <CInputGroup className="mt-3">
              <CLabel htmlFor="daysRequested" className="col-sm-3">
                Reason for Amendment *
              </CLabel>
              <textarea
                ref={AmendmentCommentRef}
                className="form-control col-sm-8"
                type="text"
                value={amendmentComment}
                onChange={handleAmendmentComment}
              />
            </CInputGroup>

            <CInputGroup className="mt-3">
              <CLabel htmlFor="daysRequested" className="col-sm-3">
                Days *
              </CLabel>
              <CInput
                ref={numberOfDaysRef}
                className="form-control col-sm-4"
                type="text"
                value={numberOfDaysData}
                onChange={handleNumberOfDayschange}
              />
            </CInputGroup>

            <div className="row col-sm-12">
              <CInputGroup className="mt-3">
                <div className="col-sm-3">
                  <CLabel htmlFor="startdate">New Start Date *</CLabel>
                </div>
                <div className="col-sm-5">
                  <DatePicker
                    className="form-control mr-1"
                    dateformat="dd-MMMM-yyyy"
                    value={startDate}
                    ref={startDateRef}
                    selected={selectedDate}
                    onChange={handleDatePicker}
                    filterDate={(date) =>
                      date.getDay() !== 0 && date.getDay() !== 6
                    }
                    showFourColumnMonthYearPicker
                    showYearDropdown
                    showMonthDropdown
                    scrollableMonthYearDropdown
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
                value={endDate}
                readOnly="readOnly"
                ref={endDateRef}
                onChange={handleEndDate}
              />
            </CInputGroup>
          </form>
        </CModalBody>
        <CModalFooter>
          <CButton className="btn btn-success" onClick={handleAmend}>
            <span> Amend and Approve</span>
          </CButton>

          <CButton className="btn btn-danger float-right" onClick={handleClose}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default HouApproval
