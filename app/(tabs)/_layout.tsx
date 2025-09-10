<<<<<<< HEAD
import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
=======
import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';

>>>>>>> f88d7758ce5c279dd2d7542a2e6819d468d688a8

export default function TabLayout() {
  return (
    <Tabs
<<<<<<< HEAD
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
=======
    screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
>>>>>>> f88d7758ce5c279dd2d7542a2e6819d468d688a8
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
<<<<<<< HEAD
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
=======
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
>>>>>>> f88d7758ce5c279dd2d7542a2e6819d468d688a8
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
<<<<<<< HEAD
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account-box" : "account-box-outline"}
              color={color}
              size={24}
            />
=======
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
>>>>>>> f88d7758ce5c279dd2d7542a2e6819d468d688a8
          ),
        }}
      />
    </Tabs>
  );
}
