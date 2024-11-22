const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Faiz1234.', // Replace with your MySQL password
    database: 'DisasterReporting',
    multipleStatements: true // Enable multiple SQL statements
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

// Routes
// Homepage: List all disasters
app.get('/', (req, res) => {
    const query = 'SELECT * FROM Disasters';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.render('index', { disasters: results });
    });
});

// Add new disaster page
app.get('/add', (req, res) => res.render('addDisaster'));

// Add new disaster form submission
app.post('/add', (req, res) => {
    const { disaster_type, location, severity } = req.body;
    const query = 'INSERT INTO Disasters (disaster_type, location, severity) VALUES (?, ?, ?)';
    db.query(query, [disaster_type, location, severity], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// View disaster details and related reports
app.get('/disaster/:id', (req, res) => {
    const query = `
        SELECT * FROM Disasters WHERE id = ?;
        SELECT * FROM Reports WHERE disaster_id = ?;
    `;
    db.query(query, [req.params.id, req.params.id], (err, results) => {
        if (err) throw err;
        res.render('disasterDetails', { disaster: results[0][0], reports: results[1] });
    });
});

// Add a report for a disaster
app.post('/disaster/:id/report', (req, res) => {
    const { reporter_name, description } = req.body;
    const query = 'INSERT INTO Reports (disaster_id, reporter_name, description) VALUES (?, ?, ?)';
    db.query(query, [req.params.id, reporter_name, description], (err) => {
        if (err) throw err;
        res.redirect(`/disaster/${req.params.id}`);
    });
});
// Route to delete a disaster
app.post('/disaster/:id/delete', (req, res) => {
    const query = 'DELETE FROM Disasters WHERE id = ?';
    db.query(query, [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/'); // Redirect to homepage after deletion
    });
});
// Start the server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));

