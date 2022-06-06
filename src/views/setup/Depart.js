import React, { useState, useEffect } from "react";
import CIcon from "@coreui/icons-react";
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

const Depart = () => {
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
  const [visible, setVisible] = useState(false);
  const [selectedDirectorate, setSelectedDirectorate] = useState("");
  const [allDepartments, setAllDepartments] = useState([]);
  const [allDirectorates, setAllDirectorates] = useState([]);
  const [department, setDepartment] = useState({
    department: "",
    directorate: "",
  });

  useEffect(() => {
    async function getDepartments() {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/departments"
      );
      setAllDepartments(results.data);
    }
    getDepartments();
  }, [allDepartments]);

  useEffect(() => {
    async function getDirectorates() {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/directorates"
      );
      setAllDirectorates(results.data);
    }
    getDirectorates();
  }, [allDirectorates]);

  const handleDirectorateChange = (e) => {
    setDepartment({ ...department, directorate: e.currentTarget.value });
    // setSelectedDirectorate(e.target.value);
    //console.log(unitDept.department);
  };

  const handleEditClicked = (c) => {
    console.log(c.department);
  };

  const handleSubmit = async () => {
    const results = await axios.post(
      "https://ugmcservice.herokuapp.com/api/departments",
      department
    );

    if (results.status === 200) {
      Swal.fire({
        title: "Success",
        text: "Department Successfully Added",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Success",
        text: "Department Addition Failed",
        icon: "error",
      });
    }
    setDepartment({ department: "", directorate: "" });
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
                        />
                        <CInputGroupAppend>
                          <CCol>
                            <CButton color="primary">Search</CButton>
                          </CCol>
                          <CButton
                            color="primary"
                            onClick={() => setVisible(!visible)}
                          >
                            + New Department
                          </CButton>{" "}
                          <CButton
                            color="success"
                            onClick={() => setVisible(!visible)}
                          >
                            Export Report
                          </CButton>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>
                  </CFormGroup>
                </CCol>
              </CModalHeader>
            </div>

            {/*<CButton color="success" onClick={() => setSuccess(!success)} className="mr-1">Success modal</CButton>
            <CButton color="warning" onClick={() => setWarning(!warning)} className="mr-1">Warning modal</CButton>
            <CButton color="danger" onClick={() => setDanger(!danger)} className="mr-1">Danger modal</CButton>
  <CButton color="info" onClick={() => setInfo(!info)} className="mr-1">Info modal</CButton>*/}

            <CModal
              show={visible}
              onClose={() => setVisible(!visible)}
              color="primary"
              size="lg"
            >
              <CModalHeader closeButton>
                <CModalTitle>Administration | Department Setup</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <form>
                  <CRow>
                    <CCol xs="12" md="12">
                      <CCard>
                        <CCardHeader>DEPARTMENT SETUP</CCardHeader>
                        <CCardBody>
                          <CFormGroup row>
                            <CCol md="12">
                              <CInputGroup>
                                <CInput
                                  id="FileNumber"
                                  name="FileNumber"
                                  placeholder="Department"
                                  onChange={(e) =>
                                    setDepartment({
                                      ...department,
                                      department: e.currentTarget.value,
                                    })
                                  }
                                />
                              </CInputGroup>
                            </CCol>
                          </CFormGroup>

                          <CFormGroup row>
                            <CCol md="12">
                              <CInputGroup>
                                <CDropdown className="input-group-append">
                                  <select
                                    id="departmentId"
                                    className="form-control classic"
                                    value={department.directorate}
                                    onChange={handleDirectorateChange}
                                  >
                                    <option value="">Directorate *</option>
                                    {allDirectorates.map((m) => (
                                      <option
                                        key={m._id}
                                        value={m._id}
                                        id={m._id}
                                      >
                                        {m.directorate}
                                      </option>
                                    ))}
                                  </select>
                                </CDropdown>
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
                <CButton color="success" size="sm" onClick={handleSubmit}>
                  Save
                </CButton>{" "}
                <CButton
                  color="warning"
                  size="sm"
                  onClick={() => setVisible(!visible)}
                >
                  Reset
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  onClick={() => setVisible(!visible)}
                >
                  Cancel
                </CButton>
              </CModalFooter>
            </CModal>

            <CCardBody>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <caption>Departments</caption>
                <thead className="thead-light">
                  <tr>
                    <th>Number</th>
                    <th>Department</th>
                    <th>Directorate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {allDepartments.map((s, index) => (
                    <tr key={s._id}>
                      <td>{index + 1}</td>
                      <td>{s.department}</td>
                      <td>{s.directorate.directorate}</td>

                      <td className="float-right">
                        <CButton
                          color="info"
                          size="sm"
                          onClick={(s) => handleEditClicked(s)}
                        >
                          Edit
                        </CButton>

                        {/*<CButton color="primary" size="sm" onClick={(s)=>handleEditClicked(s)}>
                  Edit
                </CButton>
                <CButton color="danger" size="sm" onClick={(s)=>handleEditClicked(s)}>
                  Edit
              </CButton>*/}
                      </td>
                      {/*<td>
                    <button
                      className="but btn-houReject"
                      onClick={() => handleShow(s)}
                    >
                      Reject
                    </button>
                  </td>*/}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Depart;
