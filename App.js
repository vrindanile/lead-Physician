

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, LogBox
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './src/Navigation/AuthStack';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const App = () => {
  LogBox.ignoreAllLogs()
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#ADC430', borderColor: '#ADC430', borderWidth: 1, height: 55, width: '90%' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 12,
          fontWeight: '400'

        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 12
        }}
        text2Style={{
          fontSize: 12
        }}
      />
    ),
  };
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  React.useEffect(() => {
    // Check if user is logged in
    // Set isLoggedIn accordingly
  }, []);
  //const Stack = createNativeStackNavigator();
  return (
    // <Splash></Splash> <Provider store={store}>
    // <Provider store={store}>
    <NavigationContainer>
      <AuthStack />
      <Toast config={toastConfig} />
      {/* <MainContainer /> */}
    </NavigationContainer>
    // </Provider>

  );
};

const styles = StyleSheet.create({

});

export default App;
