import {ICDatabase} from 'assets';
import CardItemPage from 'components/molecus/CardItemPage';
import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {IGetStarted} from '../../assets/illustration';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

interface IProps {
  navigation: any;
}

const MainApp: React.FC<IProps> = props => {
  const gotoPage = (pageName: string) => {
    props.navigation.navigate(pageName);
  };

  useEffect(() => {
    // run firebase in here
  }, []);

  return (
    <View style={styles.root}>
      <ImageBackground source={IGetStarted} style={styles.background}>
        <Text style={styles.textTitle}>Kabar Covid Sumba Timur</Text>
        <Text style={styles.textDescription}>
          Pantau perkembangan covid-19 dalam genggaman anda
        </Text>
      </ImageBackground>
      <View style={styles.content}>
        <CardItemPage
          icon={<ICDatabase />}
          title="Ubah Data"
          onPress={() => gotoPage('Admin')}
        />
      </View>
    </View>
  );
};

export default MainApp;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    flex: 1,
  },
  background: {
    height: 240,
    paddingTop: 30,
    paddingHorizontal: 10,
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
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.primary,
    textAlign: 'center',
  },
});
