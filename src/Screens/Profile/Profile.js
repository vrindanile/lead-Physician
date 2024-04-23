import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, Button, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, StatusBar, ScrollView, RefreshControl, ImageBackground, FlatList } from 'react-native'
import Color, { dimensions } from '../../Global/Color';
import MyText from '../../Components/MyText/MyText';
import { useSharedValue, useDerivedValue, withSpring } from 'react-native-reanimated';
import { styles } from './ProfileStyle';
import MyHeader from '../../Components/MyHeader/MyHeader';
import AppIntroSlider from 'react-native-app-intro-slider';
// import Spinner from 'react-native-spinkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle, Rect } from 'react-native-svg';
import Book from '../../Global/Images/book.svg'
import Course from '../../Global/Images/courses.svg';
import Ongoing from '../../Global/Images/clock.svg'
import Pending from '../../Global/Images/timer.svg'
import Completed from '../../Global/Images/completedCourse.svg'
import Bat from '../../Global/Images/bat.svg'
import Module from '../../Global/Images/moduleImg.svg'
import Savedbook from '../../Global/Images/savedBook.svg'
import VideoChat from '../../Global/Images/videoChat.svg'
import Zoom from '../../Global/Images/Zoom.svg'
import ProfilePic from '../../Global/Images/profile.svg'
import ProfileCall from '../../Global/Images/callProfile.svg'
import EmailProfile from '../../Global/Images/smsProfile.svg'
import ArrowRigt from '../../Global/Images/Shape.svg'
// import SvgUri from 'react-native-svg-uri';
// import { useDispatch } from 'react-redux';
// import { setUser, setUserToken, } from '../../../src/reduxToolkit/reducer/user';
//src/reduxToolkit/reducer/user
// import AsyncSStyleSheettorage from '@react-native-async-storage/async-storage';
//import { useSelector, useDispatch } from 'react-redux';
import KeySvg from '../../Global/Images/logo.svg';
const Profile = ({ navigation }) => {
    // const dispatch = useDispatch();
    const [animating, setAnimating] = useState(true);
    ;
    const [scrolling, setscrolling] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const scrollY = useSharedValue(0);
    const renderNextButton = () => null;
    const renderDoneButton = () => null;

    const banner = [
        {
            id: '1',
            text: 'Announcements',
            title: 'Welcome to LEAD Physician®, the online leadership training program for Physicians By Physicians.'
        },
        {
            id: '2',
            text: 'Announcements',
            title: 'Welcome to LEAD Physician®, the online leadership training program for Physicians By Physicians.'
        },
        {
            id: '3',
            text: 'Announcements',
            title: 'Welcome to LEAD Physician®, the online leadership training program for Physicians By Physicians.'
        }
    ]
    const physicianCourse = [{
        id: '1',
        title: 'Change password',

    },
    {
        id: '2',
        title: 'Terms & Conditions',

    },
    {
        id: '3',
        title: 'Privacy Policy',

    },
    {
        id: '4',
        title: 'Logout',

    },
    ]
    const schedule = [{
        id: '1',
        name: 'Jane Doe (Admin)',
        module: 'Module 3',
        time: '12 Mar, 09:30 Am'
    }]
    const handleScroll = event => {
        const yOffset = event.nativeEvent.contentOffset.y;
        scrollY.value = event.nativeEvent.contentOffset.y;
        if (yOffset === 0) {
            // Your code to handle reaching the top of the scroll view
            console.log('Reached the top');
            setscrolling(false);
        } else {
            setscrolling(true);
        }
    };
    const onRefresh = React.useCallback(() => {
        // checkcon();
        wait(2000).then(() => {
            setRefreshing(false);
        });
    }, []);
    const RenderItem = ({ item }) => {

        return (
            <>

            </>
        );
    };
    const RenderItemLead = ({ item }) => {
        return (
            <TouchableOpacity style={styles.teamView}>
                <View style={styles.circularBackground}>
                    <Bat style={{ alignSelf: 'center' }}></Bat>

                </View>
                <View style={{ marginTop: 28 }}>
                    <MyText text={item.title} fontWeight='400' fontSize={14} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ textAlign: 'center', }} />
                    <View style={styles.statusView}>
                        {item.status == 'Completed' ?
                            <View style={styles.rowView}>
                                <Completed style={{ alignSelf: 'center' }}></Completed>
                                <MyText text={item.status} fontWeight='400' fontSize={12} textColor={Color.PRIMARY} fontFamily='Roboto' style={{ textAlign: 'center', marginHorizontal: 2 }} />
                            </View> : item.status == 'Ongoing' ? <View style={styles.rowView}>
                                <Ongoing style={{ alignSelf: 'center' }}></Ongoing>
                                <MyText text={item.status} fontWeight='400' fontSize={12} textColor={Color.PRIMARY} fontFamily='Roboto' style={{ textAlign: 'center', marginHorizontal: 2 }} />
                            </View> : <View style={styles.rowView}>
                                <Pending style={{ alignSelf: 'center' }}></Pending>
                                <MyText text={item.status} fontWeight='400' fontSize={12} textColor={Color.PRIMARY} fontFamily='Roboto' style={{ textAlign: 'center', marginHorizontal: 2 }} />
                            </View>}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    //ui for schdule
    const RenderSchdule = ({ item }) => {
        return (
            <TouchableOpacity style={styles.scduleView} onPress={() => {
                item.id === '1' ? navigation.navigate('ChangePassword') : null
            }}>
                <View style={{ flexDirection: 'row', width: dimensions.SCREEN_WIDTH * 0.80, justifyContent: 'space-between' }}>
                    <MyText text={item.title} fontWeight='700' fontSize={14} textColor={'#132A3A'} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
                    <ArrowRigt height={13} width={8}></ArrowRigt>
                </View>




            </TouchableOpacity>
        )
    }
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

        <SafeAreaView style={{ flex: 1, backgroundColor: '#F7FAEB' }}>
            <StatusBar backgroundColor={Color.LIGHT_BLACK} />
            <View style={{
                flex: 1,
                backgroundColor: '#F7FAEB',

            }}>
                <MyHeader
                    Title="Home"
                    scrolling={scrolling}
                    scrollY={scrollY}
                    style={scrolling ? { zIndex: 99 } : null}
                    isBorderRadius={true}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: '20%' }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    // onScrollBeginDrag={() => {
                    //   setscrolling(true);
                    // }}
                    // onMomentumScrollEnd={() => {
                    //   setscrolling(false);
                    // }}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    style={styles.mainView}>
                    {!scrolling ? (
                        <View
                            style={styles.appView}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.80, alignSelf: 'center', paddingVertical: 14 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <ProfilePic height={64} width={64}></ProfilePic>
                                    <MyText text='Katty Parrie' fontWeight='bold' fontSize={16} textColor={'#4F5168'} fontFamily='Roboto' style={{ marginHorizontal: 12, marginVertical: 18 }} />
                                </View>
                                <TouchableOpacity style={{
                                    width: 66, height: 34,
                                    borderRadius: 50, backgroundColor: Color.PRIMARY,
                                    marginVertical: 12,
                                    justifyContent: 'center'
                                }} onPress={() => { navigation.navigate('EditProfile') }}>
                                    <MyText text='Edit' fontWeight='600' fontSize={14} textColor={Color.WHITE} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ position: 'absolute', backgroundColor: '#F7FAEB', height: 48, width: dimensions.SCREEN_WIDTH, bottom: 0, alignSelf: 'center' }}>
                                <View style={{ flexDirection: 'row', width: dimensions.SCREEN_WIDTH * 0.80, alignSelf: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 12 }}>
                                        <ProfileCall height={25} width={25}></ProfileCall>
                                        <MyText text='+1 8763939993' fontWeight='400' fontSize={14} textColor={'#66757F'} fontFamily='Roboto' style={{ marginHorizontal: 5, }} />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 12 }}>
                                        <EmailProfile height={25} width={25}></EmailProfile>
                                        <MyText text='Katty@gmail.com' fontWeight='400' fontSize={14} textColor={'#66757F'} fontFamily='Roboto' style={{ marginHorizontal: 5, marginVertical: 3 }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : null}
                    <View style={styles.greenView}>
                        <ImageBackground source={require('../../Global/Images/MaskBackground.png')} style={{ width: '106%', height: '100%', alignSelf: 'center', }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.90, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../Global/Images/PlataniumMembership.png')} style={{ width: 62, height: 62, resizeMode: 'contain', marginHorizontal: 14, justifyContent: 'center', alignItems: 'center', marginVertical: 25 }}></Image>
                                    <View>
                                        <MyText text='Platinum Membership' fontWeight='400' fontSize={16} textColor={Color.WHITE} fontFamily='Roboto' style={{}} />
                                        <MyText text='$20.10' fontWeight='500' fontSize={24} textColor={Color.WHITE} fontFamily='Roboto' style={{}} />
                                    </View>
                                </View>
                                <TouchableOpacity style={{ width: 103, height: 44, borderRadius: 5, backgroundColor: 'white', justifyContent: 'center' }}>
                                    <MyText text='Renew' fontWeight='700' fontSize={14} textColor={'#070F14'} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ marginTop: 8 }}>
                        <FlatList
                            horizontal={false}
                            data={physicianCourse}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={RenderSchdule}
                            ListEmptyComponent={() => (
                                <View
                                    style={{
                                        height: dimensions.SCREEN_HEIGHT * 0.58,
                                        width: dimensions.SCREEN_WIDTH * 0.9,
                                        backgroundColor: '#F3F3F3',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        marginTop: 20,
                                    }}>

                                    <MyText
                                        text={'Sorry !! We Couldn’t Find Any Fundraiser'}
                                        fontWeight="black"
                                        fontSize={12}
                                        textColor={Color.BLACK}
                                        fontFamily="Inter"
                                        style={{
                                            fontWeight: '500',
                                            alignSelf: 'center',
                                            width: '55%',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                        }}
                                    />
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>


            </View>
        </SafeAreaView>
    )
}




export default Profile;
