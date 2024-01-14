import "../Styles/About.css"

export default function About() {
    return (
        <div className="about" id="ABOUT">
            <div className="about-head">
                What is Leave Ease <span style={{ color: "rgb(53, 135, 243)" }} className="question-mark">?</span>
            </div>
            <div className="about-main">
                <div className="about-desc">
                    "LeaveEase: Your Seamless Break Solution" is a user-friendly leave application platform designed for college students.
                    Streamline your leave request process with our intuitive interface, allowing you to effortlessly submit, track, and manage your leave applications.
                    LeaveEase ensures a hassle-free experience, enabling students to focus on their academic journey while easily coordinating their temporary breaks.
                    With efficient communication channels and real-time status updates, students can stay informed about the progress of their leave requests.
                    Experience a smooth transition between academic and personal commitments with LeaveEase, your trusted companion for managing college leaves effortlessly.
                    Simplify your college life today with LeaveEase.
                </div>
                <div className="about-img">
                    <img src="../Public/Photos/leave2.png" alt="logo" />
                </div>
            </div>
        </div>
    )
}