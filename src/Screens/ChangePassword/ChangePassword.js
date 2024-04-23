
import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, tyleSheet, Button, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView, ImageBackground, PermissionsAndroid, } from 'react-native'
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
import Google from '../../Global/Images/googleIcon.svg';
import Facebook from '../../Global/Images/facebookLogo.svg'

const ChangePassword = ({ navigation }) => {
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
    const [lastName, setLastName] = useState('')
    const [emailid, setEmailid] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState('')
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')
    const [filePath, setFilePath] = useState('');
    const [showImageSourceModal, setShowImageSourceModal] = useState(false);
    const resetIndexGoToBottomTab = CommonActions.reset({
        index: 1,
        routes: [{ name: 'SignIn' }],
    });
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
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <MyHeader
                    Title={`Change Password`}
                    isBackButton
                />


                <View style={{
                    backgroundColor: 'white', width: '90%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>
                    <View style={{ marginTop: 12 }}>
                        <MyText text='Old Password' fontWeight='bold' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 6 }} />
                        <CustomTextBox
                            imageComponent={< Lock
                                width={24} height={24} />}
                            placeholder='Password'
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text)
                            }}
                            secureTextEntry={true}
                            style={{ color: 'black', }}
                            placeholderTextColor='black'

                        >
                        </CustomTextBox></View>

                    <View style={{ marginTop: 12 }}>
                        <MyText text='New Password' fontWeight='700' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 6 }} />
                        <CustomTextBox
                            imageComponent={< Lock
                                width={24} height={24} />}
                            placeholder='Password'
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text)
                            }}
                            secureTextEntry={true}
                            style={{ color: 'black', }}
                            placeholderTextColor='black'

                        >
                        </CustomTextBox></View>

                    <View style={{ marginTop: 12 }}>
                        <MyText text='Confirm password' fontWeight='700' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 6 }} />
                        <CustomTextBox
                            imageComponent={< Lock
                                width={24} height={24} />}
                            placeholder='Password'
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text)
                            }}
                            secureTextEntry={true}
                            style={{ color: 'black', }}
                            placeholderTextColor='black'

                        >
                        </CustomTextBox></View>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack('')

                        // signUpUser()
                    }} style={{ marginTop: 20 }}>
                        <CustomButtonBlue name="Save"></CustomButtonBlue>
                    </TouchableOpacity>


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
    myText: { fontFamily: 'Inter', fontWeight: '500', fontSize: 12, color: Color.BLACK },
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
    backgroundImg: { height: 333, width: dimensions.SCREEN_WIDTH, }
});
export default ChangePassword;
