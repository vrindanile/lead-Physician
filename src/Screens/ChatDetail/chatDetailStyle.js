import Color from '../../Global/Color';
import { Platform, StyleSheet } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { dimensions } from '../../Global/Color';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.SCREEN_BG,
    },
    mainView: {
        padding: 20,
        paddingTop: 0,
        marginTop: -30,
    },
    courseContainer: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        marginBottom: 11,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.05,
        elevation: 2,
    },
    courseTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 11,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: Color.THEME_BROWN,
    },
    courseSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    crseImg: {
        height: 99,
        width: dimensions.SCREEN_WIDTH * 0.33,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    crtrRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 22,
        width: '80%',
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    iconsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    createImgStyle: {
        height: 13,
        width: 13,
        borderRadius: 13 / 2,
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    summaryContainer: {
        padding: 12,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 5,
        borderRadius: 10,
        marginTop: 6,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.05,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    amountContainer: {
        backgroundColor: Color.THEME_BROWN,
        overflow: 'hidden',
        width: '100%',
        borderRadius: 10,
        height: 96,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 13,
        paddingHorizontal: 10,
    },
    whiteCircle2: {
        borderRadius: (17.15 * 2) / 2,
        width: 17.15 * 2,
        height: 17.15 * 2,
        backgroundColor: 'rgba(224, 178, 32, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteCircle3: {
        borderRadius: (29 * 2) / 2,
        width: 29 * 2,
        height: 29 * 2,
        backgroundColor: '#653C3C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 13,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.05,
        elevation: 2,
    },
    cardContainerLeftRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewMain: {
        height: 193,
        width: dimensions.SCREEN_WIDTH,
        backgroundColor: Color.PRIMARY,
        alignSelf: 'center'
    },
    activeStyle: {
        backgroundColor: Color.PRIMARY,
        // marginBottom: H1 * 0.01,
        borderRadius: 50,
        height: 6,
        width: 6,
        marginTop: 100,
    },
    dotStyle: {
        backgroundColor: '#CBCBCB',
        height: 6,
        width: 6,
        borderRadius: 50,
        //marginBottom: H1 * 0.01,
        marginTop: 100,
    },
    appView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 193,
        width: dimensions.SCREEN_WIDTH * 0.90,
        backgroundColor: Color.PRIMARY,
        borderRadius: 20,
        overflow: 'hidden',

    },
    viewAll: {
        width: 59,
        height: 31,
        backgroundColor: Color.LIGHT_BLACK,
        borderRadius: 5,
        justifyContent: 'center'
    },
    leadView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        marginVertical: 1
    },
    teamView: {
        width: dimensions.SCREEN_WIDTH * 0.40,
        height: 113,
        borderRadius: 10,
        backgroundColor: Color.WHITE,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 13,
        elevation: 5,
        marginRight: 15,
        zIndex: 1,
        overflow: 'visible', // Allow content to overflow the parent view
        position: 'relative', // Ensure the teamView is a positioned element
        marginTop: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    circularBackground: {
        position: 'absolute', // Position the circular background absolutely within the parent view
        top: -20, // Adjust as per your requirement

        width: 63, // Increased to make half of it outside the view
        height: 63, // Increased to make half of it outside the view
        borderRadius: 40,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: Color.PRIMARY,
        zIndex: 5, // Ensure it's above the teamView
        alignSelf: 'center',
        width: 63,
        height: 63,
        backgroundColor: Color.PRIMARY,
        justifyContent: 'center'
    },
    statusView: {
        width: 95, height: 28, borderRadius: 5,
        borderWidth: 1, borderColor: Color.PRIMARY, alignSelf: 'center', top: 8, justifyContent: 'center', alignSelf: 'center',


    },
    rowView: { flexDirection: 'row', alignSelf: 'center' },
    moduleView: {
        width: dimensions.SCREEN_WIDTH * 0.87,
        height: 113,
        borderRadius: 10,
        backgroundColor: Color.WHITE,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 13,
        elevation: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        justifyContent: 'space-between',
        marginBottom: 20,
        marginHorizontal: 14,
        flexDirection: 'row', paddingHorizontal: 14

    },
    resumeButton: {
        width: 112,
        height: 46,
        backgroundColor: Color.PRIMARY,
        borderRadius: 5,
        justifyContent: 'center'
    },
    scduleView: {
        width: dimensions.SCREEN_WIDTH * 0.80,
        height: 'auto',
        padding: 12,
        borderRadius: 10,
        backgroundColor: Color.WHITE,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 13,
        elevation: 5,
        marginRight: 15,
        zIndex: 1,
        overflow: 'visible', // Allow content to overflow the parent view
        position: 'relative', // Ensure the teamView is a positioned element
        marginTop: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    tabView: {
        width: dimensions.SCREEN_WIDTH * 0.42,
        height: 47,
        borderRadius: 5,
        backgroundColor: Color.WHITE,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.05,
        elevation: 2,

    },
    tabViewWhite: {
        width: dimensions.SCREEN_WIDTH * 0.42,
        height: 47,
        borderRadius: 5,
        backgroundColor: Color.WHITE,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.05,
        elevation: 2,
        justifyContent: 'center'

    },
    txtTab: {
        fontFamily: 'Open Sans',
        fontWeight: '600',
        size: 14,
        color: Color.LIGHT_BLACK,
        alignSelf: 'center'
    },
    txtTabblack: {
        fontFamily: 'Open Sans',
        fontWeight: '600',
        size: 14,
        color: Color.LIGHT_BLACK,
        alignSelf: 'center',

    },
    chatView: {
        width: dimensions.SCREEN_WIDTH * 0.88,
        height: 140,
        backgroundColor: Color.WHITE,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.13,
        shadowRadius: 13,
        marginVertical: 6,
        elevation: 5,
        alignSelf: 'center'


    },
    bottomChat: {

        height: 76,
        backgroundColor: '#F7FAEB',
        paddingVertical: 12
    },
    rowIndivi: {
        flexDirection: 'row'
    },
    addCommentContainer: {
        position: 'absolute',
        bottom: 0,
        padding: 15,
        backgroundColor: '#fff5f7',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 0.5,
        borderTopColor: '#ffb0ba',

    },
    addCommentView: {
        width: '100%',
        backgroundColor: '#E0E0E0',
        // padding:15, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 3
        // },
        // shadowRadius: 1,
        // shadowOpacity: 0.3,
        // elevation: 5,
    },
    input: {
        paddingLeft: 20,
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
    },
    sendButtonView: {
        backgroundColor: 'red',
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 20,
        left: 3
    },
    cameraButtonView: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftMessage: {
        fontSize: 13,
        fontWeight: '400',
        color: '#996673'
    },
    rightMessage: {
        fontSize: 13,
        fontWeight: '400',
        color: '#fff'
    },
});
