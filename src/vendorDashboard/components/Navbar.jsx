import React from 'react'

function Navbar({showLoginHandler,showRegisterHandler,showLogout,LogOutHandler}) {
  const firmName=localStorage.getItem('firmName')
  return (
    <>
      <div className="navSection">
        <div className="company">
           Vendor Dashboard
        </div>
        <div className="firmName">
          <h4>FirmName:{firmName}</h4>
        </div>
        <div className="userAuth">
          {
            showLogout ?
             <span onClick={LogOutHandler}>LogOut</span>
            :
            <>
            <span onClick={showLoginHandler}>Login /</span>&nbsp;
            <span onClick={showRegisterHandler}>Register</span>
            </>
          }
            
            
          </div>
      </div>
    </>
  )
}

export default Navbar