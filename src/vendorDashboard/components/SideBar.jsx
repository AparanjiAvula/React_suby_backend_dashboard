import React from 'react'

function SideBar({ AddFirmHandler,AddProductHandler,AllProductsHandler,showFirmTitle}) {
  return (
    <>
      <div className="sideBarSection">
        <ul>
           {showFirmTitle && <li onClick={AddFirmHandler}>Add Firm</li>} 
            <li onClick={AddProductHandler}>Add Product</li>
            <li onClick={AllProductsHandler}>All Products</li>
            <li>User Details</li>
        </ul>
      </div>
    </>
  )
}

export default SideBar