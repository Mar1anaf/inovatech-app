import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

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

function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      setModalMessage('Preencha todos os campos!');
      setModalVisible(true);
      return;
    }

    try {
      // Criar usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Salvar dados do usuário no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        nome: nome,
        email: email,
      });

      setModalMessage('Cadastro realizado com sucesso!');
      setModalVisible(true);

      // Navegar para a tela de login após o modal fechar
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('Login');
      }, 2000);
    } catch (error) {
      setModalMessage(`Erro: ${error.message}`);
      setModalVisible(true);
    }
  };

  return (
    <GradientBackground>
      <View style={loginStyles.container}>
        {/* Modal para mensagens */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={loginStyles.modalOverlay}>
            <View style={loginStyles.modalContainer}>
              <Text style={loginStyles.modalText}>{modalMessage}</Text>
              <TouchableOpacity
                style={loginStyles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={loginStyles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={loginStyles.logoContainer}>
          <Image source={require('../assets/logo-inovatech.png')} style={loginStyles.logo} />
        </View>
        <View style={loginStyles.inputContainer}>
          <TextInput
            placeholder="Nome"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            style={loginStyles.input}
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            placeholder="Endereço de email"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            style={loginStyles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            secureTextEntry={true}
            style={loginStyles.input}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={handleRegister} style={loginStyles.button}>
            <Text style={loginStyles.buttonText}>Cadastre-se</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={loginStyles.link}>
            <Text style={loginStyles.linkText}>
              Já tem uma conta? <Text style={{ fontWeight: 'bold' }}>Faça login</Text>.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </GradientBackground>
  );
}

const loginStyles = StyleSheet.create({
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
  // Estilos do modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#FF4000',
    padding: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CadastroScreen;
