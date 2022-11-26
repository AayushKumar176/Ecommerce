const express= require('express');
const router=new express.Router();
const Products=require("../models/productsSchema");
const USER= require("../models/userSchema");
const bcrypt=require("bcryptjs");
const authenicate = require('../middleware/authenticate');


// get all products details
router.get("/getproducts", async(req, res)=>{
    try {
        const productsdata= await Products.find();
        // console.log(productsdata);
        res.status(201).json(productsdata);
    } catch (error) {
        console.log("error", error.message);
    }
})

// get individual details

router.get("/getproductsone/:id" ,async(req, res)=>{
    try {
        const {id}= req.params;
        // console.log(id);
        const individualdata= await Products.findOne({id: id});
        // console.log(individualdata + "individual data");

        res.status(201).json(individualdata);
    } catch (error) {
        res.status(400).json(individualdata);
        console.log("error", error.message);
        
    }
})

// register the data
router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "Fill the all details" });
        console.log("Data not available");
    };

    try {

        const preuser = await USER.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This email is already exist" });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password are not matching" });;
        } else {

            const finaluser = new USER({
                fname, email, mobile, password, cpassword
            });


            const storedata = await finaluser.save();
            // console.log(storedata + "user successfully added");
            res.status(201).json(storedata);
        }

    } catch (error) {
        console.log("Error " + error.message);
        res.status(422).send(error);
    }
})

// User Login
// router.post("/login", async(req, res)=>{
//     const {email, password}=req.body;
//     if(!email || !password){
//         res.status(400).json({error: "Fill all details"});

//     }
//     try {
        
    
//     const userlogin = await USER.findOne({email:email});
//     console.log(userlogin);
//     if(userlogin){
//         const isMatch= await bcrypt.compare(password, userlogin.password);
//         console.log(isMatch);
//         if(!isMatch){
//             res.status(400).json({error: "Invalid details"});
//         }
//         else{
//             res.status(201).json({Success: "Login successfully"});
//         }
//     }
//     } catch (error) {
//           res.status(400).json({error:"Something went wrong"});  
//     }
// })

router.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill the details" });
    }

    try {

        const userlogin = await USER.findOne({ email: email });
        console.log(userlogin);
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            // console.log(isMatch +"Password match");

            // token generate

            const token= await userlogin.generateAuthtokenn();
            // console.log(token);

            res.cookie("Ecommerce", token,{
                expires: new Date(Date.now() + 900000),
                httpOnly:true
            })
            



            if (!isMatch) {
                res.status(400).json({ error: "invalid crediential pass" });
            } else {
                
                res.status(201).json(userlogin);
            }

        }
        else{
            res.status(400).json({ error: "invalid Details" });
        }

    } catch (error) {
        res.status(400).json({ error: "invalid crediential pass" });
        console.log("Error" + error.message);
    }


});

router.post("/addcart/:id" , authenicate, async(req, res)=>{
    try {
        const {id}=req.params;
        const cart= await Products.findOne({id:id});
        console.log(cart +"cart value");

        const UserContact= USER.findOne({_id: req.userID});
        console.log(UserContact);

        if(UserContact){
            const cartData= await UserContact.addcartdata(cart);
            await UserContact.save();
            console.log(cartData);
            res.status(201).json(UserContact);
        }else{
            res.status(401).json({error: "Invalid User"});
        }
    } catch (error) {
        res.status(401).json({error: "Invalid User"});
    }
})


module.exports=router;