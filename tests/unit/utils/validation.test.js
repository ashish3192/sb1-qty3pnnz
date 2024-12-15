const { isValidUUID, isValidDate, sanitizeInput } = require('../../../src/utils/validation');

describe('Validation Utils', () => {
  describe('isValidUUID', () => {
    it('should return true for valid UUID', () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      expect(isValidUUID(uuid)).toBe(true);
    });

    it('should return false for invalid UUID', () => {
      const invalidUuid = '123-456-789';
      expect(isValidUUID(invalidUuid)).toBe(false);
    });
  });

  describe('isValidDate', () => {
    it('should return true for valid date', () => {
      expect(isValidDate('2023-10-20')).toBe(true);
    });

    it('should return false for invalid date', () => {
      expect(isValidDate('invalid-date')).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should sanitize HTML tags', () => {
      const input = '<script>alert("xss")</script>';
      expect(sanitizeInput(input)).not.toContain('<');
      expect(sanitizeInput(input)).not.toContain('>');
    });

    it('should trim whitespace', () => {
      const input = '  test  ';
      expect(sanitizeInput(input)).toBe('test');
    });
  });
});