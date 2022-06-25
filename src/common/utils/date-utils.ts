import * as dateFunctions from 'date-fns';

export const dateParse = (date: any, format = `dd.MM.yyyy`) =>
  `${dateFunctions.format(new Date(date), format)}`;

export const dateParseToMinutesAgo = (
  date: any,
  format: string = `dd.MM.yyyy hh:mm a`
) => {
  const now = new Date();

  const diff = dateFunctions.differenceInHours(
    now,
    new Date(dateFunctions.parseISO(date))
  );
  const oneDay = 24;

  if (diff <= oneDay) {
    return dateFunctions.formatDistance(new Date(date), now, {
      addSuffix: true,
      includeSeconds: true,
    });
  } else {
    return dateParse(date, format);
  }
};
