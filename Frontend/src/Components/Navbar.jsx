import React from "react";
import  { Link }  from "react-router-dom";
import "./CustomCursor.jsx"
import "../Styles/Navbar.css";
import "../Styles/Root.css";
// import Cursor from "./CustomCursor.jsx";

export default function Navbar() {
    return (
        
        <div className="navbar">
            
            <div className="nav-items">
                <ul>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/FA">
                            F.A
                        </Link>
                    </li>
                    <li>
                        <Link to="/HOD">
                            H.O.D
                        </Link>
                    </li>
                    <li>
                        <a href="#ABOUT">About</a>
                    </li>
                    <li>
                        <a href="#CONTACT">Contact</a>
                    </li>

                </ul>
            </div>
        </div>
    );
}
