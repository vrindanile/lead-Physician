import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, Button, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, StatusBar, ScrollView, RefreshControl, ImageBackground, FlatList } from 'react-native'
import Color, { dimensions } from '../../Global/Color';
import MyText from '../../Components/MyText/MyText';
import moment from 'moment';
import { useSharedValue, useDerivedValue, withSpring } from 'react-native-reanimated';
import Hyperlinks from "react-native-hyperlinks";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './SchduleStyle';
import MyHeader from '../../Components/MyHeader/MyHeader';
import Loader from '../../Components/Loader';
import AppIntroSlider from 'react-native-app-intro-slider';
import { GET_PROFILE, postApiWithToken, LOGOUT, getApiWithToken, GET_SHDULEDETAIL } from '../../Global/Service';
import { CommonActions } from '@react-navigation/core';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import ProfileCall from '../../Global/Images/callProfile.svg'
import EmailProfile from '../../Global/Images/smsProfile.svg'
import ArrowRigt from '../../Global/Images/Shape.svg'
import OnGoing from '../../Global/Images/clock.svg'
import { logOutUser } from '../../reduxToolkit/reducer/user';
import Zoom from '../../Global/Images/Zoom.svg'
import Calendar from '../../Global/Images/calendarWhite.svg'
import SavedBook from '../../Global/Images/savedBook.svg'
import Monitor from '../../Global/Images/monitor.svg'
const SchduleDetails = ({ navigation, route }) => {
    console.log('my route--->>', route?.params?.id);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState('')
    const [profile, setProfile] = useState({})
    const isFocus = useIsFocused()

    ///my dispatch function
    const gotoWelcome = () =>
        CommonActions.reset({
            index: 1,
            routes: [{ name: 'SignIn' }],
        });
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(true);
            getCartCount()
            setLoading(false);
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [isFocus]);
    //hyperlink

    const handleOnLinkPress = (url) => {
        // Open the link using a web browser or a WebView
        console.log('Link pressed:', url);
    };


    function handleOnMentionPress(username) {
        console.log(username)
    }

    function handleOnHashtagPress(tag) {
        console.log(tag)
    }
    //get data for list
    const getCartCount = async () => {
        setLoading(true);
        var url = GET_SHDULEDETAIL
        var murl = `/` + route?.params?.id
        url = url + murl
        try {
            const resp = await getApiWithToken(userToken, url);
            console.log('get profile222277----->>>>', resp?.data?.status);
            if (resp?.data?.status === true) {
                setProfile(resp?.data?.data)

            } else {
                Toast.show({ text1: resp.data.message });
            }
        } catch (error) {
            console.log('error in getCartCount', error);
        }
        setLoading(false);
    };

    // logout user

    //variables : redux
    const userToken = useSelector(state => state.user.userToken);

    const [animating, setAnimating] = useState(true);
    ;
    const [scrolling, setscrolling] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const scrollY = useSharedValue(0);



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


    //ui for schdule
    const RenderSchdule = ({ item }) => {
        return (
            <TouchableOpacity style={styles.scduleView} onPress={() => {
                item.id === '1' ? navigation.navigate('ChangePassword') : item.id === '4' ? logout() : null
            }}>
                <View style={{ flexDirection: 'row', width: dimensions.SCREEN_WIDTH * 0.80, justifyContent: 'space-between' }}>
                    <MyText text={item.title} fontWeight='700' fontSize={14} textColor={'#132A3A'} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
                    <ArrowRigt height={13} width={8}></ArrowRigt>
                </View>
            </TouchableOpacity>
        )
    }
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#F7FAEB' }}>
            <StatusBar backgroundColor={Color.LIGHT_BLACK} />
            <View style={{
                flex: 1,
                backgroundColor: '#F7FAEB',

            }}>
                <MyHeader
                    Title={`Schedule Meeting Details`}
                    isBackButton
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

                            <View style={{ width: '100%', alignSelf: 'center', height: 'auto' }}

                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.84, alignSelf: 'center', marginTop: 12 }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={styles.circleView}>
                                            <MyText
                                                text={'LP'}
                                                fontFamily="Roboto"
                                                fontWeight='500'
                                                fontSize={14}
                                                textColor={Color.PRIMARY}
                                                style={{ alignSelf: 'center' }}

                                            />

                                        </View>

                                        <MyText
                                            text={'Dr. Elsie Koh, MD MHL'}
                                            fontFamily="Roboto"
                                            fontWeight='bold'
                                            fontSize={14}
                                            textColor={Color.LIGHT_BLACK}
                                            style={{ alignSelf: 'center', marginLeft: 12 }}

                                        />
                                    </View>

                                    <View style={styles.buttonBi}>
                                        <MyText
                                            text={profile?.meeting_type}
                                            fontFamily="Roboto"
                                            fontWeight='700'
                                            fontSize={12}
                                            textColor={Color.WHITE}
                                            style={{ alignSelf: 'center' }}

                                        />
                                    </View>

                                </View>
                                <View style={{ width: dimensions.SCREEN_WIDTH, height: 1, backgroundColor: '#E7EAF1', marginVertical: 12 }}>

                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 12 }}>
                                    <View style={{ flexDirection: 'column', marginHorizontal: 12 }}>
                                        <MyText
                                            text={profile?.meeting_title}
                                            fontFamily="Roboto"
                                            fontWeight='700'
                                            fontSize={14}
                                            textColor={'#132A3A'}
                                            style={{}}

                                        />
                                        {/* <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <SavedBook></SavedBook>
                                            <MyText
                                                text={'Module 3'}
                                                fontFamily="Roboto"
                                                fontWeight='400'
                                                fontSize={13}
                                                textColor={'#132A3A'}
                                                style={{ alignSelf: 'center', marginLeft: 4 }}

                                            />
                                        </View> */}
                                        <View style={{ flexDirection: 'row', marginTop: 9, }}>
                                            <OnGoing></OnGoing>
                                            <MyText
                                                text={`${moment(profile.schedule_start_date).format('MM/DD/YYYY')}`}
                                                fontFamily="Roboto"
                                                fontWeight='400'
                                                fontSize={13}
                                                textColor={'#132A3A'}
                                                style={{ alignSelf: 'center', marginLeft: 4 }}
                                            />
                                        </View>
                                        <View>

                                            <MyText
                                                text={`${moment(profile.schedule_start_time, "HH:mm:ss").format("hh:mm A")}-${moment(profile.schedule_end_time, "HH:mm:ss").format("hh:mm A")}`}
                                                fontFamily="Roboto"
                                                fontWeight='400'
                                                fontSize={13}
                                                textColor={'#132A3A'}
                                                style={{ alignSelf: 'center', marginLeft: 4, marginTop: 4 }}
                                            />
                                        </View>
                                    </View>
                                    <Monitor></Monitor>
                                </View>
                                <View style={{ width: dimensions.SCREEN_WIDTH, height: 1, backgroundColor: '#E7EAF1', marginVertical: 12 }}>

                                </View>
                                <View style={{ flexDirection: 'row', paddingBottom: 10, width: dimensions.SCREEN_WIDTH, alignSelf: 'center', justifyContent: 'center', }}>
                                    {/* <Zoom height={36} width={36} style={{ marginLeft: 21 }}></Zoom> */}
                                    {/* <MyText
                                        text={' Join Zoom Meeting :'}
                                        fontFamily="Roboto"
                                        fontWeight='400'
                                        fontSize={13}
                                        textColor={'#3DA1E3'}
                                        style={{ alignSelf: 'center', marginLeft: 4 }}

                                    /> */}
                                    {/* <MyText
                                        text={profile?.zoom_link}
                                        fontFamily="Roboto"
                                        fontWeight='400'
                                        fontSize={13}
                                        textColor={Color.LIGHT_BLACK}
                                        style={{ alignSelf: 'center', marginLeft: 4 }}

                                    /> */}
                                    {console.log('profile hyperlinks LLLL?????---->>.', profile?.zoom_link)}
                                    <Hyperlinks
                                        text={'https://meet.google.com/szu-tbii-pek'}
                                        style={{ fontSize: 15, width: dimensions.SCREEN_WIDTH * 0.78, alignSelf: 'center', justifyContent: 'center', }}
                                        hyperlinkStyle={{ color: '#3DA1E3' }}
                                        onPress={(url) => handleOnLinkPress(profile?.zoom_link)}
                                        // onLinkPress={handleOnLinkPress}
                                        onMentionPress={handleOnMentionPress}
                                        onHashtagPress={handleOnHashtagPress}
                                    />
                                </View>
                                {/* <View style={{ marginHorizontal: 10, flexDirection: 'row' }} >
                                    <Zoom height={22} ></Zoom>
                                    <MyText
                                        text={'Join Zoom Meeting'}
                                        fontFamily="Roboto"
                                        fontWeight='400'
                                        fontSize={13}
                                        textColor={'#3DA1E3'}
                                        style={{}}

                                    />
                                </View> */}
                            </View>

                        </View>
                    ) : null}
                    <View style={styles.description}>
                        <MyText
                            text={`Meeting keynotes : ${profile?.note}`}
                            fontFamily="Roboto"
                            fontWeight='400'
                            fontSize={14}
                            textColor={Color.BLACK}
                            style={{ lineHeight: 24, paddingHorizontal: 10 }}

                        />
                    </View>
                </ScrollView>


            </View>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}




export default SchduleDetails;
