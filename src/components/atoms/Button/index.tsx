import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import BtnIconSend from './BtnIconSend';
import IconOnly from './IconOnly';
import styles from './styles';

interface IProps {
  title?: string;
  type?: string;
  disable?: boolean;
  icon?: string;
  onPress?: () => void;
  isShowPrompt?: boolean;
}
const Button: React.FC<IProps> = props => {
  const handleOnPressButton = (): void => {
    if (props.onPress && props.isShowPrompt) {
      // Prompt the user before execute onPress button
      Alert.alert(
        'Peringatan',
        'Apakah kamu akan melakukan melanjutkan perubahan ?',
        [
          {text: 'Tidak', style: 'cancel', onPress: () => {}},
          {
            text: 'Iya',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: props.onPress,
          },
        ]
      );
    } else {
      if (props.onPress) {
        props?.onPress();
      }
    }
  };

  if (props.type === 'btn-icon-send') {
    return <BtnIconSend disable={props.disable} onPress={props.onPress} />;
  }
  if (props.type === 'icon-only' && props.icon) {
    return <IconOnly icon={props.icon} onPress={handleOnPressButton} />;
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
      onPress={handleOnPressButton}>
      <Text style={styles(props.type).labelButton}>{props.title}</Text>
    </TouchableOpacity>
  );
};
export default Button;
