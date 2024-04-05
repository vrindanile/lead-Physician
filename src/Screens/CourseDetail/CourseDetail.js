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
    Linking,
    Platform,
    RefreshControl,
    PermissionsAndroid,
} from 'react-native';
//import : custom components
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText/MyText';
import CustomLoader from '../../Components/CustomLoader/CustomLoader';
//import : third parties

import Toast from 'react-native-toast-message';
//import : global
import Color, { dimensions } from '../../Global/Color';
import { Service } from '../../../global/Index';
//import : styles
import { styles } from './CourseDetailStyle';
//import : modal
//import : redux
// import { connect, useSelector } from 'react-redux';
// import { width, height } from 'global/Constant';
// import Divider from 'components/Divider/Divider';
// // import {WebView} from 'react-native-webview';
// import MyButton from '../../../components/MyButton/MyButton';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing,
} from 'react-native-reanimated';
// import AccordionItem from '../../../components/AccordionItem/AccordionItem';
// import ViewAll from '../../../components/ViewAll/ViewAll';
// import FAB_Button from '../../../components/FAB_Button/FAB_Button';
// import { createThumbnail } from 'react-native-create-thumbnail';
// import Review from '../../../modals/Review/Review';
// import VideoModal from '../../../components/VideoModal/VideoModal';
// import Modal from 'react-native-modal';
// import PrerequisiteModal from '../../../modals/PrerequisiteModal/PrerequisiteModal';
// import CourseNotPurshasedModal from '../../../modals/CourseNotPurchasedModal/CourseNotPurshasedModal';
// import RNFetchBlob from 'rn-fetch-blob';
// import ViewPdf from '../../../modals/ViewPdf/ViewPdf';
// import { setCartCount } from 'src/reduxToolkit/reducer/user';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CourseTypeModal from '../../../modals/CourseType/CourseTypeModal';
// import { shareItemHandler } from '../../../global/globalMethod';
// import defaultImg from '../../../assets/images/default-content-creator-image.png';

