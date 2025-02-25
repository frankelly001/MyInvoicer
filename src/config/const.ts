import {Dimensions, PixelRatio, Platform, StyleSheet} from 'react-native';

const {height: screenHeight, width: screenWidth} = Dimensions.get('screen');

const touch = 10;

export const MAIN_HEADER_HEIGHT = 50;
export const HEADER_TITLE_HEIGHT = 35;
export const HEADER_SEARCH_HEIGHT = 70;
export const HEADER_INPUT_HEIGHT = 45;

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const detectTouch = {
  bottom: touch,
  right: touch,
  left: touch,
  top: touch,
};

export const imageFit: any = {
  width: '100%',
  height: '100%',
};

const frame = {height: 812, width: 375}; // Frame according to figma design

// const widthBaseScale = screenWidth / frame.width;
// const heightBaseScale = screenHeight / frame.height;

// function normalize(size: number, based = 'width') {
//   const newSize =
//     based === 'height' ? size * heightBaseScale : size * widthBaseScale;
//   return Math.round(PixelRatio.roundToNearestPixel(newSize));
// }
function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height'
      ? (size * screenHeight) / frame.height
      : (size * screenWidth) / frame.width;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// for width  pixel
const widthPixel = (size: number) => normalize(size, 'width');
// for height  pixel
const heightPixel = (size: number) => normalize(size, 'height');
// for font  pixel
const fontPixel = (size: number) => widthPixel(size); // prev was heightPixel
// for relative pixels
const relativePixels = (size: number) => heightPixel(size);

const heightPercentageToDP = (heightPercent: string | number) => {
  // Parse string percentage input and convert it to number.
  const elementHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : Number.parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenHeight * elementHeight) / 100);
};
const widthPercentageToDP = (widthPercent: string | number) => {
  // Parse string percentage input and convert it to number.
  const elementWidth =
    typeof widthPercent === 'number'
      ? widthPercent
      : Number.parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenWidth * elementWidth) / 100);
};

export {
  fontPixel as fp,
  heightPixel as hp,
  heightPercentageToDP as hpt,
  relativePixels as px,
  screenHeight as SCREEN_HEIGHT,
  screenWidth as SCREEN_WIDTH,
  widthPixel as wp,
  widthPercentageToDP as wpt,
};

//we can use the function or just the object.
export const fontSz = fontPixel;

export const generateFontFamily = (
  fontFamily: FONT_FAMILY_TYPES,
  weight: FONT_WEIGHT,
) => `${fontFamily}-${weight}`;

type generateTypographyProps = {
  size: number;
  family: FONT_FAMILY_TYPES;
  weight: FONT_WEIGHT;
  lineHeight?: number;
};

const generateTypography = ({
  family,
  weight,
  size,
}: generateTypographyProps) => {
  return {
    fontFamily: generateFontFamily(family, weight),
    fontSize: fontSz(size),
    // lineHeight: fontSz(size) * 1.3,
  };
};

export const typography = StyleSheet.create({
  heading_h1: generateTypography({family: 'Inter', weight: 'Bold', size: 24}),
  heading_h2: generateTypography({family: 'Inter', weight: 'Bold', size: 18}),
  heading_h3: generateTypography({family: 'Inter', weight: 'Bold', size: 16}),
  heading_h4: generateTypography({family: 'Inter', weight: 'Bold', size: 14}),
  heading_h5: generateTypography({family: 'Inter', weight: 'Bold', size: 12}),
  body_xl: generateTypography({family: 'Inter', weight: 'Regular', size: 18}),
  body_l: generateTypography({family: 'Inter', weight: 'Regular', size: 16}),
  body_m: generateTypography({family: 'Inter', weight: 'Regular', size: 14}),
  body_s: generateTypography({family: 'Inter', weight: 'Regular', size: 12}),
  body_xs: generateTypography({family: 'Inter', weight: 'Regular', size: 10}),
  action_l: generateTypography({family: 'Inter', weight: 'SemiBold', size: 14}),
  action_m: generateTypography({family: 'Inter', weight: 'SemiBold', size: 12}),
  action_s: generateTypography({family: 'Inter', weight: 'SemiBold', size: 10}),
  caption_m: generateTypography({
    family: 'Inter',
    weight: 'SemiBold',
    size: 10,
  }),
});

export type TEXT_SIZES = keyof typeof typography;

export type FONT_FAMILY_TYPES = 'Inter';

export type FONT_WEIGHT =
  | 'Black'
  | 'Bold'
  | 'ExtraBold'
  | 'ExtraLight'
  | 'Light'
  | 'Medium'
  | 'Regular'
  | 'SemiBold'
  | 'Thin';

export type ALIGN_TYPES = 'left' | 'center' | 'right' | 'auto';

export type COLOR_TYPES =
  | 'transparent'
  | 'button'
  | 'highlight_1'
  | 'highlight_2'
  | 'highlight_3'
  | 'highlight_4'
  | 'highlight_5'
  | 'neutral_light_1'
  | 'neutral_light_2'
  | 'neutral_light_3'
  | 'neutral_light_4'
  | 'neutral_light_5'
  | 'neutral_dark_1'
  | 'neutral_dark_2'
  | 'neutral_dark_3'
  | 'neutral_dark_4'
  | 'neutral_dark_5'
  | 'dark_tranparent_1'
  | 'dark_tranparent_2'
  | 'dark_tranparent_3'
  | 'support_sucess_1'
  | 'support_sucess_2'
  | 'support_sucess_3'
  | 'support_warning_1'
  | 'support_warning_2'
  | 'support_warning_3'
  | 'support_error_1'
  | 'support_error_2'
  | 'support_error_3'
  | 'danger';

export type COLORS_OBJECT_TYPES = {[key in COLOR_TYPES]: string};

export type COLOR_MODE_TYPES = 'light' | 'dark' | 'custom';
