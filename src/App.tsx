import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import Loading from './components/molecules/Loading';
import store from './redux/store';
import Router from './router';

function MainApp() {
  const GlobalState: any = useSelector(state => state);
  // LogBox.ignoreLogs(['Setting a timer']);
  LogBox.ignoreAllLogs();
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {GlobalState.loading && <Loading />}
    </>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
