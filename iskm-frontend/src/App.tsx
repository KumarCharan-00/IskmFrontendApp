import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";
import Home from "./pages/Home";
import Events from "./pages/Events";
import AboutUs from "./pages/AboutUs";
import DonatePage from "./pages/DonatePage";
import "./assets/css/common.css";
import "./App.css";

import ScrollToTop from "./components/ScrollToTop";

function App() {
    return (
        <div className="App container">
            <ScrollToTop />
            <SiteNavbar />
            <div className="d-flex flex-column align-items-center min-vh-100">
                <Container className="body-container flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/events" element={<Events />} />
                        {/* <Route path="/vaishnava-calendar" element={<VaishnavaCalendar />} /> */}
                        {/* <Route path="" element={<Blogs />} /> */}
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/donate" element={<DonatePage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Container>
            </div>
            <SiteFooter />
        </div>
    );
}

export default App;