//svg image
import thumbnailImg from '../../Global/Images/Thumbnail.svg'
import PlayImg from '../../Global/Images/playButton.svg'
import Star from '../../Global/Images/star.svg'
import Laptop from '../../Global/Images/laptop.svg'
import Profile from '../../Global/Images/profileCircle.svg'
import Calendar from '../../Global/Images/calendar.svg'
import Chapter from '../../Global/Images/savedBook.svg'
import Module from '../../Global/Images/moduleImg.svg'
import Arrow from '../../Global/Images/arrowRight.svg'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// const data = [
//     {
//         id: 1,
//         title: 'New Methods to try',
//         description:
//             'How to create animated swipe button from react native? Here we use react native reanimated v2 for creating this swipe button. React native animations are something that was complicated for me at the beginning.',
//         time: '15:00',
//     },
//     {
//         id: 3,
//         title: 'How to use coding ',
//         description:
//             'How to create animated swipe button from react native? Here we use react native reanimated v2 for creating this swipe button. React native animations are something that was complicated for me at the beginning.',
//         time: '15:00',
//     },
//     {
//         id: 4,
//         title: 'What is coding about',
//         description:
//             'How to create animated swipe button from react native? Here we use react native reanimated v2 for creating this swipe button. React native animations are something that was complicated for me at the beginning.',
//         time: '15:00',
//     },
//     {
//         id: 5,
//         title: 'How to create animations',
//         description:
//             'How to create animated swipe button from react native? Here we use react native reanimated v2 for creating this swipe button. React native animations are something that was complicated for me at the beginning.',
//         time: '15:00',
//     },
//     {
//         id: 6,
//         title: 'Possible to create layout animations?',
//         description:
//             'How to create animated swipe button from react native? Here we use react native reanimated v2 for creating this swipe button. React native animations are something that was complicated for me at the beginning.',
//         time: '15:00',
//     },
//     {
//         id: 7,
//         title: 'How to Create Swipe Buttons',
//         description:
//             'How to create animated swipe button from react native? Here we use react native reanimated v2 for creating this swipe button. React native animations are something that was complicated for me at the beginning.',
//         time: '15:00',
//     },
// ];
const reviewsData = [
    {
        id: '1',
        name: 'Annete Black',
        img: `https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60`,
        msg: `Perfectly packed all products received as said...but when connected with power supply it doesn't work, After some adjustments it worked perfectly felt very happy with the product. Thank you`,
    },
    {
        id: '2',
        name: 'Annete Black',
        img: `https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60`,
        msg: `Perfectly packed all products received as said...but when connected with power supply it doesn't work, After some adjustments it worked perfectly felt very happy with the product. Thank you`,
    },
];
const tags = [
    { name: 'Tatoos', id: '1' },
    { name: 'Tatoos Course', id: '2' },
    { name: 'Tatoos 2023', id: '3' },
    { name: 'Body Piercing', id: '4' },
];
const data = [{
    id: '1',
    title: 'Module 01',

},
{
    id: '2',
    title: 'Module 02 Improving Self-Image and Confidence',

},
{
    id: '3',
    title: 'Module 3 Goal Setting & Achieving'
},
]
const addToCartObject = {};
const CourseDetail = ({ navigation, dispatch, route }) => {
    // const defaultImgPath = Image.resolveAssetSource(defaultImg).uri;
    //variables
    const LINE_HEIGTH = 25;
    //variables : redux
    // const userToken = useSelector(state => state.user.userToken);
    // const userInfo = useSelector(state => state.user.userInfo);
    // const [showLoader, setShowLoader] = useState(false);
    // const [selectedTag, setSelectedTag] = useState('1');
    // const [productDetails, setProductDetails] = useState({});
    // const [review, setReview] = useState('');
    // const [starRating, setStarRating] = useState(1);
    // const [showReviewModal, setShowReviewModal] = useState(false);
    // const [showModal, setShowModal] = useState({ isVisible: false, data: null });
    // const [documents, setDocuments] = useState([]);
    // const [showPrerequisiteModal, setShowPrerequisiteModal] = useState(false);
    // const [prerequisiteModalText, setPrerequisiteModalText] = useState('');
    // const [showNotPurchasedModal, setShowNotPurchasedModal] = useState(false);
    // const [showViewPdfModal, setShowViewPdfModal] = useState(false);
    // const [pdfLink, setPdfLink] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    // const [showCourseTypeModal, setShowCourseTypeModal] = useState(false)
    const [scrolling, setscrolling] = useState(false);
    const scrollY = useSharedValue(0);
    // useEffect(() => {
    //     // const unsubscribe = navigation.addListener('focus', () => {
    //     //   console.log('userToken', userToken);
    //     getProductDetails();
    //     // });
    //     // return unsubscribe;
    // }, []);
    const checkcon = () => {
        // getProductDetails();
    };
    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };
    // const onRefresh = React.useCallback(() => {
    //     checkcon();
    //     wait(2000).then(() => {
    //         setRefreshing(false);
    //     });
    // }, [route?.params?.id]);
    const onRefresh = React.useCallback(() => {
        checkcon();
        wait(2000).then(() => {
            setRefreshing(false);
        });
    }, []);


    // const getProductDetails = async () => {
    //     const postData = new FormData();
    //     postData.append('type', route?.params?.type);
    //     postData.append('id', route?.params?.id);
    //     // postData.append('id', 3);
    //     // console.log('getProductDetails postData', postData);
    //     setShowLoader(true);
    //     try {
    //         if (route?.params?.deepLinking) {
    //             var token = await AsyncStorage.getItem('userToken');
    //         }
    //         const resp = await Service.postApiWithToken(
    //             route?.params?.deepLinking ? token : userToken,
    //             Service.OBJECT_TYPE_DETAILS,
    //             postData,
    //         );
    //         // console.log('getProductDetails resp', JSON.stringify(resp?.data?.data));
    //         if (resp?.data?.status) {
    //             { console.log('yuyuyu calledd--->>') }
    //             const data = await generateThumb(resp?.data?.data);
    //             setProductDetails(data);
    //             // Toast.show(resp?.data?.message)
    //         } else {
    //             Toast.show(resp?.data?.message);
    //         }
    //     } catch (error) {
    //         console.log('error in getProductDetails', error);
    //     }
    //     setShowLoader(false);
    // };


    // const generateThumb = async (thumdData) => {
    //     console.log('generateThumb sdfed', thumdData?.introduction_video);
    //     try {
    //         const thumb = await createThumbnail({
    //             url: thumdData.introduction_video,
    //             timeStamp: 1000,
    //         });
    //         console.log('my thumb1111 --->>', thumb);
    //         thumdData.thumb = thumb;

    //         // create thumbnails for chapter_step videos
    //         const chapterData = [...thumdData?.chapters];
    //         console.log('chapter data --->>', chapterData);

    //         const updatedChapterData = await Promise.all(
    //             chapterData?.map(async chap => {
    //                 const returned = await Promise.all(
    //                     chap?.chapter_steps?.map(async chapstep => {
    //                         console.log('chapstep', chapstep);
    //                         if (chapstep?.type === 'video') {
    //                             console.log('is chapter video file-->>', chapstep?.file);
    //                             try {
    //                                 const thumb1 = await createThumbnail({
    //                                     url: chapstep?.file,
    //                                     timeStamp: 1000,
    //                                 });
    //                                 console.log('chapstep thumb generateddd', {
    //                                     ...chapstep,
    //                                     thumb1,
    //                                 });
    //                                 return {
    //                                     ...chapstep,
    //                                     thumb1,
    //                                 };
    //                             } catch (error) {
    //                                 console.error('Error generating thumbnail for chapter step:', error);
    //                                 // Return chapstep without thumbnail
    //                                 return chapstep;
    //                             }
    //                         } else {
    //                             console.log('i reached here', JSON.stringify(chapstep));
    //                             return chapstep;
    //                         }
    //                     }),
    //                 );
    //                 console.log('chap inside', { ...chap, chapter_steps: returned });
    //                 return { ...chap, chapter_steps: returned };
    //             }),
    //         );

    //         console.log('updatedChapterData', updatedChapterData);
    //         thumdData.chapters = updatedChapterData;
    //         console.log('generateThumb data', JSON.stringify(thumdData));
    //         return thumdData;
    //     } catch (error) {
    //         console.error('Error generating thumbnails:', error);
    //         // Throw the error to propagate it further if needed
    //         throw error;
    //     }
    // };

    // const changeSelectedTag = id => {
    //     setSelectedTag(id);
    // };
    const handleScroll = event => {
        const yOffset = event.nativeEvent.contentOffset.y;
        scrollY.value = event.nativeEvent.contentOffset.y;
        if (yOffset === 0) {
            // Your code to handle reaching the top of the scroll view
            console.log('Reached the top');
            setscrolling(false);
        } else {
            setscrolling(true);
        }
    };

    const RenderItemLead = ({ item }) => {
        return (
            <TouchableOpacity style={styles.moduleView} onPress={() => { navigation.navigate('ModuleScreen') }}>
                <Module></Module>
                <View>
                    <MyText
                        text={item?.title}
                        fontFamily="Roboto"
                        fontWeight='bold'
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        style={{ width: dimensions.SCREEN_WIDTH * 0.52 }}
                    />
                    <MyText
                        text={'2/4'}
                        fontFamily="Roboto"
                        fontWeight='500'
                        fontSize={18}
                        textColor={Color.PRIMARY}
                    />
                </View>
                <TouchableOpacity style={{
                    width: 44, height: 44,
                    borderRadius: 5, backgroundColor: Color.PRIMARY, justifyContent: 'center', alignItems: 'center', marginTop: 6
                }}>
                    <Arrow></Arrow>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
    // const renderTags = ({ item }) => {
    //     return (
    //         <TouchableOpacity
    //             onPress={() => changeSelectedTag(item.id)}
    //             style={[
    //                 styles.courseTypeContainer,
    //                 selectedTag === item?.id
    //                     ? { backgroundColor: Colors.THEME_BROWN }
    //                     : null,
    //             ]}>
    //             <MyText
    //                 text={item?.name}
    //                 fontFamily="regular"
    //                 fontSize={14}
    //                 textColor={selectedTag === item.id ? Colors.THEME_GOLD : 'black'}
    //             />
    //         </TouchableOpacity>
    //     );
    // };

    // const gotoAllReviews = () => {
    //     navigation.navigate(ScreenNames.ALL_REVIEWS, {
    //         id: productDetails?.id,
    //         type: '1',
    //         isPurchased: productDetails?.isPurchased,
    //     });
    // };
    // const gotoSideMenuLinks = (name, link) => {
    //     navigation.navigate(ScreenNames.SIDE_MENU_LINKS, { name, link });
    // };

    // const submitReview = async () => {
    //     if (review?.trim()?.length === 0) {
    //         Toast.show({ text1: 'Please enter review' });
    //         return;
    //     }
    //     const postData = new FormData();
    //     postData.append('id', route?.params?.id);
    //     postData.append('type', route?.params?.type);
    //     postData.append('comment', review);
    //     postData.append('rating', starRating);
    //     setShowLoader(true);
    //     try {
    //         const resp = await Service.postApiWithToken(
    //             userToken,
    //             Service.SUBMIT_REVIEW,
    //             postData,
    //         );
    //         // console.log('submitReview resp', resp?.data);
    //         if (resp?.data?.status) {
    //             Toast.show({ text1: resp?.data?.message || resp?.data?.Message });
    //             setStarRating(1);
    //             setReview('');
    //             getProductDetails();
    //         } else {
    //             Toast.show({ text1: resp?.data?.message || resp?.data?.Message });
    //         }
    //     } catch (error) {
    //         // console.log('error in submitReview', error);
    //     }
    //     setShowReviewModal(false);
    //     setShowLoader(false);
    // };

    // const openReviewModal = () => {
    //     setShowReviewModal(true);
    // };

    // const onLike = async (type, id, status) => {
    //     setShowLoader(true);
    //     const formdata = new FormData();
    //     formdata.append('type', type);
    //     formdata.append('id', id);
    //     formdata.append('status', status == '1' ? '0' : '1');
    //     // console.log('onLike formdata', formdata);
    //     try {
    //         const resp = await Service.postApiWithToken(
    //             userToken,
    //             status == '1' ? Service.UNLIKE_OBJECT_TYPE : Service.LIKE_OBJECT_TYPE,
    //             formdata,
    //         );
    //         console.log('onLike resp', resp?.data);
    //         if (resp?.data?.status) {
    //             Toast.show({ text1: resp.data.message });
    //             getProductDetails();
    //         } else {
    //             Toast.show({ text1: resp.data.message });
    //         }
    //     } catch (error) {
    //         // console.log('error in onLike', error);
    //     }
    //     setShowLoader(false);
    // };

    // const shareHandler = async () => {
    //     shareItemHandler(route?.params?.type, route?.params?.id);
    // };

    // const markAsCompleted = async chapter_step_id => {
    //     setShowLoader(true);
    //     const formdata = new FormData();
    //     formdata.append('chapter_step_id', chapter_step_id);
    //     // console.log('markAsCompleted formdata', formdata);
    //     try {
    //         const resp = await Service.postApiWithToken(
    //             userToken,
    //             Service.MARK_AS_COMPLETE,
    //             formdata,
    //         );
    //         // console.log('markAsCompleted resp', resp?.data);
    //         if (resp?.data?.status) {
    //             Toast.show({ text1: resp.data.message });
    //             getProductDetails();
    //         } else {
    //             Toast.show({ text1: resp.data.message });
    //         }
    //     } catch (error) {
    //         // console.log('error in markAsCompleted', error);
    //     }
    //     setShowLoader(false);
    // };
    // const toggleModal = state => {
    //     setShowModal({
    //         isVisible: state.isVisible,
    //         data: state.data,
    //     });
    // };
    // const deleteDocument = id => {
    //     const documentsCopy = [...documents];
    //     const updatedData = documentsCopy?.filter(el => el.id !== id);
    //     setDocuments([...updatedData]);
    // };
    // const documentValidation = chapter_step_id => {
    //     if (documents.find(el => el.id === chapter_step_id)) {
    //         return true;
    //     } else {
    //         Toast.show({ text1: 'Please select assignment file' });
    //         return false;
    //     }
    // };
    // const uploadDocument = async chapter_step_id => {
    //     // console.log('uploadDocument called', documents);
    //     if (documentValidation(chapter_step_id)) {
    //         const documentWithId = documents.find(el => el.id === chapter_step_id);
    //         setShowLoader(true);
    //         try {
    //             const postData = new FormData();
    //             postData.append('chapter_step_id', chapter_step_id);
    //             postData.append('file', {
    //                 name: documentWithId?.resp?.name,
    //                 type: documentWithId?.resp?.type,
    //                 uri: documentWithId?.resp?.uri,
    //             });
    //             // console.log('uploadDocument postData', postData);
    //             const resp = await Service.postApiWithToken(
    //                 userToken,
    //                 Service.ASSIGNMENT_UPLOAD_FILE,
    //                 postData,
    //             );
    //             // console.log('uploadDocument resp', resp?.data);
    //             if (resp.data.status) {
    //                 Toast.show({ text1: resp.data.message });
    //                 deleteDocument(chapter_step_id);
    //                 getProductDetails();
    //             } else {
    //                 Toast.show({ text1: resp.data.message });
    //             }
    //         } catch (error) {
    //             // console.log('error in uploadDocument', error);
    //         }
    //         setShowLoader(false);
    //     }
    // };
    // const gotoCart = () => navigation.navigate(ScreenNames.CART);
    // const addToCart = async (object_id, object_type, cart_value) => {
    //     const postData = new FormData();
    //     postData.append('object_id', object_id);
    //     postData.append('object_type', object_type);
    //     postData.append('cart_value', cart_value);
    //     setShowLoader(true);
    //     try {
    //         const resp = await Service.postApiWithToken(
    //             userToken,
    //             Service.ADD_TO_CART,
    //             postData,
    //         );
    //         // console.log('addToCart resp', resp?.data);
    //         if ((!resp?.data?.status && resp?.data?.error === 1) || (!resp?.data?.status && resp?.data?.error === 2)) {
    //             addToCartObject.object_id = object_id;
    //             addToCartObject.object_type = object_type;
    //             addToCartObject.cart_value = cart_value;
    //             addToCartObject.type = resp?.data?.error;
    //             setShowLoader(false);
    //             setShowCourseTypeModal(true);
    //             return;
    //         }
    //         if (resp?.data?.status) {
    //             dispatch(setCartCount(resp?.data?.cart_count));
    //             await AsyncStorage.setItem(
    //                 'cart_count',
    //                 JSON.stringify(resp?.data?.cart_count),
    //             );
    //             Toast.show({ text1: resp?.data?.message });
    //             gotoCart();
    //         } else {
    //             Toast.show({ text1: resp?.data?.message });
    //         }
    //     } catch (error) {
    //         // console.log('error in addToCart', error);
    //     }
    //     setShowLoader(false);
    // };
    // const openInBrowser = file => {
    //     // console.log('openPdfInBrowser', file);
    //     const link = `https://docs.google.com/viewerng/viewer?url=${file}`;
    //     Linking.openURL(link);
    // };
    // const downloadCertificate = link => {
    //   console.log('openPdfInBrowser', link);
    //   Linking.openURL(link);
    // };
    // const downloadCertificate = async link => {
    //     const androidExternalStoragePermission = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //     );
    //     if (androidExternalStoragePermission === "granted") {
    //         console.log('downloadCertificate', link);
    //         let pdfUrl = link;
    //         let DownloadDir =
    //             Platform.OS == 'ios'
    //                 ? RNFetchBlob.fs.dirs.DocumentDir
    //                 : RNFetchBlob.fs.dirs.DownloadDir;
    //         const { dirs } = RNFetchBlob.fs;
    //         const dirToSave =
    //             Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    //         const configfb = {
    //             fileCache: true,
    //             useDownloadManager: true,
    //             notification: true,
    //             mediaScannable: true,
    //             title: 'Arkansas',
    //             path: `${dirToSave}.pdf`,
    //         };
    //         console.log('here');
    //         const configOptions = Platform.select({
    //             ios: {
    //                 fileCache: configfb.fileCache,
    //                 title: configfb.title,
    //                 path: configfb.path,
    //                 appendExt: 'pdf',
    //             },
    //             android: configfb,
    //         });
    //         console.log('here2');
    //         Platform.OS == 'android'
    //             ? RNFetchBlob.config({
    //                 fileCache: true,
    //                 addAndroidDownloads: {
    //                     useDownloadManager: true,
    //                     notification: true,
    //                     path: `${DownloadDir}/.pdf`,
    //                     description: 'Arkansas',
    //                     title: `${productDetails?.title} course certificate.pdf`,
    //                     mime: 'application/pdf',
    //                     mediaScannable: true,
    //                 },
    //             })
    //                 .fetch('GET', `${pdfUrl}`)
    //                 .catch(error => {
    //                     console.warn(error.message);
    //                 })
    //             : RNFetchBlob.config(configOptions)
    //                 .fetch('GET', `${pdfUrl}`, {})
    //                 .then(res => {
    //                     if (Platform.OS === 'ios') {
    //                         RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
    //                         RNFetchBlob.ios.previewDocument(configfb.path);
    //                     }
    //                     console.log('The file saved to ', res);
    //                 })
    //                 .catch(e => {
    //                     console.log('The file saved to ERROR', e.message);
    //                 });
    //     }
    // };



    // const yesBtnHandler1 = async () => {
    //     const response = await Service.postApiWithToken(userToken, Service.EMPTY_CART, {});
    //     if (response?.data?.status) {
    //         addToCart(addToCartObject.object_id, addToCartObject.object_type, addToCartObject.cart_value);
    //         setShowCourseTypeModal(false);
    //     }
    // };

    // const noBtnHandler1 = () => {
    //     setShowCourseTypeModal(false);
    // };

    //UI
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={Color.LIGHT_BLACK} />
            <View style={styles.container}>
                <MyHeader Title="Course Details" isBackButton
                    scrolling={scrolling}
                    scrollY={scrollY}
                    style={scrolling ? { zIndex: 99 } : null}
                />
                {/* <MyHeader Title="Home" isBackButton /> */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: '20%' }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    style={styles.mainView}>
                    {/* {productDetails?.thumb?.path && <ImageBackground
                        source={{ uri: productDetails?.thumb?.path }}
                        // source={require('assets/images/rectangle-1035.png')}
                        style={styles.crseImg}
                        imageStyle={{ borderRadius: 10 }}> */}
                    <View style={{ width: dimensions.SCREEN_WIDTH * 0.90, height: 'auto', backgroundColor: 'white', marginTop: 20, borderRadius: 10 }}>
                        <ImageBackground
                            // source={{ uri: productDetails?.thumb?.path }}
                            source={require('../../Global/Images/images.png')}
                            style={styles.crseImg}
                            imageStyle={{ borderRadius: 10 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowModal({
                                        isVisible: true,
                                        data: productDetails,
                                    });
                                }}>
                                {/* <Image source={require('assets/images/play-icon.png')} /> */}

                                <PlayImg></PlayImg>
                            </TouchableOpacity>
                        </ImageBackground>
                        <View style={{ flexDirection: 'row', marginHorizontal: 12 }}>
                            <Laptop style={{ marginTop: 12 }}></Laptop>

                            <View style={{ flexDirection: 'column', marginHorizontal: 12 }}>
                                <MyText text={'Improving Self-Image and Confidence'} fontWeight='500' fontSize={14} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' />

                                <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                                    <Star style={{ marginTop: 2 }}></Star>
                                    <MyText text={'4.7'} fontWeight='400' fontSize={14} textColor={'#959FA6'} fontFamily='Roboto' style={{ marginHorizontal: 4 }} />
                                    <TouchableOpacity style={{ width: 90, height: 24, borderRadius: 5, backgroundColor: Color.PRIMARY, marginHorizontal: 8, justifyContent: 'center' }}>
                                        <MyText text={'Write Review'} fontWeight='500' fontSize={12} textColor={Color.WHITE} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <MyText text={'This module will give you a sense of what is going to happen. An intro to how this all started. An idea of what you can become if you hold a growth mindset.'} fontWeight='400' fontSize={14} textColor={'#66757F'} fontFamily='Roboto' style={{ alignSelf: 'center', marginHorizontal: 14, lineHeight: 24 }} />
                        <View style={{ backgroundColor: '#F3F8E1', height: 'auto', width: dimensions.SCREEN_WIDTH * 0.90, paddingVertical: 12, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: 7 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.85, marginHorizontal: 9, }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Profile ></Profile>
                                    <MyText text={'Max bryant'} fontWeight='400' fontSize={13} textColor={'#6A6A6A'} fontFamily='Roboto' style={{ alignSelf: 'center', lineHeight: 24, marginHorizontal: 6 }} />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Chapter></Chapter>
                                    <MyText text={'3 Chapters'} fontWeight='400' fontSize={13} textColor={'#6A6A6A'} fontFamily='Roboto' style={{ alignSelf: 'center', lineHeight: 24, marginHorizontal: 6 }} />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Calendar height={22} width={22}></Calendar>
                                    <MyText text={'Date: 26 Jun 2023'} fontWeight='400' fontSize={13} textColor={'#6A6A6A'} fontFamily='Roboto' style={{ alignSelf: 'center', lineHeight: 24, marginHorizontal: 6 }} />
                                </View>
                            </View>
                        </View>

                    </View>
                    <View>
                        <FlatList
                            horizontal={false}
                            data={data}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
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

                    {/* <View style={styles.topRow}>
                        <MyText
                            text={productDetails?.title}
                            fontFamily="regular"
                            fontSize={16}
                            textColor={'black'}
                            style={{ width: '80%' }}
                        />
                        <MyText
                            text={`$${productDetails?.course_fee ? productDetails?.course_fee : 0}`}
                            fontFamily="bold"
                            fontSize={14}
                            textColor={Colors.THEME_GOLD}
                            style={{}}
                        />
                    </View> */}
                    {/* <View style={styles.middleRow}>
                        <View style={styles.middleLeftRow}>
                            <View style={styles.ratingRow}>
                                <Image source={require('assets/images/star.png')} style={{ height: 12, width: 12, resizeMode: 'contain' }} />
                                <MyText
                                    text={productDetails?.avg_rating}
                                    fontFamily="regular"
                                    fontSize={13}
                                    textColor={Colors.LIGHT_GREY}
                                    letterSpacing={0.13}
                                    style={{ marginLeft: 5 }}
                                />
                            </View>
                            <View style={styles.crtrRow}>

                                <Image
                                    resizeMode='cover'
                                    source={{ uri: productDetails?.content_creator_image ? productDetails?.content_creator_image : defaultImgPath }}
                                    style={styles.createImgStyle}
                                />
                                <MyText
                                    text={productDetails?.content_creator_name}
                                    fontFamily="regular"
                                    fontSize={13}
                                    textColor={Colors.THEME_GOLD}
                                    letterSpacing={0.13}
                                    style={{ marginLeft: 10 }}
                                />
                            </View>
                            <View style={styles.iconsRow}>
                                <TouchableOpacity
                                    onPress={() => {
                                        onLike('1', productDetails.id, productDetails.isWishlist);
                                    }}>
                                    <Image
                                        source={
                                            productDetails?.isWishlist
                                                ? require('assets/images/heart-selected.png')
                                                : require('assets/images/heart.png')
                                        }
                                        style={{ height: 20, width: 20, resizeMode: 'contain' }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={shareHandler}>
                                    <Image
                                        source={require('assets/images/share.png')}
                                        style={{ marginLeft: 10, height: 20, width: 20 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <MyText
                            text={productDetails?.category_name}
                            fontFamily="medium"
                            fontSize={16}
                            numberOfLines={1}
                            textColor={'black'}
                            textAlign={'right'}
                            style={{ width: '30%' }}
                        />

                    </View> */}

                    {/* <View style={styles.validDateRow}>
                        {productDetails?.course_expire_date && <Image source={require('assets/images/myyy2.png')} />}
                        {productDetails?.isPurchased && <MyText
                            // text={`Course Valid Date: 26 Juny 2023`}
                            text={`Course Valid Date: ${productDetails?.course_expire_date}`}
                            fontFamily="medium"
                            fontSize={13}
                            textColor={Colors.LIGHT_GREY}
                            style={{ marginLeft: 5 }}
                        />}
                    </View> */}
                    {/* {console.log('klklk videp modal---->>>', showModal?.data)}
                    {showModal.isVisible ? (

                        <VideoModal
                            isVisible={showModal.isVisible}
                            toggleModal={toggleModal}
                            videoDetail={{
                                ...showModal?.data,
                                url: showModal?.data?.introduction_video,
                            }}
                        // {...props}
                        />
                    ) : null} */}
                    {/* <View style={styles.bottomRow}>
                        <View style={styles.chaptersRow}>
                            <Image source={require('assets/images/chapter-icon.png')} />
                            <MyText
                                text={`${productDetails?.chapter_count ? productDetails?.chapter_count : 0} Chapters`}
                                fontFamily="regular"
                                fontSize={13}
                                textColor={Colors.LIGHT_GREY}
                                style={{ marginLeft: 5 }}
                            />
                        </View>
                        <View style={styles.quizRow}>
                            <Image source={require('assets/images/quiz-icon.png')} />
                            <MyText
                                text={`${productDetails?.chapter_quiz_count ? productDetails?.chapter_quiz_count : 0} Quiz Questions `}
                                fontFamily="regular"
                                fontSize={13}
                                textColor={Colors.LIGHT_GREY}
                                style={{ marginLeft: 5 }}
                            />
                        </View>
                    </View>
                    <MyText
                        text={productDetails?.description}
                        fontFamily="regular"
                        fontSize={13}
                        textColor={Colors.LIGHT_GREY}
                        style={{ width: '100%', marginTop: 17 }}
                    /> */}

                    {/* <ViewAll text="Tags" showSeeAll={false} style={{ marginTop: 20 }} />
                    {productDetails?.tags?.length > 0 ? (
                        <FlatList
                            data={productDetails?.tags}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ marginTop: 11 }}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderTags}
                        />
                    ) : (
                        <MyText
                            text={'No Tags found!'}
                            fontFamily="medium"
                            fontSize={18}
                            textAlign="center"
                            textColor={'black'}
                        />
                    )} */}

                    {/* {productDetails?.chapters
                        ?.filter(el => el?.chapter_steps?.length > 0)
                        ?.map((chap, chapindex) => (
                            <>
                                <ViewAll
                                    key={chapindex?.toString()}
                                    text={`Chapter ${chapindex + 1}`}
                                    showSeeAll={false}
                                    style={{ marginTop: 10, marginBottom: 20 }}
                                />
                                <View
                                    // key={chapstepindex?.toString()}
                                    style={styles.containerStyle}>
                                    <FlatList
                                        data={chap?.chapter_steps}
                                        keyExtractor={item => item.id.toString()}
                                        renderItem={({ item, index }) => {
                                            // console.log('FlatList item', item);
                                            return (
                                                <AccordionItem
                                                    item={item}
                                                    index={index}
                                                    chapindex={chapindex}
                                                    documents={documents}
                                                    setDocuments={setDocuments}
                                                    uploadDocument={uploadDocument}
                                                    deleteDocument={deleteDocument}
                                                    setShowModal={setShowModal}
                                                    markAsCompleted={markAsCompleted}
                                                    prevChapterSteps={
                                                        chapindex === 0
                                                            ? []
                                                            : productDetails?.chapters[chapindex - 1]
                                                                ?.chapter_steps
                                                    }
                                                    allChapterSteps={chap?.chapter_steps}
                                                    setShowPrerequisiteModal={setShowPrerequisiteModal}
                                                    setPrerequisiteModalText={setPrerequisiteModalText}
                                                    isPurchased={productDetails?.isPurchased}
                                                    setShowNotPurchasedModal={setShowNotPurchasedModal}
                                                    gotoSideMenuLinks={gotoSideMenuLinks}
                                                    setShowViewPdfModal={setShowViewPdfModal}
                                                    setPdfLink={setPdfLink}
                                                />
                                            );
                                        }}
                                    />
                                </View>
                            </>
                        ))}
                    <View style={{ height: 37 }}></View> */}
                    {/* <ViewAllSub
                        text="Ratings & Reviews"
                        rating={productDetails?.avg_rating}
                        reviews={productDetails?.review_count ? productDetails?.review_count : 0}
                        onPress={gotoAllReviews}
                        style={{ marginBottom: 17, color: 'white', textColor: 'white' }}

                    /> */}
                    {/* {productDetails?.review?.length > 0 ? (
                        productDetails?.review?.map((item, index) => (
                            <View key={item.index?.toString()} style={styles.reviewContainer}>
                                <View style={styles.reviewTopRow}>
                                    <View style={styles.reviewTopLeftRow}>
                                        <Image
                                            source={
                                                item?.profile_image
                                                    ? { uri: item?.profile_image }
                                                    : require('assets/images/user-default.png')
                                            }
                                            style={styles.reviewImg}
                                        />
                                        <MyText
                                            text={`${item.first_name} ${item.last_name}`}
                                            fontFamily="medium"
                                            fontSize={13}
                                            textColor={Colors.LIGHT_GREY}
                                            style={{ marginLeft: 10 }}
                                        />
                                        <MyText
                                            text={`${item.created_date}`}
                                            fontFamily="medium"
                                            fontSize={13}
                                            textColor={Colors.LIGHT_GREY}
                                            style={{ marginLeft: 10 }}
                                        />
                                    </View>
                                    
                                    <Image source={require('../../../assets/images/arrow-down-white.png')}></Image>
                                </View>
                                <MyText
                                    text={item.review}
                                    fontFamily="medium"
                                    fontSize={13}
                                    textColor={Colors.LIGHT_GREY}
                                    style={{ marginTop: 10 }}
                                />
                            </View>
                        ))
                    ) : (
                        <MyText
                            text={'No Reviews found'}
                            fontFamily="medium"
                            fontSize={18}
                            textAlign="center"
                            textColor={'black'}
                        />
                    )}
                    {!productDetails?.isPurchased ? (
                        <View style={styles.buttonsRow}>
                            <MyButton
                                text="Add to Cart"
                                onPress={() =>
                                    addToCart(productDetails?.id, 1, productDetails?.course_fee)
                                }
                                style={{
                                    width: '48%',
                                    height: 50,
                                    backgroundColor: Colors.THEME_BROWN,
                                }}
                            />
                            <MyButton
                                text="Buy Now"
                                onPress={() =>
                                    addToCart(productDetails?.id, 1, productDetails?.course_fee)
                                }
                                style={{
                                    width: '48%',
                                    height: 50,
                                    backgroundColor: Colors.THEME_GOLD,
                                }}
                            />
                        </View>
                    ) :

                        productDetails?.isPurchased &&
                            productDetails?.courseCompleted == '1' ?
                            <>
                                <View style={{ marginTop: responsiveHeight(10), height: responsiveHeight(8), width: responsiveWidth(90), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(2) }}></View>
                            </> :
                            <>
                                {console.log('did i reach hereto check the button', productDetails?.isPurchased &&
                                    productDetails?.courseCompleted !== '1')}
                                <View style={{ marginTop: responsiveHeight(10), height: responsiveHeight(8), width: responsiveWidth(90), backgroundColor: Colors.THEME_BROWN, justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(2) }}><Text style={{ color: 'white', fontSize: responsiveFontSize(2) }}>You have already purchased this course</Text></View>
                            </>
                    }

                    {productDetails?.isPurchased ? (
                        <View style={{ marginTop: responsiveHeight(0) }}>
                            <FAB_Button onPress={openReviewModal} bottom={responsiveHeight(9)} style={{ tintColor: 'white' }} />
                        </View>
                    ) : null} */}
                </ScrollView>
                {/* {productDetails?.isPurchased &&
                    productDetails?.courseCompleted == '1' ? (
                    <View style={[styles.buttonsRow, { paddingHorizontal: 20 }]}>
                        <MyButton
                            text="View Certificate"
                            onPress={() => {
                                setShowViewPdfModal(true);
                                setPdfLink(productDetails?.certificate);
                                // openInBrowser(productDetails?.certificate);
                            }}
                            style={{
                                width: '48%',
                                height: 50,
                                backgroundColor: Colors.THEME_BROWN,
                            }}
                        />
                        <MyButton
                            text="Download Certificate"
                            textColor='black'
                            onPress={() => {
                                downloadCertificate(productDetails?.certificate);
                            }}
                            style={{
                                width: '48%',
                                height: 50,
                                backgroundColor: 'white',
                                borderWidth: 2,
                                borderRadius: 5,
                                borderColor: Colors.THEME_BROWN,
                                padding: 10,

                            }}
                        />
                    </View>
                ) : null} */}
                {/* <CustomLoader showLoader={showLoader} /> */}
                {/* <Review
                    visible={showReviewModal}
                    setVisibility={setShowReviewModal}
                    starRating={starRating}
                    setStarRating={setStarRating}
                    review={review}
                    setReview={setReview}
                    submitReview={submitReview}
                /> */}
                {/* <PrerequisiteModal
                    visible={showPrerequisiteModal}
                    setVisibility={setShowPrerequisiteModal}
                    prerequisiteModalText={prerequisiteModalText}
                    setPrerequisiteModalText={setPrerequisiteModalText}
                />
                <CourseNotPurshasedModal
                    visible={showNotPurchasedModal}
                    setVisibility={setShowNotPurchasedModal}
                /> */}
                {/* {showViewPdfModal ? (
                    <ViewPdf
                        visible={showViewPdfModal}
                        setVisibility={setShowViewPdfModal}
                        pdfLink={pdfLink || ''}
                        handleDownload={() => {
                            downloadCertificate(pdfLink);
                        }}
                    />
                ) : null} */}
            </View>
            {/* {showCourseTypeModal && <CourseTypeModal yesBtnHandler={yesBtnHandler1} noBtnHandler={noBtnHandler1} type={addToCartObject.type} />} */}
        </SafeAreaView>
    );
};
// const mapDispatchToProps = dispatch => ({
//     dispatch,
// });
export default CourseDetail;
// export default connect(null, mapDispatchToProps)(CourseDetails);

const ViewAllSub = ({
    text,
    rating,
    reviews,
    onPress,
    style = {},
    buttonText = 'See All',
}) => {
    return (
        <View style={[styles.viewAllContainer, style]}>
            <View>
                <MyText
                    text={text}
                    fontFamily="medium"
                    fontSize={18}
                    textColor={'#455A64'}
                />
                <View style={styles.ratingView}>
                    {/* <Image
                        source={require('assets/images/selected-star.png')}
                        style={{ height: 10, width: 10 }}
                    /> */}
                    <star></star>
                    <MyText
                        text={"Reviews"}
                        fontSize={13}
                        fontFamily="regular"
                        textColor={Color.PRIMARY}
                        style={{ marginLeft: 5 }}
                    />
                    <MyText
                        text={' (' + reviews + ')'}
                        fontSize={13}
                        fontFamily="regular"
                        textColor={Color.PRIMARY}
                        style={{}}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={onPress} style={styles.viewAll}>
                <MyText
                    text={buttonText}
                    fontFamily="regular"
                    fontSize={13}
                    textColor={'white'}
                />
            </TouchableOpacity>
        </View>
    );
};
