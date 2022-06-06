import React, { useState, useEffect } from "react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import Joi from "joi-browser";
import Swal from "sweetalert2";
import moment from "moment";
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

const HolidaySetup = () => {
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
  const [holidays, setHolidays] = useState({
    holiday: "",
    hdate: new Date(),
    year: null,
  });
  const [iHolidays, setIHolidays] = useState([]);
  const [search, setSearch] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    async function getHolidays() {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/holidays/days/" +
          new Date().getFullYear()
      );
      setIHolidays(results.data);
    }
    getHolidays();
  }, [iHolidays]);

  const joiHolidaySchema = Joi.object().keys({
    holiday: Joi.string().required().label("Holiday"),
    hdate: Joi.date().required().label("date"),
    year: Joi.number().required().label("Year"),
  });

  const validateEntry = () => {
    const result = Joi.validate(holidays, joiHolidaySchema);
    if (result.error) {
      return result.error.details[0].message;
    } else {
      return null;
    }
  };

  const handleSubmit = async () => {
    validateEntry();
    setDisableButton(true);
    console.log(holidays);
    try {
      const results = await axios.post(
        "https://ugmcservice.herokuapp.com/api/holidays",
        holidays
      );

      if (results.status === 200) {
        Swal.fire("Success", "Holiday Setup Successfully", "success");
        setDisableButton(false);
      } else {
        Swal.fire("OOPS", "Holiday Setup Failed", "error");
        setDisableButton(false);
      }
    } catch (err) {
      Swal.fire("OOPS", "Holiday Setup Failed " + err, "error");
      setDisableButton(false);
    }

    setHolidays({ holiday: "", hdate: "", year: "" });
  };
  const handleEditClicked = (s) => {
    console.log(s);
  };
  const handleSearch = (e) => {
    setSearch(e.currentTarget.value);
  };

  const data = {
    holidays: iHolidays.filter((item) =>
      item.holiday.toLowerCase().includes(search.toLowerCase())
    ),
  };

  const dataTouse = search.length === 0 ? iHolidays : data.holidays;

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
                          <CCol>
                            <CButton color="primary">Search</CButton>
                          </CCol>
                          <CButton
                            color="primary"
                            onClick={() => setVisible(!visible)}
                          >
                            + New Holidays
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

            <CModal
              show={visible}
              onClose={() => setVisible(!visible)}
              color="primary"
              size="lg"
            >
              <CModalHeader closeButton>
                <CModalTitle>Setup | Holidays</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <form>
                  <CRow>
                    <CCol xs="12" md="12">
                      <CCard>
                        <CCardHeader>HOLIDAYS SETUP</CCardHeader>
                        <CCardBody>
                          <div className="row justify-content-center">
                            <div className="col-6">
                              <div className="form-group">
                                <label
                                  htmlFor="LeaveYear"
                                  className="form-label"
                                >
                                  Holiday
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  value={holidays.holiday}
                                  // placeholder="Year"
                                  onChange={(e) =>
                                    setHolidays({
                                      ...holidays,
                                      holiday: e.target.value,
                                    })
                                  }
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="date" className="form-label">
                                  Holiday Date
                                </label>{" "}
                                <input
                                  type="date"
                                  className="form-control myInput"
                                  value={holidays.hdate}
                                  onChange={(e) =>
                                    setHolidays({
                                      ...holidays,
                                      hdate: e.currentTarget.value,
                                    })
                                  }
                                />
                              </div>

                              <div className="form-group">
                                <label
                                  htmlFor="LeaveYear"
                                  className="form-label"
                                >
                                  Year
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  value={holidays.year}
                                  placeholder="2001"
                                  onChange={(e) =>
                                    setHolidays({
                                      ...holidays,
                                      year: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </form>
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={handleSubmit}>
                  Save
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
                <caption>Holidays</caption>
                <thead className="thead-light">
                  <tr>
                    <th>Number</th>
                    <th>Holiday</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {dataTouse.map((s, index) => (
                    <tr key={s._id}>
                      <td>{index + 1}</td>
                      <td>{s.holiday}</td>

                      <td>{moment(s.hdate).format("DD,MMMM,YYYY")}</td>
                      <td className="float-right">
                        <CButton
                          color="info"
                          size="sm"
                          onClick={(s) => handleEditClicked(s)}
                        >
                          Edit
                        </CButton>
                      </td>
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

export default HolidaySetup;
