import React from 'react'
import {Link} from 'react-router-dom'
function NotFound() {
  return (
    <>
      <div className="errorSection">
        <div style={{fontSize:"22px",color:'darkgreen'}}>
        <Link to='/'>Go Back</Link>
        </div>
        <h1>404</h1>
        <div>Page not found</div>
        
      </div>
    </>
  )
}

export default NotFound