import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updatePassword, signOut, reauthenticateWithCredential, EmailAuthProvider, deleteUser, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage();

  const [nome, setNome] = useState(user?.displayName || '');
  const [email] = useState(user?.email || '');
  const [profilePhoto, setProfilePhoto] = useState(user?.photoURL || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); // success, error, confirm

  // Função para exibir o modal
  const showModal = (message, type = 'success') => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalMessage('');
  };

  // Atualizar senha do usuário
  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      showModal('Preencha todos os campos de senha.', 'error');
      return;
    }

    const credential = EmailAuthProvider.credential(email, oldPassword);
    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      showModal('Senha alterada com sucesso!', 'success');
    } catch (error) {
      showModal('Não foi possível alterar a senha. Verifique as credenciais.', 'error');
    }
  };

  // Sair da conta
  const logout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login'); // Redireciona para a tela de login
    } catch (error) {
      showModal('Não foi possível sair da conta.', 'error');
    }
  };

  // Excluir conta permanentemente
  const deleteAccount = async () => {
    if (!oldPassword) {
      showModal('Confirme sua senha antes de excluir a conta.', 'error');
      return;
    }

    const credential = EmailAuthProvider.credential(email, oldPassword);
    try {
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      showModal('Conta excluída com sucesso!', 'success');
      navigation.replace('Login');
    } catch (error) {
      showModal('Não foi possível excluir a conta. Verifique as credenciais.', 'error');
    }
  };

  // Alterar foto de perfil
  const changePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      showModal('Precisamos de acesso à galeria.', 'error');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const photoRef = ref(storage, `profilePhotos/${user.uid}.jpg`);

      const response = await fetch(imageUri);
      const blob = await response.blob();

      try {
        await uploadBytes(photoRef, blob);
        const downloadUrl = await getDownloadURL(photoRef);
        setProfilePhoto(downloadUrl); // Atualizar estado local
        showModal('Foto de perfil atualizada!', 'success');
      } catch (error) {
        showModal('Não foi possível alterar a foto.', 'error');
      }
    }
  };

  // Remover foto de perfil
  const removePhoto = async () => {
    if (!profilePhoto) {
      showModal('Nenhuma foto de perfil encontrada.', 'error');
      return;
    }

    const photoRef = ref(storage, `profilePhotos/${user.uid}.jpg`);
    try {
      await deleteObject(photoRef);
      setProfilePhoto(null); // Remove localmente
      showModal('Foto de perfil removida!', 'success');
    } catch (error) {
      showModal('Não foi possível remover a foto.', 'error');
    }
  };

  // Atualizar nome do usuário
  const updateDisplayName = async () => {
    try {
      await updateProfile(user, { displayName: nome });
      showModal('Nome atualizado com sucesso!', 'success');
    } catch (error) {
      showModal('Erro ao atualizar o nome.', 'error');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
      </View>

      {/* Foto de Perfil */}
      <View style={styles.photoSection}>
        <Image
          source={
            profilePhoto
              ? { uri: profilePhoto }
              : require('../assets/placeholder.png')
          }
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.photoButton} onPress={changePhoto}>
          <Text style={styles.photoButtonText}>Alterar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoButton} onPress={removePhoto}>
          <Text style={styles.photoButtonText}>Remover Foto</Text>
        </TouchableOpacity>
      </View>

      {/* Main */}
      <View style={styles.main}>
        <Text style={styles.sectionTitle}>Configurações da Conta</Text>

        <Text style={styles.inputTitle}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={(text) => setNome(text)}
        />

        <Text style={styles.inputTitle}>Email</Text>
        <Text style={styles.staticEmail}>{email}</Text>

        <Text style={styles.inputTitle}>Senha Atual</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={oldPassword}
          onChangeText={(text) => setOldPassword(text)}
        />

        <Text style={styles.inputTitle}>Nova Senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />

        <TouchableOpacity style={styles.saveButton} onPress={changePassword}>
          <Text style={styles.buttonText}>Alterar Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dangerButton} onPress={deleteAccount}>
          <Text style={styles.buttonText}>Excluir Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.buttonText}>Sair da Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={updateDisplayName}>
          <Text style={styles.buttonText}>Salvar Nome</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              modalType === 'error' ? styles.modalError : styles.modalSuccess,
            ]}
          >
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Footer */}
      <View style={styles.footer}>
        <LinearGradient
          colors={['#FF4000', '#FFE53B']}
          style={styles.footerGradient}
        />
        <View style={styles.footerLeft}>
          <Text style={styles.footerTitle}>Contate-nos</Text>
          <Text style={styles.footerSubtitle}>(12) 99606-0877</Text>
        </View>
        <View style={styles.footerRight}>
          <Text style={styles.footerTitle}>Feedback e Suporte</Text>
          <Text style={styles.footerSubtitle}>Envie um email para stechforge@gmail.com</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Fundo branco da tela principal
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: '#000',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  // Foto de perfil
  photoSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoButton: {
    marginTop: 10,
    backgroundColor: '#FF4000',
    padding: 10,
    borderRadius: 5,
  },
  photoButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  // Main content
  main: {
    paddingHorizontal: 16,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  staticEmail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#28A745',
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dangerButton: {
    backgroundColor: '#DC3545',
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: '#6C757D',
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  modalError: {
    borderColor: '#DC3545',
    borderWidth: 2,
  },
  modalSuccess: {
    borderColor: '#28A745',
    borderWidth: 2,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
  },
  footerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2, // Altura do gradiente
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  footerTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  footerSubtitle: {
    fontSize: 12,
    color: '#777',
  },
});
