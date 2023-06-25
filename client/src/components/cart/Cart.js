import { Divider } from '@mui/material';
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './cart.css';
import { useEffect, useState } from 'react';
import { LoginContext } from '../context/ContextProvider';
import CircularProgress from '@mui/material/CircularProgress';

const Cart = () => {
  //  console.log(id);
  const {account, setAccount}= useContext(LoginContext);
  // console.log(account);
  const {id}=useParams("");
  const [inddata, setinddata] = useState("");
  console.log(inddata);
  const history= useNavigate("");



  const getinddata=async()=>{
    const res= await fetch(`https://ecommercebackend-2is9.onrender.com/getproductsone/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    });
    const data= await res.json();
    // console.log(data);

    if(res.status!==201){
      console.log("No data available");
    }
    else{
      console.log("getdata");
      setinddata(data);
    }
  }
useEffect(() => {
  setTimeout(getinddata,1000)
}, [id])

// add o cart 
const addtocart =async (id)=>{
      const checkres= await fetch (`https://ecommercebackend-2is9.onrender.com/addcart/${id}`,{
        method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        inddata
      }),
      credentials:"include"
      })

      const data1=await checkres.json();
      console.log(data1);

      if(checkres.status ===401 || !data1){
          console.log("User Invalid");
          alert("User Invalid");


      }
      else{
          // alert("Data added in your cart Successfully");
          setAccount(data1);
          history("/buynow");
      }
}


  return (
   
    <div className='cart_section'>
       {inddata && Object.keys(inddata).length && 
        <div className="cart_container">
            <div className="left_cart">
                 <img src={inddata.detailUrl} alt="" />
                 <div className="cart_btn">
                    <button className='cart_btn1' onClick={()=>addtocart(inddata.id)}>Add to cart</button>
                    <button className='cart_btn2'>Buy Now</button>

                 </div>
            </div>
            <div className="right_cart">
                <h3>{inddata.title.shortTitle}</h3>
                <h4>{inddata.title.longTitle}</h4>
                <Divider/>
                <p className="mrp">MRP: ₹{inddata.price.mrp}</p>
                <p>Limited Time deal : <span style={{color:"#B12704"}}>₹{inddata.price.cost}.00</span></p>
                <p>You save : <span style={{color:"#B12704"}}>₹{inddata.price.mrp- inddata.price.cost}</span></p>

                <div className="discount_box">
                    <h5>Discount : <span style={{color:"#111"}}>{inddata.discount}</span></h5>
                    <h5>Free Delivery by Amazon : <span style={{color:"#111" , fontWeight:"600"}}>November- 18-21</span></h5>
                    <p>Fastest delivery :  <span style={{color:"#111" , fontWeight:"600"}}>Get it by Tomorrow</span></p>
                </div>
                <p className="description">About the product: <span style={{color: "#565959", fontSize:14, fontWeight:500, letterSpacing: "0.4px"}}>
                {inddata.description}  </span></p>
            </div>
        </div>
    }


    {!inddata?
    <div className="circle">
    <CircularProgress/>
    <h2>Loading</h2>
  </div>:""}
    </div>
  )
}

export default Cart

