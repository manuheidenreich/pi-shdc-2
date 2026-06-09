import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';

function Profile(props) {
    const [Posts, setPosts] = useState([]);
    const user = auth.currentUser;

    useEffect(() => {
        const unsub = db.collection('posts')
            .where('email', '==', user.email)
            .orderBy('fecha', 'desc')
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPosts(data);
            });

        return () => unsub();
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

            <Text style={styles.dato}>{user.displayName}</Text>
            <Text style={styles.dato}>{user.email}</Text>

            <Text style={styles.subtitulo}>Mis posteos</Text>

            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        <Text>{item.descripcion}</Text>
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
        backgroundColor: '#f1f1f1',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 25
    },
    dato: {
        fontSize: 16,
        marginBottom: 8
    },
    subtitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10
    },
    post: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10
    },
    vacio: {
        color: '#999',
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
    }
});

export default Profile;