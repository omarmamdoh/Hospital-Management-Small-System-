const sqlite = require("sqlite3");
const bcrypt = require("bcrypt");
const db = new sqlite.Database("hospital.db");

bcrypt.hash("admin123", 10, (err, hashedPassword) => {
  if (err) {
    console.error("Error hashing password:", err);
    return;
  }

  db.run(
    `INSERT INTO ACCOUNTS (name, email, password, role) 
     VALUES (?, ?, ?, ?)`,
    ["Admin", "admin@hospital.com", hashedPassword, "admin"],
    (err) => {
      if (err) {
        console.error("Error adding admin:", err.message);
      } else {
        console.log("Admin added successfully with hashed password");
      }
    }
  );
});
