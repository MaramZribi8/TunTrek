// // Navbar.jsx
// import React, { useState } from "react";
// import "./navbar.css";
// import { IoMdCloseCircleOutline } from "react-icons/io";
// import { TbGridDots } from "react-icons/tb";
// import { useContext } from "react";
// import { UserContext } from "./UserContext.jsx";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   const { user } = useContext(UserContext);

//   const [active, setActive] = useState(false); // Utiliser un booléen pour gérer l'état actif

//   const toggleNav = () => {
//     setActive(!active); // Inverser l'état actif lorsque le bouton est cliqué
//   };

//   return (
//     <section className="navBarSection">
//       <div className="header">
//         <div className="logoDiv">
//           <Link href="/" className="logo">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6 -rotate-90"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
//               />
//             </svg>
//             <span className="font-bold text-xl">Travel</span>
//           </Link>
//         </div>
//         <div className={`navBar ${active ? "activeNavbar" : ""}`}>
//           <ul className="navLists flex">
//             <li className="navItem">
//               <Link href="/" className="navLink">
//                 Home
//               </Link>
//             </li>
//             {/* Ajouter les autres liens ici */}

//             <div className="header-profile">
//               <Link
//                 to={user ? "/account" : "/login"}
//                 className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 header-profile-container"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
//                   />
//                 </svg>
//                 <div className="header-profile-image">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="w-6 h-6"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//                     />
//                   </svg>
//                 </div>
//                 {!!user && <div>{user.name}</div>}
//               </Link>
//             </div>
//           </ul>
//           <div onClick={toggleNav} className="closeNavbar">
//             <IoMdCloseCircleOutline className="icon" />
//           </div>
//         </div>
//         <div onClick={toggleNav} className="toggleNavbar">
//           <TbGridDots className="icon" />
//         </div>
//       </div>
//     </section>
//   );
// }