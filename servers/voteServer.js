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
    connection.release(); // Release the connection
  }
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.post("/updateData", async (req, res) => {
  const { name, voteCount } = req.body;
  console.log(`Received data from client - Name: ${name}, Vote Count: ${voteCount}`);
  
  // Perform the SQL INSERT operation
  pool.query('INSERT INTO user_votes (name, voteCount) VALUES (?, ?)', [name, voteCount], (err, result) => {
    if (err) {
      console.error("Error inserting data into database:", err);
      res.status(500).send("Error inserting data into database");
    } else {
      console.log("Data inserted successfully");
      res.status(200).send("Data inserted successfully");
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
