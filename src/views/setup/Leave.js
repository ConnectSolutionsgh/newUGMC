import CIcon from "@coreui/icons-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi-browser";
import Swal from "sweetalert2";
//import NavHeader from "../../components/navHeader";
//import { toast } from "react-toastify";

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

const LeaveSetup = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [leaveSetup, setLeaveSetup] = useState({
    id: "",
    leave: "",
  });

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
  const fields = ["_id", "leave", "Action"];
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  const [leave, setLeave] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [allLeaves, setAllLeaves] = useState({});

  useEffect(() => {
    async function getLeaves() {
      const results = await axios.get(
        "https://ugmcservice.herokuapp.com/api/leaves"
      );
      setLeaveData(results.data);

      //setLeaveData(
    }
    getLeaves();
  }, [leaveData]);

  const joiLeaveSchema = Joi.object().keys({
    leave: Joi.string().required().label("Department"),
  });

  const validateEntry = () => {
    const result = Joi.validate(leave, joiLeaveSchema);
    if (result.error) {
      return result.error.details[0].message;
    } else {
      return null;
    }
  };

  const handleLeaveChange = (e) => {
    setLeave(e.target.value);
  };

  const handleSubmit = async () => {
    const results = await axios.post(
      "https://ugmcservice.herokuapp.com/api/leaves",
      { leave: leave }
    );

    if (results.status === 200) {
      Swal.fire({
        title: "Succss",
        text: "Leave Successfully Added",
        icon: "success",
      });
      setVisible(false);
    } else {
      Swal.fire({ title: "Oops!", text: "Leave Failed", icon: "danger" });
    }
    setLeave("");
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const data = {
    leaves: leaveData.filter((item) =>
      item.leave.toLowerCase().includes(search.toLowerCase())
    ),
  };

  const dataTouse = search.length === 0 ? leaveData : data.leaves;

  const handleEditClicked = (s) => {
    setLeave(s.leave);
    setLeaveSetup({ ...leaveSetup, id: s._id });
    setVisible(!visible);
  };

  const handleUpdateLeave = async () => {
    const results = await axios.put(
      "https://ugmcservice.herokuapp.com/api/leaves",
      leaveSetup.id,
      { leave: leave }
    );

    if (results.status === 200) {
      Swal.fire({
        title: "Success",
        text: "Leave Successfully Updated",
        icon: "success",
      });
      setVisible(false);
    } else {
      Swal.fire({
        title: "Oops!",
        text: "Leave Update Failed",
        icon: "danger",
      });
    }
    setLeave("");
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
                            + New Leave
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
                <CModalTitle>System Setup | Leave </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <form>
                  <CRow>
                    <CCol xs="12" md="12">
                      <CCard>
                        <CCardHeader>LEAVE MANAGEMENT</CCardHeader>
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
                                    id="LeaveName"
                                    name="LeaveName"
                                    placeholder="Leave Name"
                                    value={leave}
                                    onChange={handleLeaveChange}
                                  />
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
                <CButton color="info" size="sm" onClick={handleUpdateLeave}>
                  Update
                </CButton>{" "}
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
                <caption>Unapproved Schedules</caption>
                <thead className="thead-light">
                  <tr>
                    <th>Line Number</th>
                    <th>Leave</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {dataTouse.map((s, index) => (
                    <tr key={s._id}>
                      <td>{index + 1}</td>
                      <td>{s.leave}</td>

                      <td className="float-right">
                        <CButton
                          color="info"
                          size="sm"
                          onClick={() => handleEditClicked(s)}
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
              <p className="hou-p">Showing {dataTouse.length} Leaves...</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default LeaveSetup;
