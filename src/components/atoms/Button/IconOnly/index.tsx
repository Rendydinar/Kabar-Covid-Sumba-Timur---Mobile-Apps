import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  ICBackDark,
  ICBackLight,
  ICUnVisibleEyes,
  ICVisibleEyes,
} from 'assets/icon';

interface IProps {
  icon: string;
  onPress?: () => void;
}

const IconOnly: React.FC<IProps> = props => {
  const Icon = () => {
    if (props.icon === 'back-dark') {
      return <ICBackDark />;
    } else if (props.icon === 'back-light') {
      return <ICBackLight />;
    } else if (props.icon === 'visible-eyes') {
      return <ICVisibleEyes />;
    } else if (props.icon === 'unvisible-eyes') {
      return <ICUnVisibleEyes />;
    } else if (props.icon === 'add-icon') {
      return <ICVisibleEyes />;
    } else if (props.icon === 'remove-icon') {
      return <ICUnVisibleEyes />;
    } else {
      return <ICBackDark />;
    }
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;
