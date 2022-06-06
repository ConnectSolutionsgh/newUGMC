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
  const fields = ['Employee Number','Employee Name','Unit','Sub-Unit','Department','Sub-BMC','Location', 'Posting Date','Assumption Date', 'Posting Type','Period', 'Reasons','status']
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
                   <CInputGroupAppend>
                
               <CCol md="12">
                    <CInputGroup>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /> Search</CButton>
                      <CInput id="input1-group2" name="input1-group2" placeholder="Username" />
                    </CInputGroup>
                </CCol>
                  <CCol>
                    
                    <CButton color="primary" onClick={() => setVisible(!visible)}> + New Posting </CButton>{' '}
                     <CButton color="success" onClick={() => setVisible(!visible)}>  Export Report  </CButton>
                     </CCol>
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
                <CModalTitle>HR Planning | Posting Management</CModalTitle>
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
                      <CInput type="AppType" id="AppType" name="AppType" placeholder="Directorate" />
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
                      <CInput type="AppType" id="AppType" name="AppType" placeholder="Department" />
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
                      <CInput type="1stApp" id="1stApp" name="1stApp" placeholder="Units" />
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
                      <CInput type="SubEffect" id="SubEffect" name="SubEffect" placeholder="Sub-Unit" />
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
                      Current Post Data
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
                      <CInput type="date" id="nextyear" name="nextyear" placeholder="Next Promotion Year" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Posting-Date
                        </CDropdownToggle>
                      
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
                          Assumption-Date
                        </CDropdownToggle>
                      
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="1stApp" id="1stApp" name="1stApp" placeholder="Posting Type" />
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
                      <CInput type="1stApp" id="1stApp" name="1stApp" placeholder="Period" />
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
                      <CInput id="prof" name="prof" placeholder="Reasons For Posting" />
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
