import { Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/css/carousal.css";
import c1 from "../assets/images/carousalImage1.jpg";
import c2 from "../assets/images/carousalImage2.jpg";
import c3 from "../assets/images/carousalImage3.jpg";
import { Section } from "../components/Section";
import annadanamImage from "../assets/images/annadanam.jpg";
import youthLearningImage from "../assets/images/youthLearning.jpg";
import aanadanamImage2 from "../assets/images/aanadanam2.jpg";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchPublicContent, getImageSrc } from "../services/contentService";

const slides = [
    {
        title: "Come Closer to Kṛṣṇa",
        description:
            "Discover knowledge, devotion, and association that transform your life.",
        imageSrc: c1,
    },
    {
        title: "Upcoming Events",
        description:
            "Join us for festivals, events, and spiritual gatherings that bring you closer to Kṛṣṇa",
        imageSrc: c2,
        buttonHref: "/events",
        buttonText: "Explore Events",
    },
    {
        title: "Support Śrīla Prabhupāda’s Mission",
        description:
            "Contribute with love and help us expand Kṛṣṇa consciousness in the community",
        imageSrc: c3,
        buttonHref: "/donate#seva-options",
        buttonText: "Offer Your Seva",
    },
];

const activities = [
    {
        title: "Nitya Anna Prasadam Seva",
        previewText:
            "Every single day, devotees and visitors receive free sanctified vegetarian meals (prasadam) prepared with great care and devotion.",
        imageSrc: annadanamImage,
        imageAlt: "Nitya Anna Prasadam Seva",
        quote: "Distributing Krishna-prasadam is distributing mercy itself.",
        fullText:
            "Every single day, devotees and visitors receive free sanctified vegetarian meals (prasadam) prepared with great care and devotion. Supporting this seva allows the temple to continue feeding hundreds daily — spreading Krishna’s compassion to every heart.",
    },
    {
        title: "Sunday Feast Seva",
        previewText:
            "A weekly festival of devotion, kirtan, and prasadam. By sponsoring this feast, you help share the bliss of Krishna consciousness with devotees, guests, and newcomers every Sunday.",
        imageSrc: aanadanamImage2,
        imageAlt: "Sunday Feast Seva",
        quote: "A weekly festival of devotion, kirtan, and prasadam.",
        fullText:
            "The Sunday Feast Program is the most joyful day of the week at ISKM Proddatur — filled with melodious kirtan, inspiring discourses, and delicious prasadam. By sponsoring this feast, you help share the bliss of Krishna consciousness with devotees, guests, and newcomers every Sunday.",
    },
    {
        title: "Youth Empowerment Seva",
        previewText:
            "Empower young souls with Krishna consciousness. Through satsangs, retreats, and training sessions, we nurture spiritual values and devotion in young hearts.",
        imageSrc: youthLearningImage,
        imageAlt: "Youth Empowerment Seva",
        quote: "Empower young souls with Krishna consciousness.",
        fullText:
            "Our Youth Empowerment Seva aims to guide students and young professionals to live a pure, purposeful, and Krishna-centered life. Through sanctified vegetarian meals, satsangs, retreats, and training sessions, we nurture spiritual values, discipline, and bhakti in young hearts — preparing them to lead meaningful lives rooted in devotion.",
    },
];

