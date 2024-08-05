import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PlacesPage from "./pages/PlacesPage";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import PlacesFormPage from "./pages/PlacesFormPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

import About from "./About.jsx";
import SearchResult from "./pages/SearchResult.jsx";
import Blog from "./Blog.jsx";
import Contact from "./Contact.jsx";
import FavoritesList from "./pages/FavoritesList";
import Chat from "./Chat/Chat";
import UserList from "./pages/Admin/UserList";
import UserProfilePage from "./pages/UserProfilePage";
import ReservationForm from "./pages/ReservationForm";
import UnauthorizedPage from "./UnauthorizedPage";
import AdminMessages from "./pages/Admin/AdminMessages";
import ReservationFormAdmin from "./pages/ReservationFormAdmin";
axios.defaults.baseURL = "http://localhost:4001";
axios.defaults.withCredentials = true;
export default function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />

          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/search" element={<SearchResult />} />
          <Route path="/account/favorites" element={<FavoritesList />} />
          <Route path="/account/chats" element={<Chat />} />
          <Route path="/dashboard" element={<UserList />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/account/admin/reservation/:placeId" element={<ReservationFormAdmin />} />
          <Route path="/account/reservation/:bookingId" element={<ReservationForm />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/Dashboard/admin/messages/:id" element={<AdminMessages />} />

        </Route>
      </Routes>
    </UserContextProvider>
  );
}