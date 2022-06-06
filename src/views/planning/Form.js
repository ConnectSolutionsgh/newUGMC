import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
 // CCollapse,
  //CDropdownItem,
 // CDropdownMenu,
 // CDropdownToggle,
 // CFade,
  CForm,
  CFormGroup,
  CFormText,
 // CValidFeedback,
 // CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  //CInputCheckbox,
  //CInputRadio,
  //CInputGroup,
  //CInputGroupAppend,
 // CInputGroupPrepend,
 // CDropdown,
 // CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
//import { DocsLink } from 'src/reusable'

const BasicForms = () => {
 // const [collapsed, setCollapsed] = React.useState(true)
  //const [showElements, setShowElements] = React.useState(true)

  return (
    <>
    
   
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Basic Form
              <small> Elements</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Static</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <p className="form-control-static">Username</p>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Text Input</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" placeholder="Text" />
                    <CFormText>This is a help text</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Email Input</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email"/>
                    <CFormText className="help-block">Please enter your email</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                    <CFormText className="help-block">Please enter a complex password</CFormText>
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
                    <CLabel htmlFor="textarea-input">Textarea</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea 
                      name="textarea-input" 
                      id="textarea-input" 
                      rows="10"
                      placeholder="Content..." 
                    />
                  </CCol>
                </CFormGroup>
               
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="selectLg">Select Large</CLabel>
                  </CCol>
                  <CCol xs="12" md="9" size="lg">
                    <CSelect custom size="lg" name="selectLg" id="selectLg">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
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
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
             
        </CCol>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Horizontal
              <small> Form</small>
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
          <CCard>
            <CCardHeader>
              Normal
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Email</CLabel>
                  <CInput type="email" id="nf-email" name="nf-email" placeholder="Enter Email.." autoComplete="email"/>
                  <CFormText className="help-block">Please enter your email</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Password</CLabel>
                  <CInput type="password" id="nf-password" name="nf-password" placeholder="Enter Password.." autoComplete="current-password"/>
                  <CFormText className="help-block">Please enter your password</CFormText>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
           
          <CCard>
            <CCardHeader>
              Input
              <small> Sizes</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CLabel sm="5" col="sm" htmlFor="input-small">Small Input</CLabel>
                  <CCol sm="6">
                    <CInput size="sm" type="text" id="input-small" name="input-small" className="input-sm" placeholder=".form-control-sm" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CLabel sm="5" col htmlFor="input-normal">Normal Input</CLabel>
                  <CCol sm="6">
                    <CInput id="input-normal" name="input-normal" placeholder="Normal" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CLabel sm="5" col="lg" htmlFor="input-large">Large Input</CLabel>
                  <CCol sm="6">
                    <CInput size="lg" type="text" id="input-large" name="input-large" className="input-lg" placeholder=".form-control-lg" />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
       
     
     
         
       
    </>
  )
}

export default BasicForms
