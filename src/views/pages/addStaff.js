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

const AddStaff = () => {
  const [unit, setUnit] = useState("");
  const [units, setUnits] = useState([]);
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const [visible, setVisible] = useState(false);
  const [staff, setStaff] = useState({
    staffId: "",
    fullName: "",
    email: "",
    grade: "",
  });
  const [search, setSearch] = useState("");
  const [grades, setGrades] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [id, setId] = useState("");
  const [iUnit, setIUnit] = useState({
    unit: "",
    department: "",
  });
  const joiUnitSchema = Joi.object().keys({
    unit: Joi.string().required().label("Unit"),
    department: Joi.string().required().label("Department"),
  });

  const validateEntry = () => {
    const result = Joi.validate({ unit, department }, joiUnitSchema);
    if (result.error) {
      return result.error.details[0].message;
    } else {
      return null;
    }
  };

  useEffect(() => {
    async function getGrades() {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/grades"
      );
      setGrades(results.data);
    }
    getGrades();
  }, [grades]);

  useEffect(() => {
    async function getStaff() {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/stafflist"
      );
      setStaffList(results.data);
    }
    getStaff();
  }, [staffList]);

  const handleGradeChange = (e) => {
    setStaff({ ...staff, grade: e.currentTarget.value });
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
    grade: Joi.string().required().label("Grade"),
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

  const handleSubmit = async (e) => {
    //genPassword();
    e.preventDefault();
    const validate = validateForm();

    if (validate === null) {
      try {
        const results = await axios.post(
          "https://ugmcservice.herokuapp.com/api/stafflist",
          staff
        );
        if (results.status === 200) {
          Swal.fire("Good Job", "Details Added to Staff List !", "success");
          setStaff({
            email: "",
            staffId: "",
            grade: "",
            fullName: "",
          });
        } else {
          return Swal.fire("OOPS", "Error : Staff NOT Saved", "error");
        }
      } catch (err) {
        return Swal.fire(
          "OOPS",
          "Error : Staff ID or Email may already exists in Database",
          "error"
        );
      }
    }
  };

  const handleUpdate = async (e) => {
    //genPassword();
    e.preventDefault();
    const validate = validateForm();

    if (validate === null) {
      try {
        const results = await axios.put(
          "https://ugmcservice.herokuapp.com/api/stafflist/" + id,
          staff
        );
        if (results.status === 200) {
          Swal.fire("Good Job", "Details Updated !", "success");
          setStaff({
            email: "",
            staffId: "",
            grade: "",
            fullName: "",
          });
          setId(null);
          setVisible(!visible);
        } else {
          return Swal.fire("OOPS", "Error : Staff NOT Updated", "error");
        }
      } catch (err) {
        return Swal.fire(
          "OOPS",
          err + "  Staff ID or Email may already exists in Database",
          "error"
        );
      }
    }
  };

  const handleSearch = (e) => {
    setSearch(e.currentTarget.value);
  };
  const handleEditClicked = (s) => {
    setStaff({
      staffId: s.staffId,
      fullName: s.fullName,
      email: s.email,
      grade: s.grade,
    });
    setId(s._id);
    setVisible(!visible);
  };

  const data = {
    staff: staffList.filter((item) =>
      item.fullName.toLowerCase().includes(search.toLowerCase())
    ),
  };

  const dataTouse = search.length === 0 ? staffList : data.staff;

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
                            color="primary"
                            onClick={() => setVisible(!visible)}
                          >
                            + New Staff
                          </CButton>{" "}
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
                <CModalTitle>STAFF MGT | ADD STAFF </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <form>
                  <CRow>
                    <CCol xs="12" md="12">
                      <CCard>
                        <CCardHeader>ADD STAFF</CCardHeader>
                        <CCardBody>
                          <CFormGroup row>
                            <CCol md="6">
                              <CInputGroup>
                                <CInput
                                  id="staffId"
                                  name="staffId"
                                  placeholder="Staff ID *"
                                  value={staff.staffId}
                                  onChange={(e) =>
                                    setStaff({
                                      ...staff,
                                      staffId: e.currentTarget.value,
                                    })
                                  }
                                />
                              </CInputGroup>
                            </CCol>

                            <CCol md="10">
                              <CInputGroup className="mt-3">
                                <CInput
                                  id="fullName"
                                  name="fullName"
                                  placeholder="Full Name *"
                                  value={staff.fullName}
                                  onChange={(e) =>
                                    setStaff({
                                      ...staff,
                                      fullName: e.currentTarget.value,
                                    })
                                  }
                                />
                              </CInputGroup>
                            </CCol>

                            <CCol md="10">
                              <CInputGroup className="mt-3">
                                <CInput
                                  type="email"
                                  id="email"
                                  name="email"
                                  placeholder="Official Email *"
                                  value={staff.email}
                                  onChange={(e) =>
                                    setStaff({
                                      ...staff,
                                      email: e.currentTarget.value,
                                    })
                                  }
                                />
                              </CInputGroup>
                            </CCol>
                            <CCol md="10">
                              <CInputGroup className="mt-3">
                                <select
                                  id="departmentId"
                                  className="form-control classic"
                                  value={staff.grade}
                                  onChange={handleGradeChange}
                                >
                                  <option value="">Grade *</option>
                                  {grades.map((m) => (
                                    <option
                                      key={m._id}
                                      value={m.grade}
                                      id={m._id}
                                    >
                                      {m.grade}
                                    </option>
                                  ))}
                                </select>
                              </CInputGroup>
                            </CCol>
                          </CFormGroup>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </form>
              </CModalBody>
              <CModalFooter>
                {!id && (
                  <CButton color="success" size="sm" onClick={handleSubmit}>
                    Save
                  </CButton>
                )}
                <CButton
                  color="warning"
                  size="sm"
                  onClick={() => {
                    setId(null);
                    setStaff({
                      staffId: "",
                      fullName: "",
                      email: "",
                      grade: "",
                    });
                    setVisible(!visible);
                  }}
                >
                  Reset
                </CButton>
                {id && (
                  <CButton color="info" size="sm" onClick={handleUpdate}>
                    Update
                  </CButton>
                )}
                <CButton
                  color="danger"
                  size="sm"
                  onClick={() => {
                    setId(null);
                    setStaff({
                      staffId: "",
                      fullName: "",
                      email: "",
                      grade: "",
                    });
                    setVisible(!visible);
                  }}
                >
                  Cancel
                </CButton>
              </CModalFooter>
            </CModal>

            <CCardBody>
              <table className="table table-hover table-striped table-outline mb-0 d-none d-sm-table">
                <caption>Staff List</caption>
                <thead className="thead-light">
                  <tr>
                    <th></th>
                    <th>Staff ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Grade</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="">
                  {dataTouse.map((s, index) => (
                    <tr key={s._id}>
                      <td>{index + 1}</td>
                      <td>{s.staffId}</td>
                      <td>{s.fullName}</td>
                      <td>{s.email}</td>
                      <td>{s.grade}</td>
                      <td className="float-right">
                        <CButton
                          color="success"
                          size="sm"
                          onClick={() => handleEditClicked(s)}
                        >
                          Edit
                        </CButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="hou-p">Showing {dataTouse.length} Staff...</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AddStaff;

//0243039436 - Bentum;
