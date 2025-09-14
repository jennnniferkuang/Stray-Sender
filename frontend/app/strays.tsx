import Background1 from '@/assets/images/Background1.svg';
import SendStraysTitle from '@/assets/images/SendStraysTitle.svg';
import StrayInput from '@/components/strayInput';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Button, View } from 'react-native';

export default function Strays() {

    const router = useRouter();

    const backToHome = () => {
      router.replace('/home');
    }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Background1 width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <SendStraysTitle width="100%" style={{ position: 'absolute', top: 100, left: 0, right: 0 }} />
      <View style = {{position: 'absolute', top: 400}} >
        <StrayInput  width="200%" height="100%" ></StrayInput>
      </View>
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
