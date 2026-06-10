import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase/Config';

function Comments(props) {
    const postId = props.route.params.postId;
    const [comentarios, setComentarios] = useState([]);
    const [texto, setTexto] = useState('');

    useEffect(() => {
        const unsub = db.collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('createdAt', 'asc')
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setComentarios(data);
            });

        return () => unsub();
    }, []);

    function agregarComentario() {
        if (texto === '') {
            return;
        }

        db.collection('posts')
            .doc(postId)
            .collection('comments')
            .add({
                texto: texto,
                email: auth.currentUser.email,
                createdAt: Date.now()
            })
            .then(() => {
                setTexto('');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Comentarios</Text>

            <FlatList
                data={comentarios}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.comentario}>
                        <Text style={styles.email}>{item.email}</Text>
                        <Text>{item.texto}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.vacio}>No hay comentarios todavia.</Text>
                }
            />

            <TextInput
                style={styles.field}
                placeholder='Escribi un comentario'
                onChangeText={text => setTexto(text)}
                value={texto}
            />

            <Pressable
                style={styles.buttonBlue}
                onPress={() => agregarComentario()}
            >
                <Text style={styles.buttonText}>Comentar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: '#f1f1f1'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20
    },
    comentario: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10
    },
    email: {
        fontWeight: 'bold',
        marginBottom: 4,
        fontSize: 13,
        color: '#555'
    },
    vacio: {
        color: '#999'
    },
    field: {
        backgroundColor: '#fff',
        padding: 12,
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    buttonBlue: {
        backgroundColor: '#4db6e2',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16
    }
});

export default Comments;