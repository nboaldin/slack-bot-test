require('dotenv').config();

const express = require('express'),
    bodyParser = require('body-parser'),
    axios = require('axios'),
    qs = require('qs'),
    app = express(),
    PORT = 4390;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


axios.defaults.headers.common['Authorization'] = 'Bearer ' + process.env.BOT_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

app.post("/", (req, res, next) => {
    let payload = req.body;

    if (payload.event.type === "app_mention") {
        axios.post('https://slack.com/api/chat.postMessage', { "channel": "CH815EK52", "text": "I do not compute. Please, be more specific. Remember, I am a robot."})
        .then((result) => {
            if(result.data.error) {
              res.sendStatus(500);
              console.error( 'Error ', result.data.error);
            } else {
              res.sendStatus(200);
              console.log('Posted, YAY!');
            }
         })
        .catch((err) => {
            res.sendStatus(500);
            console.log(err);
        });
    }

});

app.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});