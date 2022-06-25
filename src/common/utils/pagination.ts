export const getPagesCnt = (totalPages: number, limit: number) =>
  Math.ceil(totalPages / limit);

export const getOffset = (page: number, limit: number) => (page - 1) * limit;

export const DEFAULT_LIMIT = 24;

export const DEFAULT_NOTIFICATION_LIMIT = 12;

export const getQueryKeys = (obj: Record<string, any>) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (
      (key === 'page' && obj[key] == 1) ||
      (key === 'limit' && obj[key] == DEFAULT_LIMIT)
    ) {
      return acc;
    }
    if (
      obj[key] !== undefined &&
      obj[key] !== null &&
      obj[key] !== '' &&
      key !== 'isResetAction'
    ) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};
