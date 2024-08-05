
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import HostProfile from "./HostProfile";
import ReviewForm from "./ReviewForm";
import { UserContext } from '../UserContext.jsx';
import ReviewList from "./ReviewList";

export default function PlacePage() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);
  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const response = await axios.get('/profile');
        const userData = response.data;
        if (userData) {
          setUser(userData);

        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }

    };

    fetchUserData();
  }, [setUser]);
  if (!place) return '';

  async function reservation() {
    let placeId = place._id;

    navigate(`/account/admin/reservation/${placeId}`, { state: { placeId } });

  }

  return (
    <div className="mt-4 bg-gray-100 p-mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink key="address-link">{place.address}</AddressLink>
      <PlaceGallery key="place-gallery" place={place} className="rounded-2xl flex justify-center items-center w-100 h-64 bg-gray-300 overflow-hidden block mx-auto" />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div key="description">
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Program</h2>
            {place.description}
          </div>
          <span className="inline-flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              style={{ stroke: "#09caa4", marginRight: "0.5rem" }}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>

            Check-in: {place.checkIn}
          </span><br />


          <span className="inline-flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              style={{ stroke: "#09caa4", marginRight: "0.5rem" }}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            Check-out: {place.checkOut}
          </span><br />

          <AddressLink key="address-link">{place.Daddress}</AddressLink>


          <span className="inline-flex items-center text-gray-500">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEX0lEQVR4nO2ZWYgdVRCGO9G4iwsuxBWiBlwQ3EDE9UUhKAZ8iYKiER8kIJIYFKN+f/e915nJOOqoUe+byODAgObB5cUF8xAiIW4RTSQGGbcEUVRiXBIdpTId6bTd0326+w4DOT/U071VXfWf6lNLB4GHh4eHh4eHh4eHh4eHh4fHNGFsbOwA4Lhutzsn2F/Q399/lKQVwEfAX5L+ASYkbZLU6XQ6JwYzGZ1O53hJ90t6VdLbwPNhGF5VRhdYCHxvQU8hvwCLy9iLougiScPAW8BrgIDTageZB+B6ST9lOQ6MDA8PH5ynK+lOSX8XBJ+UFVP4MVvSE3HmpPV2SrojaBrA5cCuAqdHc3QvK6GbJnQiDMMbc+w9VkL3piaDny3pkzKOh2F4XUp9FrDeJfiEjKezCjivTCYB24HDmiLgSoeTeyWle23F4Pfauz1pT9LTDvo3N0KAJi+9sg/dliLgmZoEpAnd4KD7VCMEAP0OTv+ZIm9tHQIkfZmyt9WBgJFGCJC0zMHhr1O6W2oS8HvqMN5zIODxRggIw/CSqqwDG2sS8GPK3koHXxYGTUHSuhIPnAAuTem9XpOAD1MEzCtZUrc22mJHUXSupB2uKQcsrUnAYIbN+wr82FW2O63yKmRdQrutj7d+Ia3TarVOBf6oErxlVBRFF2T5AtwL/Jaht81Kb9ArAIdYfZW0CngReDCKorOm0rF+vSIBYwW+nGIZBrxgM4nNEAMDA0cGMw1Mkva+IwHjNioHMwXAETZkAC9J+hz42VIb+ErSGuAha1On0D8J+KBk8FuA+Xm2Wq3WGZKWS3rT+oT4VdgBfCHpZUl39/X1HdNI4N1ud44FZ+WozDsraXUURWdn2RocHDwceNRqe44Nu0tW5TnfarVOj1+7PXuEAjFCVtaaB5h8x6oMMjuBW6awe7SkW+ORdgR4UtJdwAl5OjZklTmEjEPZDJzjHHy73T65ahcHfBaG4Q1Bg7CBrOpUaZNhXlZmwsoZ8G6Fh+0GHgEOzLb8X1lcEJcx+29/vMlZavO/NTo2Queoz5K0JKf8FcmndhmXJWBxBZZ/sKVJjr0L4zQvNcgA38Srtity7NlOYLwCCQ+XJWCjo+Fvs25ta4uBd6qkbYKM9VmNTVxVNjvasybpoKLg5zsatSXm+UkbQ0NDh0p6znEHWCSjtlFOVwUj38VOGIbXFBGwyPGEFiX12+323BorsCLZBJyZ8vdqF6Jtjigi4DYHh1Ynde2EbN/fo+CT98M+q2/gWQf9B4oImFdm3IxH333qK/BGL4NPPHtDstLYx5SyA1d6XM9EXGqKuq01SR1rfKYj+IQsT/k8WuLA2oHj/L8kXoj+T9KXSQObH9cs2J7MAuDiPF+Be+z3oFcAjp3m099LgnuL2wuwvxNgkPTxNAf/nX1eD2YKgAUNNz5F0vwH0LqwHgL4tccnbyV6WTBT0W6355qD8Z5urEHZs3+Mp0UPDw8PDw8PDw8PDw+PoCb+Bc46mFBbHSY/AAAAAElFTkSuQmCC"
              width="20"
              height="20"
              className="mr-2"
            />
            <span>{place.maxGuests} Guests</span>
          </span>
          {user && user.isAdmin && (<div>
            <button onClick={reservation} className="inline-flex items-center bg-primary text-white py-1 px-3 rounded">
              View reservation details  </button>
          </div>)}
        </div>
        <div>
          {!user || (user && !user.isAdmin) && (<div key="booking-widget">
            <BookingWidget place={place} />

          </div>)}


        </div>

      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5" key="extra-info">{place.extraInfo}</div>

      </div>
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[1fr_2fr]">
        
        <div>
          <HostProfile userId={place.owner} profile={user} />
        </div>
        {((!!user) || (user && !user.isAdmin)) ? (
          <div>
            <ReviewForm productId={place._id} user={user} />
            <br />
            <ReviewList user={user} productId={place._id} style={{ overflow: 'auto', maxHeight: '145px' }} />
          </div>
        ) : (
          <div>
            <ReviewList user={user} productId={place._id} style={{ overflow: 'auto', maxHeight: '450px' }} />
          </div>
        )}
      </div>





    </div>

  );
}
