import React from 'react';
import {View} from 'react-native';

interface IProps {
  width?: number;
  height?: number;
}

const Gap: React.FC<IProps> = props => {
  return <View style={{height: props.height, width: props.width}}></View>;
};

export default Gap;
