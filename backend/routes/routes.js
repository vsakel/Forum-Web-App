const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const forumdb = require('../forumdb.js')

function setupRoutes(app, dbconn) {
    queries = forumdb.loadQueries();

    app.get("/", async (req, res) => {
        const q = queries['query_top_level_categories'];
        dbconn.query(q, (err, results) => {
            if (err) {
                console.log(err)
                return console.log(err.message);
            }
            console.log(results);
            res.json(results);
        });
    });

    app.get("/shoutbox", async (req, res) => {
        const q = queries['query_shouts'];
        dbconn.query(q, (err, results) => {
            if (err) {
                console.log(err)
                return console.log(err.message);
            } else {
                console.log(results);
                res.json(results);
            }
        });
    });

    app.get("/category/:categoryid", async (req, res) => {
        const q1 = queries['query_subcategories'];
        const q2 = queries['query_category_threads'];
        const category = req.params.categoryid;
        dbconn.query(q1+q2, [category, category], (err, results) => {
            if (err) {
                console.log(err)
                return console.log(err.message);
            }
            var result = {};
            result["categories"] = results[0];
            result["threads"] = results[1];
            console.log(result);
            res.json(result);
        });
    });

    app.get("/thread/:threadid", async (req, res) => {
        const q = queries['query_thread'];
        const thread = req.params.threadid;
        dbconn.query(q, [thread], (err, results) => {
            if (err) {
                console.log(err)
                return console.log(err.message);
            }
            console.log(results);
            res.json(results);
        });
    });

    app.get("/inbox/:useremail", async (req, res) => {
        // normally you get the user info from session and cookie (not from URL obv), but no time to learn how that works
        const q = queries['query_inbox'];
        const user_email = req.params.useremail;
        dbconn.query(q, [user_email], (err, results) => {
            if (err) {
                console.log(err)
                res.json(err);
            } else {
                console.log(results);
                res.json(results);
            }
        });
    });

    app.get("/outbox/:useremail", async (req, res) => {
        // normally you get the user info from session and cookie (not from URL obv), but no time to learn how that works
        const q = queries['query_outbox'];
        const user_email = req.params.useremail;
        dbconn.query(q, [user_email], (err, results) => {
            if (err) {
                console.log(err)
                res.json(err);
            } else {
                console.log(results);
                res.json(results);
            }
        });
    });

    app.post("/register", async (req, res) => {
        // normally you encrypt on the frontend, but oh well, just a prototype for presentation
        const q = queries['try_register'];
        console.log(req.body)
        try {
            console.log(req.body.psw);
            const hashedPassword = await bcrypt.hash(req.body.psw, saltRounds)
            console.log(hashedPassword);
            dbconn.query(q, [req.body.email, req.body.username, hashedPassword], (err, results) => {
                if (err) {
                    console.log(err)
                    res.json(err)
                } else {
                    console.log(results);
                    res.json(results);
                }
            });
        } catch(err) {
            console.error(err);
        }
    });

    app.post("/login", async (req, res) => {
        // normally you encrypt on the frontend, but oh well, just a prototype for presentation
        const q = queries['try_authenticate'];
        console.log(req.body)
        try {
            console.log(req.body.psw);
            const hashedPassword = await bcrypt.hash(req.body.psw, saltRounds)
            console.log(hashedPassword);
            dbconn.query(q, [req.body.email], async (err, results) => {
                if (err) {
                    console.log(err)
                    res.json(err)
                } else {
                    if (results.length > 0) {
                        if (await bcrypt.compare(req.body.psw, results[0].password)) {
                            console.log(results);
                            res.json(results);
                        } else {
                            console.log("Invalid password");
                            res.json([])
                        }
                    } else {
                        console.log("Invalid email")
                        res.json(results)
                    }
                }
            });
        } catch(err) {
            console.error(err);
        }
    });

    app.post("/post", async (req, res) => {
        const q = queries['insert_post'];
        console.log(req.body)
        try {
            dbconn.query(q, [req.body.content, req.body.email, req.body.thread_id], (err, results) => {
                if (err) {
                    console.log(err)
                    res.json(err)
                } else {
                    console.log(results);
                    res.json(results);
                }
            });
        } catch(err) {
            console.error(err);
        }
    });

    app.post("/shout", async (req, res) => {
        const q = queries['insert_shout'];
        console.log(req.body)
        try {
            dbconn.query(q, [req.body.content, req.body.email], (err, results) => {
                if (err) {
                    console.log(err)
                    res.json(err)
                } else {
                    console.log(results[1]);
                    res.json(results[1]);
                }
            });
        } catch(err) {
            console.error(err);
        }
    });

    app.post("/pm", async (req, res) => {
        const q = queries['send_pm'];
        console.log(req.body)
        try {
            dbconn.query(q, [req.body.subject, req.body.content, req.body.author_email, req.body.recepient_email], (err, results) => {
                if (err) {
                    console.log(err)
                    res.json(err)
                } else {
                    console.log(results);
                    res.json(results);
                }
            });
        } catch(err) {
            console.error(err);
        }
    });
    console.log('Routes set up');
}

module.exports = setupRoutes;