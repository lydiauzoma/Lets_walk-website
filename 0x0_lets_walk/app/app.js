// Import express.js
const express = require("express");

// Create express app
const app = express();

// Set up Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');

// Create a route for the root - /
app.get("/", async function (req, res) {
    try {
        // Replace this with your actual logic to fetch walking buddies from the database
        const walkingPartners = await fetchWalkingPartners();
        
        res.render("walkBuddies", { title: 'Walking Buddies', walkingPartners });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Create a route for /goodbye
app.get("/goodbye", function (req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>
app.get("/hello/:name", function (req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    // Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Create a route for /login
app.get('/login', (req, res) => {
    // You can pass data to the template using an object
    res.render('login', { pageTitle: 'Login Page' });
});

// Function to fetch walking partners - replace this with your actual database query
async function fetchWalkingPartners() {
    return [
        { name: 'John Doe', bio: 'A fellow working mom', compatibility: 80, id: 1 },
        // Add more walking partners as needed
    ];
}

// Start server on port 3000
const port = 3000;
app.listen(port, function () {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});
