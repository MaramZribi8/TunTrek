import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";
import { UserContext } from "../UserContext";
import FavoriteIcon from "./FavoriteIcon";
function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [places, setPlaces] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [userResponse, placesResponse] = await Promise.all([
          axios.get('/profile'),
          axios.get('/places')
        ]);
        setUser(userResponse.data);
        setPlaces(placesResponse.data);
        // Fetch bookings if user data is successfully retrieved
        if (userResponse.data && userResponse.data._id) {
          const bookingsResponse = await axios.get('/bookings', { params: { userId: userResponse.data._id } });
          setBookings(bookingsResponse.data);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setUser]);
  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    }).catch(error => console.error('Failed to fetch bookings:', error));
  }, []);
  const toggleFavorite = async (placeId) => {
    const updatedFavorites = user.Favorites.includes(placeId)
      ? user.Favorites.filter(id => id !== placeId)
      : [...user.Favorites, placeId];

    try {
      await axios.put('/profile', { Favorites: updatedFavorites });
      setUser({ ...user, Favorites: updatedFavorites });
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };
  return (
   
     <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {bookings.length > 0 ? bookings.filter(booking => booking.place).map(booking => (
         
            <Link to={`/account/bookings/${booking._id}`}  className={`place-card flex flex-col gap-4 p-4 rounded-2xl overflow-hidden `}>
              <div className="place-image flex-grow overflow-hidden">
                <PlaceImg place={booking.place} className=" w-full h-64 object-cover "  />
              
             
              </div>
              {user && <FavoriteIcon placeId={booking.place._id} user={user} toggleFavorite={toggleFavorite} />}
              <div>
              <h2 className="text-xl font-bold" style={{ color: '#002244' }}><span className="inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" -rotate-90">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  <span>{booking.place.title}</span>
                </span></h2>
                <div className="text-xl">
                  <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" />
                 
                  <button class="custom-button">Edit reservation</button>
                
                </div>
              </div>
            </Link>
        
        )) : <p>No bookings found.</p>}
      </div>
  );
}

export default React.memo(BookingsPage);
