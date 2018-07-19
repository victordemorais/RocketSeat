const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({
  extended: false,
}));

// Minhas Views
app.get('/main', (req, res) => {
  res.render('main');
});
app.get('/minor', (req, res) => {
  const {
    nome,
  } = req.params;
  if (nome) {
    res.send(`Que pena ${nome}, você tem menos que 18 anos`);
  } else {
    res.redirect('/main');
  }
});
app.get('/major', (req, res) => {
  const {
    nome,
  } = req.query;
  if (nome) {
    res.send(`Parabéns ${nome}, você tem mais que 18 anos`);
  } else {
    res.redirect('/main');
  }
});

app.post('/check', (req, res) => {
  const {
    nome,
    nascimento,
  } = req.body;
  const idade = moment().diff(moment(nascimento, 'DD/MM/YYYY'), 'years');
  const page = idade < 18 ? 'minor' : 'major';
  res.redirect(`/${page}?nome=${nome}`);
});
app.listen(3000);
