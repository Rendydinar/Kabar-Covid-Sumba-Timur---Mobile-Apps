import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ICSendDark, ICSendLight} from '../../../../assets/icon';
import styles from './styles';

interface IProps {
  disable?: boolean;
  onPress?: () => void;
}

const BtnIconSend: React.FC<IProps> = props => {
  if (props.disable) {
    return (
      <View style={styles(props.disable).container}>
        <ICSendDark />
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles(props.disable).container}
      onPress={props.onPress}>
      <ICSendLight />
    </TouchableOpacity>
  );
};
export default BtnIconSend;
