// routes.mjs

import express from 'express';
import passport from 'passport';
import moment from 'moment';

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

// Route for proxying requests to the Google Places API
router.get('/places', async (req, res, next) => {
  const { lat, lng, radius, apiKey } = req.query;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching top destinations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Your other routes...

router.post('/calculate-route', async (req, res, next) => {
  const { checkInDate, checkOutDate, apiKey, lat, lng } = req.body;

  try {
    // Calculate the number of days between check-in and check-out dates
    const checkIn = moment(checkInDate);
    const checkOut = moment(checkOutDate);
    const durationInDays = checkOut.diff(checkIn, 'days');
    console.log(durationInDays);
    // Fetch destinations based on the check-in date and number of days
    const destinations = await fetchDestinations(durationInDays, apiKey, lat, lng);

    // Calculate route itinerary using Google Directions API
    const routeItinerary = await calculateRoute(destinations, apiKey);
    console.log(routeItinerary);
    // Return route itinerary
    res.json(routeItinerary);
  } catch (error) {
    console.error('Error calculating route itinerary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

async function fetchDestinations(durationInDays, apiKey, lat, lng) {
  // Set radius for nearby search (adjust as needed)
  const radius = 5000; // 5 km radius

  try {
    // Make a single request to the nearby search endpoint
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&key=${apiKey}`);
    const data = await response.json();
    const allDestinations = data.results.map(result => ({
      name: result.name,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng
    }));

    // Slice the array to contain the number of destinations similar to the number of days
    const slicedDestinations = allDestinations.slice(0, durationInDays);

    return slicedDestinations;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
}


async function calculateRoute(destinations, apiKey) {
  // Construct waypoints for the route using the destinations
  const waypoints = destinations.map(destination => `${destination.lat},${destination.lng}`);

  // Construct request parameters for Google Directions API
  const params = new URLSearchParams({
    key: apiKey,
    origin: waypoints[0], // Start from the first destination
    destination: waypoints[waypoints.length - 1], // End at the last destination
    waypoints: waypoints.slice(1, -1).join('|'), // Intermediate destinations as waypoints
    optimizeWaypoints: true, // Optimize the order of waypoints
    mode: 'driving', // Travel mode
  });

  // Make a request to Google Directions API
  const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?${params}`);
  const data = await response.json();

  // Extract route itinerary from the response
  const routeItinerary = {
    route: data.routes[0], // Get the first route (assuming there's only one)
    waypoints: destinations, // Include the list of destinations
  };

  return routeItinerary;
}

export default router;
