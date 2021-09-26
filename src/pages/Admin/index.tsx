import {ICDatabase} from 'assets';
import CardItemPage from 'components/molecules/CardItemPage';
import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ILHospitalBG} from 'assets/illustration';
import {colors} from 'utils/colors';
import {fonts} from 'utils/fonts';

interface IProps {
  navigation: any;
}

const Admin: React.FC<IProps> = props => {
  const gotoPage = (pageName: string) => {
    props.navigation.navigate(pageName);
  };

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
          <CardItemPage
            icon={<ICDatabase />}
            title="Manajemen Data Covid"
            onPress={() => gotoPage('ManajemenDataCovid')}
          />
          <CardItemPage
            icon={<ICDatabase />}
            title="Manajemen Data Covid Perkecamatan"
            onPress={() => gotoPage('ManajemenDataCovidPerkecamatan')}
          />
          <CardItemPage
            icon={<ICDatabase />}
            title="Manajemen Data Isolasi"
            onPress={() => gotoPage('ManajemenDataIsolasi')}
          />
          <CardItemPage
            icon={<ICDatabase />}
            title="Manajemen Data Vaksin"
            onPress={() => gotoPage('ManajemenDataVaksin')}
          />
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
    paddingHorizontal: 30,
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
