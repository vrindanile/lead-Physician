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
import { styles } from './FavoritesStyle';
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

const Favorites = ({ navigation }) => {
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
            <View style={[styles.viewContainer, { backgroundColor: 'white' }]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.roundView}>
                        <Mycourse width={27} height={27} style={{ alignSelf: 'center' }}></Mycourse>

                    </View>
                    <MyText
                        text={item.title}
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
                        text={'Module 2:'}
                        fontWeight="bold"
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        fontFamily="Roboto"

                        style={{



                        }}
                    />
                    <MyText
                        text={'Worksheets'}
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
                    <TouchableOpacity style={[styles.actionButtonView,]}>
                        <Delte></Delte>
                        {/* Remove */}
                        <MyText
                            text={'Remove '}
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
                    <TouchableOpacity style={[styles.actionButtonView, { backgroundColor: Color.PRIMARY, marginLeft: -5 }]} onPress={() => { navigation.navigate('ModuleScreen') }}>
                        <Resume></Resume>
                        <MyText
                            text={'Resume'}
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
    //UI
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={Color.LIGHT_BLACK} />
            <View style={{
                flex: 1,
                backgroundColor: '#F7FAEB',
            }}>
                <MyHeader
                    Title={`Favorite Chapters`}
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
                            data={physicianCourse}
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
        </SafeAreaView>
    );
};
export default Favorites

