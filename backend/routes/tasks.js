const express = require("express");
const router = express.Router();
const db = require("../db");

const VALID_STATUSES = ["Pending", "In Progress", "Completed"];
const VALID_PRIORITIES = ["Low", "Medium", "High"];

// GET tasks for a client
router.get("/client/:clientId", (req, res) => {
    try {
        const { status, category } = req.query;
        let query = "SELECT * FROM tasks WHERE client_id = ?";
        const params = [req.params.clientId];

        if (status) { query += " AND status = ?"; params.push(status); }
        if (category) { query += " AND category = ?"; params.push(category); }

        query += " ORDER BY due_date ASC";
        const tasks = db.prepare(query).all(...params);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// POST create a task
router.post("/", (req, res) => {
    try {
        const { client_id, title, description, category, due_date, status, priority } = req.body;

        if (!client_id || !title || !category || !due_date) {
            return res.status(400).json({ error: "client_id, title, category, and due_date are required" });
        }

        const taskStatus = status || "Pending";
        const taskPriority = priority || "Medium";

        if (!VALID_STATUSES.includes(taskStatus)) {
            return res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(", ")}` });
        }
        if (!VALID_PRIORITIES.includes(taskPriority)) {
            return res.status(400).json({ error: `priority must be one of: ${VALID_PRIORITIES.join(", ")}` });
        }

        const client = db.prepare("SELECT id FROM clients WHERE id = ?").get(client_id);
        if (!client) return res.status(404).json({ error: "Client not found" });

        const result = db.prepare(
            "INSERT INTO tasks (client_id, title, description, category, due_date, status, priority) VALUES (?, ?, ?, ?, ?, ?, ?)"
        ).run(client_id, title, description || "", category, due_date, taskStatus, taskPriority);

        const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(result.lastInsertRowid);
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: "Failed to create task" });
    }
});

// PATCH update task status
router.patch("/:id/status", (req, res) => {
    try {
        const { status } = req.body;
        if (!status || !VALID_STATUSES.includes(status)) {
            return res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(", ")}` });
        }

        const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(req.params.id);
        if (!task) return res.status(404).json({ error: "Task not found" });

        db.prepare("UPDATE tasks SET status = ? WHERE id = ?").run(status, req.params.id);
        res.json({ ...task, status });
    } catch (err) {
        res.status(500).json({ error: "Failed to update task" });
    }
});

module.exports = router;
