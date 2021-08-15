import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from 'utils';

interface IProps {
  title: string;
  icon: any;
  onPress: () => void;
}

const CardItemPage: React.FC<IProps> = props => {
  return (
    <TouchableOpacity style={styles.root} onPress={props.onPress}>
      {props.icon}
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CardItemPage;

const styles = StyleSheet.create({
  root: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 10,
    borderColor: colors.primary,
    borderRadius: 10,
    height: 80,
    backgroundColor: colors.green4,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.primary,
    textAlign: 'center',
  },
});
{
  /* <View
          style={{
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
            shadowOpacity: 10,
            borderColor: colors.primary,
            borderRadius: 10,
            height: 80,
            backgroundColor: colors.green4,
          }}>
          <ICDatabase />
          <Text style={styles.title}>Ubah Data</Text>
        </View> */
}
