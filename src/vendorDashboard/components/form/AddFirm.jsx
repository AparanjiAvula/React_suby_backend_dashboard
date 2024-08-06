import React,{useState} from 'react'
import {api_url} from '../../data/apiPath.js';

function AddFirm() {
  const [firmName,setFirmname]=useState('');
  const [area,setArea]=useState('');
  const [category,setCategory]=useState([]);
  const [region,setRegion]=useState([]);
  const [offer,setOffer]=useState('');
  const [file,setFile]=useState(null);

  const handleCategoryChange=(e)=>{
    const value=e.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value))
    }else{
      setCategory([...category,value])
    }
  }


  const handleRegionChange=(e)=>{
    const value=e.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=>item!==value))
    }else{
      setRegion([...region,value])
    }
  }


  const ImageHandler=(event)=>{
     const value=event.target.files[0];
     setFile(value);
  }
  
  const handleFirmSubmit=async(e)=>{
    e.preventDefault();
    try{
        const Logintoken=localStorage.getItem('loginToken');
        if(!Logintoken){
          console.log('user not authenticaten')
        }
        const formData=new FormData();
        formData.append('firmName',firmName);
        formData.append('area',area);
        formData.append('offer',offer);
        formData.append('image',file);

        category.forEach(value=>{
          formData.append('category',value);
        })
        region.forEach(value=>{
          formData.append('region',value);
        })

        const response=await fetch(`${api_url}/firm/addFirm`,{
          method:"POST",
          headers:{
            'token':`${Logintoken}`
          },
          body:formData
        })
         
        const data=await response.json();
        if(response.ok){
          console.log(data);
          alert('Firm Added Successfully');
          setArea('');
          setFirmname('');
          setCategory([]);
          setRegion([]);
          setOffer('');
          setFile(null);
        }
        if(data.msg==="Firm Data added Successfully"){
          const firmId=data.firmId;
          localStorage.setItem('firmId',firmId);
        }
        else if(data.msg==="Vendor Should have only one Firm or restaurant"){
          alert('Vendor Limit exist or Vendor can Have only One Firm');
          setArea('');
          setFirmname('');
          setCategory([]);
          setRegion([]);
          setOffer('');
          setFile(null);
        }
        else{
          alert('Failed to add firm');
        }

        
    }catch(e){
      console.log("Failed to add Firm",e)
    }
  }
  return (
    <>
     <div className="addFirm">
        <form onSubmit={handleFirmSubmit} className="tableForm">
            <h3>Add Firm</h3>
            <label>Firm Name</label><br />
            <input type="text"name='firmName' value={firmName} onChange={(e)=>setFirmname(e.target.value)}/><br />
            <label>Area</label><br />
            <input type="text" name='area' value={area} onChange={(e)=>setArea(e.target.value)}/><br />
            {/* <label>category</label><br />
            <input type="" /><br /> */}
            <div className="checkBox">
               <label>Category</label>
              <div className="check-Container">
              <div className="checkContainer">
                <label>Veg</label>
                <input type="checkbox"  checked={category.includes('veg')} value='veg' onChange={handleCategoryChange}/>
              </div>
              <div className="checkContainer">
                <label>non-Veg</label>
                <input type="checkbox" checked={category.includes('non-veg')} value='non-veg' onChange={handleCategoryChange}/>
              </div>
              </div>
            </div>
            {/* <label>Region</label><br />
            <input type="text" /><br /> */}
            <div className="checkBox">
               <label>Region</label>
              <div className="check-Container">
              <div className="RegionContainer">
                <label>Bakery</label>
                <input type="checkbox" checked={region.includes('bakery')} value='bakery'  onChange={handleRegionChange}/>
              </div>
              <div className="RegionContainer">
                <label>southIndain</label>
                <input type="checkbox" checked={region.includes('south-indian')} value='south-indian' onChange={handleRegionChange}/>
              </div>
              <div className="RegionContainer">
                <label>NorthIndain</label>
                <input type="checkbox" checked={region.includes('north-indian')} value='north-indian' onChange={handleRegionChange}/>
              </div>
              <div className="RegionContainer">
                <label>chinese</label>
                <input type="checkbox" checked={region.includes('chinese')} value='chinese' onChange={handleRegionChange}/>
              </div>
              </div>
            </div>
            <label>Offer</label><br />
            <input type="text" value={offer} name='offer' onChange={(e)=>setOffer(e.target.value)} /><br />
            <label>Firm Image</label><br />
            <input type="file" onChange={ImageHandler} /><br />
    
            <div className="submitBtn">
                <button type='submit'>submit</button>
            </div>
        </form>
       </div>
    </>
  )
}

export default AddFirm