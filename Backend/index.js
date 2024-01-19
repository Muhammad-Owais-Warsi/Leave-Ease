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
    unique: true,
  },
  register: {
    type: String,
    required: true,
    unique: true,
  },
});

const faSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  register: {
    type: String,
    required: true,
    unique: true,
  },
  form: {
    name: {
      type: String,
      required: true,
    },
    register: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dateIn: {
      type: Date,
      required: true,
    },
    dateOut: {
      type: String,
      required: true,
    },
    personalPhone: {
      type: Number,
      required: true,
    },
    parentPhone: {
      type: Number,
      required: true,
    },
  },
});

const hodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  register: {
    type: String,
    required: true,
    unique: true,
  },
  form: {
    name: {
      type: String,
      required: true,
    },
    register: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dateIn: {
      type: Date,
      required: true,
    },
    dateOut: {
      type: String,
      required: true,
    },
    personalPhone: {
      type: Number,
      required: true,
    },
    parentPhone: {
      type: Number,
      required: true,
    },
  },
});

const User = mongoose.model("User", userSchema);
const Fa = mongoose.model("Fa", faSchema);
const Hod = mongoose.model("Hod", hodSchema);

app.get("/user", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

app.post("/user/login", async (req, res) => {
  const { email, register } = req.body;

  const duplicateUser = await User.findOne({ email, register });

  if (duplicateUser) {
    res.status(400).json({ message: "error found" });
  } else {
    const newUser = await User.create({
      email: email,
      register: register,
    });

    res.status(200).json({ message: newUser });
  }
});

app.post("/form", async (req, res) => {
  try {
    const { name, email, register, form } = req.body;

    const duplicateValue = await Fa.findOne({ email });

    if (duplicateValue) {
      res.status(400).json({ message: "duplicate values found" });
    } else {
      const FaUser = await Fa.create({
        name: name,
        email: email,
        register: register,
        form: form,
      });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: primary_mail,
          pass: primary_mail_pass,
        },
      });

      const mailOptions = {
        from: primary_mail,
        to: `${email}`,
        subject: "Application Submitted",
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
            `,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("mail sent " + info);
        }
      });
      res.status(200).json({ message: FaUser });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/fa/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ message: "Repeated values found." });
  } else {
    if (
      email === "bhattacharjeedeboneil@gmail.com" &&
      password === "Iamkennys7@"
    ) {
      const data = await Fa.find({});
      if (data) {
        res.status(200).json({ message: " success", data });
      } else {
        res.status(401).json({ message: "error" });
      }
    }
  }
});

app.post("/fa/reject", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(401).json({ message: "error" });
  } else {
    const userDelete = await User.deleteOne({ email });
    const faDelete = await Fa.deleteOne({ email });

    const newData = await Fa.find({});

    if (userDelete && faDelete) {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "bhattacharjeedeboneil@gmail.com",
          pass: "hpyf xhha klgs djmy",
        },
      });

      var mailOptions = {
        from: "bhattacharjeedeboneil@gmail.com",
        to: `${email}`,
        subject: "Application Submitted - Notification",
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
                `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.status(200).json({ newData });
    } else {
      res.status(404).json({ message: "Error" });
    }
  }
});

app.post("/fa/accept", async (req, res) => {
  const { email } = req.body;

  const FaRetrieveData = await Fa.findOne({ email });
  const HodRetrieveData = await Hod.create({
    name: FaRetrieveData.name,
    email: FaRetrieveData.email,
    register: FaRetrieveData.register,
    form: FaRetrieveData.form,
  });
  const faDelete = await Fa.deleteOne({ email });
  const newData = await Fa.find({});

  if ((HodRetrieveData, newData)) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bhattacharjeedeboneil@gmail.com",
        pass: "hpyf xhha klgs djmy",
      },
    });
    const mailOptions = {
      from: "bhattacharjeedeboneil@gmail.com",
      to: `${email}`,
      subject: "Application Accepted - Notification",
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
                    <h2>Your Application has been Accepted</h2>
                    <p>Due to some reasons your leave application has been accepted.</p>
                    <a>Leave Ease<a/>
                </div>
            </body>
        </html>
    `,
    };

    transporter.sendMail(mailOptions, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("notification send " + result.response);
      }
    });
    res.status(200).json({ message: "success! mail sent" });
  } else {
    res.status(404).json({ message: "error detected" });
  }
});

app.post("/hod/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).json({ message: "error detected" });
  } else {
    if (
      email == "bhattacharjeedeboneil@gmail.com" &&
      password == "Iamkennys7@"
    ) {
      const data = await Hod.find({});
      if (data) {
        res.status(200).json({ message: "success", data });
      } else {
        res.status(401).json({ message: "error" });
      }
    }
  }
});

app.post("/hod/reject", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(404).json({ message: "error" });
  } else {
    const hodDataDelete = await Hod.deleteOne({ email: email });
    const userDataDelete = await User.deleteOne({ email: email });

    const newData = await Hod.find({});

    if (hodDataDelete && userDataDelete) {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "bhattacharjeedeboneil@gmail.com",
          pass: "hpyf xhha klgs djmy",
        },
      });

      const mailOptions = {
        from: "bhattacharjeedeboneil@gmail",
        to: `${email}`,
        subject: "Application Rejected",
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
                `,
      };

      transporter.sendMail(mailOptions, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("email sent" + result.response);
        }
      });

      res.status(200).json({ newData });
    } else {
      res.status(401).json({ message: "Invalid" });
    }
  }
});

app.listen(port, () => {
  console.log("working");
});
