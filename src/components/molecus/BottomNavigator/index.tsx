import TabItem from 'components/atoms/TabItem';
import React from 'react';
import {View} from 'react-native';
import styles from './styles';

// props default: state, descriptors, navigation

interface IProps {
  state: any;
  navigation: any;
  descriptors: any;
}

const BottomNavigator: React.FC<IProps> = props => {
  return (
    <View style={styles.container}>
      {props.state.routes.map((route: any, index: number) => {
        const {options} = props.descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = props.state.index === index;

        const onPress = () => {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          props.navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabItem
            key={`navigation-${index}`}
            title={label}
            active={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
};

export default BottomNavigator;
