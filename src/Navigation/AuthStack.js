
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Screens/splash';
import Welcome from '../Screens/Auth/Welcome';
import Signup from '../Screens/Auth/Signup';
import SignIn from '../Screens/Auth/Signin';
import BottomTab from './BottomTab/BottomTab';
import CourseDetail from '../Screens/CourseDetail/CourseDetail';
import ModuleScreen from '../Screens/Module/ModuleScreen';
import Summary from '../Screens/Summary/Summary';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false, // set the headerShown option to false to hide the header
        }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="SignIn" component={SignIn} />

            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="CourseDetail" component={CourseDetail} />
            <Stack.Screen name="ModuleScreen" component={ModuleScreen} />
            <Stack.Screen name="Summary" component={Summary} />


        </Stack.Navigator>
    );
};
const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default AuthStack;
