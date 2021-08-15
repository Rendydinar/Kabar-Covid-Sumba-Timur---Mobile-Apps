import {StyleSheet} from 'react-native';
import {colors} from 'utils';

const styles = (disable?: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: disable ? colors.disable : colors.primary,
      width: 45,
      height: 45,
      borderRadius: 10,
      paddingTop: 3,
      paddingRight: 3,
      paddingBottom: 8,
      paddingLeft: 8,
    },
  });

export default styles;
