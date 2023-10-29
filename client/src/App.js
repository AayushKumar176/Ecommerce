
import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/Header/Navbar';
import Maincomp from './components/Home/Maincomp';
import Newnav from './components/Newnavbar/Newnav';
import Sign_in from './components/signup_sign/Sign_in';
import SignUp from './components/signup_sign/SignUp';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import Success from './components/payment/Success';
import Fail from './components/payment/Fail';
import {
  Routes,Route, 
} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect , useState} from "react";


function App() {

  const [data, setData]=useState(false)

  useEffect(() => {
    setTimeout(() => {
      setData(true)
    }, 2000);
  }, [])
  
  return (
    <>
    {
      data?(
        <>
          <Navbar/>
     <Newnav/>
     <Routes>
        <Route path="/" element={<Maincomp/>}/>
        <Route path="/login" element={<Sign_in/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/getproductsone/:id" element={<Cart/>}/>
        <Route path="/buynow" element={<Buynow/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/fail" element={<Fail/>}/>
     </Routes>
     
     <Footer/>
        </>
      ):(
        <div className="circle">
          <CircularProgress/>
          <h2>Loading</h2>
        </div>
      )
    }
    </>
  );
}

export default App;
