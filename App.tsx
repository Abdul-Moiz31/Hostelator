import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ClerkProvider } from '@clerk/clerk-expo';
import AppNavigator from './src/navigation/AppNavigator';

const CLERK_PUBLISHABLE_KEY = 'your_clerk_publishable_key_here';

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ClerkProvider>
  );
}