

import { Stack } from 'expo-router';
import LoadingScreen from './loading';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LoadingScreen />
    </>
  );
}