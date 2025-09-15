import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        address_street: '',
        address_city: '',
        address_zip: '',
        geo_lat: '',
        geo_lng: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditing = Boolean(id);
    const API_BASE_URL = 'https://user-management-dashboard-87fp.onrender.com';

    useEffect(() => {
        if (isEditing) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/api/users/${id}`);
                    setFormData(response.data.data);
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                }
            };
            fetchUser();
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            alert('Name and Email are required fields.');
            return;
        }

        try {
            if (isEditing) {
                await axios.put(`${API_BASE_URL}/api/users/${id}`, formData);
            } else {
                await axios.post(`${API_BASE_URL}/api/users`, formData);
            }
            navigate('/');
        } catch (error) {
            console.error("There was an error submitting the form!", error);
            alert('Failed to save user. Please check the console for details.');
        }
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    };

    const inputStyle = {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" style={inputStyle} required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" style={inputStyle} required />
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" style={inputStyle} />
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" style={inputStyle} />
                <input type="text" name="address_street" value={formData.address_street} onChange={handleChange} placeholder="Street" style={inputStyle} />
                <input type="text" name="address_city" value={formData.address_city} onChange={handleChange} placeholder="City" style={inputStyle} />
                <input type="text" name="address_zip" value={formData.address_zip} onChange={handleChange} placeholder="Zip Code" style={inputStyle} />
                <input type="text" name="geo_lat" value={formData.geo_lat} onChange={handleChange} placeholder="Latitude" style={inputStyle} />
                <input type="text" name="geo_lng" value={formData.geo_lng} onChange={handleChange} placeholder="Longitude" style={inputStyle} />

                <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {isEditing ? 'Update User' : 'Create User'}
                </button>
            </form>
        </div>
    );
};

export default UserForm;