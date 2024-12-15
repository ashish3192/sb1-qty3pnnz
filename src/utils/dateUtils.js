const { format, parseISO, isValid, differenceInDays } = require('date-fns');

const dateUtils = {
  formatDate: (date, formatStr = 'yyyy-MM-dd') => {
    if (!date) return null;
    const parsed = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsed) ? format(parsed, formatStr) : null;
  },

  isExpiringSoon: (date, thresholdDays = 30) => {
    if (!date) return false;
    const parsed = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(parsed)) return false;
    
    const daysUntilExpiry = differenceInDays(parsed, new Date());
    return daysUntilExpiry <= thresholdDays && daysUntilExpiry > 0;
  },

  isExpired: (date) => {
    if (!date) return false;
    const parsed = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsed) && parsed < new Date();
  }
};

module.exports = dateUtils;