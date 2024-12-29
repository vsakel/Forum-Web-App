
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// load SQL queries into a dictionary
function loadQueries() {
    var queries = {};
    const queries_path = './queries';
    fs.readdirSync(queries_path).forEach(file => {
        data = fs.readFileSync(path.join(queries_path, file), 'utf8')
        queries[path.parse(file).name] = data;
    });
    return queries;
}

async function initdb() {
    var queries = loadQueries();
    // create db
    const mysql = require('mysql2/promise');
    try {
        const dbinitconn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: 'root',
            password: process.env.DB_ROOT_PASSWORD,
            port: process.env.DB_PORT,
            multipleStatements: true
        });
        await dbinitconn.connect();
        await dbinitconn.query(queries['create_forumdb']);
        await dbinitconn.end();
        console.log("Database initialized successfully");
    } catch (err) {
        console.log("Failed to initialize DB: " + err);
    }
}

// Loads queries, creates temporary initial connection to init DB, then creates and returns a ForumUser connection
async function setupForumDB() {
    await initdb();
    return new Promise((resolve, reject) => {
        // create main connection
        const mysql = require('mysql2');
        console.log(process.env.DB_HOST);
        console.log(process.env.DB_USER);
        console.log(process.env.DB_PASSWORD);
        console.log(process.env.DB_NAME);
        var dbconn = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            multipleStatements: true
        });
        dbconn.connect((err) => {
            if (err) reject(err);
            else resolve(dbconn);
        })
    });
}

module.exports.setupForumDB = setupForumDB;
module.exports.loadQueries = loadQueries;