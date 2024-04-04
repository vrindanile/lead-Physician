//react components
import React from 'react';
import {StyleSheet, Text} from 'react-native';
//global
import Color from '../../Global/Color';
import {Fonts} from '../../Global/Index';
//props
interface Props {
  text: String;
  fontSize: number;
  style: Object;
  fontFamily:
    | 'black'
    | 'blackItalic'
    | 'bold'
    | 'boldItalic'
    | 'italic'
    | 'light'
    | 'lightItalic'
    | 'medium'
    | 'mediumItalic'
    | 'regular'
    | 'thin'
    | 'thinItalic';
  textColor:
    | 'black'
    | 'white'
    | 'theme_green'
    | 'lite_green'
    | 'theme_blue'
    | 'lite_blue'
    | 'bg_green'
    | 'red'
    | 'lite_grey';
  textAlign: 'auto' | 'center' | 'justify' | 'left' | 'right';
  fontWeight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';

  isUnderLine: true | false;
  numberOfLines: number;
  marginHorizontal: number;
  marginVertical: number;
  marginTop: number;
  marginRight: number;
  marginLeft: number;
  marginBottom: number;
  width: number;
  lineHeight: number;
}

const MyText: React.FC<Props> = ({
  text,
  textColor = 'black',
  fontFamily = 'regular',
  fontWeight = 'normal',
  fontSize = 14,
  textAlign = 'auto',
  style = {},
  isUnderLine = false,
  numberOfLines,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginRight,
  marginLeft,
  marginBottom,
  width,
  lineHeight,
}) => {
  const getFontFamily = (): string => {
    const propsFontFamilies: string[] = [
      'black',
      'blackItalic',
      'bold',
      'boldItalic',
      'italic',
      'light',
      'lightItalic',
      'medium',
      'mediumItalic',
      'regular',
      'thin',
      'thinItalic',
    ];
    const fontFamilies: string[] = Object.values(Fonts);
    const index: number = propsFontFamilies.findIndex(
      item => item === fontFamily,
    );
    if (index > -1) return fontFamilies[index];
    return fontFamily;
  };
  const getFontColor = () => {
    const keys: string[] = Object.keys(Color).map(item => item?.toLowerCase());
    const values: string[] = Object.values(Color).map((item: any) =>
      item?.toLowerCase(),
    );
    const idx: number = keys.findIndex(item => item === textColor);
    if (idx > 1) return values[idx];
    return textColor;
  };
  const styles = StyleSheet.create({
    textStyle: {
      color: getFontColor(),
      fontSize: fontSize,
      textAlign: textAlign,
      fontFamily: getFontFamily(),
      fontWeight: fontWeight,
      textDecorationLine: isUnderLine ? 'underline' : 'none',
      marginHorizontal: marginHorizontal,
      marginVertical: marginVertical,
      marginTop: marginTop,
      marginRight: marginRight,
      marginLeft: marginLeft,
      marginBottom: marginBottom,
      width: width,
      lineHeight: lineHeight,
    },
  });
  //UI
  return (
    <Text
      numberOfLines={numberOfLines}
      allowFontScaling={false}
      style={[styles.textStyle, style]}>
      {text}
    </Text>
  );
};
export default MyText;
