import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientBackground = ({ children }) => (
  <LinearGradient
  colors={['#000000', '#000000', '#FF4000', '#FFE53B' ]} // gradiente de cinza escuro para preto
  style={{ flex: 1 }}
  >
    {children}
  </LinearGradient>
);

function EsqueciSenhaScreen({ navigation }) {
    return (
      <GradientBackground>
        <View style={loginStyles.logoContainer}>
          <Image source={require('../assets/logo-inovatech.png')} style={loginStyles.logo} />
        </View>
        <View style={loginStyles.inputContainer}>
          <TextInput placeholder="Endereço de email" placeholderTextColor="#FFF" style={loginStyles.input} />
          <TouchableOpacity onPress={() => navigation.navigate('EmailEnviado')} style={loginStyles.button}>
            <Text style={loginStyles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </GradientBackground>
    );
  }

  const loginStyles = StyleSheet.create({
    logoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 120,
      height: 120,
    },
    inputContainer: {
      flex: 2,
      paddingHorizontal: 20,
    },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 25,
      padding: 15,
      marginBottom: 10,
      color: '#FFF',
    },
    button: {
      backgroundColor: '#FF4500',
      borderRadius: 25,
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
  
export default EsqueciSenhaScreen;
  