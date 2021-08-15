import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ICLogoGreen} from '../../assets/icon';
import {IGetStarted} from '../../assets/illustration';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

interface IProps {
  navigation: any;
  route: any;
}

const GetStrated: React.FC<IProps> = props => {
  const gotoMainApp = () => {
    props.navigation.replace('MainApp');
  };

  const gotoLogin = () => {
    props.navigation.navigate('Login');
  };

  return (
    <ImageBackground source={IGetStarted} style={styles.rootPage}>
      <ICLogoGreen />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: fonts.primary[900],
              fontSize: 28,
              color: colors.primary,
            }}>
            Kabar Covid Sumba Timur
          </Text>
        </View>
        <Text style={styles.textTitle}>
          Informasi seputar covid-19 di Sumba Timur
        </Text>
      </View>
      <View>
        <Button type="secondary" title="Lewati" onPress={gotoMainApp} />
        <Gap height={16} />
        <Button title="Login Sebagai Admin" onPress={gotoLogin} />
      </View>
    </ImageBackground>
  );
};

export default GetStrated;

const styles = StyleSheet.create({
  rootPage: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 40,
    paddingTop: 20,
    justifyContent: 'space-between',
    flex: 1,
    opacity: 0.9,
    backgroundColor: '#000',
  },
  textTitle: {
    fontSize: 24,
    color: colors.white,
    // marginTop: 90,
    fontFamily: fonts.primary[600],
  },
});
