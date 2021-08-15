import Gap from 'components/atoms/Gap';
import UbahDataCovid from 'components/organims/UbahDataCovid';
import UbahDataCovidPerkecamatan from 'components/organims/UbahDataCovidPerkecamatan';
import UbahDataIsolasi from 'components/organims/UbahDataIsolasi';
import UbahDataVaksin from 'components/organims/UbahDataVaksin';
import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ILHospitalBG} from '../../assets/illustration';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

interface IProps {}

const Admin: React.FC<IProps> = () => {
  useEffect(() => {
    // run firebase in here
  }, []);

  return (
    <View style={styles.root}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <ImageBackground source={ILHospitalBG} style={styles.background}>
          <Text style={styles.textTitle}>Admin Area</Text>
          <Text style={styles.textDescription}>
            Admin area untuk manajemen database
          </Text>
        </ImageBackground>
        <View style={styles.content}>
          <UbahDataCovid />
          <Gap height={10} />
          <UbahDataCovidPerkecamatan />
          <Gap height={10} />
          <UbahDataIsolasi />
          <Gap height={10} />
          <UbahDataVaksin />
        </View>
      </ScrollView>
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    flex: 1,
  },
  background: {
    height: 250,
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
