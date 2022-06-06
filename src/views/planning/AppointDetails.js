import React, { useState } from 'react';
import CIcon from '@coreui/icons-react'

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
 CInputFile,
//CSelect,
CDropdownMenu,
  //CCardFooter,
  CInputGroup,
  //CForm,
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
            

     
<div>

        <CModalHeader>

        <CCol>
               <CFormGroup>
                      <CLabel htmlFor="appendedInputButtons"></CLabel>
                      <div className="controls">
                        <CInputGroup>
                          <CInput id="appendedInputButtons" size="16" type="text" />
                          <CInputGroupAppend>
                            <CCol>
                            <CButton color="danger">Search</CButton>
                            </CCol>
                         
                            <CButton color="primary" onClick={() => setVisible(!visible)}>
                  + New Appointment
                </CButton>{' '}
                 
                <CButton color="success" onClick={() => setVisible(!visible)}>
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
              size='lg'
            >
              <CModalHeader closeButton>
                <CModalTitle>HR Planning | Appointment Management</CModalTitle>
              </CModalHeader>
              <CModalBody>
      <form>
               
      <CRow>         
      <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>APPOINTMENT DETAILS</CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" />  Find Employee</CButton>
                      </CInputGroupPrepend>
                      <CInput id="FindEmp" name="FindEmp" placeholder="Enter Number Here" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /> Find Employee</CButton>
                      </CInputGroupPrepend>
                      <CInput id="StaffNumber" name="StaffNumber" placeholder="Enter Name Here" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="AppType" id="AppType" name="AppType" placeholder="Appointment Type" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>One</CDropdownItem>
                          <CDropdownItem>Two</CDropdownItem>
                          <CDropdownItem>Three</CDropdownItem>
                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>


                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="AppType" id="AppType" name="AppType" placeholder="Salary Type" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Contrallor</CDropdownItem>
                          <CDropdownItem>IGF</CDropdownItem>
                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>


                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="1stApp" id="1stApp" name="1stApp" placeholder="Notional Effect" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>One</CDropdownItem>
                          <CDropdownItem>Two</CDropdownItem>
                          <CDropdownItem>Three</CDropdownItem>
                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="SubEffect" id="SubEffect" name="SubEffect" placeholder="Substantive Effect" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>One</CDropdownItem>
                          <CDropdownItem>Two</CDropdownItem>
                          <CDropdownItem>Three</CDropdownItem>
                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>


                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="1stGrade" id="1stGrade" name="1stGrade" placeholder="First Grade Appointment" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>One</CDropdownItem>
                          <CDropdownItem>Two</CDropdownItem>
                          <CDropdownItem>Three</CDropdownItem>
                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
 
                <CFormGroup row>
                  <CCol md="3">
                  <CButton type="button" color="danger">Upload</CButton>
                   </CCol>
                  <CCol xs="12" md="9">
                    <CInputFile 
                      id="file-multiple-input" 
                      name="file-multiple-input" 
                      multiple
                      custom
                    />
                    <CLabel htmlFor="file-multiple-input" variant="custom-file">
                      Appointment Data
                    </CLabel>
                  </CCol>
                </CFormGroup>


              </CForm>
            </CCardBody>
            
          </CCard>
        </CCol>
    
      
    <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>CURRENT APPOINTMENT DETAILS</CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">

              <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="1stApp" id="1stApp" name="1stApp" placeholder="Notional Effect" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>One</CDropdownItem>
                          <CDropdownItem>Two</CDropdownItem>
                          <CDropdownItem>Three</CDropdownItem>
                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

 

               <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="1stApp" id="1stApp" name="1stApp" placeholder="Substantive Effect" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>One</CDropdownItem>
                          <CDropdownItem>Two</CDropdownItem>
                          <CDropdownItem>Three</CDropdownItem>
                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="1stApp" id="1stApp" name="1stApp" placeholder="Next Grade" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>One</CDropdownItem>
                          <CDropdownItem>Two</CDropdownItem>
                          <CDropdownItem>Three</CDropdownItem>
                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="date" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="prof" name="prof" placeholder="Enter Proffession" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="Typeofchange" id="Typeofchange" name="Typeofchange" placeholder="Type Of Change" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>One</CDropdownItem>
                          <CDropdownItem>Two</CDropdownItem>
                          <CDropdownItem>Three</CDropdownItem>
                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="1stApp" id="1stApp" name="1stApp" placeholder="Job Title" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Dr.</CDropdownItem>
                          <CDropdownItem>|Rev</CDropdownItem>
                          <CDropdownItem>Mr</CDropdownItem>
                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="Speciality" id="Speciality" name="Speciality" placeholder="Speciality" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>One</CDropdownItem>
                          <CDropdownItem>Two</CDropdownItem>
                          <CDropdownItem>Three</CDropdownItem>
                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="date" id="nextyear" name="nextyear" placeholder="Next Promotion Year" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          NPY-Date
                        </CDropdownToggle>
                      
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

               
              </CForm>
            </CCardBody>
           
          </CCard>
        </CCol>
        

 
  
<CCol xs="12" md="6">
      <CCard>
        <CCardHeader> SALARY</CCardHeader>
        <CCardBody>
          <CForm action="" method="post" className="form-horizontal">
            <CFormGroup row>
              <CCol md="12">
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                  </CInputGroupPrepend>
                  <CInput id="Scale" name="Scale" placeholder="Scale" />
                </CInputGroup>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="12">
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                  </CInputGroupPrepend>
                  <CInput id="Band" name="Band" placeholder="Band" />
                </CInputGroup>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="Step" id="Step" name="Step" placeholder="Step" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>One</CDropdownItem>
                          <CDropdownItem>Two</CDropdownItem>
                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
              <CCol md="12">
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                  </CInputGroupPrepend>
                  <CInput id="Salary" name="Salary" placeholder="Salary" />
                </CInputGroup>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="SalarySrc" id="SalarySrc" name="SalarySrc" placeholder="Salary Sources" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>One</CDropdownItem>
                          <CDropdownItem>Two</CDropdownItem>
                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

           
          </CForm>
        </CCardBody>
        
      </CCard>
    </CCol>



    <CCol xs="12" md="6">
      <CCard>
        <CCardHeader>BANK DETAILS</CCardHeader>
        <CCardBody>
          <CForm action="" method="post" className="form-horizontal">
        
        
        
          <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="Bank" id="Bank" name="Bank" placeholder="Bank" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>SGG</CDropdownItem>
                          <CDropdownItem>GCB</CDropdownItem>
                          <CDropdownItem>CBG</CDropdownItem>
                          <CDropdownItem>ABSA</CDropdownItem>
                          <CDropdownItem>UNB</CDropdownItem>
                          <CDropdownItem>NIB</CDropdownItem>
                          <CDropdownItem>STANBIC</CDropdownItem>
                          <CDropdownItem>ECOBANK</CDropdownItem>
                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>


                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="Branch" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="Branch" name="Branch" placeholder="Branch" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>


                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="AccountType" id="AccountType" name="AccountType" placeholder="Account Type" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Savings</CDropdownItem>
                          <CDropdownItem>Current</CDropdownItem>
                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>


                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="AccNumber" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="AccNumer" name="AccNumber" placeholder="Account Number" />
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
                <CButton color="primary" onClick={() => setVisible(!visible)}>
                  Save
                </CButton>{' '}

                <CButton color="warning" onClick={() => setVisible(!visible)}>
                  Reset
                </CButton>{' '}
                <CButton color="danger" onClick={() => setVisible(!visible)}>
                  Close
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
