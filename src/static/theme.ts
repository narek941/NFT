export interface ITheme {
  backgroundColor: string;
  errorRed: string;
  mainPrimary: string;
  mainSecondary: string;
  mainTertiary: string;
  mainQuaternary: string;
  mainQuinary: string;
  lightPrimary: string;
  lightSecondary: string;
  lightTertiary: string;
  lightQuaternary: string;
  lightQuinary: string;
  darkPrimary: string;
  darkSecondary: string;
  darkTertiary: string;
  darkQuaternary: string;
  darkQuinary: string;
}

export const themeLight: ITheme = {
  backgroundColor: 'rgba(213, 222, 230, 0.5)',
  errorRed: '#FD7465',
  mainPrimary: '#0F43F9',
  mainSecondary: '#3F69FA',
  mainTertiary: '#6F8EFB',
  mainQuaternary: '#9FB4FC',
  mainQuinary: '#CFD9FE',
  lightPrimary: '#FFFFFF',
  lightSecondary: '#F3FAFF',
  lightTertiary: '#EBF2F8',
  lightQuaternary: 'rgba(255, 255, 255, 1)',
  lightQuinary: '#EBF2F8',
  darkPrimary: '#182F43',
  darkSecondary: '#2E5A81',
  darkTertiary: '#4685BD',
  darkQuaternary: '#84AED3',
  darkQuinary: '#C1D6E9',
};

export const themeDark: ITheme = {
  backgroundColor: '#121212',
  errorRed: '#FD7465',
  mainPrimary: '#0F43F9',
  mainSecondary: '#3F69FA',
  mainTertiary: '#6F8EFB',
  mainQuaternary: '#9FB4FC',
  mainQuinary: '#CFD9FE',
  lightPrimary: '#FFFFFF',
  lightSecondary: '#F3FAFF',
  lightTertiary: '#EBF2F8',
  lightQuaternary: 'rgba(255, 255, 255, 1)',
  lightQuinary: '#EBF2F8',
  darkPrimary: '#182F43',
  darkSecondary: '#2E5A81',
  darkTertiary: '#4685BD',
  darkQuaternary: '#84AED3',
  darkQuinary: '#C1D6E9',
};
