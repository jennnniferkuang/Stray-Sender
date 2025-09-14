import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, View } from 'react-native';
export default function StrayInput() {
  const [text, onChangeText] = useState('');
  const [number, onChangeNumber] = useState('');
  const [number2, onChangeNumberSend] = useState('');

  const router = useRouter();

  const backToHome = () => {
    router.replace('/home');
  }

  return (

    <SafeAreaProvider>
      <SafeAreaView>
{/* 
      <View style = {{position: 'absolute', top: 620}} >
    <Button
        onPress={void(0)}
        title="Send"
        color="#e1d520ff"
   
      />
      </View> */}
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
    backgroundColor: "black"
  },
});

