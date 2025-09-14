// svgs
import NewStraysSection from '@/assets/images/NewStraysSection.svg';
import TopBar from '@/assets/images/topBar.svg';
import SendButton from '@/assets/images/sendButton.svg';
import LeaderboardSection from '@/assets/images/LeaderboardSection.svg';
// other imports
import { useRouter } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { Pressable } from 'react-native';

export default function HomeScreen() {

  const router = useRouter();

  const backToLoading = () => {
    router.replace('/loading');
  };

  const handlePress = (event: any) => {
    event.stopPropagation();
    router.replace('/send-stray');
  };

  return (
    <View style={{ justifyContent: 'center' }}>
      {/* <ThemedText style={{ fontSize: 24 }}>Home Screen</ThemedText>
      <Button
        onPress={backToLoading}
        title="Back to Loading"
        color="#e1d520ff"
        accessibilityLabel="Go back to loading screen"
      /> */}
      <Pressable onPress={handlePress}>
        <LeaderboardSection style={{ alignSelf: 'center', position: 'absolute', left: -50 }} />
      </Pressable>
      <NewStraysSection width="100%" style={{ position: 'absolute', top: -50 }}/>
      <TopBar width="100%" style={{ position: 'absolute', top: -5 }} />
      <Pressable onPress={handlePress}>
        <SendButton style={{ alignSelf: 'center', position: 'absolute', top: 425 }} />
      </Pressable>
    </View>
  );
}
