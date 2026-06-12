import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/Config';
import Post from '../components/Post';

export default function Home(props) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsub = db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }));
        setPosts(data);
        setCargando(false);
      });

    const unsubUsers = db.collection('users')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => doc.data());
        setUsers(data);
      });

    return () => {
      unsub();
      unsubUsers();
    };
  }, []);

  if (cargando) {
    return (
      <View style={styles.cargador}>
        <ActivityIndicator size='large' color='#1f6feb' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posteos</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Post
            post={item}
            descripcion={item.data.descripcionPost}
            users={users}
            navigation={props.navigation}
            showComments={true}
          />
        )}
      />
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
  cargador: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    color: '#9B94B3'
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