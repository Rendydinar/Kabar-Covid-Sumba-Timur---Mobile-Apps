import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ICLogo} from '../../assets/icon';
// import Firebase from '../../config/firebase';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import auth from '@react-native-firebase/auth';
interface IProps {
  navigation: any;
}

const Splash: React.FC<IProps> = props => {
  useEffect(() => {
    const unsubcribe = auth().onAuthStateChanged(user => {
      // setTimeout(() => {
      if (user) {
        // user still login
        props.navigation.replace('MainApp');
      } else {
        // user logout
        props.navigation.replace('GetStarted');
      }
      // }, 3000);
    });
    return () => unsubcribe();
  }, []);

  return (
    <View style={styles.rootPage}>
      <ICLogo />
      <Text style={styles.textTitle}>Kabar Covid Sumba Timur</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  rootPage: {
    backgroundColor: colors.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.white,
    marginTop: 20,
  },
});
