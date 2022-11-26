import React from 'react'
import './signup.css';
import {Link} from "react-router-dom"
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    const [udata, setUdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });

    // console.log(udata);

    const addData = (e) => {
        const { name, value } = e.target;
        // console.log(name,value);

        setUdata(() => {
            return {
                ...udata,
                [name]: value
            }
        })
    };

    const senddata= async(e)=>{
        e.preventDefault();
        const {fname,email,mobile,password,cpassword}=udata;
        try {
        
        const res=await fetch("/register",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fname,email,mobile,password,cpassword
            })


        })
        const data=await res.json();
        // console.log(data);

        if(res.status ===422 || !data){
            toast.warn('Invalid details',{
                position:"top-center",
            })
        }
        else{
            toast.success('Registration done successfully',{
                position:"top-center",
            })
            setUdata({...udata, fname :"", email:"", mobile:"", password:"", cpassword:""});
        }
            
    } catch (error) {
        console.log("Error", error.message);
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
                <h1>Create Account</h1>
                <div className="form_data">
                    <label htmlFor="fname">Your Name</label>
                    <input type="text" onChange={addData} value={udata.fname}  name="fname" id="fname" />
                </div>
                <div className="form_data">
                    <label htmlFor="email">Email</label>
                    <input type="text" onChange={addData} value={udata.email} name="email" id="email" />
                </div>
                <div className="form_data">
                    <label htmlFor="number">Mobile</label>
                    <input type="text" onChange={addData} value={udata.mobile} name="mobile" id="mobile" />
                </div>
                <div className="form_data">
                    <label htmlFor="">Password</label>
                    <input type="password" onChange={addData} value={udata.password} name="password" placeholder='At Least 6 Character' id="password" />
                </div>
                <div className="form_data">
                    <label htmlFor="">Confirm Password</label>
                    <input type="cpassword" onChange={addData} value={udata.cpassword}  name="cpassword" id="cpassword" />
                </div>
            </form>
            <button className='signin_btn' onClick={senddata}>Continue</button>
            <div className="signin_info">
                <p>Already Have an account</p>
                <Link to="/login">Sign in</Link>
            </div>
          </div>
          <ToastContainer />
    </div>

  </section>
  </>
  )
}

export default SignUp