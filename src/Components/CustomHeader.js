import React from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, Keyboard, StyleSheet, SafeAreaView } from 'react-native'
import Color, { dimensions } from '../Global/Color'
import LeftArrow from '../Global/Images/arrowLeft.svg'
import MyText from './MyText/MyText'
const CustomHeader = ({ navigation, text, type }) => {
    console.log('my text coponent--->>', text);
    return (

        <SafeAreaView style={{


        }}>
            <View style={styles.customView}>
                <LeftArrow onPress={() => navigation.goBack()} style={{ height: 24, width: 24, }} />
                <MyText
                    text={text}
                    fontWeight="400"
                    fontSize={18}
                    textColor={Color.WHITE}
                    fontFamily="Roboto"
                    style={{ flex: 1, textAlign: 'center', }}
                />
            </View>
        </SafeAreaView >

    )
}

const styles = StyleSheet.create({
    customView: {
        backgroundColor: Color.LIGHT_BLACK,
        height: dimensions.SCREEN_HEIGHT * 0.20,
        flexDirection: 'row',
        // Center items vertically
        // Center items horizontally
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
        backgroundColor: Color.BG_COLOR
    },
    input: {
        paddingRight: 10,
        height: 45,
        width: '90%',
        fontSize: 13,
        // borderColor: Mycolors.GrayColor, 
        // borderWidth:1, 
        backgroundColor: Color.LogininputBox,
        borderRadius: 15,
        color: Color.TEXT_COLOR,

        //   textAlignVertical: 'top', 
    },
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
        bottom: -600,
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
});
export default CustomHeader;
