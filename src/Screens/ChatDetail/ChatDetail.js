// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { Text, View, Image, ActivityIndicator, Button, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, StatusBar, ScrollView, RefreshControl, ImageBackground, FlatList, KeyboardAvoidingView, TextInput } from 'react-native'
// import Hyperlink from 'react-native-hyperlink';
// import Color, { dimensions } from '../../Global/Color';
// import MyText from '../../Components/MyText/MyText';
// import { useSharedValue, useDerivedValue, withSpring } from 'react-native-reanimated';
// import { styles } from './chatDetailStyle';
// import MyHeader from '../../Components/MyHeader/MyHeader';
// import { GiftedChat } from 'react-native-gifted-chat'
// import moment from 'moment';
// import firestore from '@react-native-firebase/firestore';
// import { connect, useSelector } from 'react-redux';

// import Book from '../../Global/Images/book.svg'
// import Ongoing from '../../Global/Images/clock.svg'
// import GroupChat from '../../Global/Images/chatGrp.svg'
// import Indivijual from '../../Global/Images/chatPersonal.svg'

// //state managment


// const ChatDetail = ({ navigation }) => {
//     const flatListRef = useRef();
//     // const dispatch = useDispatch();
//     const [animating, setAnimating] = useState(true);
//     const [messages, setMessages] = useState([])
//     const [scrolling, setscrolling] = useState(false);
//     const [refreshing, setRefreshing] = useState(false);
//     const [activeTab, setActiveTab] = useState(null); // State to track the active tab
//     const [message, setmessage] = useState('');
//     const [driver_id, setDriver_id] = useState(1)
//     const scrollY = useSharedValue(0);
//     const userToken = useSelector(state => state.user.userToken);
//     const user = useSelector(state => state.user.userInfo);
//     console.log('my user with id ------>>>', user.id);

//     const RenderTabsTitle = [{
//         id: '1',
//         title: 'Group Chat'
//     },
//     {
//         id: '2',
//         title: 'Admin Message'
//     }]
//     const MessagesData = [{
//         id: '1',
//         title: 'hello',
//         name: 'Brooklyn Simmons'
//     }, {
//         id: '2',
//         title: 'hi',
//         name: 'Brooklyn Simmons'
//     }]
//     const groupChat = [{
//         id: '1',
//         title: 'Physician Alumni',
//         time: '12 Mar, 09:30 Am',
//         members: '459 Members'
//     },
//     {
//         id: '2',
//         title: 'Physician Alumni',
//         time: '12 Mar, 09:30 Am',
//         members: '459 Members'
//     },
//     {
//         id: '3',
//         title: 'Physician Alumni',
//         time: '12 Mar, 09:30 Am',
//         members: '459 Members'
//     }
//     ]
//     useEffect(() => {
//         // setDriver_id(6)
//         var UserId = 1;
//         var driver_id = 1;
//         console.log('driver_id', driver_id, user.id)
//         var UserId = 1;
//         var driver_id = 1;
//         const docid =
//             driver_id > UserId
//                 ? UserId + "-" + driver_id
//                 : driver_id + "-" + UserId;
//         console.log("//////....Reciver_id..docid...", docid);
//         const MessageRef = firestore()
//             .collection("leadphysician")
//             // .doc(club.event_id.toString())
//             .doc()
//             .collection("Messages")
//             .orderBy("createdAt", "desc");
//         const unSubscribe = MessageRef.onSnapshot(querySnap => {
//             console.log('my query snapp--->>>>', querySnap);
//             if (querySnap != null) {
//                 const AllMsg = querySnap.docs.map(docSnap => {
//                     const data = docSnap.data();
//                     if (data.createdAt) {
//                         return {
//                             ...docSnap.data(),
//                             createdAt: docSnap.data().createdAt.toDate(),
//                         };
//                     } else {
//                         return {
//                             ...docSnap.data(),
//                             createdAt: new Date(),
//                         };
//                     }
//                 });
//                 console.log('my messages from firebase---->>>', AllMsg);
//                 // setMessagesData(AllMsg);
//             } else {
//                 // setMessagesData([]);
//             }
//         });

