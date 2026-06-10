import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';

import Profile from '../screens/profile';
import NuevoPost from '../screens/nuevopost';
import Home from '../screens/home';

const Tab = createBottomTabNavigator();

function HomeMenu() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
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