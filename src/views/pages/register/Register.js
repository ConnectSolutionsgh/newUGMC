import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from "react-router-dom";
import axios from "axios";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Swal from "sweetalert2";


const Register = () => {
  const [userRegister, setUserRegister] = useState({
    staffId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let history = useHistory();
  const [search, setSearch] = useState("");
  const dateOfAppointmentRef = useRef();
  const [departments, setDepartment] = useState([]);
  const [grade, setGrade] = useState([]);
  const [unit, setUnit] = useState([]);
  const [deptId, setDeptId] = useState("");
  const [appDate, setAppDate] = useState(new Date());
  const [password, setPassword] = useState("");

  const joiUserSchema = Joi.object().keys({
    staffId: Joi.string().required().label("Staff ID"),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["ugmc.ug.edu.gh"] },
    }),
    password: Joi.string().required().label("Password"),
    confirmPassword: Joi.string().required().label("confirm Password"),

  });

  const validateForm = () => {
    const result = Joi.validate(userRegister, joiUserSchema);
    if (result.error) {
      return result.error.details[0].message;
    } else {
      genPassword();
      return null;
    }
    // console.log(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userRegister);

    if (userRegister.password !== userRegister.confirmPassword) {
      return Swal.fire("Password Confirmation",
        "Password Confirmation Failed"
        , "info"
      );
    }
    const validate = validateForm();

    if (validate === null) {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/stafflist/" +
        userRegister.staffId.toUpperCase() +
        "/" +
        userRegister.email
      );

      if (results.data.length > 0) {
        try {
          await axios.post("https://ugmcservice.herokuapp.com/api/users", {
            staffId: userRegister.staffId.toUpperCase(),
            email: userRegister.email,
            fullName: results.data[0].fullName,
            password: userRegister.password,
            confirmPassword: userRegister.confirmPassword,
            grade: results.data[0].grade,
            isAdmin: false,
            isHeadOfUnit: false,
            isHeadOfDepartment: false,
            isSupervisor: false,
          });
          setUserRegister({ staffId: "", email: "", password: "", confirmPassword: "" });
          Swal.fire("Success",
            "Registration successful"
            , "success"
          );
          return history.replace("/");
        } catch (ex) {
          return Swal.fire("OOPS",
            "Registration NOT successful. Account may already exists !"
            , "error"
          );
        }
      } else {
        return Swal.fire("OOPS",
          "Staff details NOT found, Please check and try again or contact HR Department"
          , "error"
        );
      }
    } else {
      return Swal.fire("OOPS", validate, "info");
    }

  };

  useEffect(() => {
    async function getDepartmentsInHooks() {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/departments"
      );
      setDepartment(results.data);
    }
    getDepartmentsInHooks();
  }, []);

  useEffect(() => {
    async function getGradesInHooks() {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/grades"
      );
      setGrade(results.data);
    }
    getGradesInHooks();
  }, []);

  async function handleDepartmentChange(e) {
    const department = e.target.value;
    const results = await axios.get(
      "https://ugmcservice.herokuapp.com/api/units/" + department
    );
    setUnit(results.data);
  }

  const handleAppDate = (sdate) => {
    let dateSelected = new Date(sdate);
    setAppDate(dateSelected);
    setUserRegister({
      ...userRegister,
      dateOfAppointment: dateSelected,
    });
  };

  const data = {
    grades: grade.filter(
      (item) =>
        item.grade.toLowerCase().includes(search.toLowerCase()) ||
        item.grade.includes(search.toLowerCase())
    ),
  };

  const dataTouse = search.length === 0 ? grade : data.grades;

  function genPassword() {
    let chars = "123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ";
    let passwordLength = 8;
    let tempPassword = "";
    for (let i = 0; i <= passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      tempPassword += chars.substring(randomNumber, randomNumber + 1);
    }
    setPassword(tempPassword);
  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Staff ID" autoComplete="staffid" value={userRegister.staffId}
                      onChange={(e) =>
                        setUserRegister({
                          ...userRegister,
                          staffId: e.currentTarget.value,
                        })
                      } />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Email" autoComplete="email" value={userRegister.email}
                      onChange={(e) =>
                        setUserRegister({
                          ...userRegister,
                          email: e.currentTarget.value,
                        })
                      } />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="new-password" value={userRegister.password}
                      onChange={(e) =>
                        setUserRegister({
                          ...userRegister,
                          password: e.currentTarget.value,
                        })
                      } />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Repeat password" autoComplete="new-password" value={userRegister.confirmPassword}
                      onChange={(e) =>
                        setUserRegister({
                          ...userRegister,
                          confirmPassword: e.currentTarget.value,
                        })
                      } />
                  </CInputGroup>
                  <CButton color="success" block onClick={handleSubmit}>Create Account</CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  {/*<CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
  </CCol>*/}
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
