import CIcon from "@coreui/icons-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi-browser";
import Swal from "sweetalert2";
//import NavHeader from "../../components/navHeader";
//import { toast } from "react-toastify";

import {
  //CBadge,
  CCard,
  CCardBody,
  //CCardHeader,
  CCol,
  //CDataTable,
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

//import usersData from '../users/UsersData';

const GradeSetup = () => {
  const [gradeData, setGradeData] = useState([]);

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

  //{id: 0, name: 'John Doe', registered: '2018/01/01', role: 'Guest', status: 'Pending', ok: 'Pending'}
  const fields = ["_id", "Grade", "Action"];
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  const [grades, setGrades] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    async function getGrades() {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/grades"
      );
      setGrades(results.data);
    }
    getGrades();
  }, [grades]);

  const [grade, setGrade] = useState("");
  const [level, setLevel] = useState("");
  const [days, setDays] = useState("");

  const joiGradeSchema = Joi.object().keys({
    grade: Joi.string().required().label("Grade"),
    level: Joi.string().required().label("Level"),
    days: Joi.number().label("Days"),
  });

  const validateEntry = () => {
    const result = Joi.validate({ grade, level }, joiGradeSchema);
    if (result.error) {
      return result.error.details[0].message;
    } else {
      return null;
    }
  };

  const handleLevelChange = (e) => {
    setLevel(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    const Ldays =
      level === "Management"
        ? 42
        : level === "Senior"
        ? 36
        : level === "Middle"
        ? 28
        : 21;

    const validate = validateEntry();
    if (validate === null) {
      try {
        setDisableButton(true);
        const results = await axios.post(
          "https://ugmcservice.herokuapp.com/api/grades",
          { grade: grade, level: level, days: Ldays }
        );

        if (results.status === 200) {
          Swal.fire({
            title: "Success",
            text: "Grade Successfully Added",
            icon: "success",
          });
          setVisible(false);
        } else {
          Swal.fire({ title: "Oops!", text: "Grade Failed", icon: "danger" });
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          return Swal.fire({
            title: "Oops!",
            text: err.response.data,
            icon: "danger",
          });

          //toast.error(err.response.data);
        }
      }
    } else {
      Swal.fire("Validation Error", validate, "error");
    }
    setGrade("");
    setLevel("");
    setDays("");
    setDisableButton(false);
  };
  const handleSearch = (e) => {
    setSearch(e.currentTarget.value);
  };
  const handleEditClicked = (s) => {
    console.log(s);
  };

  const data = {
    grades: grades.filter((item) =>
      item.grade.toLowerCase().includes(search.toLowerCase())
    ),
  };

  const dataTouse = search.length === 0 ? grades : data.grades;

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
                            + New Grade
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
                <CModalTitle>System Setup | Grade </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <form>
                  <CRow>
                    <CCol xs="12" md="12">
                      <CCard>
                        <CCardHeader>GRADE MANAGEMENT</CCardHeader>
                        <CCardBody>
                          <CForm
                            action=""
                            method="post"
                            className="form-horizontal"
                          >
                            <CFormGroup row>
                              <CCol md="12">
                                <CInputGroup>
                                  <CInputGroupPrepend>
                                    <CButton type="InsName" color="primary">
                                      <CIcon name="cil-magnifying-glass" />
                                    </CButton>
                                  </CInputGroupPrepend>
                                  <CInput
                                    id="Grade"
                                    name="Grade"
                                    placeholder="Grade Name"
                                    value={grade}
                                    onChange={(e) =>
                                      setGrade(e.currentTarget.value)
                                    }
                                  />
                                </CInputGroup>
                              </CCol>
                              <CCol md="12" className="mt-3">
                                <CInputGroup>
                                  <select
                                    name="Levels"
                                    id="Levels"
                                    className="form-control col-6 mt-3"
                                    value={level}
                                    onChange={handleLevelChange}
                                  >
                                    <option value="">--Select Level--</option>
                                    <option value="Management">
                                      Management
                                    </option>
                                    <option value="Senior">Senior</option>
                                    <option value="Middle">Middle</option>
                                    <option value="Junior">Junior</option>
                                  </select>
                                </CInputGroup>
                              </CCol>
                            </CFormGroup>
                          </CForm>
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
              {/* <CDataTable
              items={dataTouse}
              fields={fields}
              dark
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={20}
              pagination
              scopedSlots = {{
                'Action':
                  (item)=>(
               
                      
                    <td>
                      <tr>
                      <CButton color="info" size="sm" onClick={(s)=>handleEditClicked(s)}>
                  Edit
                </CButton>


<CButton color="danger" size="sm" onClick={() => setVisible(!visible)}>
Cancel
</CButton>

<CButton color="primary" size="sm" onClick={() => setVisible(!visible)}>
Cancel
</CButton>
</tr>

</td>


                
                    
                  )
              }}
            />*/}

              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <caption>Grades</caption>
                <thead className="thead-light">
                  <tr>
                    <th>Number</th>
                    <th>Grade</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {dataTouse.map((s, index) => (
                    <tr key={s._id}>
                      <td>{index + 1}</td>
                      <td>{s.grade}</td>

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
              <p className="hou-p">Showing {grades.length} Grades...</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default GradeSetup;
