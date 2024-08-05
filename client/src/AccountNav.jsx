import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AccountNav() {
  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[2] || 'profile';

  function linkClasses(type = null) {
    let baseClasses = 'flex items-center justify-center rounded-full w-48 h-48 transform'; // Maintain size and add transform for translation
    let activeClasses = 'bg-primary text-white shadow-lg scale-125'; // Active link styling
    let inactiveClasses = 'bg-gray-200 text-gray-800 hover:bg-gray-300 scale-125'; // Inactive link styling

    return `${baseClasses} ${type === subpage ? activeClasses : inactiveClasses}`;
  }

  return (
    <div className="link-container">
      <div className="link-box ">
        <Link to={'/account/bookings'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ color: '#002244' }} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0 a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0 a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span className="link-text" style={{ color: '#002244' }}>Bookings</span>
        </Link>
      </div>
      <div className="link-box accommodations">
        <Link to={'/account/places'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ color: '#002244' }} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
          </svg>
          <span className="link-text" style={{ color: '#002244' }}>Accomodations</span>
        </Link>

      </div>
      <div className="link-box " style={{ color: '#002244' }}>
        <Link to={'/account/favorites'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 300 150" // Corrected viewBox to remove commas
            style={{ color: '#002244' }}// Adjusted style to JSX format
          >
            <g
              fill="#002244"
              fillRule="nonzero" // CamelCase for JSX compatibility
              stroke="none"
              strokeWidth="1" // CamelCase for JSX compatibility
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
            // Inline style as a JSX object
            >
              <g transform="scale(5.12,5.12)">
                <path d="M49.963,20.911c-0.1,-0.4 -0.5,-0.7 -0.9,-0.7l-6.7,-0.4l-2.4,-6.3c-0.1,-0.3 -0.5,-0.6 -0.9,-0.6c-0.4,0 -0.8,0.3 -1,0.5l-0.063,0.164v-10.575c0,-0.552 -0.448,-1 -1,-1h-24c-0.552,0 -1,0.448 -1,1v44c0,0.358 0.191,0.689 0.502,0.867c0.311,0.178 0.693,0.177 1.002,-0.003l11.496,-6.706l11.496,6.706c0.155,0.091 0.33,0.136 0.504,0.136c0.172,0 0.344,-0.044 0.498,-0.133c0.311,-0.178 0.502,-0.509 0.502,-0.867v-16.206l1.063,-0.683l5.6,3.7c0.3,0.3 0.8,0.2 1.1,0c0.4,-0.3 0.5,-0.7 0.4,-1.1l-1.7,-6.5l5.2,-4.2c0.3,-0.3 0.4,-0.7 0.3,-1.1zM42.662,25.111c-0.3,0.2 -0.4,0.6 -0.3,1l1.2,4.6l-4,-2.6c-0.1,-0.1 -0.3,-0.2 -0.5,-0.2c-0.2,0 -0.4,0.1 -0.6,0.1l-5.021,3.725l2.221,-5.725c0.1,-0.3 0,-0.8 -0.3,-1l-4.7,-3l5.8,-0.2c0.4,-0.1 0.7,-0.3 0.9,-0.7l1.7,-4.4l1.6,4.5c0.2,0.3 0.5,0.6 0.9,0.6l4.8,0.3z"></path>
              </g>
            </g>
          </svg>
          <span className="link-text" style={{ color: '#002244' }}>Favorites Places</span>
        </Link>

      </div>
      <div className="link-box " style={{ color: '#002244' }}>
        <Link to={'/account/chats'}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="80">
  <path d="M27 15v4a1 1 0 0 1-1 1H7l-4 4V4a1 1 0 0 1 1-1h22a1 1 0 0 1 1 1v11z"></path>
</svg>
        </Link>
        <span className="link-text" style={{ color: '#002244' }}>Send message </span>

      </div>

    </div>
  );
}
