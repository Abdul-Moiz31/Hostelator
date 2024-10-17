import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FeatureCard from '../components/FeatureCard';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>About Hostel Locator</Text>
        <Text style={styles.description}>
          Hostel Locator is your go-to app for finding and listing affordable accommodations worldwide. We connect travelers with hosts to create unforgettable experiences.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Our Features</Text>
        <FeatureCard
          icon="search"
          title="Find Rooms"
          description="Easily search and book rooms that fit your budget and preferences."
        />
        <FeatureCard
          icon="add-circle"
          title="List Your Space"
          description="Have a spare room? List it on our platform and start earning!"
        />
        <FeatureCard
          icon="people"
          title="Connect with Travelers"
          description="Meet like-minded individuals from around the world."
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Contact Us</Text>
        <Text style={styles.contactInfo}>Email: support@hostellocator.com</Text>
        <Text style={styles.contactInfo}>Phone: +1 (123) 456-7890</Text>
        <Text style={styles.contactInfo}>Address: 123 Traveler's Lane, Wanderlust City, 12345</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  section: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
});