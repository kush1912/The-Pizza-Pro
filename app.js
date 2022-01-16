// const createError = require('http-errors');
const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const bodyParser = require('body-parser');
// const router = require()

const app = express();
const port = process.env.PORT || 8080;

//Middlewares
app.use(bodyParser.json());

//Routes
const routes = require('./routes/web') //routes receive the function created at web.js
routes(app);  // we are calling the function inside web.js which will execute the whole code. Here we are also passing the intance of express() stored in app.


// app.use(logger('dev'));
// app.use(express.json())
// //app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send('error');
// });

app.listen(port,()=>{
  console.log(`Server is running at port no. ${port}`);
})
module.exports = app;
