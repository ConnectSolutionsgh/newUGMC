import React, { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import auth from '../../components/services/authService'
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
const LeaveDispatch = () => {
  const [leaveRequests, setLeaveRequests] = useState([])
  const [currentYear, setCurrentYear] = useState(0)
  const [search, setSearch] = useState('')
  const [minDate, setMinDate] = useState(new Date())
  const [maxDate, setMaxDate] = useState(new Date())
  const [rerender, setRerender] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const user = auth.getCurrentUser()

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
    async function getUndispatchedLeaveRequests() {
      if (currentYear > 0) {
        try {
          const results = await axios.get(
            'https://ugmcservice.herokuapp.com/api/leaverequests/dispatch/' +
              currentYear,
          )
          setLeaveRequests(results.data)
        } catch (err) {
          return toast.error(err + ': ', {
            position: toast.POSITION.TOP_CENTER,
          })
        }
      }
    }
    getUndispatchedLeaveRequests()
  }, [currentYear, rerender])

  const data = {
    leaveRequests: leaveRequests.filter(
      (item) =>
        item.fullName.toLowerCase().includes(search.toLowerCase()) ||
        item.staffId.toLowerCase().includes(search.toLowerCase()),
    ),
  }

  const dataTouse = search.length === 0 ? leaveRequests : data.leaveRequests

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const Dispatch = async (
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
        'https://ugmcservice.herokuapp.com/api/leaverequests/dispatch/' + i,
        {
          dispatchStatus: 'Dispatched',
          dateDispatched: new Date(),
          dispatchedBy: user._id,
          email: email,
          fullName: fullName,
          startDate: startDate,
          endDate: endDate,
          daysRequested: daysRequested,
        },
      )
      return results
    } catch (err) {
      return Swal.fire('Error', err + ': Leave Dispatch FAILED!', 'error')
    }
  }

  const handleDispatchAll = () => {
    const ap = leaveRequests.map((i) => {
      Dispatch(
        i._id,
        i.startDate,
        i.endDate,
        i.daysRequested,
        i.email,
        i.fullName,
      )
    })

    if (ap) {
      Swal.fire('Success', 'Staff leave Applications Dispatched !', 'success')
      setRerender(!rerender)
      setDisabled(!disabled)
    } else {
      Swal.fire('Error', 'Error: Leave Application Dispatch FAILED !', 'error')
      setRerender(!rerender)
    }
  }

  const handleDispatch = (s) => {
    setDisabled(true)

    const ap = Dispatch(
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
        'Success',
        'leave Application Dispatched Successfully !',
        'success',
      )
      setDisabled(!disabled)
      setRerender(!rerender)
    } else {
      Swal.fire('Error', 'Error: Leave Application Dispatch FAILED !', 'error')
      setRerender(!rerender)
    }
  }

  return (
    <div>
      <div className="center mb-3 mt-3">
        <h4>DISPATCH LEAVE REQUESTS</h4>
      </div>

      <div className="center">
        <CInput
          className=""
          type="text"
          placeholder="Search with staff ID or name"
          onChange={handleSearch}
        />
        <div className="btn-group-hou">
          <CButton
            color="info"
            className="but btn-houAuthorise float-right m-3"
            onClick={handleDispatchAll}
          >
            Dispatch All
          </CButton>
        </div>
      </div>

      <table className="table table-hover table-striped table-outline mb-0 d-none d-sm-table table-sm">
        <caption>Dispatch Approved Leave Request</caption>
        <thead>
          <tr>
            <th></th>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Leave Type</th>
            <th>Days Requested</th>
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
              <td>{moment(s.startDate).format('DD,MMMM,YYYY')}</td>
              <td>{moment(s.endDate).format('DD,MMMM,YYYY')}</td>

              {/* <td>
      <button className="but btn-houReject" onClick={null}>
        Leave History
      </button>
   </td>*/}
              <td>
                <CButton
                  color="success"
                  className="but btn-sm mr-3"
                  onClick={() => handleDispatch(s)}
                >
                  Dispatch
                </CButton>

                <CButton color="danger" className="but btn-sm">
                  Reject
                </CButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaveDispatch
