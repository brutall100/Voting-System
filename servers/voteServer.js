const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "vote_database",
});

// Log the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database successfully");
    connection.release(); 
  }
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

//// Middleware to extract IP address
app.use((req, res, next) => {
  req.clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  next();
});

app.post("/updateData", async (req, res) => {
  const { name, action } = req.body; // Extracting the action parameter
  const ip = req.clientIp;
  
  console.log(`Received data from client - Name: ${name}, Action: ${action}, IP: ${ip}`);

  // Check if the user has already voted
  pool.query('SELECT * FROM user_votes WHERE name = ? AND ip_address = ?', [name, ip], (err, result) => {
    if (err) {
      console.error("Error checking vote from database:", err);
      res.status(500).send("Error checking vote from database");
      return;
    }

    // If user hasn't voted yet, insert new vote record
    if (result.length === 0) {
      let voteCountChange = 0;
      if (action === "+") {
        voteCountChange = 1;
      } else if (action === "-") {
        voteCountChange = -1;
      }

      // Perform the SQL INSERT operation
      pool.query('INSERT INTO user_votes (name, ip_address, vote_count, plus, minus ) VALUES (?, ?, ?, ?, ?)', [name, ip, voteCountChange, voteCountChange > 0 ? 1 : 0, voteCountChange < 0 ? 1 : 0], (err, result) => {
        if (err) {
          console.error("Error inserting data into database:", err);
          res.status(500).send("Error inserting data into database");
        } else {
          console.log("Data inserted successfully");
          res.status(200).send("Data inserted successfully");
        }
      });
    } else {
      // If user has already voted, update the existing record
      const currentVoteCount = result[0].vote_count;
      let voteCountChange = 0;
      if (action === "+") {
        voteCountChange = 1;
      } else if (action === "-") {
        voteCountChange = -1;
      }

      const newVoteCount = currentVoteCount + voteCountChange;

      // Perform the SQL UPDATE operation
      pool.query('UPDATE user_votes SET vote_count = ?, plus = ?, minus = ? WHERE name = ? AND ip_address = ?', [newVoteCount, voteCountChange > 0 ? 1 : 0, voteCountChange < 0 ? 1 : 0, name, ip], (err, result) => {
        if (err) {
          console.error("Error updating data in database:", err);
          res.status(500).send("Error updating data in database");
        } else {
          console.log("Data updated successfully");
          res.status(200).send("Data updated successfully");
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});













// PS C:\xampp\htdocs\aldas\Voting-System> cd servers
// PS C:\xampp\htdocs\aldas\Voting-System\servers> npm install express body-parser ..................
// >>

// added 66 packages in 1s

// 12 packages are looking for funding
//   run `npm fund` for details
// PS C:\xampp\htdocs\aldas\Voting-System\servers> node voteServer.js
// Server is running on http:
