import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

interface IProps {
  title: string;
  size: number;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  onPress?: () => void;
}

const Link: React.FC<IProps> = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={styles(props.size, props.align).linkTitle}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Link;
