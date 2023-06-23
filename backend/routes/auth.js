const express = require('express');
const router = express.Router();

//npm i bcrytjs to encrypt password
const bcrypt = require('bcryptjs');
//npm i jsonwebtoken for password
const jwt = require('jsonwebtoken');
//npm i express-validator to validate the request input
const { body, validationResult } = require('express-validator');
//importing User model 
const User = require('../models/User');

//secret key to create token for user
const JWT_SECRET = "abyudaymishra12345$7";
const fetchuser = require ('../middleware/fetchuser');

//create user
router.post(
    //1 - entry point
    '/createuser',
    //2 - validating the body we received in  request body using express validator
    [
        body('name', "Enter a valid name").isLength({ min: 3 }),
        body('email', "Enter a valid email").isEmail(),
        body('password', "Password must contain  atleast 8 char").isLength({ min: 8 })

    ],
    // 3 - handling request response
    async (req, res) => {
        let success=false;
        const err = validationResult(req);

        //if express validator gives error
        if (!err.isEmpty()) {
            res.send(err.array());

        }
        //if express validator gives no error
        else {
            try {

                let userexist = await User.findOne({ email: req.body.email });

                if (userexist) {
                    return res.status(400).json({success, error: "Sorry user already exist" });
                }
                else {
                    //creating a salt of length 10 which get added to password before hashing

                    const salt = await bcrypt.genSalt(10);
                    const securepassword = await bcrypt.hash(req.body.password, salt);
                    const user = await User.create(
                        {
                            name: req.body.name,
                            email: req.body.email,
                            password: securepassword
                        }
                    )
                    const payload = {
                        user:{
                            id: user._id
                        }
                    }
                    //we are creating a token for user with help of its id and a secret key that we created
                    const authtoken = jwt.sign(payload, JWT_SECRET);
                    success=true;
                    res.json({success, "authtoken": authtoken });
                }
            }
            //if caugth a error in try block
            catch (err) {
                res.status(500).send({success, error : `Some errror occured`} );
            }
        }


    })


//Authenticate user
router.post('/login',

    [
        body('email', "Enter a valid email").isEmail(),
        body('password', "Password cannot be blank").exists()
    ],

    async (req, res) => {
        let success=false;
        const err = validationResult(req);
        if (!err.isEmpty()) {
            res.send(err.array());

        }
        else {
            try {
                const { email, password } = req.body;
                let userfound = await User.findOne({ email });
                if (!userfound) {
                    return res.status(400).json({success ,error: "Please enter correct email or password" });
                }
                else {
                    const comparepassword = await bcrypt.compare(password, userfound.password);
                    if (!comparepassword) {
                        return res.status(400).json({success , error: "Please enter correct email or password" });
                    }
                    else {
                        const payload = {
                            user:{
                                id: userfound.id
                            }
                        }
                        //we are creating a token for user with help of its id and a secret key that we created
                        const authtoken = jwt.sign(payload, JWT_SECRET);
                        success=true;
                        res.json({success , "authtoken": authtoken });
                    }
                }
            }
            //if caugth a error in try block
            catch (err) {
                res.status(500).json(success ,"Internal server error occured" + err);
            }
        }
})

//fetch user details 
router.post(
    '/getuser', fetchuser ,async (req, res) => {
        try{
            const userid = req.user.id;
            //fetching user details from db excluding password
            const user = await User.findById(userid).select("-password");
            res.send(user);
        }catch (err) {
            res.status(500).send("Internal server error occured" + err);
        }
})
module.exports = router;