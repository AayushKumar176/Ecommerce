import React from 'react'
import './footer.css';

const Footer = () => {
    const year = new Date().getFullYear();
    console.log(year);

  return (
    <div>
        <footer>
            <div className="footer_container">
                <div className="footer_details_one">
                    <h3>Get to Know us</h3>
                    <p>About us</p>
                    <p>Careers</p>
                    <p>Press Releases</p>
                    <p>Amazon Science</p>
                </div>
                <div className="footr_details_one">
                    <h3>Connect With us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                </div>
                <div className="footr_details_one forres">
                    <h3>Make money with us</h3>
                    <p>Sell on amazon</p>
                    <p>Sell under Amazon Accelerator</p>
                    <p>Amazon Global Selling</p>
                    <p>FulFilment by Amazon</p>
                </div>
                <div className="footr_details_one forres">
                    <h3>Let us Help you</h3>
                    <p>Covid-19 and amazon</p>
                    <p>Your Acoount</p>
                    <p>Amazon assistant</p>
                    <p>100% Purchase Protection</p>
                </div>
            </div>
            <div className="lastdetails">
                <img src="./amazon_PNG25.png" alt="logo" />
                <p>Conditions of Use & Sale &nbsp; &nbsp;&nbsp;  Privacy Notice  &nbsp; &nbsp;&nbsp; Interest-Based Ads  &nbsp; &nbsp;&nbsp;  © 1996-{year}, Amazon.com, Inc. or its affiliates</p>
            </div>
        </footer>
    </div>
  )
}

export default Footer