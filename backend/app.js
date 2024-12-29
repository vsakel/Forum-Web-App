const express = require('express');
const bodyParser = require('body-parser');
const setupRoutes = require('./routes/routes.js');
const forumdb = require('./forumdb.js')
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv').config();

const app = express();

var corsoptions = {
    origin: process.env.CLIENT_ORIGIN || "http://127.0.0.1:3000"
};
app.use(cors());

app.options('*', cors());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(express.json());

forumdb.setupForumDB().then((dbconn => {
    setupRoutes(app, dbconn);
})).catch((err) => {
    throw err;
});

module.exports = {app};