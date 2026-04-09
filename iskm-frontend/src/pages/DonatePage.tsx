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
    error?: string;
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
    error,
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
                isInvalid={!!error}
            />
            <Form.Label htmlFor={id}>{props.labelVal}</Form.Label>
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Floating>
    );
};

const directDonationCard: ReactElement = (
    <BSCard
        className="shadow-lg border-0 mx-auto w-100"
        style={{ maxWidth: "1000px", borderRadius: "1rem" }}
    >
        <BSCard.Body className="p-4 p-md-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center align-items-md-stretch gap-4 gap-md-5">
                {/* Left: UPI Details */}
                <div
                    className="d-flex flex-column justify-content-center align-items-center w-100 h-100"
                    style={{ flex: 1 }}
                >
                    <h5 className="text-primary mb-3 text-center w-100 fw-bold">
                        <i className="bi bi-bank me-2"></i> UPI ID & QR
                    </h5>
                    <div className="fw-bold fs-5 mb-3 text-center text-dark">
                        6281469214@icici
                    </div>
                    <div className="qr-code-container text-center bg-white p-2 rounded shadow-sm border">
                        <img
                            src="/upi-qr.jpeg"
                            alt="UPI QR Code"
                            className="img-fluid rounded"
                            style={{ maxWidth: "200px" }}
                            title="Scan to pay with any UPI app"
                        />
                        <div className="mt-2 text-muted small fw-medium">
                            Scan to pay with any UPI app
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <h5>
                            <b>Temple President, ISKM PRODDATUR</b>
                        </h5>
                        <p>BOORAGADDA VAMSI KRISHNA</p>
                    </div>
                    <div className="text-center">
                        <small>
                            We are waiting for Trust's QR Code, until then you
                            can use this QR to scan and pay
                        </small>
                    </div>
                </div>

                {/* Vertical/Horizontal Divider */}
                <div className="d-block d-md-none w-100 border-top my-2"></div>
                <div className="d-none d-md-block border-start opacity-75"></div>

                {/* Right: Bank Details */}
                <div
                    className="w-100 d-flex flex-column justify-content-center h-100"
                    style={{ flex: 1 }}
                >
                    <h5 className="text-primary mb-md-5 mb-3 text-center text-md-start w-100 fw-bold">
                        TRUST BANK ACCOUNT DETAILS
                    </h5>
                    <div className="fs-6 w-100 text-center text-md-start mt-md-2">
                        <div className="mb-3">
                            <span className="text-secondary d-block small mb-1 fw-semibold">
                                BANK NAME
                            </span>
                            <span className="fw-bold text-dark fs-5">
                                KARUR VYSYA BANK
                            </span>
                        </div>
                        <div className="mb-3">
                            <span className="text-secondary d-block small mb-1 fw-semibold">
                                ACCOUNT NUMBER
                            </span>
                            <span className="fw-bold text-dark fs-5">
                                1407010000000407
                            </span>
                        </div>
                        <div className="mb-3">
                            <span className="text-secondary d-block small mb-1 fw-semibold">
                                ACCOUNT NAME
                            </span>
                            <span
                                className="fw-bold text-dark fs-6"
                                style={{ wordBreak: "break-word" }}
                            >
                                ISKM PRODDATUR
                            </span>
                        </div>
                        <div className="d-flex flex-row justify-content-center justify-content-md-start gap-4 mt-2"></div>
                        <div className="mb-3">
                            <span className="text-secondary d-block small mb-1 fw-semibold">
                                ACCOUNT TYPE
                            </span>
                            <span className="fw-bold text-dark">Current</span>
                        </div>
                        <div className="mb-3">
                            <span className="text-secondary d-block small mb-1 fw-semibold">
                                IFSC CODE
                            </span>
                            <span className="fw-bold text-dark">
                                KVBL0001407
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </BSCard.Body>
    </BSCard>
);

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
    const [contactErrors, setContactErrors] = useState({
        name: "",
        email: "",
    });

    // Payment Form State
    const [paymentForm, setPaymentForm] = useState({
        name: "",
        phone: "",
        email: "",
        amount: "",
    });
    const [paymentErrors, setPaymentErrors] = useState({
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

    const validateName = (name: string) => {
        const regex = /^[a-zA-Z\s.]*$/;
        return regex.test(name)
            ? ""
            : "Name should only contain letters or dots";
    };

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z+.]+@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/;
        return regex.test(email) ? "" : "Invalid email format";
    };

    const validatePhone = (phone: string) => {
        const regex = /^\d*$/;
        return regex.test(phone)
            ? ""
            : "Mobile number should only contain digits";
    };

    const validateAmountVal = (amount: string) => {
        const regex = /^\d*$/;
        return regex.test(amount) ? "" : "Amount must be a positive number";
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { name, email, message } = contactForm;

        const nameError = validateName(name);
        const emailError = validateEmail(email);

        if (nameError || emailError) {
            setContactErrors({ name: nameError, email: emailError });
            return;
        }

        const whatsappNumber = "916281469214";

        const text = `Name: ${name} \nEmail: ${email} \nQuery: ${message}`;

        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

        window.open(whatsappUrl, "_blank");

        setContactForm({ name: "", email: "", message: "" });
        setContactErrors({ name: "", email: "" });
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, phone, email, amount } = paymentForm;

        const nameError = validateName(name);
        const phoneError = validatePhone(phone);
        const emailError = validateEmail(email);
        const amountError = validateAmountVal(amount);

        if (nameError || phoneError || emailError || amountError) {
            setPaymentErrors({
                name: nameError,
                phone: phoneError,
                email: emailError,
                amount: amountError,
            });
            return;
        }

        console.log("Payment Form Submitted:", {
            ...paymentForm,
            finalAmount: paymentForm.amount,
        });
        await handleDonationSubmit(e);
    };

    const handleContactChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        let error = "";
        if (name === "name") error = validateName(value);
        if (name === "email") error = validateEmail(value);

        setContactForm({
            ...contactForm,
            [name]: value,
        });
        setContactErrors({
            ...contactErrors,
            [name]: error,
        });
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let error = "";
        if (name === "name") error = validateName(value);
        if (name === "phone") error = validatePhone(value);
        if (name === "email") error = validateEmail(value);
        if (name === "amount") error = validateAmountVal(value);

        setPaymentForm({
            ...paymentForm,
            [name]: value,
        });
        setPaymentErrors({
            ...paymentErrors,
            [name]: error,
        });
    };

    const handleAmount = (amount: string) => {
        if (amount === CUSTOM_AMOUNT) {
            paymentForm.amount = "100"; // Minimum Amount
            setCustomAmount(true);
            setPaymentErrors({ ...paymentErrors, amount: "" });
        } else {
            setPaymentForm({
                ...paymentForm,
                amount: amount,
            });
            setCustomAmount(false);
            setPaymentErrors({ ...paymentErrors, amount: "" });
        }
    };

    const btnActiveState = (amount: string) => {
        return (
            paymentForm.amount === amount ||
            (amount === CUSTOM_AMOUNT && customAmount)
        );
    };

    const contactUsCard: ReactElement = (
        <BSCard
            id="get-in-touch"
            className="h-100 shadow-lg get-in-touch border-0 d-flex flex-column"
        >
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
                            error={contactErrors.name}
                        />
                        <FloatingForm
                            type="email"
                            name="email"
                            val={contactForm.email}
                            func={handleContactChange}
                            labelVal="Email Address"
                            error={contactErrors.email}
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
        <BSCard
            id="donate-card"
            className="h-100 shadow-lg donate-card border-0 d-flex flex-column"
        >
            <BSCard.Header className="donate-form-title text-white border-0">
                <h4 className="mb-0 fw-bold">Make a Donation</h4>
                <p className="mb-0 mt-1 small opacity-90">
                    Support Śrīla Prabhupāda’s cause with your generosity
                </p>
            </BSCard.Header>
            <BSCard.Body className="donate-form-body d-flex flex-column flex-grow-1">
                <div className="text-center my-auto p-4 text-muted">
                    <p className="mb-0">
                        We are working on the payment gateway. Sorry for the
                        inconvenience and donate through the direct payment
                        options.
                    </p>
                </div>
                {/* 
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
                            error={paymentErrors.name}
                        />
                        <FloatingForm
                            type="tel"
                            name="phone"
                            val={paymentForm.phone}
                            func={handlePaymentChange}
                            labelVal="Mobile Number"
                            color="blue"
                            error={paymentErrors.phone}
                        />
                        <FloatingForm
                            type="email"
                            name="email"
                            val={paymentForm.email}
                            func={handlePaymentChange}
                            labelVal="Email"
                            color="blue"
                            error={paymentErrors.email}
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
                                    error={paymentErrors.amount}
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
                */}
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
                `${import.meta.env.VITE_API_BASE_URL}/api/pay-req`,
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
                },
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
            setPaymentErrors({ name: "", phone: "", email: "", amount: "" });
        }
    };

    return (
        <div className="donate-page">
            <Section
                title="Support Śrīla Prabhupāda’s Mission"
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
                className="seva-section"
                id="seva-options"
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
                className="contact-info-section mb-0 py-5"
                type="TextOnly"
                bodyElement={
                    <Container fluid="lg" className="py-2">
                        {directDonationCard}
                    </Container>
                }
            />
        </div>
    );
}

export default DonatePage;
