// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Admin from '../pages/Admin';
import GetStrated from '../pages/GetStarted';
import KabarIsolasi from '../pages/KabarIsolasi';
import KabarVaksin from '../pages/KabarVaksin';
import Login from '../pages/Login';
import MainApp from '../pages/MainApp';
import Splash from '../pages/Splash';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const MainApp = () => {
//   return (
//     <Tab.Navigator tabBar={(props: any) => <BottomNavigator {...props} />}>
//       <Tab.Screen name="Doctor" component={Doctor} />
//       <Tab.Screen name="Messages" component={Messages} />
//       <Tab.Screen name="Hospitals" component={Hospitals} />
//     </Tab.Navigator>
//   );
// };

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStrated}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="Admin"
        component={Admin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="KabarIsolasi"
        component={KabarIsolasi}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="KabarVaksin"
        component={KabarVaksin}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
