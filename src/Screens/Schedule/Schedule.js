import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    ScrollView, FlatList, Linking,
    TouchableOpacity, SafeAreaView, Alert, TextInput, Platform,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react'
import { dimensions } from '../../Global/Color';
// import { Mycolors, dimensions } from '../../utility/Mycolors';
import MyText from '../../Components/MyText/MyText';
import { styles } from './ScheduleStyle';
// import HomeHeaderComponent from '../../components/HomeHeaderComponent'
// import { useSelector, useDispatch } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoading, saveUserResult } from '../../redux/actions/user_action';
// import Loader from '../../WebApi/Loader';
// import MyAlert from '../../components/MyAlert';
// import { baseUrl, country, DateOfWeek, city, home, update_profile, update_status, submit_review, servic_details, requestGetApi, requestPostApi } from '../../WebApi/Service'
import Color from '../../Global/Color';
import MyHeader from '../../Components/MyHeader/MyHeader';
// import CustomButton from '../../components/CustomButton/CustomButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import EventCalendar from 'react-native-events-calendar';
// import useKeyboard from '../../components/useKeyboard';
//svg image
import Pending from '../../Global/Images/timer.svg'
import SavedBook from '../../Global/Images/savedBook.svg'
import OnGoing from '../../Global/Images/clock.svg'
import Zoom from '../../Global/Images/Zoom.svg'
// const axios = require('axios');
const Schedule = (props) => {
    const [DATA2, setDATA2] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
    const [selected, setselected] = useState(true)
    const [click1, setclick1] = useState('Mon')
    // const dispatch = useDispatch();
    // const user = useSelector(state => state.user.user_details)
    const [DATA, setDATA] = useState(null)
    // const isKeyboardOpen = useKeyboard();
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')
    const [loading, setLoading] = useState(false)
    const [opendateModal, setopenDateModal] = useState(false);
    const [lode, setlode] = useState(true)
    const [date, setDate] = useState(new Date());
    const [displaydate, setdisplaydate] = useState('Choose Date')
    const [apiDate, setapiDate] = useState('2024-01-01')
    const [events, setEvents] = useState([
        {
            start: '2024-04-05 02:00:00', // yyyy/mm/dd
            end: '2024-04-05 04:00:00',
            title: 'New Year Party',
            summary: 'xyz Location',
            name: 'ashish',
        }
    ]);
    // useEffect(() => {
    //     //  getdates()

    //     getHome(new Date(), 'date')
    // }, [])

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
    const getHome = async (dat, withs) => {
        setLoading(true)
        console.log('=====================dat===============');
        console.log(dat);
        var mm = dat.toString().substring(4, 7)
        var dd = dat.toString().substring(8, 10)
        var yy = dat.toString().substring(11, 15)
        var mydate2 = dateformates2(mm, dd, yy)
        var mydate = dateformates(mm, dd, yy)
        setapiDate(mydate2)
        setdisplaydate(mydate)
        console.log('============mydate2========================', mydate2);

        let formdata = new FormData();
        formdata.append("date", mydate2);
        const { responseJson, err } = await requestPostApi(home, formdata, 'POST', user.token)
        setLoading(false)
        console.log('the home==>>', responseJson)
        if (err == null) {
            if (responseJson.status) {
                setEvents(responseJson.data)
                setDATA(responseJson.data)
                //  setclick1(dat)
            } else {
                setalert_sms(responseJson.message)
                setMy_Alert(true)
            }
        } else {
            setalert_sms(err)
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

        console.log('====================================');
        console.log(currentDate);
        console.log('====================================');

        var mm = currentDate.toString().substring(4, 7)
        var dd = currentDate.toString().substring(8, 10)
        var yy = currentDate.toString().substring(11, 15)
        var mydate = dateformates(mm, dd, yy)
        var mydate2 = dateformates2(mm, dd, yy)
        setdisplaydate(mydate)
        setapiDate(mydate2)
        setDate(currentDate)
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
    return (
        <SafeAreaView style={{ backgroundColor: '#E8ECF2', flex: 1 }}>

            <MyHeader title={'My Services'} onPress={() => { props.navigation.goBack() }} onPress2={() => { props.navigation.navigate('Notification') }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', alignSelf: 'center' }}>
                <View style={{ width: '82%', height: 50, backgroundColor: '#fff', borderRadius: 10, marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={{ color: '#000', fontSize: 13, textAlign: 'center', fontWeight: '300' }}>{displaydate}</Text>
                    <TouchableOpacity onPress={() => { setopenDateModal(true) }}>
                        {/* <Image source={require('../../assets/images/Icons/calendra.png')} style={{ height: 25, width: 25, resizeMode: 'stretch', alignSelf: 'center' }}></Image> */}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ width: 60, height: 50, backgroundColor: Color.Primary_Green, justifyContent: 'center', borderRadius: 10, marginTop: 15 }}
                    onPress={() => {
                        getHome(new Date(), 'date')
                        //setclick1(DATA2[0])
                        // setdisplaydate('Choose Date')
                    }}>
                    <Text style={{ color: '#fff', fontSize: 13, textAlign: 'center', fontWeight: '700' }}>Clear</Text>
                </TouchableOpacity>
            </View>


            <View style={{
                alignItems: 'center',
                justifyContent: 'center', flex: 1
            }}>
                <View style={{ width: '100%', height: 45, position: 'absolute', backgroundColor: '#fff', zIndex: 999, top: 4 }} />

                <EventCalendar
                    eventTapped={eventClicked}
                    // Function on event press
                    events={events}
                    // Passing the Array of event
                    width={dimensions.SCREEN_WIDTH}
                    // Container width
                    size={60}
                    renderEvent={(events) => {
                        console.log('=================hhhh===================');
                        console.log(events);
                        console.log('====================================');
                        return (

                            <TouchableOpacity style={{
                                width: '98%', borderRadius: 4, alignSelf: 'center',
                                backgroundColor: '#fff',
                                shadowColor: '#000',
                                shadowRadius: 2,
                                shadowOpacity: 0.2,
                                elevation: 3,
                                paddingVertical: 10, marginTop: 9
                            }}
                            // onPress={() => {
                            //     props.navigation.navigate('ServiceDetails', { data: data, selectedDate: displaydate })
                            // }}
                            >
                                <TouchableOpacity style={{ width: '100%', alignSelf: 'center', height: 'auto' }}
                                // onPress={() => {
                                //     props.navigation.navigate('ServiceDetails', { data: data, selectedDate: displaydate })
                                // }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.72, alignSelf: 'center' }}>
                                        <View style={styles.circleView}>
                                            <MyText
                                                text={'CG'}
                                                fontFamily="Roboto"
                                                fontWeight='500'
                                                fontSize={14}
                                                textColor={Color.PRIMARY}
                                                style={{ alignSelf: 'center' }}

                                            />

                                        </View>
                                        <MyText
                                            text={'Jane Doe (Admin)'}
                                            fontFamily="Roboto"
                                            fontWeight='bold'
                                            fontSize={14}
                                            textColor={Color.LIGHT_BLACK}
                                            style={{ alignSelf: 'center' }}

                                        />
                                        <View style={styles.buttonBi}>
                                            <MyText
                                                text={'Bi- Montly'}
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
                                            text={'Goal Setting & Achieving'}
                                            fontFamily="Roboto"
                                            fontWeight='500'
                                            fontSize={14}
                                            textColor={Color.LIGHT_BLACK}
                                            style={{}}

                                        />
                                        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                            <SavedBook></SavedBook>
                                            <MyText
                                                text={'Module 3'}
                                                fontFamily="Roboto"
                                                fontWeight='400'
                                                fontSize={13}
                                                textColor={Color.LIGHT_BLACK}
                                                style={{ marginHorizontal: 6 }}

                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row', }}>
                                            <OnGoing></OnGoing>
                                            <MyText
                                                text={'12 Mar, 09:30 Am'}
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
                                    <View style={{ marginHorizontal: 10, flexDirection: 'row' }}>
                                        <Zoom height={22} ></Zoom>
                                        <MyText
                                            text={'Join Zoom Meeting'}
                                            fontFamily="Roboto"
                                            fontWeight='400'
                                            fontSize={13}
                                            textColor={'#3DA1E3'}
                                            style={{}}

                                        />
                                    </View>
                                </TouchableOpacity>

                            </TouchableOpacity>

                        )
                    }}
                    // number of date will render before and after initDate
                    // (default is 30 will render 30 day before initDate
                    // and 29 day after initDate)
                    // initDate={apiDate}
                    // Show initial date (default is today)
                    scrollToFirst
                // Scroll to first event of the day (default true)
                />
            </View>


            {/* <View style={{width:100,height:800}} /> */}
            {/* </ScrollView> */}
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
            {/* </View>*/}
            {/* {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null} */}
            {/* {loading ? <Loader /> : null} */}
        </SafeAreaView>
    )
}

export default Schedule







