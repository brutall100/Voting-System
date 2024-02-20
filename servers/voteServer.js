const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vote_database'
});

// Log the database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database successfully');
        connection.release(); // Release the connection
    }
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); 
app.post("/updateData", async (req, res) => {
    const { name, voteCount } = req.body;

    try {
        // Determine whether to increment plus or minus
        const plusIncrement = voteCount > 0 ? 1 : 0;
        const minusIncrement = voteCount < 0 ? 1 : 0;

        // Update database with received data
        const updateResult = await pool.query(
            "UPDATE user_votes SET plus = plus + ?, minus = minus + ?, sum = sum + ? WHERE user_name = ?",
            [plusIncrement, minusIncrement, voteCount, name]
        );

        console.log(
            `Received data from client - Name: ${name}, Vote Count: ${voteCount}`
        );

        // Fetch updated data from the database
        const [selectResult] = await pool.query(
            "SELECT * FROM user_votes WHERE user_name = ?",
            [name]
        );

        if (!selectResult) {
            throw new Error("No data found for user: " + name);
        }

        const updatedData = selectResult[0]; // Extract the first row from the result array

        console.log("Updated data:", updatedData);

        // Send response back to client
        res.json({ success: true, message: "Data received and database updated successfully", data: updatedData });
    } catch (error) {
        console.error("Error updating database:", error);
        res.status(500).json({ success: false, message: "Error updating database" });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});







// PS C:\xampp\htdocs\aldas\Voting-System> cd servers
// PS C:\xampp\htdocs\aldas\Voting-System\servers> npm install express body-parser
// >>

// added 66 packages in 1s

// 12 packages are looking for funding
//   run `npm fund` for details
// PS C:\xampp\htdocs\aldas\Voting-System\servers> node voteServer.js
// Server is running on http:
