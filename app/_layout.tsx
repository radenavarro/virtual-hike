import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkThemeColors } from './themes/dark';
import { LightThemeColors } from './themes/light';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
// Dayjs
import customParseFormat from "dayjs/plugin/customParseFormat"
import duration from 'dayjs/plugin/duration';
import dayjs from "dayjs"

dayjs.extend(duration)
dayjs.extend(customParseFormat)

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <ThemeProvider value={colorScheme === 'dark' ? DarkThemeColors : LightThemeColors}>
        <StatusBar backgroundColor={colorScheme === 'dark' ? 'black' : 'white'} style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </RootSiblingParent>
  );
}
