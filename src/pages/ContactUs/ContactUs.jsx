import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {f
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <div className="u-container contact-container">
        <div className="contact-left">
          <h2>Contact Us</h2>
          <p>
            Have questions, feedback, or need support? We'd love to hear from
            you.
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              placeholder="Your full name"
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="you@example.com"
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              placeholder="Type your message..."
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className="contact-right">
          <h3>Get in Touch</h3>
          <p>
            <strong>Email:</strong> contact@ijmtm.org
          </p>
          <p>
            <strong>Phone:</strong> +1 (800) 123-4567
          </p>
          <p>
            <strong>Address:</strong>
            <br />
            IJMTM Editorial Office
            <br />
            123 Research Lane
            <br />
            Innovation City, CA 90210
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
