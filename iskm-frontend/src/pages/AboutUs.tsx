import { Container, Row, Col } from "react-bootstrap";
import { Section } from "../components/Section";
import "../assets/css/about-us.css";
import {
    FaInstagram,
    FaYoutube,
    FaPhoneAlt,
    FaEnvelope,
    FaWhatsapp,
} from "react-icons/fa";

const contactCards = [
    {
        title: "Contact Details",
        previewText: (
            <div className="text-dark">
                <div className="mb-4">
                    <h6 className="text-black">
                        <FaEnvelope className="me-2" /> Email
                    </h6>
                    <a
                        href="mailto:iskmproddutur@gmail.com"
                        className="text-pink fw-bold text-decoration-none"
                    >
                        iskmproddutur@gmail.com
                    </a>
                </div>
                <div className="mb-0">
                    <h6 className="text-black">
                        <FaPhoneAlt className="me-2" /> Phone Numbers
                    </h6>
                    <div className="">
                        <div>+91 62814 69214</div>
                        <div>+91 93900 64180</div>
                        <div>+91 90526 29052</div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Social Media",
        previewText: (
            <div className="text-dark">
                <div className="mb-4">
                    <h6 className="text-black">
                        <FaWhatsapp className="me-2" /> WhatsApp
                    </h6>
                    <a
                        href="https://wa.me/917893636462"
                        className="text-pink fw-bold text-decoration-none"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        +91 62814 69214
                    </a>
                </div>
                <div className="mb-4">
                    <h6 className="text-black">
                        <FaInstagram className="me-2" /> Instagram
                    </h6>
                    <a
                        href="https://instagram.com/iskm.proddatur"
                        className="text-pink fw-bold text-decoration-none"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        iskm.proddatur
                    </a>
                </div>
                <div className="mb-4">
                    <h6 className="text-black">
                        <FaYoutube className="me-2" /> YouTube
                    </h6>
                    <a
                        href="https://youtube.com/@ISKMProddatur"
                        className="text-pink fw-bold text-decoration-none"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        @ISKMProddatur
                    </a>
                </div>
            </div>
        ),
    },
];

function AboutUs() {
    return (
        <div className="about-us-page">
            {/* Hero Section */}
            <section className="about-hero">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10}>
                            <div className="section-content text-center">
                                <h1 className="section-title mb-4">
                                    About ISKM Proddatur
                                </h1>
                                <p className="section-content">
                                    Hare Krishna! Welcome to ISKM Proddatur, a
                                    branch of the International Sri Krishna
                                    Mandir (ISKM) — a worldwide movement
                                    dedicated to spreading the timeless
                                    teachings of Lord Sri Krishna, as presented
                                    by His Divine Grace A. C. Bhaktivedanta
                                    Swami Srila Prabhupada, the Founder-Ācārya
                                    of the Hare Krishna Movement World-Wide.
                                </p>
                                <div className="htl-txt-ct-1 mt-4">
                                    <p className="htl-txt-ct-placeholder-1">
                                        Situated Opp. RTC Bus Stand, Mydukur
                                        Road, Proddatur, Andhra Pradesh, ISKM
                                        Proddatur stands as a vibrant center of
                                        spiritual learning, devotion, and
                                        service. The temple is home to our
                                        beloved Deities —{" "}
                                        <em>
                                            Sri Sri Radha Madan Mohan, Sri Sri
                                            Jagannath Baladev Subhadra, and Sri
                                            Sri Nitay Gaura Sundar
                                        </em>
                                        , who bestow Their divine mercy upon all
                                        who visit.
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Mission Section */}
            <Section
                title="Our Mission"
                subtitle="At ISKM Proddatur, we are dedicated to fostering a loving and inclusive community centered around the teachings of Lord Krishna."
                content="Our mission is to spread the message of
                                Lord Sri Krishna as taught in
                                Bhagavad-gita and Śrīmad-Bhāgavatam —
                                guiding souls toward a life of devotion,
                                peace, and spiritual fulfillment.
                                Following the real instructions of Srila
                                Prabhupada, ISKM Proddatur is committed to
                                preserving the purity of the original
                                Krishna consciousness movement."
                backgroundType="white"
                className="mission-section"
                type="TextOnly"
            />

            {/* Inspiration Section */}
            <Section
                title="Our Inspiration"
                subtitle=""
                content="ISKM Proddatur functions under the
                                    guidance of HG Sunadar Gopal Das (Senior
                                    Mentor ISKM Worldwide) and we have our
                                    ISKM Headquarters at Singapore, and
                                    continues to operate in strict accordance
                                    with the pure teachings of Srila
                                    Prabhupada — without deviation or change.
                                    Our humble endeavor is to create a divine
                                    atmosphere where every soul can connect
                                    with Krishna and experience true spiritual
                                    happiness."
                backgroundType="pink"
                className="inspiration-section"
                type="TextOnly"
            />

            {/* Visit Us Section */}
            <Section
                title="Visit Us"
                content="We warmly invite you, your family, and friends
                                to visit our temple, participate in our
                                programs, and experience the joy of
                                bhakti-yoga. Let us together chant, serve, and
                                spread the holy names of the Lord —"
                backgroundType="white"
                className="mb-0"
                bodyElement={
                    <div className="mantra-box">
                        <p className="mantra-text">
                            Hare Krishna, Hare Krishna, Krishna Krishna, Hare
                            Hare <br />
                            Hare Rama, Hare Rama, Rama Rama, Hare Hare.
                        </p>
                    </div>
                }
                type="TextOnly"
            />
            {/* Contact Information Section */}
            <Section
                title="Contact Us"
                subtitle="You can reach out to us through the following channels for any inquiries or to offer your support."
                backgroundType="blue"
                className="contact-info-section mb-0 pb-0"
                type="Bootstrap"
                cards={contactCards}
            />
        </div>
    );
}

export default AboutUs;
