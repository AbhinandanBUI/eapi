//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/ui2.0/'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/ui2.0/'}),
    // console.log("this is my pasth",path)


);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);