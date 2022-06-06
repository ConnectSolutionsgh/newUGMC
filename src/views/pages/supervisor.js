import CIcon from '@coreui/icons-react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi-browser'
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
  //CSelect,
  CDropdownMenu,
  //CCardFooter,
  CInputGroup,
  //CForm,
} from '@coreui/react'
//import { DocsLink } from 'src/reusable'

//import usersData from './psm/users/usersData';

import usersData from '../users/UsersData'

const Supervisor = () => {
  const [unit, setUnit] = useState('')
  const [units, setUnits] = useState([])
  const [allStaff, setAllStaff] = useState([])
  const [department, setDepartment] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [disableButton, setDisableButton] = useState(false)
  const [supervisors, setSupervisors] = useState([])
  const [visible, setVisible] = useState(false)
  const [staffSearch, setStaffSearch] = useState('')
  const [staff, setStaff] = useState({
    department: '',
    unit: '',
  })
  const [search, setSearch] = useState('')

  const [grades, setGrades] = useState([])
  const [unitHeads, setUnitHeads] = useState([])
  const [id, setId] = useState('')
  const [iUnit, setIUnit] = useState({
    unit: '',
    department: '',
  })
  const joiUnitSchema = Joi.object().keys({
    unit: Joi.string().required().label('Unit'),
    department: Joi.string().required().label('Department'),
  })

  const validateEntry = () => {
    const result = Joi.validate({ unit, department }, joiUnitSchema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
  }

  useEffect(() => {
    async function getDepartmentsInHooks() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/departments',
      )
      setDepartment(results.data)
    }
    getDepartmentsInHooks()
  }, [])

  useEffect(() => {
    async function getStaff() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/users',
      )
      setAllStaff(results.data)
    }
    getStaff()
  }, [allStaff])

  useEffect(() => {
    async function getSupervisors() {
      const results = await axios.get(
        'https://ugmcservice.herokuapp.com/api/unitsupervisor',
      )
      setSupervisors(results.data)
    }
    getSupervisors()
  }, [supervisors])

  const handleDepartmentChange = async (e) => {
    setStaff({ ...staff, department: e.currentTarget.value })
    const results = await axios.get(
      'https://ugmcservice.herokuapp.com/api/units/' + e.currentTarget.value,
    )
    setUnits(results.data)
    console.log(units)
  }

  const handleUnitChange = (e) => {
    setStaff({ ...staff, unit: e.currentTarget.value })
  }

  const getBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'Pending':
        return 'warning'
      case 'Banned':
        return 'danger'
      default:
        return 'primary'
    }
  }
  const fields = [
    'name',
    'Phone Number',
    'GH-ID',
    'registered',
    'role',
    'status',
  ]

  const joiUserSchema = Joi.object().keys({
    staffId: Joi.string().required().label('Staff ID'),
    fullName: Joi.string().required().label('Fullname'),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['ugmc.ug.edu.gh'] },
    }),
    grade: Joi.string().required().label('Grade'),
  })

  const validateForm = () => {
    // genPassword();
    const result = Joi.validate(staff, joiUserSchema)
    if (result.error) {
      return result.error.details[0].message
    } else {
      return null
    }
    // console.log(result);
  }

  const handleSearch = (e) => {
    setSearch(e.currentTarget.value)
  }

  const data = {
    staff: supervisors.filter(
      (item) =>
        item.user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        item.user.staffId.toLowerCase().includes(search.toLowerCase()),
    ),
  }
  const dataTouse = search.length === 0 ? supervisors : data.staff

  const handleStaffSearch = (e) => {
    setStaffSearch(e.currentTarget.value)
  }

  const staffData = {
    staff: allStaff.filter(
      (item) =>
        item.fullName.toLowerCase().includes(staffSearch.toLowerCase()) ||
        item.staffId.toLowerCase().includes(staffSearch.toLowerCase()),
    ),
  }

  const staffDataTouse = staffSearch.length === 0 ? allStaff : staffData.staff

  const handleSubmit = async (s) => {
    if (staff.department === null || staff.unit === null || s._id === null) {
      return Swal.fire(
        'HOU Assignment',
        'Department or Unit should be Provided',
        'info',
      )
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to assign ' + s.fullName + ' as Unit Supervisor ? ',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Assign !',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const results = await axios.post(
            'https://ugmcservice.herokuapp.com/api/unitsupervisor',
            {
              department: staff.department,
              unit: staff.unit,
              user: s._id,
              email: s.email,
            },
          )
          await axios.put(
            'https://ugmcservice.herokuapp.com/api/users/setsupervisor/' +
              s._id,
          )

          if (results.status === 200) {
            Swal.fire(
              'Supervisor Assigned',
              'Staff Assigned As Supervisor!',
              'success',
            )
            setStaff({
              staffId: '',
              email: '',
              department: '',
              unit: '',
            })
            setVisible(!visible)
          } else {
            return Swal.fire('OOPS', 'Error : Operation Failed', 'error')
          }
        } catch (ex) {
          Swal.fire(
            'Supervisor Assignment',
            'Operation Failed!  Check Dept or Unit Selection',
            'error',
          )
        }
      }
    })
  }

  const handleRemove = async (s) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to REMOVE ' + s.user.fullName + ' as Supervisor ? ',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, REMOVE !',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const results = await axios.delete(
          'https://ugmcservice.herokuapp.com/api/unitsupervisor/remove/' +
            s._id,
        )
        if (results.status === 200) {
          await axios.put(
            'https://ugmcservice.herokuapp.com/api/users/removesupervisor/' +
              s.email,
          )
          Swal.fire('Removed', 'Staff Removed As Supervisor!', 'success')
        } else {
          return Swal.fire('OOPS', 'Error : Operation Failed', 'error')
        }
      }
    })
  }
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <div>
              <CModalHeader>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="appendedInputButtons"></CLabel>
                    <div className="controls">
                      <CInputGroup>
                        <CInput
                          id="appendedInputButtons"
                          size="16"
                          type="text"
                          placeholder="Search"
                          onChange={handleSearch}
                        />
                        <CInputGroupAppend>
                          <CCol></CCol>
                          <CButton
                            color="success"
                            onClick={() => setVisible(!visible)}
                          >
                            + New Unit Supervisor
                          </CButton>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>
                  </CFormGroup>
                </CCol>
              </CModalHeader>
            </div>

            <CModal
              show={visible}
              onClose={() => {
                setVisible(!visible)
              }}
              color="primary"
              size="lg"
            >
              <CModalHeader closeButton>
                <CModalTitle>STAFF MGT | UNIT SUPERVISOR </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <form>
                  <CRow>
                    <CCol xs="12" md="12">
                      <CCard>
                        <CCardHeader>SET UNIT SUPERVISOR</CCardHeader>
                        <CCardBody>
                          <CFormGroup row>
                            <CCol md="12">
                              <CInputGroup>
                                <select
                                  id="departmentId"
                                  className="form-control classic"
                                  value={staff.department}
                                  onChange={handleDepartmentChange}
                                >
                                  <option value="">Department *</option>
                                  {department.map((m) => (
                                    <option
                                      key={m._id}
                                      value={m._id}
                                      id={m._id}
                                    >
                                      {m.department}
                                    </option>
                                  ))}
                                </select>
                              </CInputGroup>
                            </CCol>

                            <CCol md="12">
                              <CInputGroup className="mt-3">
                                <select
                                  id="departmentId"
                                  className="form-control classic"
                                  value={staff.unit}
                                  onChange={handleUnitChange}
                                >
                                  <option value="">Unit *</option>
                                  {units.map((m) => (
                                    <option
                                      key={m._id}
                                      value={m._id}
                                      id={m._id}
                                    >
                                      {m.unit}
                                    </option>
                                  ))}
                                </select>
                              </CInputGroup>
                            </CCol>

                            <CCol md="12">
                              <CInputGroup className="mt-3 mb-3">
                                <CInput
                                  className="mb-3"
                                  id="appendedInputButtons"
                                  size="16"
                                  type="text"
                                  placeholder="Search"
                                  onChange={handleStaffSearch}
                                />
                                <table className="table table-hover table-striped table-outline mb-0 d-none d-sm-table">
                                  <caption>Users</caption>
                                  <thead className="thead-light">
                                    <tr>
                                      <th></th>
                                      <th>Staff ID</th>
                                      <th>FullName</th>

                                      <th>Grade</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody className="">
                                    {staffDataTouse.map((s, index) => (
                                      <tr key={s._id}>
                                        <td>{index + 1}</td>
                                        <td>{s.staffId}</td>
                                        <td>{s.fullName}</td>
                                        <td>{s.grade}</td>
                                        <td className="">
                                          {!s.isSupervisor && (
                                            <CButton
                                              color="success"
                                              size="sm"
                                              onClick={() => handleSubmit(s)}
                                            >
                                              Set
                                            </CButton>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                                <p className="hou-p">
                                  Showing {dataTouse.length} Users...
                                </p>
                              </CInputGroup>
                            </CCol>
                          </CFormGroup>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </form>
              </CModalBody>
              <CModalFooter></CModalFooter>
            </CModal>

            <CCardBody>
              <table className="table table-hover table-striped table-outline mb-0 d-none d-sm-table">
                <caption>Unit Supervisors</caption>
                <thead className="thead-light">
                  <tr>
                    <th></th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Unit</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="">
                  {dataTouse.map((s, index) => (
                    <tr key={s._id}>
                      <td>{index + 1}</td>
                      <td>{s.user.fullName}</td>
                      <td>{s.email}</td>
                      <td>{s.department.department}</td>
                      <td>{s.unit.unit}</td>
                      <td>
                        {
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => handleRemove(s)}
                          >
                            Remove
                          </CButton>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="hou-p">
                Showing {dataTouse.length} Unit Supervisors...
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Supervisor

//0243039436 - Bentum;
