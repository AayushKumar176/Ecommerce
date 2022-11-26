import React from 'react'
import './Newnav.css'

const Newnav = () => {
  return (
    <div className='new_nav'>
        <div className="nav_data">
            <div className="left_data">
                 <p>All</p>
                 <p>Best Sellers</p>
                 <p>Today Deals</p>
                 <p>Customers Service</p>
                 <p>Mobiles</p>
                 <p>Electronics</p>
                 <p>Home and Kitchen</p>
                 <p>Fashion</p>
                 <p>Books</p>
                 <p>Releases</p>
                 <p>Amazon Pay</p>
            </div>
            <div className="right_data">
                   <img src="./nav.jpg" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Newnav