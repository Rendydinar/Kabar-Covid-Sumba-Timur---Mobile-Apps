import {StyleSheet} from 'react-native';
import {colors, fonts} from 'utils';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  containerCardVaksin: {
    marginVertical: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
  },
  indexVaksinCard: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 40 / 2,
    textAlign: 'center',
    fontFamily: fonts.primary[800],
    fontSize: 20,
  },
  waktuVaksin: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginBottom: 6,
  },
  kewajibanVaksin: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginBottom: 6,
    marginLeft: 5,
  },
  imgVaksin: {
    width: '100%',
    height: 500,
    resizeMode: 'contain',
  },
});

export default styles;
