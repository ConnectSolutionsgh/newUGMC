import React, { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import { toast } from 'react-toastify'
import auth from '../../components/services/authService'
import { Modal } from 'react-bootstrap'
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
const LeaveRecall = () => {
  const [dispatched, setDispatched] = useState([])
  const [currentYear, setCurrentYear] = useState(0)
  const [search, setSearch] = useState('')
  const [minDate, setMinDate] = useState(new Date())
  const [maxDate, setMaxDate] = useState(new Date())
  const [rerender, setRerender] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const user = auth.getCurrentUser()
  const [show, setShow] = useState(false)

  const [dispatchData, setDispatchData] = useState({
    staffId: '',
    fullName: '',
    daysRequested: 0,
    startDate: new Date(),
    endDate: new Date(),
    overStayedDays: 0,
    resumptionEntryBy: user._id,
    resumptionStatus: 'Resumed',
    resumptionComment: '',
    email: '',
  })

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
    async function getDispatchedLeaveRequests() {
      if (currentYear > 0) {
        try {
          const results = await axios.get(
            'https://ugmcservice.herokuapp.com/api/leaverequests/resume/' +
              currentYear,
          )
          setDispatched(results.data)
        } catch (err) {
          return toast.error(err + ': ', {
            position: toast.POSITION.TOP_CENTER,
          })
        }
      }
    }
    getDispatchedLeaveRequests()
  }, [currentYear, rerender])

  const data = {
    dispatched: dispatched.filter(
      (item) =>
        item.fullName.toLowerCase().includes(search.toLowerCase()) ||
        item.staffId.toLowerCase().includes(search.toLowerCase()),
    ),
  }

  const dataTouse = search.length === 0 ? dispatched : data.dispatched

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const Resume = async (
    i,
    email,
    fullName,
    startDate,
    endDate,
    daysRequested,
  ) => {
    try {
      // getCheckedComment(i);
      const results = await axios.put(
        'https://ugmcservice.herokuapp.com/api/leaverequests/resume/' + i,
        {
          resumptionStatus: 'Resumed',
          dateResumed: dispatchData.dateResumed,
          resumptionEntryBy: user._id,
          resumptionComment: dispatchData.resumptionComment,
          email: email,
          fullName: fullName,
          startDate: startDate,
          endDate: endDate,
          daysRequested: daysRequested,
        },
      )
      return results
    } catch (err) {
      return Swal.fire('Error', 'Leave Resumption, FAILED !', 'error')
    }
  }

  const handleResumption = () => {
    const ap = dispatched.map((i) => {
      Resume(
        i._id,
        i.startDate,
        i.endDate,
        i.daysRequested,
        i.email,
        i.fullName,
      )
    })

    if (ap) {
      Swal.fire('Success', 'Leave Resumption Completed', 'success')
      setRerender(!rerender)
      setDisabled(!disabled)
    } else {
      Swal.fire('Error', 'Leave Resumption, FAILED !', 'error')
      setRerender(!rerender)
    }
  }

  const handleDispatch = (s) => {
    setDispatchData({
      ...dispatchData,
      staffId: s.staffId,
      fullName: s.fullName,
      email: s.email,
      daysRequested: s.daysRequested,
      startDate: moment(s.startDate).format('DD,MMMM,YYYY'),
      endDate: moment(s.endDate).format('DD,MMMM,YYYY'),
    })

    setShow(!show)
  }

  const getDateDiff = (e) => {
    const dateResumed = new Date(e.currentTarget.value)
    const endDate = new Date(dispatchData.endDate)
    const diffTime = new Date(dateResumed) - new Date(endDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    setDispatchData({
      ...dispatchData,
      dateResumed: e.currentTarget.value,
      overStayedDays: diffDays,
    })
    //console.log(weekends);
  }

  return (
    <div>
      <div className="center mb-3 mt-3">
        <h4>RECALL FROM LEAVE</h4>
      </div>

      <CInput
        className="form-control col-sm-6 mb-3"
        type="text"
        placeholder="Search with staff ID or name"
        onChange={handleSearch}
      />

      <Table className="table-lg striped hover">
        <caption>Leave Recall</caption>
        <thead>
          <tr>
            <th></th>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Leave</th>
            <th>Days</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataTouse.map((s, index) => (
            <tr key={s._id}>
              <td>{index + 1}</td>
              <td>{s.staffId}</td>
              <td>{s.fullName}</td>
              <td>{s.leave}</td>
              <td>{s.daysRequested}</td>
              <td>{moment(s.startDate).format('DD-MMMM-YYYY')}</td>
              <td>{moment(s.endDate).format('DD-MMMM-YYYY')}</td>

              {/* <td>
      <button className="but btn-houReject" onClick={null}>
        Leave History
      </button>
   </td>*/}
              <td>
                <CButton
                  color="info"
                  className="btn-sm"
                  onClick={() => {
                    handleDispatch(s)
                  }}
                >
                  Resume Duty
                </CButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CModal
        className="custom-dialog"
        show={show}
        data-backdrop="static"
        data-keyboard="false"
        size="lg"
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
                value={dispatchData.staffId}
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
                ref={null}
                value={dispatchData.fullName}
              />
            </CInputGroup>
            <CInputGroup className="mt-3">
              <CLabel htmlFor="daysRequested" className="col-sm-3">
                Days on Leave *
              </CLabel>

              <CInput
                className="form-control col-sm-8"
                readOnly={true}
                type="text"
                value={dispatchData.daysRequested}
              />
            </CInputGroup>
            <CInputGroup className="mt-3">
              <CLabel htmlFor="startdate" className="col-sm-3">
                Start Date *
              </CLabel>{' '}
              <CInput
                type="text"
                className="form-control col-sm-8"
                dateformat="dd-MMMM-yyyy"
                value={dispatchData.startDate}
                readOnly={true}
              />
            </CInputGroup>
            <CInputGroup className="mt-3">
              <CLabel htmlFor="endDate" className="col-sm-3">
                End Date *
              </CLabel>{' '}
              <CInput
                type="text"
                className="form-control col-sm-8"
                dateformat="dd-MMMM-yyyy"
                value={dispatchData.endDate}
                readOnly="readOnly"
              />
            </CInputGroup>
            <CInputGroup className="mt-3">
              <CLabel htmlFor="dateResumed" className="col-sm-3">
                Date to Resume *
              </CLabel>{' '}
              <CInput
                id="dateResumed"
                type="date"
                className="form-control col-sm-8"
                dateformat="dd-MMMM-yyyy"
                max={new Date()}
                value={dispatchData.dateResumed}
                onChange={getDateDiff}
              />
            </CInputGroup>
            <CInputGroup className="mt-3">
              <CLabel htmlFor="daysRequested" className="col-sm-3">
                Reason for recall *
              </CLabel>

              <textarea
                ref={null}
                className="form-control col-sm-8"
                type="text"
                value={dispatchData.resumptionComment}
                onChange={(e) => {
                  setDispatchData({
                    ...dispatchData,
                    resumptionComment: e.currentTarget.value,
                  })
                }}
              />
            </CInputGroup>
          </form>

          <CButton
            color="success"
            className="float-right mt-3 mr-3"
            onClick={handleResumption}
          >
            <span>Recall</span>
          </CButton>

          {/*<button className="btnrequestsubmit" onClick={handleRejection}>
              <span> Reject</span>
                  </button>*/}

          <CButton
            color="danger"
            className="float-right mt-3 mr-3"
            onClick={() => setShow(false)}
          >
            Close
          </CButton>
        </CModalBody>
      </CModal>
    </div>
  )
}

export default LeaveRecall
