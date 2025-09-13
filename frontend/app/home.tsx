import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import * as React from 'react';
import { PropsWithChildren, ReactElement } from 'react';
import { View, Text } from 'react-native';

// type Props = PropsWithChildren<{
//   headerImage: ReactElement;
//   headerBackgroundColor: { dark: string; light: string };
// }>;

export default function HomeScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText style={{ fontSize: 24 }}>Home Screen</ThemedText>
    </ThemedView>
  );
}
