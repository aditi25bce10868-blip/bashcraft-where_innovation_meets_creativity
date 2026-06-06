import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  FaInstagram,
  FaLinkedin,
  FaDiscord,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import "./Contact.css";

const EMAILJS_SERVICE_ID  = "service_syr0y8n";
const EMAILJS_TEMPLATE_ID = "template_9gzctnb";
const EMAILJS_PUBLIC_KEY  = "glQomZKKnHtZfmoNd";

const Contact = () => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formData,
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ from_name: "", from_email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrorMsg(
        err?.text || err?.message ||
          "Something went wrong. Please try again or email us directly."
      );
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1 className="gradient-text">Contact Our Club</h1>
        <p>
          Have questions, ideas, or want to collaborate with us?
          We'd love to hear from you.
        </p>
      </section>

      <section className="contact-section">
        <div className="contact-info">
          <h2>Get In Touch</h2>

          <div className="info-card">
            <FaEnvelope className="contact-icon" />
            <div>
              <h4>Email</h4>
              <p>bashcraft@vitbhopal.ac.in</p>
            </div>
          </div>

          <div className="info-card">
            <FaPhone className="contact-icon" />
            <div>
              <h4>Phone</h4>
              <p>+91 XXXXX XXXXX</p>
            </div>
          </div>

          <div className="info-card">
            <FaMapMarkerAlt className="contact-icon" />
            <div>
              <h4>Location</h4>
              <p>
                VIT Bhopal University
                <br />
                Kotri Kalan, Madhya Pradesh
              </p>
            </div>
          </div>

          <h3 className="social-heading">Follow Us</h3>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://discord.com/login" target="_blank" rel="noreferrer">
              <FaDiscord />
            </a>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send a Message</h2>

          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="from_name"
              placeholder="Your Name"
              value={formData.from_name}
              onChange={handleChange}
              required
              disabled={status === "sending"}
            />
            <input
              type="email"
              name="from_email"
              placeholder="Your Email"
              value={formData.from_email}
              onChange={handleChange}
              required
              disabled={status === "sending"}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={status === "sending"}
            />
            <textarea
              name="message"
              placeholder="Tell us about your idea, query, or collaboration..."
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === "sending"}
            />

            {status === "success" && (
              <div className="form-feedback success">
                <FaCheckCircle />
                <span>Message sent! We'll get back to you soon.</span>
              </div>
            )}
            {status === "error" && (
              <div className="form-feedback error">
                <FaTimesCircle />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className={status === "sending" ? "btn-loading" : ""}
            >
              {status === "sending" ? (
                <>
                  <span className="spinner" />
                  Sending…
                </>
              ) : status === "success" ? (
                <>
                  <FaCheckCircle />
                  Sent!
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Map — pinned directly to VIT Bhopal University */}
      <section className="map-section">
        <h2 className="gradient-text">Find Us Here</h2>
        <p>Visit our club and become part of our community.</p>
        <div className="map-container">
          <iframe
            title="VIT Bhopal Location"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.5355141651153!2d76.84874337500521!3d23.07748451427734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397ce9ceaaaaaaab%3A0xa224b6b82b421f83!2sVIT%20Bhopal%20University!5e0!3m2!1sen!2sin!4v1780737626532!5m2!1sen!2sin" 
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;