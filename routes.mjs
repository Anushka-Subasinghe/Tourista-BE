// routes.mjs

import express from 'express';
import passport from 'passport';

const router = express.Router();

// Signup route using Passport.js strategy
router.post('/signup', (req, res, next) => {
  passport.authenticate('signup', { session: false }, (err, user, info) => {
    if (err) {
      return next(err); // Pass the error to the error handler middleware
    }
    if (!user) {
      // Signup failed, return the status and message from Passport strategy
      return res.status(info.status).json({ message: info.message });
    }
    // Signup successful
    return res.status(info.status).json({ message: info.message, user: user });
  })(req, res, next);
});


// Login route using Passport.js strategy
router.post('/login', (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) {
      return next(err); // Pass the error to the error handler middleware
    }
    if (!user) {
      // Login failed, return the status and message from Passport strategy
      return res.status(info.status).json({ message: info.message });
    }
    // Login successful
    req.logIn(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(info.status).json({ message: info.message, user: user });
    });
  })(req, res, next);
});


// Your other routes...

export default router;
