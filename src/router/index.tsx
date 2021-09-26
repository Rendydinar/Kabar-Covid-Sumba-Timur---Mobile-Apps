// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ManajemenDataCovidPerkecamatan from 'pages/ManajemenDataCovidPerkecamatan';
import ManajemenDataIsolasi from 'pages/ManajemenDataIsolasi';
import ManajemenDataVaksin from 'pages/ManajemenDataVaksin';
import React from 'react';
import Admin from 'pages/Admin';
import GetStrated from 'pages/GetStarted';
import KabarIsolasi from 'pages/KabarIsolasi';
import KabarVaksin from 'pages/KabarVaksin';
import Login from 'pages/Login';
import MainApp from 'pages/MainApp';
import ManajemenDataCovid from 'pages/ManajemenDataCovid';
import Splash from 'pages/Splash';
import {colors, fonts} from 'utils';
import DaftarDataVaksin from 'pages/DaftarDataVaksin';

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
      <Stack.Screen
        name="ManajemenDataCovid"
        component={ManajemenDataCovid}
        options={{
          headerShown: true,
          title: 'Manajemen Data Covid',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontFamily: fonts.primary[700],
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="ManajemenDataCovidPerkecamatan"
        component={ManajemenDataCovidPerkecamatan}
        options={{
          headerShown: true,
          title: 'Manajemen Data Covid Perkecamatan',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontFamily: fonts.primary[700],
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="ManajemenDataIsolasi"
        component={ManajemenDataIsolasi}
        options={{
          headerShown: true,
          title: 'Manajemen Data Isolasi',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontFamily: fonts.primary[700],
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="ManajemenDataVaksin"
        component={ManajemenDataVaksin}
        options={{
          headerShown: true,
          title: 'Manajemen Data Vaksin',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontFamily: fonts.primary[700],
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="DaftarDataVaksin"
        component={DaftarDataVaksin}
        options={{
          headerShown: true,
          title: 'Daftar Data Vaksin',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontFamily: fonts.primary[700],
            fontSize: 16,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
