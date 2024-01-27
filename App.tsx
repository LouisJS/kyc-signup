import 'react-native-gesture-handler';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import RootStack from './src/navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Raleway-ExtraBold': require('./assets/fonts/Raleway-ExtraBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex flex-1" onLayout={onLayoutRootView}>
        <RootStack />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
