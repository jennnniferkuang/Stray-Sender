import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Button } from 'react-native';

export default function HomeScreen() {

  const router = useRouter();

  const backToLoading = () => {
    router.replace('/loading');
  };

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText style={{ fontSize: 24 }}>Home Screen</ThemedText>
      <Button
        onPress={backToLoading}
        title="Back to Loading"
        color="#e1d520ff"
        accessibilityLabel="Go back to loading screen"
      />
    </ThemedView>
  );
}
