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


    EmployeeModel.create(req.body)
    .then(employees =>res.json(employees))
    .catch(err => res.json(err))

})





app.listen(5000, ()=>{

    console.log("Server Running")
})