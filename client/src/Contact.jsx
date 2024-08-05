import React, { useState, useEffect, useContext } from 'react';

import axios from "axios";
import "./contact.css";
import { UserContext } from "./UserContext.jsx";
const Contact = () => {
  const { user, setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const response = await axios.get('/profile');
        const userData = response.data;
        if (userData) {
          setUser(userData);

        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }

    };
    fetchUserData();
  }, [setUser]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/admin/messages", formData);
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      
      setFormData({ name: "", email: "", message: "" }); // Clear form fields after successful submission
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(error.response.data.message);
    }
    try {
      // Send a PUT request to toggle the inTrouble attribute
      const response = await axios.put(`/profile/${user._id}/toggleTrouble`);

      // Handle successful response
      console.log('User inTrouble attribute toggled successfully:', response.data);
      // You may perform additional actions here if needed

    } catch (error) {
      // Handle error
      console.error('Error toggling user trouble status:', error);
      // You may display an error message to the user or perform other error handling actions
    }
  };

  return (
    <div className="contact-section">
      <h2 className="contact-title">Contact Us</h2>

      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="contact-button">
            Send Message
          </button>
        </form>
      </div>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Contact;
