import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { auth } from '../firebase/config';

function login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    function onSubmit(email, pass) {
        let tieneArroba = false;

        for (let i = 0; i < email.length; i++) {
            if (email[i] === '@') {
                tieneArroba = true;
            }
        }

        if (tieneArroba === false) {
            setLoginError('Email mal formateado');
        } else if (pass.length < 6) {
            setLoginError('La password debe tener una longitud mínima de 6 caracteres');
        } else {
            auth.signInWithEmailAndPassword(email, pass)
                .then(response => {
                    setLoginError('');
                    props.navigation.navigate('homemenu');
                })
                .catch(error => {
                    setLoginError('Credenciales incorrectas');
                });
        }
    }

    auth.onAuthStateChanged(user => {
        if (user) {
            props.navigation.navigate('homemenu');
        }
    });
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ingresar</Text>

            <TextInput
                style={styles.field}
                keyboardType='email-address'
                placeholder='Email:'
                onChangeText={text => setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.field}
                keyboardType='default'
                placeholder='Password:'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
            />

            {
                loginError !== '' ?
                    <Text style={styles.error}>{loginError}</Text>
                    :
                    null
            }

            <Pressable
                style={styles.buttonOrange}
                onPress={() => onSubmit(email, password)}
            >
                <Text style={styles.buttonText}>Entrar en la app</Text>
            </Pressable>

            <Pressable
                style={styles.buttonBlue}
                onPress={() => props.navigation.navigate('Register')}
            >
                <Text style={styles.buttonText}>No tengo cuenta</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        width: '100%',
        backgroundColor: '#f1f1f1'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 25
    },
    field: {
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    buttonBlue: {
        backgroundColor: '#4db6e2',
        padding: 15,
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 10
    },
    buttonOrange: {
        backgroundColor: 'orange',
        padding: 15,
        borderRadius: 5,
        marginTop: 15
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16
    },
    error: {
        color: 'red',
        marginBottom: 10
    }
});

export default login;