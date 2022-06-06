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
  //CDropdownItem,
  CForm,
  //CCardFooter,
  //CDropdownToggle,
  //CInputRadio,
  //CDropdown,
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

const DepartmentSetup = () => {
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

  const [directorate, setDirectorate] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [allDirectorates, setAllDirectorates] = useState([]);
  const [search, setSearch] = useState("");
  const joiDirectorateSchema = Joi.object().keys({
    directorate: Joi.string().required().label("Directorate"),
  });

  const validateEntry = () => {
    const result = Joi.validate(directorate, joiDirectorateSchema);
    if (result.error) {
      return result.error.details[0].message;
    } else {
      return null;
    }
  };

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
    setDirectorate(e.target.value);
  };

  const handleSubmit = async () => {
    setDisableButton(true);
    console.log(directorate);
    const results = await axios.post(
      "https://ugmcservice.herokuapp.com/api/directorates",
      { directorate }
    );

    if (results.status === 200) {
      Swal.fire({
        title: "Success",
        text: "Directorate Successfully Added",
        icon: "success",
      });
      setDisableButton(false);
    } else {
      Swal.fire({
        title: "OOPS",
        text: "Directorate Setup Failed",
        icon: "error",
      });
      setDisableButton(false);
    }
    setDirectorate("");
  };

  const handleSearch = (e) => {
    setSearch(e.currentTarget.value);
  };
  const handleEditClicked = (s) => {
    console.log(s);
  };

  const data = {
    directorates: allDirectorates.filter((item) =>
      item.directorate.toLowerCase().includes(search.toLowerCase())
    ),
  };

  const dataTouse = search.length === 0 ? allDirectorates : data.directorates;
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
                            + New Directorate
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
                <CModalTitle>Administration | Directorate Setup</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <form>
                  <CRow>
                    <CCol xs="12" md="12">
                      <CCard>
                        <CCardHeader>DIRECTORATE SETUP</CCardHeader>
                        <CCardBody>
                          <label htmlFor="Department" className="form-label">
                            Directorate
                          </label>{" "}
                          <input
                            className="form-control"
                            type="text"
                            value={directorate}
                            placeholder="Directorate"
                            onChange={handleDirectorateChange}
                          />
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
                <caption>Directorate</caption>
                <thead className="thead-light">
                  <tr>
                    <th></th>

                    <th>Directorate</th>
                  </tr>
                </thead>
                <tbody className="">
                  {dataTouse.map((s, index) => (
                    <tr key={s._id}>
                      <td>{index + 1}</td>
                      <td>{s.directorate}</td>
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

export default DepartmentSetup;
