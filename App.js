import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { auth } from './src/firebase/config';

import login from './src/screens/login';
import registro from './src/screens/registro';
import homemenu from './src/components/homemenu';

const Stack = createNativeStackNavigator();

export default function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUsuarioLogueado(user);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  if (cargando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          {usuarioLogueado ? (
            <Stack.Screen name="homemenu" component={homemenu} options={{ headerShown: false }} />
          ) : (
            <>
              <Stack.Screen name="login" component={login} options={{ headerShown: false }} />
              <Stack.Screen name="registro" component={registro} options={{ headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 25,
    backgroundColor: '#f1f1f1',
  }
});