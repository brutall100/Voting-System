const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/updateData', (req, res) => {
    const { name, voteCount } = req.body;
    // Update database with received data
    console.log(`Received data from client - Name: ${name}, Vote Count: ${voteCount}`);
    // Perform database update operations here
    // Send response back to client
    res.json({ success: true, message: 'Data received successfully' });
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