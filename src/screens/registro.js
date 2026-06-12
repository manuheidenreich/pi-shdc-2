import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { db, auth } from '../firebase/Config';

function Registro(props) {
    const [email, setEmail] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setRegisterError] = useState('');

    function onSubmit(email, pass, userName) {
        setRegisterError('');   
    
        let tieneArroba = false;
    
        for (let i = 0; i < email.length; i++) {
            if (email[i] === '@') {
                tieneArroba = true;
            }
        }
    
        if (tieneArroba === false) {
            setRegisterError('Email mal formateado');
        } else if (pass.length < 6) {
            setRegisterError('La password debe tener una longitud mínima de 6 caracteres');
        } else {
            auth.createUserWithEmailAndPassword(email, pass)
                .then(response => {
                    db.collection('users').add({
                        email: email,
                        username: userName,
                        createdAt: Date.now()
                    })
                })
                .then(() => {
                    setRegisterError('');
                    props.navigation.navigate('Login');
                })
                .catch(error => {
                    setRegisterError("Fallo en el registro");
                    console.log(error);
                });
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>

            <TextInput
                style={styles.field}
                keyboardType='email-address'
                placeholder='Email'
                onChangeText={text => setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.field}
                keyboardType='default'
                placeholder='Username'
                onChangeText={text => setUsername(text)}
                value={userName}
            />

            <TextInput
                style={styles.field}
                keyboardType='default'
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
            />

            {
                registerError !== '' ?
                    <Text style={styles.error}>{registerError}</Text>
                :
                    null
            }

            <Pressable style={styles.buttonBlue} onPress={() => onSubmit(email, password, userName)}>
                <Text style={styles.buttonText}>Registrarme</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 25,
        backgroundColor: '#13111C',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#A78BFA'
    },
    field: {
        backgroundColor: '#1D1A29',
        padding: 12,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#3D3659',
        color: '#F2F0FA'
    },
    buttonBlue: {
        backgroundColor: '#8B5CF6',
        padding: 15,
        borderRadius: 5,
        marginTop: 15
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#FFFFFF'
    },
    error: {
        color: '#FB7185',
        marginBottom: 10
    }
});

export default Registro;