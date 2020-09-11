
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const logger = require('./utils/logger')('APP');
const routes = require('./routes/api/index');

// DB
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './../.env' });

// connect to database
connectDB();

const app = express();

// CORS Middleware
app.use(cors());

// express middleware handling the body parsing 
app.use(express.json());

// express middleware handling the form parsing
app.use(express.urlencoded({ extended: false }));

if (process.env.ENV === 'development') {
    app.use(
       morgan((tokens, req, res) =>
          [
             `<${process.env.ENV}>`,
             tokens.method(req, res),
             tokens.url(req, res),
             tokens.status(req, res),
             tokens.res(req, res, 'content-length'),
             '-',
             tokens['response-time'](req, res),
             'ms',
          ].join(' '),
       ),
    );
}

// Mount the routes
app.use(routes);

// use port from environment variables for production
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    logger.log(`server running on port ${port}`);
})

// Unhandled Promise Rejection Handler
process.on('unhandledRejection', ex => {
    logger.error(`${ex.message}`, ex);
    app.use((_req, res) => {
       res.status(500).json({
          success: false,
          msg: '500 Internet Error',
          data: null,
       });
    });
 
    server.close(() => process.exit(1));
 });