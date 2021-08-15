import {StyleSheet} from 'react-native';
import {colors, fonts} from 'utils';

const styles = (
  size: number,
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify'
) =>
  StyleSheet.create({
    linkTitle: {
      fontSize: size,
      color: colors.text.secondary,
      fontFamily: fonts.primary[400],
      textDecorationLine: 'underline',
      textAlign: align,
    },
  });

export default styles;
