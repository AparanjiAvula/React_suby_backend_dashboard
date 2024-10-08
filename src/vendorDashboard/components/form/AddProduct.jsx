import React,{useState} from 'react';
import {api_url} from '../../data/apiPath.js';

function AddProduct() {
  const [productName,setProductName]=useState('');
  const [price,setPrice]=useState('');
  const [category,setCategory]=useState([]);
  const [bestSeller,setBestSeller]=useState(null);
  const [image,setImage]=useState(null);
  const [description,setDescription]=useState('');


  const handleCategoryChange=(e)=>{
    const value=e.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value))
    }else{
      setCategory([...category,value])
    }
  }

  const handleBestSeller = (e) => {
    const value = e.target.value === 'true'; 
    setBestSeller(value);
  };

  const ImageHandler=(event)=>{
    const value=event.target.files[0];
    setImage(value);
 }
  const handleProductSubmit=async(e)=>{
    e.preventDefault();
    try{
      const loginToken=localStorage.getItem('loginToken');
      const firmId=localStorage.getItem('firmId');
      if(!loginToken || !firmId){
        console.error('user not authenticated')
      }

      const formData=new FormData();
      formData.append('productName',productName);
      formData.append('price',price);
      formData.append('description',description);
      formData.append('image',image);

      category.forEach(value=>{
        formData.append('category',value);
      })

      const response=await fetch(`${api_url}/product/addProduct/${firmId}`,{
        method:'post',
        body:formData
      })

      const data=await response.json();
      if(response.ok){
        alert('product added Successfully');
        setProductName('');
        setBestSeller(false);
        setCategory([]);
        setDescription('');
        setImage(null);
        setPrice('');
      }

    }catch(e){
      console.log(e)
    }
  }
  return (
    <>
       <div className="addFirm">
        <form className="tableForm" onSubmit={handleProductSubmit}>
            <h3>Add Product</h3>
            <label>Product Name</label><br />
            <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)}/><br/>
            <label>Price</label><br />
            <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/><br/>
            {/* <label>category</label><br />
            <input type="text" value={category} onChange={handleCategoryChange}/><br/> */}
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
            {/* <label>BestSeller</label><br />
            <input type="text" value={bestSeller}/><br/> */}
               <div className="checkBox">
      <label>BestSeller</label>
      <div className="check-Container">
        <div className="checkContainer">
          <label>Yes</label>
          <input
            type="radio"
            value="true"
            checked={bestSeller === true}
            onChange={handleBestSeller}
          />
        </div>
        <div className="checkContainer">
          <label>No</label>
          <input
            type="radio"
            value="false"
            checked={bestSeller === false}
            onChange={handleBestSeller}
          />
        </div>
      </div>
    </div>

            <label>Description</label><br />
            <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/><br/>
            <label>Add Image</label><br />
            <input type="file"  onChange={ImageHandler}/><br/>
    
            <div className="submitBtn">
                <button type='submit'>submit</button>
            </div>
        </form>
       </div>
    </>
  )
}

export default AddProduct