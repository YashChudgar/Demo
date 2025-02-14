// const express = require('express')
// const fs=require('fs')
// const path=require('path')
// const app=express()  //Creating an instance named app
// app.use((req,res,next)=>{   //Middleware
//     console.log('user is requesting')
//     // res.send('ok give me the passcode')
//     next()
// })  
// app.get('/',(req,res)=>{   //get is a Router of Express
//     fs.readFile(path.join(__dirname,'index.html'),(err,content)=>{res.end(content)})
//     // res.send("Now i have started using express")
// })

// app.get('/about',(req,res)=>{
//     fs.readFile(path.join(__dirname,'about.html'),(err,content)=>{res.end(content)})
// })

// app.get('/services',(req,res)=>{
//     fs.readFile(path.join(__dirname,'services.html'),(err,content)=>{res.end(content)})
// })

// app.get('/contact',(req,res)=>{
//     fs.readFile(path.join(__dirname,'contact.html'),(err,content)=>{res.end(content)})
// })




// app.listen(8000,()=>{
//     console.log('http://localhost:8000')
// })

const express=require('express')
const app=express()
const session = require('express-session')
app.use(express.static('public'))
const mongoose=require('mongoose')
const user=require('./schema')
const passport = require('passport')
const { initializePassport } = require('./passportConfig')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))



mongoose.connect('mongodb://127.0.0.1:27017/cse2')
.then(()=>{console.log('connected with mongodb')})
.catch((err)=>{console.log('connection error',err)})

passport.use(session({
    secret : 'your_secret_key',
    resave:false,
    saveUninitialized:false
}))

// app.use(passport.initialize())
// app.use(passport.session())
initializePassport(passport)
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
 })
app.get('/register',(req,res)=>{
    res.sendFile(__dirname + '/public/register.html')
})
app.post('/register',(req,res)=>{
    const NewUser=new user({
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        Email:req.body.Email,
        UserName:req.body.UserName,
        password:req.body.password
    })

    NewUser.save()
    .then(()=>res.send('Data saved'))
    .catch((err=>res.status(500).send('Error saving data' +err.message)))
})

// app.get('/page',(req,res)=>{
//     res.sendFile(__dirname + '/public/page.html')
// })

app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/public/login.html')
})  

app.post('/login',passport.authenticate('local',{failureRedirect : '/login'}),(req,res)=>{
    res.send(`Welcome ${req.user.UserName}`)
})

app.listen(8000,(req,res)=>{
    console.log('http://localhost:8000')
})