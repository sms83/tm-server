var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');


cors = require('cors'),
mongoose = require('mongoose'),
//config = require('./config/');
taskRoutes = require('./routes/tasks.routes');
bodyParser = require('body-parser'),

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tmdb').then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/",express.static('public/tm-client'));

app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.use('/tm', taskRoutes);

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const server = app.listen(port, function(){
 console.log('Listening on port ' + port);
});

module.exports = app;
