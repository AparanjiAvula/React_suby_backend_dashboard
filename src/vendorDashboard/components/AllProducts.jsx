import React,{useEffect,useState} from 'react'
import { api_url } from '../data/apiPath.js';
function AllProducts() {
    const [products,setProducts]=useState([]);
    
    const productHandler=async(e)=>{
        const firmId=localStorage.getItem('firmId');
        try{
            const response=await fetch(`${api_url}/product/${firmId}/products`)
            const newProductData=await response.json();
            setProducts(newProductData.products)
            console.log(newProductData);
        }catch(e){
            console.log("Failed to fetch products",e);
            alert('Failed to fetch products');
        }
    }
    useEffect(()=>{
    productHandler()
    },[])


    const deleteProductById=async(productId)=>{
         
        try{
             const response=await fetch(`${api_url}/product/delete/${productId}`,{
                method:"DELETE"
             })
             if(response.ok){
                setProducts(products.filter(product=>product._id!=productId));
                confirm('Are you sure ,you to delete product')
                alert("product deleted successfully")
             }
        }catch(e){
            console.log("Failed to delete product",e);
            alert('Failed to delete product');
        }
    }
  return (
    <>
      {
        !products?<h1>No Products Added</h1>:(
        <div>
            <table className='product-table'>
              <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                    products.map((item)=>{
                        return (
                            <>
                              <tr key={item._id}>
                                   <td>{item.productName}</td>
                                   <td>{item.price}</td>
                                   <td>
                                    {item.image&&(
                                        <img style={{width:"50px",height:"50px"}} src={`${api_url}/uploads/${item.image}`} alt={item.productName}/>
                                    )}
                                   </td>
                                   <td>
                                    <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                                   </td>
                              </tr>
                            </>
                        )
                    })
                }
              </tbody>
            </table>
        </div>
        )
      }
    </>
  )
}

export default AllProducts