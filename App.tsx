import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/utils/constants';
import { AppProvider } from './src/context/AppContext';

function App() {

  return (
    <NavigationContainer>
      <AppProvider>
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        <AppNavigator />
      </AppProvider>
    </NavigationContainer>
  );
}

export default App;