//         // Stop listening for updates when no longer required
//         return () => {
//             unSubscribe();
//         };
//     }, [])
//     // }, [club]);
//     const handleScroll = event => {
//         const yOffset = event.nativeEvent.contentOffset.y;
//         scrollY.value = event.nativeEvent.contentOffset.y;
//         if (yOffset === 0) {
//             // Your code to handle reaching the top of the scroll view
//             console.log('Reached the top');
//             setscrolling(false);
//         } else {
//             setscrolling(true);
//         }
//     };
//     const onRefresh = React.useCallback(() => {
//         // checkcon();
//         wait(2000).then(() => {
//             setRefreshing(false);
//         });
//     }, []);

//     const RenderChat = ({ item }) => {
//         return (
//             <View style={styles.chatView}>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 12 }}>
//                     <View style={{ flexDirection: 'row' }}>
//                         <GroupChat></GroupChat>
//                         <View>
//                             <MyText text={item.title} fontWeight='400' fontSize={14} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ textAlign: 'center', marginHorizontal: 16 }} />
//                             <MyText text={item.members} fontWeight='400' fontSize={12} textColor={'#959FA6'} fontFamily='Roboto' style={{ marginHorizontal: 17, marginVertical: 5 }} />
//                         </View>

//                     </View>
//                     <Ongoing></Ongoing>
//                     <MyText text={item.time} fontWeight='400' fontSize={12} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{}} />
//                 </View>
//                 <View style={styles.bottomChat}>
//                     <View style={styles.rowIndivi}>
//                         <Indivijual style={{ marginLeft: 22 }}></Indivijual>
//                         <MyText text={'Katty'} fontWeight='bold' fontSize={13} textColor={Color.BLACK} fontFamily='Roboto' style={{ marginHorizontal: 12, marginVertical: 5 }} />
//                     </View>
//                     <MyText text={'Please connect and respond here…'} fontWeight='400' fontSize={13} textColor={'#959FA6'} fontFamily='Roboto' style={{ marginHorizontal: 24, marginVertical: 8 }} />
//                 </View>
//             </View >)
//     }

//     //my chat functions

//     useEffect(() => {

//     }, [])
//     // userId: driver_id,
//     //                     message: message,
//     //                     createdAt: new Date(),
//     const sendMessage = () => {
//         console.log('my chat render function--->>>', driver_id, message, new Date());
//         if (message.trim().length > 0) {
//             const message1 = {
//                 userId: driver_id,
//                 // profile_image: driver_id?.user_image ,
//                 // profile_image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
//                 // userName: `${user_details?.user?.name}`,
//                 message: message,
//                 createdAt: new Date(),
//                 createdAt: firestore.FieldValue.serverTimestamp(),
//             };

//             const groupRef = firestore()
//                 .collection("leadphysician")
//                 // .doc(club.event_id.toString());
//                 .doc(driver_id);
//             const membersRef = groupRef.collection("users");
//             const batch = firestore().batch();
//             const messageRef = groupRef.collection("Messages").doc();
//             batch.set(messageRef, message1);
//             membersRef
//                 .get()
//                 .then((querySnapShot) => {
//                     console.log("SEND MESSAGE", querySnapShot);
//                     querySnapShot.forEach((doc) => {
//                         const memberId = doc.id;
//                         console.log('=============BATCH=======================');
//                         console.log(memberId, message1);
//                         console.log('===============BATCH=====================');
//                         if (memberId != message1.userId) {
//                             const memberRef = membersRef.doc(doc.id);
//                             batch.update(memberRef, {
//                                 unread_count: doc.data().unread_count + 1,
//                             });
//                         }
//                     });
//                     return batch.commit();
//                 })

//                 .catch((error) => {
//                     console.error("catch send msg error", error);
//                 });
//             const tempMsg = message;
//             setmessage("");
//             // senNoti(tempMsg);
//             // ChatPost();
//         }
//     };
//     // const sendMessage = async () => {
//     //     console.log('my send message---->>>', driver_id, message, new Date());
//     //     if (message == '') {
//     //         console.log('my messages---?????');
//     //     } else {
//     //         console.log('my if blockk--->>>');
//     //         if (ChatImage == '' && ChatDocument == '') {

