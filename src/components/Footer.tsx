import { StyleSheet, Text, View, Pressable} from 'react-native';

export default function Footer() {
    const currentYear = new Date().getFullYear()
  return (
    <View id='footer' style={styles.footer}>
      <Text style={styles.copy}> © {currentYear} Mareva</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    footer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#870a0a',
    },

    copy: {
        fontSize: 24,
        marginVertical: 2,
        color: '#fff'
    }
})