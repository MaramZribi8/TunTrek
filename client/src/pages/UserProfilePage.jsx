import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import AccountNav from '../AccountNav';
import UserProfile from './UserProfile.jsx';
import { useLocation } from "react-router-dom";
import UserAccountNav from './UserAccountNav';

export default function UserProfilePage() {

    const [user, setUser] = useState('');
    const location = useLocation();
  const { userId } = location.state || {};  // Extract userId from state

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
    }, []);

console.log(user);

    return (
        <div className="flex flex-col md:flex-row w-full">
            <div className="md:w-3/10">
                <UserProfile user={user} onChange={(updatedUser) => setUser(updatedUser)}  />
            </div>
            <div className="md:w-7/10 w-full">
                <UserAccountNav userId={userId} />
            </div>

        </div>
    );
}

