import CIcon from "@coreui/icons-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi-browser";
import Swal from "sweetalert2";
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
} from "@coreui/react";
//import { DocsLink } from 'src/reusable'

//import usersData from './psm/users/usersData';

import usersData from "../users/UsersData";

const DeptHead = () => {
  const [dept, setDept] = useState("");

  const [allStaff, setAllStaff] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [visible, setVisible] = useState(false);
  const [staffSearch, setStaffSearch] = useState("");
  const [staff, setStaff] = useState({
    department: "",
  });
  const [search, setSearch] = useState("");
  const [deptHeads, setDeptHeads] = useState([]);

  const joiUnitSchema = Joi.object().keys({
    unit: Joi.string().required().label("Unit"),
    department: Joi.string().required().label("Department"),
  });

  const validateEntry = () => {
    const result = Joi.validate({ dept }, joiUnitSchema);
    if (result.error) {
      return result.error.details[0].message;
    } else {
      return null;
    }
  };

  useEffect(() => {
    async function getDepartmentsInHooks() {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/departments"
      );
      setDepartments(results.data);
    }
    getDepartmentsInHooks();
  }, []);

  useEffect(() => {
    async function getStaff() {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/users"
      );
      setAllStaff(results.data);
    }
    getStaff();
  }, [allStaff]);

  useEffect(() => {
    async function getDeptHeads() {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/depthead"
      );
      setDeptHeads(results.data);
    }
    getDeptHeads();
  }, [deptHeads]);

  const handleDepartmentChange = async (e) => {
    setStaff({ ...staff, department: e.currentTarget.value });
  };

  const getBadge = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };
  const fields = [
    "name",
    "Phone Number",
    "GH-ID",
    "registered",
    "role",
    "status",
  ];

  const joiUserSchema = Joi.object().keys({
    staffId: Joi.string().required().label("Staff ID"),
    fullName: Joi.string().required().label("Fullname"),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["ugmc.ug.edu.gh"] },
    }),
    department: Joi.string().required().label("Department"),
  });

  const validateForm = () => {
    // genPassword();
    const result = Joi.validate(staff, joiUserSchema);
    if (result.error) {
      return result.error.details[0].message;
    } else {
      return null;
    }
    // console.log(result);
  };

  const handleSearch = (e) => {
    setSearch(e.currentTarget.value);
  };

  const data = {
    staff: deptHeads.filter(
      (item) =>
        item.fullName.toLowerCase().includes(search.toLowerCase()) ||
        item.user.staffId.toLowerCase().includes(search.toLowerCase())
    ),
  };
  const dataTouse = search.length === 0 ? deptHeads : data.staff;

  const handleStaffSearch = (e) => {
    setStaffSearch(e.currentTarget.value);
  };

  const staffData = {
    staff: allStaff.filter(
      (item) =>
        item.fullName.toLowerCase().includes(staffSearch.toLowerCase()) ||
        item.staffId.toLowerCase().includes(staffSearch.toLowerCase())
    ),
  };

  const staffDataTouse = staffSearch.length === 0 ? allStaff : staffData.staff;

  const handleSubmit = async (s) => {
    console.log(s);
    if (staff.department === null) {
      return Swal.fire(
        "HOU Assignment",
        "Department or Unit should be Provided",
        "info"
      );
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to assign " + s.fullName + " as Department Head ? ",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, ASSIGN !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const results = await axios.post(
            "https://ugmcservice.herokuapp.com/api/depthead",
            {
              department: staff.department,
              user: s._id,
              fullName: s.fullName,
              email: s.email,
            }
          );
          await axios.put(
            "https://ugmcservice.herokuapp.com/api/users/assignhod/" + s.email
          );

          if (results.status === 200) {
            Swal.fire(
              "HOD Assigned",
              "Staff Assigned As Head of Department!",
              "success"
            );
            setStaff({
              staffId: "",
              fullName: "",
              email: "",
              department: "",
              unit: "",
            });
            setVisible(!visible);
          } else {
            return Swal.fire("OOPS", "Error : Operation Failed", "error");
          }
        } catch (ex) {
          Swal.fire("HOU Assignment", "Operation Failed!", "error");
        }
      }
    });
  };

  const handleRemove = async (s) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to REMOVE " + s.head + " as Department Head ? ",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, REMOVE !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const results = await axios.put(
          "https://ugmcservice.herokuapp.com/api/users/removehod/" + s.email
        );
        if (results.status === 200) {
          await axios.delete(
            "https://ugmcservice.herokuapp.com/api/depthead/" + s.email
          );
          Swal.fire(
            "Removed",
            "Staff Removed As Head of Department!",
            "success"
          );
        } else {
          return Swal.fire("OOPS", "Error : Operation Failed", "error");
        }
      }
    });
  };
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
                            + New Dept Head
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
                setVisible(!visible);
              }}
              color="primary"
              size="lg"
            >
              <CModalHeader closeButton>
                <CModalTitle>STAFF MGT | DEPARTMENT HEAD </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <form>
                  <CRow>
                    <CCol xs="12" md="12">
                      <CCard>
                        <CCardHeader>SET DEPARTMENT HEAD</CCardHeader>
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
                                  {departments.map((m) => (
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
                                      <th>Email</th>

                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody className="">
                                    {staffDataTouse.map((s, index) => (
                                      <tr key={s._id}>
                                        <td>{index + 1}</td>
                                        <td>{s.staffId}</td>
                                        <td>{s.fullName}</td>
                                        <td>{s.email}</td>

                                        <td className="">
                                          {!s.isHeadOfDepartment && (
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
                <caption>Department Heads</caption>
                <thead className="thead-light">
                  <tr>
                    <th></th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="">
                  {dataTouse.map((s, index) => (
                    <tr key={s._id}>
                      <td>{index + 1}</td>
                      <td>{s.fullName}</td>
                      <td>{s.email}</td>
                      <td>{s.department.department}</td>
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
                Showing {dataTouse.length} Department Heads...
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default DeptHead;

//0243039436 - Bentum;
