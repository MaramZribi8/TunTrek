import React, { useState } from 'react';
import './PhotoUploaderProfile.css'; // Import CSS file
import axios from "axios";
import ImageProfile from "./ImageProfile.jsx"
const PhotoUploaderProfile = ({ user, onChange }) => {
    const [file, setFile] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState(user.photo || 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true');

    const photoUpload = async (ev) => {
        ev.preventDefault();
        const reader = new FileReader();
        const file = ev.target.files[0];

        reader.onloadend = async () => {
            setFile(file);


            const data = new FormData();
            data.append('photo', file);

            try {
                const response = await axios.post('/UserPhotos', data);
                const { data: filename } = response;
                setImagePreviewUrl(filename.filename); // Update imagePreviewUrl with the filename from the response
            } catch (error) {
                console.error('Error uploading photo:', error);
                // Handle error
            }
        };

        reader.readAsDataURL(file);
    };

    const saveEdit = async () => {
        if (file) {
            try {
                const response = await axios.put(`/profile`, {
                    email: user.email,
                    name: user.name,
                    photo: imagePreviewUrl,
                    // Update the user profile with the new photo filename
                });
                console.log('Profile updated successfully with new photo:', response.data);
                // Call onChange to update the user data in the parent component
                onChange(response.data);
            } catch (error) {
                console.error('Error updating profile with new photo:', error);
                // Handle error
            }
        } else {
            console.log('No photo selected for upload');
        }
    };

    return (
        <div className="card edit-card">
            <div>
                <label htmlFor="photo-upload" className="custom-file-upload fas">
                    <div className="img-wrap img-upload">
                        <ImageProfile src={imagePreviewUrl} alt="Profile Preview" />
                    </div>
                    <input id="photo-upload" type="file" onChange={photoUpload} />
                </label>
                <div className="field">
                    <img src="user.png" alt="" className="user-icon" />
                    <label htmlFor="name" className="label-text">Name: {user.name} </label>
                </div>
                <div className="field  ">
                    <img src="../src/img/envelope.png" alt="" className="user-icon" />
                    <label htmlFor="email">Email: {user.email}</label>
                </div>
                <button className=" mt-4 bg-secondary primary" onClick={saveEdit}>Save Edit</button>

            </div>
        </div>
    );
}

export default PhotoUploaderProfile;
