import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import DashboardScreen from '../screens/DashboardScreen';
import ViewHostelsScreen from '../screens/ViewHostelsScreen';
import AddHostelScreen from '../screens/AddHostelScreen';
import EditHostelScreen from '../screens/EditHostelScreen';

const Stack = createStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 16 }}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="DashboardMain"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Stack.Screen
        name="ViewHostels"
        component={ViewHostelsScreen}
        options={{ title: 'Your Hostels' }}
      />
      <Stack.Screen
        name="AddHostel"
        component={AddHostelScreen}
        options={{ title: 'Add New Hostel' }}
      />
      <Stack.Screen
        name="EditHostel"
        component={EditHostelScreen}
        options={{ title: 'Edit Hostel' }}
      />
    </Stack.Navigator>
  );
}