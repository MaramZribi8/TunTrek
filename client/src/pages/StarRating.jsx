import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './star.css'; // Make sure this path is correct

function StarRating({ onRatingChange }) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const handleStarClick = (rating) => {
        setRating(rating);
        // Call the callback function with the new rating
        onRatingChange(rating);
    };
    return (
        <div className="star-rating-container">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label className="star-rating-label" key={index}>
                        <input
                            type="radio"
                            name="rating"
                            className="star-rating-input"
                            value={currentRating}
                            onClick={() => handleStarClick(currentRating)}
                        />
                        <FaStar
                            className="star-rating-icon"
                            size={50}
                            color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
}

export default StarRating;
