import React, { useState, useEffect } from "react";
import CIcon from "@coreui/icons-react";
import Joi from "joi-browser";
import Swal from "sweetalert2";
import moment from "moment";
import DatePicker from "react-datepicker";
import axios from "axios";
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
  //CDropdownItem,
  CForm,
  //CCardFooter,
  // CDropdownToggle,
  //CInputRadio,
  // CDropdown,
  CModalTitle,
  //CFormText,
  //CTextarea,
  CFormGroup,
  CLabel,
  // CSwitch,
  CInput,
  //CInputFile,
  //CSelect,
  //CDropdownMenu,
  //CCardFooter,
  CInputGroup,
  //CForm,
} from "@coreui/react";
//import { DocsLink } from 'src/reusable'

//import usersData from './psm/users/usersData';

import usersData from "../users/UsersData";

const LeaveYear = () => {
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

  const [leaveYear, setLeaveYear] = useState({
    startDate: "",
    endDate: "",
    leaveYear: "",
  });
  const [isCurrent, setIsCurrent] = useState(true);
  const [disableButton, setDisableButton] = useState(false);
  const [iYears, setIyears] = useState([]);
  useEffect(() => {
    async function getCurrentLeaveYear() {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/leaveyear"
      );
      setIyears(results.data);
    }
    getCurrentLeaveYear();
    console.log(iYears);
  }, [iYears]);

  const joiUnitSchema = Joi.object().keys({
    unit: Joi.string().required().label("Unit"),
    department: Joi.string().required().label("Department"),
  });

  const handlCurrent = () => {
    setIsCurrent(!isCurrent);
  };

  const validateEntry = () => {
    const result = Joi.validate(leaveYear, joiUnitSchema);
    if (result.error) {
      return result.error.details[0].message;
    } else {
      return null;
    }
  };

  const handleSubmit = async () => {
    setDisableButton(true);
    const results = await axios.post(
      "https://ugmcservice.herokuapp.com/api/leaveyear",
      leaveYear
    );

    if (results.status === 200) {
      Swal.fire({
        title: "Success",
        text: "Leave Year Successfully Added",
        icon: "success",
      });
      setDisableButton(false);
    } else {
      Swal.fire({
        title: "OOPS",
        text: "Leave Year Failed",
        icon: "error",
      });
      setDisableButton(false);
    }
    setDisableButton(true);
    setLeaveYear({ endDate: "", startDate: "", leaveYear: "" });
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
                            + New Leave Year
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
                <CModalTitle>Setup | Year Leave</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <form>
                  <CRow>
                    <CCol xs="12" md="12">
                      <CCard>
                        <CCardHeader>LEAVE YEAR MANAGEMENT</CCardHeader>
                        <CCardBody>
                          <label htmlFor="LeaveYear" className="form-label">
                            Year
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            value={leaveYear.leaveYear}
                            // placeholder="Year"
                            onChange={(e) =>
                              setLeaveYear({
                                ...leaveYear,
                                leaveYear: e.target.value,
                              })
                            }
                          />

                          <div className="form-group">
                            <label htmlFor="Unit" className="form-label">
                              Start Date
                            </label>{" "}
                            <input
                              type="date"
                              className="form-control myInput"
                              dateFormat="dd-MMMM-yyyy"
                              value={leaveYear.startDate}
                              onChange={(e) =>
                                setLeaveYear({
                                  ...leaveYear,
                                  startDate: e.currentTarget.value,
                                })
                              }
                              placeholder="Start Date"
                            />
                            <p>
                              <div className="form-group">
                                <label htmlFor="Unit" className="form-label">
                                  End Date
                                </label>{" "}
                                <input
                                  type="date"
                                  placeholder="Start Date"
                                  className="form-control myInput"
                                  dateFormat="dd-MMMM-yyyy"
                                  value={leaveYear.endDate}
                                  onChange={(e) =>
                                    setLeaveYear({
                                      ...leaveYear,
                                      endDate: e.currentTarget.value,
                                    })
                                  }
                                />
                              </div>
                            </p>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </form>
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={handleSubmit}>
                  + Save
                </CButton>{" "}
                <CButton color="warning" onClick={() => setVisible(!visible)}>
                  Reset
                </CButton>{" "}
                <CButton color="danger" onClick={() => setVisible(!visible)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>

            <CCardBody>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <caption>Leave Year</caption>
                <thead className="thead-light">
                  <tr>
                    <th></th>

                    <th>Current Leave Year</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody className="">
                  {iYears.map((s, index) => (
                    <tr key={s._id}>
                      <td>{index + 1}</td>

                      <td>{s.leaveYear}</td>
                      <td>{moment(s.startDate).format("DD,MMMM,YYYY")}</td>
                      <td>{moment(s.endDate).format("DD,MMMM,YYYY")}</td>
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

export default LeaveYear;
