import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo_cp2_nobg.png';
import '../assets/css/SiteNavbar.css'; 
import '../App.css';

const navBtnStyle = ({
    isActive,
}: {
    isActive: boolean;
}): React.CSSProperties => ({
    backgroundColor: isActive ? "#ee5fb7" : "transparent",
    color: "#212529",
    transition: "all 0.3s",
});

const linkClassNames = ({ isActive }: { isActive: boolean }): string =>
    (isActive ? "active " : "") + "nav-link px-3 py-2 btn custom-btn";

function SiteNavbar() {
    return (
        <Navbar expand="lg" variant="light" className=" border-0 bg-0">
            <Container className="site-navbar-container align-items-center">
                {/* Logo */}
                <Navbar.Brand as={NavLink} to="/" className="fw-semibold me-auto mb-3">
                <img src={logo} alt="ISKM Logo" height="120" className="d-inline-block align-middle" />
                </Navbar.Brand>
                {/* Toggler */}
                <Navbar.Toggle aria-controls="main-nav" />
                {/* Nav Links */}
                <Navbar.Collapse id="main-nav" className="w-100">
                <Nav className="ms-auto align-items-lg-center gap-2">
                    <NavLink to="/" end className={linkClassNames} style={navBtnStyle}>Home</NavLink>
                    <NavLink to="/events" className={linkClassNames} style={navBtnStyle}>Events</NavLink>
                    { /* <NavLink to="/vaishnava-calendar" className={linkClassNames} style={navBtnStyle}>Vaishnava Calendar</NavLink> */ }
                    <NavLink to="/about-us" className={linkClassNames} style={navBtnStyle}>About Us</NavLink>
                    <NavLink to="/donate" className={linkClassNames} style={navBtnStyle}>Donate</NavLink>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SiteNavbar;
