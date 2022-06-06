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
  CInputRadio,
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
                    <CButton color="primary">Search</CButton>
                    </CCol>
                 
                    <CButton color="primary" onClick={() => setVisible(!visible)}>
          + Add Employee
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
                <CModalTitle>HR Planning | Employee Management</CModalTitle>
              </CModalHeader>
              <CModalBody>
      <form>
      <CRow>         
      <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>IDENTIFICATION NUMBER</CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="FileNumber" name="FileNumber" placeholder="File Number" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="StaffNumber" name="StaffNumber" placeholder="Staff Number" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="NatID" name="NatID" placeholder="National ID" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="EmpNumber" name="EmpNumber" placeholder="Employee Number" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="SsnitID" name="SsnitID" placeholder="SSNIT ID" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>


                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="email" id="input2-group3" name="input2-group3" placeholder="Title" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Dr.</CDropdownItem>
                          <CDropdownItem>Rev.</CDropdownItem>
                          <CDropdownItem>Mr.</CDropdownItem>
                          <CDropdownItem>Mrs.</CDropdownItem>

                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="7">
                    <CLabel>Please, Any Disability? </CLabel>
                  </CCol>
                  
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">No</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio2" name="inline-radios" value="option2" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Yes</CLabel>
                    </CFormGroup>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                  <CButton type="button" color="primary">Upload</CButton>
                   </CCol>
                  <CCol xs="12" md="9">
                    <CInputFile 
                      id="file-multiple-input" 
                      name="file-multiple-input" 
                      multiple
                      custom
                    />
                    <CLabel htmlFor="file-multiple-input" variant="custom-file">
                      Staff Image
                    </CLabel>
                  </CCol>
                </CFormGroup>


              </CForm>
            </CCardBody>
            
          </CCard>
        </CCol>
    
      
    <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>PERSONAL DETAILS</CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="Surname" name="Surname" placeholder="Surname" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="FIrstName" name="FirstName" placeholder="First Name" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="HomeTown" name="HomeTown" placeholder="Other Name" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="button" id="Gender" name="Gender" placeholder="Gender" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Male</CDropdownItem>
                          <CDropdownItem>Female</CDropdownItem>
                        
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
                      <CInput id="Dob" name="Dob" placeholder="Date Of Birth" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="Birthplace" name="Birthplace" placeholder="Place Of Birth" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="HomeTown" name="HomeTown" placeholder="Home Town" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="Nationality" name="Nationality" placeholder="Nationality" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="email" id="Regionn" name="Region" placeholder="Region" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Greater Accra</CDropdownItem>
                          <CDropdownItem>Central Region</CDropdownItem>
                          <CDropdownItem>Ashanti Region</CDropdownItem>
                          <CDropdownItem>Western  Region</CDropdownItem>

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
        <CCardHeader> CONTACT DETAILS</CCardHeader>
        <CCardBody>
          <CForm action="" method="post" className="form-horizontal">
            <CFormGroup row>
              <CCol md="12">
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                  </CInputGroupPrepend>
                  <CInput id="posAddress" name="posAddress" placeholder="Postal Address" />
                </CInputGroup>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="email" id="Regionn" name="Region" placeholder="Region" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Greater Accra</CDropdownItem>
                          <CDropdownItem>Central Region</CDropdownItem>
                          <CDropdownItem>Ashanti Region</CDropdownItem>
                          <CDropdownItem>Western  Region</CDropdownItem>

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
                  <CInput id="PhoneNum" name="PhoneNum" placeholder="Phone Number" />
                </CInputGroup>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="12">
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                  </CInputGroupPrepend>
                  <CInput id="Email" name="Email" placeholder="Email Address" />
                </CInputGroup>
              </CCol>
            </CFormGroup>
           
          </CForm>
        </CCardBody>
        
      </CCard>
    </CCol>



    <CCol xs="12" md="6">
      <CCard>
        <CCardHeader>BASIC QUALIFICATION </CCardHeader>
        <CCardBody>
          <CForm action="" method="post" className="form-horizontal">
          <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="button" id="Qualificationn" name="Qualification" placeholder="Baisc  Qualification" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Phd</CDropdownItem>
                          <CDropdownItem>Msc</CDropdownItem>
                          <CDropdownItem>PGDip</CDropdownItem>
                          <CDropdownItem>Bsc</CDropdownItem>
                          <CDropdownItem>HND</CDropdownItem>
                          <CDropdownItem>Diploma</CDropdownItem>
                          <CDropdownItem>Certificate</CDropdownItem>

                          </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="button" id="Inst" name="Inst" placeholder="Institution" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>LEGON</CDropdownItem>
                          <CDropdownItem>GIMPA</CDropdownItem>
                          <CDropdownItem>UCC</CDropdownItem>
                          <CDropdownItem>KNUST</CDropdownItem>
                          <CDropdownItem>GTUC</CDropdownItem>
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
                      <CInput id="YearAcq" name="YearAcq" placeholder="Year Acquired" />
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
                <CButton color="success" size="sm" onClick={() => setVisible(!visible)}>
                  Add Staff
                </CButton>{' '}
                <CButton color="warning" size="sm" onClick={() => setVisible(!visible)}>
                  Reset
                </CButton>
                <CButton color="danger" size="sm" onClick={() => setVisible(!visible)}>
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
