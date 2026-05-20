import { useEffect, useState } from "react";
import { Section } from "../components/Section";
import "../assets/css/events.css";
import { fetchPublicContent, getImageSrc } from "../services/contentService";

function FestivalsEvents() {
    const [festivalEvents, setFestivalEvents] = useState<any[]>([]);

    useEffect(() => {
        const loadContent = async () => {
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
        };
        loadContent();
    }, []);

    let index = 0;
    const alternateColors = (index: number) => {
        return index % 2 === 0 ? "pink" : "white";
    };

    return (
        <div className="events-page">
            {festivalEvents.length > 0 && (
                <Section
                    title="Festivals & Events"
                    subtitle="Join us in celebrating our major festivals with devotion and joy"
                    cards={festivalEvents}
                    backgroundType={alternateColors(index++)}
                    className="festivals-section"
                    showLink={false}
                    type="Custom"
                />
            )}
            
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
