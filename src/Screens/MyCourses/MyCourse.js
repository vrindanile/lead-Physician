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
import { dimensions } from '../../Global/Color';
import SearchWithIcon from '../../Components/SearchWithIcon/SearchWithIcon';

import { useIsFocused } from "@react-navigation/native";
//import : custom components
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText/MyText';
import Bat from '../../Global/Images/bat.svg'
import Ongoing from '../../Global/Images/clock.svg'
import Pending from '../../Global/Images/timer.svg'
import Completed from '../../Global/Images/completedCourse.svg'
import { styles } from './MyCourseStyle';
// import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties

import Toast from 'react-native-toast-message';
//import : global
import Color from '../../Global/Color';
//import : styles

//import : modal
import Loader from '../../Components/Loader';
//import : redux
import { connect, useSelector, useDispatch } from 'react-redux';
//import api
import { GET_PROFILE, postApiWithToken, LOGOUT, getApiWithToken, GET_MYCOURSES } from '../../Global/Service';
import { CommonActions } from '@react-navigation/core';
const physicianCourse = [{
    id: '1',
    title: 'Module 01',
    status: 'Completed'
},
{
    id: '2',
    title: 'Module 02',
    status: 'Ongoing'
},
{
    id: '3',
    title: 'Module 03',
    status: 'Pending'
},
{
    id: '4',
    title: 'Module 03',
    status: 'Pending'
},
{
    id: '5',
    title: 'Module 03',
    status: 'Pending'
},
]


// import {WebView} from 'react-native-webview';

const MyCourse = ({ navigation }) => {
    const dispatch = useDispatch();
    //variables
    const LINE_HEIGTH = 25;
    //variables : redux
    const userToken = useSelector(state => state.user.userToken);

    const [showLoader, setShowLoader] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [categoriesData, setCategoriesData] = useState([]);
    const [filteredcategoryData, setFilteredcategoryData] = useState([]);
    const [loading, setLoading] = useState('')
    const isFocus = useIsFocused()
    const [refreshing, setRefreshing] = useState(false);
    const [courses, setMyCourses] = useState([])
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
        // getCategories();
    };
    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };
    const onRefresh = React.useCallback(() => {
        // checkcon();
        wait(2000).then(() => {
            setRefreshing(false);
        });
    }, []);


    //get data for myCourses
    //get data for list
    const getCartCount = async () => {
        setLoading(true);
        try {
            const resp = await getApiWithToken(userToken, GET_MYCOURSES);
            console.log('get coursesss---->', resp?.data?.data);
            if (resp?.data?.status) {
                // setProfile(resp?.data?.data)
                setMyCourses(resp?.data?.data)

            } else {
                Toast.show({ text1: resp.data.message });
            }
        } catch (error) {
            console.log('error in getCartCount', error);
        }
        setLoading(false);
    };



    const RenderItemLead = ({ item }) => {
        console.log('thumbnail--->>', item.thumbnail);
        return (
            <TouchableOpacity style={styles.teamView}
                onPress={() => {
                    navigation.navigate('CourseDetail', { id: item.id })
                }}
            >
                <View style={styles.circularBackground}>
                    {/* <Bat style={{ alignSelf: 'center' }}></Bat> */}
                    <Image source={{ uri: item?.thumbnail }} style={{ height: 66, width: 66, resizeMode: 'cover', borderRadius: 100, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}></Image>
                </View>
                <View style={{ marginTop: 28 }}>
                    <MyText text={item.title} fontWeight='400' fontSize={14} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ textAlign: 'center', }} />
                    {/* <View style={styles.statusView}>
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
                    </View> */}
                </View>
            </TouchableOpacity >
        )
    }
    //UI
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={Color.LIGHT_BLACK} />
            <View style={{
                flex: 1,
                backgroundColor: '#F7FAEB',
            }}>
                <MyHeader
                    Title={`My Courses`}
                    isBackButton
                />
                <View style={{
                    alignSelf: 'center', width: dimensions.SCREEN_WIDTH,
                    paddingTop: 0,
                    marginTop: -20,
                }}>
                    <SearchWithIcon
                        placeholder="Search by Title"
                        value={searchValue}
                        onChangeText={e => {
                            console.log('SearchWithIcon', e);
                            // setSearchValue(e);
                            // applyFilters2(e);
                        }}

                        //   icon={<Image source={require('assets/images/filter.png')} />}
                        style={{ marginTop: 10 }}
                    // showDot={isFilterApplied}
                    />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: '20%' }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    style={styles.mainView}>
                    <View style={{ alignSelf: 'center', width: dimensions.SCREEN_WIDTH, marginTop: 20, alignItems: 'center', justifyContent: 'center', }}>
                        <FlatList
                            horizontal={false}
                            data={courses}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={RenderItemLead}
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
                {loading ? <Loader /> : null}
                {/* <CustomLoader showLoader={showLoader} /> */}
            </View>
        </SafeAreaView>
    );
};
export default MyCourse

