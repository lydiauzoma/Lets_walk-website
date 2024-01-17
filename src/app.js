import express from "express";
import session from "express-session";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import path from "path";

const app = express();
const port = 3000;

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "verysecretkey", // Use environment variable for security
    resave: false,
    saveUninitialized: false, // Enhanced security
    cookie: { secure: process.env.NODE_ENV === "production" }, // Secure cookies in production
  })
);

// Set view engine and static files
app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(express.static("static")); // Dynamic path for static files

// Parse incoming JSON and URL-encoded data
app.use(express.json({ charset: "utf-8" }));
app.use(express.urlencoded({ extended: true }));

// Connect to MySQL database
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "user",
  password: process.env.DATABASE_PASSWORD || "password",
  database: process.env.DATABASE_NAME || "world",
  socketPath: process.env.DATABASE_SOCKET_PATH || "/var/run/mysqld/mysqld.sock",
});

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Welcome to LetWalk" });
});

// Routes
app.get("/register", (req, res) => {
  res.render("register", { title: "Welcome to LetWalk" });
});
app.get("/plans", (req, res) => {
  res.render("plans", { title: "Welcome to LetWalk" });
});
app.get("/location", (req, res) => {
  res.render("locations", { title: "Welcome to LetWalk" });
});

app.get("/about", (req, res) => {
  const teamMembers = [
    /* ... */
  ]; // Fetch team members from database or external source
  res.render("about", { title: "Team", teamMembers });
});

app.get("/login", (req, res) => {
  res.render("login");
});
// Sample user data
app.get("/users", (req, res) => {
  res.render("users");
});
app.get("/users", (req, res) => {
  // Retrieve users from the database
  db.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    const users = results;

    const currentUser = users.find((user) => user.email === req.user.email); // Assuming user authentication
    const matchedPartner = matchUsers(users).find(
      (user) => user !== currentUser
    );
    res.render("users", { currentUser, matchedPartner });
  });
});
// ... (other routes)

// Default export for modularity
export default app;
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const sql = `INSERT INTO user (email, password) VALUES ('${email}', '${hashed}')`;
    const [result, _] = await db.execute(sql);
    const id = result.insertId;
    req.session.auth = true;
    req.session.userId = id;
    return res.redirect("/account");
  } catch (err) {
    console.error(err);
    return res.status(400).send(err.sqlMessage);
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send("Missing credentials");
  }

  const sql = `SELECT id, password FROM user WHERE email = '${email}'`;
  const [results, cols] = await db.execute(sql);

  const user = results[0];

  if (!user) {
    return res.status(401).send("User does not exist");
  }
  const { id } = user;
  const hash = user?.password;
  const match = await bcrypt.compare(password, hash);

  if (!match) {
    return res.status(401).send("Invalid password");
  }

  req.session.auth = true;
  req.session.userId = id;

  return res.redirect("/account");
});
// Start the server
app.listen(port, async () => {
  console.log(`App listening at http://localhost:${port}`);
});
