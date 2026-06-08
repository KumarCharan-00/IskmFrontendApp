import { useEffect, useState } from "react";
import { Section } from "../components/Section";
import "../assets/css/events.css";
import bookDistImage from "../assets/images/BhagavadGita.png";
import prasadamImage from "../assets/images/annadanam.jpg";
import sankirtanImage from "../assets/images/JayaVijaya.png";
import sessionsImage from "../assets/images/PrabhupadReading.webp";
import festivalsImage from "../assets/images/MainIdol.png";
import youthImage from "../assets/images/youthLearning.jpg";
import feastImage from "../assets/images/aanadanam2.jpg";
import { fetchPublicContent, getImageSrc } from "../services/contentService";

const activitiesCards = [
    {
        imageSrc: bookDistImage,
        imageAlt: "Book Distribution",
        title: "Book Distribution",
        previewText:
            "Distributing Transcendental knowledge through Srila Prabhupada's books",
    },
    {
        imageSrc: prasadamImage,
        imageAlt: "Prasadam Distribution",
        title: "Prasadam Distribution",
        previewText:
            "Serving Krishna Prasadam (sanctified vegetarian food) to everyone",
    },
    {
        imageSrc: sankirtanImage,
        imageAlt: "Nagara Sankirtan",
        title: "Nagara Sankirtan",
        previewText: "Congregational chanting of the holy names in the streets",
    },
    {
        imageSrc: sessionsImage,
        imageAlt: "Enlightening sessions",
        title: "Enlightening sessions",
        previewText: "Enlightening discussions and spiritual sessions",
    },
    {
        imageSrc: festivalsImage,
        imageAlt: "Festivals & Celebrations",
        title: "Festivals & Celebrations",
        previewText: "Observing Vaishnava festivals with love and devotion",
    },
    {
        imageSrc: youthImage,
        imageAlt: "Youth & Kids Programs",
        title: "Youth & Kids Programs",
        previewText: "Nurturing Krishna consciousness in young hearts",
    },
    {
        imageSrc: feastImage,
        imageAlt: "Sunday Feast Program",
        title: "Sunday Feast Program",
        previewText:
            "A weekly festival like evening of devotion, kirtan, and sumptuous prasadam",
    },
];

function Activities() {
    const [activities, setActivities] = useState<any[]>(activitiesCards);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
                const data = await fetchPublicContent(["ACTIVITY"]);
                if (data && data.length > 0) {
                    const loadedActivities = data
                        .filter((item: any) => item.type === "ACTIVITY")
                        .map((item: any) => {
                            let queryParams = "";
                            if (item.seva?.id) {
                                queryParams = `?sevaId=${item.seva.id}`;
                                if (item.sevaSubType?.id) {
                                    queryParams += `&subTypeId=${item.sevaSubType.id}`;
                                }
                            }
                            return {
                                title: item.title,
                                previewText: item.previewText || "",
                                fullText: item.fullText || "",
                                quote: item.quote || "",
                                imageSrc: getImageSrc(item.images?.[0]) || "",
                                imageAlt: item.title,
                                linkHref: `/donate${queryParams}#seva-options`,
                                linkText: "Support Us",
                                startDate: item.showFromDate,
                                endDate: item.showToDate,
                                type: item.type,
                            };
                        });
                    setActivities(loadedActivities.length > 0 ? loadedActivities : activitiesCards);
                }
            } finally {
                setLoading(false);
            }
        };
        loadContent();
    }, []);

    let index = 0;
    const alternateColors = (index: number) => {
        if (index === 0) return "white";
        else return index % 2 === 0 ? "pink" : "white";
    };

    return (
        <div className="events-page pt-0">
            {/* Programs & Activities Section */}
            <Section
                title="Programs & Activities"
                subtitle="At ISKM Proddatur, we joyfully engage in various devotional activities to serve the community and spread Krishna consciousness."
                cards={activities}
                backgroundType={alternateColors(index++)}
                className="activities-section mt-0"
                showLink={false}
                type="Custom"
                loading={loading}
                loadingCount={3}
            />

            {/* Donate Section */}
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

export default Activities;
