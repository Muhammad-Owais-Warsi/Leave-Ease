import "../Styles/Root.css";
import "../Styles/Form.css";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function Form() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [register, setRegister] = useState("");
    const [dateOut, setDateOut] = useState("");
    const [dateIn, setDateIn] = useState("");
    const [personalPhone, setPersonalPhone] = useState();
    const [parentPhone, setParentPhone] = useState();


    const Onsubmit = async () => {
        if (!name || !email || !register || !dateIn || !dateOut || !personalPhone || !parentPhone) {
            toast.error("Fill up all Fields");
        } else {
            const loadingNotification = toast.loading("Submitting...");

            try {
                await AppForm();

                setTimeout(() => {
                    toast.dismiss(loadingNotification);
                },1000);

                setTimeout(() => {
                    toast.success("Form submitted successfully!", {
                        icon: '✅',
                    });
                },2000)

                setTimeout(() => {
                    navigate("/");
                },3000)
            } catch (error) {
                toast.dismiss(loadingNotification);
                toast.error("Submission failed. Please try again.");
            }
        }
    };

    const AppForm = async () => {
        try {
            await axios.post("http://localhost:3000/form", {
                name: name,
                email: email,
                register: register,
                form: {
                    name: name,
                    register: register,
                    email: email,
                    dateIn: dateIn,
                    dateOut: dateOut,
                    personalPhone: personalPhone,
                    parentPhone: parentPhone,
                },
            });
        } catch (error) {
            console.error("Form submission error:", error);
            throw error;
        }
    };

    return (
        <div className="form-container">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="form-head">Leave Application</div>
            <div className="form-main">
                <div className="name-container" style={{ marginBottom: "15px" }}>
                    <input type="text" className="form" required onChange={(e) => setName(e.target.value)} />
                    <div className="name-head fh">Name <span>*</span></div>
                </div>
                <div className="register-container" style={{ marginBottom: "15px" }}>
                    <input type="text" className="form" required onChange={(e) => setRegister(e.target.value)} />
                    <div className="register-head fh">Registeration Number <span>*</span></div>
                </div>
                <div className="email-container" style={{ marginBottom: "15px" }}>
                    <input type="email" className="form" required onChange={(e) => setEmail(e.target.value)} />
                    <div className="email-head fh" style={{ position: "relative", left: "-2px" }}>Email <span>*</span></div>
                </div>
                <div className="date-container" style={{ marginBottom: "15px" }}>
                    <div className="date-in" style={{ marginLeft: "95px" }}>
                        <input type="date" className="form" style={{ width: "117%" }} required onChange={(e) => setDateIn(e.target.value)} />
                        <div className="date-in-head fh">Date-Out <span>*</span></div>
                    </div>
                    <div className="date-out" style={{ position: "relative", left: "67px" }}>
                        <input type="date" className="form" style={{ width: "117%" }} required onChange={(e) => setDateOut(e.target.value)} />
                        <div className="date-out-head fh">Date-In <span>*</span></div>
                    </div>
                </div>
                <div className="contact-container" style={{ marginBottom: "15px" }}>
                    <div className="personal-contact" style={{ marginLeft: "95px", position: "relative", left: "91px" }}>
                        <input type="number" className="form" style={{ width: "79%" }} required onChange={(e) => setPersonalPhone(e.target.value)} />
                        <div className="personal-contact-head fh">Personal Phone <span>*</span></div>
                    </div>
                    <div className="parent-conatct" style={{ position: "relative", left: "67px" }}>
                        <input type="number" className="form" style={{ width: "79%" }} required onChange={(e) => setParentPhone(e.target.value)} />
                        <div className="parent-contact-head fh">Parent Phone <span>*</span></div>
                    </div>
                </div>
                <div className="submit-btn">
                    <button className="submit" onClick={Onsubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}