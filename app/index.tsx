import { StyleSheet, Text, View, Pressable, Image} from 'react-native';

export default function Index() {
    const currentYear = new Date().getFullYear()
  return (
    <View id='home' style={styles.home}>
      <View id='section' style={styles.content}>
        <View style={styles.box}>
        <Text><strong>Mareva</strong></Text>
        <Text style={styles.texto}>Bienvenido a nuestra agencia de viajes,</Text> 
        <Text>podras encontrar paquetes en nuestra seccion de paquetes</Text>
        <Text>y tambien agendar viajes a varios lugares del mundo</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    box: {
        borderStyle: 'solid',
        boxShadow: '',
        fontSize: 25,
        fontWeight: 'bold',
    },

    texto: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center'
    }
})