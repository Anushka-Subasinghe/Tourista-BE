// routes.mjs

import express from 'express';
import passport from 'passport';
import moment from 'moment';
import locations from './locations.js';

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

    // Select three different sets of destinations from the hard-coded locations
    const numDestinations = durationInDays + 1; // Number of destinations per itinerary
    const numItineraries = 3; // Number of itineraries

    const allDestinations = locations.slice(); // Copying the locations array
    const itineraries = [];

    for (let i = 0; i < numItineraries; i++) {
      // Shuffle the locations array to get a different set of destinations for each itinerary
      let shuffledLocations = shuffle(allDestinations);
      const destinations = [];

      // Selecting the first numDestinations unique locations for this itinerary
      while (destinations.length < numDestinations) {
        const nextLocation = shuffledLocations.pop(); // Get the last element (to maintain randomness)
        // Check if the nextLocation is already included in any previous itinerary
        const isDuplicate = itineraries.some(itinerary =>
          itinerary.waypoints.some(waypoint =>
            waypoint.placeName === nextLocation.placeName
          )
        );
        if (!isDuplicate) {
          destinations.push(nextLocation);
        }
      }

      // Calculate route itinerary using Google Directions API
      const routeItinerary = await calculateRoute(destinations, lat, lng, apiKey);
      itineraries.push(routeItinerary);
    }

    // Return the three itineraries
    res.json(itineraries);
  } catch (error) {
    console.error('Error calculating route itineraries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Function to shuffle an array (Fisher-Yates algorithm)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to calculate route using Google Directions API
async function calculateRoute(destinations, userLat, userLng, apiKey) {
  // Construct waypoints for the route using the destinations
  const waypoints = destinations.map(destination => `${destination.coordinates.lat},${destination.coordinates.lng}`);
  // console.log({
  //   origin: `${userLat},${userLng}`, // Start from the user's location
  //   destination: `${waypoints[waypoints.length - 1]}`,
  //   waypoints: waypoints.slice(0, -1).join('|'), // Intermediate destinations as waypoints
  //   optimizeWaypoints: true, // Optimize the order of waypoints
  //   mode: 'driving', // Travel mode
  //   key: apiKey, // Google Maps API key
  // });
  

  // Construct request parameters for Google Directions API
  const params = new URLSearchParams({
    origin: `${userLat},${userLng}`, // Start from the user's location
    destination: `${waypoints[waypoints.length - 1]}`,
    waypoints: waypoints.slice(0, -1).join('|'), // Intermediate destinations as waypoints
    optimizeWaypoints: true, // Optimize the order of waypoints
    mode: 'driving', // Travel mode
    key: apiKey, // Google Maps API key
  });

  // Make a request to Google Directions API
  const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?${params}`);
  const data = await response.json();

  console.log(data.routes[0]);

  // Extract route itinerary from the response
  const routeItinerary = {
  route: data.routes[0], // Get the first route (assuming there's only one)
  waypoints: destinations.map(destination => ({
    placeName: destination.placeName, // Include the placeName
    coordinates: destination.coordinates // Include the coordinates
  })), // Include the list of destinations
};

  return routeItinerary;
}

export default router;
