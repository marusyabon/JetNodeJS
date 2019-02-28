const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const contactsRouter = require('./routes/contacts');
const activityRouter = require('./routes/activities');
const activitytypesRouter = require('./routes/activitytypes');
const statusesRouter = require('./routes/statuses');
const filesRouter = require('./routes/files');

const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

mongoose.connect('mongodb://localhost:27017/jetApp', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

app.use('/', indexRouter);
app.use('/contacts', contactsRouter);
app.use('/activities', activityRouter);
app.use('/activitytypes', activitytypesRouter);
app.use('/statuses', statusesRouter);
app.use('/files', filesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
