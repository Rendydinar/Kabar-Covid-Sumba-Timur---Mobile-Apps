import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ILHospitalBG} from '../../assets/illustration';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

interface IProps {}

const KabarVaksin: React.FC<IProps> = () => {
  useEffect(() => {
    // run firebase in here
  }, []);

  return (
    <View style={styles.root}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.textTitle}>Kabar Vaksin</Text>
        <Text style={styles.textDescription}>
          Informasi seputar vaksin covid-19 di Sumba Timur
        </Text>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.textTitle}>Konten Vaksin</Text>
      </View>
    </View>
  );
};

export default KabarVaksin;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    flex: 1,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  textTitle: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  textDescription: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    paddingTop: 14,
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
  },
});
