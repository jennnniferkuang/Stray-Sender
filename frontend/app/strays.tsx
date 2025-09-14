import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import * as React from 'react';
import { Button, View } from 'react-native';
import { useRouter } from 'expo-router';
import Background1 from '@/assets/images/Background1.svg';
import StrayInput from '@/components/strayInput';
export default function Strays() {

    const router = useRouter();

    const backToHome = () => {
      router.replace('/home');
    }

  return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<Background1 width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
<View style = {{position: 'absolute', top: 400}} >
<StrayInput  width="200%" height="100%" ></StrayInput>
</View>
{/* <View style = {{position: 'absolute', top: 620}} >
    <Button
        onPress={void(0)}
        title="Send"
        color="#e1d520ff"
   
      />
      </View> */}
<View style = {{position: 'absolute', top: 820}} >
      <Button
          onPress={backToHome}
          title="Back to Home"
          color="#e1d520ff"
          accessibilityLabel="Go back to home screen"
        />
        </View>
    </View>
     

  
  );
}
