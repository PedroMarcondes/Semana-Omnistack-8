import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { KeyboardAvoidingView, Platform, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

//KeyboardAvoidingView -> Quando for iOS, para subir a pagina quando o teclado tiver ativo na tela
//Platform --> Identifica qual o SO do celular

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    const [user, setUser] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { user })
            }
        })
    }, []); 
    //useEffect(() => {A}, [B]); Executa A quando as variaveis B mudarem/for exibido em tela
    //Como quer que o usuário permaneca logado ao atualizar a pag deixo o caminho para onde iria em branco

    async function handleLogin() {
        const response = await api.post('/devs', { username: user });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id); //só aceita string ou numerico, se for array ou vetor tem que transf. em JSON 

        navigation.navigate('Main', { user: _id });
    }

    return (
        <KeyboardAvoidingView //para o teclado não cobrir o conteúdo
            behavior="padding" //O conteúdo sobe ao abrir o teclado
            enabled={Platform.OS === 'ios'} //Só ativa caso o SO for igual a iOS
            style={styles.container}
        >
            <Image source={logo} />

            <TextInput
                autoCapitalize="none" //Não deixa a primeira letra em maiusculo
                autoCorrect={false} //O corretor do celular fica desativado
                placeholder="Digite seu usuário no Github"
                placeholderTextColor="#999"
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});