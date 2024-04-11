//import : react components
import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    Text,
} from 'react-native';
import { CommonActions } from '@react-navigation/core';
//import : custom components
import MyText from '../../Components/MyText/MyText';
// import CustomLoaderLogout from 'components/CustomLoader/CustomLoaderLogout';
//import : global
import Color, { dimensions } from '../../Global/Color';
//import : styles
import { styles } from './CustomDrawerStyle';
//import : modal
//import : third parties
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
//import : redux
// import { useSelector, useDispatch } from 'react-redux';
// import { logOutUser, setUser } from 'src/reduxToolkit/reducer/user';
import { useDrawerStatus } from '@react-navigation/drawer';
// import CustomLoader from '../../components/CustomLoader/CustomLoader';
///svg image
import Logo from '../../Global/Images/logo.svg'
import Profile from '../../Global/Images/profile.svg'
import Home from '../../Global/Images/homeWhite.svg';
import Like from '../../Global/Images/like.svg'
import Couser from '../../Global/Images/book.svg'
import Subscription from '../../Global/Images/dollarSquare.svg'
import About from '../../Global/Images/info.svg'
import Help from '../../Global/Images/headphone.svg'
import Terms from '../../Global/Images/book.svg'
import Logout from '../../Global/Images/logout.svg'
import Facebook from '../../Global/Images/facebook.svg'
import Insta from '../../Global/Images/instagram.svg'
import Youtube from '../../Global/Images/youtube.svg'
import Headphone from '../../Global/Images/headphone.svg'
import Sticky from '../../Global/Images/stickynote.svg'
import Privacy from '../../Global/Images/PrivacySticky.svg'

