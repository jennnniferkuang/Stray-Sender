import TextBox from '@/assets/images/textBoxes.svg';
import Fire from '@/assets/images/fire.svg';
import Tomato from '@/assets/images/tomato.svg';
import { NumberProp } from 'react-native-svg';
import { View } from 'react-native';

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
      </View>
  );
}
