import { Link } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import axios from "axios";
import "../Styles/FaLogin.css"
import "../Styles/Root.css"


export default function HodLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const Fasubmit = async () => {
        if (!email || !password) {
            toast.error("Fill up all Fields");
        } else {
            const loadingNotification = toast.loading("Submitting...");

            try {
                await AppForm();

                setTimeout(() => {
                    toast.dismiss(loadingNotification);
                }, 1000);

                setTimeout(() => {
                    toast.success("Form submitted successfully!", {
                        icon: '✅',
                    });
                }, 2000)

                setTimeout(() => {
                    navigate("/");
                }, 3000)
            } catch (error) {
                toast.dismiss(loadingNotification);
                toast.error("Submission failed. Please try again.");
            }
        }
    };


    const AppForm = async () => {
        try {
            await axios.post("http://localhost:4000/fa/login", {

                email: email,
                password: password,

            });
        } catch (error) {
            console.error("Form submission error:", error);
            throw error;
        }
    };









    return (
        <div className="container">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div>
                <Link to="/">
                    <a className="back">Back to Home</a>
                </Link>
            </div>
            <div className="login">
                <div className="login-head">
                    Login
                </div>
                <div className="email">
                    <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                    <div className="email-head">Email <span style={{ color: "red" }}>*</span></div>
                </div>

                <div className="password">
                    <input type="password" required onChange={(e) => setPassword(e.target.value)} />

                    <div className="password-head" style={{ position: "relative", left: "7px" }}>Password <span style={{ color: "red" }}>*</span></div>
                </div>

                <button className="btn" onClick={Fasubmit}>Login</button>


            </div>
        </div>
    )
}