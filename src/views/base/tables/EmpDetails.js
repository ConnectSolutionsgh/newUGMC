import React, { useState } from 'react';

 import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CModalFooter,
  CModalHeader,
  CModalBody,
  CModalTitle,
} from '@coreui/react';
//import { DocsLink } from 'src/reusable'

//import usersData from '../../users/UsersData'

import usersData from 'src/views/planning/UsersData';




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
  const fields = ['name','registered', 'role', 'status']
  const [visible, setVisible] = useState(false)
  return (
    <>
   
        <CRow>
        <CCol>
          <CCard>
            <CCardHeader>

  <>
    /<CButton onClick={()=> setVisible(!visible)}>Vertically centered modal</CButton>
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Modal title</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
  </>

  const [visible, setVisible] = useState(false)
return (
  <>
    <CButton onClick={() => setVisible(!visible)}>Launch demo modal</CButton>
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>Modal title</CModalTitle>
      </CModalHeader>
      <CModalBody>Woohoo, you're reading this text in a modal!</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
  </>
)


            </CCardHeader>
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
