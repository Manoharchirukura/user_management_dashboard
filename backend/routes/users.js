// backend/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../database.js'); // Go up one level to find database.js

// --- CRUD OPERATIONS ---

// 1. GET (Read all users)
router.get("/", (req, res) => {
    const sql = "SELECT * FROM users";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// 2. GET (Read a single user by ID)
router.get("/:id", (req, res) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ "error": "User not found" });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

// 3. POST (Create a new user)
router.post("/", (req, res) => {
    const { name, email, phone, company, address_street, address_city, address_zip, geo_lat, geo_lng } = req.body;
    
    // Server-side validation
    if (!name || !email) {
        res.status(400).json({ "error": "Name and email are required." });
        return;
    }

    const sql = `INSERT INTO users (name, email, phone, company, address_street, address_city, address_zip, geo_lat, geo_lng) 
                 VALUES (?,?,?,?,?,?,?,?,?)`;
    const params = [name, email, phone, company, address_street, address_city, address_zip, geo_lat, geo_lng];
    
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(201).json({
            "message": "success",
            "data": { id: this.lastID, ...req.body }
        });
    });
});


// 4. PUT (Update a user's details)
router.put("/:id", (req, res) => {
    const { name, email, phone, company, address_street, address_city, address_zip, geo_lat, geo_lng } = req.body;
    const sql = `UPDATE users SET 
                    name = ?, email = ?, phone = ?, company = ?, 
                    address_street = ?, address_city = ?, address_zip = ?, 
                    geo_lat = ?, geo_lng = ? 
                 WHERE id = ?`;
                 
    const params = [name, email, phone, company, address_street, address_city, address_zip, geo_lat, geo_lng, req.params.id];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ "error": "User not found" });
            return;
        }
        res.json({
            "message": "success",
            "data": req.body,
            "changes": this.changes
        });
    });
});


// 5. DELETE (Delete a user)
router.delete("/:id", (req, res) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    const params = [req.params.id];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": res.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ "error": "User not found" });
            return;
        }
        res.json({ "message": "deleted", "changes": this.changes });
    });
});

module.exports = router;