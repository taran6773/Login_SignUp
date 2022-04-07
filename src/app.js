const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const hbs = require('hbs')

require("./db/conn")
const Register = require("./models/registerSchema")
const async = require('hbs/lib/async')

const template_path = path.join(__dirname,'../templates/views')
const partials_path = path.join(__dirname,'../templates/partials')
app.use(express.static(path.join(__dirname,'../public')))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine", "hbs")
app.set("views" , template_path)
hbs.registerPartials(partials_path)

app.get('/',(req,res)=>{
    res.render("index")
})

app.get('/register',(req,res)=>{
    res.render("register")
})
app.post('/register',async(req,res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password === cpassword){
        console.log(req.body)
            const regsiteredUser = new Register({
                name:req.body.name,
                email:req.body.email,
                password : password,
                repeatPassword : cpassword,
            })
            const registered = await regsiteredUser.save();
            res.status(201).render("index")
        }else{
            res.send("Password not matched!")
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/login',(req,res)=>{
    res.render("login")
})
app.post('/login', async(req,res)=>{
    // res.render("login")
    try {
        const email = req.body.email;
        const password = req.body.password;

        // console.log(`${email} and ${password}`)
        const userEmail = await Register.findOne({email:email});
        if(userEmail.password === password){
            res.status(201).render("logedIn")
        }else{
            res.send("Password Doesn't match!")
        }

    } catch (error) {
        res.status(400).send("Invalid!")
    }
})

app.listen(port,()=>{
    console.log(`server is running at port: ${port}`)
})