import React from "react";
import Header from "./Header";
import Footer from "./Footer"; // Import the Footer component
import { Outlet } from "react-router-dom";
import "./Layout.css";
export default function Layout() {
  return (
    <div className="container">
      <Header />

      <Outlet />
      <Footer />
      {/* <Footer /> */}

    </div>
  );
}
