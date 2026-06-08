import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import login from './src/screens/login';
import registro from './src/screens/registro';
import homemenu from './src/components/homemenu';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="login" component={login} options={{headerShown: false}} />
          <Stack.Screen name="registro" component={registro} options={{headerShown: false}}/>
          <Stack.Screen name="homemenu" component={homemenu} options={{headerShown: false}}/>
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