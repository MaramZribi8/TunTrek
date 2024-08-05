import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import "./indexPage.css";
import { UserContext } from "../UserContext.jsx";
import PlaceGallery from "../PlaceGallery";
import FavoriteIcon from "./FavoriteIcon";
export default function SearchResult() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [places, setPlaces] = useState([]);
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  // Extract query parameters from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const destination = searchParams.get("destination");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  useEffect(() => {
    // Construct query parameters
    const queryParams = {};
    if (destination) queryParams.destination = destination;
    if (checkIn) queryParams.checkIn = checkIn;
    if (checkOut) queryParams.checkOut = checkOut;

    // Make API call with query parameters if at least one field is provided
    if (Object.keys(queryParams).length > 0) {
      axios.get('/search', { params: queryParams })
        .then(({ data }) => {
          setSearchResults(data);
          setLoading(false);
        })
        .catch(error => {
          setError("Error fetching search results");
          setLoading(false);
        });
    } else {
      // If no input fields are provided, set search results to empty array
      setSearchResults([]);
      setLoading(false);
    }
  }, [destination, checkIn, checkOut]);


  useEffect(() => {
    // Fetch places
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });

    // Fetch bookings for the user
    const fetchBookings = async () => {
      if (user && user._id) {
        try {
          const response = await axios.get('/bookings', { params: { userId: user._id } });
          setBookings(response.data);
        } catch (error) {
          console.error('Error fetching bookings for user:', error);
        }
      }
    };

    fetchBookings();
  }, [user]);

  const isPlaceBooked = (place) => {
    return bookings.some(booking => booking && booking.isSubmitted && booking.place && booking.place._id === place._id);
  };
  const isUserOwner = (place) => user && place.owner === user._id;
  const isStillAvailable = (place) => place.maxGuests > 0;
  const toggleFavorite = (placeId) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(placeId)) {
        // Remove from favorites
        return currentFavorites.filter(id => id !== placeId);
      } else {
        // Add to favorites
        return [...currentFavorites, placeId];
      }
    });
  };
  return (
    <Container>
      <section>
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : error ? (
          <h4 className="text-center">{error}</h4>
        ) : (
          <Row>
            {searchResults.length === 0 ? (
              <Col>
                <h4 className="text-center">No Places Found</h4>
              </Col>
            ) : (
              <div className="mt-8 grid">
                {searchResults.map((place) => isStillAvailable(place) && (

                  <Link key={place._id} to={`/place/${place._id}`} className={`place-card flex flex-col gap-4 p-4 rounded-2xl overflow-hidden `}
                  >
                    <div className="place-image flex-grow overflow-hidden">
                      <PlaceGallery place={place} className=" w-full h-64 object-cover " />

                      {/* {isUserOwner(place) && <div className="booked-overlay">Your Accommodation</div>}
                                        {isPlaceBooked(place) && <div className="booked-overlay">Already BOOKED</div>}
                                        {!isUserOwner(place) && !isPlaceBooked(place) && !isStillAvailable(place) && <div className="booked-overlay">Not Available</div>} */}
                    </div>

                    {user && <FavoriteIcon placeId={place._id} user={user} toggleFavorite={toggleFavorite} />}
                    <div>
                      <h2 className="text-xl font-bold" style={{ color: '#002244' }}><span className="inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" -rotate-90">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                        <span>{place.title}</span>
                      </span></h2>
                      <h3 className="text-sm text-gray-500">
                        <span className="inline-flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin mr-1">
                            <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <span>{place.address}</span>
                        </span>
                      </h3>




                      <div className="mt-2 mb-4">

                        <span className="inline-flex items-center text-gray-500">
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEX0lEQVR4nO2ZWYgdVRCGO9G4iwsuxBWiBlwQ3EDE9UUhKAZ8iYKiER8kIJIYFKN+f/e915nJOOqoUe+byODAgObB5cUF8xAiIW4RTSQGGbcEUVRiXBIdpTId6bTd0326+w4DOT/U071VXfWf6lNLB4GHh4eHh4eHh4eHh4eHh4fHNGFsbOwA4Lhutzsn2F/Q399/lKQVwEfAX5L+ASYkbZLU6XQ6JwYzGZ1O53hJ90t6VdLbwPNhGF5VRhdYCHxvQU8hvwCLy9iLougiScPAW8BrgIDTageZB+B6ST9lOQ6MDA8PH5ynK+lOSX8XBJ+UFVP4MVvSE3HmpPV2SrojaBrA5cCuAqdHc3QvK6GbJnQiDMMbc+w9VkL3piaDny3pkzKOh2F4XUp9FrDeJfiEjKezCjivTCYB24HDmiLgSoeTeyWle23F4Pfauz1pT9LTDvo3N0KAJi+9sg/dliLgmZoEpAnd4KD7VCMEAP0OTv+ZIm9tHQIkfZmyt9WBgJFGCJC0zMHhr1O6W2oS8HvqMN5zIODxRggIw/CSqqwDG2sS8GPK3koHXxYGTUHSuhIPnAAuTem9XpOAD1MEzCtZUrc22mJHUXSupB2uKQcsrUnAYIbN+wr82FW2O63yKmRdQrutj7d+Ia3TarVOBf6oErxlVBRFF2T5AtwL/Jaht81Kb9ArAIdYfZW0CngReDCKorOm0rF+vSIBYwW+nGIZBrxgM4nNEAMDA0cGMw1Mkva+IwHjNioHMwXAETZkAC9J+hz42VIb+ErSGuAha1On0D8J+KBk8FuA+Xm2Wq3WGZKWS3rT+oT4VdgBfCHpZUl39/X1HdNI4N1ud44FZ+WozDsraXUURWdn2RocHDwceNRqe44Nu0tW5TnfarVOj1+7PXuEAjFCVtaaB5h8x6oMMjuBW6awe7SkW+ORdgR4UtJdwAl5OjZklTmEjEPZDJzjHHy73T65ahcHfBaG4Q1Bg7CBrOpUaZNhXlZmwsoZ8G6Fh+0GHgEOzLb8X1lcEJcx+29/vMlZavO/NTo2Queoz5K0JKf8FcmndhmXJWBxBZZ/sKVJjr0L4zQvNcgA38Srtity7NlOYLwCCQ+XJWCjo+Fvs25ta4uBd6qkbYKM9VmNTVxVNjvasybpoKLg5zsatSXm+UkbQ0NDh0p6znEHWCSjtlFOVwUj38VOGIbXFBGwyPGEFiX12+323BorsCLZBJyZ8vdqF6Jtjigi4DYHh1Ynde2EbN/fo+CT98M+q2/gWQf9B4oImFdm3IxH333qK/BGL4NPPHtDstLYx5SyA1d6XM9EXGqKuq01SR1rfKYj+IQsT/k8WuLA2oHj/L8kXoj+T9KXSQObH9cs2J7MAuDiPF+Be+z3oFcAjp3m099LgnuL2wuwvxNgkPTxNAf/nX1eD2YKgAUNNz5F0vwH0LqwHgL4tccnbyV6WTBT0W6355qD8Z5urEHZs3+Mp0UPDw8PDw8PDw8PDw+PoCb+Bc46mFBbHSY/AAAAAElFTkSuQmCC"
                            width="20"
                            height="20"
                            className="mr-2"
                          />
                          <span>{place.maxGuests} Guests</span>
                        </span>
                      </div>
                    </div>
                    {isUserOwner(place) && <button class="custom-button">Edit reservation</button>}
                    {isPlaceBooked(place) && !isUserOwner(place) && <button class="custom-button">Your reservation</button>}

                    {!isPlaceBooked(place) && !isUserOwner(place) && <button class="custom-button">Book now !</button>}
                  </Link>
                ))}
              </div>
            )}
          </Row>
        )}
      </section>
    </Container>
  );
}
