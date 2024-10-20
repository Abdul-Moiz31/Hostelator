import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import AboutScreen from "../screens/AboutScreen";
import Front from "../screens/Front";
import FindRoomScreen from "../screens/FindHostelScreen";
import MapViewScreen from "../screens/MapViewScreen";
import { RootStackParamList, MainTabParamList } from "../types";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

interface CustomHeaderProps {
  title: string;
  navigation: any;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Ionicons name="person-circle-outline" size={24} color="#3498db" />
      </TouchableOpacity>
    </View>
  );
};

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import HostelDetailsScreen from "../screens/HostleDetailsScreen";
import DashboardScreen from "../screens/DashboardScreen";
import DashboardStack from "./DashboardStack";
import FindHostelScreen from "../screens/FindHostelScreen";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      intensity={100}
      style={[styles.tabBar, { paddingBottom: insets.bottom }]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName: keyof typeof Ionicons.glyphMap;
        if (route.name === "Home") {
          iconName = isFocused ? "home" : "home-outline";
        } else if (route.name === "About") {
          iconName = isFocused
            ? "information-circle"
            : "information-circle-outline";
        } else if (route.name === "Find Room") {
          iconName = isFocused ? "search" : "search-outline";
        } else if (route.name === "List Room") {
          iconName = isFocused ? "add-circle" : "add-circle-outline";
        } else {
          iconName = "help-circle-outline";
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? "#3498db" : "#8e8e93"}
            />
            <Text
              style={[
                styles.tabLabel,
                { color: isFocused ? "#3498db" : "#8e8e93" },
              ]}
            >
              {typeof label === "string" ? label : ""}
            </Text>
          </TouchableOpacity>
        );
      })}
    </BlurView>
  );
};

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Find Hostel" component={FindHostelScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      
      {/* <Tab.Screen name="Front" component={Front} /> */}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "#f0f0f0" },
        headerShown: false,
      }}
    >
      {/* Splash Screen */}
      <Stack.Screen
        name="Front"
        component={Front}
        options={{ headerShown: false }}
      />

      {/* Main Tabs */}
      <Stack.Screen
        name="Main"
        component={MainTabs}
        options={{ headerShown: false }}
      />

      {/* Sign Up Screen */}
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerTitle: "Create Account",
          headerBackTitle: "Back",
        }}
      />

      {/* Sign In Screen */}
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerTitle: "Sign In",
          headerBackTitle: "Back",
        }}
      />

      {/* Map Screen */}
      <Stack.Screen
        name="Map"
        component={MapViewScreen}
        options={{
          header: ({ navigation }) => (
            <CustomHeader title="Map" navigation={navigation} />
          ),
        }}
      />

      {/* Hostel Details Screen */}
      <Stack.Screen
        name="HostelDetails"
        component={HostelDetailsScreen}
        options={{
          header: ({ navigation }) => (
            <CustomHeader title="Hostel Details" navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  headerButton: {
    padding: 8,
  },
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor:
      Platform.OS === "ios" ? "rgba(255, 255, 255, 0.8)" : "white",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});
