/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#3ad9cf';
const tintColorDark = '#26c5ba';

export const Colors = {
  light: {
    text: '#0b1e1d',
    background: '#f3fcfb',
    tint: tintColorLight,
    icon: '#7ef1e7',
    tabIconDefault: '#7ef1e7',
    tabIconSelected: tintColorLight,
    accent: '#45f7e8',
    secondary: '#7ef1e7',
    primary: '#3ad9cf',
  },
  dark: {
    text: '#e1f4f3',
    background: '#030c0b',
    tint: tintColorDark,
    icon: '#0e8177',
    tabIconDefault: '#0e8177',
    tabIconSelected: tintColorDark,
    accent: '#08baab',
    secondary: '#0e8177',
    primary: '#26c5ba',
  },
};