const Carousal: React.FC = () => {
    return (
        <Container className="carousel-container">
            <Carousel
                interval={5000}
                controls={true}
                indicators={true}
                className="custom-carousel bg-white rounded shadow-sm position-relative "
                slide={true}
                fade={false}
                pause={false}
            >
                {slides.map((slide, index) => (
                    <Carousel.Item key={index} className="carousel-slide">
                        <div className="slide-content text-center flex-column align-items-center">
                            <img src={slide.imageSrc} alt={slide.title}></img>
                            <Carousel.Caption>
                                <h2 className="display-5 fw-bold mb-3">
                                    {slide.title}
                                </h2>
                                <p
                                    className="lead mx-auto"
                                    style={{ maxWidth: "600px" }}
                                >
                                    {slide.description}
                                </p>
                                {slide.buttonText && (
                                    <Link
                                        to={slide.buttonHref}
                                        className="btn custom-btn-pink blur"
                                    >
                                        {slide.buttonText}
                                    </Link>
                                )}
                            </Carousel.Caption>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
};

export default function Home() {
    const donationContent = [
        {
            title: "Your support makes a difference!",
            text: "Your generous donations help us continue our work and serve the community. Join us in making a difference. Your support enables us to expand our programs, maintain our facilities, and reach more individuals with our message of devotion and service.",
        },
        {
            title: "Why Donate?",
            text: (
                <>
                    Your contribution directly funds food distribution, youth
                    programs and other Seva initiatives. For queries,{" "}
                    <a href="/contact">contact us</a>.
                </>
            ),
        },
    ];

    const [sevaEvents, setSevaEvents] = useState(activities);
    const [festivalEvents, setFestivalEvents] = useState<any[]>([]);

    useEffect(() => {
        const loadContent = async () => {
            const data = await fetchPublicContent(["SEVA", "FESTIVAL"], 3);
            if (data && data.length > 0) {
                const sevas = data
                    .filter((item) => item.type === "SEVA")
                    .map((item) => ({
                        title: item.title,
                        previewText: item.previewText || "",
                        fullText: item.fullText || "",
                        quote: item.quote || "",
                        imageSrc: getImageSrc(item.images?.[0]) || "",
                        imageAlt: item.title,
                        linkHref: "/events",
                        linkText: "View All Sevas",
                    }));

                const festivals = data
                    .filter((item) => item.type === "FESTIVAL")
                    .map((item) => ({
                        title: item.title,
                        previewText: item.previewText || "",
                        fullText: item.fullText || "",
                        quote: item.quote || "",
                        imageSrc: getImageSrc(item.images?.[0]) || "",
                        imageAlt: item.title,
                        linkHref: "/events",
                        linkText: "View All Festivals",
                        startDate: item.showFromDate,
                        endDate: item.showToDate,
                    }));

                setSevaEvents(sevas ? sevas : activities);
                setFestivalEvents(festivals);
            }
        };
        loadContent();
    }, []);

    return (
        <div>
            <Carousal />

            {/* Festival Preview Section */}
            {festivalEvents.length > 0 && (
                <Section
                    title="Upcoming Festivals"
                    subtitle="Join us in celebrating our major festivals with devotion and joy."
                    cards={festivalEvents}
                    backgroundType="white"
                    className="festivals-section"
                    showLink={false}
                    linkHref="/events"
                    linkText="View All Festivals"
                    donate={true}
                    donateText="Donate for Festival"
                    type="Custom"
                />
            )}

            {/* Custom Donation Section */}
            <Section
                title="Support Śrīla Prabhupāda’s Mission"
                subtitle="Your generous donations help us continue our work and serve the community."
                content="Join us in making a difference. Your support enables us to expand our programs, maintain our facilities, and reach more individuals with our message of devotion and service."
                backgroundType="blue"
                className="donation-section"
                showLink={false}
                donate={true}
                donateText="Support Us"
                linkHref="/donate#get-in-touch"
                linkText="Join Seva Programs"
                type="TextOnly"
                bodyElement={
                    <div className="donation-cards-container">
                        {donationContent.map((item, index) => (
                            <Card key={index} className="donation-card">
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text className="t-center">
                                        {item.text}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                }
            />

            {/* Activities Preview Section */}
            <Section
                title="Seva Programs"
                subtitle="Discover the various activities we offer to engage with our community."
                cards={sevaEvents}
                backgroundType="white"
                className="events-section"
                showLink={false}
                linkHref="/events"
                linkText="View All Sevas"
                donate={true}
                donateText="Join Our Cause"
                type="Custom"
            />
        </div>
    );
}
