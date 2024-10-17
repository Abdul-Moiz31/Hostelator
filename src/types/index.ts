export type RootStackParamList = {
    Main: undefined;
    SignUp: undefined;
    SignIn: undefined;
  };
  
  export type MainTabParamList = {
    Home: undefined;
    About: undefined;
    'Find Room': undefined;
    'List Room': undefined;
  };
  
  export interface Room {
    id: string;
    title: string;
    location: string;
    price: number;
    image: string;
  }