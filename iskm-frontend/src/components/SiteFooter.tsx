import { FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo_cp2_nobg.png";
import "../assets/css/SiteFooter.css";

function SocialIcon({
    href,
    children,
    label,
}: {
    href: string;
    children: React.ReactNode;
    label: string;
}) {
    return (
        <a
            href={href}
            aria-label={label}
            className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white border text-dark me-2 text-muted"
            style={{
                width: 40,
                height: 40,
                textDecoration: "none",
                transition: "all 0.3s",
            }}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f9fa")}
            onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
            }
        >
            {children}
        </a>
    );
}

function SiteFooter() {
    return (
        <footer className="pt-4 pb-2 bg-color-light-pink">
            <div className="site-footer-container">
                <div className="d-flex flex-column flex-lg-row">
                    {/* Left Section */}
                    <div className="align-items-center justify-content-center footer-bottom px-3">
                        <nav className="mb-4 my-4 d-flex flex-wrap gap-3">
                            <NavLink to="/activities" className="medium color-blue">
                                Activities
                            </NavLink>
                            {/*<NavLink
                                to="/vaishnava-calendar"
                                className="medium color-blue"
                                Vaishnava Calendar
                            </NavLink> */}
                            <NavLink
                                to="/about-us"
                                className="medium color-blue"
                            >
                                About Us
                            </NavLink>
                            <a
                                href="https://prabhupadabooks.store/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="medium color-blue"
                                style={{ textDecoration: "none" }}
                            >
                                Books
                            </a>
                            <NavLink
                                to="/donate#get-in-touch"
                                className="medium color-blue"
                            >
                                Contact Us
                            </NavLink>
                        </nav>

                        <NavLink
                            to="/donate#seva-options"
                            className="btn mb-5 custom-btn-pink"
                        >
                            Make a Donation
                        </NavLink>

                        <div className="d-flex gap-2">
                            <SocialIcon
                                href="https://wa.me/917893636462"
                                label="WhatsApp"
                            >
                                <FaWhatsapp />
                            </SocialIcon>
                            <SocialIcon
                                href="https://instagram.com/iskm.proddatur"
                                label="Instagram"
                            >
                                <FaInstagram />
                            </SocialIcon>
                            {/* <SocialIcon href="#" label="X">
                                <FaTwitter />
                            </SocialIcon> */}
                            <SocialIcon
                                href="https://youtube.com/@ISKMProddatur"
                                label="YouTube"
                            >
                                <FaYoutube />
                            </SocialIcon>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="text-lg-end">
                        <div className="mb-4">
                            <p className="small mt-lg-4 mb-2">
                                Panduranga Swamy Temple, Mydukur Road
                            </p>
                            <p className="small mb-2">
                                Proddatur, Andhra Pradesh - 516360
                            </p>
                            <p className="small mb-2">WhatsApp : +91 7893636462</p>
                            <p className="small mb-2">Call : +91 6281469214</p>
                            <p className="small mb-0">
                                <a
                                    href="mailto::iskmproddutur@gmail.com"
                                    className="medium color-blue"
                                >
                                    iskmproddutur@gmail.com
                                </a>
                            </p>
                        </div>

                        <img
                            src={logo}
                            alt="ISKM Logo"
                            height="120"
                            className="logo d-inline-block align-middle"
                        />
                    </div>
                </div>
                <div className="d-flex mt-3 mb-1 gap-4 small justify-content-center align-items-center">
                    <p className="mb-0 text-muted">All Rights Reserved 2024</p>
                    <a
                        href="#terms"
                        className="text-muted"
                        style={{ textDecoration: "none" }}
                    >
                        Terms &amp; Conditions
                    </a>
                    <a
                        href="#privacy"
                        className="text-muted"
                        style={{ textDecoration: "none" }}
                    >
                        Privacy Policy
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default SiteFooter;
