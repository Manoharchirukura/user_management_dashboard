// frontend/src/pages/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users');
                setUsers(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
            }
        };
        fetchUsers();
    }, []);

    // --- NEW: Function to handle user deletion ---
    const handleDelete = async (userId) => {
        // Ask for confirmation before deleting
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/users/${userId}`);
                // After successful deletion, update the UI by removing the user from the state
                setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
                console.error("There was an error deleting the user!", error);
            }
        }
    };
    // ---------------------------------------------

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>User List</h2>
                <Link to="/add-user" style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 16px', textDecoration: 'none', borderRadius: '4px' }}>Add User</Link>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #ddd', backgroundColor: '#f8f8f8' }}>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Company</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '12px' }}>
                                    {/* Make the name a link to the details page */}
                                    <Link to={`/user/${user.id}`}>{user.name}</Link>
                                </td>
                                <td style={{ padding: '12px' }}>{user.email}</td>
                                <td style={{ padding: '12px' }}>{user.company}</td>
                                <td style={{ padding: '12px' }}>
                                    <Link to={`/edit-user/${user.id}`} style={{ marginRight: '8px' }}>Edit</Link>
                                    {/* --- UPDATED: Added onClick handler to the button --- */}
                                    <button onClick={() => handleDelete(user.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ padding: '12px', textAlign: 'center' }}>No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;