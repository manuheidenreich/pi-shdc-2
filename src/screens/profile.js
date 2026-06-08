import { View, Text, Pressable, StyleSheet } from 'react-native';
import { auth } from '../firebase/Config';

function Profile(props) {
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

            <Pressable
                style={styles.buttonOrange}
                onPress={() => Logout()}
            >
                <Text style={styles.buttonText}>
                    Salir de la app. Hacer click aquí te lleva al login.
                </Text>
            </Pressable>
        </View>
    )
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