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

//// Log the database connection
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

app.post("/updateData", async (req, res) => {
  const { name, action } = req.body;
  console.log(`Received data from client - Name: ${name}, Action: ${action}`);

  pool.query(
    "SELECT * FROM user_votes WHERE name = ? ",
    [name],
    (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
      console.log("Results from database query:", results);

      // If the user doesn't exist in the database, insert them with their initial vote count
      if (results.length === 0) {
        let voteCount = 0;
        let plusCount = 0;
        let minusCount = 0;
        if (action === "+") {
          voteCount = 1;
          plusCount = 1;
        } else if (action === "-") {
          voteCount = -1;
          minusCount = 1;
        }
        pool.query(
          "INSERT INTO user_votes (name, vote_count, plus, minus) VALUES (?, ?, ?, ?)",
          [name, voteCount, plusCount, minusCount],
          (err, results) => {
            if (err) {
              console.error("Error updating database:", err);
              return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
            }
            console.log("User added to database with initial vote count");
            return res.status(200).json({
              success: true,
              message: "User added to database with initial vote count",
            });
          },
        );
      } else {
        let voteCount = results[0].vote_count;
        let plusCount = results[0].plus;
        let minusCount = results[0].minus;
        if (action === "+") {
          voteCount++;
          plusCount++;
        } else if (action === "-") {
          voteCount--;
          minusCount++;
        }
        pool.query(
          "UPDATE user_votes SET vote_count = ?, plus = ?, minus = ? WHERE name = ?",
          [voteCount, plusCount, minusCount, name],
          (err, results) => {
            if (err) {
              console.error("Error updating database:", err);
              return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
            }
            console.log("User's vote count updated in database");
            return res.status(200).json({
              success: true,
              message: "User's vote count updated in database",
            });
          },
        );
      }
    },
  );
});

app.get("/getTotalVoteCount", async (req, res) => {
  pool.query(
    "SELECT SUM(vote_count) AS totalVoteCount FROM user_votes",
    (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
      const totalVoteCount = results[0].totalVoteCount || 0; // Ensure there's always a value, defaulting to 0
      return res.status(200).json({ success: true, totalVoteCount });
    },
  );
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

// //// Middleware to extract IP address
// app.use((req, res, next) => {
//   req.clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//   next();
// });
