const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/myapp' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

mongoose.connect('mongodb://localhost:27017/myapp')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error', err);
    });
    
app.use('/api/auth', authRoutes);
    
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});