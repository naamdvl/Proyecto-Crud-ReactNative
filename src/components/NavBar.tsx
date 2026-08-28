import { StyleSheet, Text, View, Pressable} from 'react-native';
import { router } from 'expo-router';

export default function NavBar() {


  return (
    <View id='navbar' style={styles.navbar}>
      <View id='logo'>
        <Text style={styles.logo}>MAREVA</Text>
      </View>
      <View id='menu' style={styles.menu}>
        <Pressable onPress={() => router.push('/')}>
            <Text style={styles.menuItem}>Inicio</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/paquetes')}>
            <Text style={styles.menuItem}>Paquetes</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#901616",
        gap: 50
    },

    menu: {
        flexDirection: 'row',
        gap: 15
    },

    menuItem:{
        fontSize: 24,
        color: '#fff'
    },

    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
    }
})