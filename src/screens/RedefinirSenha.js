import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientBackground = ({ children }) => (
  <LinearGradient
    colors={['#000000', '#000000', '#FF4000', '#FFE53B']}
    style={{ flex: 1 }}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    {children}
  </LinearGradient>
);

function RedefinirSenhaScreen({ navigation }) {
  return (
    <GradientBackground>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo-inovatech.png')} style={styles.logo} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Senha atual" 
            placeholderTextColor="rgba(255, 255, 255, 0.3)" 
            secureTextEntry={true} 
            style={styles.input} 
          />
          <TextInput 
            placeholder="Senha nova" 
            placeholderTextColor="rgba(255, 255, 255, 0.3)" 
            secureTextEntry={true} 
            style={styles.input} 
          />
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
            <Text style={styles.buttonText}>Redefinir</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
            <Text style={styles.linkText}>Voltar para Login</Text>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  inputContainer: {
    width: '80%',
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#FF4500',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#FFF',
    textDecorationLine: 'underline',
  },
});

export default RedefinirSenhaScreen;
