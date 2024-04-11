
import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, tyleSheet, Button, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import Toast from 'react-native-toast-message';
import Loader from '../../Components/Loader';

import MyAlert from '../../Global/MyAlert';
import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomTextBox from '../../Components/CustomTextBox';
import Color from '../../Global/Color';
import { dimensions } from '../../Global/Color';
// svg image
import Lock from '../../Global/Images/lock.svg';
import Profile from '../../Global/Images/profileCircle.svg';
import EmailSvg from '../../Global/Images/sms.svg';
import eye from '../../Global/Images/eye.svg';
import Call from '../../Global/Images/call.svg'
import CustomHeader from '../../Components/CustomHeader';
import Google from '../../Global/Images/googleIcon.svg';
import Facebook from '../../Global/Images/facebookLogo.svg'
const Signup = ({ navigation }) => {
    const H = Dimensions.get('screen').height;
    const W = Dimensions.get('screen').width;
    const countryCodes = [
        { code: '+1', label: 'United States' },
        { code: '+44', label: 'United Kingdom' },
        { code: '+91', label: 'India' },
        // Add more country codes as needed
    ];
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0].code);
    const [fullname, setFullname] = useState('')
    const [emailid, setEmailid] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState('')
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <CustomHeader navigation={navigation} text="Sign Up" />
                <View style={{
                    backgroundColor: 'white', width: '90%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>
                    <View style={{ marginTop: 40 }}>
                        <CustomTextBox
                            imageComponent={<Profile width={24} height={24} />}
                            // value={value}
                            // secureTextEntry={secureTextEntry}
                            // onChangeText={onChangeText}
                            placeholder={'Name'}
                            style={{ marginHorizontal: 12 }}
                        />

                    </View>
                    <View style={{ marginTop: 12 }}>
                        <CustomTextBox
                            imageComponent={<EmailSvg width={24} height={24} />}
                            //  placeholder='Email address'
                            // value={emailid}
                            // onChangeText={(text) => {
                            //     setEmailid(text)
                            // }}
                            placeholder={'Email Address'}
                        >
                        </CustomTextBox></View>
                    <View style={{ marginTop: 12 }}>
                        <CustomTextBox
                            imageComponent={<Call width={24} height={24} />}
                            //  placeholder='Email address'
                            // value={emailid}
                            // onChangeText={(text) => {
                            //     setEmailid(text)
                            // }}
                            placeholder={'Phone'}
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
                        navigation.navigate('Subscription')

                        // signupPressed()
                    }} style={{ marginTop: 20 }}>
                        <CustomButtonBlue name="Sign Up"></CustomButtonBlue>
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'center', marginTop: 10, flexDirection: 'row' }}>
                        <Text style={styles.myText}>Already have an account?
                        </Text>
                        <TouchableOpacity style={{ marginLeft: 3 }} onPress={() => { navigation.navigate('SignIn') }}>
                            <Text style={styles.textunderline}>Sign In</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 16, alignSelf: 'center' }}>
                        <View style={styles.line}>
                        </View>
                        <Text style={styles.txt}>OR</Text>
                        <View style={styles.line}>
                        </View>

                    </View>
                    <View style={{ marginBottom: 90, alignSelf: 'center', marginTop: 30, width: dimensions.SCREEN_WIDTH * 0.80 }}>
                        <View style={styles.socialView}>
                            <Google> </Google>
                            <Text style={styles.socialTxt}>Signup With Google</Text>
                        </View>
                        <View style={[styles.socialView, { marginTop: 12 }]}>
                            <Facebook> </Facebook>
                            <Text style={styles.socialTxt}>Signup With Google</Text>
                        </View>

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
    }
});
export default Signup;
