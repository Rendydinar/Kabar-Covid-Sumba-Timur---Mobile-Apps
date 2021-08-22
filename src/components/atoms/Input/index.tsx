import React, {useState} from 'react';
import {ReactNode} from 'react';
import {KeyboardTypeOptions, Text, TextInput, View} from 'react-native';
import {colors} from '../../../utils/colors';
import styles from './styles';

interface IProps {
  label: string;
  value: string;
  disable?: boolean;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  type?: KeyboardTypeOptions;
  multiline?: boolean;
  endIcon?: ReactNode;
}

const Input: React.FC<IProps> = props => {
  const [border, setBorder] = useState(colors.border);

  const onFocusInput = () => {
    setBorder(colors.tertiary);
  };

  const onBlurInput = () => {
    setBorder(colors.border);
  };

  return (
    <View style={{width: '100%'}}>
      <Text style={styles().label}>{props.label}</Text>
      <View style={styles().containerInputField}>
        <TextInput
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          style={styles(border, props.multiline && true).rootInput}
          value={props.value}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureTextEntry}
          editable={!props.disable}
          selectTextOnFocus={!props.disable}
          keyboardType={props.type}
          multiline={props.multiline}
          underlineColorAndroid="transparent"
        />
        {props.endIcon && (
          <View style={styles().containerEndIcon}>{props.endIcon}</View>
        )}
      </View>
    </View>
  );
};

export default Input;
