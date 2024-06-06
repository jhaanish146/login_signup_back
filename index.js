import express from "express";
import cors from "cors"
import mongoose from "mongoose";

const app = express()
app.use(express.json());
// app.use(express.urlencoded())
app.use(cors())

// mongoose.connect("mongodb+srv://anishjha902:jhaji@cluster0.oanyltq.mongodb.net/?retryWrites=true&w=majority",{
//     useNewUrlParser:true,
//     useUnifiedTopology: true
// }, () => {
//     console.log("database Connected");
// })

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const User = new mongoose.model("User",userSchema)
//Router
app.post("/",(req,res) => {
    res.send("My Api")
})

app.post("/login",(req,res) => {
    res.send("My Api login")
})

app.post("/register",(req,res) => {
    const {name,email,password} = req.body
    User.findOne({email:email}, (err,user) => {
        if(user){
            res.send({message: "User already registered"})
        }
        else{
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err){
                    res.send(err);
                }
                else{
                    res.send({message: "Succesfully Registered"})
                }
            })
        }
    })
})

app.listen(9002,() => {
    console.log("server in starting on the port of 9002");
})