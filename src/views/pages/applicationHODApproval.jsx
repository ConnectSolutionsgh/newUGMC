import { Redirect } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import auth from '../../components/services/authService'
import Swal from 'sweetalert2'
import { ModalHover } from 'react-modal-hover'
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

const HodRequestApproval = () => {
  const user = auth.getCurrentUser()

  const [currentYear, setCurrentYear] = useState('')
  const [minDate, setMinDate] = useState(new Date())
  const [maxDate, setMaxDate] = useState(new Date())
  const [
    unApprovedLeaveApplications,
    setUnapprovedLeaveApplications,
  ] = useState([])
  const [hodDetails, setHodDetails] = useState({})

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

  useEffect(() => {
    async function getDepartmentHeadDetails() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/depthead/' + user._id,
      )
      setHodDetails(results.data[0])
      //setRerender(!rerender);
    }
    getDepartmentHeadDetails()
  }, [hodDetails, user._id])

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

  useEffect(() => {
    async function getUnapprovedLeaveApplications() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/leaverequests/houapproved/' +
          hodDetails.department +
          '/' +
          user._id +
          '/' +
          'HOU Approved',
      )
      setUnapprovedLeaveApplications(results.data)
    }
    getUnapprovedLeaveApplications()
  }, [unApprovedLeaveApplications, user._id, hodDetails, rerender])

  const data = {
    leaveRequests: unApprovedLeaveApplications.filter(
      (item) =>
        item.fullName.toLowerCase().includes(search.toLowerCase()) ||
        item.staffId.toLowerCase().includes(search.toLowerCase()),
    ),
  }

  const dataTouse =
    search.length === 0 ? unApprovedLeaveApplications : data.leaveRequests
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const updateHodApproval = async (
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
        'https://ugmcservice.herokuapp.com/api/leaverequests/hodapprovals/' + i,
        {
          isHoDApproved: 'true',
          hoD: user._id,
          dateHoDApproved: Date.now(),
          status: 'HOD Approved',
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
        'error',
        err + ': leave Application(s) Approval FAILED!',
        'error',
      )
    }
  }

  const handleApproval = (s) => {
    setDisabled(true)
    const ap = updateHodApproval(
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
      Swal.fire('FAILED', 'Error: Leave Application Approval FAILED !', 'error')
    }
  }

  const handleApproveAll = () => {
    setDisabled(true)
    const ap = unApprovedLeaveApplications.map((i) =>
      updateHodApproval(
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
      Swal.fire(
        'SUCCESS',
        'Error: Leave Application Approval FAILED !',
        'success',
      )
    }
  }

  const updateHodReject = async (
    i,
    startDate,
    endDate,
    daysRequested,
    email,
    fullName,
  ) => {
    await axios.put(
      'https://ugmcservice.herokuapp.com/api/leaverequests/hodapprovals/' + i,
      {
        isHodApproved: 'false',
        hoD: user._id,
        dateHodApproved: Date.now(),
        status: 'HOD Rejected',
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
    const ap = updateHodReject(
      s._id,
      s.startDate,
      s.endDate,
      s.daysRequested,
      s.email,
      s.fullName,
    )
    setRerender(!rerender)
    if (ap) {
      Swal.fire('REJECTED', 'Leave Request REJECTED!', 'info')
      setDisabled(!disabled)
    } else {
      Swal.fire('FAILED', 'Error: REQUEST REJECTION FAILED', 'error')
      setDisabled(!disabled)
    }
  }

  return (
    <div>
      <div className="row justify-content-center">
        {/*<div className="col-md-3">
          <DashSideBar />
      </div>*/}
        <div className="col-md-12">
          <div className="center mb-3 mt-3">
            <h4>LEAVE APPLICATION APPROVAL - HEAD OF DEPARTMENT</h4>
          </div>

          <div className="center">
            <CInput
              className="col-sm-8"
              type="text"
              placeholder="Search with staff ID or name"
              onChange={handleSearch}
            />
          </div>

          <CButton
            color="info"
            className="btn float-right mb-3"
            onClick={handleApproveAll}
          >
            Approve All
          </CButton>

          <Table className="striped hover lg">
            <caption>Unapproved Leave Applications</caption>
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Name</th>
                <th>Start</th>
                <th>End</th>
                <th>Days</th>
                <th>Relieving Officer</th>
                <th>Holidays</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataTouse.map((s, index) => (
                <tr
                  key={s._id}
                  onClick={() => showLeaveInfo(s)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{index + 1}</td>
                  <td>{s.staffId}</td>
                  <td>{s.fullName}</td>
                  <td>{moment(s.startDate).format('DD-MMMM-YYYY')}</td>
                  <td>{moment(s.endDate).format('DD-MMMM-YYYY')}</td>
                  <td>{s.daysRequested}</td>
                  <td>{s.relievingOfficer}</td>
                  <td>{s.holidays}</td>

                  <td>
                    <CButton
                      color="success"
                      className="btn-sm mr-2"
                      onClick={() => handleApproval(s)}
                    >
                      Approve
                    </CButton>

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
        </div>
      </div>

      <CModal
        className="modal fade"
        size="lg"
        show={showInfo}
        data-backdrop="static"
        data-keyboard="false"
      >
        <CModalHeader closeButton>
          <CModalTitle>LEAVE APPROVAL | STAFF LEAVE INFO</CModalTitle>
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

export default HodRequestApproval
