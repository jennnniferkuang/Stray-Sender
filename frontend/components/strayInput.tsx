import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function StrayInput() {
  const [text, onChangeText] = useState('');
  const [number, onChangeNumber] = useState('');

  const [number2, onChangeNumberSend] = useState('');

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

