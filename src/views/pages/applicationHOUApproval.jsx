import { Redirect } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import auth from '../../components/services/authService'
import moment from 'moment'
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
  CSelect,
  CDropdownMenu,
  //CCardFooter,
  CInputGroup,
  //CForm,
} from '@coreui/react'

const HouRequestApproval = () => {
  const user = auth.getCurrentUser()
  const [staffSchedules, setStaffSchedules] = useState([])
  const [department, setDepartment] = useState('')
  const [unit, setUnit] = useState('')
  const [currentYear, setCurrentYear] = useState('')
  const [minDate, setMinDate] = useState(new Date())
  const [maxDate, setMaxDate] = useState(new Date())
  const [
    unApprovedLeaveApplications,
    setUnapprovedLeaveApplications,
  ] = useState([])
  const [houDetails, setHouDetails] = useState({})
  const [selectedForApproval, setSelectedForApproval] = useState([])
  const [search, setSearch] = useState('')
  const [rerender, setRerender] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [lastLeave, setLastLeave] = useState({})

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

  async function getLatestLeave(leaveYear, staff) {
    const results = await axios.get(
      'https://ugmcservice.herokuapp.com/api/leaverequests/lastleave/' +
        leaveYear +
        '/' +
        staff,
    )
    return results.data
  }

  const showLeaveInfo = async (s) => {
    const results = await axios.get(
      'https://ugmcservice.herokuapp.com/api/leaverequests/lastleave/' +
        currentYear +
        '/' +
        s.staff,
    )
    setLastLeave(results.data)
    // console.log(results.data)
    setShowInfo(!showInfo)
  }

  //console.log(user._id)

  useEffect(() => {
    async function getUnitHeadDepartmentUnit() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/unithead/unitdept/' + user._id,
      )
      setHouDetails(results.data)
    }
    getUnitHeadDepartmentUnit()
    // console.log(houDetails.department)
  }, [houDetails])

  /*const getUnapprovedapplications = async () => {
    if (houDetails.unit !== undefined || houDetails.department !== undefined) {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/leaverequests/houapprovals/' +
          houDetails.department +
          '/' +
          houDetails.unit +
          '/' +
          user._id +
          '/' +
          'Pending Approval',
      )

      setUnapprovedLeaveApplications(results.data)
    }
  }*/

  useEffect(() => {
    async function getUnapprovedLeaveApplications() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/leaverequests/houapprovals/' +
          houDetails.department +
          '/' +
          houDetails.unit +
          '/' +
          user._id +
          '/' +
          'Pending Approval',
      )

      setUnapprovedLeaveApplications(results.data)
    }
    getUnapprovedLeaveApplications()
    // console.log(unApprovedLeaveApplications)
  }, [houDetails, rerender])

  const updateHouAuthorisation = async (
    i,
    startDate,
    endDate,
    daysRequested,
    email,
    fullName,
  ) => {
    try {
      // getCheckedComment(i);
      const results = await axios.put(
        'https://ugmcservice.herokuapp.com/api/leaverequests/houapprovals/' + i,
        {
          isHouApproved: 'true',
          hoU: user._id,
          dateHouApproved: Date.now(),
          status: 'HOU Approved',
          startDate: startDate,
          endDate: endDate,
          daysRequested: daysRequested,
          email: email,
          fullName: fullName,
        },
      )
      return results
    } catch (err) {
      return Swal.fire(
        'FAILED',
        err + ': leave Application(s) Approval FAILED!',
        'error',
      )
    }
  }

  const handleAuthorise = (s) => {
    setDisabled(true)
    const ap = updateHouAuthorisation(
      s._id,
      s.startDate,
      s.endDate,
      s.daysRequested,
      s.email,
      s.fullName,
    )
    setRerender(!rerender)
    /* 
    const ap = selectedForApproval.map((i) => updateHouAuthorisation(i));
    */
    if (ap) {
      Swal.fire(
        'SUCCESS',
        'leave Application Approved Successfully !',
        'success',
      )
      setDisabled(!disabled)
    } else {
      Swal.fire('ERROR', 'Leave Application Approval FAILED !', 'error')
    }
  }

  const handleAuthoriseAll = () => {
    setDisabled(true)
    const ap = unApprovedLeaveApplications.map((i) =>
      updateHouAuthorisation(
        i._id,
        i.startDate,
        i.endDate,
        i.daysRequested,
        i.email,
        i.fullName,
      ),
    )
    setRerender(!rerender)
    if (ap) {
      Swal.fire(
        'SUCCESS',
        'leave Applications Approved Successfully !',
        'success',
      )
      setDisabled(!disabled)
    } else {
      Swal.fire('ERROR', 'Leave Application Approval FAILED !', 'error')
    }
  }

  const updateHouReject = async (
    i,
    startDate,
    endDate,
    daysRequested,
    email,
    fullName,
  ) => {
    await axios.put(
      'https://ugmcservice.herokuapp.com/api/leaverequests/houapprovals/' + i,
      {
        isHouApproved: 'false',
        hoU: user._id,
        dateHouApproved: Date.now(),
        status: 'HOU Rejected',
        startDate: startDate,
        endDate: endDate,
        daysRequested: daysRequested,
        email: email,
        fullName: fullName,
      },
    )
  }

  const handleReject = (s) => {
    /* setDisabled(true);
    const r = selectedForApproval.map((i) => updateHouReject(i));
    setRerender(rerender);*/

    setDisabled(true)
    const ap = updateHouReject(
      s._id,
      s.startDate,
      s.endDate,
      s.daysRequested,
      s.email,
      s.fullName,
    )
    setRerender(!rerender)
    if (ap) {
      Swal.fire('REJECTED', 'Leave Request REJECTED!', 'infor')
      setDisabled(!disabled)
    } else {
      Swal.fire('ERROR', 'REQUEST REJECTION FAILED', 'error')
      setDisabled(!disabled)
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
    leaveRequests: unApprovedLeaveApplications.filter(
      (item) =>
        item.fullName.toLowerCase().includes(search.toLowerCase()) ||
        item.staffId.toLowerCase().includes(search.toLowerCase()),
    ),
  }

  const dataTouse =
    search.length === 0 ? unApprovedLeaveApplications : data.leaveRequests

  const handleSelectAll = () => {
    if (selectedForApproval.length < unApprovedLeaveApplications.length) {
      setSelectedForApproval(dataTouse.map((i) => i._id))
    } else {
      setSelectedForApproval([])
    }
  }

  return (
    <div className="row justify-content-center">
      {/* <div className="col-md-3">
          <DashSideBar />
      </div>*/}
      <div className="col-sm-12">
        <div className="center mb-3 mt-3">
          <h4>LEAVE APPLICATION APPROVALS - HEAD OF UNIT</h4>
        </div>

        <div className="center">
          <CInput
            className="col-sm-12"
            type="text"
            placeholder="Search with staff ID or name"
            onChange={handleSearch}
          />
        </div>

        <CButton
          color="info"
          className="mb-3 mt-3 float-right"
          onClick={handleAuthoriseAll}
        >
          Approve All
        </CButton>

        <Table className="lg">
          <caption>Unapproved Leave Applications</caption>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>Leave Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Days</th>
              <th>Relieving Officer</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="">
            {dataTouse.map((s, index) => (
              <tr
                key={s._id}
                onClick={() => showLeaveInfo(s)}
                style={{ cursor: 'pointer' }}
              >
                <td>{index + 1}</td>
                <td>{s.staffId}</td>
                <td>{s.fullName}</td>
                <td>{s.leave}</td>
                <td>{moment(s.startDate).format('DD-MMMM-YYYY')}</td>
                <td>{moment(s.endDate).format('DD-MMMM-YYYY')}</td>
                <td>{s.daysRequested}</td>
                <td>{s.relievingOfficer}</td>
                {/* <td>
                    <button className="but btn-houReject" onClick={null}>
                      Leave History
                    </button>
                 </td>*/}
                <td>
                  <CButton
                    color="success"
                    className="btn-sm"
                    onClick={() => handleAuthorise(s)}
                  >
                    Approve
                  </CButton>
                </td>
                <td>
                  <CButton
                    color="danger"
                    className="btn-sm"
                    onClick={() => handleReject(s)}
                  >
                    Reject
                  </CButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p className="hou-p">
          Showing {dataTouse.length} Leave Applications...
        </p>
      </div>

      <CModal
        className="modal fade"
        size="lg"
        show={showInfo}
        data-backdrop="static"
        data-keyboard="false"
      >
        <CModalHeader closeButton>
          <CModalTitle>LEAVE APPROVAL | STAFF LEAVE DATA</CModalTitle>
        </CModalHeader>

        <CModalBody className="modal-body">
          <form>
            <CRow>
              <CCol xs="12" md="12">
                <CCard>
                  <CCardHeader>LAST RESUMED LEAVE DETAILS</CCardHeader>
                  <CCardBody>
                    <CFormGroup row>
                      <CInputGroup className="col-sm-12 mt-3">
                        <CLabel htmlFor="departmentId" className="col-sm-3">
                          Start Date
                        </CLabel>
                        <CInput
                          className="form-control col-sm-10"
                          type="text"
                          value={moment(lastLeave.startDate).format(
                            'DD-MMMM-YYYY',
                          )}
                        />
                      </CInputGroup>
                      <CInputGroup className="col-sm-12 mt-3">
                        <label htmlFor="unit" className="col-sm-3">
                          End Date
                        </label>
                        <CInput
                          className="form-control col-sm-10"
                          type="text"
                          value={moment(lastLeave.endDate).format(
                            'DD-MMMM-YYYY',
                          )}
                        />
                      </CInputGroup>
                      <CInputGroup className="col-sm-12 mt-3">
                        <label htmlFor="name" className="col-sm-3">
                          Days
                        </label>
                        <CInput
                          className="form-control col-sm-10"
                          type="text"
                          value={lastLeave.daysRequested}
                        />
                      </CInputGroup>
                      <CInputGroup className="col-sm-12 mt-3">
                        <label htmlFor="leaveType" className="col-sm-3">
                          Leave Type
                        </label>

                        <CInput
                          className="form-control col-sm-10"
                          type="text"
                          value={lastLeave.leave}
                        />
                      </CInputGroup>
                      <CInputGroup className="col-sm-12 mt-3">
                        <label htmlFor="relievingOfficer" className="col-sm-3">
                          Date Resumed
                        </label>
                        <CInput
                          className="form-control col-sm-10"
                          type="text"
                          value={moment(lastLeave.dateResumed).format(
                            'DD-MMMM-YYYY',
                          )}
                        />
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
      </CModal>
    </div>
  )
}

export default HouRequestApproval

//Operations , staff Dev't ,health safety and environment, policy planning budgeting and compensation
