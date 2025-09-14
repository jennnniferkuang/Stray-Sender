// svgs
import NewStraysSection from '@/assets/images/NewStraysSection.svg';
import TopBar from '@/assets/images/topBar.svg';
import LeaderboardSection from '@/assets/images/LeaderboardSection.svg';
import StraysSection from '@/assets/images/StraysSection.svg';

// other imports
import { useRouter } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { Pressable } from 'react-native';
import { TextBoxContainer } from '@/components/text-box-container';

export default function HomeScreen() {

  const router = useRouter();

  const sendStray = (event: any) => {
    event.stopPropagation();
    router.replace('/send-stray');
  };

  const goToLeaderboard = (event: any) => {
    event.stopPropagation();
    router.replace('/leaderboard');
  };

  const goToHaters = (event: any) => {
    event.stopPropagation();
    router.replace('/haters');
  };

  const goToStrays = (event: any) => {
    event.stopPropagation();
    router.replace('/strays');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>

      {/* <Pressable onPress={goToHaters}>
        <HatersSection width="100%" style={{ position: 'absolute', top: -250, right: 0 }} />
      </Pressable> */}
      <Pressable onPress={goToLeaderboard}>
        <LeaderboardSection width="100%" style={{ position: 'absolute', top: -140, right: 0 }} />
      </Pressable>
      <Pressable onPress={goToStrays}>
        <StraysSection width="100%" style={{ position: 'absolute', top: -270, right: 0 }} />
      </Pressable>
      <NewStraysSection width="100%" style={{ position: 'absolute', top: -30 }}/> 
      <TopBar width="100%" style={{ position: 'absolute', top: 25, left: -8}} /> 
       {/* <Pressable onPress={sendStray}>
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
