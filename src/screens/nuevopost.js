import { View, Text, Pressable, StyleSheet, TextInput} from 'react-native';
import { useState,useEffect } from 'react';
import { db, auth } from '../firebase/Config';

function NuevoPost() {

    const [comentario, setComentario] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubUsers = db.collection('users')
        .onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => doc.data());
            setUsers(data);
        });

    }, []);

    function crearPost() {
        let buscandoEmail = users.find(user => user.email === auth.currentUser.email);
        if (comentario === '') {
            return;
        }

        db.collection('posts').add({
            descripcionPost: comentario,
            email: auth.currentUser.email,
            owner: buscandoEmail.username,
            createdAt: Date.now(),
            likes: []
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
        backgroundColor: '#13111C'
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
    }
});

export default NuevoPost;