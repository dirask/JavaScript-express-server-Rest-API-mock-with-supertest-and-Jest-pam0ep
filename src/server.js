const express = require('express');
const db = require('./db');

const app = express();

app.get('/backend/users', async (req, res) => {
    const users = db.getUsers()
    res.json(users);
});

module.exports = app;