//     //             try {
//     //                 console.log('my uiuiuiu messagess');
//     //                 const Data = {
//     //                     userId: driver_id,
//     //                     message: message,
//     //                     createdAt: new Date(),
//     //                 };
//     //                 firestore()
//     //                     .collection('leadphysician')
//     //                     .doc(docid)
//     //                     .collection('Messages')
//     //                     .add({ ...Data, createdAt: firestore.FieldValue.serverTimestamp() });
//     //                 const tempMsg = message;
//     //                 setmessage('');
//     //                 try {
//     //                     // const data = {
//     //                     //   receiver_id: UserId,
//     //                     //   msg: tempMsg,
//     //                     // };
//     //                     // await Server.postApiWithToken(userToken, Server.SEND_MSG, data);
//     //                 } catch (error) {
//     //                     console.log('error while api call ', error);
//     //                 }
//     //             } catch (error) {
//     //                 console.log('error in sendMessage', error);
//     //             }
//     //         } else {
//     //             setshowLoader(true);
//     //             const formData = new FormData();
//     //             if (ChatDocument == '') {
//     //                 const imageName = ChatImage.path.slice(
//     //                     ChatImage.path.lastIndexOf('/'),
//     //                     ChatImage.path.length,
//     //                 );
//     //                 formData.append('image', {
//     //                     name: imageName,
//     //                     type: ChatImage.mime,
//     //                     uri: ChatImage.path,
//     //                 });
//     //             }
//     //             // else {
//     //             //   let documentPath = ChatDocument.uri;
//     //             //   const docsName = ChatDocument.name;
//     //             //   formData.append('image', {
//     //             //     name: docsName,
//     //             //     type: ChatDocument.type,
//     //             //     uri: documentPath,
//     //             //   });
//     //             // }
//     //             // formData.append('receiver_id', UserId);
//     //             // formData.append('msg', message);
//     //             // try {
//     //             //   const resp = await Server.postApiWithToken(
//     //             //     userToken,
//     //             //     Server.SEND_MSG,
//     //             //     formData,
//     //             //   );
//     //             //   if (resp.data.status) {
//     //             //     const Data = {
//     //             //       userId: driver_id,
//     //             //       message: message,
//     //             //       createdAt: new Date(),
//     //             //       image: resp.data.url,
//     //             //     };
//     //             //     firestore()
//     //             //       .collection('Chat')
//     //             //       .doc(docid)
//     //             //       .collection('Messages')
//     //             //       .add({
//     //             //         ...Data,
//     //             //         createdAt: firestore.FieldValue.serverTimestamp(),
//     //             //       });
//     //             //     setmessage('');
//     //             //     setChatImage('');
//     //             //     setChatDocument('');
//     //             //     setshowLoader(false);
//     //             //   }
//     //             // } catch (error) {
//     //             //   console.log('error while uploading images ', error);
//     //             //   setshowLoader(false);
//     //             // }
//     //         }
//     //     }
//     // };

//     // function : render function
//     const chatRenderFunction = ({ item }) => {
//         return (
//             <View
//                 key={item.id}
//                 style={{
//                     marginVertical: 10,
//                     alignItems: driver_id == item?.userId ? 'flex-end' : 'flex-start',
//                 }}>
//                 <View
//                     style={{
//                         backgroundColor:
//                             'white',
//                         borderRadius: 10,
//                         padding: 10,
//                         paddingHorizontal: 17,
//                         shadowColor: '#000000',
//                         shadowOffset: {
//                             width: 0,
//                             height: 2,
//                         },
//                         shadowOpacity: 0.05,
//                         shadowRadius: 20,
//                         elevation: 3,

