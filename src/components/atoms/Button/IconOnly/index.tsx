import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ICBackDark, ICBackLight} from 'assets/icon';

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
