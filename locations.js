const locations = [
  {
    placeName: 'Sindakatti Sri Kumaran Kovil',
    district: 'Matale',
    town: 'Matale',
    coordinates: { lat: 7.480518056, lng: 80.6278836 }
  },
  {
    placeName: 'Matale Town - View Point',
    district: 'Matale',
    town: 'Matale',
    coordinates: { lat: 7.493872602, lng: 80.6092815 }
  },
  {
    placeName: 'Nalanda Dam & Reservoir',
    district: 'Matale',
    town: 'Nalanda',
    coordinates: { lat: 7.682156212, lng: 80.61398475 }
  },
  {
    placeName: 'Bowetenna Reservoir',
    district: 'Matale',
    town: 'Naula',
    coordinates: { lat: 7.668583763, lng: 80.65283922 }
  },
  {
    placeName: 'Thelgamu Oya',
    district: 'Matale',
    coordinates: { lat: 7.580741177, lng: 80.78430281 }
  },
  {
    placeName: 'Hunnas Paradise',
    district: 'Matale',
    town: 'Elkaduwa',
    coordinates: { lat: 7.407353714, lng: 80.70556208 }
  },
  {
    placeName: 'Wiltshire Mountain',
    district: 'Matale',
    town: 'Matale',
    coordinates: { lat: 7.495234682, lng: 80.60547002 }
  },
  {
    placeName: 'Arangala Mountain Peak',
    district: 'Matale',
    town: 'Naula',
    coordinates: { lat: 7.695483869, lng: 80.63911412 }
  },
  {
    placeName: 'Themali Khan Waterfall',
    district: 'Matale',
    town: 'Elkaduwa',
    coordinates: { lat: 7.420176522, lng: 80.68568476 }
  },
  {
    placeName: 'German Estate',
    district: 'Matale',
    town: 'Matale',
    coordinates: { lat: 7.491205062, lng: 80.63652568 }
  },
  {
    placeName: 'Pitakanda Peak',
    district: 'Matale',
    town: 'Matale',
    coordinates: { lat: 7.463730362, lng: 80.70300655 }
  },
  {
    placeName: 'Rathhinda Ella Waterfall',
    district: 'Matale',
    town: 'Laggala',
    coordinates: { lat: 7.524375629, lng: 80.74894634 }
  },
  {
    placeName: 'Hulangala Mini Worlds',
    district: 'Matale',
    town: 'Matale',
    coordinates: { lat: 7.593181418, lng: 80.56957036 }
  },
  {
    placeName: 'Dambulla Royal Cave Temple',
    district: 'Matale',
    town: 'Dambulla',
    coordinates: { lat: 7.856864975, lng: 80.64838481 }
  },
  {
    placeName: 'Pitawala Pathana Ella Fall',
    district: 'Matale',
    town: 'Rattota',
    coordinates: { lat: 7.554488422, lng: 80.74090588 }
  },
  {
    placeName: 'Upper Hunnasfall Waterfall',
    district: 'Matale',
    town: 'Elkaduwa',
    coordinates: { lat: 7.405175291, lng: 80.6926918 }
  },
  {
    placeName: 'Sigiriya',
    district: 'Matale',
    town: 'Sigiriya',
    coordinates: { lat: 7.953990904, lng: 80.75229533 }
  },
  {
    placeName: 'Pindurangala',
    district: 'Matale',
    town: 'Sigiriya',
    coordinates: { lat: 7.967710474, lng: 80.76216708 }
  },
  {
    placeName: 'Enderagala Wana Senasuna Temple',
    district: 'Matale',
    town: 'Dambulla',
    coordinates: { lat: 7.915668037, lng: 80.67964552 }
  },
  {
    placeName: 'Kaludiya Pokuna',
    district: 'Matale',
    town: 'Dambulla',
    coordinates: { lat: 7.879672114, lng: 80.73525187 }
  },
  {
    placeName: 'Sera Ella Waterfall',
    district: 'Matale',
    coordinates: { lat: 7.591676221, lng: 80.75614093 }
  },
  {
    placeName: 'Wambatuthenna Waterfall',
    district: 'Matale',
    coordinates: { lat: 7.564482591, lng: 80.76735277 }
  },
  {
    placeName: 'Nalanda Gedige',
    district: 'Matale',
    coordinates: { lat: 7.531138497, lng: 80.7368184 }
  },
  {
    placeName: 'Kalu Ganga View Point',
    coordinates: { lat: 7.560329265, lng: 80.83222257 }
  },
  {
    placeName: 'Riverston',
    coordinates: { lat: 7.531190944, lng: 80.73720949 }
  },
  {
    placeName: 'Bambarakiri Ella',
    coordinates: { lat: 7.495442911, lng: 80.69903322 }
  },
  {
    placeName: 'Dumbara Ella Waterfall',
    coordinates: { lat: 7.474382966, lng: 80.7902062 }
  },
  {
    placeName: 'Walpolamulla (Smallest village in Sri Lanka)',
    coordinates: { lat: 7.497567143, lng: 80.76767613 }
  },
  {
    placeName: 'Gombaniya Hiking Trail (starting point)',
    coordinates: { lat: 7.435722442, lng: 80.74923157 }
  },
  {
    placeName: 'Kalabokka 360 Upper Division View Point',
    district: 'Matale',
    coordinates: { lat: 7.437304963, lng: 80.71149439 }
  },
  {
    placeName: 'Sembuwaththa',
    district: 'Matale',
    coordinates: { lat: 7.435964584, lng: 80.69983457 }
  },
  {
    placeName: 'One Tree Hill',
    district: 'Matale',
    coordinates: { lat: 7.441579444, lng: 80.68015581 }
  },
  {
    placeName: 'Padiwita Ambalama',
    district: 'Matale',
    coordinates: { lat: 7.452169319, lng: 80.60950625 }
  },
  {
    placeName: 'Sri Muththumari Amman Kovil',
    district: 'Matale',
    coordinates: { lat: 7.479604433, lng: 80.62409446 }
  },
  {
    placeName: 'Aluviharaya Rock Cave Temple',
    district: 'Matale',
    coordinates: { lat: 7.498122673, lng: 80.6219905 }
  }
  // Add more locations as needed
];

export default locations;