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
//import : redux


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
    //variables
    const LINE_HEIGTH = 25;
    //variables : redux

    const [showLoader, setShowLoader] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [categoriesData, setCategoriesData] = useState([]);
    const [filteredcategoryData, setFilteredcategoryData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {

    }, []);
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
    const RenderItemLead = ({ item }) => {
        return (
            <TouchableOpacity style={styles.teamView}
                onPress={() => {
                    navigation.navigate('CourseDetail')
                }}
            >
                <View style={styles.circularBackground}>
                    <Bat style={{ alignSelf: 'center' }}></Bat>

                </View>
                <View style={{ marginTop: 28 }}>
                    <MyText text={item.title} fontWeight='400' fontSize={14} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ textAlign: 'center', }} />
                    <View style={styles.statusView}>
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
                    </View>
                </View>
            </TouchableOpacity>
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
                            data={physicianCourse}
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
                {/* <CustomLoader showLoader={showLoader} /> */}
            </View>
        </SafeAreaView>
    );
};
export default MyCourse

