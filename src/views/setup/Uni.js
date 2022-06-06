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
import DepartmentSetup from "./Directorate";

const UnitSetup = () => {
  const [unit, setUnit] = useState("");
  const [units, setUnits] = useState([]);
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [search, setSearch] = useState("");
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
    async function getUnits() {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/units"
      );
      setUnits(results.data);
    }
    getUnits();
  }, [units]);

  useEffect(() => {
    async function getDepartmentsInHooks() {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/departments"
      );
      setDepartment(results.data);
    }
    getDepartmentsInHooks();
  }, []);

  const handleDepartmentChange = (e) => {
    //setSelectedDepartment(e.target.value);
    setIUnit({ ...iUnit, department: e.currentTarget.value });
    console.log(e.currentTarget.value);
  };

  const handleUnitChange = (e) => {
    setIUnit({ ...iUnit, unit: e.currentTarget.value });
  };

  const handleSubmit = async () => {
    console.log(iUnit);
    setDisableButton(true);
    const results = await axios.post(
      "https://ugmcservice.herokuapp.com/api/units",
      iUnit
    );

    if (results.status === 200) {
      Swal.fire({
        title: "Success",
        text: "Unit Successfully Added",
        icon: "success",
      });
      setDisableButton(false);
    } else {
      Swal.fire({
        title: "Success",
        text: "Unit Setup Failed",
        icon: "error",
      });
      setDisableButton(false);
    }
    setDisableButton(false);
    setUnit("");
    setSelectedDepartment("");
    setIUnit({ unit: "", department: "" });
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
  const [visible, setVisible] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.currentTarget.value);
  };
  const handleEditClicked = (s) => {
    console.log(s);
  };

  const data = {
    units: units.filter((item) =>
      item.unit.toLowerCase().includes(search.toLowerCase())
    ),
  };

  const dataTouse = search.length === 0 ? units : data.units;

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
                          onChange={handleSearch}
                        />
                        <CInputGroupAppend>
                          <CCol></CCol>
                          <CButton
                            color="primary"
                            onClick={() => setVisible(!visible)}
                          >
                            + New Units
                          </CButton>{" "}
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
                <CModalTitle>Set Up | Unit Setting</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <form>
                  <CRow>
                    <CCol xs="12" md="12">
                      <CCard>
                        <CCardHeader>UNIT MANAGEMENT</CCardHeader>
                        <CCardBody>
                          <CFormGroup row>
                            <CCol md="12">
                              <label
                                htmlFor="departmentId"
                                className="form-label"
                              >
                                Department
                              </label>
                              <select
                                id="departmentId"
                                className="form-control classic"
                                value={iUnit.department}
                                onChange={handleDepartmentChange}
                              >
                                <option value="">Department *</option>
                                {department.map((m) => (
                                  <option key={m._id} value={m._id} id={m._id}>
                                    {m.department}
                                  </option>
                                ))}
                              </select>
                              <label htmlFor="Unit" className="form-label">
                                Unit
                              </label>{" "}
                              <input
                                className="form-control"
                                type="text"
                                value={iUnit.unit}
                                placeholder="Unit"
                                onChange={handleUnitChange}
                              />
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
                <caption>Grades</caption>
                <thead className="thead-light">
                  <tr>
                    <th>Number</th>
                    <th>Unit</th>
                    <th>Department</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {dataTouse.map((s, index) => (
                    <tr key={s._id}>
                      <td>{index + 1}</td>
                      <td>{s.unit}</td>
                      <td>{s.department.department}</td>
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
              <p className="hou-p">Showing {dataTouse.length} Units...</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default UnitSetup;

//0243039436 - Bentum;
