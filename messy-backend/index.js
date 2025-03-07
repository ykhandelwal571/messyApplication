const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mahakaal571",
  database: "messy_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database");
});

// User Registration
app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
      [username, hashedPassword, email],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ success: false, message: "Username or Email already exists" });
          }
          console.error("SQL Error (INSERT):", err);
          return res.status(500).json({ success: false, message: "Error registering user" });
        }
        res.json({ success: true, message: "User registered successfully!" });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, message: "Error encrypting password" });
  }
});

// User Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error" });
    }
    if (result.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    const storedHashedPassword = result[0].password;

    bcrypt.compare(password, storedHashedPassword, (err, match) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error checking password" });
      }
      if (!match) {
        return res.status(401).json({ success: false, message: "Invalid username or password" });
      }
      res.json({ success: true, message: "Login successful", userType: result[0].userType, username: result[0].username });
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
