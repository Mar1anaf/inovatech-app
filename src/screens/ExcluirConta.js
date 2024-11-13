import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientBackground = ({ children }) => (
  <LinearGradient
  colors={['#FFE53B', '#FF4000', '#000000', '#000000']} // gradiente de cinza escuro para preto
  style={{ flex: 1 }}
  >
    {children}
  </LinearGradient>
);

function ExcluirContaScreen({ navigation }) {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.warningText}>Tem certeza que deseja excluir sua conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  warningText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
  },
});

export default ExcluirContaScreen;

