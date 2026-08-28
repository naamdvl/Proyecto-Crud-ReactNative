import { StyleSheet, Text, View, Button} from 'react-native';
import { Link } from 'expo-router';

export default function PaqueteCard(props: { id: number ,nombre: string, slug:string, onEliminar: () => void;}) {
    return (
        <View style={styles.Card}>
            <Text>{props.nombre}</Text>
            <Text>{props.slug}</Text>
            <Link href={`/editar?id=${props.id}`} asChild>
              <Button title="Editar" onPress={() => {}} />
            </Link>
            <Button title="Eliminar" onPress={props.onEliminar} />
        </View>
    )
}

const styles = StyleSheet.create({
  Card: {
    borderRadius: 10,
    boxShadow: 'solid',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: 250,
  }  
})