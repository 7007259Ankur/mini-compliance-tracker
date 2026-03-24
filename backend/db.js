const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "compliance.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    country TEXT NOT NULL,
    entity_type TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    due_date TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending',
    priority TEXT NOT NULL DEFAULT 'Medium',
    FOREIGN KEY (client_id) REFERENCES clients(id)
  );
`);

// Seed data if empty
const clientCount = db.prepare("SELECT COUNT(*) as count FROM clients").get();
if (clientCount.count === 0) {
    const insertClient = db.prepare(
        "INSERT INTO clients (company_name, country, entity_type) VALUES (?, ?, ?)"
    );
    const insertTask = db.prepare(
        "INSERT INTO tasks (client_id, title, description, category, due_date, status, priority) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );

    const c1 = insertClient.run("Acme Corp", "USA", "LLC");
    const c2 = insertClient.run("Globex Ltd", "UK", "PLC");
    const c3 = insertClient.run("Initech Inc", "Canada", "Corporation");

    const today = new Date();
    const past = (d) => {
        const dt = new Date(today);
        dt.setDate(dt.getDate() - d);
        return dt.toISOString().split("T")[0];
    };
    const future = (d) => {
        const dt = new Date(today);
        dt.setDate(dt.getDate() + d);
        return dt.toISOString().split("T")[0];
    };

    // Acme Corp tasks
    insertTask.run(c1.lastInsertRowid, "Q1 Tax Filing", "File quarterly taxes", "Tax", past(5), "Pending", "High");
    insertTask.run(c1.lastInsertRowid, "Annual Audit", "Prepare audit documents", "Audit", future(10), "Pending", "High");
    insertTask.run(c1.lastInsertRowid, "VAT Return", "Submit VAT return", "Tax", past(2), "Completed", "Medium");
    insertTask.run(c1.lastInsertRowid, "Payroll Compliance", "Review payroll records", "Payroll", future(5), "In Progress", "Medium");

    // Globex tasks
    insertTask.run(c2.lastInsertRowid, "Corporation Tax", "Annual corp tax filing", "Tax", past(10), "Pending", "High");
    insertTask.run(c2.lastInsertRowid, "GDPR Review", "Annual data compliance review", "Legal", future(15), "Pending", "Medium");
    insertTask.run(c2.lastInsertRowid, "Pension Filing", "Submit pension contributions", "Payroll", future(3), "Completed", "Low");

    // Initech tasks
    insertTask.run(c3.lastInsertRowid, "GST Filing", "Quarterly GST return", "Tax", past(1), "Pending", "High");
    insertTask.run(c3.lastInsertRowid, "Board Minutes", "File annual board minutes", "Legal", future(20), "Pending", "Low");
}

module.exports = db;
