import { Stack } from "expo-router";

export default function RootLayout() {
  return ( 
    <Stack>   
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="main" options={{ title: 'Home' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} /> 
      <Stack.Screen name="port" options={{ title: 'Port' }} /> 
    </Stack>
  );
}


