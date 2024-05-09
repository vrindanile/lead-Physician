import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, Button, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, StatusBar, ScrollView, RefreshControl, ImageBackground, FlatList } from 'react-native'
import Color, { dimensions } from '../../Global/Color';
import MyText from '../../Components/MyText/MyText';
import { useSharedValue, useDerivedValue, withSpring } from 'react-native-reanimated';
import { styles } from './ChatStyle';
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
import GroupChat from '../../Global/Images/chatGrp.svg'
import Indivijual from '../../Global/Images/chatPersonal.svg'
// import SvgUri from 'react-native-svg-uri';
// import { useDispatch } from 'react-redux';
// import { setUser, setUserToken, } from '../../../src/reduxToolkit/reducer/user';
//src/reduxToolkit/reducer/user
// import AsyncSStyleSheettorage from '@react-native-async-storage/async-storage';
//import { useSelector, useDispatch } from 'react-redux';
import KeySvg from '../../Global/Images/logo.svg';
const Chat = ({ navigation }) => {
    // const dispatch = useDispatch();
    const [animating, setAnimating] = useState(true);
    ;
    const [scrolling, setscrolling] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(null); // State to track the active tab

    const scrollY = useSharedValue(0);

    const RenderTabsTitle = [{
        id: '1',
        title: 'Group Chat'
    },
    {
        id: '2',
        title: 'Admin Message'
    }]
    const groupChat = [{
        id: '1',
        title: 'Physician Alumni',
        time: '12 Mar, 09:30 Am',
        members: '459 Members'
    },
    {
        id: '2',
        title: 'Physician Alumni',
        time: '12 Mar, 09:30 Am',
        members: '459 Members'
    },
    {
        id: '3',
        title: 'Physician Alumni',
        time: '12 Mar, 09:30 Am',
        members: '459 Members'
    }
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

    const RenderTabs = ({ item, activeTab, setActiveTab }) => {
        return (
            <TouchableOpacity
                style={[
                    { flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.48, marginVertical: 18 },
                    item.id === activeTab && {} // Change background color if this tab is active
                ]}
                onPress={() => setActiveTab(item.id)}
            >
                <View style={[styles.tabView, item.id === activeTab && { backgroundColor: Color.PRIMARY }]}>
                    <Text style={[styles.txtTab, item.id === activeTab && { color: 'white' }]}>
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
    const RenderChat = ({ item }) => {
        return (
            <TouchableOpacity style={styles.chatView} onPress={() => { navigation.navigate('ChatDetail') }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 12 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <GroupChat></GroupChat>
                        <View>
                            <MyText text={item.title} fontWeight='400' fontSize={14} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ textAlign: 'center', marginHorizontal: 16 }} />
                            <MyText text={item.members} fontWeight='400' fontSize={12} textColor={'#959FA6'} fontFamily='Roboto' style={{ marginHorizontal: 17, marginVertical: 5 }} />
                        </View>

                    </View>
                    <Ongoing></Ongoing>
                    <MyText text={item.time} fontWeight='400' fontSize={12} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{}} />
                </View>
                <View style={styles.bottomChat}>
                    <View style={styles.rowIndivi}>
                        <Indivijual style={{ marginLeft: 22 }}></Indivijual>
                        <MyText text={'Katty'} fontWeight='bold' fontSize={13} textColor={Color.BLACK} fontFamily='Roboto' style={{ marginHorizontal: 12, marginVertical: 5 }} />
                    </View>
                    <MyText text={'Please connect and respond here…'} fontWeight='400' fontSize={13} textColor={'#959FA6'} fontFamily='Roboto' style={{ marginHorizontal: 24, marginVertical: 8 }} />
                </View>
            </TouchableOpacity >)
    }



    return (

        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor={Color.LIGHT_BLACK} />
            <View style={{
                flex: 1,
                backgroundColor: Color.SCREEN_BG,

            }}>
                <MyHeader
                    Title={`Chats`}
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

                        <FlatList
                            horizontal={true}
                            data={RenderTabsTitle}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <RenderTabs
                                    item={item}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                />
                            )}
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
                    ) : null}
                    <FlatList
                        horizontal={false}
                        data={groupChat}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <RenderChat
                                item={item}

                            />
                        )}
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
                </ScrollView>


            </View>
        </SafeAreaView>
    )
}




export default Chat;
