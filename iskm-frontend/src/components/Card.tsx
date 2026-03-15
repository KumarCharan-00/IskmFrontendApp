import React, { useState, type JSX, type ReactNode } from "react";
import { Modal } from "react-bootstrap";
import "../assets/css/Card.css"; // Import the CSS file

export interface CardProps {
    imageSrc?: string;
    imageAlt?: string;
    title: string;
    previewText: string | ReactNode | JSX.Element;
    fullText?: string | ReactNode | JSX.Element;
    quote?: string;
    linkText?: string;
    linkHref?: string;
    primaryColor?: "pink" | "blue" | "white";
    secondaryColor?: "pink" | "blue" | "white";
    startDate?: string;
    endDate?: string;
}

const Card: React.FC<CardProps> = ({
    linkText = "View More",
    linkHref = "#",
    ...props
}) => {
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const colorP = props.primaryColor ? props.primaryColor : "pink";
    const colorS = props.secondaryColor ? props.secondaryColor : "blue";

    return (
        <>
            <div className="card" onClick={handleCardClick}>
                {props.imageSrc && (
                    <div className="card-image-overlay">
                        <img
                            src={props.imageSrc}
                            className="card-img-top"
                            alt={props.imageAlt}
                        />
                    </div>
                )}
                <div className="d-flex flex-column justify-content-between card-body">
                    <h5 className="card-title">{props.title}</h5>
                    {(props.startDate || props.endDate) && (
                        <div className="d-flex flex-wrap align-items-center justify-content-center mb-0">
                            <div className="gap-2 d-flex align-items-center">
                                <span className={`date-label color-${colorS}`}>
                                    FROM
                                </span>
                                {props.startDate && (
                                    <span
                                        className={`festival-date festival-date--start color-${colorP}`}
                                    >
                                        {props.startDate}
                                    </span>
                                )}
                            </div>
                            <div className="gap-2 d-flex align-items-center">
                                <span className={`date-label color-${colorS}`}>
                                    UNTIL
                                </span>
                                {props.endDate && (
                                    <span
                                        className={`festival-date festival-date--end date-value color-${colorP}`}
                                    >
                                        {props.endDate}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                    <p className="card-text">{props.previewText}</p>
                </div>
                <div className="card-footer bg-none py-0 mb-4 mx-3 d-flex justify-content-center gap-1">
                    {props.fullText && (
                        <a
                            className={`btn custom-link-btn-${colorP} card-full-content`}
                            onClick={() => setShowModal(true)}
                        >
                            View More
                        </a>
                    )}
                </div>
            </div>

            {/* Bootstrap Modal */}
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered={true}
                scrollable={true}
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 d-flex flex-column flex-lg-row">
                    {props.imageSrc && (
                        <div className="image-container">
                            <img
                                src={props.imageSrc}
                                alt={props.imageAlt}
                                className="modal-image"
                            />
                        </div>
                    )}
                    <div className="p-4 flex-grow-1 d-inline-flex flex-column gap-3">
                        {(props.startDate || props.endDate) && (
                            <div className="d-flex flex-wrap align-items-center justify-content-start gap-2 mb-0">
                                <span className="date-label">From</span>
                                {props.startDate && (
                                    <span
                                        className={`festival-date festival-date--start color-${colorS}`}
                                    >
                                        {props.startDate}
                                    </span>
                                )}
                                <span className="date-label">to</span>
                                {props.endDate && (
                                    <span
                                        className={`festival-date festival-date--end date-value color-${colorS}`}
                                    >
                                        {props.endDate}
                                    </span>
                                )}
                            </div>
                        )}
                        {props.quote && (
                            <div className="text-start quote-bx quote-bx--pink color-black">
                                <blockquote className="blockquote m-3">
                                    <i className="mb-0 fw-regular">
                                        {props.quote}
                                    </i>
                                </blockquote>
                            </div>
                        )}
                        <div className="modal-content-text">
                            {typeof props.fullText === "string" ? (
                                <p>{props.fullText}</p>
                            ) : (
                                props.fullText
                            )}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className={`btn custom-link-btn-${colorS}`}
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                    {linkHref && linkHref !== "#" && (
                        <a
                            href={linkHref}
                            className={`btn custom-btn-${colorP}`}
                            onClick={handleCloseModal}
                        >
                            {linkText}
                        </a>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Card;
