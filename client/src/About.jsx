import React from "react";
import "./about.css";

const About = () => {
    return (
        <>
            <div className="about-section">
                <img
                    className="about-image"
                    src="https://conseilsante.cliniquecmi.com/wp-content/uploads/2022/05/bienfait-randonnee-conseil-sante.jpg"
                    alt="Randonnée"
                />

                <div className="about-text">
                    <h2 className="about-title">About Us</h2>
                    <p className="about-paragraph">
                        Travel embodies our commitment to taking you to new destinations and
                        enriching experiences. Through this platform, we invite you to
                        explore, book, and live authentic adventures in Tunisia, infused
                        with our culture, history, and traditions. Our mission is also to
                        foster an interactive and engaged community, mindful of the
                        challenges of sustainable tourism.
                    </p>
                    <h2 className="about-title">Our Mission</h2>
                    <p className="about-paragraph">
                        Our mission is to build a vibrant and engaged community dedicated to
                        the principles and aspects of sustainable tourism.
                    </p>
                </div>
            </div>
        </>
    );
};

export default About;