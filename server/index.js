const express = require ('express');
const mongoose = require('mongoose')
const cors = require('cors');
const bcrypt = require("bcrypt");
const EmployeeModel = require ('./model/UserModel')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/employee")
.then(()=>{

    console.log("DB Connected")
}).catch((err)=> console.log(err))


app.post("/register", (req, res)=>{
 
    const {name, email, password} = req.body;

    bcrypt.hash(password, 10)
   .then(hash => {

    EmployeeModel.create({name, email, password: hash})
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
   }).catch(err => console.log(err.message))
    
    

})


app.post("/login", (req, res)=>{

    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
       if(user){
        bcrypt.compare(password, user.password, (err, response)=>{


            if(err) {
    
                res.json("the password is incorrect")
    
            } if(response){
    
                res.json("Success")
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