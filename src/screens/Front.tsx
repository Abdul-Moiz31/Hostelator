import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;
  const navigation = useNavigation<any>();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStartedPress = () => {
    navigation.navigate("Main");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      }}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={["rgba(0, 198, 255, 0.8)", "rgba(0, 114, 255, 0.8)"]}
        style={styles.container}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
            },
          ]}
        >
          <View style={styles.logoContainer}>
            <Ionicons name="bed-outline" size={80} color="#ffffff" />
          </View>
          <Text style={styles.logoText}>Hostelator</Text>
          <Text style={styles.taglineText}>Your Dream Stay Starts Here</Text>

          <TouchableOpacity
            onPress={handleGetStartedPress}
            style={styles.button}
          >
            <LinearGradient
              colors={["#ffffff", "#f0f0f0"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonBackground}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <Ionicons
                name="arrow-forward"
                size={24}
                color="#0072ff"
                style={styles.buttonIcon}
              />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    width: "80%",
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 48,
    color: "#ffffff",
    fontWeight: "bold",
    fontFamily: "Georgia",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  taglineText: {
    fontSize: 20,
    color: "#ffffff",
    marginBottom: 40,
    textAlign: "center",
    fontStyle: "italic",
    fontFamily: "Georgia",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  button: {
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    overflow: "hidden",
  },
  buttonBackground: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: "#0072ff",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
});
