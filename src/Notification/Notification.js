import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, Button, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, StatusBar, ScrollView, RefreshControl, ImageBackground, FlatList } from 'react-native'
import Color, { dimensions } from '../Global/Color';
import MyText from '../Components/MyText/MyText';
import { useSharedValue, useDerivedValue, withSpring } from 'react-native-reanimated';
import { styles } from './NotificationStyle';
import MyHeader from '../Components/MyHeader/MyHeader';

///svg
import Notofication from '../Global/Images/notificationNoData.svg'
const Notification = ({ navigation }) => {
    // const dispatch = useDispatch();
    const [animating, setAnimating] = useState(true);
    ;
    const [scrolling, setscrolling] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const scrollY = useSharedValue(0);
    const renderNextButton = () => null;
    const renderDoneButton = () => null;


    const physicianCourse = [{
        id: '1',
        title: 'Reference site about Lorem Ipsum, giving information on its origins, ',
        time: '01:25PM'

    },
    {
        id: '2',
        title: 'Reference site about Lorem Ipsum, giving information on its origins, ',
        time: '01:25PM'


    },
    {
        id: '3',
        title: 'Reference site about Lorem Ipsum, giving information on its origins, ',
        time: '01:25PM'

    },
    {
        id: '4',
        title: 'Reference site about Lorem Ipsum, giving information on its origins, ',
        time: '01:25PM'

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
            <TouchableOpacity style={styles.scduleView}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        width: 63, height: 63, backgroundColor: '#F7FAEB', borderRadius: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Notofication height={41} width={41}></Notofication>
                    </View>
                    <View>
                        <MyText text={item.title} fontWeight='400' fontSize={14} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ textAlign: 'left', marginHorizontal: 16, width: dimensions.SCREEN_WIDTH * 0.60 }} />
                        <MyText text={item.time} fontWeight='400' fontSize={14} textColor={'#959FA6'} fontFamily='Roboto' style={{ textAlign: 'left', marginHorizontal: 16, width: dimensions.SCREEN_WIDTH * 0.60, marginTop: 9 }} />
                    </View>

                </View>



            </TouchableOpacity >
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
                    Title={`Notifications`}
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
                        <></>
                    ) : null}

                    <View style={{ marginTop: 50 }}>
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
                                        width: dimensions.SCREEN_WIDTH,
                                        backgroundColor: '#F7FAEB',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        marginTop: dimensions.SCREEN_HEIGHT * 0.2,
                                    }}>

                                    <View style={{ height: 119, width: 119, backgroundColor: 'white', borderRadius: 60, flexDirection: 'row', justifyContent: 'center' }}>
                                        <Notofication style={{ marginVertical: 18 }}></Notofication>
                                    </View>
                                    {/* No Notification Yet */}
                                    <MyText text={'No Notifications Yet'} fontWeight='700' fontSize={24} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ textAlign: 'center', marginVertical: 12 }} />
                                    <MyText text={'Stay Connected!  &  Informed with Our Notification Center'} fontWeight='400' fontSize={18} textColor={'#959FA6'} fontFamily='Roboto' style={{ textAlign: 'center', }} />
                                    <TouchableOpacity style={{
                                        width: 142,
                                        height: 49, borderRadius: 5, backgroundColor: Color.PRIMARY,
                                        marginVertical: 17,
                                        justifyContent: 'center'
                                    }} onPress={() => { navigation.goBack() }}>
                                        <MyText text={' Back to home'} fontWeight='500' fontSize={14} textColor={'#FFFFFF'} fontFamily='Roboto' style={{ textAlign: 'center', }} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>


            </View>
        </SafeAreaView>
    )
}




export default Notification;
