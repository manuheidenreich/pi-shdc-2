import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/Config';
import Post from '../components/post';

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
    backgroundColor: '#f1f1f1',
  },
  cargador: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 25
  },
  dato: {
    fontSize: 18,
    marginBottom: 8
  },
  datoMenor: {
    fontSize: 16,
    marginBottom: 8
  },
  subtitulo: {
    fontSize: 24,
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
  fecha: {
    fontSize: 12,
    color: '#666',
    marginTop: 5
  },
  descripcion: {
    fontSize: 18,
    marginBottom: 5
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