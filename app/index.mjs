import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import session from "express-session";

const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "verysecretkey",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.set("view engine", "pug");
app.use(express.static("static"));
app.use(express.json({ charset: 'utf-8' }));

const db = await mysql.createConnection({
    host: process.env.DATABASE_HOST || "localhost",
    user: "user",
    password: "password",
    database: "world",
});

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.get("/", async (req, res) => {
    try {
        const sumPopulation = await db.execute("SELECT SUM(Population) FROM country");
        return res.render("index", { sumPopulation: sumPopulation[0][0] });
    } catch (err) {
        console.error(err);
    }
});

app.get("/filter", (req, res) => {
    res.render("fliter");
});

app.get("/", (req, res) => {
    res.render("update");
});

app.get("/about", (req, res) => {
    res.render("about", { title: "Team" });
});

const users = [
    {
        id: 1,
        name: 'John Doe',
        profilePicture: 'https://placekitten.com/200/200',
        biography: 'I love going for walks and connecting with new people!',
    },
    {
        id: 2,
        name: 'Jane Smith',
        profilePicture: 'https://placekitten.com/201/201',
        biography: 'Exploring the world one step at a time.',
    },
    // Add more user data as needed
    // ...
];
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('welcome', { users });
});
app.get('/profile/:id', (req, res) => {
    const profileId = req.params.id;
    // Fetch profile data from your database or other source
    const profile = users.find((user) => user.id === parseInt(profileId));

    if (!profile) {
        // Handle the case where the profile with the given ID is not found
        res.status(404).send('Profile not found');
        return;
    }

    res.render('profile', { profile });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Validate username and password (you would typically check against a database)
    // ...

    // Redirect to the welcome page on successful login
    res.redirect('/');
});

app.get('/connect', (req, res) => {
    // Handle preferences and connect users with potential walking partners
    // ...

    // Redirect to a confirmation or results page
    res.redirect('/confirmation');
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    // Fetch user data from your database or other source
    const user = users.find((u) => u.id === parseInt(userId));

    if (!user) {
        // Handle the case where the user with the given ID is not found
        res.status(404).send('User not found');
        return;
    }

    res.render('user', { user });






    app.get("/account", async (req, res) => {
        const { auth, userId } = req.session;

        if (!auth) {
            return res.redirect("/login");
        }

        const sql = `SELECT id, email FROM user WHERE id = ${userId}`;
        const [results, cols] = await db.execute(sql);
        const user = results[0];

        res.render("account", { user });
    });

    app.get('/update', async (req, res) => {
        const { auth, userId } = req.session;
        if (auth) {
            res.render("update");
        } else {
            res.redirect("login")
        }
    });

    // Register
    app.get('/register', function (req, res) {
        res.render('register');
    });
    // Login
    app.get('/login', function (req, res) {
        res.render('login');
    });

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


    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    }