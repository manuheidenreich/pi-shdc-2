import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from '@expo/vector-icons/AntDesign';

import Profile from '../screens/Profile';
import NuevoPost from '../screens/NuevoPost';
import Home from '../screens/Home';
import Comments from '../screens/Comments';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Comments" component={Comments} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function HomeMenu() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false, tabBarIcon: () => <AntDesign name="home" size={24} color="black" /> }} />
      <Tab.Screen
        name="NuevoPost"
        component={NuevoPost}
        options={{ headerShown: false, tabBarIcon: () => <AntDesign name="plus" size={24} color="black" /> }} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, tabBarIcon: () => <AntDesign name="profile" size={24} color="black" /> }} />
    </Tab.Navigator>
  );
}

export default HomeMenu;