import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";
import CustomPhoneInput from './pages/CustomPhoneInput.jsx';
// Import the PlaceModel
export default function BookingWidget({ place }) {
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);
  const [maxGuests, setMaxGuests] = useState(place.maxGuests);
  const checkIn = place.checkIn;
  const checkOut = place.checkOut;
  const minGuests = 1;
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);


  async function bookThisPlace(guests) {
    if (!name || !phone) {
      alert("Please fill in all the required fields.");
      return;
    }
    if (!user) {
      setRedirect('/login');
      return;
    }

    try {
      // Calculate the new maxGuests value
      const newMaxGuests = place.maxGuests - guests;
      try {
        await axios.put(`/places/${place._id}`, { maxGuests: newMaxGuests });

      } catch (e) {
        console.log(e);
      }
      // Update the maxGuests value in the database

      // Proceed with booking
      const response = await axios.post('/bookings', {
        checkIn,
        checkOut,
        numberOfGuests: guests,
        name,
        phone,
        place: place._id,
        price: numberOfGuests * place.price,
      });
      const bookingId = response.data._id;

      // Redirect to booking confirmation page
      navigate(`/account/reservation/${bookingId}`, { state: { bookingId } });
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: {place.price} DT / per night
      </div>
      <div className="py-3 px-4 border-t">
        <label>Number of guests:</label>
        <input type="number"
          value={numberOfGuests}
          onChange={ev => setNumberOfGuests(ev.target.value)}
          max={maxGuests}
          min={minGuests} />
      </div>

      <div className="py-3 px-4 border-t">
        <label>Your full name:</label>
        <input type="text"
          value={name}
          onChange={ev => setName(ev.target.value)} />
        <label>Phone number:</label>
        <CustomPhoneInput
          value={phone}
          onChange={setPhone}
        />
      </div>

      <button onClick={() => bookThisPlace(numberOfGuests)} className="primary mt-4">
        Book this place

      </button>
    </div>
  );
}
