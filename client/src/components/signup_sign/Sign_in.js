import React from 'react'
import './signup.css';
import {Link} from "react-router-dom"
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sign_in = () => {

  const [logdata, setData] = useState(
    {
      email:"",
      password:""
    }
  )
  const addData=(e)=>{
      const{name, value}=e.target;
      setData(()=>{
          return {
            ...logdata,
            [name]: value
          }
      })
  }

  const senddata= async(e)=>{
    e.preventDefault();
    const {email,password}=logdata
    
    const res=await fetch("/login",{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,password
        })


    });
    const data=await res.json();
        console.log(data);

        if(res.status ===400 || !data){
           console.log("Invalid details");
           toast.warn('Invalid details',{
            position:"top-center",
        })
        }
        else{
           console.log("Valid data");
           toast.success('Login successful',{
            position:"top-center",
        })
            setData({...logdata,  email:"",  password:"" });

        }
  }
  return (
    <>
      <section>
    <div className="sign_container">
          <div className="sign_header">
              <img src="./amazon_b.png" alt="" />
          </div>
          <div className="sign_form">
            <form method='POST'>
                <h1>Sign-In</h1>
                <div className="form_data">
                    <label htmlFor="email">Email</label>
                    <input type="text" onChange={addData} value={logdata.email} name="email" id="email" />
                </div>
                <div className="form_data">
                    <label htmlFor="">Password</label>
                    <input type="password" onChange={addData} value={logdata.password} name="password" placeholder='At Least 6 Character' id="password" />
                </div>
            </form>
            <button className='signin_btn' onClick={senddata}>Continue</button>
          </div>
          <div className="create_accountinfo">
            <p>New to Amazon</p>
           <Link to="/register"> <button>Create your Amazon Account</button> </Link>
          </div>
    </div>
  <ToastContainer/>
  </section>
    </>
  )
}

export default Sign_in