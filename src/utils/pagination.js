const createPagination = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return {
    take: parseInt(limit),
    skip: parseInt(skip)
  };
};

const formatPaginatedResponse = (data, total, page, limit) => {
  return {
    data,
    meta: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    }
  };
};

module.exports = {
  createPagination,
  formatPaginatedResponse
};