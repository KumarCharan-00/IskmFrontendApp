import { useEffect, useState } from "react";
import { Section } from "../components/Section";
import "../assets/css/events.css";
import { fetchPublicContent, getImageSrc } from "../services/contentService";
import annadanamImage from "../assets/images/annadanam.jpg";
import youthLearningImage from "../assets/images/youthLearning.jpg";
import aanadanamImage2 from "../assets/images/aanadanam2.jpg";
import BhagavadGitaImage from "../assets/images/BhagavadGita.png";
import SPReading from "../assets/images/PrabhupadReading.webp";

const events = [
    {
        title: "Nitya Anna Prasadam Seva",
        previewText:
            "Every single day, devotees and visitors receive free sanctified vegetarian meals (prasadam) prepared with great care and devotion.",
        imageSrc: annadanamImage,
        imageAlt: "Nitya Anna Prasadam Seva",
        quote: "Distributing Krishna-prasadam is distributing mercy itself.",
        fullText:
            "Every single day, devotees and visitors receive free sanctified vegetarian meals (prasadam) prepared with great care and devotion. Supporting this seva allows the temple to continue feeding hundreds daily — spreading Krishna’s compassion to every heart.",
        linkHref: "/donate#seva-options",
        linkText: "Support Us",
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
        linkHref: "/donate#seva-options",
        linkText: "Support Us",
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
        linkHref: "/donate#seva-options",
        linkText: "Support Us",
    },
    {
        imageSrc: BhagavadGitaImage,
        imageAlt: "Bhagavad-gītā Seva",
        title: "Bhagavad-gītā & Śrīmad-Bhāgavatam Seva",
        previewText:
            "Distributing Srila Prabhupada's books is the highest form of compassion — illuminating lives with divine knowledge.",
        quote: "`There is no servant in this world more dear to Me than he, nor will there ever be one more dear.` — Bhagavad-gītā 18.68",
        fullText:
            "Distributing Srila Prabhupada’s books is the highest form of compassion — illuminating lives with divine knowledge. Your contribution helps print, store, and distribute these transcendental literatures to eager students, families, and seekers who may otherwise not afford them.",
        linkHref: "/donate#seva-options",
        linkText: "Support Us",
    },
    {
        imageSrc: SPReading,
        imageAlt: "Temple Project Seva",
        title: "Temple Project Seva",
        previewText:
            "The ISKM Proddatur Temple Project is a divine mission to expand and beautify the Lord's home — including altar development and temple infrastructure.",
        quote: `One who offers the Deity gifts of land, markets, cities and villages so that the regular daily worship and special festivals of the Deity may go on continually will achieve opulence equal to My own. By installing the Deity of the Lord one becomes king of the entire earth, by building a temple for the Lord one becomes ruler of the three worlds, by worshiping and serving the Deity one goes to the planet of Lord Brahmā, and by performing all three of these activities one achieves a transcendental form like My own. — Śrīmad-Bhāgavatam 11.27.51–52`,
        fullText:
            "The ISKM Proddatur Temple Project is a divine mission to expand and beautify the Lord’s home — including altar development, deity paraphernalia, guest facilities, and temple infrastructure. Every brick offered with devotion builds not only Krishna’s temple but also the foundation of your own spiritual progress.",
        linkHref: "/donate#seva-options",
        linkText: "Support Us",
    },
];

function Sevas() {
    const [sevaEvents, setSevaEvents] = useState(events);

    useEffect(() => {
        const loadContent = async () => {
            const data = await fetchPublicContent(["SEVA"]);
            if (data && data.length > 0) {
                const sevas = data
                    .filter((item: any) => item.type === "SEVA")
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

                setSevaEvents(sevas.length > 0 ? sevas : events);
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
            <Section
                title="Our Divine Sevas"
                subtitle="Participate in these sacred services and receive the blessings of the Lord"
                cards={sevaEvents}
                backgroundType={alternateColors(index++)}
                className="events-section mt-0 mb-0"
                showLink={false}
                type="Custom"
            />
            
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

export default Sevas;
