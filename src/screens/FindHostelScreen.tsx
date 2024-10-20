import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Room } from "../types";

const { width } = Dimensions.get("window");

const dummyRooms: Room[] = [
  {
    id: "1",
    title: "Cozy Studio in Downtown",
    location: "New York, NY",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "2",
    title: "Shared Room in Trendy Hostel",
    location: "Los Angeles, CA",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    rating: 4.2,
    reviews: 85,
  },
  {
    id: "3",
    title: "Modern Loft near Tech Hub",
    location: "San Francisco, CA",
    price: 75,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.8,
    reviews: 200,
  },
  {
    id: "4",
    title: "Charming Room in Historic District",
    location: "Boston, MA",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    rating: 4.6,
    reviews: 150,
  },
  {
    id: "5",
    title: "Eco-Friendly Dorm Room",
    location: "Portland, OR",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    rating: 4.4,
    reviews: 95,
  },
  {
    id: "6",
    title: "Luxurious Suite with City View",
    location: "Chicago, IL",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.9,
    reviews: 300,
  },
  {
    id: "7",
    title: "Cozy Room in Student House",
    location: "Austin, TX",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    rating: 4.3,
    reviews: 80,
  },
  {
    id: "8",
    title: "Stylish Apartment near Campus",
    location: "Seattle, WA",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    rating: 4.7,
    reviews: 180,
  },
  {
    id: "9",
    title: "Quiet Room in Residential Area",
    location: "Denver, CO",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.5,
    reviews: 110,
  },
  {
    id: "10",
    title: "Beachfront Hostel Room",
    location: "Miami, FL",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    rating: 4.6,
    reviews: 220,
  },
  {
    id: "11",
    title: "Urban Loft in Arts District",
    location: "Nashville, TN",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    rating: 4.8,
    reviews: 190,
  },
  {
    id: "12",
    title: "Cozy Room in Victorian House",
    location: "San Diego, CA",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.4,
    reviews: 130,
  },
  {
    id: "13",
    title: "Modern Studio in Downtown",
    location: "Philadelphia, PA",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    rating: 4.5,
    reviews: 140,
  },
  {
    id: "14",
    title: "Spacious Room with Mountain View",
    location: "Salt Lake City, UT",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    rating: 4.7,
    reviews: 160,
  },
  {
    id: "15",
    title: "Trendy Loft in Warehouse District",
    location: "Minneapolis, MN",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.6,
    reviews: 170,
  },
  {
    id: "16",
    title: "Quaint Room in Historic B&B",
    location: "Charleston, SC",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    rating: 4.8,
    reviews: 200,
  },
  {
    id: "17",
    title: "Modern Dorm Room on Campus",
    location: "Ann Arbor, MI",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    rating: 4.3,
    reviews: 90,
  },
  {
    id: "18",
    title: "Chic Apartment in Fashion District",
    location: "New York, NY",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.9,
    reviews: 250,
  },
  {
    id: "19",
    title: "Rustic Cabin near University",
    location: "Boulder, CO",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "20",
    title: "Sunny Room in Shared Apartment",
    location: "San Francisco, CA",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    rating: 4.4,
    reviews: 110,
  },
];

export default function FindRoomScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [rooms, setRooms] = useState<Room[]>(dummyRooms);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<"price" | "rating">("price");

  useEffect(() => {
    handleSearch(searchQuery);
  }, [sortBy]);

  const handleSearch = (query: string) => {
    setLoading(true);
    setSearchQuery(query);

    setTimeout(() => {
      const filteredRooms = dummyRooms.filter(
        (room) =>
          room.title.toLowerCase().includes(query.toLowerCase()) ||
          room.location.toLowerCase().includes(query.toLowerCase())
      );

      const sortedRooms = filteredRooms.sort((a, b) => {
        if (sortBy === "price") {
          return a.price - b.price;
        } else {
          return b.rating - a.rating;
        }
      });

      setRooms(sortedRooms);
      setLoading(false);
    }, 500);
  };

  const renderRoomCard = ({ item }: { item: Room }) => (
    <TouchableOpacity style={styles.roomCard} onPress={() => {}}>
      <Image source={{ uri: item.image }} style={styles.roomImage} />
      <View style={styles.roomInfo}>
        <Text style={styles.roomTitle}>{item.title}</Text>
        <Text style={styles.roomLocation}>{item.location}</Text>
        <View style={styles.roomDetails}>
          <View style={styles.priceContainer}>
            <Ionicons name="pricetag" size={16} color="#2ecc71" />
            <Text style={styles.priceText}>${item.price}/night</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#f39c12" />
            <Text style={styles.ratingText}>
              {item.rating} ({item.reviews})
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#3498db", "#2980b9"]} style={styles.header}>
        <Text style={styles.headerTitle}>Find Your Perfect Hostel</Text>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={24}
            color="#bdc3c7"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title or location..."
            placeholderTextColor="#bdc3c7"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </LinearGradient>
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortBy === "price" && styles.sortButtonActive,
          ]}
          onPress={() => setSortBy("price")}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortBy === "price" && styles.sortButtonTextActive,
            ]}
          >
            Price
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[
            styles.sortButton,
            sortBy === "rating" && styles.sortButtonActive,
          ]}
          onPress={() => setSortBy("rating")}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortBy === "rating" && styles.sortButtonTextActive,
            ]}
          >
            Rating
          </Text>
        </TouchableOpacity> */}
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
      ) : (
        <FlatList
          data={rooms}
          renderItem={renderRoomCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#34495e",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  sortButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "#f0f0f0",
  },
  sortButtonActive: {
    backgroundColor: "#3498db",
  },
  sortButtonText: {
    fontSize: 14,
    color: "#34495e",
  },
  sortButtonTextActive: {
    color: "#ffffff",
  },
  listContent: {
    padding: 10,
  },
  roomCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  roomImage: {
    width: 120,
    height: 120,
  },
  roomInfo: {
    flex: 1,
    padding: 10,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  roomLocation: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 5,
  },
  roomDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#2ecc71",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#f39c12",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
