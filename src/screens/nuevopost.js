import { View, Text, Pressable, StyleSheet, TextInput, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';

function nuevopost() {

    const [comentario, setComentario] = useState('');

     function crearPost() {
        db.collection('posts').add({
            descripcionPost: comentario,
            email: auth.currentUser.email,
            createdAt: Date.now()
        })
        .then(() => {
            setComentario('');
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nuevo post</Text>

            <TextInput 
                style={styles.field}
                keyboardType='default'
                placeholder='Escribí tu post'
                onChangeText={(text) => setComentario(text)}
                value={comentario}
            />

            <Pressable 
                style={styles.buttonBlue}
                onPress={() => crearPost()}
            >
                <Text style={styles.buttonText}>Publicar</Text>
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
        marginTop: 15
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16
    }
});

export default nuevopost;