import { themeLight } from '@static/theme';

export const stripeOptions = {
  fonts: [
    {
      cssSrc:
        'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap',
      family: 'Poppins',
    },
  ],
  appearance: {
    variables: {
      fontFamily: 'Poppins',
      fontSizeSm: '14px',
      fontSizeBase: '14px',
      spacingUnit: '5px',
      colorDanger: themeLight.errorRed,
    },
  },
};
