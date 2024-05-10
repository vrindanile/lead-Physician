import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    ScrollView, FlatList, Linking,
    TouchableOpacity, SafeAreaView, Alert, TextInput, Platform, Modal
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react'
import { dimensions } from '../../Global/Color';
import moment from 'moment';
// import { Mycolors, dimensions } from '../../utility/Mycolors';
import MyText from '../../Components/MyText/MyText';
import { styles } from './ScheduleStyle';
import { setLoading, saveUserResult } from '../../redux/actions/user_action';
import WebView from 'react-native-webview';
import Color from '../../Global/Color';
import MyHeader from '../../Components/MyHeader/MyHeader';

import DateTimePicker from '@react-native-community/datetimepicker';
import EventCalendar from 'react-native-events-calendar';
import { getApiWithToken, GET_SCHDULE } from '../../Global/Service';
import { connect, useSelector } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";

//svg image
import Pending from '../../Global/Images/timer.svg'
import SavedBook from '../../Global/Images/savedBook.svg'
import OnGoing from '../../Global/Images/clock.svg'
import Zoom from '../../Global/Images/Zoom.svg'
import Calendar from '../../Global/Images/calendarWhite.svg'
// const axios = require('axios');
const Schedule = (navigation) => {
    console.log('my navigation--->>', navigation);
    const [DATA2, setDATA2] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
    const [selected, setselected] = useState(true)
    const [click1, setclick1] = useState('Mon')
    const [webViewVisible, setWebViewVisible] = React.useState(false);
    // const dispatch = useDispatch();
    // const user = useSelector(state => state.user.user_details)
    const [DATA, setDATA] = useState(null)
    // const isKeyboardOpen = useKeyboard();
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')
    const [loading, setLoading] = useState(false)
    const [opendateModal, setopenDateModal] = useState(false);
    const [title, setTitle] = useState('')
    const [lode, setlode] = useState(true)
    const [date, setDate] = useState(new Date());
    console.log('my new data---->>>', new Date());
    const [displaydate, setdisplaydate] = useState('Choose Date')
    const [apiDate, setapiDate] = useState('2024-01-01')
    const [events, setEvents] = useState([

        // {
        //     "created_at": "2024-05-03T07:30:32.000000Z",
        //     "end": "2024-05-10 15:30:00",
        //     "id": 1,
        //     "meeting_title": "fdf",
        //     "meeting_type": "Bi-Montly",
        //     "note": "dffdsf",
        //     "schedule_end_date": "2024-05-10",
        //     "schedule_end_time": "15:30:00",
        //     "schedule_start_date": "2024-05-10",
        //     "schedule_start_time": "15:00:00",
        //     "start": "2024-05-10 15:00:00",
        //     "updated_at": "2024-05-10T06:26:09.000000Z",
        //     "user_id": "3",
        //     "zoom_link": "fdf"

        // }

    ]);
    const isFocus = useIsFocused()
    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         setLoading(true);
    //         getCartCount()
    //         setLoading(false);
    //     });
    //     // Return the function to unsubscribe from the event so it gets removed on unmount
    //     return unsubscribe;
    // }, [isFocus]);
    useEffect(() => {
        setLoading(true);
        // getDetails()
        setLoading(false);
    }, []);
    const userToken = useSelector(state => state.user.userToken);
    const user = useSelector(state => state.user.userInfo);
    console.log('my user Toeknnn--->>>', user);
    useEffect(() => {
        //  getdates()
        getHome(new Date(), 'date')
    }, [])
    const handlePress = () => {
        setWebViewVisible(true);
    };

    const handleCloseWebView = () => {
        setWebViewVisible(false);
    };
    const getdates = async () => {
        setLoading(true)
        // let formdata = new FormData();
        // formdata.append("fullname", name);
        const { responseJson, err } = await requestGetApi(DateOfWeek, '', 'GET', user.token)
        setLoading(false)
        console.log('the 2023-12-08==>>', responseJson)
        if (err == null) {
            if (responseJson.status) {
                let df = responseJson.data[0].substring(0, 10)
                //  setapiDate(df)
                setDATA2(responseJson.data)
                setlode(!lode)
            } else {
                setalert_sms(responseJson.message)
                setMy_Alert(true)
            }
        } else {
            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    const getdateformate = (dat) => {
        var mm = dat.toString().substring(4, 7)
        var dd = dat.toString().substring(8, 10)
        var yy = dat.toString().substring(11, 15)
        var mydate2 = dateformates2(mm, dd, yy)
        var mydate = dateformates(mm, dd, yy)
        return mydate
    }
    // const getHome = async (dat, withs) => {
    //     setLoading(true)
    //     console.log('=====================dat===============');
    //     console.log(dat);
    //     var mm = dat.toString().substring(4, 7)
    //     var dd = dat.toString().substring(8, 10)
    //     var yy = dat.toString().substring(11, 15)
    //     var mydate2 = dateformates2(mm, dd, yy)
    //     var mydate = dateformates(mm, dd, yy)
    //     setapiDate(mydate2)
    //     setdisplaydate(mydate)
    //     console.log('============mydate2========================', mydate2);

    //     // let formdata = new FormData();
    //     // formdata.append("date", mydate2);
    //     const { responseJson, err } = await requestPostApi(home, formdata, 'POST', user.token)
    //     setLoading(false)
    //     console.log('the home==>>', responseJson)
    //     if (err == null) {
    //         if (responseJson.status) {
    //             setEvents(responseJson.data)
    //             setDATA(responseJson.data)
    //             //  setclick1(dat)
    //         } else {
    //             setalert_sms(responseJson.message)
    //             setMy_Alert(true)
    //         }
    //     } else {
    //         setalert_sms(err)
    //         setMy_Alert(true)
    //     }
    // }

    const getHome = async (dat, withs) => {
        setLoading(true)
        console.log('=====================dat===============');
        console.log(dat);
        var mm = dat.toString().substring(4, 7)
        var dd = dat.toString().substring(8, 10)
        var yy = dat.toString().substring(11, 15)
        var mydate2 = dateformates2(mm, dd, yy)
        var mydate = dateformates(mm, dd, yy)
        console.log('did it reach to this point', mydate2, mydate);
        setapiDate(mydate2)
        setdisplaydate(mydate)
        console.log('============mydate2========================', mydate2);

        // let formdata = new FormData();
        // formdata.append("date", mydate2);
        const resp = await getApiWithToken(userToken, GET_SCHDULE);
        console.log('get profile2222 in getHome----->>>>', resp?.data?.data);
        setLoading(false)
        console.log('the home==>>', resp?.data?.status)

        if (resp?.data?.status) {
            setEvents(resp?.data?.data)
            setDATA(resp?.data?.data)
            //  setclick1(dat)
        } else {
            setalert_sms(responseJson.message)
            setMy_Alert(true)
        }

    }
    const dateformates2 = (month, day, year) => {
        if (month == 'Jan') {
            return year + '-01-' + day
        } else if (month == 'Feb') {
            return year + '-02-' + day
        } else if (month == 'Mar') {
            return year + '-03-' + day
        } else if (month == 'Apr') {
            return year + '-04-' + day
        } else if (month == 'May') {
            return year + '-05-' + day
        } else if (month == 'Jun') {
            return year + '-06-' + day
        } else if (month == 'Jul') {
            return year + '-07-' + day
        } else if (month == 'Aug') {
            return year + '-08-' + day
        } else if (month == 'Sep') {
            return year + '-09-' + day
        } else if (month == 'Oct') {
            return year + '-10-' + day
        } else if (month == 'Nov') {
            return year + '-11-' + day
        } else if (month == 'Dec') {
            return year + '-12-' + day
        }
    }
    const dateformates = (month, day, year) => {
        console.log('my dates--->>', month, day, year);
        if (month == 'Jan') {
            return '01-' + day + '-' + year
        } else if (month == 'Feb') {
            return '02-' + day + '-' + year
        } else if (month == 'Mar') {
            return '03-' + day + '-' + year
        } else if (month == 'Apr') {
            return '04-' + day + '-' + year
        } else if (month == 'May') {
            return '05-' + day + '-' + year
        } else if (month == 'Jun') {
            return '06-' + day + '-' + year
        } else if (month == 'Jul') {
            return '07-' + day + '-' + year
        } else if (month == 'Aug') {
            return '08-' + day + '-' + year
        } else if (month == 'Sep') {
            return '09-' + day + '-' + year
        } else if (month == 'Oct') {
            return '10-' + day + '-' + year
        } else if (month == 'Nov') {
            return '11-' + day + '-' + year
        } else if (month == 'Dec') {
            return '12-' + day + '-' + year
        }
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setopenDateModal(Platform.OS === 'ios');

        console.log('====================================currentDate');
        console.log(currentDate);
        console.log('====================================',);

        var mm = currentDate.toString().substring(4, 7)
        var dd = currentDate.toString().substring(8, 10)
        var yy = currentDate.toString().substring(11, 15)
        var mydate = dateformates(mm, dd, yy)
        var mydate2 = dateformates2(mm, dd, yy)
        setdisplaydate(mydate)
        setapiDate(mydate2)
        // setDate(currentDate)
        //setopenDateModal(false)
        setlode(!lode)
        if (Platform.OS == 'android') {
            getHome(currentDate, 'date')
        }
    };


    const eventClicked = (event) => {
        //On Click of event showing alert from here
        Alert.alert(JSON.stringify(event));

    };

    //get data 
    // const getDetails = async () => {
    //     setLoading(true);
    //     try {
    //         const resp = await getApiWithToken(userToken, GET_SCHDULE);
    //         console.log('get profile2222----->>>>', resp?.data?.data);
    //         if (resp?.data?.success) {
    //             // setProfile(resp?.data?.data)
    //             setEvents(resp?.data?.data)
    //         } else {
    //             // Toast.show({ text1: resp.data.message });
    //         }
    //     } catch (error) {
    //         console.log('error in getCartCount', error);
    //     }
    //     setLoading(false);
    // };
    return (
        <SafeAreaView style={{ backgroundColor: '#E8ECF2', flex: 1 }}>

            <MyHeader title={'My Services'} onPress={() => { props.navigation.goBack() }} onPress2={() => { props.navigation.navigate('Notification') }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', alignSelf: 'center' }}>
                <View style={{ width: '82%', height: 50, backgroundColor: '#fff', borderRadius: 10, marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={{ color: '#000', fontSize: 13, textAlign: 'center', fontWeight: '300' }}>{displaydate}</Text>
                    {/* <TouchableOpacity onPress={() => { setopenDateModal(true) }} style={{ backgroundColor: 'red' }}>
                        <Image source={require('../../assets/images/Icons/calendra.png')} style={{ height: 25, width: 25, resizeMode: 'stretch', alignSelf: 'center' }}></Image>
                        <Calendar></Calendar>
                    </TouchableOpacity> */}
                </View>
                <TouchableOpacity style={{ width: 60, height: 50, backgroundColor: Color.PRIMARY, justifyContent: 'center', borderRadius: 10, marginTop: 15 }}
                    onPress={() => {
                        setopenDateModal(true)
                        getHome(new Date(), 'date')
                        // setclick1(DATA2[0])
                        // setdisplaydate('Choose Date')
                    }}>
                    {/* <Text style={{ color: '#fff', fontSize: 13, textAlign: 'center', fontWeight: '700' }}>Clear</Text> */}
                    <Calendar style={{ alignSelf: 'center' }}></Calendar>
                </TouchableOpacity>
            </View>


            <View style={{
                alignItems: 'center',
                justifyContent: 'center', flex: 1
            }}>
                <View style={{ width: '100%', height: 45, position: 'absolute', backgroundColor: '#fff', zIndex: 999, top: 4 }} />
                <EventCalendar
                    eventTapped={eventClicked}
                    events={events}
                    width={dimensions.SCREEN_WIDTH}
                    size={60}
                    renderEvent={(item) => {
                        console.log('=================hhhh===================',);
                        console.log(item);
                        console.log('====================================');
                        const startTime = new Date(`2000-01-01T${item.schedule_start_time}`);
                        const endTime = new Date(`2000-01-01T${item.schedule_end_time}`);

                        const timeDifference = endTime - startTime;
                        console.log('timeDifference !== 60 * 60 * 1000', timeDifference !== 45 * 60 * 1000, timeDifference);
                        if (timeDifference === 2 * 60 * 60 * 1000) {
                            { console.log('did i reach in this condition'); }



                            return (

                                <TouchableOpacity style={{
                                    width: '98%', borderRadius: 4, alignSelf: 'center',
                                    backgroundColor: '#fff',
                                    shadowColor: '#000',
                                    shadowRadius: 2,
                                    shadowOpacity: 0.2,
                                    elevation: 3,
                                    paddingVertical: 10, marginTop: 9,

                                }}

                                >
                                    <TouchableOpacity style={{ width: '100%', alignSelf: 'center', height: 'auto' }}

                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.72, alignSelf: 'center' }}>
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
                                                style={{ alignSelf: 'center' }}

                                            />
                                            {console.log('my meeting type111---->>', item.meeting_type)}
                                            <View style={styles.buttonBi}>
                                                <MyText
                                                    text={item.meeting_type}
                                                    fontFamily="Roboto"
                                                    fontWeight='500'
                                                    fontSize={12}
                                                    textColor={Color.WHITE}
                                                    style={{ alignSelf: 'center' }}

                                                />
                                            </View>

                                        </View>

                                        <View style={{ width: dimensions.SCREEN_WIDTH, height: 1, backgroundColor: '#E7EAF1', marginVertical: 5 }}>

                                        </View>
                                        <View style={{ marginHorizontal: 14 }}>
                                            <MyText
                                                text={item.meeting_title}
                                                fontFamily="Roboto"
                                                fontWeight='700'
                                                fontSize={14}
                                                textColor={Color.LIGHT_BLACK}
                                                style={{}}

                                            />

                                            <View style={{ flexDirection: 'row', }}>
                                                <OnGoing></OnGoing>
                                                <MyText
                                                    text={`${item.schedule_start_date} , ${moment(item.schedule_start_time, "HH:mm:ss").format("hh:mm A")}`}
                                                    fontFamily="Roboto"
                                                    fontWeight='400'
                                                    fontSize={13}
                                                    textColor={Color.LIGHT_BLACK}
                                                    style={{ marginHorizontal: 6 }}

                                                />
                                            </View>
                                        </View>
                                        <View style={{ width: dimensions.SCREEN_WIDTH, height: 1, backgroundColor: '#E7EAF1', marginVertical: 7, }}>

                                        </View>
                                        <TouchableOpacity style={{ marginHorizontal: 10, flexDirection: 'row' }} onPress={() => { setWebViewVisible(true), setTitle(item.zoom_link) }}>
                                            <Zoom height={22} ></Zoom>
                                            <MyText
                                                text={'Join Zoom Meeting'}
                                                fontFamily="Roboto"
                                                fontWeight='400'
                                                fontSize={13}
                                                textColor={'#3DA1E3'}
                                                style={{}}

                                            />
                                        </TouchableOpacity>
                                    </TouchableOpacity>

                                </TouchableOpacity>

                            )
                        }
                        else {
                            return (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.75 }}>
                                    <MyText
                                        text={item.meeting_title}
                                        fontFamily="Roboto"
                                        fontWeight='700'
                                        fontSize={14}
                                        textColor={Color.LIGHT_BLACK}
                                        style={{}}


                                    />
                                    <Text>{moment(item.schedule_start_time, "HH:mm:ss").format("hh:mm A")}</Text>

                                </View>
                            )

                        }
                    }}

                    initDate={apiDate}
                    scrollToFirst
                />


                {/* <EventCalendar
                    eventTapped={eventClicked}
                    events={events}
                    width={dimensions.SCREEN_WIDTH}
                    size={60}
                    renderEvent={(data) => {
                        console.log('=================hhhh===================', data.schedule_start_time);
                        console.log(data);
                        const startTime = new Date(`2000-01-01T${data.schedule_start_time}`);
                        const endTime = new Date(`2000-01-01T${data.schedule_end_time}`);

                        const timeDifference = endTime - startTime;
                        console.log('timeDifference !== 15 * 60 * 1000', timeDifference !== 45 * 60 * 1000, timeDifference);
                        if (timeDifference !== 45 * 60 * 1000) {
                            { console.log('did i reach in this condition'); }
                            return (

                                <TouchableOpacity style={{
                                    width: '98%', borderRadius: 4, alignSelf: 'center',
                                    backgroundColor: '#fff',
                                    shadowColor: '#000',
                                    shadowRadius: 2,
                                    shadowOpacity: 0.2,
                                    elevation: 3,
                                    paddingVertical: 10, marginTop: 9
                                }} onPress={() => {
                                    props.navigation.navigate('ServiceDetails', { data: data, selectedDate: displaydate })
                                }}>
                                    <TouchableOpacity style={{ width: '100%', alignSelf: 'center', }}



                                    >

                                        {console.log('my valuesmeeting_title--->>', data)}
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.72, alignSelf: 'center' }}>
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
                                                style={{ alignSelf: 'center' }}

                                            />
                                            <View style={styles.buttonBi}>
                                                <MyText
                                                    text={data.meeting_type}
                                                    fontFamily="Roboto"
                                                    fontWeight='500'
                                                    fontSize={12}
                                                    textColor={Color.WHITE}
                                                    style={{ alignSelf: 'center' }}

                                                />
                                            </View>

                                        </View>
                                        <View style={{ width: dimensions.SCREEN_WIDTH, height: 1, backgroundColor: '#E7EAF1', marginVertical: 5 }}>

                                        </View>
                                        <View style={{ marginHorizontal: 14 }}>
                                            <MyText
                                                text={data.meeting_title}
                                                fontFamily="Roboto"
                                                fontWeight='500'
                                                fontSize={14}
                                                textColor={Color.LIGHT_BLACK}
                                                style={{}}

                                            />

                                            <View style={{ flexDirection: 'row', }}>
                                                <OnGoing></OnGoing>
                                                <MyText
                                                    text={`${data.schedule_start_date},${data.schedule_start_time}`}
                                                    fontFamily="Roboto"
                                                    fontWeight='400'
                                                    fontSize={13}
                                                    textColor={Color.LIGHT_BLACK}
                                                    style={{ marginHorizontal: 6 }}

                                                />
                                            </View>
                                        </View>
                                        <View style={{ width: dimensions.SCREEN_WIDTH, height: 1, backgroundColor: '#E7EAF1', marginVertical: 7, }}>

                                        </View>
                                        <TouchableOpacity style={{ marginHorizontal: 10, flexDirection: 'row' }} onPress={() => { setWebViewVisible(true), setTitle(data.zoom_link) }}>
                                            <Zoom height={22} ></Zoom>
                                            <MyText
                                                text={'Join Zoom Meeting'}
                                                fontFamily="Roboto"
                                                fontWeight='400'
                                                fontSize={13}
                                                textColor={'#3DA1E3'}
                                                style={{}}
                                            />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </TouchableOpacity>

                            );
                        } else {

                            return (
                                <TouchableOpacity style={{
                                    width: '98%', borderRadius: 4, alignSelf: 'center',
                                    backgroundColor: '#fff',
                                    shadowColor: '#000',
                                    shadowRadius: 2,
                                    shadowOpacity: 0.2,
                                    elevation: 3,
                                    paddingVertical: 10, marginTop: 9
                                }} onPress={() => {
                                    props.navigation.navigate('ServiceDetails', { data: data, selectedDate: displaydate })
                                }}>
                                    <TouchableOpacity style={{ width: '100%', alignSelf: 'center', }}


                                    >

                                        {console.log('my valuesmeeting_title--->>', data)}


                                        <View style={{ marginHorizontal: 14 }}>
                                            <MyText
                                                text={data.meeting_title}
                                                fontFamily="Roboto"
                                                fontWeight='500'
                                                fontSize={14}
                                                textColor={Color.LIGHT_BLACK}
                                                style={{}}
                                            />
                                        </View>
                                        <TouchableOpacity style={{ marginHorizontal: 10, flexDirection: 'row' }} onPress={() => { setWebViewVisible(true), setTitle(data.zoom_link) }}>
                                            <Zoom height={22} ></Zoom>
                                            <MyText
                                                text={'Join Zoom Meeting'}
                                                fontFamily="Roboto"
                                                fontWeight='400'
                                                fontSize={13}
                                                textColor={'#3DA1E3'}
                                                style={{}}
                                            />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </TouchableOpacity>)
                        }
                    }
                    }
                    scrollToFirst

                /> */}
            </View>


            {/* <View style={{width:100,height:800}} /> */}
            {/* </ScrollView> */}
            {console.log('my calendar date time picker---->>>', opendateModal)}
            {opendateModal ?
                <View style={{ backgroundColor: '#fff', position: 'absolute', alignSelf: 'center', bottom: 0, width: '98%' }}>
                    <View style={{ width: '85%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: 10 }}>
                        <TouchableOpacity onPress={() => { setopenDateModal(false) }}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            getHome(date, 'date')
                            setopenDateModal(false)
                        }}>
                            <Text>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="spinner"
                        onChange={onChange}
                    />
                </View>

                : null}
            <Modal
                visible={webViewVisible}
                animationType="slide"
                transparent={false}
            >
                <View style={{ flex: 1 }}>
                    {console.log('my webview url---?>>', JSON.stringify(title))}
                    <WebView
                        source={{
                            uri:
                                // 'https://www.google.com/'
                                JSON.stringify(title)
                        }}
                    // Other WebView props...
                    />
                    <TouchableOpacity onPress={handleCloseWebView} style={{ backgroundColor: Color.PRIMARY, height: 60, justifyContent: 'center' }}>
                        {/* Close button or any UI to close the WebView */}
                        <Text style={{ fontFamily: 'Inter', fontSize: 16, color: 'white', fontWeight: '600', alignSelf: 'center' }}>Close WebView</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* </View>*/}
            {/* {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null} */}
            {/* {loading ? <Loader /> : null} */}
        </SafeAreaView>
    )
}

export default Schedule







