import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import Card from '../../components/requestCard'
//import RequestCard from '../../components/requestCard'
import formData from 'form-data'
import auth from '../../components/services/authService'
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
import { cibRuby } from '@coreui/icons'

const ExcuseDuty = () => {
  const user = auth.getCurrentUser()

  const [daysEntitled, setDaysEntitled] = useState(0)
  const [currentYear, setCurrentYear] = useState(0)
  const [maxDate, setMaxDate] = useState(new Date())
  const [minDate, setMinDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [image, setImage] = useState(null)
  const [unit, setUnit] = useState([])
  const [display, setDisplay] = useState(null)
  const handleShow = () => setShow(true)
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [departments, setDepartments] = useState([])
  const [supervisors, setSupervisors] = useState([])
  const [excuseDuties, setExcuseDuties] = useState([])
  const [render, setRender] = useState(false)
  const [buffer, setBuffer] = useState('')
  const [showExcuseDuty, setShowExcuseDuty] = useState(false)
  const [excuseDutyData, setExcuseDutyData] = useState({
    staff: user._id,
    department: '',
    unit: '',
    fullName: user.fullName,
    supervisor: '',
    grade: '',
    contactWhenAway: '',
    daysGiven: 0,
    startDate: '',
    endDate: '',
    medicalOfficer: '',
    excuseDutyDetails: '',
    email: '',
    facility: '',
    year: '',
  })

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0])
      setDisplay(URL.createObjectURL(event.target.files[0]))
    }
  }

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
    async function getDepartments() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/departments',
      )
      setDepartments(results.data)
    }
    getDepartments()
  }, [departments])

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
    async function getExcuseDuties() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/excuseduty/' +
          user._id +
          '/' +
          currentYear,
      )
      setExcuseDuties(results.data)
    }
    getExcuseDuties()
  }, [excuseDuties, currentYear, render, user._id])

  async function handleDepartmentChange(e) {
    setSelectedDepartment(e.currentTarget.value)
    setExcuseDutyData({ ...excuseDutyData, department: e.currentTarget.value })
    const results = await axios.get(
      'https://ugmcservice.herokuapp.com/api/units/' + e.currentTarget.value,
    )
    setUnit(results.data)
  }

  async function handleUnitChange(e) {
    const selectedUnit = e.currentTarget.value
    setExcuseDutyData({
      ...excuseDutyData,
      unit: e.currentTarget.value,
      email: user.email,
      fullName: user.fullName,
      grade: user.grade,
      year: currentYear,
    })
    const results = await axios.get(
      'https://ugmcservice.herokuapp.com/api/unitsupervisor/' +
        selectedDepartment +
        '/' +
        selectedUnit,
    )

    setSupervisors(results.data)
  }

  const handleSubmit = async (e) => {
    const start = moment(excuseDutyData.startDate)
    const end = moment(excuseDutyData.endDate)
    const days = end.diff(start, 'days')
    e.preventDefault()
    const fd = new formData()
    fd.append('img', image)
    fd.append('staff', excuseDutyData.staff)
    fd.append('department', excuseDutyData.department)
    fd.append('unit', excuseDutyData.unit)
    fd.append('grade', excuseDutyData.grade)
    fd.append('contact', excuseDutyData.contactWhenAway)
    fd.append('daysGiven', days)
    fd.append('startDate', excuseDutyData.startDate)
    fd.append('endDate', excuseDutyData.endDate)
    fd.append('medicalOfficer', excuseDutyData.medicalOfficer)
    fd.append('excuseDuty', excuseDutyData.excuseDutyDetails)
    fd.append('email', excuseDutyData.email)
    fd.append('fullName', excuseDutyData.fullName)
    fd.append('facility', excuseDutyData.facility)
    fd.append('year', excuseDutyData.year)

    /*for (var pair of fd.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }*/

    try {
      const results = await axios.post(
        'https://ugmcservice.herokuapp.com/api/excuseduty',
        fd,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      console.log(results)
      if (results.status === 200) {
        Swal.fire(
          'OK',
          'Excuse Duty Submitted Successfully. Pending Approvals',
          'success',
        )
        setRender(!render)
        setExcuseDutyData({
          staff: user._id,
          department: '',
          unit: '',
          fullName: user.fullName,
          supervisor: '',
          grade: '',
          contactWhenAway: '',
          daysGiven: 0,
          startDate: '',
          endDate: '',
          medicalOfficer: '',
          excuseDutyDetails: '',
          email: '',
          facility: '',
          year: '',
        })
        setImage(null)
        setShow(false)
        setDisplay(null)
      } else {
        Swal.fire('Failed', 'Excuse Duty Submission, FAILED !', 'error')
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        Swal.fire(
          'Failed',
          'Excuse Duty Submission FAILED, Please try again',
          'error',
        )
      }
    }
  }
  const bb = Buffer.from(buffer).toString('base64')

  const handleShowExcuseDuty = (s) => {
    //console.log(s)
    setBuffer(s.img.data)
    setShowExcuseDuty(!showExcuseDuty)
  }
  return (
    <div>
      <div className="container-fluid">
        <h4 className="center heading"> EXCUSE DUTY</h4>
        <p className="ptext">
          At some point, you may need to request a leave of absence from work.
          It could be for one of a variety of reasons: personal or family health
          problems, the birth or adoption of a child, relief from excessive job
          stress, the loss of a loved one, or the desire to travel or pursue a
          hobby. You can request for some days off from here.
        </p>
        <Card />

        <CInputGroupAppend>
          <CCol></CCol>
          <CButton
            color="success"
            className="findbutton mb-3 mt-3"
            onClick={handleShow}
          >
            + Submit Excuse Duty
          </CButton>
        </CInputGroupAppend>

        <CInputGroup className="mt-3 mb-3">
          <table className="table table-hover table-striped table-outline mb-0 d-none d-sm-table table-sm">
            <caption>Staff Excuse Duty</caption>
            <thead>
              <tr className="fs-sm">
                <th></th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Medical Officer</th>
                <th>Facility</th>
                <th>Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {excuseDuties.map((s, index) => (
                <tr
                  key={s._id}
                  onClick={() => handleShowExcuseDuty(s)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{index + 1}</td>
                  <td>{moment(s.startDate).format('DD,MMMM,YYYY')}</td>
                  <td>{moment(s.endDate).format('DD,MMMM,YYYY')}</td>
                  <td>{s.medicalOfficer}</td>
                  <td>{s.facility}</td>
                  <td>{s.excuseDuty}</td>
                  <td>{s.status}</td>
                  {/*<td>
                        {(s.status === "Pending Approval" ||
                            s.status === "HOU Rejected" ||
                            s.status === "HOD Rejected") && (
                                <button
                                    onClick={() => null(s)}
                                    className="btnscheduledelete "
                                >
                                    Delete
                                </button>
                            )}
                            </td>*/}
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
            <CModalTitle>LEAVE MGT | EXCUSE DUTY </CModalTitle>
          </CModalHeader>
          <CModalBody className="modal-body">
            <form className="row g-3" onSubmit={handleSubmit}>
              <CRow>
                <CCol xs="12" md="12">
                  <CCard>
                    <CCardBody>
                      <CFormGroup row>
                        <CInputGroup>
                          <CLabel
                            htmlFor="departmentId"
                            className="form-label col-sm-12"
                          >
                            Current Dept.
                          </CLabel>
                          <select
                            id="departmentId"
                            className="form-control classic col-sm-12 mb-2"
                            value={excuseDutyData.department}
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
                          <CLabel
                            htmlFor="unit"
                            className="form-label col-sm-12"
                          >
                            Current Unit
                          </CLabel>
                          <select
                            id="unit"
                            className="form-control classic col-sm-12 mb-2 mt-2"
                            value={excuseDutyData.unit}
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
                          <CLabel
                            htmlFor="name"
                            className="form-label col-sm-12"
                          >
                            Immediate Supervisor *
                          </CLabel>{' '}
                          <select
                            id={null}
                            ref={null}
                            className="form-control classic col-sm-12 mb-2 mt-2"
                            value={excuseDutyData.supervisor}
                            onChange={(e) =>
                              setExcuseDutyData({
                                ...excuseDutyData,
                                supervisor: e.currentTarget.value,
                              })
                            }
                          >
                            <option value="">--Select--</option>
                            {supervisors.map((su) => (
                              <option key={su._id} value={su.user._id}>
                                {su.user.fullName}
                              </option>
                            ))}
                          </select>
                          <CInputGroup>
                            <CLabel
                              htmlFor="contact"
                              className="form-label col-sm-12"
                            >
                              Contact when away
                            </CLabel>
                            <CInput
                              className="form-control col-sm-12 mb-2 mt-2"
                              type="text"
                              value={excuseDutyData.contactWhenAway}
                              onChange={(e) =>
                                setExcuseDutyData({
                                  ...excuseDutyData,
                                  contactWhenAway: e.currentTarget.value,
                                })
                              }
                            />
                          </CInputGroup>
                          <CInputGroup>
                            <CLabel
                              htmlFor="startdate"
                              className="form-label col-sm-12"
                            >
                              Start Date
                            </CLabel>
                            <CInput
                              className="form-control col-sm-12 mb-2 mt-2"
                              type="date"
                              value={excuseDutyData.startDate}
                              // placeholder="Year"
                              onChange={(e) =>
                                setExcuseDutyData({
                                  ...excuseDutyData,
                                  startDate: e.currentTarget.value,
                                })
                              }
                            />
                          </CInputGroup>
                          <CInputGroup>
                            <CLabel
                              htmlFor="enddate"
                              className="form-label col-sm-12"
                            >
                              End Date
                            </CLabel>
                            <CInput
                              className="form-control col-sm-12 mb-2 mt-2"
                              type="date"
                              value={excuseDutyData.endDate}
                              onChange={(e) => {
                                setExcuseDutyData({
                                  ...excuseDutyData,
                                  endDate: e.currentTarget.value,
                                })
                              }}
                            />
                          </CInputGroup>
                          <CInputGroup>
                            <CLabel
                              htmlFor="medicalofficer"
                              className="form-label col-sm-12"
                            >
                              Medical Officer
                            </CLabel>
                            <CInput
                              className="form-control col-sm-12 mb-2 mt-2"
                              type="text"
                              value={excuseDutyData.medicalOfficer}
                              // placeholder="Year"
                              onChange={(e) =>
                                setExcuseDutyData({
                                  ...excuseDutyData,
                                  medicalOfficer: e.currentTarget.value,
                                })
                              }
                            />
                          </CInputGroup>
                          <CLabel
                            htmlFor="medicalofficer"
                            className="form-label col-sm-12"
                          >
                            Facility (Hospital,Clinic)
                          </CLabel>
                          <CInput
                            className="form-control col-sm-12 mb-2 mt-2"
                            type="text"
                            value={excuseDutyData.facility}
                            // placeholder="Year"
                            onChange={(e) =>
                              setExcuseDutyData({
                                ...excuseDutyData,
                                facility: e.currentTarget.value,
                              })
                            }
                          />
                          <CLabel
                            htmlFor="excuseduty"
                            className="form-label col-sm-12"
                          >
                            Excuse Duty Details
                          </CLabel>
                          <textarea
                            className="form-control col-sm-12 mb-2 mt-2"
                            type="text"
                            value={excuseDutyData.excuseDutyDetails}
                            // placeholder="Year"
                            onChange={(e) =>
                              setExcuseDutyData({
                                ...excuseDutyData,
                                excuseDutyDetails: e.currentTarget.value,
                              })
                            }
                          />
                          <CLabel
                            htmlFor="daysgiven"
                            className="form-label col-sm-12"
                          >
                            Upload Excuse Duty form (png files only)
                          </CLabel>
                          <CInput
                            className="form-control col-sm-12 mb-2 mt-2"
                            type="file"
                            name="img"
                            onChange={onImageChange}
                          />
                          <img
                            src={display}
                            alt="preview"
                            className="photo col-sm-12"
                          />
                        </CInputGroup>
                      </CFormGroup>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </form>
            <CButton
              color="success"
              className="btnrequestsubmit float-center col-sm-12 mb-3"
              type="submit"
              disabled={null}
              onClick={handleSubmit}
            >
              <span> Submit</span>
            </CButton>
            <div className="center">
              <CButton
                color="danger"
                className="btnclose float-right col-sm-12  "
                onClick={() => setShow(false)}
              >
                Close
              </CButton>
            </div>
          </CModalBody>
        </CModal>

        <CModal
          className="modal fade"
          size="sm"
          show={null}
          data-backdrop="static"
          data-keyboard="false"
        >
          <CModalHeader className="modal-header">
            <p>
              <h3>Delete Excuse Duty</h3>
            </p>
          </CModalHeader>

          <CModalBody className="modal-body">
            Do you want to delete this Entry ?
            <CButton color="danger" className="btn-yes m-2" onClick={null}>
              Yes
            </CButton>
            <CButton
              color="info"
              className="btn-no m-2"
              onClick={() => setShow(!show)}
            >
              No
            </CButton>
          </CModalBody>
        </CModal>

        <CModal className="modal fade" size="lg" show={showExcuseDuty}>
          <CModalHeader className="modal-header"></CModalHeader>
          <CModalHeader closeButton>
            <CModalTitle>LEAVE MGT | EXCUSE DUTY </CModalTitle>
          </CModalHeader>

          <CModalBody className="modal-body">
            <img
              src={`data:image/jpeg;base64,${bb}`}
              alt="preview image"
              className="photo col-sm-12"
            />
          </CModalBody>
        </CModal>
      </div>
    </div>
  )
}
export default ExcuseDuty
