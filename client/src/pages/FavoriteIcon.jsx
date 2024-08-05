import React, { useEffect, useState } from 'react';
import axios from "axios";

function FavoriteIcon({ placeId, user, toggleFavorite }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const HeartIcon = ({ isFilled }) => (
        <svg
            className='heart-icon'
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: '#F5385D ', cursor: 'pointer' }}
        >
            {isFilled ? (
                <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            ) : (
                <path fill="currentColor" d="M16.5 3c-1.74 0-3.41 0.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-9 1.5c1.38 0 2.68 0.74 3.44 1.9h1.12c0.76-1.16 2.06-1.9 3.44-1.9 2.48 0 4.5 2.02 4.5 4.5 0 2.22-2.89 4.89-7.5 9.14-4.61-4.24-7.5-6.92-7.5-9.14 0-2.48 2.02-4.5 4.5-4.5z" />
            )}
        </svg>
    );

    useEffect(() => {
        setIsFavorite(user.Favorites?.includes(placeId) || false);
    }, [placeId, user.Favorites]);

    const handleFavoriteClick = async (e) => {
        e.preventDefault();
        toggleFavorite(placeId); // Delegate the toggling logic to the parent component
    };

    return (
        <button onClick={handleFavoriteClick} className="favorite-button">
            <HeartIcon isFilled={isFavorite} />
        </button>
    );
}

export default FavoriteIcon;
