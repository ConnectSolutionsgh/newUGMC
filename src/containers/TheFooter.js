import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="kbth.gov.gh" target="_blank" rel="noopener noreferrer">UGMC | UNIVERSITY OF GHANA, MEDICAL CENTER</a>
        <span className="ml-1">&copy; 2020 - 2022</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">PWD | </span>
        <a href="mickynets.com" target="_blank" rel="noopener noreferrer">PALM SOFT DEVELOPERS</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
