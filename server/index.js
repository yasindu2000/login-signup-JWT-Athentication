const express = require ('express');
const mongoose = require('mongoose')
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmployeeModel = require ('./model/UserModel');
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json());
app.use(cors({

    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true



}));
app.use(cookieParser())

mongoose.connect("mongodb://localhost:27017/employee")
.then(()=>{

    console.log("DB Connected")
}).catch((err)=> console.log(err))

const verifyUser = (req, res, next)=>{

    const token = req.cookies.token;
   if(!token){

    return res.json("the token was not available")
   }else{

    jwt.verify(token, "jwt-secret-key",(err, decode)=>{

       if(err)  return res.json("token is wrong")
        next()
    })

   }
}

app.post("/register", (req, res)=>{
 
    const {name, email, password} = req.body;

    bcrypt.hash(password, 10)
   .then(hash => {

    EmployeeModel.create({name, email, password: hash})
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
   }).catch(err => console.log(err.message))
    
})

app.get('/home', verifyUser ,(req, res)=>{
return res.json("success")

})


app.post("/login", (req, res)=>{

    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
       if(user){
        bcrypt.compare(password, user.password, (err, response)=>{

             if(response){
                const token = jwt.sign({email: user.email}, "jwt-secret-key",{expiresIn:"1d"})
                res.cookie("token", token)
    
                res.json("Success")
            }else{
                res.json("The password incorrect");
            }
            })
        }else{
          
            res.json("No record existed")
        }
    })
})



app.listen(5000, ()=>{

    console.log("Server Running")
})