import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import HostProfile from '../HostProfile';

export default function AdminMessages() {
  const [adminMessages, setAdminMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState('');
  const location = useLocation();
  const { userId, profile } = location.state || {}; 

  // Fetch admin messages
  useEffect(() => {
    const fetchAdminMessages = async () => {
      try {
        const response = await axios.get(`/admin/messages/${userId}`);
        setAdminMessages(response.data);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching admin messages: ${error.message}`);
        setLoading(false);
      }
    };

    if (userId) {
      fetchAdminMessages();
    }
  }, [userId]); // Added userId as dependency

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/profile/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]); // Added userId as dependency

  return (
    <div className="mt-4 bg-gray-100 p-mx-8 px-8">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[1fr_4fr]">
          <div>
            <HostProfile userId={user._id} profile={profile} />
          </div>
          <div>
            <div className="bg-white shadow p-4 rounded-2xl">
              <div className="text-2xl text-center">Messages</div>
              <div style={{ overflow: 'auto', maxHeight: '450px' }}>
                {adminMessages.length > 0 ? (
                  <ul>
                    {adminMessages.map(message => (
                      <li key={message._id} className="my-2">
                        <div className="p-2 mt-2 bg-gray-100 rounded-md shadow-sm">
                          {message.message}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>No messages yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
