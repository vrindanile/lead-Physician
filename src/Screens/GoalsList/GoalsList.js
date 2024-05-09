//import : react components
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    ScrollView,
    Switch,
    TouchableOpacity,
    Dimensions,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    Alert,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    RefreshControl
} from 'react-native';
import { useIsFocused } from "@react-navigation/native";

import moment from 'moment';
import { dimensions } from '../../Global/Color';
import SearchWithIcon from '../../Components/SearchWithIcon/SearchWithIcon';
import { connect, useSelector } from 'react-redux';
//import : custom components
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText/MyText';
import Bat from '../../Global/Images/bat.svg'
import Ongoing from '../../Global/Images/clock.svg'
import Pending from '../../Global/Images/timer.svg'
import Completed from '../../Global/Images/completedCourse.svg'
import { styles } from './GoalsListStyle';

import { getApiWithToken, GET_GOAL, postApiWithToken, DELETE_GOAL, requestPostApi } from '../../Global/Service';
import Loader from '../../Components/Loader';
// import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties

import Toast from 'react-native-toast-message';
//import : global
import Color from '../../Global/Color';
//import : styles

//import : modal
//import : redux
//import svg
import Mycourse from '../../Global/Images/courses.svg'
import Resume from '../../Global/Images/playCircle.svg'
import Delte from '../../Global/Images/trash.svg'

const physicianCourse = [{
    id: '1',
    title: 'Leg joints',
    status: 'Completed'
},
{
    id: '2',
    title: 'Muscle repture',
    status: 'Ongoing'
},
{
    id: '3',
    title: 'Knee aligment',
    status: 'Pending'
},
{
    id: '4',
    title: 'Disloacted bones',
    status: 'Pending'
},

]

// import {WebView} from 'react-native-webview';

const GoalsList = ({ navigation }) => {
    //variables
    const LINE_HEIGTH = 25;
    const isFocus = useIsFocused()
    //variables : redux
    const userToken = useSelector(state => state.user.userToken);

    const [loading, setLoading] = useState('')
    const [goal, SetGoal] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(true);
            getCartCount()
            setLoading(false);
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [isFocus]);
    const checkcon = () => {
        getCartCount();
    };
    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };
    const onRefresh = React.useCallback(() => {
        checkcon();
        wait(2000).then(() => {
            setRefreshing(false);
        });
    }, []);
    //ui for flaList
    const RenderItemLead = ({ item }) => {
        return (
            <View style={[styles.viewContainer, { backgroundColor: 'white' }]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.roundView}>
                        <Mycourse width={27} height={27} style={{ alignSelf: 'center' }}></Mycourse>

                    </View>
                    <MyText
                        text={item.goal_statement}
                        fontWeight="bold"
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        fontFamily="Roboto"
                        marginHorizontal={12}
                        style={{

                            alignSelf: 'center',

                        }}
                    />
                </View>
                <View style={styles.subHeadView}>
                    <MyText
                        text={`Goal Type: ${item.goal_type}`}
                        fontWeight="bold"
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        fontFamily="Roboto"

                        style={{
                        }}
                    />
                    <MyText
                        text={
                            // moment(item?.achieve_date).format('MM/DD/YYYY')
                            item?.achieve_date
                        }
                        fontWeight="400"
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        fontFamily="Roboto"
                        marginHorizontal={12}
                        style={{

                            alignSelf: 'center',

                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity style={[styles.actionButtonView,]} onPress={() => { ondelte(item.id) }}>
                        <Delte></Delte>
                        {/* Remove */}
                        <MyText
                            text={'Delete'}
                            fontWeight="500"
                            fontSize={14}
                            textColor={Color.WHITE}
                            fontFamily="Roboto"
                            marginHorizontal={12}
                            style={{

                                alignSelf: 'center',

                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButtonView, { backgroundColor: Color.PRIMARY, marginLeft: -5 }]} onPress={() => { navigation.navigate('EditGoal', { id: item.id }) }}>

                        <Resume></Resume>
                        <MyText
                            text={'Edit'}
                            fontWeight="500"
                            fontSize={14}
                            textColor={Color.WHITE}
                            fontFamily="Roboto"
                            marginHorizontal={12}
                            style={{

                                alignSelf: 'center',

                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
    //get data for list
    const getCartCount = async () => {
        setLoading(true);
        try {
            const resp = await getApiWithToken(userToken, GET_GOAL);
            console.log('getCartCount resp', resp?.data?.data);
            if (resp?.data?.status) {
                SetGoal(resp?.data?.data)
            } else {
                Toast.show({ text1: resp.data.message });
            }
        } catch (error) {
            console.log('error in getCartCount', error);
        }
        setLoading(false);
    };

    //delete goals
    const ondelte = async (id) => {
        setLoading(true);

        var endPoint = DELETE_GOAL
        if (id != '') {
            var id = `/` + id
        }
        endPoint = endPoint + id
        console.log('onLike endPoint', endPoint);
        try {
            const resp = await requestPostApi(

                endPoint,
                '',
                'DELETE',
                userToken


            );
            console.log('onLike resp', resp?.responseJson?.message);
            if (resp?.responseJson?.status) {
                Toast.show({ text1: resp?.responseJson?.message });
                getCartCount();
            } else {
                Toast.show({ text1: resp?.responseJson?.message });
            }
        } catch (error) {
            console.log('error in onLike', error);
        }
        setLoading && setLoading(false);
    };
    //UI
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={Color.LIGHT_BLACK} />
            <View style={{
                flex: 1,
                backgroundColor: '#F7FAEB',
            }}>
                <MyHeader
                    Title={`My Goals`}
                    isBackButton
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: '20%' }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    style={{}}>
                    <View style={{ marginTop: 10 }}>
                        <FlatList
                            horizontal={false}
                            data={goal}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={RenderItemLead}
                            ListEmptyComponent={() => (
                                <View
                                    style={{

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
                    </View>

                </ScrollView>
                {/* <CustomLoader showLoader={showLoader} /> */}
            </View>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
};
export default GoalsList

