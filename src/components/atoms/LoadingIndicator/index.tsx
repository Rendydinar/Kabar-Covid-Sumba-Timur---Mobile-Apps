import React from 'react';
import {ActivityIndicator} from 'react-native';

interface IProps {
  size: 'small' | 'large';
  color: string;
  animating?: boolean;
}

const LoadingIndicator: React.FC<IProps> = props => {
  return (
    <ActivityIndicator
      size={props.size}
      color={props.color === 'primary' ? '#28DF99' : props.color}
      animating={props.animating}
    />
  );
};

LoadingIndicator.defaultProps = {
  animating: true,
};

export default LoadingIndicator;
