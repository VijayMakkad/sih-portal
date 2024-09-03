import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { YStack, Input, Label, Button, H1, Paragraph, XStack, Text, View } from 'tamagui';
import { supabase } from '../../utils/supabase';
import { Image, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import SvgLogo1 from '../../assets/namaste-svgrepo-com'; // Adjust the path as needed

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      router.replace('/Home/Home');
    }
  };

  const handleSignUpAlert = () => {
    alert('Please visit the official website to sign up.');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <YStack flex={1} padding="$4" justifyContent="center" backgroundColor="$background">
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
            <SvgLogo1
              width={350}
              height={150}
              style={{ borderRadius: 4 }}
            />
          </View>

          <H1 marginBottom="$4" textAlign="center">
            Sign In
          </H1>
          <Label>Email</Label>
          <Input
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            marginBottom="$3"
          />
          <Label>Password</Label>
          <Input
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            marginBottom="$4"
          />
          <Button
            onPress={handleSignIn}
            size="$4"
            backgroundColor="#0F3058"
            color="#FFFFFF"
            fontSize="$7"
            fontWeight="bold"
            borderRadius="$4"
            pressStyle={{
              backgroundColor: '#0D3868', // Darker blue on press
            }}
          >
            Sign In
          </Button>
          <XStack justifyContent="center" alignItems="center" marginTop="$4">
            <Paragraph>Don't have an account?</Paragraph>
            <Text
              onPress={handleSignUpAlert}
              color="$blue11"
              marginLeft="$1"
              fontWeight="bold"
              textDecorationLine="underline"
            >
              Sign Up
            </Text>
          </XStack>
        </YStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
