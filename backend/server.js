const {app, _} = require("./app");
require('dotenv').config();

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});

process.on('exit', () => {
  dbconn.end((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
  });

});

