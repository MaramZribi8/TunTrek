import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";

const ReservationFormAdmin = () => {

    const { user } = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [place, setPlace] = useState('');
    const location = useLocation();
    const { placeId } = location.state || {};  // Extract userId from state


    useEffect(() => {
        if (user) {
            if (!user.isAdmin) {
                setName(user.name);
                setEmail(user.email);
            }

        }
    }, [user]);
    useEffect(() => {

        axios.get(`/places/${placeId}`).then(response => {
            setPlace(response.data);


        });

    }, [placeId]);

    let numberOfNights = differenceInCalendarDays(new Date(place.checkOut), new Date(place.checkIn));




    return (
        <div className="mt-4 bg-gray-100 p-mx-8 px-8 pt-8">

            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">

                <div className="bg-white shadow p-4 rounded-2xl">
                    <div className="text-2xl text-center" style={{ color: '#09caa4' }}>
                        Reservation submission
                    </div>
                    <div className="py-3 px-4 border-t">

                        <form>


                            <label htmlFor="lastName" style={{ color: '#002244' }}>Name <span style={{ color: 'red' }}>*</span></label>
                            <input type="text" id="lastName" name="lastName" value={name} required />

                            <label htmlFor="email" style={{ color: '#002244' }}>Email <span style={{ color: 'red' }}>*</span></label>
                            <input type="email" id="email" name="email" value={email} required />

                            <label htmlFor="phone" style={{ color: '#002244' }}>Phone <span style={{ color: 'red' }}>*</span> </label>
                            <input type="tel" id="phone" name="phone" required />

                            <label htmlFor="address" style={{ color: '#002244' }}>Your Address <span style={{ color: 'red' }}>*</span></label>
                            <input type="text" id="address" name="address" required />


                            <label htmlFor="message" >If you want to leave us a message about your booking or a special condition, please enter it in the field opposite.</label>
                            <textarea id="message" name="message"></textarea>
                            <button className="primary mt-4"> Send message</button>

                        </form>
                    </div>
                </div>


                <div key="booking-widget">
                    <div className="bg-white shadow p-4 rounded-2xl">
                        <div className="text-xl text-center" style={{ color: '#09caa4' }}>
                            <h2>Your Reservation</h2>
                        </div>
                        <div className="py-3 px-4 border-t" >
                            <label style={{ color: '#002244' }}>Trip </label>
                            <input type="text" readOnly value={place.title} />
                        </div>
                        <div className="py-3 px-4 border-t">
                            <label style={{ color: '#002244' }}>Check-in date:</label>
                            <input type="text" readOnly value={place.checkIn} />
                        </div>
                        <div className="py-3 px-4 border-t">
                            <label style={{ color: '#002244' }}>Check-out date</label>
                            <input type="text" readOnly value={place.checkOut} />
                        </div>
                        <div className="py-3 px-4 border-t">
                            <label style={{ color: '#002244' }}>Nights:</label>
                            <input type="text" readOnly value={numberOfNights} />
                        </div>
                        <div className="py-3 px-4 border-t">
                            <label style={{ color: '#002244' }}>Adults:</label>
                            <input type="text" readOnly value="" />
                        </div>

                        <div className="py-3 px-4 border-t">
                            <label style={{ color: '#002244' }}>Total Price:</label>
                            <input type="text" readOnly value="" />
                        </div>
                        <button className="primary mt-4"> Submit </button>

                    </div>
                </div>
            </div>
        </div>




    );
};

export default ReservationFormAdmin;
