var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path')
var cors  = require('cors')
var mainController = require('./controllers/mainController')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',  (req, res) => {res.send({success : 'api'});});
app.post('/signup',mainController.signup)
app.get('/ping',mainController.ping)
app.get('/analytics',mainController.analytics)

app.listen(process.env.PORT,  () =>{
  console.log(`Example app listening on port ${process.env.PORT}!`);
});