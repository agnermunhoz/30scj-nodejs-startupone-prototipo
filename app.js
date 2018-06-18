var express = require('express');
var load = require('express-load');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var error = require('./middlewares/error');

app = express();

var mongoose = require('mongoose');

const PORT = process.env.PORT || 5000

//global.db = mongoose.connect('mongodb://AJ0263498B:27017/protopitoAPI');
global.db = mongoose.connect('mongodb://user:userpass1@ds163330.mlab.com:63330/prototipoapi');
mongoose.connection.on('connected', function () {
  console.log('=====Conexão estabelecida com sucesso=====');
});
mongoose.connection.on('error', function (err) {
  console.log('=====Ocorreu um erro: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('=====Conexão finalizada=====');
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookieParser('protopitoAPI'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

//middlewares
app.use(error.notFound);
app.use(error.serverError);

app.listen(PORT, function () {
  console.log(`Listening on ${ PORT }`)
  console.log("Aplicação no ar.");
});