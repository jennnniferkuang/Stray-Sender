import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import * as React from 'react';
import { Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function SendStray() {

    const router = useRouter();

    const backToHome = () => {
      router.replace('/home');
    }

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText style={{ fontSize: 24 }}>Send Stray</ThemedText>
      <Button
        onPress={backToHome}
        title="Back to Home"
        color="#e1d520ff"
        accessibilityLabel="Go back to home screen"
      />
    </ThemedView>
  );
}