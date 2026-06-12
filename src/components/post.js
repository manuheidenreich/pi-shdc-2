import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { auth, db } from '../firebase/Config';

export default function Post(props) {
  const post = props.post.data;
  const postId = props.post.id;

  let cantidadComentarios = post.commentCount;
  if (cantidadComentarios === undefined) {
      cantidadComentarios = 0;
  }

  function likePost() {
    db.collection('posts')
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      });
  }

  function unlikePost() {
    db.collection('posts')
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      });
  }

  function userLiked() {
    let liked = false;
    if (post.likes) {
      post.likes.forEach(email => {
        if (email === auth.currentUser.email) {
          liked = true;
        }
      });
    }
    return liked;
  }


  return (
    <View style={styles.card}>
      <Text style={styles.user}>{post.owner} (<Text>{post.email}</Text>)</Text>
      <Text style={styles.description}>{post.descripcionPost}</Text>
      {post.image !== '' ? (
        <Image
          source={{ uri: post.image }}
          style={styles.image}
          resizeMode='cover'
        />
      ) : null}
      <Text style={styles.fecha}>
          {new Date(post.createdAt).toLocaleDateString('es-AR')}
      </Text>
      <Text style={styles.likes}>
        Likes: {post.likes ? post.likes.length : 0}
      </Text>
      <Text style={styles.likes}>
        Comentarios: {cantidadComentarios}
      </Text>
      {userLiked() ? (
        <Pressable onPress={() => unlikePost()}>
          <Text style={styles.likeButton}>Quitar me gusta</Text>
        </Pressable>
      ) : (
        <Pressable onPress={() => likePost()}>
          <Text style={styles.likeButton}>Me gusta</Text>
        </Pressable>
      )}
      {props.showComments ? (
        <Pressable
          onPress={() => props.navigation.navigate('Comments', { postId: postId })}
          style={styles.commentButton}
        >
          <Text style={styles.commentText}>Comentar</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1D1A29',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2E2942'
  },
  user: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#F2F0FA'
  },
  description: {
    fontSize: 15,
    marginBottom: 12,
    color: '#CDC9DE'
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginBottom: 12
  },
  likes: {
    marginBottom: 8,
    color: '#22D3EE'
  },
  fecha: {
    fontSize: 12,
    color: '#7A7490',
    marginTop: 5
  },
  likeButton: {
    color: '#22D3EE',
    fontWeight: 'bold',
    marginBottom: 12
  },
  commentButton: {
    backgroundColor: '#8B5CF6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  commentText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});