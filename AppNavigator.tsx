import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AuthScreen from './AuthScreen';
import MainMenuScreen from './MainMenu';
import OrganizerScreen from './OrganizerScreen';
import ProfileScreen from './ProfileScreen';
import RoleSelectionScreen from './RoleSelectionScreen';
import WelcomeScreen from './WelcomeScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Organizer" component={OrganizerScreen} />
      <Stack.Screen name="MainMenu" component={MainMenuScreen} />
      

    </Stack.Navigator>
  );
}
<Stack.Navigator
  screenOptions={{
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: 'horizontal',
  }}
>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
    <Stack.Screen name="Auth" component={AuthScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Organizer" component={OrganizerScreen} />
    <Stack.Screen name="MainMenu" component={MainMenuScreen} />
</Stack.Navigator>