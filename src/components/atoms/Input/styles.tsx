import {StyleSheet} from 'react-native';
import {colors, fonts} from 'utils';

const styles = (border?: string, multiline?: boolean) =>
  StyleSheet.create({
    rootInput: {
      width: '100%',
      minWidth: 280,
      height: multiline ? 'auto' : 45,
      borderWidth: 1,
      borderColor: border,
      borderRadius: 10,
      padding: 12,
      flex: 1,
    },
    label: {
      fontSize: 16,
      color: colors.text.secondary,
      marginBottom: 6,
      fontFamily: fonts.primary[400],
    },
    containerEndIcon: {
      position: 'absolute',
      right: 10,
    },
    containerInputField: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      position: 'relative',
    },
  });

export default styles;
