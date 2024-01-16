import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import nodemailer from "nodemailer";



const primary_mail = process.env.MAIL_USER;
const primary_mail_pass = process.env.MAIL_PASSWORD;



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


app.get("/user", async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

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
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: primary_mail,
                    pass: primary_mail_pass,
                },
            });
            
            const mailOptions = {
                from: primary_mail,
                to: `${email}`,
                subject: 'Application Submitted',
                html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                            }
            
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                border: 1px solid #ccc;
                                border-radius: 5px;
                            }
            
                            h2 {
                                color: #333;
                            }
            
                            p {
                                color: #555;
                            }
                            a{
                                color:blue;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h2>Your Application has been Submitted</h2>
                            <p>Thank you for submitting your application. We will review it and inform you soon.</p>
                            <a>Leave Ease<a/>
                        </div>
                    </body>
                </html>
            `
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('mail sent ' + info);
                }
            });
            res.status(200).json({ message: FaUser });
        }
    }
    catch (err) {
        console.log(err);
    }
});



app.listen(port, () => {
    console.log("working");
});