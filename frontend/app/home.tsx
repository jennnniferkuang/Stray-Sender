// svgs
import LeaderboardSection from '@/assets/images/LeaderboardSection.svg';
import NewStraysSection from '@/assets/images/NewStraysSection.svg';
import StraysSection from '@/assets/images/StraysSection.svg';
import TopBar from '@/assets/images/topBar.svg';

// other imports
import { getNewFeed, getProfile, Message, Profile } from '@/api/requests';
import { TextBoxContainer } from '@/components/text-box-container';
import { router } from 'expo-router';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { USER_ID } from '@/context/AppContext';

function navigateTo(path: string, event?: any) {
  if (event) event.stopPropagation();
  router.replace(path);
}

export default function HomeScreen() {

  let [feed, setFeed] = React.useState<Message[] | null>(null);
  // const [profile, setProfile] = React.useState<null | Profile>(null);

  React.useEffect(() => {
    getNewFeed(USER_ID)
      .then(setFeed)
      .catch(console.error);
    feed = feed ? feed.slice(0, 3) : null; // only show top 3 messages
  }, []);

  console.log("Feed:", feed);
  // console.log("Profile:", profile);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
    
      <Pressable onPress={(event) => navigateTo('/leaderboard', event)}>
        <LeaderboardSection width="100%" style={{ position: 'absolute', top: -140, right: 0 }} />
      </Pressable>
       
      <Pressable onPress={(event) => navigateTo('/strays', event)}>
        <StraysSection width="100%" style={{ position: 'absolute', top: -270, right: 0 }} />
      </Pressable>

      <NewStraysSection width="100%" style={{ position: 'absolute', top: -30 }}/> 

      <TopBar width="100%" style={{ position: 'absolute', top: 25, left: -8}} /> 

      {feed &&
        feed.map((item, index) => (
          <View key={item.id} style={{position: 'absolute', top: 200 + (index * 120), right: 30}}>
            <TextBoxContainer sender={item.sender_username} message={item.content} width={350} />
          </View>
        ))
      }
      {/* <View style={{position: 'absolute', top: 200, right: 30}}>
        <TextBoxContainer sender="user" message="Hello, world!" width={350} />
      </View>
      <View style={{position: 'absolute', top: 320, right: 30}}>
        <TextBoxContainer sender="user" message="Hello, world!" width={350} />
      </View>
      <View style={{position: 'absolute', top: 440, right: 30}}>
        <TextBoxContainer sender="user" message="Hello, world!" width={350} />
      </View> */}
    </View>
  );
}