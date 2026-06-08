import { Text, View, StyleSheet, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

import home from '../screens/home';
import profile from '../screens/profile';
import usuario from '../screens/usuario';
import nuevopost from '../screens/nuevopost';



const Tab = createBottomTabNavigator();

function homemenu() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false, tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }} />

            <Tab.Screen
                name="Usuarios"
                component={Usuarios}
                options={{ headerShown: false, tabBarIcon: () => <Entypo name="users" size={24} color="black" /> }} />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false, tabBarIcon: () => <AntDesign name="profile" size={24} color="black" /> }} />

        <Tab.Screen
                name="Nuevo Post"
                component={NuevoPost}
                options={{headerShown: false, tabBarIcon: () => <AntDesign name="plus" size={24} color="black" />}} />
           

        </Tab.Navigator>
    )
}

export default homemenu;