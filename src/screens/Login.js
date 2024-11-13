import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, StyleSheet, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

const GradientBackground = ({ children }) => (
  <LinearGradient
    colors={['#000000', '#000000', '#000000', '#FF4000', '#FFE53B']}
    style={{ flex: 1 }}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    {children}
  </LinearGradient>
);

const LoginScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('BemVindo');
      })
      .catch((error) => {
        Alert.alert('Erro', error.message);
      });
  };

  const handleForgotPassword = () => {
    Alert.alert('Sucesso', 'Um link de recuperação foi enviado para o seu email.');
    setModalVisible(false);
    setEmail('');
  };

  return (
    <GradientBackground>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo-inovatech.png')} style={styles.logo} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            secureTextEntry={true}
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.link}>
            <Text style={styles.linkText}>Não tem uma conta? <Text style={{ fontWeight: 'bold' }}>Cadastre-se</Text>.</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.link}>
            <Text style={styles.linkText}>Esqueci a senha.</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal para recuperação de senha */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalText}>Esqueceu a senha?</Text>
            <TextInput
              placeholder="Insira seu email"
              placeholderTextColor="rgba(0, 0, 0, 0.6)"
              style={modalStyles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={modalStyles.button}
              onPress={handleForgotPassword}
            >
              <Text style={modalStyles.buttonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={modalStyles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    paddingHorizontal: 80,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
    color: '#FFF',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 10,
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

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF4500',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#FF4500',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
