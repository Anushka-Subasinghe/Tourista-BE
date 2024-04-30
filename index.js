// index.mjs

import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import './auth-strategies.mjs'; // Import custom Passport strategies
import db from './db.js';
import routes from './routes.mjs'; // Import routes
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*'
  }));
app.use(bodyParser.json());
app.use(passport.initialize()); // Initialize Passport middleware

// Use routes
app.use('/', routes);

// Your other middleware...

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
