
import React, { useState, useEffect } from 'react';
import {
    Text, View, Image, ActivityIndicator, tyleSheet, Button, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView, ImageBackground, PermissionsAndroid, FlatList

} from 'react-native'
import moment from 'moment';
import { styles } from './SetGoalStyle';
import { requestPostApi, REGISTER, postAPI } from '../../Global/Service'
import { useDispatch } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MyText from '../../Components/MyText/MyText';
import Toast from 'react-native-toast-message';
import Loader from '../../Components/Loader';
import axios from 'axios';
import MyAlert from '../../Global/MyAlert';
import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomTextBox from '../../Components/CustomTextBox';
import Color from '../../Global/Color';
import { dimensions } from '../../Global/Color';
import SelectImageSource from '../../Modals/SelectImageSource';
import { CommonActions } from '@react-navigation/native';
// svg image
import Lock from '../../Global/Images/lock.svg';
import Profile from '../../Global/Images/profileCircle.svg';
import EmailSvg from '../../Global/Images/sms.svg';
import eye from '../../Global/Images/eye.svg';
import Call from '../../Global/Images/call.svg'
import CustomHeader from '../../Components/CustomHeader';
import MyHeader from '../../Components/MyHeader/MyHeader';
import CalendarImg from '../../Global/Images/calendarWhite.svg'
import Google from '../../Global/Images/googleIcon.svg';
import Facebook from '../../Global/Images/facebookLogo.svg'
import { Calendar } from 'react-native-calendars';
const SetGoal = ({ navigation }) => {
    const H = Dimensions.get('screen').height;
    const W = Dimensions.get('screen').width;
    const [multiLineText, setMultiLineText] = useState('');
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
    // Function to handle item press
    const handleItemPress = (index) => {
        setActiveIndex(index); // Set active item index
    };
    const RenderSchdule = ({ item, index }) => {
        const backgroundColor = index === activeIndex ? Color.PRIMARY : 'white';
        const text = index === activeIndex ? 'white' : Color.PRIMARY;

        return (
            <TouchableOpacity style={[styles.groupView, { backgroundColor }]}
                onPress={() => handleItemPress(index)} // Call handleItemPress on press
            >
                <MyText text={item.title} fontWeight='600' fontSize={16} textColor={text} fontFamily='Roboto' style={{}} />
            </TouchableOpacity >
        )
    }
    const Validation = () => {
        if (String(fullname).trim().length == 0) {
            Toast.show({ text1: 'Please enter Name' });
            return false;
        } else if (emailid == '') {
            Toast.show({ text1: 'Please enter Email Address' });
            return false;
        }
        else if (phoneno == '') {
            Toast.show({ text1: 'Please enter Phone Number' });
            return false;
        } else if (password == '' || password.length <= 8) {
            Toast.show({ text1: 'Please enter minimum 8 characters' });
            return false;
        } else if (password == '') {
            Toast.show({ text1: 'Please enter Password' });
            return false;
        }
        return true;
    };

    const signUpUser = async () => {
        if (!Validation()) {
            return;
        }
        try {
            const formaData = new FormData();
            const imageName = filePath?.uri?.slice(
                filePath?.uri?.lastIndexOf('/'),
                filePath?.uri?.length,
            );
            formaData.append('profile_image', {
                name: imageName,
                type: filePath?.type,
                uri: filePath?.uri,
            });
            formaData.append('first_name', fullname);
            formaData.append('last_name', 'iiii');
            formaData.append('email', emailid);
            formaData.append('phone', phoneno);
            formaData.append('password', password);
            setLoading(true);

            setLoading(true);
            console.log('my uiuiui--->>', formaData)

            const resp = await postAPI(REGISTER, formaData);
            console.log('my respinseee--->>', resp.status === true);
            if (resp.status === true) {
                // Handle successful response
                Toast.show({ text1: resp.response.message });
                console.log('my response for signup?????--->>', resp)
                navigation.dispatch(resetIndexGoToBottomTab);
            } else {
                console.log('my response for signup?????--->>', resp)
                Toast.show({ text1: resp.response.message });
                // Handle error response
            }
        } catch (err) {

            console.log('error in signUpUser ioioi---->>>', err);
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
                    Title={`Set Your Goal`}
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
                                {moment(selectedDate).format('MM/DD/YYYY')}
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
                <View style={{ width: dimensions.SCREEN_WIDTH * 0.80, height: 50, backgroundColor: Color.PRIMARY, alignSelf: 'center', borderRadius: 10, justifyContent: 'center' }}>
                    <MyText text='Save & Set Your Goal' fontWeight='700' fontSize={14} textColor={Color.WHITE} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
                </View>
                {/* Content for the bottom view */}
            </View>

            {loading ? <Loader /> : null}

        </SafeAreaView >


    )
}

export default SetGoal;
