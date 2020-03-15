const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { User } = require('./models/user')
const config = require('./config/key')
const {auth}= require('./middleware/auth')
const cookieParser = require("cookie-parser");


mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("DB connected")).catch(err=> console.log("Error"));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())

app.post("/api/user/registration", (req, res)=>{
    const user = new User(req.body)
    console.log(req.body)
    user.save((err, userdata)=>{
        if(err) return res.json({success:false, err})
        return res.status(200).json({success:true})
    })
})

app.post("/api/user/login", (req, res)=>{
    //compare email             
    User.findOne({email: req.body.email}, function(err, user){
        if(!user)
            return res.json({
                loginsuccess: false,
                message: "Invalid Email"
            })

        //comparePassword
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch){
                return res.json({
                    loginsuccess: false,
                    message: " Wrong Password"
                })
            }
        })

        //generate token
        user.generateToken((err, user)=>{
            if(err) return res.status(400).send(err);
            res.cookie("x_auth", user.token).status(200).json({
                loginsuccess: true,
                token: user.token
            })
        })
    })
})

app.get('/',(req,res)=>{
    res.send("Helllo sssssworld")
})


app.get("/api/user/auth", auth, (req, res)=>{
    res.status(200).json({
        _id : req.user._id,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
    })
})

app.get("/api/user/logout", auth, (req, res)=>{
    User.findOneAndUpdate({_id: req.user._id,}, {token: ""}, (err, doc)=>{
        if(err) return res.json({success: false, err})
        res.status(200).send({
            success: true
        })
    })
})

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`port is listening on ${port}`)
})