
import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, tyleSheet, Button, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import Toast from 'react-native-toast-message';
import Loader from '../../Components/Loader';
import MyText from '../../Components/MyText/MyText';
import MyAlert from '../../Global/MyAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomTextBox from '../../Components/CustomTextBox';
import Color from '../../Global/Color';
import { dimensions } from '../../Global/Color';
import { requestPostApi, LOGIN } from '../../Global/Service';
import { CommonActions } from '@react-navigation/native';
// svg image
import { useDispatch } from 'react-redux';
import Lock from '../../Global/Images/lock.svg';
import Profile from '../../Global/Images/profileCircle.svg';
import EmailSvg from '../../Global/Images/sms.svg';
import eye from '../../Global/Images/eye.svg';
import Call from '../../Global/Images/call.svg'
import CustomHeader from '../../Components/CustomHeader';
import { setUser, setUserToken } from '../../reduxToolkit/reducer/user';
import Logo from '../../Global/Images/logo.svg'
const SignIn = ({ navigation }) => {
    const H = Dimensions.get('screen').height;
    const W = Dimensions.get('screen').width;
    const dispatch = useDispatch();
    const countryCodes = [
        { code: '+1', label: 'United States' },
        { code: '+44', label: 'United Kingdom' },
        { code: '+91', label: 'India' },
        // Add more country codes as needed
    ];
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0].code);
    const [fullname, setFullname] = useState('')
    const [emailid, setEmailid] = useState('ssuser@gmail.com')
    const [phoneno, setPhoneno] = useState('')
    const [password, setPassword] = useState('123456789')
    const [loading, setLoading] = useState('')
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')
    const resetIndexGoToBottomTab = CommonActions.reset({
        index: 1,
        routes: [{ name: 'BottomTab' }],
    });
    const LoginPressed = async () => {
        var EmailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]*)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
        if (emailid == '') {
            Toast.show({ type: 'error', text1: 'Enter Email ID' });
        } else if (!EmailReg.test(emailid)) {
            Toast.show({ type: 'error', text1: 'Enter Valid Email ID' });
        } else if (password == '') {
            Toast.show({ type: 'error', text1: 'Enter Password' });
        } else {
            setLoading(true);
            var data = {
                email: emailid.trim(),
                password: password,
            };
            const { responseJson, err } = await requestPostApi(LOGIN, data, 'POST', '');
            console.log('login?????????', responseJson.authorization.token);
            if (responseJson.status === true) {

                console.log('sign in jsonValue', responseJson.user);
                await AsyncStorage.setItem('userToken', responseJson.authorization.token);
                const jsonValue = JSON.stringify(responseJson.user);
                console.log('sign in jsonValue', jsonValue);
                await AsyncStorage.setItem('userInfo', jsonValue);
                console.log('sign in --------nValue', responseJson.authorization.token);
                dispatch(setUserToken(responseJson.authorization.token));
                console.log('after dispath');
                dispatch(setUser(responseJson.user));
                setLoading(false)
                navigation.dispatch(resetIndexGoToBottomTab);
            } else {
                console.log('login????????? come in catck block', responseJson.message);
                console.log('the err==>>', responseJson.message);
                setalert_sms(responseJson.message);
                setMy_Alert(true);
            }
        }
    };
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}

            >
                <CustomHeader navigation={navigation} text="Sign In" />
                <View style={{
                    backgroundColor: 'white', width: '90%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>
                    <Logo width={300} height={100} style={{ alignSelf: 'center', marginVertical: 30 }} ></Logo>


                    <View style={{ marginTop: 10 }}>
                        <CustomTextBox
                            imageComponent={<EmailSvg width={24} height={24} />}
                            //  placeholder='Email address'
                            value={emailid}
                            onChangeText={(text) => {
                                setEmailid(text)
                            }}
                            placeholder={'Email Address'}
                        >
                        </CustomTextBox></View>

                    <View style={{ marginTop: 12 }}>
                        <CustomTextBox
                            imageComponent={< Lock
                                width={24} height={24} />}
                            placeholder='Password'
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text)
                            }}
                            secureTextEntry={true}
                            style={{ color: 'black', backgroundColor: 'red' }}
                            placeholderTextColor='black'

                        >
                        </CustomTextBox></View>
                    <TouchableOpacity onPress={() => {
                        console.log('did i reach here');
                        navigation.navigate('BottomTab')
                    }}>
                        <MyText text='Forgot Password?' fontWeight='normal' fontSize={12} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ fontWeight: '400', textAlign: 'right', marginVertical: 13 }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        LoginPressed()
                    }} style={{ marginTop: 20 }}>
                        <CustomButtonBlue name="Login"></CustomButtonBlue>
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'center', marginTop: '14%', flexDirection: 'row' }}>
                        <Text style={styles.myText}>Don’t have an account?
                        </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Signup') }}>
                            <Text style={[styles.myText, { color: Color.PRIMARY }]}> Signup
                            </Text>
                        </TouchableOpacity>

                    </View>



                </View>

                {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
            </ScrollView>


            {loading ? <Loader /> : null}
        </SafeAreaView >


    )
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        flexDirection: 'row',
        width: '90%'
    },
    text: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 14,
        color: '#000000'
    },
    myText: { fontFamily: 'Inter', fontWeight: '400', fontSize: 13, color: Color.LIGHT_BLACK },
    textunderline: { fontFamily: 'Inter', fontWeight: '500', fontSize: 12, color: Color.PRIMARY, },
    ////styles const name = new type(arguments);
    body: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#132A3A',
        padding: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    shape: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: 1000,
        height: 1000,
        flexDirection: 'row',
        bottom: 0,
        transform: [{ rotate: '45deg' }],
        bottom: -450,
        left: -302,
        right: 0,
        borderRadius: 80,
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    content: {
        position: 'relative',
        zIndex: 9,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    txt: {
        fontWeight: '400',
        fontSize: 13,
        color: '#132A3A',
        fontFamily: 'Roboto', paddingHorizontal: 12
    },
    line: { width: dimensions.SCREEN_WIDTH * 0.40, height: 1, backgroundColor: Color.BLACK, top: 8, },
    socialTxt: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '500',
        color: Color.LIGHT_BLACK, marginHorizontal: 10
    },
    socialView: {
        flexDirection: 'row',
        width: dimensions.SCREEN_WIDTH * 0.90,
        height: 60,
        borderRadius: 5,
        backgroundColor: Color.WHITE,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.13,
        shadowRadius: 13,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(247, 250, 235, 1)',
        elevation: 10
    },
    logoStyle: {
        width: 200,
        height: 100,
        marginTop: 30,
        alignSelf: 'center'
    }
});
export default SignIn;
