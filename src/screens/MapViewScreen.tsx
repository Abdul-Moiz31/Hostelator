import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Text, Image, TouchableOpacity, TextInput, SafeAreaView, Platform, StatusBar } from "react-native";
import MapView, { UrlTile, Marker, Callout } from "react-native-maps";
import { Ionicons } from '@expo/vector-icons';

export default function MapViewScreen({ navigation, route }) {
  const { address } = route.params;

  const hostles = [
    {
      id: 1,
      name: "Central University Hostel",
      university: "Central University",
      price: 300,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1469&ixlib=rb-4.0.3",
      lat: 30.965420670927035,
      lng: 73.97755113775327,
    },
    {
      id: 2,
      name: "Riverside Student Living",
      university: "Riverside University",
      price: 350,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1626178793926-22b28830aa30?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
      lat: 30.95194997863882,
      lng: 73.99441159542354,
    },
    {
      id: 3,
      name: "Goosia Chowk Hostel",
      university: "Gossia Chowk University",
      price: 280,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1626178793926-22b28830aa30?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
      lat: 31.45163912571877,
      lng: 74.2986629242825,
    },
  ];

  const [location, setLocation] = useState({
    lat: 30.9631954,
    lng: 73.9807183,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const OPENCAGE_API_KEY = "d7af57c0f2814f3cae5f9ddae4a6ba3d";

  const getLocation = async (address:string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPENCAGE_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setLocation({ lat, lng });
      } else {
        setError("Location not found: ");
      }
    } catch (error) {
      setError("Error fetching location");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      getLocation(address);
    }
  }, [address]);

  const handleSearch = () => {
    if (searchTerm) {
      getLocation(searchTerm);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Location..."
            placeholderTextColor="#999"
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <MapView
          style={styles.map}
          region={{
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          customMapStyle={[
            {
              featureType: "poi",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "water",
              stylers: [{ visibility: "on" }],
            },
            {
              featureType: "landscape",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "road",
              stylers: [{ visibility: "on" }],
            },
          ]}
        >
          <UrlTile
            urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
          />
          {hostles.map((hostel) => (
            <Marker
              key={hostel.id}
              coordinate={{ latitude: hostel.lat, longitude: hostel.lng }}
            >
              <View style={styles.customMarker}>
                <Image
                  source={{ uri: hostel.image }}
                  style={styles.markerImage}
                />
              </View>
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <Image
                    source={{ uri: hostel.image }}
                    style={styles.calloutImage}
                  />
                  <View style={styles.calloutTextContainer}>
                    <Text style={styles.calloutTitle}>{hostel.name}</Text>
                    <Text style={styles.calloutPrice}>Price: ${hostel.price}</Text>
                    <Text style={styles.calloutRating}>
                      Rating: {hostel.rating}⭐
                    </Text>
                    <TouchableOpacity
                      style={styles.viewDetailsButton}
                      onPress={() =>  navigation.navigate("HostelDetails", { hostelId: hostel.id })}
                    >
                      <Text style={styles.viewDetailsText}
                      >View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    zIndex: 1,
  },
  backButton: {
    padding: 5,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  map: {
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: 'center',
    marginTop: 20,
  },
  customMarker: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white",
  },
  markerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  calloutContainer: {
    width: 250,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  calloutImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  calloutTextContainer: {
    alignItems: "center",
    width: '100%',
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  calloutPrice: {
    fontSize: 16,
    color: "green",
    marginBottom: 5,
  },
  calloutRating: {
    fontSize: 16,
    color: "orange",
    marginBottom: 10,
  },
  viewDetailsButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});