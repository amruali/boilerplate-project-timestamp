// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.get('/api/', (req,res) => {
     var datee = new Date();
       const ress = {
            unix : datee.getTime(),
            utc : datee.toUTCString()
        };
    res.status(200).send(ress);
})

app.get("/api/:date", (req, res) => {
    let date
    if(!isNaN(req.params.date)){
        date = new Date(Number(req.params.date));
    }else{
        date = new Date(req.params.date);
    }
    
  
    // Invalid Date Case 1
    if (date.toString() == "Invalid Date"){
        return res.json({error : "Invalid Date"});
    }

    // Valid Case 2
    let unix, utc;
    unix = date.getTime();
    utc = date.toUTCString();

    const ress = {
        unix : unix,
        utc : utc
    };

    console.log(ress);
    return res.status(200).send(ress);
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
