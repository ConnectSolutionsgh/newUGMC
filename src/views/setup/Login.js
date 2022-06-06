import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import auth from "../../components/services/authService";
import Joi from "joi-browser";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let history = useHistory();

  const schemaMap = {
    email: Joi.string().required().label("Email Field"),
    password: Joi.string().required().label("Password Field"),
  };

  const schema = Joi.object(schemaMap);

  const validateForm = () => {
    const result = Joi.validate(formData, schema);
    if (result.error) {
      return result.error.details[0].message;
    } else {
      return null;
    }
    //toast.error(result.error.details[0].message);
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      const { email, password } = formData;
      const validate = validateForm();
      if (validate !== null) {
        return Swal.fire("Validation Error", validate, "error");
      }
      await auth.login(email, password);
      history.push("/home");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        return Swal.fire("Supervisor Assigned", ex.response.data, "error");
      }
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account- Adabo</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.currentTarget.value,
                          })
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.currentTarget.value,
                          })
                        }
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleSubmit}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      If You Encounter Any Challengies, Kindly Contact The
                      System Administrator
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
