import {ICDatabase} from 'assets';
import {IGetStarted} from 'assets/illustration';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import CardItemPage from 'components/molecus/CardItemPage';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getData} from 'utils';
import {colors} from 'utils/colors';
import {fonts} from 'utils/fonts';
import {showError} from 'utils/showMessage';

interface IProps {
  navigation: any;
}

const MainApp: React.FC<IProps> = props => {
  const [isUserLoginAdmin, setIsUserLoginAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const gotoPage = (pageName: string) => {
    props.navigation.navigate(pageName);
  };

  const getUserLogin = async () => {
    setIsLoading(true);
    try {
      const userLogin = await getData('user');
      userLogin ? setIsUserLoginAdmin(true) : setIsUserLoginAdmin(false);
    } catch (err) {
      showError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUserLogin();
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
        {isLoading ? (
          <LoadingIndicator size="small" color="primary" />
        ) : isUserLoginAdmin ? (
          <CardItemPage
            icon={<ICDatabase />}
            title="Manajemen Data"
            onPress={() => gotoPage('Admin')}
          />
        ) : (
          <Text>
            Kamu Bukan Admin, Untuk Saat Ini Halaman Pengguna Bukan Admin Sedang
            Dikerjakan
          </Text>
        )}
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
