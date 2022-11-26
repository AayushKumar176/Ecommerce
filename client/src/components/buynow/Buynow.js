import { Divider } from '@mui/material'
import React from 'react'
import "./buynow.css"
import Option from './Option'
import Subtotal from './Subtotal'
import Right from './Right'

const Buynow = () => {
  return (
    <div className='buynow_section'>
        <div className="buynow_container">
            <div className="left_buy">
                <h1>Shopping cart</h1>
                <p>Select all items</p>
                <span className='leftbuyprice'>Price</span>
                <Divider/>
                <div className="item_container">
                  <img src="https://m.media-amazon.com/images/I/61vhwbKd3bL._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                  <div className="item_details">
                    <h3>Amazfit GTS2 Mini (New Version) Smart Watch</h3>
                    <h3>Smart Watch</h3>
                    <h3 className="differentprice">₹4049</h3>
                    <p className='unusuall'>Usually Dispatched in 8 days</p>
                    <p>Eligible for free Shopping</p>
                    <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="" />
                    <Option/>
                  </div>
                  <h3 className='item_price'>₹4049</h3>
                </div>
                <Divider/>
                <Subtotal/>
            </div>
            <Right/>
        </div>
    </div>
  )
}

export default Buynow