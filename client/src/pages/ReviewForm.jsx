import { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating';  // Ensure the path is correct

export default function ReviewForm({ productId, user }) {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0); // Initialize rating state
    const [key, setKey] = useState(0); // Key to reset the StarRating component
    const [showMessage, setShowMessage] = useState(false); // State to control the visibility of the submission message
    const [comments, setComments] = useState([]);
    useEffect(() => {
        // Fetch comments when the component mounts
        fetchComments();
    }, []);

    const fetchComments = async () => {
        const result = await axios.get(`/reviews/${productId}`);
        setComments(result.data);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('/reviews', {
                productId: productId,
                userId: user._id,
                rating: rating,
                text: text
            });

            console.log('Review Submitted', result.data);
            setShowMessage(true); // Show the success message
            setTimeout(() => {
                setShowMessage(false); // Hide the message after 5 seconds
            }, 2000);

            setText(''); // Clear the text field
            setRating(0); // Reset the rating
            setKey(prevKey => prevKey + 1); // Reset the StarRating component
            fetchComments();
        } catch (error) {
            console.error('Failed to submit review', error);
        }
    };

    // Callback function to update rating state
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    return (
        <div className="bg-white shadow p-4 rounded-2xl relative">
            <div className="text-2xl text-center">
                Add Review
            </div>
            <div className="py-3 px-4 border-t">
                <StarRating key={key} onRatingChange={handleRatingChange} />
            </div>
            <div className="py-3 px-4 border-t">
                <input type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Leave a comment..."
                    className="w-full p-2 border rounded"
                />
            </div>
            <button onClick={handleSubmit} className="primary mt-4">
                Submit Review
            </button>
            {showMessage && (
                <div style={{
                    position: 'fixed', top: '20px', right: '20px',
                    background: '#FF4500', color: 'white', padding: '10px',
                    borderRadius: '5px', zIndex: 1000
                }}>
                    Review submitted successfully!
                </div>
            )}
        </div>
    );
}
