import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

export default function CrearPaqueteScreen() {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [slug, setSlug] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [precio, setPrecio] = useState('');

  async function crearPaquete() {
    if (!nombre.trim() || !slug.trim() || !precio.trim()) {
      Alert.alert("Campos incompletos", "Nombre y slug son obligatorios");
      return;
    }
    const precioNumerico = parseFloat(precio);
    if (isNaN(precioNumerico) || precioNumerico < 0) {
      Alert.alert("Precio inválido", "Ingresa un precio válido");
      return;
    }

    setGuardando(true);
    try {
      const respuesta = await fetch("http://192.168.0.22:5000/api/paquetes", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, slug, precio:precioNumerico }),
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo crear el paquete');
      }

      router.replace('/paquetes');
    } catch (error) {
      console.error("Error al crear paquete:", error);
      Alert.alert("Error", "No se pudo crear el paquete");
    } finally {
      setGuardando(false);
    }
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

      <Text style={styles.label}>Precio</Text>
      <TextInput
      style={styles.input}
      value={precio}
      onChangeText={setPrecio}
      placeholder="0.00"
      keyboardType="decimal-pad"
      />

      <Button
        title={guardando ? "Creando..." : "Crear paquete"}
        onPress={crearPaquete}
        disabled={guardando}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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