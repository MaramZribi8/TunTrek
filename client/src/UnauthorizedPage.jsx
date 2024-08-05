import React from 'react';
import { Link } from 'react-router-dom';
import "./UnauthorizedPage.css"
function UnauthorizedPage() {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-header">
        <h1>403! Hold up!</h1>
        <p>Sorry, but you are not authorized to view this page.</p>
      </div>
      <div className="unauthorized-content">
       
        <div className="unauthorized-actions">
          <Link to="/" className="button">Back To Home Page</Link>
          <Link to="/contact" className="button">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
