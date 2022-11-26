import React, { useEffect } from 'react'
import Banner from './Banner'
import './home.css';
import Slide from './Slide';
import { getProducts } from '../redux/actions/action';
import {useDispatch, useSelector} from "react-redux"
import { Divider } from '@mui/material';


const Maincomp = () => {

  const {products}= useSelector(state=> state.getproductsdata);
  console.log(products);

  const dispatch=useDispatch();

  useEffect(()=>{
      dispatch(getProducts());
  }, [dispatch]);

      


  return (
    <>
    <div className='home_section'>
       
      <div className="banner_part">
          <Banner/>
      </div>
      
       <div className="slide_part">
      <div className="left_slide">
      <Slide title="Today's Deal" products={products}/>
      </div>
      <div className="right_slide">
        <h4>Thunder Deal</h4>
        <img src="https://m.media-amazon.com/images/I/61JZG+RYQnL._SL1500_.jpg" alt="" />
        <a href="/">See More</a>
      </div>
      </div>
      <Slide title="Frequently Purchased" products={products}/>
      <div className="center_img">
        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG19/Home/bau/Decor/XCM_Manual_1500x300_1202741_1202741_IN_Home_Decor_Non_GW_BAU_1575984235_jpg._CB427170763_.jpg" alt="" />
      </div>
      <Slide title="Up to 60% off" products={products}/>
      <Slide title=" Best Sellers" products={products}/>
    </div>
    <Divider/>
    </>
  )
}

export default Maincomp