const CustomDrawer = ({ navigation }) => {
    //variables
    // const userToken = useSelector(state => state.user.userToken);
    // const dispatch = useDispatch();
    //hook : states
    const [showLoader, setShowLoader] = useState(false);
    //function : imp function
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    //function : navigation function
    // const closeDrawer = () => navigation.closeDrawer();

    // const resetIndexGoToSignup = CommonActions.reset({
    //     index: 1,
    //     routes: [{ name: ScreenNames.SIGN_UP_1 }],
    // });
    const gotoSignUp = () => {
        // closeDrawer();
        // navigation.dispatch(resetIndexGoToSignup);
    };
    const gotoHome = () => {
        // navigation.navigate(ScreenNames.BOTTOM_TAB, { screen: ScreenNames.HOME });
    };
    const gotoSuperAdminCourses = () => {
        // navigation.navigate(ScreenNames.SUPER_ADMIN_COURSES);
    };
    const gotoAllProducts = () => {
        // navigation.navigate(ScreenNames.ALL_PRODUCTS);
    };
    const gotoMyWhishlist = () => {
        // navigation.navigate(ScreenNames.BOTTOM_TAB, {
        //     screen: ScreenNames.WISHLIST,
        // });
    };
    const gotoMyOrders = () => {
        // navigation.navigate(ScreenNames.MY_ORDERS);
    };
    const gotoWelcome = () =>
        CommonActions.reset({
            index: 1,
            routes: [{ name: ScreenNames.WELCOME }],
        });
    const logout = async () => {
        setShowLoader(true);
        try {
            const resp = await Service.postApiWithToken(
                userToken,
                Service.LOGOUT,
                {},
            );
            console.log('logout resp', resp?.data);
            if (resp?.data?.status) {
                closeDrawer();
                navigation.dispatch(gotoWelcome);
                dispatch(logOutUser());
                await AsyncStorage.clear();
            }
        } catch (error) {
            console.log('error in logout', error);
        }
        setShowLoader(false);
    };


    //UI
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: '20%' }}>
                <View style={styles.mainView}>
                    {/* <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={require('../../assets/images/logo.png')}
                    /> */}
                    <Logo height={56} width={226} ></Logo>
                    {/* <TouchableOpacity
                        style={styles.crossImage}
                    onPress={() => {
                        closeDrawer();
                    }}
                    >
                        <Image
                            resizeMode="contain"
                            // style={styles.image}
                            source={require('../../assets/images/close-circle.png')}
                        />
                    </TouchableOpacity> */}
                </View>
                <View style={styles.overflowView}>
                    <Profile style={{ marginLeft: 10 }}></Profile>
                    <View style={{ flexDirection: 'column' }}>
                        <MyText
                            text={'John'}
                            fontWeight={600}
                            fontSize={16}
                            textColor="white"
                            fontFamily="Roboto"
                            style={{}}
                        />
                        <MyText
                            text={'Katty@gmail.com'}
                            fontWeight={400}
                            fontSize={14}
                            textColor="white"
                            fontFamily="Roboto"
                            style={{}}
                        />
                    </View>
                    <View style={styles.viewProfile}>
                        <MyText
                            text={'View Profile'}
                            fontWeight={500}
                            fontSize={10}
                            textColor="#070F14"
                            fontFamily="Roboto"
                            style={{ alignSelf: 'center' }}
                        />
                    </View>
                </View>
                <View style={{ padding: 20, paddingLeft: 28, paddingRight: 24, marginTop: 60 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Home></Home>
                        <DrawerItemList
                            Title="Home"
                            icon={() => <Like width={34} height={45}></Like>}
                        // image={require('assets/images/home-sb.png')}
                        // onPress={gotoHome}
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Like></Like>
                        <DrawerItemList
                            Title="My Favorites Chapters"
                            icon={() => <Like width={34} height={45} />}
                        // onPress={gotoMyWhishlist}
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Couser></Couser>
                        <DrawerItemList
                            Title="My Courses"
                        // image={require('assets/images/my-courses-sb.png')}
                        // onPress={gotoMyOrders}
                        /></View>
                    <View style={{ flexDirection: 'row' }}>
                        <Subscription></Subscription>
                        <DrawerItemList
                            Title="Subscription Plans"
                        // image={require('assets/images/my-courses-sb.png')}
                        // onPress={gotoSuperAdminCourses}
                        />
                    </View>

                    {/* <DrawerItemList
            Title="Products"
            image={require('assets/images/products-img.png')}
            onPress={gotoAllProducts}
          /> */}
                    <View style={{ flexDirection: 'row' }}>
                        <About></About>
                        <DrawerItemList
                            Title="About Us"
                        // image={require('assets/images/about-us-sb.png')}
                        // onPress={() => { }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Headphone></Headphone>
                        <DrawerItemList
                            Title="Help & Support"
                        // image={require('assets/images/help-and-support-sb.png')}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Sticky></Sticky>
                        <DrawerItemList
                            Title="Terms & Conditions"
                        // image={require('assets/images/terms-sb.png')}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Privacy></Privacy>
                        <DrawerItemList
                            Title="Privacy Policy"
                        // image={require('assets/images/privacy-sb.png')}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Logout></Logout>
                        <DrawerItemList
                            Title="Logout"
                        // image={require('assets/images/logout-sb.png')}
                        // onPress={logout}
                        />
                    </View>

                </View>
                <View style={styles.socialMediaContainer}>
                    <MyText
                        text={'Follow Us!'}
                        fontSize={12}
                        textColor="white"
                        fontFamily="regular"
                        style={{ marginBottom: 15 }}
                    />
                    <View style={[styles.socialRow, {}]}>
                        <Facebook style={{ marginHorizontal: 4 }}></Facebook>
                        <Youtube>

                        </Youtube>
                        <Insta style={{ marginHorizontal: 4 }}></Insta>
                        {/* <Image
                            source={require('assets/images/fb.png')}
                            style={{ height: 18, width: 18 }}
                        />
                        <Image
                            source={require('assets/images/youtube.png')}
                            style={{ marginLeft: 5 }}
                        />
                        <Image
                            source={require('assets/images/instagram.png')}
                            style={{ marginLeft: 5 }}
                        />
                        <Image
                            source={require('assets/images/twitter.png')}
                            style={{ marginLeft: 5 }}
                        /> */}
                    </View>
                </View>

                <MyText
                    text={'App Version: V1.0.0.12'}
                    fontSize={14}
                    textColor="#C0C0C0"
                    fontFamily="regular"
                    style={{ marginLeft: 26, marginTop: 36 }}
                />

                {/* <Text style={styles.versionText}>App Version: V1.0.0.12</Text> */}
            </ScrollView >
            {/* <CustomLoader text="Logging Out...." showLoader={showLoader} /> */}
        </View >
    );
};

export default CustomDrawer;

export const DrawerItemList = ({ Title = '', image, onPress = () => { } }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                // width: '90%',
                paddingBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Image source={image} /> */}
                <MyText
                    text={Title}
                    fontSize={14}
                    textColor="white"
                    fontFamily="medium"
                    style={{ marginLeft: 14 }}
                />
            </View>
            {/* <Image source={require('assets/images/white-right.png')} /> */}
        </TouchableOpacity>
    );
};