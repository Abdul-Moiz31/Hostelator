import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Linking,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <View style={styles.featureCard}>
    <Ionicons name={icon as any} size={32} color="#3498db" />
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);

interface ContactButtonProps {
  icon: string;
  text: string;
  onPress: () => void;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  icon,
  text,
  onPress,
}) => (
  <TouchableOpacity style={styles.contactButton} onPress={onPress}>
    <Ionicons name={icon as any} size={24} color="#ffffff" />
    <Text style={styles.contactButtonText}>{text}</Text>
  </TouchableOpacity>
);

export default function AboutScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ translateY }],
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        }}
        style={styles.headerBackground}
      >
        <LinearGradient
          colors={["rgba(52, 152, 219, 0.8)", "rgba(41, 128, 185, 0.8)"]}
          style={styles.gradient}
        >
          <Animated.View style={[styles.header, animatedStyle]}>
            <Ionicons
              name="information-circle-outline"
              size={64}
              color="#fff"
            />
            <Text style={styles.headerText}>About Hostelator</Text>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>

      <Animated.View style={[styles.content, animatedStyle]}>
        <View style={styles.section}>
          <Text style={styles.title}>Our Mission</Text>
          <Text style={styles.description}>
            At Hostelator, we're revolutionizing budget travel by connecting
            adventurers with affordable accommodations worldwide. Our platform
            fosters a global community of travelers and hosts, creating
            unforgettable experiences and lifelong connections.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Key Features</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.featureScroll}
          >
            <FeatureCard
              icon="search"
              title="Smart Search"
              description="Find your perfect stay with our advanced filtering system."
            />
            <FeatureCard
              icon="add-circle"
              title="Easy Listing"
              description="List your space in minutes and start hosting global travelers."
            />
            <FeatureCard
              icon="people"
              title="Community"
              description="Connect with fellow travelers and share experiences."
            />
            <FeatureCard
              icon="shield-checkmark"
              title="Secure Booking"
              description="Book with confidence using our secure payment system."
            />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Why Choose Us?</Text>
          <View style={styles.reasonContainer}>
            <Ionicons name="globe-outline" size={24} color="#3498db" />
            <View style={styles.reasonText}>
              <Text style={styles.reasonTitle}>Global Network</Text>
              <Text style={styles.description}>
                Access to hostels and budget accommodations worldwide.
              </Text>
            </View>
          </View>
          <View style={styles.reasonContainer}>
            <Ionicons name="wallet-outline" size={24} color="#3498db" />
            <View style={styles.reasonText}>
              <Text style={styles.reasonTitle}>Best Prices</Text>
              <Text style={styles.description}>
                Competitive rates and exclusive deals for our users.
              </Text>
            </View>
          </View>
          <View style={styles.reasonContainer}>
            <Ionicons name="star-outline" size={24} color="#3498db" />
            <View style={styles.reasonText}>
              <Text style={styles.reasonTitle}>Verified Reviews</Text>
              <Text style={styles.description}>
                Honest feedback from real travelers to help you decide.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Get in Touch</Text>
          <ContactButton
            icon="mail-outline"
            text="Email Us"
            onPress={() => Linking.openURL("mailto:support@hostelator.com")}
          />
          <ContactButton
            icon="call-outline"
            text="Call Us"
            onPress={() => Linking.openURL("tel:+11234567890")}
          />
          <ContactButton
            icon="logo-twitter"
            text="Follow Us"
            onPress={() => Linking.openURL("https://twitter.com/hostelator")}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2023 Hostelator. All rights reserved.
          </Text>
          <TouchableOpacity
            onPress={() => {
              /* Navigate to Privacy Policy */
            }}
          >
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              
            }}
          >
            <Text style={styles.footerLink}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  headerBackground: {
    height: 200,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  featureScroll: {
    marginHorizontal: -20,
  },
  featureCard: {
    width: width * 0.7,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    alignItems: "center",
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3498db",
    marginTop: 8,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  reasonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  reasonText: {
    flex: 1,
    marginLeft: 16,
  },
  reasonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498db",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  contactButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 12,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  footerLink: {
    fontSize: 14,
    color: "#3498db",
    marginBottom: 4,
  },
});
