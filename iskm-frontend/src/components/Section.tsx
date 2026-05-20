import React, { type JSX, type ReactNode } from "react";
import Card from "./Card";
import type { CardProps } from "./Card";
import { Row, Col, Card as BSCard } from "react-bootstrap";
import "../assets/css/section.css";

type color = "pink" | "white" | "blue";

interface SectionProps {
    title: string;
    subtitle?: string | ReactNode | JSX.Element;
    content?: string;
    cards?: CardProps[];
    backgroundType?: "pink" | "white" | "light" | "dark" | "custom" | "blue";
    customBackground?: string;
    className?: string;
    showLink?: boolean;
    linkText?: string;
    linkHref?: string;
    donate?: boolean;
    donateText?: string;
    type: "Custom" | "Bootstrap" | "TextOnly";
    bodyElement?: ReactNode;
    footerElement?: ReactNode;
    id?: string;
    showTitle?: boolean;
    startDate?: string;
    endDate?: string;
}

// background color -> [primary btn/link color, secondary link/btn color]
let colorCombos: Map<string, Array<color>> = new Map();
colorCombos.set("pink", ["blue", "blue"]);
colorCombos.set("white", ["pink", "blue"]);
colorCombos.set("light", ["pink", "blue"]);
colorCombos.set("dark", ["pink", "white"]);
colorCombos.set("blue", ["pink", "white"]);

export const Section: React.FC<SectionProps> = (props) => {
    const getSectionClassName = () => {
        let baseClass = "section";

        if (props.backgroundType !== "pink") {
            baseClass += ` section--${props.backgroundType}`;
        }

        if (props.className) {
            baseClass += ` ${props.className}`;
        }

        return baseClass;
    };

    const getSectionStyle = () => {
        if (props.backgroundType === "custom" && props.customBackground) {
            return { background: props.customBackground };
        }
        return {};
    };

    const btnLinkColors: Array<color> = colorCombos.get(
        props.backgroundType ?? "pink",
    ) ?? ["pink", "blue"];
    const colorP: color = btnLinkColors[0];
    const colorS: color = btnLinkColors[1];

    const loadInCustomCards: ReactNode = (
        <div className="cards-container mt-5">
            {props.cards &&
                props.cards.map((card, index) => (
                    <Card
                        key={index}
                        imageSrc={card.imageSrc}
                        imageAlt={card.imageAlt}
                        title={card.title}
                        previewText={card.previewText}
                        quote={card.quote}
                        linkText={card.linkText}
                        linkHref={card.linkHref}
                        fullText={card.fullText}
                        primaryColor={colorP}
                        secondaryColor={colorS}
                        startDate={card.startDate}
                        endDate={card.endDate}
                        type={card.type}
                    />
                ))}
        </div>
    );

    const loadInBootstrapCards: ReactNode = (
        <Row className="justify-content-center mt-5 mb-0">
            {props.cards &&
                props.cards.map((card, index) => (
                    <Col key={index} md={6} lg={4} className="mb-4">
                        <BSCard className="activity-card">
                            {card.imageSrc && (
                                <BSCard.Img
                                    variant="top"
                                    src={card.imageSrc}
                                    alt={card.imageAlt}
                                />
                            )}
                            <BSCard.Body>
                                <h5 className="activity-title">{card.title}</h5>
                                {typeof card.previewText === "string" ? (
                                    <p className="activity-description">
                                        {card.previewText}
                                    </p>
                                ) : (
                                    <div className="activity-description">
                                        {card.previewText}
                                    </div>
                                )}
                                {card.linkHref && card.linkHref !== "#" && (
                                    <a
                                        href={card.linkHref}
                                        className={`btn custom-btn-${colorP} mt-3`}
                                    >
                                        {card.linkText}
                                    </a>
                                )}
                            </BSCard.Body>
                        </BSCard>
                    </Col>
                ))}
        </Row>
    );

    let loadCards: ReactNode;
    switch (props.type) {
        case "Custom":
            loadCards = loadInCustomCards;
            break;
        case "Bootstrap":
            loadCards = loadInBootstrapCards;
            break;
        default:
            break;
    }

    const showSectionFooter: boolean = !!(
        (props.linkHref && props.linkHref !== "#") ||
        (props.donate && props.donateText) ||
        props.footerElement
    );

    return (
        <section
            {...(props.id && { id: props.id })}
            className={getSectionClassName()}
            style={getSectionStyle()}
        >
            <div className="section-container">
                <div className="section-header">
                    {(props.showTitle ?? true) && props.title && (
                        <h2 className="section-title">{props.title}</h2>
                    )}
                    {props.subtitle && (
                        <p className="section-subtitle">{props.subtitle}</p>
                    )}
                    {props.content && (
                        <p className="section-content mt-4">{props.content}</p>
                    )}
                </div>
                {props.cards && props.cards.length > 0 && loadCards}
                {props.bodyElement}
                {showSectionFooter && (
                    <div className="section-footer">
                        {props.linkHref && props.linkHref !== "#" && (
                            <a
                                href={props.linkHref}
                                className={`btn custom-link-btn-${colorS}`}
                            >
                                {props.linkText}
                            </a>
                        )}
                        {props.donate && props.donateText && (
                            <a
                                href={"/donate#seva-options"}
                                className={`btn custom-btn-${colorP}`}
                            >
                                {props.donateText}
                            </a>
                        )}
                        {props.footerElement}
                    </div>
                )}
            </div>
        </section>
    );
};
