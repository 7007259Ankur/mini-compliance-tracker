const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: ["https://flourishing-moxie-1f9537.netlify.app", "http://localhost:5173"],
}));
app.use(express.json());

app.use("/api/clients", require("./routes/clients"));
app.use("/api/tasks", require("./routes/tasks"));

app.get("/", (req, res) => res.json({ message: "Compliance Tracker API" }));

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
