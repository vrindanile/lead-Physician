/* eslint-disable react/no-unstable-nested-components */
//react components
import React from 'react';
import { View, Image, Text } from 'react-native';
//custom components
import MyText from '../../Components/MyText/MyText';
//Bottom Tab
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//global
import Color from '../../Global/Color';
//styles
import { styles } from './BottomTabStyle';
//screens
import Home from '../../Screens/Home/Home';
import Course from '../../Screens/Courses/Course';
import Schedule from '../../Screens/Schedule/Schedule';
import Profile from '../../Screens/Profile/Profile';

///svg images  29-02-2024
import ProfileActive from '../../Global/Images/activeUser.svg'
import ProfileInactive from '../../Global/Images/profileIactive.svg'
import SchduleActive from '../../Global/Images/activeSchdule.svg'
import InactiveSchdule from '../../Global/Images/inactiveschdule.svg'
import Courses from '../../Global/Images/courses.svg'
import ChatActive from '../../Global/Images/activeChat.svg'
import ChatInactive from '../../Global/Images/inactiveChat.svg'


import Toast from 'react-native-toast-message';

const BottomTab = ({ userToken }) => {
    // const userInfo = useSelector(state => state.user.userInfo);
    //variables
    const Tab = createBottomTabNavigator();
    const screenOptions = {
        showLabel: false,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.navigatorStyle,
    };
    // backBehavior = order - return to previous tab (in the order they are shown in the tab bar)
    // backBehavior = history - return to last visited tab
    console.log('Bottom Tab');
    return (
        <Tab.Navigator backBehavior="history" screenOptions={screenOptions}>
            <Tab.Screen
                name={'Home'}
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabStyle}>
                            {focused ? null : null
                                //     <Image source={require('assets/images/home-2.png')} />
                                // ) : (
                                //     <Image source={require('assets/images/home.png')} />
                            }
                            <MyText
                                text="Home"
                                fontSize={14}
                                fontFamily="medium"
                                textColor={focused ? Color.THEME_BLUE : Color.LIGHT_GRAY}
                                marginTop={5}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name={'Course'}
                component={Course}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabStyle}>
                            {/* {focused ? (
                                <Image source={require('../../assets/images/heart-yellow-outline.png')} style={{ height: 23, width: 23, resizeMode: 'contain' }} />
                            ) : (
                                <Image source={require('../../assets/images/wishlist.png')} />
                            )} */}
                            <MyText
                                text="Wishlist"
                                fontSize={14}
                                fontFamily="medium"
                                textColor={focused ? Color.THEME_BLUE : Color.LIGHT_GRAY}
                                marginTop={5}
                            />
                        </View>
                    ),
                }}
            />
            {/* <Tab.Screen
                name={ScreenNames.MY_ORDERS}
                component={MyOrders}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabStyle}>
                            {focused ? (
                                <Image source={require('assets/images/my-orders-2.png')} />
                            ) : (
                                <Image source={require('assets/images/my-orders.png')} />
                            )}
                            <MyText
                                text="My Orders"
                                fontSize={14}
                                fontFamily="medium"
                                textColor={focused ? Colors.THEME_BLUE : Colors.LIGHT_GRAY}
                                marginTop={5}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name={ScreenNames.PROFILE}
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabStyle}>
                            {focused ? (
                                <Image source={require('assets/images/profile-2.png')} />
                            ) : (
                                <Image source={require('assets/images/profile.png')} />
                            )}
                            <MyText
                                text="Profile"
                                fontSize={14}
                                fontFamily="medium"
                                textColor={focused ? Colors.THEME_BLUE : Colors.LIGHT_GRAY}
                                marginTop={5}
                            />
                        </View>
                    ),
                }}
            /> */}
        </Tab.Navigator>
    );
};

export default BottomTab;