//                     }}>
//                     {item?.title ? (
//                         <Hyperlink
//                             linkStyle={{ color: '#0000FF' }}
//                             onPress={(url, text) => Linking.openURL(url)}>
//                             <Text
//                                 style={{
//                                     color: '#ACCE39',
//                                     fontWeight: 'bold',
//                                     fontSize: 13
//                                     // fontFamily: Fonts.SEMI_BOLD,
//                                 }}>
//                                 {item?.name}
//                             </Text>
//                             <Text
//                                 style={{
//                                     color: '#66757F',
//                                     fontWeight: '400',
//                                     fontSize: 13,
//                                     marginVertical: 7
//                                     // fontFamily: Fonts.SEMI_BOLD,
//                                 }}>
//                                 {item?.title}
//                             </Text>
//                         </Hyperlink>
//                     ) : null}
//                 </View>
//                 <View style={{}}>
//                     <Text
//                         style={{
//                             color:
//                                 driver_id == item?.userId ? 'black' : '#4F5168',
//                             fontWeight: '400',
//                             // fontFamily: Fonts.SEMI_BOLD,
//                             fontSize: 10,
//                             marginHorizontal: 5,
//                             marginVertical: 7
//                         }}>
//                         {moment(item.createdAt).format('lll')}
//                     </Text>
//                 </View>
//             </View>
//         );
//     };
//     return (
//         <SafeAreaView style={{
//             flex: 1,
//             backgroundColor: '#F7FAEB'
//         }}>
//             <StatusBar backgroundColor={Color.LIGHT_BLACK} />
//             <View style={{
//                 flex: 1,
//                 backgroundColor: '#F7FAEB',
//             }}>
//                 <MyHeader
//                     Title={`My `}
//                     isBackButton
//                 />
//                 <ScrollView
//                     showsVerticalScrollIndicator={false}
//                     contentContainerStyle={{ paddingBottom: '20%' }}
//                     refreshControl={
//                         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//                     }
//                     onScroll={handleScroll}
//                     scrollEventThrottle={16}
//                     style={styles.mainView}>
//                     {!scrolling ? (

//                         <></>
//                     ) : null}
//                     <View style={{ borderBottomColor: "#0089CF", borderWidth: 0.5, width: dimensions.SCREEN_WIDTH, }} />
//                     <KeyboardAvoidingView
//                         style={{ flex: 1 }}
//                         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//                         <ScrollView>

//                             <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
//                                 <View
//                                     style={{ width: '100%', marginTop: 20, flex: 1, height: dimensions.SCREEN_HEIGHT * 0.50 }}>
//                                     {MessagesData.length > 0 ? (
//                                         <FlatList
//                                             inverted
//                                             ref={flatListRef}
//                                             showsVerticalScrollIndicator={false}
//                                             data={MessagesData}
//                                             renderItem={chatRenderFunction}
//                                             keyExtractor={(item, index) => index.toString()}
//                                         />
//                                     ) : (
//                                         <>
//                                             {/* <Text style={{textAlign: 'center'}}>Say hi to start chat</Text> */}
//                                             <ActivityIndicator
//                                                 animating={showLoader}
//                                                 size="large"
//                                                 color="#f39322"
//                                             />
//                                         </>
//                                     )}
//                                 </View>
//                             </View>
//                             <View style={{ height: 100 }} />
//                         </ScrollView>
//                     </KeyboardAvoidingView>
//                     <View style={[styles.addCommentContainer, { backgroundColor: 'red', flex: 1, position: 'absolute', }]}>
//                         <View style={styles.addCommentView}>
//                             <TextInput
//                                 value={message}
//                                 onChangeText={(text) => {
//                                     setmessage(text)
//                                 }}
//                                 placeholder="Type a message"
//                                 placeholderTextColor={'#0089CF'}
//                                 style={[styles.input, { width: '70%' }]}
//                                 multiline
//                             />
//                             <View style={{ flexDirection: 'row', alignItems: 'center', width: '30%', justifyContent: 'flex-end', }}>
//                                 {/* <TouchableOpacity onPress={sendMessage} style={styles.cameraButtonView}>
//                                     <Image source={require('../../../assets/images/dating-camera-icon.png')}/>
//                                 </TouchableOpacity> */}
//                                 <TouchableOpacity onPress={sendMessage} style={styles.sendButtonView}>
//                                     {/* <Image source={require('../../../assets/People/ShareButtonChat.png')} style={styles.sendButton} resizeMode='contain' /> */}
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>
//                     {/* <Text style={{ color: 'red' }}>jjjjj</Text> */}
//                 </ScrollView>


//             </View>
//         </SafeAreaView>
//     )
// }




// export default ChatDetail;

import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from "react-native"
import React, { useCallback } from "react"
// import MyHeader from "../../Components/MyHeader/MyHeader"
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth
} from "react-native-responsive-dimensions"
import MyHeader from "../../Components/MyHeader/MyHeader"
import DocumentPicker from "react-native-document-picker"
import ChatSection from "../../Components/Chat/ChatSection"
import Color, { dimensions } from '../../Global/Color';
import { firebase } from "@react-native-firebase/firestore"
import { connect, useSelector, useDispatch } from 'react-redux';
import Share from '../../Global/Images/share.svg'
import Direction from '../../Global/Images/direction.svg'


