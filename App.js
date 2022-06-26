import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors, nf } from './constants/constants'
import { store } from './store/configureStore'
import RootStack from '../src/routing/RootStack'
import SplashScreen from 'react-native-splash-screen'
import StudentAccount from './components/studentAccount/StudentAccount'


global.ErrorUtils.setGlobalHandler(function (error) {
  if (error) {
    // crashlytics().recordError(new Error(error));
  }
});



const App = () => {

  useEffect(() => {
    SplashScreen.hide()

  }, [])
  return (
    <SafeAreaProvider style={{ backgroundColor: Colors.white }}>
      <StatusBar barStyle="light-content" backgroundColor='transparent' translucent={true} />
      <Provider store={store} >
        <RootStack />
      
      </Provider>
    </SafeAreaProvider>
  )

}

export default App;
