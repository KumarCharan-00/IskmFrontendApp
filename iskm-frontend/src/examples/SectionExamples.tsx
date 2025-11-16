import React from "react";
import { Section } from "../components/Section";

// Example data for different sections
const eventsData = [
    {
        imageSrc: "https://via.placeholder.com/300x200?text=Event+1",
        imageAlt: "Event 1",
        title: "Spiritual Gathering",
        text: "Join us for our weekly spiritual gathering where we come together to celebrate and learn.",
        linkText: "Learn More",
        linkHref: "/events",
    },
    {
        imageSrc: "https://via.placeholder.com/300x200?text=Event+2",
        imageAlt: "Event 2",
        title: "Community Service",
        text: "Participate in our community service activities and make a positive impact in society.",
        linkText: "Get Involved",
        linkHref: "/volunteer",
    },
];

const servicesData = [
    {
        imageSrc: "https://via.placeholder.com/300x200?text=Service+1",
        imageAlt: "Service 1",
        title: "Educational Programs",
        text: "Comprehensive educational programs designed to deepen your spiritual understanding.",
        linkText: "Explore",
        linkHref: "/education",
    },
    {
        imageSrc: "https://via.placeholder.com/300x200?text=Service+2",
        imageAlt: "Service 2",
        title: "Community Outreach",
        text: "Join our community outreach programs and make a difference in people's lives.",
        linkText: "Join Now",
        linkHref: "/outreach",
    },
];

const SectionExamples: React.FC = () => {
    return (
        <div>
            {/* Default gradient background */}
            <Section 
                title="Our Activities"
                subtitle="Discover the various ways you can connect with our community"
                cards={eventsData}
            />

            {/* White background */}
            <Section 
                title="Our Services"
                subtitle="Explore the services we offer to our community"
                cards={servicesData}
                backgroundType="white"
            />

            {/* Light background */}
            <Section 
                title="Community Programs"
                subtitle="Join our community programs and grow together"
                cards={eventsData}
                backgroundType="light"
            />

            {/* Dark background */}
            <Section 
                title="Special Events"
                subtitle="Don't miss our special events and celebrations"
                cards={servicesData}
                backgroundType="dark"
            />

            {/* Custom background */}
            <Section 
                title="Custom Styled Section"
                subtitle="This section has a custom background color"
                cards={eventsData}
                backgroundType="custom"
                customBackground="linear-gradient(45deg, #ff6b6b, #4ecdc4)"
            />

            {/* Custom background with solid color */}
            <Section 
                title="Solid Color Background"
                subtitle="This section uses a solid background color"
                cards={servicesData}
                backgroundType="custom"
                customBackground="#e3f2fd"
            />
        </div>
    );
};

export default SectionExamples;
