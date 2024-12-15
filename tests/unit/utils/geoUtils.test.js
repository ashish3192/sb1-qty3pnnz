const geoUtils = require('../../../src/utils/geoUtils');

describe('GeoUtils', () => {
  describe('calculateDistance', () => {
    it('should calculate distance between two points correctly', () => {
      const point1 = { latitude: 40.7128, longitude: -74.0060 }; // New York
      const point2 = { latitude: 34.0522, longitude: -118.2437 }; // Los Angeles
      const distance = geoUtils.calculateDistance(point1, point2);
      expect(distance).toBeCloseTo(3935, 0); // ~3935 km
    });
  });

  describe('isPointInGeofence', () => {
    it('should return true for point inside geofence', () => {
      const point = { latitude: 40.7128, longitude: -74.0060 };
      const geofence = {
        coordinates: [{ latitude: 40.7128, longitude: -74.0060 }],
        radius: 1000 // 1km in meters
      };
      expect(geoUtils.isPointInGeofence(point, geofence)).toBe(true);
    });

    it('should return false for point outside geofence', () => {
      const point = { latitude: 40.7128, longitude: -74.0060 };
      const geofence = {
        coordinates: [{ latitude: 40.7528, longitude: -74.0460 }],
        radius: 100 // 100m
      };
      expect(geoUtils.isPointInGeofence(point, geofence)).toBe(false);
    });
  });
});