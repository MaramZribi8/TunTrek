import React, { useState } from 'react';
import '../PhotoUploaderProfile.css'; // Import CSS file
import axios from "axios";
import ImageProfile from "../ImageProfile.jsx"

export default function UserProfile({ user }) {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(user.photo || 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true');

  

   

    return (
        <div className="card edit-card">
            <div>
            <label htmlFor="photo-upload" className="custom-file-upload fas">
                    <div className="img-wrap img-upload">
                        <ImageProfile src={user.photo} alt="Profile Preview" />
                    </div>
                    <input id="photo-upload" type="file" />
                </label>
                <div className="field">
                    <img src="user.png" alt="" className="user-icon" />
                    <label htmlFor="name" className="label-text">Name: {user.name} </label>
                </div>
                <div className="field  ">
                    <img src="../src/img/envelope.png" alt="" className="user-icon" />
                    <label htmlFor="email">Email: {user.email}</label>
                </div>

            </div>
        </div>
    );
}
