import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

import "../Styles/UserLogin.css";
import "../Styles/Root.css";

export default function UserLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [register, setRegister] = useState("");


    const submit = async () => {
        if (!email || !register) {
            toast.error("Fill up all fields");
        } else {
            const loadingNotification = toast.loading("Submitting...");

            try {
                await FormSubmission();

                setTimeout(() => {
                    toast.dismiss(loadingNotification);
                }, 1000);

                // Show the success notification after 1 second
                setTimeout(() => {
                    toast.success("Form submitted successfully!", {
                        icon: '✅',
                    });
                }, 2000);

                // Navigate to "/Form" after 2 seconds
                setTimeout(() => {
                    navigate("/Form");
                }, 3000);
            } catch (error) {
                toast.dismiss(loadingNotification);
                toast.error("Submission failed. Please try again.");
            }
        }
    };

    const FormSubmission = async () => {
        await axios.post("http://localhost:4000/user/login", {
            email: email,
            register: register,
        });
    };

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="container">
                <div>
                    <Link to="/">
                        <a className="back">Back to Home</a>
                    </Link>
                </div>
                <div className="login">
                    <div className="login-head">Login</div>
                    <div className="email">
                        <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                        <div className="email-head">Email <span style={{ color: "red" }}>*</span></div>
                    </div>

                    <div className="registerNo">
                        <input type="text" required onChange={(e) => setRegister(e.target.value)} />
                        <div className="registerNo-head">Registration Number <span style={{ color: "red" }}>*</span></div>
                    </div>
                    <button className="btn" onClick={submit}>
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}
