require('dotenv').congig()
// const createError = require('http-errors');
const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const bodyParser = require('body-parser');
// const router = require()

const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const session = require('express-session')
const flash = require('express-flash')
const MongoDBStore = require('connect-mongo')(session);   //for storing sessions - helps in automatically deleteing the session data from database

//Database connection
const url = 
mongoose.connect(url, {
  useNewUrlParse:true,
  useCreateIndex:true,
  useUnifiedTopology:true,
  useFindAndModify:true
});
const connection = mongoose.connection;
connection.once('open',() =>{
  console.log('Database connected...');
}).catch(err=>{
  console.log('Database connection failed...');
});

//Session Storage connec
const mongoStore = new MongoDBStore({
  mongooseConnection: connection,
  collection:'sessions'
})

// Session  Configuration
app.use(session({
  secret:process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized:false,
  store:mongoStore,
  cookie: {maxAge: 1000*60*60*24} //24 hrs
}))

app.use(flash());

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
