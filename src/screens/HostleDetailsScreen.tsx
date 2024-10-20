import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Hardcoded data (to be replaced with MongoDB data later)
const hostelData = {
  id: 1,
  title: "Cozy Student Haven",
  description: "A comfortable and affordable hostel for students, located near major universities.",
  price: 300,
  banner_img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1469&ixlib=rb-4.0.3",
  image: [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1469&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1626178793926-22b28830aa30?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1626178793926-22b28830aa30?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
  ],
  Features: ["Free Wi-Fi", "24/7 Security", "Laundry Facilities", "Study Rooms", "Communal Kitchen"],
  IsSecuirtyReq: "Yes",
  security: "24/7 CCTV surveillance and security personnel",
  contactInfo: "+1 (555) 123-4567",
  under_zone: "University District"
};

export default function HostelDetailsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Banner Image */}
        <Image source={{ uri: hostelData.banner_img }} style={styles.bannerImage} />
        
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Title and Price */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{hostelData.title}</Text>
          <Text style={styles.price}>${hostelData.price}/month</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{hostelData.description}</Text>

        {/* Features */}
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresContainer}>
          {hostelData.Features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Security */}
        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.securityContainer}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#2196F3" />
          <Text style={styles.securityText}>{hostelData.security}</Text>
        </View>

        {/* Contact Info */}
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.contactContainer}>
          <Ionicons name="call-outline" size={24} color="#FF9800" />
          <Text style={styles.contactText}>{hostelData.contactInfo}</Text>
        </View>

        {/* Zone */}
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.zoneContainer}>
          <Ionicons name="location-outline" size={24} color="#E91E63" />
          <Text style={styles.zoneText}>{hostelData.under_zone}</Text>
        </View>

        {/* Image Gallery */}
        <Text style={styles.sectionTitle}>Gallery</Text>
        <FlatList
          data={hostelData.image}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.galleryImage} />
          )}
          contentContainerStyle={styles.galleryContainer}
        />

        {/* Book Now Button */}
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  headerContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  description: {
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    paddingHorizontal: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  securityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  securityText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  zoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  zoneText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  galleryContainer: {
    paddingHorizontal: 20,
  },
  galleryImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  bookButton: {
    backgroundColor: '#2196F3',
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});