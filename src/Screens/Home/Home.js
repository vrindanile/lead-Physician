import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, Button, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, StatusBar, ScrollView, RefreshControl, ImageBackground, FlatList } from 'react-native'
import Color, { dimensions } from '../../Global/Color';
import MyText from '../../Components/MyText/MyText';
import { useSharedValue, useDerivedValue, withSpring } from 'react-native-reanimated';
import { styles } from './HomeStyle';
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
        title: 'Module 01',
        status: 'Completed'
    },
    {
        id: '2',
        title: 'Module 01',
        status: 'Ongoing'
    },
    {
        id: '3',
        title: 'Module 01',
        status: 'Pending'
    }]
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
                <View
                    style={styles.appView}>
                    {console.log('my baneer images----???', item?.img)}
                    <View>
                        <ImageBackground source={require('../../Global/Images/MaskBackground.png')} style={{ overflow: 'hidden', width: dimensions.SCREEN_WIDTH, marginTop: 19 }}>

                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 20, paddingHorizontal: 28, justifyContent: 'space-between', marginHorizontal: 12 }}>
                                {/* Add marginTop and paddingHorizontal to adjust spacing */}
                                <View style={{ flexDirection: 'column', width: dimensions.SCREEN_WIDTH * 0.50 }}>
                                    <MyText text={item.text} fontWeight='700' fontSize={16} textColor={Color.WHITE} fontFamily='Roboto' />
                                    <MyText text={item.title} fontWeight='300' fontSize={12} textColor={Color.WHITE} fontFamily='Roboto' style={{ marginTop: 8, lineHeight: 24 }} />
                                    <TouchableOpacity style={{ height: 36, width: 99, borderRadius: 5, backgroundColor: 'white', marginTop: 8 }}>
                                        <MyText text={'Read More'} fontWeight='500' fontSize={12} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ marginTop: 8, alignSelf: 'center' }} />
                                    </TouchableOpacity>
                                </View>
                                <Book width={150} height={150} ></Book>
                            </View>

                        </ImageBackground>
                    </View>

                    {/* <Text style={{ color: 'white' }}>hhhhhhh</Text> */}
                </View>
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
            <View style={styles.scduleView}>
                <View style={{ flexDirection: 'row', marginBottom: 8, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 41, height: 41, backgroundColor: '#F7FAEB', justifyContent: 'center', borderRadius: 20 }}>
                            <MyText text={'CG'} fontWeight='500' fontSize={14} textColor={Color.PRIMARY} fontFamily='Roboto' style={{ textAlign: 'center', }} />
                        </View>
                        <MyText text={'Jane Doe (Admin)'} fontWeight='bold' fontSize={14} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ textAlign: 'center', marginTop: 12, marginHorizontal: 12 }} />
                    </View>
                    <View style={{ width: 68, height: 32, borderRadius: 5, backgroundColor: Color.PRIMARY, marginTop: 2, justifyContent: 'center' }}>
                        <MyText text={'Weekly'} fontWeight='500' fontSize={12} textColor={Color.WHITE} fontFamily='Roboto' style={{ textAlign: 'center', }} />
                    </View>

                </View>
                <View style={{ width: dimensions.SCREEN_WIDTH * 0.93, height: 1, backgroundColor: '#E7EAF1', alignSelf: 'center' }}>

                </View>
                <MyText text={'Goal Setting & Achieving'} fontWeight='bold' fontSize={14} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ marginHorizontal: 2, marginTop: 10, marginBottom: 12 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                            <Savedbook>
                            </Savedbook>
                            <MyText text={'Module 3'} fontWeight='400' fontSize={13} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ marginHorizontal: 5, }} />
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                            <Ongoing>
                            </Ongoing>
                            <MyText text={'12 Mar, 09:30 Am'} fontWeight='400' fontSize={13} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ marginHorizontal: 5, }} />
                        </View>
                    </View>
                    <VideoChat></VideoChat>
                </View>
                <View style={{ width: dimensions.SCREEN_WIDTH * 0.93, height: 1, backgroundColor: '#E7EAF1', alignSelf: 'center', marginVertical: 12 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Zoom></Zoom>
                    <MyText text={'Join Zoom Meeting'} fontWeight='400' fontSize={13} textColor={'#3DA1E3'} fontFamily='Roboto' style={{ marginHorizontal: 5, marginVertical: 10 }} />
                </View>
            </View>
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
                        <View style={{ width: dimensions.SCREEN_WIDTH }}>
                            <AppIntroSlider
                                data={banner}
                                renderNextButton={renderNextButton}
                                renderDoneButton={renderDoneButton}
                                dotStyle={styles.dotStyle}
                                renderItem={RenderItem}
                                activeDotStyle={styles.activeStyle}
                            />
                        </View>
                    ) : null}
                    <View style={styles.leadView}>
                        <MyText text='LEAD Physician Courses' fontWeight='bold' fontSize={16} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ textAlign: 'right', }} />
                        <TouchableOpacity style={styles.viewAll} onPress={() => { navigation.navigate('MyCourse') }}>
                            <Text style={{ fontSize: 13, fontWeight: '400', color: 'white', alignSelf: 'center' }}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            horizontal={true}
                            data={physicianCourse}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={RenderItemLead}
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
                                    {/* <Image
                                        source={require('../../assest/Images/NoPost.png')}
                                        style={{
                                            width: '100%',
                                            height: '55%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    /> */}
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
                    <View style={styles.moduleView}>
                        <Module></Module>
                        <View style={{ flexDirection: 'column' }}>
                            <MyText text={'02 /25 Modules'} fontWeight='bold' fontSize={16} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' />
                            <MyText text={'Completed'} fontWeight='700' fontSize={16} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' />
                        </View>
                        <TouchableOpacity style={styles.resumeButton}>
                            <MyText text={'Resume'} fontWeight='500' fontSize={14} textColor={Color.WHITE} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <MyText
                                text={'Schedule'}
                                fontWeight="bold"
                                fontSize={16}
                                textColor={Color.BLACK}
                                fontFamily="Inter"
                            />
                            <MyText
                                text={'Upcoming Bi-Monthly or Weekly Meetings'}
                                fontWeight="black"
                                fontSize={13}
                                textColor={'#959FA6'}
                                fontFamily="Inter"
                                style={{
                                    fontWeight: '300',

                                }}
                            />
                        </View>
                        <TouchableOpacity style={{ height: 31, width: 59, borderRadius: 5, backgroundColor: Color.LIGHT_BLACK, justifyContent: 'center' }} onPress={() => { navigation.navigate('MyCourse') }}>
                            <MyText
                                text={'See all'}
                                fontWeight="400"
                                fontSize={13}
                                textColor={Color.WHITE}
                                fontFamily="Inter"
                                style={{
                                    fontWeight: '300',
                                    alignSelf: 'center'
                                }}
                            />
                        </TouchableOpacity>

                    </View>
                    <View>
                        <FlatList
                            horizontal={true}
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




export default Home;