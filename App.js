import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login';            // Importação da tela de login
import BemVindoScreen from './src/screens/BemVindo';      // Importação da tela de boas-vindas
import CadastroScreen from './src/screens/Cadastro';      // Importação da tela de cadastro
import RedefinirSenhaScreen from './src/screens/RedefinirSenha';  // Importação da tela de redefinir senha
import EsqueciSenhaScreen from './src/screens/EsqueciSenha';      // Importação da tela de esqueci senha
import PerfilScreen from './src/screens/Perfil';          // Importação da tela de perfil
import ExcluirContaScreen from './src/screens/ExcluirConta'; // Importação da tela de excluir conta

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="BemVindo" component={BemVindoScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="RedefinirSenha" component={RedefinirSenhaScreen} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenhaScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="ExcluirConta" component={ExcluirContaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
