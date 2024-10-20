export type RootStackParamList = {
  Main: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Front: undefined;
  HostelDetails: { hostelId: string };
  UniversityDetails: { universityId: string };
  Map: { address?: string };
  HostleDetails: { hostelId: string };
  Dashboard: undefined;
  EditedHostel: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  About: undefined;
  "Find Hostel": undefined;
  "List Room": undefined;
  Dashboard: undefined;
  Front: undefined;
  Map: { address?: string };
  HostleDetails: { hostelId: string };
};

export interface Room {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}
