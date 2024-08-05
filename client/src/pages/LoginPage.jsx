
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

// Your SVG icons
// SVG code for the eye icon
const eyeSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm0-2c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm1-5c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z" />
  </svg>
);

// SVG code for the eye-off icon
const eyeOffSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M20.71 21.29l-1.42 1.42-4.06-4.06C13.53 18.79 11.8 19 10 19c-5 0-9-4.03-9-9s4.03-9 9-9c2.57 0 4.86 1.09 6.49 2.83l-2.98 2.98C12.3 6.15 11.18 6 10 6 6.13 6 3 9.13 3 13s3.13 7 7 7c1.18 0 2.3-.15 3.37-.42l-2.12 2.12 1.41 1.41 7.1-7.1 1.42 1.42zM12 16c1.11 0 2.11-.39 2.89-1.03l-4.92-4.92C8.39 9.89 8 10.89 8 12s.39 2.11 1.05 2.91l1.92-1.92c.34.05.69.08 1.03.08zm0-10c-1.11 0-2.11.39-2.89 1.03l4.92 4.92C15.61 14.11 16 13.11 16 12s-.39-2.11-1.05-2.91l-1.92 1.92c-.34-.05-.69-.08-1.03-.08zm0 8c-.55 0-1-.45-1-1s.45-1 1-1 .99.45.99 1-.44 1-1 1z" />
  </svg>
);


// Your SVG icons (same as you provided)

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();

    try {
      const { data } = await axios.post('/login', { email, password });
      if (data.isAdmin) {
         alert("Welcome Admin !");

        setRedirect(true);
      } else {
        setRedirect(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setUnauthorized(true);
      } else {
        // Handle other errors differently or set an error message
      }
    }
  }

  if (unauthorized) {
    return <Navigate to="/unauthorized" />;
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)} />
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" style={{ background: 'transparent', border: 'none', padding: 0 }} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? eyeOffSvg : eyeSvg}
            </button>
          </div>
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
