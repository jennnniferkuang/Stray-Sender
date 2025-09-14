import { createThread } from '@/api/requests';
import { USER_ID } from '@/context/AppContext';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

async function postStray(recipientId: number, content: string) {
  try {
    const payload = {
      sender_id: USER_ID,
      recipient_id: recipientId,
      content: content
    };
    
    await createThread(payload);
    // Navigate back to home after successful post
    router.replace('/home');
  } catch (error) {
    console.error('Error posting stray:', error);
    // You might want to show an error message to the user
  }
}

export default function StrayInput() {
  const [text, onChangeText] = useState('');
  const [number, onChangeNumber] = useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView>
      <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          onChangeNumberSend = {onChangeNumber}
          value={number}
          placeholder="Recipient ID:"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder="Enter Stray:"
          value={text}
        />
       
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

