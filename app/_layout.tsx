import { StyleSheet, Text, View } from 'react-native';
import NavBar from '../src/components/NavBar';
import Footer from '../src/components/Footer';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
      <>
        <NavBar />
        <Stack 
          screenOptions={{
                headerShown: false,
            }}
        >

          <Stack.Screen
            name="index"
            options = {{
              title: "inicio"
            }}
          />

          <Stack.Screen
            name="paquetes"
            options = {{
              title: "paquetes"
            }}
          />

        </Stack>
        <Footer />
      </>
  );
}


