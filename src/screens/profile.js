import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/Config';

function Profile(props) {
    const [Posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');
    const user = auth.currentUser;

    useEffect(() => {
        const unsub = db.collection('posts')
            .where('email', '==', user.email)
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPosts(data);
            });
        
        const unsubUser = db.collection('users')
            .where('email', '==', user.email)
            .onSnapshot(snapshot => {
                snapshot.docs.forEach(doc => {
                    setUsername(doc.data().username);
                });
            });

        return () => {
            unsub();
            unsubUser();
        };
    }, []);

    function Logout() {
        auth.signOut()
            .then(() => {
                props.navigation.navigate('Login');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>

            <Text style={styles.dato}>{username}</Text>
            <Text style={styles.datoMenor}>{user.email}</Text>

            <Text style={styles.subtitulo}>Mis posteos</Text>

            <FlatList
                data={Posts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        <Text style={styles.descripcion}>
                            {item.descripcionPost}
                        </Text>
                        <Text style={styles.fecha}>
                            {new Date(item.createdAt).toLocaleDateString('es-AR')}
                        </Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.vacio}>No hay posteos todavia.</Text>
                }
            />

            <Pressable
                style={styles.buttonOrange}
                onPress={() => Logout()}
            >
                <Text style={styles.buttonText}>
                    Salir de la app. Hacer click aqui te lleva al login.
                </Text>
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
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#A78BFA'
    },
    dato: {
        fontSize: 18,
        marginBottom: 8,
        color: '#F2F0FA'
    },
    datoMenor: {
        fontSize: 16,
        marginBottom: 8,
        color: '#22D3EE'
    },
    subtitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#A78BFA'
    },
    post: {
        backgroundColor: '#1D1A29',
        padding: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#2E2942',
        marginBottom: 10
    },
    fecha: {
        fontSize: 12,
        color: '#7A7490',
        marginTop: 5
    },
    descripcion: {
        fontSize: 18,
        marginBottom: 5,
        color: '#CDC9DE'
    },
    vacio: {
        color: '#7A7490',
    },
    buttonOrange: {
        backgroundColor: '#2E2942',
        padding: 15,
        borderRadius: 5,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#8B5CF6'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#A78BFA'
    }
});

export default Profile;