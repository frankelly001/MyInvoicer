import {useColorScheme} from 'react-native';
import {useSelector} from 'react-redux';
import {storeState} from '../state/slices/storeType';

export const useColors = () => {
  const {colors} = useSelector((state: storeState) => state.colorsReducer);

  return colors;
};

export const useColorMode = () => {
  const {mode} = useSelector((state: storeState) => state.colorsReducer);
  const isDarkMode = useColorScheme() === 'dark';
  const allColorModes: {
    light: 'light';
    dark: 'dark';
    custom: 'dark' | 'light';
  } = {
    light: 'light',
    dark: 'dark',
    custom: isDarkMode ? 'dark' : 'light',
  };

  return {colorMode: allColorModes[mode], mode, allColorModes: allColorModes};
};
