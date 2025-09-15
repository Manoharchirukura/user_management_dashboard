// frontend/src/pages/UserDetails.js
// frontend/src/pages/UserDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const UserDetails = () => {
    const [user, setUser] = useState(null); // Start with null to handle loading state
    const { id } = useParams(); // Get the user ID from the URL

    useEffect(() => {
        // Fetch the specific user's data when the component mounts
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/${id}`);
                setUser(response.data.data);
            } catch (error) {
                console.error("Failed to fetch user details:", error);
            }
        };

        fetchUserDetails();
    }, [id]); // The effect depends on the `id` from the URL

    // Show a loading message while the data is being fetched
    if (!user) {
        return <div>Loading user details...</div>;
    }

    const cardStyle = {
        padding: '2rem',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #eee'
    };

    const detailItemStyle = {
        marginBottom: '1rem',
        lineHeight: '1.6'
    };

    return (
        <div>
            <div style={cardStyle}>
                <h2>{user.name}</h2>
                <div style={detailItemStyle}><strong>Email:</strong> {user.email}</div>
                <div style={detailItemStyle}><strong>Phone:</strong> {user.phone}</div>
                <div style={detailItemStyle}><strong>Company:</strong> {user.company}</div>
                <div style={detailItemStyle}>
                    <strong>Address:</strong><br />
                    {user.address_street},<br />
                    {user.address_city}, {user.address_zip}
                </div>
                <div style={detailItemStyle}>
                    <strong>Geo Location:</strong><br />
                    Latitude: {user.geo_lat}, Longitude: {user.geo_lng}
                </div>
            </div>

            <Link to="/" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
                &larr; Back to User List
            </Link>
        </div>
    );
};

export default UserDetails;