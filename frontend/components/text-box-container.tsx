import Fire from '@/assets/images/fire.svg';
import TextBox from '@/assets/images/textBoxes.svg';
import Tomato from '@/assets/images/tomato.svg';
import { Pressable, View } from 'react-native';
import { ThemedText } from './themed-text';
import { USER_ID } from '@/context/AppContext';
import { Message } from '@/api/requests';
import { router } from 'expo-router';

function openThread(threadID: number, event?: any) {
  if (event) event.stopPropagation();
  router.push(`/thread/${threadID}`);
}

export function TextBoxContainer({
  message
}: {
  message: Message;
}) {
  const senderID = message.sender;
  const sender = message.sender_username;
  const messageID = message.id;
  const content = message.content;
  const isCurrentUser = senderID === USER_ID;

  return (
    <Pressable onPress={(event) => openThread(message.thread, event)}>
      <TextBox 
        width={350} 
        style={{ 
          transform: [{ scaleX: isCurrentUser ? -1 : 1 }] 
        }} 
      />
      <Fire 
        width="15%" 
        style={{
          position: 'absolute',
          top: 90,
          ...(isCurrentUser ? { left: 150 } : { right: 150 })
        }}
      />
      <ThemedText style={{ 
        color: 'black',
        position: 'absolute', 
        top: 100, ...(isCurrentUser ? { right: 160 } : { left: 180 }) }}>
        {message.upvotes}
      </ThemedText>
      <Tomato 
        width="15%" 
        style={{
          position: 'absolute',
          top: 90,
          ...(isCurrentUser ? { left: 90 } : { right: 90 })
        }}
      />
      <ThemedText style={{ 
        color: 'black',
        position: 'absolute', 
        top: 100, ...(isCurrentUser ? { left: 125 } : { right: 100 }) }}>
        {message.downvotes}
      </ThemedText>
      <ThemedText 
        style={{
          color: 'black',
          position: 'absolute',
          top: 115,
          ...(isCurrentUser ? { right: 5 } : { left: 5 }),
          fontSize: 18,
          fontWeight: 'bold'
        }}
      >
        {sender}
      </ThemedText>
      <ThemedText 
        style={{
          color: 'black',
          position: 'absolute',
          top: 40,
          ...(isCurrentUser ? { right: 150 } : { left: 150 }),
          fontSize: 18,
          flexWrap: 'wrap',
          width: '50%',
          textAlign: isCurrentUser ? 'right' : 'left'
        }}
      >
        {content.length > 50 ? `${content.substring(0, 50)}...` : content}
      </ThemedText>
    </Pressable>
  );
}