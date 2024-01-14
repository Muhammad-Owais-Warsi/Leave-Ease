import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer"

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
dotenv.config(); 

mongoose.connect("mongodb://127.0.0.1:27017/New");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    register:{
        type:String,
        required:true,
        unique:true
    }
})

const faSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    register:{
        type:String,
        required:true,
        unique:true
    },
    form:{
        name:{
            type:String,
            required:true
        },
        register:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        dateIn:{
            type:Date,
            required:true
        },
        dateOut:{
            type:String,
            required:true
        },
        personalPhone:{
            type:Number,
            required:true
        },
        parentPhone:{
            type:Number,
            required:true
        }
    }
})

const hodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    register:{
        type:String,
        required:true,
        unique:true
    },
    form:{
        name:{
            type:String,
            required:true
        },
        register:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        dateIn:{
            type:Date,
            required:true
        },
        dateOut:{
            type:String,
            required:true
        },
        personalPhone:{
            type:Number,
            required:true
        },
        parentPhone:{
            type:Number,
            required:true
        }
    }
})

const User = mongoose.model("User",userSchema);
const Fa = mongoose.model("Fa",faSchema);
const Hod = mongoose.model("Hod",hodSchema);


app.get("/", async (req,res) => {
    const users = await User.find({});
    res.json({users});
})

app.post("/user/login", async (req,res) => {
    const {email,register} = req.body;

    const userExist = await User.findOne({email});

    if(userExist) {
        res.status(400).json({message:"User already exist"});
    } else {
        const newUser = await User.create({
            email:email,
            register:register
        })
        console.log(newUser)
        res.status(200).json({message:newUser});
    }
});

app.post("/form", async (req,res) => {
    const {name,email,register,form} = req.body;

    const newUser = await Fa.create({
        name:name,
        email:email,
        register:register,
        form:form
    }) 

    if(newUser) {
        res.status(200).json({message:"Submitted"});
    } else {
        res.status(400).json({message:"Error"})
    }
 

})















app.listen(4000,() => {
    console.log("server started");
})