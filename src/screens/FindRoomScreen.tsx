import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import RoomCard from '../components/RoomCard';
import { Room } from '../types';

const dummyRooms: Room[] = [
  {
    id: '1',
    title: 'Cozy Studio in Downtown',
    location: 'New York, NY',
    price: 50,
    image: 'https://example.com/room1.jpg',
  },
  {
    id: '2',
    title: 'Shared Room in Hostel',
    location: 'Los Angeles, CA',
    price: 30,
    image: 'https://example.com/room2.jpg',
  },
  // Add more dummy data as needed
];

export default function FindRoomScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [rooms, setRooms] = useState<Room[]>(dummyRooms);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredRooms = dummyRooms.filter(
      (room) =>
        room.title.toLowerCase().includes(query.toLowerCase()) ||
        room.location.toLowerCase().includes(query.toLowerCase())
    );
    setRooms(filteredRooms);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for rooms..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={rooms}
        renderItem={({ item }) => <RoomCard room={item} onPress={() => {}} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  listContent: {
    padding: 16,
  },
});