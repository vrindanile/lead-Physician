import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, Button, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, StatusBar, } from 'react-native'
import Color, { dimensions } from '../../Global/Color';
import { useSharedValue, useDerivedValue, withSpring } from 'react-native-reanimated';
import MyHeader from '../../Components/MyHeader/MyHeader';
// import Spinner from 'react-native-spinkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle, Rect } from 'react-native-svg';
// import SvgUri from 'react-native-svg-uri';
// import { useDispatch } from 'react-redux';
// import { setUser, setUserToken, } from '../../../src/reduxToolkit/reducer/user';
//src/reduxToolkit/reducer/user
// import AsyncSStyleSheettorage from '@react-native-async-storage/async-storage';
//import { useSelector, useDispatch } from 'react-redux';
import KeySvg from '../../Global/Images/logo.svg';
const Home = ({ navigation }) => {
    // const dispatch = useDispatch();
    const [animating, setAnimating] = useState(true);
    ;
    const [scrolling, setscrolling] = useState(false);
    const scrollY = useSharedValue(0);

    // useEffect(() => {
    //     // getTheme();
    //     setTimeout(() => {
    //         setAnimating(false);

    //         // Check if user_id is set or not
    //         // If not then send for Authentication
    //         // else send to Home Screen
    //           AsyncStorage.getItem('user_id').then(value =>
    //             navigation.replace(value !== null ? 'RegisterScreen' : 'MainContainer'),
    //           );
    //         navigation.replace('WelcomeScreen')
    //     }, 5000);
    // }, []);


    return (

        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor={Color.LIGHT_BLACK} />
            <View style={{
                flex: 1,
                backgroundColor: Color.SCREEN_BG,

            }}>
                <MyHeader
                    Title="Home"
                    scrolling={scrolling}
                    scrollY={scrollY}
                    style={scrolling ? { zIndex: 99 } : null}
                    isBorderRadius={true}
                />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.LIGHT_GREEN
        // set the top padding to move the image to the top
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 130,
    },
    spinnerTextStyle: {
        color: 'red',
    },
    containerr: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: 10, // set the bottom padding to move the image up from the bottom
        //paddingRight: 30, // set the right padding to move the image to the right
        marginTop: '40%'
    },
    imagee: {
        width: 100,
        height: 130,
        borderTopLeftRadius: 70,
        borderBottomLeftRadius: 70
    },
    spinnerContainer: {
        position: 'absolute',
        bottom: 50,
    },
});
export default Home;
