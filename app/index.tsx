import React from 'react';
import { useRouter } from 'expo-router';
import { YStack, Button, H1 } from 'tamagui';
import SvgLogo from '../assets/lalalandf'; // Adjust the path as needed

export default function LandingPage() {
  const router = useRouter();

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding="$4"
      backgroundColor="$background">
      <H1 marginBottom="$4">Welcome to</H1>
      <SvgLogo width={300} height={150} style={{ marginBottom: 16, borderRadius: 4 }} />
      <Button
        size="$5"
        width={300}
        onPress={() => router.push('/Authentication/sing-in')}
        // onPress={() => router.push('/Home/Home')}
        backgroundColor="#0F3058" 
        color="#FFFFFF"
        fontSize="$7" 
        fontWeight="bold" 
        borderRadius="$4"
        pressStyle={{
          backgroundColor: '#0D3868', // Darker blue on press
        }}>
        Apply
      </Button>
    </YStack>
  );
}
