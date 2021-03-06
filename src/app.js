const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      upload = require("express-fileupload");

const app = express();

// importing routes
const csvRoutes = require('./routes/csv');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(upload());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', csvRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
