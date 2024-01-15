import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer"

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/New");

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


app.get("/", async (req, res) => {
    const users = await User.find({});
    res.json({ users });
})

app.get("/formdata", async (req, res) => {
    const data = await Fa.find({});
    res.json({ data });
})

app.delete("/del",async (req,res) => {
    const {email} = req.body;

    const delUser = await User.deleteOne({email});
    const faDelUser = await Fa.deleteOne({email});
    if(delUser && faDelUser) {
        res.json({message:"done"});
    } else {
        res.json({message:"error"})
    }
})

app.post("/user/login", async (req, res) => {
    const { email, register } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400).json({ message: "User already exist" });
    } else {
        const newUser = await User.create({
            email: email,
            register: register
        })
        console.log(newUser)
        res.status(200).json({ message: newUser });
    }
});

app.post("/form", async (req, res) => {
    const { name, email, register, form } = req.body;

    const newUser = await Fa.create({
        name: name,
        email: email,
        register: register,
        form: form
    })

    if (newUser) {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'warsimuhammadowais@gmail.com',
                pass: 'lpal kbcd xqcg eoeq'
            }
        });

        var mailOptions = {
            from: 'warsimuhammadowais@gmail.com',
            to: `${email}`,
            subject: 'Application Submitted - Notification',
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
        

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.status(200).json({ message: "Submitted" });
    } else {
        res.status(400).json({ message: "Error" })
    }


})


app.post("/fa/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Empty fields" });
    } else {
        if (email === "warsimuhammadowais@gmail.com" && password === "") {

            const data = await Fa.find({});
            if (data) {
                console.log(data);
                res.status(200).json({ data });
            } else {
                res.status(400).json({ message: "Error" });
            }
        } else {
            res.status(400).json({ message: "Error" })
        }
    }
})

app.post("/fa/reject", async (req,res) => {
    const {email} = req.body;

    if(!email) {
        res.status(400).json({message:"error"});
    } else {
        const userDelete = await User.deleteOne({email});
        const faDelete = await Fa.deleteOne({email});

        const newData = await Fa.find({});

        if(userDelete && faDelete) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'warsimuhammadowais@gmail.com',
                    pass: ' '
                }
            });
    
            var mailOptions = {
                from: 'warsimuhammadowais@gmail.com',
                to: `${email}`,
                subject: 'Application Submitted - Notification',
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
                                <h2>Your Application has Rejected</h2>
                                <p>Due to some reasons your leave application has been rejected.</p>
                                <a>Leave Ease<a/>
                            </div>
                        </body>
                    </html>
                `
            };
            
    
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            res.status(200).json({newData});
        } else {
            res.status(400).json({message:"error"});
        }
    }
})











app.listen(4000, () => {
    console.log("server started");
})