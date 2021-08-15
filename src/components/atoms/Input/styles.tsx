import {StyleSheet} from 'react-native';
import {colors, fonts} from 'utils';

const styles = (border?: string) =>
  StyleSheet.create({
    rootInput: {
      width: '100%',
      minWidth: 280,
      height: 45,
      borderWidth: 1,
      borderColor: border,
      borderRadius: 10,
      padding: 12,
    },
    label: {
      fontSize: 16,
      color: colors.text.secondary,
      marginBottom: 6,
      fontFamily: fonts.primary[400],
    },
  });

export default styles;
