import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Login from '../components/form/Login'
import Register from '../components/form/Register'
import AddFirm from '../components/form/AddFirm'
import AddProduct from '../components/form/AddProduct'
import Wellcome from '../components/Wellcome'
import AllProducts from '../components/AllProducts'

function LandingPage() {
const [showLogin,setShowLogin]=useState(false);
const [showRegister,setShowRegister]=useState(false);
const [ showAddFirm,setAddFirm]=useState(false);
const [ showAddProduct,setAddProduct]=useState(false);
const [ showWellcome,setShowWellcome]=useState(false);
const [allProducts,setallProducts]=useState(false);
const [showLogout,setshowLogout]=useState(false);
const [showFirmTitle,setShowfirmTitle]=useState(true);

useEffect(()=>{
  const loginToken=localStorage.getItem('loginToken');
  if(loginToken){
       setshowLogout(true);
      //  window.location.reload();
  }
  
},[])


useEffect(()=>{
  const firmName=localStorage.getItem('firmName');
  if(firmName){
    setShowfirmTitle(false);
  }
},[])

const LogOutHandler=async()=>{
  confirm('Are you sure to LogOut?')
  localStorage.removeItem('firmId');
  localStorage.removeItem('loginToken');
  localStorage.removeItem('firmName');
  setshowLogout(false);
  setShowfirmTitle(true);
}

const showLoginHandler=()=>{
  setShowLogin(true);
  setShowRegister(false);
  setAddFirm(false);
  setAddProduct(false);
  setShowWellcome(false)
  setallProducts(false)
  setshowLogout(true);
}
const showRegisterHandler=()=>{
  setShowRegister(true);
  setShowLogin(false);
  setAddFirm(false);
  setAddProduct(false)
  setShowWellcome(false)
  setallProducts(false)
}
const AddFirmHandler=()=>{
  if(showLogout){
    setShowRegister(false);
  setShowLogin(false);
  setAddFirm(true);
  setAddProduct(false)
  setShowWellcome(false)
  setallProducts(false)
  }else{
    alert('Please LogIn');
    setShowLogin(true);
  }
}
const AddProductHandler=()=>{
  if(showLogout){
  setShowRegister(false);
  setShowLogin(false);
  setAddFirm(false);
  setAddProduct(true);
  setShowWellcome(false)
  setallProducts(false)
}else{
  alert('Please LogIn');
  setShowLogin(true);
}
}
const WellcomeHandler=()=>{
  setShowRegister(false);
  setShowLogin(false);
  setAddFirm(false);
  setAddProduct(false);
  setShowWellcome(true)
  setallProducts(false)
}

const AllProductsHandler=()=>{
  if(showLogout){
  setShowRegister(false);
  setShowLogin(false);
  setAddFirm(false);
  setAddProduct(false);
  setShowWellcome(false);
  setallProducts(true);
}else{
  alert('Please LogIn');
  setShowLogin(true);
}
}
  return (
    <>
      <section className="landingScreen">
        <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogout={showLogout}
         LogOutHandler={LogOutHandler}/>

        <div className="collection">
        <SideBar AllProductsHandler={AllProductsHandler} AddFirmHandler={AddFirmHandler} AddProductHandler={AddProductHandler} 
        showFirmTitle={showFirmTitle}/>
        
        {showLogin && <Login WellcomeHandler={WellcomeHandler}/>}
        {showRegister && <Register showLoginHandler={showLoginHandler}/>}
        { showAddFirm && showLogout && <AddFirm/>}
        { showAddProduct && showLogout && <AddProduct/>}
        {showWellcome  && <Wellcome/>}
        {allProducts && showLogout && <AllProducts/>}
        </div>
      </section>
    </>
  )
}

export default LandingPage