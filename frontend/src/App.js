// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import UserDetails from './pages/UserDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>User Management Dashboard</h1>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/add-user" element={<UserForm />} />
          <Route path="/edit-user/:id" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;