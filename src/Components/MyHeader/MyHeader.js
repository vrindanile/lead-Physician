//import : react components
import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Keyboard,
    Platform,
    Alert,
} from 'react-native';
import {
    DrawerActions,
    useNavigation,
    useFocusEffect,
    CommonActions,
} from '@react-navigation/native';
//import : custom components
import MyText from '../MyText/MyText';
//import : global
import Color, { dimensions } from '../../Global/Color';
//import : styles
import { styles } from './MyHeaderStyle';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from 'src/reduxToolkit/reducer/user';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing,
    useDerivedValue,
    withSpring,
} from 'react-native-reanimated';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const personImg = `https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60`;
//svg imgess
import Profile from '../../Global/Images/profile.svg'
import Notfication from '../../Global/Images/notification.svg'
import Cart from '../../Global/Images/frame.svg'
import DrawerIcon from '../../Global/Images/drawer.svg'
const MyHeader = ({
    Title,
    isBackButton = false,
    isBorderRadius = true,
    IsCartIcon = true,
    IsNotificationIcon = true,
    style = {},
    scrolling,
    scrollY = { "value": 0 },
    toNavigParams = null
}) => {
    //variables
    const navigation = useNavigation();
    //   const dispatch = useDispatch();
    //   const cartCount = useSelector(state => state.user.cartCount);
    //   const userInfo = useSelector(state => state.user.userInfo);
    //   const userToken = useSelector(state => state.user.userToken);
    //   const userNotifications = useSelector(state => state.user.userNotifications);
    const [greetingMsg, setGreetingMsg] = useState('');
    // animated code

    useEffect(() => {
        getGreetingMessage();
    }, []);
    const headerRadius = useDerivedValue(() => {
        // console.log('scrollY.value', scrollY.value, scrollY.value === 0 ? 30 : 0);
        return withSpring(scrollY.value === 0 ? 0 : 30);
    });
    const headerPaddingBottom2 = useDerivedValue(() => {
        return withSpring(scrollY.value === 0 ? 63 : 20);
    });
    const headerStyle = {
        borderBottomLeftRadius: headerRadius.value,
        borderBottomRightRadius: headerRadius.value,
        paddingBottom: headerPaddingBottom2,
    };

    const getGreetingMessage = () => {
        const now = new Date();
        const hrs = now.getHours();
        let msg = '';

        if (hrs >= 0 || hr == 24) msg = 'Good Morning,';
        if (hrs >= 12) msg = 'Good Afternoon,';
        if (hrs >= 16) msg = 'Good Evening,';
        setGreetingMsg(msg);
    };

    // const resetIndexGoToWelcome = CommonActions.reset({
    //     index: 1,
    //     routes: [{ name: ScreenNames.WELCOME }],
    // });
    //function : navigation function
    const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());
    const goBack = () => {
        Keyboard.dismiss();
        navigation.canGoBack() ? navigation.goBack() : console.log("can't go back");
    };
    // const gotoNotification = () => navigation.navigate(ScreenNames.NOTIFICATIONS);
    // const gotoCart = () => navigation.navigate(ScreenNames.CART);
    //UI
    return (
        <Animated.View
            style={[
                styles.container,
                style,
                // {
                //     borderBottomLeftRadius: isBorderRadius ? 30 : 0,
                //     paddingBottom: isBackButton ? 73 : 63,
                //     borderBottomRightRadius: isBorderRadius ? 30 : 0,
                // },
                headerStyle,
                { borderBottomStartRadius: 30, borderBottomEndRadius: 30, }
            ]}>
            {/* section first drawer and back icon  */}
            <TouchableOpacity onPress={isBackButton ? goBack : openDrawer}>
                {isBackButton ? (
                    null
                    // <Image source={require('assets/images/arrow-left-white.png')} />

                ) : (
                    <View style={styles.leftContainer}>
                        {/* <Image
                            resizeMode="contain"
                            source={
                                userInfo?.profile_image
                                    ? { uri: userInfo?.profile_image }
                                    : require('assets/images/user-default.png')
                            }
                            
                            style={styles.personImg}
                        /> */}
                        <DrawerIcon></DrawerIcon>

                    </View>
                )}
            </TouchableOpacity>
            {/* title section  */}
            {isBackButton ? (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: !IsCartIcon && !IsNotificationIcon ? 40 : 0,

                    }}>

                    <MyText
                        text={Title}
                        fontFamily="regular"
                        fontSize={20}
                        marginHorizontal={10}
                        textColor="white"
                        letterSpacing={-0.2}
                    />
                </View>
            ) : <>
                <View style={{ flexDirection: 'row', width: dimensions.SCREEN_WIDTH * 0.60 }}>
                    <Profile height={43} width={43}></Profile>
                    <View style={{ marginLeft: 10 }}>
                        <MyText
                            // text={'Good Afternoon,'}
                            text={greetingMsg}
                            fontFamily="Roboto"
                            fontSize={12}
                            textColor="white"
                            letterSpacing={-0.12}
                            fontWeight={'normal'}
                        />
                        <MyText
                            // text={`${userInfo?.first_name} ${userInfo?.last_name}`}
                            text={`Katty Parrie`}
                            fontFamily="Roboto"
                            fontSize={20}
                            textColor={Color.PRIMARY}
                            letterSpacing={-0.2}
                            numberOfLines={1}
                            fontWeight={'normal'}
                            style={{ marginTop: Platform.OS === 'android' ? -5 : 5, width: responsiveWidth(60) }}
                        />
                    </View>
                </View>
            </>}
            {/* notification or cart icon  */}

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',


                }}>
                {IsCartIcon ? (
                    <TouchableOpacity onPress=

                        // {gotoCart}
                        {''}
                        style={{ marginRight: 10 }}
                    >
                        {/* {cartCount != 0 ? (
              <View style={styles.cartNumView}>
                <MyText text={cartCount} fontSize={10} textColor="white" />
              </View>
            ) : null} */}
                        <Cart></Cart>
                        {/* <Image source={require('assets/images/cart.png')} /> */}
                    </TouchableOpacity>
                ) : null}
                {IsNotificationIcon ? (
                    <TouchableOpacity
                        // onPress={gotoNotification}
                        onPress={{}}
                    >
                        {/* {userNotifications ? (
                            <View style={styles.numNotiView}
                            
                            > */}
                        {/* <MyText
                  text={userNotifications}
                  fontSize={10}
                  textColor="white"
                /> */}
                        {/* </View> */}
                        {/* ) : null} */}
                        {/* <MyText text={userNotifications} fontSize={16} textColor="white" style={{position:"absolute", bottom:24, right:5, fontWeight:'bold'}}/> */}
                        {/* <MyIcon.Feather name="bell" size={24} color={Colors.WHITE} /> */}
                        <Notfication></Notfication>
                        {/* <Image source={require('assets/images/notification.png')} /> */}
                    </TouchableOpacity>
                ) : null}

            </View>
        </Animated.View>
    );
};

export default MyHeader;
