import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientBackground = ({ children }) => (
  <LinearGradient
    colors={['#000000', '#000000','#000000', '#FF4000', '#FFE53B']} // gradiente
    style={{ flex: 1 }}
    start={{ x: 0, y: 0 }} // Diagonal
    end={{ x: 1, y: 1 }} // Diagonal
  >
    {children}
  </LinearGradient>
);

function BemVindoScreen({ navigation }) {
  return (
    <GradientBackground>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Bem Vindo(a)!</Text>
          <Text style={styles.description}>
            Evite arrependimentos pós-compra! Use nosso app de realidade aumentada para ver seus objetos em 3D.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tutorial')}>
            <Text style={styles.buttonText}>Aproveite!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Perfil')}>
            <Image source={require('../assets/avatar.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../assets/carrinho-carrinho.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    color: '#000',
    marginVertical: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
  },
  iconsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
  },
  iconButton: {
    marginHorizontal: 20,
  },
  icon: {
    width: 30,
    height: 30,
    justifyContent: 'space-between',
    marginHorizontal: 90,
  },
});

export default BemVindoScreen;
