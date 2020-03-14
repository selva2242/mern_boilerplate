const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { User } = require('./models/user')
const config = require('./config/key')


mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("DB connected")).catch(err=> console.log("Error"));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.post("/api/user/registration", (req, res)=>{
    const user = new User(req.body)
    console.log(req.body)
    user.save((err, userdata)=>{
        if(err) return res.json({success:false, err})
        return res.status(200).json({success:true})
    })
})

app.get('/',(req,res)=>{
    res.send("Helllo sssssworld")
})

app.listen(port,()=>{
    console.log(`port is listening on ${port}`)
})