const timeHandler = timestamp => {
    if (timestamp) {
        const milliseconds =
            timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
        const date = new Date(milliseconds)
        const _temp = date
            .toLocaleString()
            ?.split(",")[1]
            ?.trim()
            ?.split(":")
        const time = `${_temp[0]}:${_temp[1]} ${_temp[2].split(" ")[1]}`
        return time
    }
    return ""
}

const ChatDetail = () => {
    // const {params} = useRoute<ChatRouteParams>();
    const userToken = useSelector(state => state.user.userToken);
    const userData = useSelector(state => state.user.userInfo)
    console.log('userData--->>>', userData.id);
    const flatlistRef = React.useRef(null)
    const [chat, setChat] = React.useState("")
    const [file, setFile] = React.useState(undefined)
    const [ok, setOk] = React.useState(false)
    const [chatArray, setChatArray] = React.useState([])

    React.useEffect(() => {
        setOk(true)
    }, [])

    React.useEffect(() => {
        if (chatArray?.length > 0 && ok) {
            flatlistRef?.current?.scrollToIndex({
                animated: false,
                index: chatArray?.length - 1
            })
        }
    }, [ok, chatArray])

    React.useEffect(() => {
        let unsubscribe
        const fetchData = async () => {
            unsubscribe = await chatSnapshot()
        }
        fetchData()
        return () => {
            unsubscribe && unsubscribe()
        }
    }, [])

    const chatSnapshot = async () => {
        try {
            const unsubscribe = firebase
                ?.firestore()
                .collection("jwj_chats")
                .doc(`1-${userData?.id}`)
                .collection("messages")
                ?.orderBy("createdAt", "desc")
                ?.onSnapshot(snapshot => {
                    console.log("snapshot", snapshot?._docs[0]?._data)
                    if (!ok) {
                        getChatData(snapshot?._docs)
                    } else {
                        setChatArray(preData => [
                            {
                                createdAt: timeHandler(snapshot?._docs[0]?._data?.createdAt),
                                senderId: snapshot?._docs[0]?._data?.sendBy,
                                text: snapshot?._docs[0]?._data?.text,
                                _id: snapshot?._docs[0]?._data?._id
                            },
                            ...preData
                        ])
                        setChat("")
                        flatlistRef?.current?.scrollToEnd()
                    }
                })
            return unsubscribe
        } catch (err) {
            console.log("err in chat snapshot", err?.message)
        }
    }

    const getChatData = async data => {
        if (data?.length === 0) {
            return
        }
        try {
            const arr = data?.map(item => {
                const time = timeHandler(item?._data?.createdAt)
                return {
                    text: item?._data?.text,
                    createdAt: time,
                    senderId: item?._data?.sendBy,
                    _id: item?._data?._id
                }
            })
            if (arr?.length > 0) {
                console.log('my array for chattt--->>>', arr);
                setChatArray(arr)
            }
        } catch (err) {
            console.log("err in getting chat", err)
        }
    }

    const sendChatHandler = async () => {
        const msg = chat
        // const messageId = uuid.v4()
        try {
            setChat("")
            await firebase
                ?.firestore()
                .collection("jwj_chats")
                .doc(`1-${userData?.id}`)
                ?.collection("messages")
                .add({
                    text: msg,
                    // image: image,
                    sendBy: userData?.id,
                    sendto: 1,
                    adminName: "JourneyWithJournals",
                    userName: userData?.first_name,
                    user: {
                        _id: userData?.id
                    },
                    // _id: messageId,
                    createdAt: new Date()
                })
            chat && (await PostApiWithToken(endPoint.chatRecord, { msg }, token))
        } catch (err) {
            console.log("err in sending text", err?.message)
        }
    }

    const chatHandler = chat => {
        setChat(chat)
    }

    const documentPicker = useCallback(async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles]
            })
            console.log("result", result)
        } catch (err) {
            console.log("document picker err", err.message)
        }
    }, [])

    const renderChat = ({ item, index }) => {
        return (

            <ChatSection
                key={index}
                userName={
                    item?.senderId == userData?.id
                        ? userData?.first_name
                            ? userData?.first_name
                            : "You"
                        : "Admin"
                }
                chat={item?.text}
                own={item?.senderId == userData?.id ? true : false}
                time={item?.createdAt}
            />
        )
    }
    return (
        <View style={styles.conatiner}>
            <View style={styles.headerContainer}>
                {/* <ImageBackground
                    source={require("../../assets/Icons/maskGroup-2.png")}
                    resizeMode="cover"
                    style={styles.chatImage}
                /> */}
                {/* <Header title="Chats" notificationButton={false} /> */}
                <MyHeader
                    Title={`You need help? Let’s chat.`}
                    isBackButton
                />
                {/* <Text style={styles.text}>You need help? Let’s chat.</Text> */}
            </View>

            {/* chats */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView keyboardShouldPersistTaps="always" bounces={false}>
                    <View style={styles.chatContainer}>
                        {chatArray?.length > 0 ? (
                            <FlatList
                                keyboardShouldPersistTaps="always"
                                inverted={true}
                                ref={flatlistRef}
                                data={chatArray}
                                renderItem={renderChat}
                                keyExtractor={(_, index) => index.toString()}
                                bounces={false}
                                contentContainerStyle={styles.flatlist}
                                getItemLayout={(data, index) => ({
                                    length: 0,
                                    offset: 0 * index,
                                    index
                                })}
                            />
                        ) : (
                            <View style={styles.noChatContainer}></View>
                        )}
                    </View>

                    {/* message send section */}
                    <View style={styles.sendMessageContainer}>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                value={chat}
                                style={styles.textInput}
                                onChangeText={chatHandler}
                            />
                            <TouchableOpacity style={styles.touch} onPress={documentPicker}>
                                {/* <Image
                                    source={require("../../Global/Images/share.svg")}
                                    resizeMode="contain"
                                    style={styles.attachedFiles}
                                /> */}
                                <Share></Share>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sendButtonContainer}>
                            {console.log('my chat lenght---->>', chat.length)}
                            <TouchableOpacity
                                onPress={sendChatHandler}
                                style={{
                                    ...styles.sendButtonTouch,
                                    backgroundColor:
                                        chat.length > 0
                                            ? 'yellow'
                                            : Color.PRIMARY
                                }}

                                disabled={chat.length === 0}
                            >
                                {/* <Image
                                    source={require("../../assets/Icons/send.png")}
                                    resizeMode="contain"
                                    style={styles.sendIcon}
                                /> */}
                                <Direction></Direction>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>

    )
}

