// svgs
import NewStraysSection from '@/assets/images/NewStraysSection.svg';
import TopBar from '@/assets/images/topBar.svg';
import LeaderboardSection from '@/assets/images/LeaderboardSection.svg';
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
      <Pressable onPress={goToStrays}>
        <StraysSection width="100%" style={{ position: 'absolute', top: -160, right: 0 }} />
      </Pressable>
      <Pressable onPress={goToHaters}>
        <HatersSection width="100%" style={{ position: 'absolute', top: -250, right: 0 }} />
      </Pressable>
      <Pressable onPress={goToLeaderboard}>
        <LeaderboardSection width="100%" style={{ position: 'absolute', top: -375, right: 0 }} />
      </Pressable>
      <NewStraysSection width="100%" style={{ position: 'absolute', top: -30 }}/> 
      <TopBar width="100%" style={{ position: 'absolute', top: 25, left: -8}} /> 
       <Pressable onPress={sendStray}>
        <SendButton style={{ alignSelf: 'center', position: 'absolute', top: -20 }} />
      </Pressable> */}
      <View style={{position: 'absolute', top: 210, right: 30, }}>      
        <TextBoxContainer sender="user" message="Hello, world!" width={350} /> 
      </View>
      <View style={{position: 'absolute', top: 330, right: 30, }}>      
        <TextBoxContainer sender="user" message="Hello, world!" width={350} /> 
      </View>
      <View style={{position: 'absolute', top: 450, right: 30, }}>      
        <TextBoxContainer sender="user" message="Hello, world!" width={350} /> 
      </View>
    </View>
  );
}
