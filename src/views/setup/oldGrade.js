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
 //CInputFile,
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
          + New Grade
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
                <CModalTitle>Setups | Grade Settings</CModalTitle>
              </CModalHeader>
              <CModalBody>
      <form>
      <CRow>         
      <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>GRADE MANAGEMENT</CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="FileNumber" name="FileNumber" placeholder="Grade" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>

                
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="email" id="input2-group3" name="input2-group3" placeholder="Levels" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Dir 1</CDropdownItem>
                          <CDropdownItem>Dir 2</CDropdownItem>
                          <CDropdownItem>Dir 3</CDropdownItem>
  
                          </CDropdownMenu>
                      </CDropdown>
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
                  Add
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
