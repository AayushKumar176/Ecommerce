import React from 'react'
import { useState, useEffect } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from 'react-toastify';

const Right = ({iteam}) => {

    const [price, setPrice] = useState(0);

    useEffect(() => {
        totalAmount();
    }, [iteam]);

    const totalAmount = () => {
        let price = 0
        iteam.map((item) => {
            price += item.price.cost
        });
        setPrice(price)
    }

    const proceedToBuy = async () => {
        // const res = await fetch("https://ecommercebackend-2is9.onrender.com/cartdetails", {
        const res = await fetch("/cartdetails", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
    
        const data = await res.json();
        console.log(data.carts);
    
        if (res.status !== 201) {
          alert("no data available");
        } else {
        //   console.log("Data in the cart");
        const stripeAPIKey = process.env.REACT_APP_STRIPE_API_KEY;
        console.log(stripeAPIKey);
          const stripe = await loadStripe(stripeAPIKey)

          const body={
            products:data.carts
          }
          const headers={
            "Content-Type":"application/json"
          }
          const response = await fetch("/api/create/check-out-session",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
          })

          const session = await response.json();

          const result= stripe.redirectToCheckout({
            sessionId: session.id
          })

          if(result.error){
            console.log(result.error)
          }

                
        }
      };

  return (
    <div className="right_buy">
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" />
            <div className="cost_right">
                <p>Your order is eligible for FREE Delivery. <br />
                    <span style={{ color: "#565959" }}> Select this option at checkout. Details</span></p>
                <h3> Subtotal ({iteam.length} items) :  <span style={{ fontWeight: "700" }}>₹{price}.00</span></h3>
                <button className="rightbuy_btn" onClick={proceedToBuy}>Proceed to Buy</button>
                <div className="emi" >
                    Emi available
                </div>
                <span > Your order qualifies for EMI with valid credit cards (not available on purchase of Gold,
                    Jewelry, Gift cards and Amazon pay balance top up). Learn more</span>
            </div>
        </div>
  )
}

export default Right