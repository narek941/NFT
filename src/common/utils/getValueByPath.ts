export const getValueByPath = (obj: object, path: string): any => {
  return path.split('.').reduce((acc, current) => {
    return acc?.[current];
  }, obj);
};
