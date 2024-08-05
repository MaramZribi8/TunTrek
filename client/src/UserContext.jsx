import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);


  useEffect(() => {
    // Move the function declaration outside of useEffect for clarity and potential reusability
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/profile');
        setUser(data);   // Set the user data received from server
        setReady(true);  // Set ready to true indicating data is loaded
      } catch (e) {
        console.error("Failed to fetch profile:", e); // Properly log the error
        setReady(true);  // Still set ready to true to indicate loading has finished, even if it failed
      }
    };

    if (!user) {
      fetchProfile();
    }
  }, [user]); // Removed the empty dependency array if you want to re-fetch when user is reset to null

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
