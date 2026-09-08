import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import FestivalsEvents from "./pages/FestivalsEvents";
import Sevas from "./pages/Sevas";
import AboutUs from "./pages/AboutUs";
import DonatePage from "./pages/DonatePage";
import "./assets/css/common.css";
import "./App.css";

import ScrollToTop from "./components/ScrollToTop";

function App() {
    return (
        <div className="App container-fluid px-0 d-flex flex-column min-vh-100">
            <ScrollToTop />
            <SiteNavbar />
            <Container className="body-container px-0">
                <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/activities" element={<Activities />} />
                        <Route path="/festivals-events" element={<FestivalsEvents />} />
                        <Route path="/sevas" element={<Sevas />} />
                        {/* <Route path="/vaishnava-calendar" element={<VaishnavaCalendar />} /> */}
                        {/* <Route path="" element={<Blogs />} /> */}
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/donate" element={<DonatePage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Container>
            <SiteFooter />
        </div>
    );
}

export default App;
