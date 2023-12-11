// Import express.js


// Create express app
const port = 3000;
const express = require("express");
const app = express();


// Set up Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

const db = require('./services/db');

// Create a route for the root - /
app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

// Create a route for /contact
app.get("/contact", (req, res) => {
    try {
      res.render("contact-page");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  

// Create a route for /details
app.get("/details", async function (req, res) {
    res.render("details");
});

// Create a route for /filter
app.get("/filter", (req, res) => {
    res.render('filter');
});

// Create a route for /search-results
app.get("/search-results", async function (req, res) {
  var sql = "SELECT * FROM Users "
  var results = await db.query(sql);
  console.log(results)
    res.render("search-results");
});



// Create a route for /successful-selection
app.get("/successful-selection", function (req, res) {
    res.render("successful-selection");
});

// Start server on port 3000
app.listen(port, function () {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});

/*// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to render your Pug template
app.get('/', (req, res) => {
  const walkingPartners = []; // Replace with your data
  res.render('index', { walkingPartners });
});*/

// Start the server
/*app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});*/
