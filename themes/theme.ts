import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac6',
    background: '#ffffff',
    surface: '#f6f6f6',
    error: '#B00020',
    text: '#000000',
    onSurface: '#000000',
    disabled: '#f0f0f0',
    placeholder: '#a0a0a0',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  roundness: 8,
};
