import {StyleSheet} from 'react-native';
import {colors, fonts} from 'utils';

const styles = (type?: string) =>
  StyleSheet.create({
    rootButton: {
      backgroundColor:
        type === 'secondary'
          ? colors.button.secondary.background
          : colors.button.primary.background,
      borderRadius: 10,
      paddingVertical: 10,
    },
    labelButton: {
      fontFamily: fonts.primary[600],
      fontSize: 18,
      textAlign: 'center',
      color: type === 'secondary' ? colors.black : colors.white,
    },
    disableBg: {
      borderRadius: 10,
      paddingVertical: 10,
      backgroundColor: colors.button.disable.background,
    },
    disableText: {
      fontFamily: fonts.primary[600],
      fontSize: 18,
      textAlign: 'center',
      color: colors.button.disable.text,
    },
  });

export default styles;
