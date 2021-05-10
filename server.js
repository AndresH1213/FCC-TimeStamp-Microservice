// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'Hello API'});
});

app.get('/api/:date?', (req, res, next) => {
  let date = req.params.date;
  if (/\d{5,13}/.test(date)) {
    date = parseInt(date);
  }
  const utc = new Date(date);
  if (!date) {
    const now_utc = new Date();
    const now_unix = utc.getTime();
    res.json({"unix":now_unix,"utc": now_utc})
  }
  else if (utc == "Invalid Date") {
    res.json({error: 'Invalid Date'})
  }
  else {
    const unix = utc.getTime(); 
    res.json({"unix":unix,"utc": utc})
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
