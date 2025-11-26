import React, { useState, type ReactElement, useId } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card as BSCard,
} from "react-bootstrap";
import { Section } from "../components/Section";
import "../assets/css/donate.css";

interface FloatingFormType {
    type?: string;
    as?: "textarea" | "select";
    name: string;
    val: string;
    func: React.ChangeEventHandler;
    className?: string;
    labelVal: string;
    required?: boolean;
    color?: "blue" | "pink";
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

const FloatingForm: React.FC<FloatingFormType> = ({
    required = true,
    className = "form-input",
    type = "text",
    color = "pink",
    as,
    ...props
}): ReactElement => {
    if (className.includes("form-input")) {
        className = className.replaceAll("form-input", "form-input-" + color);
    }
    const id = useId();
    return (
        <Form.Floating className="mb-3">
            <Form.Control
                id={id}
                {...(as ? { as } : { type })}
                name={props.name}
                value={props.val}
                onChange={props.func}
                required={required}
                placeholder=" "
                className={className}
                autoComplete={props.name}
            />
            <Form.Label htmlFor={id}>{props.labelVal}</Form.Label>
        </Form.Floating>
    );
};

const contactCards = [
    {
        title: "UPI Details",
        previewText: (
            <div className="mb-4">
                <h6 className="text-primary">
                    <i className="bi bi-bank me-2"></i> UPI IDs
                </h6>
                <div className="fw-bold">
                    <div>iskmproddutur@ybl</div>
                    <div>iskmproddutur@sbipay</div>
                    <div>iskmproddutur@hdfcpay</div>
                </div>
            </div>
        ),
    },
    {
        title: "Bank Account Details",
        previewText: (
            <div className="mb-0">
                <h6 className="text-primary">Bank Account Details</h6>
                <p>
                    <em>(Account details)</em>
                </p>
            </div>
        ),
    },
];

const cleanupRazorpay = (): void => {
    // Remove Razorpay containers
    const containers = document.querySelectorAll(".razorpay-container");
    containers.forEach((container) => container.remove());

    // Remove backdrop if any
    const backdrop = document.querySelector(".razorpay-backdrop");
    if (backdrop) {
        backdrop.remove();
    }

    // Reset body styles
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.body.style.position = "";
    document.body.style.width = "";
};

function DonatePage() {
    const [customAmount, setCustomAmount] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Contact Form State
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    // Payment Form State
    const [paymentForm, setPaymentForm] = useState({
        name: "",
        phone: "",
        email: "",
        amount: "",
    });

    const CUSTOM_AMOUNT: string = "CUSTOM";
    const amountOptions: Array<string> = [
        "500",
        "1000",
        "2000",
        "5000",
        "CUSTOM",
    ];

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { name, email, message } = contactForm;
        const whatsappNumber = "918466024968";

        const text = `Name: ${name} \nEmail: ${email} \nQuery: ${message}`;

        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

        window.open(whatsappUrl, "_blank");

        setContactForm({ name: "", email: "", message: "" });
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Payment Form Submitted:", {
            ...paymentForm,
            finalAmount: paymentForm.amount,
        });
        await handleDonationSubmit(e);
    };

    const handleContactChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value,
        });
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentForm({
            ...paymentForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleAmount = (amount: string) => {
        if (amount === CUSTOM_AMOUNT) {
            paymentForm.amount = "100"; // Minimum Amount
            setCustomAmount(true);
        } else {
            setPaymentForm({
                ...paymentForm,
                amount: amount,
            });
            setCustomAmount(false);
        }
    };

    const btnActiveState = (amount: string) => {
        return (
            paymentForm.amount === amount ||
            (amount === CUSTOM_AMOUNT && customAmount)
        );
    };

    const contactUsCard: ReactElement = (
        <BSCard className="h-100 shadow-lg get-in-touch border-0 d-flex flex-column">
            <BSCard.Header className="query-form-title text-white border-0">
                <h4 className="mb-0 fw-bold">Get in Touch</h4>
                <p className="mb-0 mt-1 small opacity-90">
                    We'd love to hear from you
                </p>
            </BSCard.Header>
            <BSCard.Body className="query-form-body d-flex flex-column flex-grow-1">
                <Form
                    onSubmit={handleContactSubmit}
                    className="d-flex flex-column h-100"
                >
                    <div className="flex-grow-1">
                        <FloatingForm
                            name="name"
                            val={contactForm.name}
                            func={handleContactChange}
                            labelVal="Full Name"
                        />
                        <FloatingForm
                            type="email"
                            name="email"
                            val={contactForm.email}
                            func={handleContactChange}
                            labelVal="Email Address"
                        />
                        <FloatingForm
                            as="textarea"
                            name="message"
                            val={contactForm.message}
                            func={handleContactChange}
                            labelVal="Enter Your Query or Message"
                            className="form-input message-input query-input"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-100 custom-btn-pink submit-btn mt-auto"
                    >
                        <span className="btn-text">Send Message</span>
                        <span className="btn-icon">→</span>
                    </Button>
                </Form>
            </BSCard.Body>
        </BSCard>
    );

    const donateUsCard: ReactElement = (
        <BSCard className="h-100 shadow-lg donate-card border-0 d-flex flex-column">
            <BSCard.Header className="donate-form-title text-white border-0">
                <h4 className="mb-0 fw-bold">Make a Donation</h4>
                <p className="mb-0 mt-1 small opacity-90">
                    Support our cause with your generosity
                </p>
            </BSCard.Header>
            <BSCard.Body className="donate-form-body d-flex flex-column flex-grow-1">
                <Form
                    onSubmit={handlePaymentSubmit}
                    className="d-flex flex-column h-100"
                >
                    <div className="flex-grow-1">
                        <FloatingForm
                            name="name"
                            val={paymentForm.name}
                            func={handlePaymentChange}
                            labelVal="Full Name"
                            color="blue"
                        />
                        <FloatingForm
                            type="tel"
                            name="phone"
                            val={paymentForm.phone}
                            func={handlePaymentChange}
                            labelVal="Mobile Number"
                            color="blue"
                        />
                        <FloatingForm
                            type="email"
                            name="email"
                            val={paymentForm.email}
                            func={handlePaymentChange}
                            labelVal="Email"
                            color="blue"
                        />

                        <Form.Group className="mb-3">
                            <div className="donation-label fw-semibold mb-3">
                                Donation Amount (₹)
                            </div>
                            <div className="amount-buttons-container d-flex flex-wrap gap-2 mb-3">
                                {amountOptions.map((amount) => (
                                    <Button
                                        key={amount}
                                        variant={
                                            btnActiveState(amount)
                                                ? "primary"
                                                : "outline-primary"
                                        }
                                        className={`amount-btn flex-grow-1 ${
                                            btnActiveState(amount)
                                                ? "amount-btn-active"
                                                : ""
                                        }`}
                                        onClick={() => handleAmount(amount)}
                                        type="button"
                                    >
                                        {amount === CUSTOM_AMOUNT
                                            ? "Enter Amount"
                                            : "₹" + amount}
                                    </Button>
                                ))}
                            </div>
                            {customAmount && (
                                <FloatingForm
                                    type="number"
                                    name="amount"
                                    val={paymentForm.amount}
                                    func={handlePaymentChange}
                                    labelVal="Amount in Rupees (INR)"
                                />
                            )}
                        </Form.Group>
                    </div>

                    <Button
                        type="submit"
                        className="w-100 custom-btn submit-btn donate-submit-btn mt-auto"
                        disabled={
                            !paymentForm.amount ||
                            parseInt(paymentForm.amount) < 100 ||
                            isProcessing
                        }
                    >
                        {isProcessing ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                Processing...
                            </>
                        ) : (
                            <span className="btn-text">
                                Proceed to Pay ₹{paymentForm.amount}
                            </span>
                        )}
                        <span className="btn-icon">→</span>
                    </Button>
                </Form>
            </BSCard.Body>
        </BSCard>
    );

    const handleDonationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        console.log("Inside handleDonationSubmit");

        const amount = paymentForm.amount;

        console.log(amount);

        if (!amount || parseFloat(amount) <= 0) {
            setErrorMessage("Please select or enter a valid donation amount");
            return;
        }

        if (isProcessing) {
            console.log("Already Processing");
            return;
        }

        setIsProcessing(true);

        try {
            console.log("started API call");
            // Call your backend API to initiate payment
            const response = await fetch(
                "http://localhost:8080/generate-pay-req",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Controle-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        name: paymentForm.name,
                        amount: parseInt(amount),
                        email: paymentForm.email,
                        phone: paymentForm.phone,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Payment initiation failed");
            }

            const paymentData = await response.json();

            console.log(paymentData);

            // Initialize Razorpay with the payment data
            if (paymentData) {
                const razorPayOptions = {
                    ...paymentData,
                    handler: function (response: any) {
                        console.log("Payment Success:", response);
                        cleanupRazorpay();
                    },
                    modal: {
                        ondismiss: function () {
                            console.log("Payment cancelled");
                            // Force cleanup when modal closes
                            cleanupRazorpay();
                        },
                    },
                };
                console.log(razorPayOptions);
                const rzp1 = new window.Razorpay(razorPayOptions);

                rzp1.on("payment.failed", function (response: any) {
                    console.error("Payment failed:", response.error);
                    cleanupRazorpay();
                    alert("Payment failed. Please try again.");
                });

                rzp1.open();
            }
        } catch (error) {
            console.error("Donation error:", error);
            cleanupRazorpay(); // Cleanup even on errors
            setErrorMessage("Failed to process donation. Please try again.");
        } finally {
            setIsProcessing(false);
            setPaymentForm({ name: "", phone: "", email: "", amount: "" });
        }
    };

    return (
        <div className="donate-page">
            <Section
                title="Support Our Mission"
                subtitle="Join us in making a difference"
                content="Your generous donation helps us continue our
                                spiritual and community services, spread
                                Krishna consciousness, and serve the community
                                with love and devotion."
                backgroundType="pink"
                className="donation-hero-section pb-0"
                showLink={false}
                type="TextOnly"
                bodyElement={
                    <>
                        <div className="htl-txt-ct-1 mb-4">
                            {/* Placeholder for hero image */}
                            <p className="htl-txt-ct-placeholder-1 text-center">
                                Every offering — big or small, simple or grand —
                                when made with devotion, is personally accepted
                                by the Hari.
                            </p>
                            <p className="quote-bx quote-bx--blue mantra-text text-center my-4 py-4 py-lg-2">
                                Hare Krishna, Hare Krishna, Krishna Krishna,
                                Hare Hare <br />
                                Hare Rama, Hare Rama, Rama Rama, Hare Hare.
                            </p>
                            <p className="htl-txt-ct-placeholder-1 text-center">
                                Thank you for your generous heart and for being
                                part of Srila Prabhupada's eternal mission
                            </p>
                        </div>
                    </>
                }
            />

            {/* Contact & Payment Forms Section */}
            <Section
                title="Get in Touch & Support Our Mission"
                subtitle="Contact us for queries or make a donation to support our spiritual activities"
                backgroundType="white"
                className="forms-section"
                type="TextOnly"
                bodyElement={
                    <Container fluid className="py-4">
                        <Row className="g-4">
                            <Col md={6}>{donateUsCard}</Col>
                            <Col md={6}>{contactUsCard}</Col>
                        </Row>
                    </Container>
                }
            />

            {/* Contact Information Section */}
            <Section
                title="Direct Donation Methods"
                subtitle="Offer your seva through Bank Transfer, UPI, or In-Person Donation at the temple."
                backgroundType="blue"
                className="contact-info-section mb-0"
                type="Bootstrap"
                cards={contactCards}
            />
        </div>
    );
}

export default DonatePage;
