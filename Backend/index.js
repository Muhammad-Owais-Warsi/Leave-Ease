import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import nodemailer from "nodemailer";



const primary_mail = process.env.MAIL_USER;
const primary_mail_pass = process.env.MAIL_PASSWORD;
const secondary_mail = process.env.DECOY_USER;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: primary_mail,
        pass: primary_mail_pass,
    },
});

const mailOptions = {
    from: primary_mail,
    to: secondary_mail,
    subject: 'Test Email',
    text: 'Hello, this is a test email!',
  };

const port = 3000;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/LeaveEase");

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    register: {
        type: String,
        required: true,
        unique: true
    }
})

const faSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    register: {
        type: String,
        required: true,
        unique: true
    },
    form: {
        name: {
            type: String,
            required: true
        },
        register: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        dateIn: {
            type: Date,
            required: true
        },
        dateOut: {
            type: String,
            required: true
        },
        personalPhone: {
            type: Number,
            required: true
        },
        parentPhone: {
            type: Number,
            required: true
        }
    }
})

const hodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    register: {
        type: String,
        required: true,
        unique: true
    },
    form: {
        name: {
            type: String,
            required: true
        },
        register: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        dateIn: {
            type: Date,
            required: true
        },
        dateOut: {
            type: String,
            required: true
        },
        personalPhone: {
            type: Number,
            required: true
        },
        parentPhone: {
            type: Number,
            required: true
        }
    }
})

const User = mongoose.model("User", userSchema);
const Fa = mongoose.model("Fa", faSchema);
const Hod = mongoose.model("Hod", hodSchema);


// app.get("/user", async (req, res) => {
//     const users = await User.find({});
//     res.json(users);
// });

app.post("/user/login", async (req, res) => {
    const { email, register } = req.body;

    const duplicateUser = await User.findOne({ email, register })

    if (duplicateUser) {
        res.status(400).json({ message: "error found" });
    }
    else {
        const newUser = await User.create(
            {
                email: email,
                register: register

            }
        )

        res.status(200).json({ message: newUser });

    }
});

app.post("/form", async (req, res) => {
    try {
        const { name, email, register, form } = req.body;

        const duplicateValue = await Fa.findOne({ email });

        if (duplicateValue) {
            res.status(400).json({ message: "duplicate values found" });
        }
        else {
            const FaUser = await Fa.create(
                {
                    name: name,
                    email: email,
                    register: register,
                    form: form,
                }
            )
            transporter.sendMail(mailOptions, (err, info) => {
                if (err){
                    console.log(err);
                }
                else{
                    console.log('mail sent ' + info);
                }
            });
            res.status(200).json({ message: FaUser });
        }
    }
    catch(err){
        console.log(err);
    }   
});



app.listen(port, () => {
    console.log("working");
});