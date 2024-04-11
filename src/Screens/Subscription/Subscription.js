
import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, tyleSheet, Button, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView, ImageBackground } from 'react-native'
import Toast from 'react-native-toast-message';
import { styles } from './SubscriptionStyle';
import Loader from '../../Components/Loader';
import MyText from '../../Components/MyText/MyText';
import MyAlert from '../../Global/MyAlert';
import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomTextBox from '../../Components/CustomTextBox';
import Color from '../../Global/Color';
import { dimensions } from '../../Global/Color';
import AppIntroSlider from 'react-native-app-intro-slider';
import CustomHeader from '../../Components/CustomHeader';
// svg image
import Tick from '../../Global/Images/subscriptionTick.svg'
const Subscription = ({ navigation }) => {
    const H = Dimensions.get('screen').height;
    const W = Dimensions.get('screen').width;
    const countryCodes = [
        { code: '+1', label: 'United States' },
        { code: '+44', label: 'United Kingdom' },
        { code: '+91', label: 'India' },
        // Add more country codes as needed
    ];
    const banner = [
        {
            id: '1',
            img: require('../../Global/Images/silverMembership.png'),
            price: '$9.99',
            type: `Silver Membership`,
            list: [{
                id: '1',
                title: 'Course with all modules '
            },

            { id: '2', title: 'All Worksheets' },
            ]
        },
        {
            id: '2',
            img: require('../../Global/Images/goldMembership.png'),
            price: '$20.10',
            type: `Gold Membership`,
            list: [{
                id: '1',
                title: 'Course with all modules ',
                title: 'All Worksheets'
            },
            { id: '3', title: 'Scheduler' },
            { id: '4', title: 'Group Chat' },
            { id: '5', title: 'Chat Module' },
            ]
        },
        {
            id: '3',
            img: require('../../Global/Images/PlataniumMembership.png'),
            price: '$15.99',
            type: 'Platinum Membership',
            list: [{
                id: '1',
                title: 'Course with all modules ',
                title: 'All Worksheets'
            },
            { id: '3', title: 'Scheduler' },

            ]
        }
    ]
    const renderNextButton = () => null
    const renderDoneButton = () => null;

    const RenderItem = ({ item }) => {
        console.log('item slider----->', item.cover_photo);
        return (
            <>
                <View
                    // onPress={() => {
                    //     navigation.navigate('Fundraiser', { slag: item.slug });
                    // }}
                    style={styles.mainView}>

                    <MyText text={item.price} fontWeight='bold' fontSize={28} textColor={Color.WHITE} fontFamily='Roboto' style={styles.textAbove} />
                    <View style={styles.hoverView}>
                        <MyText text={item.type} fontWeight='500' fontSize={18} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <View style={styles.listContainer}>
                            {item.list.map((listItem) => (
                                <View key={listItem.id} style={styles.listItem}>
                                    <Tick />
                                    <MyText
                                        text={listItem.title}
                                        style={{
                                            marginHorizontal: 10,
                                            fontWeight: '400',
                                            fontSize: 14,
                                            color: '#070F14',
                                            width: dimensions.SCREEN_WIDTH * 0.40
                                        }}
                                    />
                                </View>
                            ))}
                        </View>
                        <ImageBackground
                            source={item.img}
                            style={{
                                height: 100,
                                width: 100,
                                resizeMode: 'contain', marginVertical: 88,
                            }}
                        />
                    </View>



                </View>

            </>
        );
    };
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0].code);
    const [fullname, setFullname] = useState('')
    const [emailid, setEmailid] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState('')
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: Color.LIGHT_BLACK }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}

            >
                <CustomHeader navigation={navigation} text="Subscription" type={'subscription'} />
                <TouchableOpacity style={{ position: 'absolute', top: 36, right: 20, height: 36, width: 60, backgroundColor: 'white', borderRadius: 5, flexDirection: 'row', alignSelf: 'center' }}>
                    <MyText text='Skip' fontWeight='500' fontSize={14} textColor={'#070F14'} fontFamily='Roboto' style={{ alignSelf: 'center', marginHorizontal: 15 }} />
                </TouchableOpacity>
                <View style={{
                    backgroundColor: Color.LIGHT_BLACK, width: '95%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>
                    <MyText text='Subscription Plan' fontWeight='bold' fontSize={24} textColor={Color.PRIMARY} fontFamily='Roboto' style={{ alignSelf: 'center', marginBottom: 40 }} />

                    {/* <ScrollView
                        horizontal
                        contentContainerStyle={styles.mainDiv}>
                        {banner.map((item, index) => (
                            <RenderItem key={index} item={item} />
                        ))}
                    </ScrollView> */}
                    <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'center', height: 'auto' }}>
                        <AppIntroSlider
                            // data={sucessStories}
                            data={banner}
                            renderNextButton={renderNextButton}
                            renderDoneButton={renderDoneButton}
                            dotStyle={[styles.dotStylee]}
                            renderItem={RenderItem}
                            activeDotStyle={[styles.activeStylee]}
                        />
                    </View>
                    <TouchableOpacity style={{ backgroundColor: 'red', height: 50, width: 50, position: 'absolute', bottom: -20, width: dimensions.SCREEN_WIDTH * 0.80, height: 52, borderRadius: 5, backgroundColor: Color.PRIMARY, marginHorizontal: 18, justifyContent: 'center', alignSelf: 'center' }} onPress={() => { navigation.navigate('SubscriptionCard') }}>
                        <MyText text='Buy Now Plan' fontWeight='bold' fontSize={14} textColor={Color.WHITE} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>


                </View>

                {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
            </ScrollView>


            {loading ? <Loader /> : null}
        </SafeAreaView >


    )
}

export default Subscription;
