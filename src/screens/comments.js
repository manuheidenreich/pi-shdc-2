import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase/Config';

function Comments(props) {
    const postId = props.route.params.postId;
    const [post, setPost] = useState('');
    const [comentarios, setComentarios] = useState([]);
    const [texto, setTexto] = useState('');
    const [error, setError] = useState('');
    const miEmail = auth.currentUser.email;

    useEffect(() => {
        db.collection('posts').doc(postId).onSnapshot(doc => {
            setPost(doc.data());
        });

        db.collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setComentarios(data);
            });
    }, []);

    function agregarComentario() {
        if (texto === '') {
            setError('El comentario no puede estar vacio');
            return;
        }

        db.collection('posts')
            .doc(postId)
            .collection('comments')
            .add({
                texto: texto,
                email: miEmail,
                createdAt: Date.now()
            })
            .then(() => {
                setTexto('');
                setError('');
            })
            .catch(error => {
                console.log(error);
            });
    }

    let likes = post.likes;
    if (likes === undefined) {
        likes = [];
    }

    let likeado = likes.includes(miEmail);

    return (
        <View style={styles.container}>
            <View style={styles.comentario}>
                <Text style={styles.email}>{post.email}</Text>
                <Text style={styles.descripcion}>{post.descripcionPost}</Text>
                <Text style={styles.likes}>Likes: {likes.length}</Text>
            </View>

            <View style={styles.formBox}>
                <TextInput
                    style={styles.field}
                    placeholder='Escribi un comentario'
                    onChangeText={text => setTexto(text)}
                    value={texto}
                />

                {error !== '' ? <Text style={styles.errorText}>{error}</Text> : null}

                <Pressable style={styles.buttonBlue} onPress={() => agregarComentario()}>
                    <Text style={styles.buttonText}>Comentar</Text>
                </Pressable>
            </View>

            <Text style={styles.title}>Comentarios</Text>

            {comentarios.length > 0 ?
                <FlatList
                    data={comentarios}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.comentario}>
                            <Text style={styles.email}>{item.email}</Text>
                            <Text>{item.texto}</Text>
                        </View>
                    )}
                />
                :
                <Text style={styles.vacio}>Todavia no hay comentarios.</Text>
            }
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
        marginBottom: 20,
        marginTop: 10
    },
    comentario: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10
    },
    descripcion: {
        fontSize: 15,
        marginBottom: 8
    },
    email: {
        fontWeight: 'bold',
        marginBottom: 4,
        fontSize: 13,
        color: '#555'
    },
    likes: {
        fontSize: 14,
        color: '#444',
        marginTop: 5
    },
    formBox: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10
    },
    field: {
        backgroundColor: '#f1f1f1',
        padding: 12,
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
    },
    errorText: {
        color: 'red',
        marginBottom: 10
    },
    vacio: {
        color: '#999'
    }
});

export default Comments;