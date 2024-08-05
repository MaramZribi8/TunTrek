import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function UserAccountNav({ userId }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get(`/user-places/${userId}`).then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  const handleDelete = (id) => {
    const reason = prompt("Admin, please provide a reason for deleting this place:");
    if (reason !== null) { // Check if user canceled the prompt
      if (window.confirm("Admin, Are you sure you want to delete this place?")) {
        axios.delete(`/user-places/${id}`, { data: { reason } })
          .then(() => {
            // Update state to reflect the deletion
            setPlaces(currentPlaces => currentPlaces.filter(place => place._id !== id));
          })
          .catch(err => console.error('Error deleting place:', err));
      }
    }
  };

  return (
    <div style={{ paddingTop: '40px' }}>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {places.length > 0 ? places.map(place => (
          <div key={place._id}>
            <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-2xl" style={{ minHeight: '300px' }}>
              <Link to={'/place/' + place._id} className="flex gap-4" style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div className="flex bg-gray-300" style={{ flex: '3 0 70%', minHeight: '200px' }}>
                  <PlaceImg place={place} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="flex flex-col justify-between" style={{ flex: '1 0 30%' }}>
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>
                    {place.description}
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex flex-lig gap-4 p-4 rounded-1xl justify-between">
              <button onClick={() => handleDelete(place._id)} className="inline-flex items-center gap-2 bg-secondary text-white py-2 px-4 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                Delete
              </button>
            </div>
          </div>
        )) : <p>No Accomodations found.</p>}
      </div>
    </div>
  );
}
