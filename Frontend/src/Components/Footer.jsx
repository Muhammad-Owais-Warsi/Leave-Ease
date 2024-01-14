import "../Styles/Footer.css"

export default function Footer() {
    return (
        <div className="footer-section" id="CONTACT">
            <div className="footer-contact">
                <div className="phone">
                    <i class="fa-solid fa-phone"  style={{fontSize:"27px",position:"relative",left:"-3px"}}></i>
                    <div className="phoneTo"> +91 1122334455</div>
                </div>
                <div className="about-email">
                    <i class="fa-solid fa-envelope"  style={{fontSize:"27px"}}></i>
                    <div className="mailTo"><a href="mailto:abc@gmail.com">abc@gmail.com</a></div>
                </div>
            </div>
            <div className="footer-about">
                <div className="footer-about-desc">
                    <div className="footer-about-head">
                        About Us
                    </div>
                    <div className="footer-head-description" style={{fontSize:"19px"}}>
                        We are currently undergrads and pursuing our B.Tech from SRM Ramapuram.<br />Passionate about creating and solving real world problems.

                    </div>
                </div>
                <div className="footer-about-contribute">
                    <i class="fa-brands fa-github" style={{fontSize:"27px"}}></i>
                    <a href="https://github.com/Muhammad-Owais-Warsi/Leave-Ease" style={{padding:"12px",position:"relative",top:"-4px"}}> Contribute to our Projects</a>
                </div>
            </div>
        </div>

    )
}