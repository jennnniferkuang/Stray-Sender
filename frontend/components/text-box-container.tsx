import TextBox from '@/assets/images/textBoxes.svg';
import Fire from '@/assets/images/fire.svg';
import Tomato from '@/assets/images/tomato.svg';
import { NumberProp } from 'react-native-svg';
import { View } from 'react-native';
import { ThemedText } from './themed-text';

export function TextBoxContainer({
  sender,
  message,
  width

}: {
  sender: string;
  message: string;
  width: NumberProp | undefined
}) {
  return (

  
    <View>
      <TextBox width={width} />
      <Fire width = "15%" style={{position: 'absolute', top: 90, right: 150, zIndex: 1}}/>
      <Tomato width ="15%" style={{position: 'absolute', top: 90, right: 90, zIndex: 1}}/>
      <ThemedText style={{ color: 'black', position: 'absolute', top: 120, left: 5, fontSize: 18, fontWeight: 'bold' }}>
        {sender}
      </ThemedText>
      <ThemedText style={{
        color: 'black',
        position: 'absolute',
        top: 40,
        left: 150,
        fontSize: 18,
        flexWrap: 'wrap',
        width: '50%'
      }}>
        {message.length > 50 ? `${message.substring(0, 50)}...` : message}
      </ThemedText>
    </View>
  );
}
