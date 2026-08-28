import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function EditarPaqueteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [slug, setSlug] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  async function obtenerPaquete() {
    try {
      const respuesta = await fetch(`http://192.168.0.22:5000/api/paquetes/${id}`);
      const datos = await respuesta.json();
      setNombre(datos.nombre);
      setSlug(datos.slug);
    } catch (error) {
      console.error("Error al obtener el paquete:", error);
    } finally {
      setCargando(false);
    }
  }

  async function guardarCambios() {
    setGuardando(true);
    try {
      const respuesta = await fetch(`http://192.168.0.22:5000/api/paquetes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, slug }),
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo actualizar el paquete');
      }

      router.back();
    } catch (error) {
      console.error("Error al actualizar paquete:", error);
      Alert.alert("Error", "No se pudo guardar los cambios");
    } finally {
      setGuardando(false);
    }
  }

  useEffect(() => {
    obtenerPaquete();
  }, [id]);

  if (cargando) {
    return (
      <View style={styles.carga}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre del paquete"
      />

      <Text style={styles.label}>Slug</Text>
      <TextInput
        style={styles.input}
        value={slug}
        onChangeText={setSlug}
        placeholder="slug-del-paquete"
      />

      <Button
        title={guardando ? "Guardando..." : "Guardar cambios"}
        onPress={guardarCambios}
        disabled={guardando}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carga: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedor: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});