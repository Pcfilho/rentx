import React, { useCallback, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';
import * as SplashScreen from 'expo-splash-screen';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

import theme from './src/styles/theme';

import { Routes } from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from './src/hooks';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  useEffect(() => {
    if (fontsLoaded) {
      console.log("Fonts loaded");
      setAppIsReady(true);
    }
  }, [fontsLoaded]);


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log("App is ready");
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if(!appIsReady) {
    return null;
  }
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}