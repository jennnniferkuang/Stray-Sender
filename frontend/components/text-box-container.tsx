import TextBox from '@/assets/images/textBoxes.svg';
import { NumberProp } from 'react-native-svg';

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
      <TextBox width={width} />
  );
}
