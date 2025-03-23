const express = require ('express');
const mongoose = require('mongoose')
const cors = require('cors');
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
    EmployeeModel.findOne({email : email})
    .then(user => {
        if(user){
            res.json("Already have an account")
        }else{
            EmployeeModel.create({
                name:name,
                email:email,
                password: password
            }).then(result => {
                res.json(result);
            }).catch(err => res.json(err))
        }
    }).catch(err => res.json(err))

    
    

})


app.post("/login", (req, res)=>{

    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {

        if(user){
            if(user.password === password){
                res.json("Success")
            }else{

                res.json("the password is incorrect")
            }
        }else{

            res.json("no record existed")
        }
    })
})



app.listen(5000, ()=>{

    console.log("Server Running")
})