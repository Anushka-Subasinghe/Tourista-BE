// auth-strategies.mjs

import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './models/user.js';
import bcrypt from "bcrypt";

// Custom passport strategy for user registration
passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      const { username } = req.body;
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  
      if (existingUser) {
        return done(null, false, { status: 409, message: 'Username or email is already taken.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt round
  
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      return done(null, newUser, { status: 201, message: 'User created successfully.' });
    } catch (error) {
      return done(error);
    }
}));
  

// Custom passport strategy for user login
passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return done(null, false, { status: 404, message: 'Incorrect email or password.' });
      }

      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, { status: 404, message: 'Incorrect email or password.' });
      }
  
      return done(null, user, { status: 200, message: 'Login successful.' });
    } catch (error) {
      return done(error);
    }
}));
  
