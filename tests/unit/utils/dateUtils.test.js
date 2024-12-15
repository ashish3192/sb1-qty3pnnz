const dateUtils = require('../../../src/utils/dateUtils');

describe('DateUtils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2023-10-20');
      expect(dateUtils.formatDate(date)).toBe('2023-10-20');
    });

    it('should handle invalid dates', () => {
      expect(dateUtils.formatDate('invalid-date')).toBeNull();
    });
  });

  describe('isExpiringSoon', () => {
    it('should return true for dates expiring within threshold', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 15);
      expect(dateUtils.isExpiringSoon(futureDate)).toBe(true);
    });

    it('should return false for dates far in the future', () => {
      const farFutureDate = new Date();
      farFutureDate.setDate(farFutureDate.getDate() + 60);
      expect(dateUtils.isExpiringSoon(farFutureDate)).toBe(false);
    });
  });
});