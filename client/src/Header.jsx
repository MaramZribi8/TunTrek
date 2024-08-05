import { Link, Navigate, useLocation } from 'react-router-dom'
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "./UserContext.jsx";
import axios from "axios";

import "./Header.css";
import { MenuItemsUser } from "../../api/models/MenuItems.js";
import { MenuItemsAdmin } from "../../api/models/MenuItems.js";
import ImageProfile from "./ImageProfile.jsx"
export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const [redirect, setRedirect] = useState(null);


  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {

      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);

      }
    };


    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef]);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  async function logout() {
    await axios.post('/logout');


    setUser(null);
  }


  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <header className="header-container ">
      <div className="header-logo">
        <Link to={'/'} className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          <span className="font-bold text-xl">TuniTrek</span>
        </Link>
      </div>

      {(!user || (user && !user.isAdmin)) && (
        <ul className="nav-menu">
          {MenuItemsUser.map((item, index) => (
            <li key={index}>
              <Link className={item.cName} to={item.url}>
                <i className={item.icon}></i>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {(user && user.isAdmin) && (
        <ul className="nav-menu">
          {MenuItemsAdmin.map((item, index) => (
            <li key={index}>
              <Link className={item.cName} to={item.url}>
                <i className={item.icon}></i>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}


      <div className="flex items-center gap-2  rounded-full py-2 px-4 relative ">
        <div className="menu-container" ref={menuRef}>

          {<div className="header-profile-image" onClick={() => setOpen(!open)}>
            {user && user.photo ? (
              <ImageProfile src={user.photo} alt="Profile" className="header-user-icon" />
            ) : (

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"

                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

            )}
          </div>}
          <div className={`dropdown-menu ${open ? "active" : "inactive"}`} style={{ zIndex: 10 }}>
            <ul>
              {!user && (
                <Link to={'/login'} className="dropdownItem ">
                  <img src="user.png" alt="" />
                  <span>Login</span> {/* Change <a> to <span> */}
                </Link>
              )}
              {user && (
                <div className="dropdown" >

                  <Link to="/account" className="dropdownItem ">
                    <img src="user.png" />

                    <span>Profile</span> {/* Change <a> to <span> */}
                  </Link>
                  {/* <div className={`dropdown-menu2 ${open ? "active" : "inactive"}`} style={{ zIndex: 10 }}>
                    <ul>
                      <div className={`dropdown-menu2 ${open ? "active" : "inactive"}`} style={{ zIndex: 10 }}>
                        <ul>
                         <Link to="/login" className="dropdownItem2 ">  <img src="user.png" alt="" /><span>Login</span></Link>
                         <Link to="/login"className="dropdownItem2 "><img alt="Settings" /><span>Settings</span></Link>
                        </ul>
                      </div>

                    </ul>

                  </div> */}
                </div>
              )}



              {user && (
                <Link to={'/'} className="dropdownItem" onClick={logout}>
                  <img src="log-out.png" alt="" />
                  <span>Logout</span> {/* Change <a> to <span> */}
                </Link>
              )}


            </ul>
          </div>
        </div>

        {!!user && (
          <div>
            {user.name}
          </div>
        )}

      </div>
    </header>
  );
}
