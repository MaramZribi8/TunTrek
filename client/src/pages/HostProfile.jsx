import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useHistory
import ImageProfile from "../ImageProfile.jsx";
/**  * */
const HostProfile = ({ userId, profile }) => {
    const [user, setUser] = useState('');
    console.log("user profile", userId);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/profile/${userId}`);
                setUser(response.data); // Set the user data in state
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const navigate = useNavigate();  // use useNavigate hook for navigation
    const Contact = () => {
        if (profile && profile.isAdmin) {

            navigate('/profile', { state: { userId } });

        }
        else {
            navigate('/account/chats', { state: { userId } });
        }
    };
    return (


        <div className=" bg-white shadow p-4 rounded-2xl">

            <div className="profile-image text-center">
                <h1 className="text-2xl">Contact Organizer</h1>
                {user.photo && <ImageProfile src={user.photo} />}
            </div>

            <div className="user-info">
                <div className="py-3 px-4 border-t">
                    <label>Name:</label>
                    <h3>{user.name}</h3>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Email:</label>
                    <h3>{user.email}</h3>
                </div>
                {profile && profile.isAdmin ? <button onClick={Contact} className="primary mt-4">View Profile</button> : <button onClick={Contact} className="primary mt-4">Send message</button>}
            </div>

        </div>


    );
};

export default HostProfile;
