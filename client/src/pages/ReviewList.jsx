import React, { useState, useEffect } from 'react';
import axios from "axios";
import AvatarReview from './AvatarReview';
import { Link, useParams } from "react-router-dom";

export default function ReviewList({ user, productId, style }) {
    const [reviews, setReviews] = useState([]);
    const [customersData, setCustomersData] = useState({});  // Initialize customersData as an object
    const handleDelete = async (id) => {
        if (window.confirm("Admin, Are you sure you want to delete this comment ?")) {

            try {
                // Send a DELETE request to your backend API
                await axios.delete(`/reviews/${id}`);

                // If the request is successful, call the onDelete function to update the UI or perform any other necessary actions
                onDelete(id);
            } catch (error) {
                // Handle errors if any
                console.error('Error deleting review:', error);
            }

        };
    };

    useEffect(() => {
        async function fetchReviewsAndUserData() {
            try {
                // Fetch reviews first
                const reviewsResponse = await axios.get(`/reviews/${productId}`);
                if (reviewsResponse.status !== 200) {
                    throw new Error(`HTTP error! Status: ${reviewsResponse.status}`);
                }
                setReviews(reviewsResponse.data);  // Assuming reviewsResponse.data is an array of reviews

                // Extract unique userIds from reviews
                const userIds = Array.from(new Set(reviewsResponse.data.map(review => review.userId).filter(userId => userId)));

                // Fetch user data for each userId
                const userRequests = userIds.map(userId => axios.get(`/profile/${userId}`));
                const userResponses = await Promise.all(userRequests);

                // Construct customersData object using review._id as the key
                const newCustomersData = reviewsResponse.data.reduce((acc, review) => {
                    const responseIndex = userIds.indexOf(review.userId);
                    if (responseIndex !== -1 && userResponses[responseIndex].status === 200 && userResponses[responseIndex].data) {
                        acc[review._id] = userResponses[responseIndex].data;  // Map review._id to user data
                    }
                    return acc;
                }, {});

                setCustomersData(newCustomersData);

            } catch (error) {
                console.error("Failed to fetch reviews or user data:", error);
            }
        }

        fetchReviewsAndUserData();
    }, [productId]);
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">Review of our customers</div>
            <div style={style}>
                {reviews.length > 0 ? (
                    <ul>
                        {reviews.map(review => (
                            <li key={review._id} className="my-2">
                                {/* Render stars based on review rating */}
                                <div className="font-bold text-yellow-400">
                                    {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                                </div>

                                {/* Check if there is user data for the review and render the user's name */}
                                {customersData[review._id] ? (
                                    <AvatarReview
                                        userId={customersData[review._id]._id}
                                        username={customersData[review._id].name}
                                        photo={customersData[review._id].photo}
                                    />
                                ) : (
                                    <div className="text-sm text-gray-600">Reviewed by Unknown</div>
                                )}

                                {/* Review text in a styled box */}

                                {user &&!user.isAdmin ? (
                                    <div className="p-2 mt-2 bg-gray-100 rounded-md shadow-sm">
                                        {review.text}</div>) : (
                                    <div className="p-2 mt-2 bg-gray-100 rounded-md shadow-sm flex justify-between items-center">
                                        <span className="flex-grow">{review.text}</span>
                                        <button onClick={() => handleDelete(review._id)} className="inline-flex items-center bg-secondary text-white py-1 px-3 rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                            </svg>
                                            Delete
                                        </button>
                                    </div>

                                )}






                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>No reviews yet.</div>
                )}
            </div>
        </div>
    );


}
