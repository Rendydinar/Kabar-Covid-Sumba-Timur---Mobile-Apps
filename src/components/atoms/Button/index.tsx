import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import BtnIconSend from './BtnIconSend';
import IconOnly from './IconOnly';
import styles from './styles';

interface IProps {
  title?: string;
  type?: string;
  disable?: boolean;
  icon?: string;
  onPress?: () => void;
}
const Button: React.FC<IProps> = props => {
  if (props.type === 'btn-icon-send') {
    return <BtnIconSend disable={props.disable} onPress={props.onPress} />;
  }
  if (props.type === 'icon-only' && props.icon) {
    return <IconOnly icon={props.icon} onPress={props.onPress} />;
  }

  if (props.disable) {
    return (
      <View style={styles(props.type).disableBg}>
        <Text style={styles(props.type).disableText}>{props.title}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles(props.type).rootButton}
      onPress={props.onPress}>
      <Text style={styles(props.type).labelButton}>{props.title}</Text>
    </TouchableOpacity>
  );
};
export default Button;
