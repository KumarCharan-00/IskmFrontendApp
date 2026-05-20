import React from "react";
import { Placeholder } from "react-bootstrap";
import "../assets/css/Card.css";

export const SkeletonCard: React.FC = () => {
    return (
        <div className="card border-0 shadow-sm">
            <div className="card-image-overlay" style={{ height: "200px", backgroundColor: "#e9ecef" }}>
                <Placeholder as="div" animation="glow" className="w-100 h-100">
                    <Placeholder className="w-100 h-100" />
                </Placeholder>
            </div>
            <div className="d-flex flex-column justify-content-between card-body">
                <Placeholder as="h5" animation="glow" className="card-title text-center">
                    <Placeholder xs={8} />
                </Placeholder>
                <div className="d-flex flex-wrap align-items-center justify-content-center mb-0 gap-2">
                    <Placeholder as="span" animation="glow"><Placeholder xs={3} /></Placeholder>
                    <Placeholder as="span" animation="glow"><Placeholder xs={3} /></Placeholder>
                </div>
                <Placeholder as="p" animation="glow" className="card-text text-center mt-3">
                    <Placeholder xs={12} />
                    <Placeholder xs={10} />
                    <Placeholder xs={9} />
                </Placeholder>
            </div>
            <div className="card-footer bg-none py-0 mb-4 mx-3 d-flex justify-content-center">
                <Placeholder.Button variant="secondary" xs={5} style={{ borderRadius: "25px" }} />
            </div>
        </div>
    );
};
