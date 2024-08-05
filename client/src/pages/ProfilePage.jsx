import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx';
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';
import PhotoUploaderProfile from '../PhotoUploaderProfile.jsx';

export default function ProfilePage() {
    const { ready, user, setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    let { subpage } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('/profile');
                const userData = response.data;
                if (userData) {
                    setUser(userData);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, [setUser]);

    if (!ready || isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col md:flex-row w-full">
            <div className="md:w-3/10">
                <PhotoUploaderProfile user={user} onChange={(updatedUser) => setUser(updatedUser)} />
            </div>
            <div className="md:w-7/10 w-full">
                <AccountNav />
            </div>
            {subpage === 'places' && <PlacesPage />}
        </div>
    );
}
