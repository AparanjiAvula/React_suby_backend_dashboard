import React,{useState} from 'react'
import {api_url} from '../../data/apiPath.js'

function Register({showLoginHandler}) {
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(true);

  const HadleSubmit=async(event)=>{
   event.preventDefault();
     try{
         const response=await fetch(`${api_url}/vendor/register`,{
          method:"POST",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify({username,email,password})
         })
         const data=await response.json();
         if(response.ok){
          console.log(data);
          alert('Vendor Registered Successfully');
          setEmail('');
          setUsername('');
          setPassword('');
          showLoginHandler();
         }
     }catch(e){
      console.log("Registration failed",e);
      alert('Registration failed')
     }
  }
  return (
    <>
       <div className="registerScreen">
       <form onSubmit={HadleSubmit} className='authForm'>
        <h3>Vendor Register</h3>
        <label>Username</label><br />
            <input type="text" name='username' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter Your Username' /><br />
            <label>Email</label><br />
            <input type="text" name='email'value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email' /><br />
            <label>Password</label><br />
            <input type="text" name='password'value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password' /><br />
            <div className="submitBtn">
                <button type='submit'>submit</button>
            </div>
        </form>
       </div>
    </>
  )
}

export default Register