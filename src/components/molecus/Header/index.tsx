import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import Button from '../../atoms/Button';
import DarkProfile from './DarkProfile';

interface IProps {
  type?: string;
  onPress?: () => void;
  title?: string;
  photo?: any;
  description?: string;
}
const Header: React.FC<IProps> = props => {
  if (props.type === 'dark-profile' && props.description) {
    return (
      <DarkProfile
        onPress={props.onPress}
        title={props.title}
        photo={{uri: props.photo}}
        description={props.description}
      />
    );
  }
  return (
    <View style={styles(props.type).container}>
      <Button
        type="icon-only"
        icon={props.type === 'dark' ? 'back-light' : 'back-dark'}
        onPress={props.onPress}
      />
      <Text style={styles(props.type).text}>{props.title}</Text>
      {/* <Gap width={24} /> */}
    </View>
  );
};

export default Header;

const styles = (type?: string) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 30,
      backgroundColor: type === 'dark' ? colors.dark4 : colors.white,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomLeftRadius: type === 'dark' ? 20 : 0,
      borderBottomRightRadius: type === 'dark' ? 20 : 0,
    },
    text: {
      textAlign: 'center',
      flex: 1,
      fontSize: 20,
      fontFamily: fonts.primary[600],
      color: type === 'dark' ? colors.white : colors.text.primary,
      textTransform: 'capitalize',
    },
  });
