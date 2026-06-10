import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import firebase from '../firebase/Config';
import { auth, db } from '../firebase/Config';

export default function Post(props) {
  const post = props.post.data;
  const postId = props.post.id;

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

  function getUserName() {
    let nombre = post.owner;
    if (props.users) {
      props.users.forEach(u => {
        if (u.email === post.owner) {
          nombre = u.username;
        }
      });
    }
    return nombre;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.user}>{getUserName()}</Text>
      <Text style={styles.description}>{post.description}</Text>
      {post.image !== '' ? (
        <Image
          source={{ uri: post.image }}
          style={styles.image}
          resizeMode='cover'
        />
      ) : null}
      <Text style={styles.likes}>
        Likes: {post.likes ? post.likes.length : 0}
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
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#d0d7de'
  },
  user: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#24292f'
  },
  description: {
    fontSize: 15,
    marginBottom: 12,
    color: '#24292f'
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginBottom: 12
  },
  likes: {
    marginBottom: 8,
    color: '#57606a'
  },
  likeButton: {
    color: '#1f6feb',
    fontWeight: 'bold',
    marginBottom: 12
  },
  commentButton: {
    backgroundColor: '#eaeef2',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  commentText: {
    color: '#24292f',
    fontWeight: 'bold'
  }
});