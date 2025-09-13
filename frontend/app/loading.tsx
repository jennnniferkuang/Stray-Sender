import Background1 from '@/assets/images/Background1.svg';
import Title from '@/assets/images/Title.svg';
import * as React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoadingScreen() {
  
  const router = useRouter();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Background1 width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <Title width="100%"/>
    </View>
  );
}