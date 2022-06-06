import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  //CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  //CFade,
  CForm,
  CFormGroup,
  //CFormText,
  //CValidFeedback,
  //CInvalidFeedback,
  //CTextarea,
  CInput,
 // CInputFile,
 // CInputCheckbox,
 // CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  //CLabel,
 // CSelect,
  CRow,
 // CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
//import { DocsLink } from 'src/reusable'

const BasicForms = () => {
  //const [collapsed, setCollapsed] = React.useState(true)
 // const [showElements, setShowElements] = React.useState(true)

  return (
    <>
    
      
    
      
      <CRow>
        <CCol xs="12" md="4">
          <CCard>
            <CCardHeader>
              File Upload
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput id="input1-group1" name="input1-group1" placeholder="Username" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="email" id="input2-group1" name="input2-group1" placeholder="Email" />
                      <CInputGroupAppend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-euro" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput id="input3-group1" name="input3-group1" placeholder=".." />
                      <CInputGroupAppend>
                        <CInputGroupText>.00</CInputGroupText>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs="12" md="4">
          <CCard>
            <CCardHeader>
File Download            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /> Search</CButton>
                      </CInputGroupPrepend>
                      <CInput id="input1-group2" name="input1-group2" placeholder="Username" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="email" id="input2-group2" name="input2-group2" placeholder="Email" />
                      <CInputGroupAppend>
                        <CButton type="button" color="primary">Submit</CButton>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cib-facebook" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="input3-group2" name="input3-group2" placeholder="Search" />
                      <CInputGroupAppend>
                        <CButton type="button" color="primary"><CIcon name="cib-twitter" /></CButton>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs="12" md="4">
          <CCard>
            <CCardHeader>
Backup & Restoration            </CCardHeader>
            <CCardBody>
              <CForm className="form-horizontal">
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CDropdown className="input-group-prepend">
                          <CDropdownToggle caret color="primary">
                            Dropdown
                          </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Action</CDropdownItem>
                          <CDropdownItem>Another Action</CDropdownItem>
                          <CDropdownItem>Something else here</CDropdownItem>
                          <CDropdownItem divider />
                          <CDropdownItem>Separated link</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                      <CInput id="input1-group3" name="input1-group3" placeholder="Username" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="email" id="input2-group3" name="input2-group3" placeholder="Email" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Dropdown
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Action</CDropdownItem>
                          <CDropdownItem>Another Action</CDropdownItem>
                          <CDropdownItem>Something else here</CDropdownItem>
                          <CDropdownItem divider />
                          <CDropdownItem>Separated link</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CDropdown className="input-group-prepend">
                        <CDropdownToggle color="primary">Action</CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Action</CDropdownItem>
                          <CDropdownItem>Another Action</CDropdownItem>
                          <CDropdownItem>Something else here</CDropdownItem>
                          <CDropdownItem divider />
                          <CDropdownItem>Separated link</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                      <CInput id="input3-group3" name="input3-group3" placeholder=".." />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle caret color="primary">
                          Dropdown
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Action</CDropdownItem>
                          <CDropdownItem>Another Action</CDropdownItem>
                          <CDropdownItem>Something else here</CDropdownItem>
                          <CDropdownItem divider />
                          <CDropdownItem>Separated link</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default BasicForms
