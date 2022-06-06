import React, { useState } from 'react';
// import CIcon from '@coreui/icons-react'

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
  CModalTitle,
  CFormText,
  //CTextarea,
  CFormGroup,
  CLabel,
  CSwitch,
  CInput,
  CInputFile,
  CSelect,
  //CCardFooter,
  CForm,
} from '@coreui/react'
//import { DocsLink } from 'src/reusable'

//import usersData from './psm/users/usersData';

import usersData from '../users/UsersData';


const Tables = () => {
  const getBadge = status => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }
  const fields = ['name','Phone Number','GH-ID','registered', 'role', 'status']
  const [visible, setVisible] = useState(false)
  return (
    <>
   
        <CRow>
        <CCol>
          <CCard>
            

         <div className="d-grid gap-12 d-md-flex justify-content-md-end align=right">
          <CModalFooter>
                <CButton color="primary" onClick={() => setVisible(!visible)}>
                  + Add Employee
                </CButton>{' '}
                
                <CButton color="danger" onClick={() => setVisible(!visible)}>
                  Export Report
                </CButton>
              </CModalFooter>

   </div>

  
            {/*<CButton color="success" onClick={() => setSuccess(!success)} className="mr-1">Success modal</CButton>
            <CButton color="warning" onClick={() => setWarning(!warning)} className="mr-1">Warning modal</CButton>
            <CButton color="danger" onClick={() => setDanger(!danger)} className="mr-1">Danger modal</CButton>
  <CButton color="info" onClick={() => setInfo(!info)} className="mr-1">Info modal</CButton>*/}

            <CModal 
              show={visible} 
              onClose={() => setVisible(!visible)}
              color="primary"  
              size='lg'
            >
              <CModalHeader closeButton>
                <CModalTitle>HR Planning | Employee Management</CModalTitle>
              </CModalHeader>
              <CModalBody>
      <form>
               
        <CCol xs="3" md="6">
          <CCard>
            <CCardHeader>
              ~              
 <small>  ADDING EMPLOYEE DETAILS</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">First Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="FirstName" id="FirstName" name="FirstName" placeholder="First Name" autoComplete="First Name"/>
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="FirstName" id="LastName" name="LastName" placeholder="Last Name" autoComplete="Last Name"/>
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="FirstName" id="LastName" name="LastName" placeholder="Last Name" autoComplete="Last Name"/>
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="FirstName" id="LastName" name="LastName" placeholder="Last Name" autoComplete="Last Name"/>
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="FirstName" id="LastName" name="LastName" placeholder="Last Name" autoComplete="Last Name"/>
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="FirstName" id="LastName" name="LastName" placeholder="Last Name" autoComplete="Last Name"/>
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="FirstName" id="LastName" name="LastName" placeholder="Last Name" autoComplete="Last Name"/>
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="FirstName" id="LastName" name="LastName" placeholder="Last Name" autoComplete="Last Name"/>
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="FirstName" id="LastName" name="LastName" placeholder="Last Name" autoComplete="Last Name"/>
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="FirstName" id="LastName" name="LastName" placeholder="Last Name" autoComplete="Last Name"/>
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="FirstName" id="LastName" name="LastName" placeholder="Last Name" autoComplete="Last Name"/>
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Text Input</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" placeholder="Text" />
                   </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Email Input</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email"/>
                   </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                   </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Date Input</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" id="date-input" name="date-input" placeholder="date" />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  
                </CFormGroup>
              
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="selectLg">Select Large</CLabel>
                  </CCol>
                  <CCol xs="12" md="9" size="lg">
                    <CSelect custom size="lg" name="selectLg" id="selectLg">
                      <option value="0">Please select</option>
                      <option value="1">Pharmacist</option>
                      <option value="2">Medical Doctor</option>
                      <option value="3">Surgeon </option>
                      <option value="4">IT</option>
                      <option value="5">Admin Manager</option>
                      <option value="6">HR Practioner</option>

                    </CSelect>
                  </CCol>
                </CFormGroup>
               
                <CFormGroup row>
                  <CCol tag="label" sm="3" className="col-form-label">
                    Switch checkboxes
                  </CCol>
                  <CCol sm="9">
                    <CSwitch
                      className="mr-1"
                      color="primary"
                      defaultChecked
                    />
                    <CSwitch
                      className="mr-1"
                      color="success"
                      defaultChecked
                      variant="outline"
                    />
                    <CSwitch
                      className="mr-1"
                      color="warning"
                      defaultChecked
                      variant="opposite"
                    />
                    <CSwitch
                      className="mr-1"
                      color="danger"
                      defaultChecked
                      shape="pill"
                    />
                    <CSwitch
                      className="mr-1"
                      color="info"
                      defaultChecked
                      shape="pill"
                      variant="outline"
                    />
                    <CSwitch
                      className="mr-1"
                      color="dark"
                      defaultChecked
                      shape="pill"
                      variant="opposite"
                    />
                  </CCol>
                </CFormGroup>
               
                <CFormGroup row>
                  <CLabel col md="3" htmlFor="file-input">File input</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile id="file-input" name="file-input"/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Multiple File input</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInputFile 
                      id="file-multiple-input" 
                      name="file-multiple-input" 
                      multiple
                      custom
                    />
                    <CLabel htmlFor="file-multiple-input" variant="custom-file">
                      Choose Files...
                    </CLabel>
                  </CCol>
                </CFormGroup>
               
                <CFormGroup row>
                  <CLabel col md={3}>Custom file input</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile custom id="custom-file-input"/>
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                      Choose file...
                    </CLabel>
                  </CCol>
                </CFormGroup>

              </CForm>
            </CCardBody>
           
          </CCard>
             
        </CCol>
        

    </form>
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={() => setVisible(!visible)}>
                  Add Staff
                </CButton>{' '}
                <CButton color="danger" onClick={() => setVisible(!visible)}>
                  Cancel
                </CButton>
              </CModalFooter>
            </CModal>

 
           
          
            <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              dark
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={20}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Tables
