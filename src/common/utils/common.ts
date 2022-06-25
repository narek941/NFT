export const isServer = typeof window === 'undefined';

export const isDev = process.env.NODE_ENV === 'development';

export const jsonParse = (data: string) => {
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const wait = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
