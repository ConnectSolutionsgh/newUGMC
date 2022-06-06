import React from 'react'
import {
 // CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  //CDataTable,
  CRow
} from '@coreui/react'
//import { DocsLink } from 'src/reusable'

//import usersData from '../../users/UsersData'

//import React from 'react'
import {
  CButton,
  //CCard,
 // CCardBody,
  CCardFooter,
 // CCardHeader,
 // CCol,
  //CCollapse,
  //CDropdownItem,
  //CDropdownMenu,
  //CDropdownToggle,
  //CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  //CTextarea,
  CInput,
  //CInputFile,
  //CInputCheckbox,
//  CInputRadio,
  //CInputGroup,
  //CInputGroupAppend,
  //CInputGroupPrepend,
  //CDropdown,
 // CInputGroupText,
  CLabel,
  //CSelect,
 // CRow,
  //CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
//import { DocsLink } from 'src/reusable'

const BasicForms = () => {
//  const [collapsed, setCollapsed] = React.useState(true)
 // const [showElements, setShowElements] = React.useState(true)

  return (
    <>
      <CRow>
        
        <CCol xs="12" sm="6">
         
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="6">
          
          <CCard>
            <CCardHeader>
              
            
              PSM OK
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="email" id="hf-email" name="hf-email" placeholder="Enter Email..." autoComplete="email" />
                    <CFormText className="help-block">Please enter your email</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-password">Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="hf-password" name="hf-password" placeholder="Enter Password..." autoComplete="current-password"/>
                    <CFormText className="help-block">Please enter your password</CFormText>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
          
     </CCol>

        <CCol xs="12" sm="6">
          <CCard>
            <CCardHeader>
              PSM Validation OK 
            </CCardHeader>
            <CCardBody>
              <CForm className="was-validated">
                <CFormGroup>
                  <CLabel htmlFor="inputSuccess2i">Non-required input</CLabel>
                  <CInput className="form-control-success" id="inputSuccess2i" />
                  <CValidFeedback>Non-required</CValidFeedback>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="inputWarning2i">Required input</CLabel>
                  <CInput className="form-control-warning" id="inputWarning2i" required />
                  <CInvalidFeedback className="help-block">
                    Please provide a valid information
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">Input provided</CValidFeedback>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


     
        
       
     
    </>
  )
}

export default BasicForms
