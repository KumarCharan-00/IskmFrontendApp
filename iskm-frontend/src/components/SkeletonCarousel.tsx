import React from "react";
import { Placeholder, Container } from "react-bootstrap";
import "../assets/css/carousal.css";

export const SkeletonCarousel: React.FC = () => {
    return (
        <Container className="carousel-container mb-5 mt-4">
            <div
                className="custom-carousel bg-white rounded shadow-sm position-relative overflow-hidden d-flex flex-column align-items-center justify-content-end"
                style={{ height: "450px", backgroundColor: "#e9ecef" }}
            >
                <div className="w-100 h-100 position-absolute top-0 start-0" style={{ backgroundColor: "#e9ecef" }}>
                    <Placeholder as="div" animation="glow" className="w-100 h-100">
                        <Placeholder className="w-100 h-100" />
                    </Placeholder>
                </div>
                <div className="position-relative z-1 text-center w-100 pb-5 mb-4">
                    <Placeholder as="h2" animation="glow" className="display-5 fw-bold mb-3 mx-auto" style={{ maxWidth: "400px" }}>
                        <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="lead mx-auto" style={{ maxWidth: "600px" }}>
                        <Placeholder xs={10} /> <Placeholder xs={8} /> <Placeholder xs={9} />
                    </Placeholder>
                    <div className="mt-3">
                        <Placeholder.Button variant="secondary" xs={2} className="btn custom-btn-pink blur" />
                    </div>
                </div>
            </div>
        </Container>
    );
};
