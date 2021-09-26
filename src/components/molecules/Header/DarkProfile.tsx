import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import Button from '../../atoms/Button';

interface IProps {
  onPress?: () => void;
  title?: string;
  description: string;
  photo: any;
}

const DarkProfile: React.FC<IProps> = props => {
  return (
    <View style={styles.root}>
      <Button type="icon-only" icon="back-light" onPress={props.onPress} />
      <View style={styles.content}>
        <Text style={styles.textName}>{props.title}</Text>
        <Text style={styles.textDescription}>{props.description}</Text>
      </View>
      <Image source={props.photo} style={styles.avatar} />
    </View>
  );
};

export default DarkProfile;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.dark4,
    paddingVertical: 30,
    paddingLeft: 20,
    paddingRight: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
  textName: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  textDescription: {
    fontSize: 14,
    fontFamily: fonts.primary[800],
    marginTop: 6,
    textAlign: 'center',
    color: colors.white,
  },
});
