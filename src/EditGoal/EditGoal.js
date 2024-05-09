
import React, { useState, useEffect } from 'react';
import {
    Text, View, Image, ActivityIndicator, tyleSheet, Button, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView, ImageBackground, PermissionsAndroid, FlatList

} from 'react-native'
import moment from 'moment';
import { styles } from './EditGoalStyle';
import { SET_GOAL, postApiWithToken, getApiWithToken, GOAL_DETAIL, requestPostApi, GOAL_UPDATE } from '../Global/Service'
import { useDispatch } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MyText from '../Components/MyText/MyText';
import Toast from 'react-native-toast-message';
import Loader from '../Components/Loader';
import axios from 'axios';
import MyAlert from '../Global/MyAlert';

import Color from '../Global/Color';
import { dimensions } from '../Global/Color';

import { CommonActions } from '@react-navigation/native';
// svg image

import MyHeader from '../Components/MyHeader/MyHeader';
import CalendarImg from '../Global/Images/calendarWhite.svg'

import { Calendar } from 'react-native-calendars';
import { connect, useSelector } from 'react-redux';
const EditGoal = ({ navigation, route }) => {
    const H = Dimensions.get('screen').height;
    const W = Dimensions.get('screen').width;
    const [multiLineText, setMultiLineText] = useState('');
    const userToken = useSelector(state => state.user.userToken);
    console.log('my iser token--->>', userToken);
    const userInfo = useSelector(state => state.user.userInfo);
    const dispatch = useDispatch();
    const countryCodes = [
        { code: '+1', label: 'United States' },
        { code: '+44', label: 'United Kingdom' },
        { code: '+91', label: 'India' },
        // Add more country codes as needed
    ];
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0].code);
    const [fullname, setFullname] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailid, setEmailid] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState('')
    const [activeItem, setActiveItem] = useState('')
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')
    const [filePath, setFilePath] = useState('');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [task, setTask] = useState('')
    const [goal, setGoal] = useState('')
    const [activeIndex, setActiveIndex] = useState(null); // State to track active item index
    const [goalSix, setGoalSix] = useState('')
    const [goalOneYear, setGoalOneYear] = useState('')
    const [accountabilityPartner, setAccountabilityPartner] = useState('')
    const [showImageSourceModal, setShowImageSourceModal] = useState(false);
    const resetIndexGoToBottomTab = CommonActions.reset({
        index: 1,
        routes: [{ name: 'SignIn' }],
    });
    const physicianCourse = [{
        id:
            '1',
        title: 'A-Type Goals'
    },
    {
        id:
            '2',
        title: 'B-Type Goals'
    }]
    useEffect(() => {
        getCartCount()
        console.log('klklkl new uiui--->>', route?.params?.id);
    }, []);
    // Function to handle item press
    const handleItemPress = (index, item) => {
        { console.log('my seletcted item---->>', item) }
        setActiveIndex(index); // Set active item index
        setActiveItem(item)
    };
    const RenderSchdule = ({ item, index }) => {
        console.log('my renderschdule-->>', item);
        const backgroundColor = item.title === activeItem ? Color.PRIMARY : 'white';
        const text = item.title === activeItem ? 'white' : Color.PRIMARY;

        return (
            <TouchableOpacity style={[styles.groupView, { backgroundColor }]}
                onPress={() => handleItemPress(index, item.title)} // Call handleItemPress on press
            >
                <MyText text={item.title} fontWeight='600' fontSize={16} textColor={text} fontFamily='Roboto' style={{}} />
            </TouchableOpacity >
        )
    }
    const Validation = () => {
        { console.log('my selected dte>>>>>---->.', activeItem) }
        if (String(multiLineText).trim().length === 0) {
            Toast.show({ type: 'error', text1: 'Please enter C-Type goal statement' });
            return false;

        } else if (selectedDate === null) {
            Toast.show({ type: 'error', text1: 'Please enter the date when you will achieve this goal' });
            return false;
        }
        else if (task === '') {
            Toast.show({ type: 'error', text1: 'Please enter the details you will be needing to reach this goal' });
            return false;
        } else if (activeItem === '') {
            Toast.show({ text1: 'Please enter the steps to achieve the goal' });
            return false;
        } else if (goal == '') {
            Toast.show({ text1: 'Please enter what wil you accomplish in one year' });
            return false;
        }
        else if (goalSix == '') {
            Toast.show({ text1: 'Please enter what wil you accomplish in six month' });
            return false;
        }
        else if (goalOneYear == '') {
            Toast.show({ text1: 'Please enter what wil you accomplish in one year' });
            return false;
        }
        else if (accountabilityPartner == '') {
            Toast.show({ text1: 'Please enter your accountability partner' });
            return false;
        }
        return true;
    };

    const signUpUser = async () => {
        if (!Validation()) {
            return;
        }
        var url = GOAL_UPDATE
        var murl = `/` + route?.params?.id
        url = url + murl
        try {
            const data = {
                goal_statement: multiLineText,
                achieve_date: selectedDate,
                goal_for_me: task,
                goal_type: activeItem,
                six_month_milestones: goalSix,
                one_month_milestones: goal,
                one_year_goal: goalOneYear,
                accountability_partner: accountabilityPartner
            }
            setLoading(true);

            setLoading(true);
            // console.log('my uiuiui--->>', data)

            const resp = await requestPostApi(url, data, 'PUT', userToken);
            console.log('my respinseee--->>', resp?.responseJson?.status);
            if (resp?.responseJson?.status === true) {
                // Handle successful response
                Toast.show({ text1: resp?.responseJson?.message });
                navigation.goBack()
                // navigation.dispatch(resetIndexGoToBottomTab);
            } else {
                console.log('my response for signup?????--->>', resp)
                Toast.show({ text1: resp?.responseJson?.message });
                // Handle error response
            }
        } catch (err) {

            console.log('error in signUpUser ioioi---->>>', err);
        }
        setLoading(false);
    };
    const getCartCount = async () => {
        setLoading(true);
        var url = GOAL_DETAIL
        var id = `/` + route?.params?.id
        url = url + id
        try {
            const resp = await getApiWithToken(userToken, url);
            console.log('my new goals details-->>', resp?.data?.data);

            if (resp?.data?.status) {
                // SetGoal(resp?.data?.data)
                setMultiLineText(resp?.data?.data?.goal_statement)
                setSelectedDate(resp?.data?.data?.achieve_date)
                setTask(resp?.data?.data?.goal_for_me)
                setActiveItem(resp?.data?.data?.goal_type)
                setGoal(resp?.data?.data?.one_month_milestones)
                setGoalSix(resp?.data?.data?.six_month_milestones)
                setGoalOneYear(resp?.data?.data?.one_year_goal)
                setAccountabilityPartner(resp?.data?.data?.accountability_partner)

            } else {
                Toast.show({ text1: resp.data.message });
            }
        } catch (error) {
            console.log('error in getCartCount', error);
        }
        setLoading(false);
    };
    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };
    const handleDayPress = day => {
        setSelectedDate(day.dateString);
        toggleCalendar(); // Close calendar after selecting a date
    };
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <MyHeader
                    Title={`Edit Your Goal`}
                    isBackButton
                />


                <View style={{
                    backgroundColor: 'white', width: '90%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>
                    <View style={{ marginTop: 22 }}>
                        <MyText text='My C-Type Goal Statement' fontWeight='bold' fontSize={16} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />

                        <TextInput
                            style={styles.input}
                            multiline={true}
                            numberOfLines={4} // You can ad <Text style={styles.placeholder}>Type here...</Text>
                            placeholder="Type here..."
                            value={multiLineText}
                            onChangeText={text => setMultiLineText(text)}
                            textAlignVertical="top"
                        />
                    </View>

                    <View style={{ marginTop: 26 }}>
                        <MyText text='When will I Achieve This?' fontWeight='700' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />
                        <TouchableOpacity style={styles.calendarView} onPress={toggleCalendar}>
                            <Text
                                style={{


                                    marginHorizontal: 14,
                                    color: Color.BLACK,
                                }}>
                                {selectedDate === null ? '' : moment(selectedDate).format('MM/DD/YYYY')}
                            </Text>
                            <View style={styles.calendarImg}>

                                <CalendarImg style={{ alignSelf: 'center' }}></CalendarImg>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {console.log('my time calendar----->>>>', isCalendarOpen)}
                    {isCalendarOpen && (
                        <Calendar
                            style={{
                                borderWidth: 1,
                                borderColor: 'gray',
                                height: 350,
                            }}
                            markingType="custom"
                            theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: Color.LIGHT_BLACK,
                                selectedDayBackgroundColor: Color.PRIMARY,
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: Color.PRIMARY,
                                dayTextColor: Color.LIGHT_BLACK,
                                textDisabledColor: 'grey',
                            }}
                            onDayPress={handleDayPress}
                            markedDates={{
                                [selectedDate]: {
                                    selected: true,
                                    disableTouchEvent: true,
                                    customStyles: {
                                        container: {
                                            backgroundColor: Color.PRIMARY,
                                            borderRadius: 6, // Adjust the border radius for a square shape
                                            cursor: 'pointer', // Change cursor shape to pointer
                                        },
                                        text: {
                                            color: 'white',
                                        },
                                    },
                                },
                            }}
                        />
                    )}
                    <View style={{ marginTop: 26 }}>
                        <MyText text='What Will It Take For Me To Get This Done?' fontWeight='700' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            numberOfLines={4} // You can ad <Text style={styles.placeholder}>Type here...</Text>
                            placeholder="Type here..."
                            value={task}
                            onChangeText={text => setTask(text)}
                            textAlignVertical="top"
                        />
                    </View>
                    <View style={{ marginTop: 26 }}>
                        <MyText text='What steps Will I Take To Get There Now?' fontWeight='700' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />
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
                    <View style={{ marginTop: 26 }}>
                        <MyText text='In One Month , I Will Accomplish' fontWeight='700' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            numberOfLines={4} // You can ad <Text style={styles.placeholder}>Type here...</Text>
                            placeholder="Type here..."
                            value={goal}
                            onChangeText={text => setGoal(text)}
                            textAlignVertical="top"
                        />
                    </View>
                    <View style={{ marginTop: 26 }}>
                        <MyText text='In Six Month , I Will Accomplish' fontWeight='700' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            numberOfLines={4} // You can ad <Text style={styles.placeholder}>Type here...</Text>
                            placeholder="Type here..."
                            value={goalSix}
                            onChangeText={text => setGoalSix(text)}
                            textAlignVertical="top"
                        />
                    </View>
                    <View style={{ marginTop: 26 }}>
                        <MyText text='In One Year , I Will Accomplish' fontWeight='700' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            numberOfLines={4} // You can ad <Text style={styles.placeholder}>Type here...</Text>
                            placeholder="Type here..."
                            value={goalOneYear}
                            onChangeText={text => setGoalOneYear(text)}
                            textAlignVertical="top"
                        />
                    </View>
                    <View style={{ marginTop: 26 }}>
                        <MyText text='My Accountability Partner Is:' fontWeight='700' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            numberOfLines={4} // You can ad <Text style={styles.placeholder}>Type here...</Text>
                            placeholder="Type here..."
                            value={accountabilityPartner}
                            onChangeText={text => setAccountabilityPartner(text)}
                            textAlignVertical="top"
                        />
                    </View>
                    <View style={{ marginTop: 26 }}>

                    </View>

                </View>

                {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
            </ScrollView>
            <View style={{ height: 100, width: '100%', backgroundColor: '#F7FAEB', borderTopRightRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderColor: Color.PRIMARY, justifyContent: 'center' }}>
                <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH * 0.80, height: 50, backgroundColor: Color.PRIMARY, alignSelf: 'center', borderRadius: 10, justifyContent: 'center' }} onPress={() => { signUpUser() }}>
                    <MyText text='Save & Set Your Goal' fontWeight='700' fontSize={14} textColor={Color.WHITE} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
                {/* Content for the bottom view */}
            </View>

            {loading ? <Loader /> : null}

        </SafeAreaView >


    )
}

export default EditGoal;
