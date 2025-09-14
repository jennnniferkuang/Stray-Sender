// app/thread.tsx
import Background1 from '@/assets/images/Background1.svg';
import { comebackToThread, getThread, Message } from '@/api/requests';
import TopBar from '@/assets/images/topBar.svg';
import { TextBoxContainer } from '@/components/text-box-container';
import { USER_ID } from '@/context/AppContext';
import { router, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

export default function ThreadScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [loading, setLoading] = React.useState(true);

  const backToHome = () => {
    router.replace('/home');
  }

  React.useEffect(() => {
    if (!id) return;

    const fetchThread = async () => {
      try {
        setLoading(true);
        const threadData = await getThread(parseInt(id));
        setMessages(threadData.messages || []);
      } catch (error) {
        console.error('Error fetching thread:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThread();
  }, [id]);

  const handleComeback = async (messageId: number) => {
    try {
      const response = await comebackToThread(parseInt(id), {
        message_id: messageId,
        sender_id: USER_ID
      });
      
      // Refresh thread data after comeback
      const updatedThread = await getThread(parseInt(id));
      setMessages(updatedThread.messages || []);
    } catch (error) {
      console.error('Error sending comeback:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Background1 width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <TopBar width="100%" style={{ position: 'absolute', top: 25, left: -8 }} />
      
      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {messages.map((message, index) => (
          <View key={message.id} >
            <TextBoxContainer message={message} />
          </View>
        ))}
      </ScrollView>
      <View style = {{position: 'absolute', top: 775}} >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  messagesContainer: {
    flex: 1,
    marginTop: 150, // Space for TopBar
    marginBottom: 100 // Space for TopBar
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  messageWrapper: {
    width: '100%',
    marginBottom: 10,
  },
});