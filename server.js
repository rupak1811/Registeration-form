// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

mongoose.connect('mongodb://localhost:27017/registrationDB');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        await newUser.save();
        res.send('Successfully registered!');
    } catch (err) {
        res.send(err);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
