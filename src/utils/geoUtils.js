const geoUtils = {
  calculateDistance: (coord1, coord2) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(coord2.latitude - coord1.latitude);
    const dLon = toRad(coord2.longitude - coord1.longitude);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRad(coord1.latitude)) * Math.cos(toRad(coord2.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  isPointInGeofence: (point, geofence) => {
    const distance = geoUtils.calculateDistance(point, {
      latitude: geofence.coordinates[0].latitude,
      longitude: geofence.coordinates[0].longitude
    });
    return distance <= geofence.radius / 1000; // Convert radius from meters to km
  },

  toRad: (degrees) => {
    return degrees * Math.PI / 180;
  }
};

module.exports = geoUtils;