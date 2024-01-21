import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer"
import QRcode from "qrcode";
import fs from "fs"

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
        },
        reason:{
            type:String,
            required:true
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
        },
        reason:{
            type:String,
            required:true
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

app.delete("/del", async (req, res) => {
    const { email } = req.body;

    const delUser = await User.deleteOne({ email });
    const faDelUser = await Fa.deleteOne({ email });
    if (delUser && faDelUser) {
        res.json({ message: "done" });
    } else {
        res.json({ message: "error" })
    }
})

app.delete("/delete", async (req, res) => {
    await User.deleteMany({});
    await Fa.deleteMany({});
    await Hod.deleteMany({});
    res.json({ message: "killed" });
})

app.post("/user/login", async (req, res) => {
    const { email, register } = req.body;

    const userExist = await User.findOne({ email });
    const faUserExist = await Fa.findOne({ email });
    const hodUserExist = await Hod.findOne({ email });

    if (userExist || faUserExist || hodUserExist) {
        res.status(400).json({ message: "User already exist" });
    } else if (userExist && (!faUserExist || !hodUserExist)) {
        const userDelete = await User.deleteOne({ email });

        const newUser = await User.create({
            email: email,
            register: register
        })
        console.log(newUser)
        res.status(200).json({ message: newUser });
    }
    else {
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
                pass: ''
            }
        });

        var mailOptions = {
            from: 'warsimuhammadowais@gmail.com',
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

app.post("/fa/reject", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ message: "error" });
    } else {
        const userDelete = await User.deleteOne({ email });
        const faDelete = await Fa.deleteOne({ email });

        const newData = await Fa.find({});

        if (userDelete && faDelete) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'warsimuhammadowais@gmail.com',
                    pass: ''
                }
            });

            var mailOptions = {
                from: 'warsimuhammadowais@gmail.com',
                to: `${email}`,
                subject: 'Application Rejected',
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
                                <h2>Your Application has been Rejected</h2>
                                <p>Due to some reasons your leave application has been rejected.By the Faculty Advisor</p>
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

            res.status(200).json({ newData });
        } else {
            res.status(400).json({ message: "error" });
        }
    }
})


app.post("/fa/approve", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ message: "error" });
    } else {

        const approvedUser = await Fa.findOne({ email });
        const faDelete = await Fa.deleteOne({ email });

        const newUser = await Hod.create({
            name: approvedUser.name,
            email: approvedUser.email,
            register: approvedUser.register,
            form: approvedUser.form
        });
        const newData = await Fa.find({});

        if (!approvedUser || !faDelete || !newUser) {
            res.status(400).json({ message: "error" });
        } else {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'warsimuhammadowais@gmail.com',
                    pass: ''
                }
            });

            var mailOptions = {
                from: 'warsimuhammadowais@gmail.com',
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
                                <h2>Your Application has been approved by Faculty Advisor</h2>
                                <p>Your application has been approved by the Faculty Advisor and is sent to the HOD</p>
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

            res.status(200).json({ newData });
        }
    }
})


app.post("/hod/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Empty fields" });
    } else {
        if (email === "warsimuhammadowais@gmail.com" && password === "") {

            const data = await Hod.find({});
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

app.post("/hod/reject", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ message: "error" });
    } else {
        const userDelete = await User.deleteOne({ email });
        const hodDelete = await Hod.deleteOne({ email });

        const newData = await Hod.find({});

        if (userDelete && hodDelete) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'warsimuhammadowais@gmail.com',
                    pass: ''
                }
            });

            var mailOptions = {
                from: 'warsimuhammadowais@gmail.com',
                to: `${email}`,
                subject: 'Application Rejected',
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
                                <h2>Your Application has been Rejected</h2>
                                <p>Due to some reasons your leave application has been rejected.By the H.O.D</p>
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

            res.status(200).json({ newData });
        } else {
            res.status(400).json({ message: "error" });
        }
    }
})

const generateQr = async (qrData, Student, timestamp) => {
    return new Promise((resolve, reject) => {
        const fileName = `../Frontend/public/${Student.name}_${timestamp}.png`;
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // Months are zero-based, so we add 1
        const day = today.getDate();

        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;
        
        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
        // Encode the HTML content as a string
        const htmlContent = `
            <div style="font-family: 'Arial', sans-serif; background-color: #f0f0f0; padding: 20px;">
                <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h2>Issue Date: ${formattedDate}</h2>
                    <h2>Student Information</h2>
                    <div>
                        <label>Name:</label>
                        <div>${Student.name}</div>
                    </div>
                    <div>
                        <label>Regsiter Number:</label>
                        <div>${Student.register}</div>
                    </div>
                    <div>
                        <label>Email:</label>
                        <div>${Student.email}</div>
                    </div>
                    <div>
                        <label>Personal Phone Number:</label>
                        <div>${Student.form.personalPhone}</div>
                    </div>
                    <div>
                        <label>Parent Phone Number:</label>
                        <div>${Student.form.parentPhone}</div>
                    </div>
                    <div>
                        <label>Reason:</label>
                        <div>A${Student.form.reason}</div>
                    </div>
                
                </div>
            </div>
        `;

        // Create a new QR code with the encoded HTML string
        QRcode.toFile(fileName, htmlContent, { errorCorrectionLevel: 'L' }, function (err) {
            if (err) {
                reject(err);
            } else {
                // Read the updated QR code image and encode it as a Data URI
                const updatedDataUri = fs.readFileSync(fileName, { encoding: 'base64' });
                const dataUriString = `data:image/png;base64,${updatedDataUri}`;
                resolve(dataUriString);
            }
        });
    });
};








app.post("/hod/approve", async (req, res) => {

    const { email } = req.body;

    if (!email) {
        res.status(400).json({ message: "error" });
    } else {
        const Student = await Hod.findOne({ email });
        const timestamp = new Date().getTime(); 
        const qrData = JSON.stringify(Student.form);
        generateQr(qrData, Student ,timestamp)
            .then((dataUri) => {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'warsimuhammadowais@gmail.com',
                        pass: ''
                    }
                });

                var mailOptions = {
                    from: 'warsimuhammadowais@gmail.com',
                    to: `${email}`,
                    subject: 'Application Confirmed',
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
                                <h2>Your Application has been Confirmed</h2>
                                <p>We have reviwed your leave application and confirmed it.</p>
                                
                                <a>Leave Ease<a/>
                        </div>
                        </body>
                    </html>
                `,
                    attachments: [
                        {
                            filename: `${Student.name}.png`,
                            path: `../Frontend/Public/${Student.name}_${timestamp}.png`,
                            cid: 'qrCodeImage123' // Provide a unique CID
                        }
                    ]
                };


                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });


            })
        const userDelete = await User.deleteOne({ email });
        const hodDelete = await Hod.deleteOne({ email });

        const newData = await Hod.find({});
        res.status(200).json({ newData });



    }
})







app.listen(4000, () => {
    console.log("server started");
})