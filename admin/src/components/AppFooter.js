import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  const d = new Date()
  const year = d.getFullYear()
  return (
    <CFooter>
      <div>
        <a href="https://www.ampcus.com/" target="_blank" rel="noopener noreferrer">
          Ampcus
        </a>
        <span className="ms-1">&copy; {year}.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
