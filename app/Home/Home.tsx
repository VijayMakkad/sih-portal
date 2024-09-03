import React, { useEffect, useState } from 'react';
import { YStack, H3, Paragraph, Button, XStack, H2 } from 'tamagui';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

export default function Home() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>('');
  const [userMetaData, setUserMetaData] = useState<any>(null);
  const [currentStatus, setCurrentStatus] = useState<{ color: string; label: string }>({
    color: 'red', // default status color
    label: 'Error', // default status label
  });

  useEffect(() => {
    const getUser = async () => {
      // Retrieve session data
      const { data: { session } } = await supabase.auth.getSession();

      if (session && session.user && typeof session.user.email === 'string') {
        setUserEmail(session.user.email);

        try {
          // Use the Admin API to fetch user data by ID
          const { data, error } = await supabase.auth.admin.getUserById(session.user.id);

          if (error) {
            console.error('Error fetching user metadata:', error.message);
          } else {
            // Log the complete response for debugging
            console.log('User data fetched:', data.user.user_metadata);

            // Access user_metadata from the user object
            setUserMetaData(data.user.user_metadata);

            // Example logic to set the status based on user metadata (you can adjust this as needed)
            if (data.user.user_metadata.account_type === 'admin') {
              setCurrentStatus({ color: 'green', label: 'Admin' });
            } else if (data.user.user_metadata.account_type === 'guest') {
              setCurrentStatus({ color: 'yellow', label: 'Guest' });
            } else {
              setCurrentStatus({ color: 'red', label: 'User' });
            }
          }
        } catch (err) {
          console.error('Unexpected error:', err);
        }
      } else {
        router.replace('/');
      }
    };

    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  return (
    <YStack flex={1} padding="$4" backgroundColor="$background" paddingTop="$10">
      <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
        <YStack>
          <H3>Welcome,</H3>
          <Paragraph>{userEmail}</Paragraph>
        </YStack>
        <Pressable onPress={handleSignOut}>
          <Button size="$4" backgroundColor="$red10" padding="$2" borderRadius="$4">
            Sign Out
          </Button>
        </Pressable>
      </XStack>

      {/* Subtle line for design */}
      <YStack height={9} backgroundColor="$gray10" marginVertical="$5" />
      
      {/* Center-aligned Details heading */}
      <YStack alignItems="center" marginBottom="$6">
        <H2>Details</H2>
      </YStack>

      {/* Left-aligned user metadata */}
      <YStack marginBottom="$4">
        {userMetaData ? (
          <YStack>
            <Paragraph style={{ color: 'white', marginBottom: 4 }}>
              Email: {userMetaData.email || 'null'}
            </Paragraph>
            <Paragraph style={{ color: 'white', marginBottom: 4 }}>
              Email Verified: {userMetaData.email_verified ? 'Yes' : 'No'}
            </Paragraph>
            <Paragraph style={{ color: 'white', marginBottom: 4 }}>
              Phone Verified: {userMetaData.phone_verified ? 'Yes' : 'No'}
            </Paragraph>
            <Paragraph style={{ color: 'white', marginBottom: 4 }}>
              Date of Birth: {userMetaData.dob || 'null'}
            </Paragraph>
            <Paragraph style={{ color: 'white', marginBottom: 4 }}>
              Phone: {userMetaData.phone || 'null'}
            </Paragraph>
            <Paragraph style={{ color: 'white', marginBottom: 4 }}>
              Course: {userMetaData.course || 'null'}
            </Paragraph>
            <Paragraph style={{ color: 'white', marginBottom: 4 }}>
              Gender: {userMetaData.gender || 'null'}
            </Paragraph>
            <Paragraph style={{ color: 'white', marginBottom: 4 }}>
              Address: {userMetaData.address || 'null'}
            </Paragraph>
            <Paragraph style={{ color: 'white', marginBottom: 4 }}>
              Student ID: {userMetaData.studentId || 'null'}
            </Paragraph>
            <Paragraph style={{ color: 'white', marginBottom: 4 }}>
              Student Name: {userMetaData.studentName || 'null'}
            </Paragraph>
            <Paragraph style={{ color: 'white', marginBottom: 4 }}>
              Account Type: {userMetaData.account_type || 'null'}
            </Paragraph>
          </YStack>
        ) : (
          <Paragraph style={{ color: 'white' }}>Loading user data...</Paragraph>
        )}
      </YStack>

      {/* Single Status Circle */}
      <YStack height={9} backgroundColor="$gray10" marginVertical="$5" />
      <YStack  flex={1} flexDirection='row' justifyContent='center'>
      <H3 marginTop='$2'>Status:</H3>
        <View
          style={{
            backgroundColor: currentStatus.color,
            height: 50,
            width: 50,
            borderRadius: 25, // Make it a circle
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 5,
          }}
        >
          <Paragraph style={{ color: 'white' }}></Paragraph>
        </View>
      </YStack>
      <YStack height={9} backgroundColor="$gray10" marginBottom='$12' />
    </YStack>
    
  );
}
