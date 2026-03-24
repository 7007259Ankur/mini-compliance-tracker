const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all clients
router.get("/", (req, res) => {
    try {
        const clients = db.prepare("SELECT * FROM clients ORDER BY company_name").all();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch clients" });
    }
});

// GET single client
router.get("/:id", (req, res) => {
    try {
        const client = db.prepare("SELECT * FROM clients WHERE id = ?").get(req.params.id);
        if (!client) return res.status(404).json({ error: "Client not found" });
        res.json(client);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch client" });
    }
});

module.exports = router;
