import { StyleSheet, Text, View, FlatList, Button ,ActivityIndicator} from 'react-native';
import React, { useCallback, useState } from 'react';
import { Link } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import PaqueteCard from '../src/components/PaqueteCard';

type Paquete = {
  Id_paquete: number;
  nombre: string;
  slug: string;
};

export default function PaquetesScreen() {

  const [paquetes, setPaquetes] = useState<Paquete[]>([]);
  const [cargando, setCargando] = useState(true);

  async function obtenerPaquetes() {
    try {
      const respuestaServidor = await fetch(
          "http://192.168.0.22:5000/api/paquetes"
      )

     
      const datos = await respuestaServidor.json();
      setPaquetes(datos);
     } catch (error) {
      console.error("Error al obtener paquetes:", error)
     } finally {
      setCargando(false)
     }
  }

  async function EliminarPaquete(id: number) {
    try {
      const respuestaServidor = await fetch(
          `http://192.168.0.22:5000/api/paquetes/${id}`, {
            method: 'DELETE',
      });

     
      setPaquetes((prev) => prev.filter((p) => p.Id_paquete !== id))
     } catch (error) {
      console.error("Error al obtener o eliminar la informacion de paquetes:", error)
     } 
  }

  useFocusEffect(
    useCallback(() => {
      obtenerPaquetes();
    }, [])
  );

  if (cargando) {
    return (
      <View style={styles.carga}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.contenedorPadre}>
      <View style={styles.title}>
        <Text>Lista de paquetes</Text>
      </View>
      <Link href="/crear" asChild>
        <Button title="Crear paquete" onPress={() => {}} />
      </Link>
      <FlatList
      data={paquetes}
      keyExtractor={(item) => item.Id_paquete.toString()} 
      contentContainerStyle={styles.GridCards}
      renderItem={({ item }) => (
        <PaqueteCard
          id = {item.Id_paquete}
          nombre = {item.nombre}
          slug = {item.slug}
          onEliminar={() => EliminarPaquete(item.Id_paquete)}
          />
      )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carga: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  contenedorPadre: {
    flex: 1,
    alignItems: 'center'
  },

  GridCards: {
    padding: 30,
    gap: 15,
    alignItems: 'center'
  },

  title: {
    justifyContent: 'center',
    alignItems: 'center' ,
    fontSize: 24,
    fontWeight: 'bold' 
  }
})

