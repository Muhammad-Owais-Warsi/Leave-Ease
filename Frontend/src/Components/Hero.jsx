import "../Styles/Hero.css"
import "../Styles/Root.css"
import {Link} from "react-router-dom"
// import Cursor from "./CustomCursor.jsx"

export default function Hero() {
    return (
        <div className="hero">
           
            <div className="hero-text">
                <div className="leave">Leave Ease</div>
                
            </div>
            <div className="hero-btn">
                <Link to="/UserLogin">
                    <button>Take Leave</button>
                </Link>
            </div>
        </div>
    )
}