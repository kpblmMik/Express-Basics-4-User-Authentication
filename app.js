const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

app.use(session({
    secret: 'bigapple',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


const users = [
    { id: 1, username: 'user1', password: bcrypt.hashSync('Password123', 10) } 
];


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.userId = user.id;
        res.status(200).send('Login required');
    } else {
        res.status(401).send('Authentication failed');
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send('Logout successful');
});

module.exports = app;