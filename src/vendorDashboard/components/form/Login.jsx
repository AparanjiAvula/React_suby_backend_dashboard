import React,{useState} from 'react'
import {api_url} from '../../data/apiPath.js'

function Login({WellcomeHandler}) {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const LoginHandler=async(e)=>{
   e.preventDefault();
   try{
      const response=await fetch(`${api_url}/vendor/login`,{
        method:'post',
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({email,password})
      });
     const data=await response.json();
     if(response.ok){
       alert('Login Successfully');
       localStorage.setItem('loginToken',data.token);
       setEmail('');
       setPassword('');
       WellcomeHandler();
     }
    const vendorId=data.vendorId;

     if(data.firm.length>0){
       const vendorResponse=await fetch(`${api_url}/vendor/getVendor/${vendorId}`)
       const vendorData=await vendorResponse.json()
     if(vendorResponse.ok){
        const vendorFirmId=vendorData.vendorFirmId;
        const vendorFirmName=vendorData.vendor.firm[0].firmName;
        localStorage.setItem('firmName',vendorFirmName);
        // console.log("checking for firmId",vendorFirmId);
        localStorage.setItem('firmId',vendorFirmId);
        window.location.reload();
     }
     }
   }catch(e){
    console.log(e,"Login failed")
   }
  }
  return (
    <>
      <div className="loginScreen">
        <form onSubmit={LoginHandler} className='authForm'>
        <h3>Vendor Login</h3>
            <label>Email</label><br />
            <input type="text" value={email} name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email' /><br />
            <label>Password</label><br />
            <input type="text"value={password} name='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password' /><br />
            <div className="submitBtn">
                <button type='submit'>submit</button>
            </div>
        </form>
      </div>
    </>
  )
}

export default Login