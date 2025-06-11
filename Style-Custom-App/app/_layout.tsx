import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { APP_ID } from '@/constants/AdMobConfig';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // Initialize AdMob
    const initializeAdMob = async () => {
      try {
        // Set test device ID for development
        await setTestDeviceIDAsync('EMULATOR');
        console.log('AdMob initialized successfully');
      } catch (error) {
        console.log('Error initializing AdMob:', error);
      }
    };

    initializeAdMob();
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="category" options={{ headerShown: true, title: 'Category' }} />
        <Stack.Screen name="detail" options={{ headerShown: true, title: 'Design Details' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
