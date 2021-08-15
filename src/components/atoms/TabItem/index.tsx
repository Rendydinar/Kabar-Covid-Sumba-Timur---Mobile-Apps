import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {
  ICDoctor,
  ICDoctorActive,
  ICHospitals,
  ICHospitalsActive,
  ICMessages,
  ICMessagesActive,
} from 'assets/icon';
import styles from './styles';

interface IProps {
  title: string;
  active: boolean;
  onLongPress: () => void;
  onPress: () => void;
}

const TabItem: React.FC<IProps> = props => {
  const Icon = () => {
    if (props.title === 'Doctor') {
      return props.active ? <ICDoctorActive /> : <ICDoctor />;
    }
    if (props.title === 'Messages') {
      return props.active ? <ICMessagesActive /> : <ICMessages />;
    }
    if (props.title === 'Hospitals') {
      return props.active ? <ICHospitalsActive /> : <ICHospitals />;
    }
    return <ICDoctor />;
  };

  return (
    <TouchableOpacity
      style={styles().root}
      onPress={props.onPress}
      onLongPress={props.onLongPress}>
      <Icon />
      <Text style={styles(props.active).title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;
