import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ICLogoGreen} from '../../assets/icon';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import Input from '../../components/atoms/Input';
// import Firebase from '../../config/firebase';
import auth from '@react-native-firebase/auth';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {storeData} from '../../utils/localStorage';
import {showError} from '../../utils/showMessage';
import {useForm} from '../../utils/useForm';

interface IProps {
  navigation: any;
}

const Login: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const handleToggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    dispatch({
      type: 'SET_LOADING',
      value: true,
    });
    auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then((resLogin: any) => {
        storeData('user', resLogin);
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        props.navigation.replace('MainApp');
      })
      .catch(err => {
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        showError(err.message);
      });
  };

  return (
    <>
      <View style={styles.rootLoginPage}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Gap height={40} />
          <ICLogoGreen />
          <Text style={styles.title}>Login sebagai admin</Text>
          <Input
            label="Alamat email"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Kata sandi"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry={showPassword ? false : true}
            endIcon={
              <Button
                type="icon-only"
                icon={showPassword ? 'unvisible-eyes' : 'visible-eyes'}
                onPress={handleToggleShowPassword}
              />
            }
          />
          <Gap height={10} />
          <Gap height={24} />
          <Button title="Login" onPress={handleLogin} />
          <Gap height={30} />
        </ScrollView>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  rootLoginPage: {
    paddingHorizontal: 40,
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
    marginTop: 40,
    marginBottom: 40,
    // maxWidth: 153,
  },
});
