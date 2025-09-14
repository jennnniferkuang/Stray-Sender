import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'p5hatty': require('@/assets/fonts/p5hatty.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="loading" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="leaderboard" options={{ headerShown: false }} />
        <Stack.Screen name="strays" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}