export default ChatDetail

const styles = StyleSheet.create({
    conatiner: {
        flex: 1
    },
    headerContainer: {
        position: "relative",
        height: responsiveHeight(18),
        // backgroundColor: Color.PRIMARY,
        // borderWidth: 1
    },
    chatImage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%"
    },
    text: {
        marginTop: responsiveHeight(5),
        width: "100%",
        color: "white",
        textAlign: "center",
        fontSize: responsiveFontSize(2),
        fontWeight: "400",
        opacity: 0.7
    },
    chatContainer: {
        height: responsiveHeight(67)
    },
    flatlist: {
        paddingBottom: responsiveHeight(2)
    },
    sendMessageContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: "3%",
        height: responsiveHeight(15)
    },
    textInputContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: responsiveHeight(6.5),
        width: responsiveWidth(77),
        borderRadius: responsiveHeight(5),
        elevation: 2,
        shadowColor: "rgba(137, 137, 137, .25)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        backgroundColor: "white"
    },
    textInput: {
        flex: 1,
        height: "100%",
        width: "80%",
        paddingHorizontal: "5%",
        fontSize: responsiveFontSize(1.8),
        letterSpacing: 0.8
    },
    touch: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        paddingRight: responsiveWidth(4)
    },
    attachedFiles: {
        height: responsiveHeight(3),
        width: responsiveWidth(6)
    },
    sendButtonContainer: {
        height: responsiveHeight(5),
        width: responsiveHeight(5),
        borderRadius: responsiveHeight(2.5),
        overflow: "hidden"
    },
    sendButtonTouch: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
    sendIcon: {
        height: responsiveHeight(2),
        width: responsiveWidth(5)
    },
    noChatContainer: {
        flex: 1
    }
})
