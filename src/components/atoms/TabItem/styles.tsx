import {StyleSheet} from 'react-native';
import {colors, fonts} from 'utils';

const styles = (active?: any) =>
  StyleSheet.create({
    root: {
      alignItems: 'center',
    },
    title: {
      fontSize: 10,
      color: active ? colors.text.menuActive : colors.text.menuInactive,
      fontFamily: fonts.primary[600],
      marginTop: 4,
    },
  });

export default styles;
