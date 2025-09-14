// svgs
import NewStraysSection from '@/assets/images/NewStraysSection.svg';
import TopBar from '@/assets/images/topBar.svg';
import SendButton from '@/assets/images/sendButton.svg';
import LeaderboardSection from '@/assets/images/LeaderboardSection.svg';
import HatersSection from '@/assets/images/HatersSection.svg';
import StraysSection from '@/assets/images/StraysSection.svg';

// other imports
import { router } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { Pressable } from 'react-native';
import { TextBoxContainer } from '@/components/text-box-container';

function navigateTo(path: string, event?: any) {
  if (event) event.stopPropagation();
  router.replace(path);
}

export default function HomeScreen() {

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Pressable onPress={(event) => navigateTo('/strays', event)}>
        <StraysSection width="100%" style={{ position: 'absolute', top: -160, right: 0 }} />
      </Pressable>
      <Pressable onPress={(event) => navigateTo('/haters', event)}>
        <HatersSection width="100%" style={{ position: 'absolute', top: -250, right: 0 }} />
      </Pressable>
      <Pressable onPress={(event) => navigateTo('/leaderboard', event)}>
        <LeaderboardSection width="100%" style={{ position: 'absolute', top: -375, right: 0 }} />
      </Pressable>
      <NewStraysSection width="100%" style={{ position: 'absolute', top: -30 }}/> 
      <TopBar width="100%" style={{ position: 'absolute', top: 25, left: -8}} /> 
       <Pressable onPress={(event) => navigateTo('/send-stray', event)}>
        <SendButton style={{ alignSelf: 'center', position: 'absolute', top: -20 }} />
      </Pressable>
      <View style={{position: 'absolute', top: 100}}>
        <TextBoxContainer sender="user" message="Hello, world!" width={350} />
      </View>
    </View>
  );
}
