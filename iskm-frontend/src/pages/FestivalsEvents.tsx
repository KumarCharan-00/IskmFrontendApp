import { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Section } from "../components/Section";
import { SkeletonCarousel } from "../components/SkeletonCarousel";
import "../assets/css/events.css";
import "../assets/css/carousal.css";
import { fetchPublicContent, getImageSrc } from "../services/contentService";

function FestivalsEvents() {
    const [festivalEvents, setFestivalEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
                const data = await fetchPublicContent(["FESTIVAL"]);
                if (data && data.length > 0) {
                    const festivals = data
                        .filter((item: any) => item.type === "FESTIVAL")
                        .map((item: any) => ({
                            title: item.title,
                            previewText: item.previewText || "",
                            fullText: item.fullText || "",
                            quote: item.quote || "",
                            imageSrc: getImageSrc(item.images?.[0]) || "",
                            imageAlt: item.title,
                            linkHref: "/donate#seva-options",
                            linkText: "Support Us",
                            startDate: item.showFromDate,
                            endDate: item.showToDate,
                            type: item.type,
                        }));
                    setFestivalEvents(festivals);
                }
            } finally {
                setLoading(false);
            }
        };
        loadContent();
    }, []);

    let index = 0;
    const alternateColors = (index: number) => {
        return index % 2 === 0 ? "pink" : "white";
    };

    const firstFestival = festivalEvents.length > 0 ? festivalEvents[0] : null;
    const remainingFestivals = festivalEvents.slice(1);

    return (
        <div className="events-page d-flex flex-column" style={{ minHeight: "80vh" }}>
            <div className="flex-grow-1 d-flex flex-column">
                {loading ? (
                    <>
                        <SkeletonCarousel />
                        <Section
                            title=""
                            showTitle={false}
                            loading={true}
                            loadingCount={2}
                            backgroundType={alternateColors(index++)}
                            className="festivals-section"
                            showLink={false}
                            type="Custom"
                        />
                    </>
                ) : festivalEvents.length === 0 ? (
                    <div className="text-center my-auto py-5">
                        <h2 className="display-6 text-muted mb-3">No Upcoming Festivals</h2>
                        <p className="lead text-muted">Please check back later for updates on our festivals and events.</p>
                    </div>
                ) : (
                    <>
                        {firstFestival && (
                            <Container className="carousel-container mb-5 mt-4">
                                <Carousel
                                    interval={5000}
                                    controls={true}
                                    indicators={true}
                                    className="custom-carousel bg-white rounded shadow-sm position-relative "
                                    slide={true}
                                    fade={false}
                                    pause={false}
                                >
                                    <Carousel.Item className="carousel-slide">
                                        <div className="slide-content text-center flex-column align-items-center">
                                            {firstFestival.imageSrc && (
                                                <img src={firstFestival.imageSrc} alt={firstFestival.title} />
                                            )}
                                            <Carousel.Caption>
                                                <h2 className="display-5 fw-bold mb-3">
                                                    {firstFestival.title}
                                                </h2>
                                                <p
                                                    className="lead mx-auto"
                                                    style={{ maxWidth: "600px" }}
                                                >
                                                    {firstFestival.previewText || firstFestival.fullText}
                                                </p>
                                                {firstFestival.linkText && (
                                                    <Link
                                                        to={firstFestival.linkHref}
                                                        className="btn custom-btn-pink blur"
                                                    >
                                                        {firstFestival.linkText}
                                                    </Link>
                                                )}
                                            </Carousel.Caption>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </Container>
                        )}

                        {remainingFestivals.length > 0 && (
                            <Section
                                title=""
                                showTitle={false}
                                cards={remainingFestivals}
                                backgroundType={alternateColors(index++)}
                                className="festivals-section"
                                showLink={false}
                                type="Custom"
                            />
                        )}
                    </>
                )}
            </div>
            
            <Section
                title="Donate & Participate in Divine Seva"
                subtitle={
                    <em className="hero-subtitle">
                        <i>
                            Whatever you give, whatever you offer, do it as an
                            offering to Me.
                        </i>
                        <span className="text-end d-block">
                            — Lord Sri Krishna (Bhagavad-gītā 9.27)
                        </span>
                    </em>
                }
                backgroundType="blue"
                className="events-donate-section my-0"
                showLink={false}
                type="TextOnly"
                bodyElement={
                    <div className="htl-txt-ct-1 mt-4">
                        <p className="htl-txt-ct-placeholder-1">
                            At <strong>ISKM Proddatur</strong>, every act of
                            charity becomes an act of devotion — a sacred
                            service (<em>seva</em>) to
                            <strong>
                                {" "}
                                Sri Sri Radha Madan Mohan, Sri Sri Jagannath
                                Baladev Subhadra, and Sri Sri Nitay Gaura Sundar
                            </strong>
                            . Your contributions directly support temple
                            activities that nourish souls, spread knowledge, and
                            glorify the Supreme Lord.
                        </p>
                    </div>
                }
                donate={false}
                donateText="Support and Seva Donation"
                linkHref="/donate#seva-options"
                linkText="Support Our Mission"
            />
        </div>
    );
}

export default FestivalsEvents;
