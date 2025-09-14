import { getLeaderboard, Message } from '@/api/requests';
import Background1 from '@/assets/images/Background1.svg';
import LeaderboardTitle from '@/assets/images/LeaderboardTitle.svg';
import { TextBoxContainer } from '@/components/text-box-container';
import { ThemedText } from '@/components/themed-text';
import { USER_ID } from '@/context/AppContext';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Button, View } from 'react-native';

export default function Leaderboard() {

    let [leaderboard, setFeed] = React.useState<Message[] | null>(null);
  
    React.useEffect(() => {
      getLeaderboard(USER_ID)
        .then(setFeed)
        .catch(console.error);
    }, []);

    const router = useRouter();

    const backToHome = () => {
      router.replace('/home');
    }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Background1 width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <LeaderboardTitle width="100%" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      {leaderboard &&
        leaderboard.map((item, index) => (
          <View key={item.id} style={{position: 'absolute', top: 200 + (index * 175), right: 30}}>
            <TextBoxContainer sender={item.sender_username} message={item.content} width={350} />
            <ThemedText style={{ position: 'absolute', top: 25, left: 25, fontWeight: 'bold', color: 'black', fontSize: 25 }}>{index + 1}</ThemedText>
          </View>
        ))
      }
     <View style = {{position: 'absolute', top: 750}} >
      <Button
          onPress={backToHome}
          title="Back to Home"
          color="white"
          accessibilityLabel="Go back to home screen"
        />
        </View>
    </View>
     



  );
}