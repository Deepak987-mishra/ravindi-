
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image, Modal, StyleSheet, Pressable, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { wp, hp, nf, wpx, hpx, Fonts, Icons, Colors } from '../../constants/constants'
import { CustomInputText, Card } from '../common'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ClassCard } from '../common/CommonCards';
import { types } from '../../store/ActionTypes';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreenGroup = () => {
    //   booking class state 
    const [copiedText, setCopiedText] = useState('');
    const dispatch = useDispatch();
    const bookingClasses = useSelector(state => state.homeReducer.bookingClasses)
    const cardData = useSelector(state => state.homeReducer.cardData)
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();
    let obj = {
        class_id: cardData?.class_id,
        meeting_link: cardData?.meeting_link
    }
    console.log("card dataa", cardData)


    const copyToClipboard = () => {
        // Clipboard.setString('obj.meeting_link');
        alert("data copoied")
    };

    return (

        <ImageBackground source={Icons.bg} style={styles.bgContainer} resizeMode='cover'>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>


                        <View style={styles.triangleBottomCorner} />



                        <View style={styles.modalView}>
                            {/* {obj.meeting_link?} */}
                            <Text style={styles.modalText}>Please Enter Zoom URL</Text>
                            <TextInput style={styles.modalInput} onChangeText={(meeting) => { setMeetingLink(meeting) }} value={cardData?.meeting_link} />
                            <Pressable
                                style={styles.modalButtonContainer}
                                onPress={() => setModalVisible(!modalVisible) || dispatch({
                                    type: types.UPDATE_MEETING_LINK,
                                    payload: obj

                                })}
                            >
                                <Text style={styles.modalButtonText}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>

            <View style={styles.topContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Icons.back} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                style={styles.container}
                contentContainerStyle={styles.contentStyle}>
                <View style={styles.logoContainer}>
                    <Image source={Icons.logoLogin} style={styles.logo} />

                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.content}>TEAM MATHEW</Text>

                </View>
                <View style={styles.contentContainer2}>
                    <Text style={styles.content2}>25 July 2021 at 6.00 pm IST</Text>
                </View>


                <TouchableOpacity style={styles.linkContainer} onPress={() => cardData?.meeting_link ? copyToClipboard() : setModalVisible(true)}>
                    <Text style={styles.linkContent}>{cardData?.meeting_link ? obj.meeting_link : 'Enter Zoom URL'}</Text>
                    {/* <Text style={styles.linkContent}>Enter Zoom Link</Text> */}
                    <Image source={cardData?.meeting_link ? Icons.copy : Icons.iconFinder} style={styles.linkIcon} />
                </TouchableOpacity>

                <View style={styles.middleContainer}>
                    <Text style={styles.middleContent}>Meditation class</Text>
                </View>

                <View style={styles.middleContainer1}>
                    <Text style={styles.middleContent1}>Total Seat Left : 7/50</Text>
                    <Text style={styles.middleContent2}>Total Booked: {cardData?.booked_seats}</Text>
                </View>
                <View style={styles.classListView}>
                    {bookingClasses.map((item, index) => {
                        return <ClassCard item={item} key={index} index={index} screenName="GroupClass" />
                    })}
                </View>
            </ScrollView>
        </ImageBackground >





    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.7)'

    },
    contentStyle: {
        flexGrow: 1,
        marginBottom: hp(10),
        alignItems: "center",
        justifyContent: "center",

    },
    modalView: {

        width: wpx(300),
        height: hpx(140),
        // marginTop: hpx(272),
        backgroundColor: "white",
        borderRadius: wpx(5),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: hpx(19),
        width: wpx(170),
        height: hpx(36),
        backgroundColor: "white",
        paddingHorizontal: wpx(10)


    },
    linkIcon: {
        width: wpx(15),
        height: hpx(15),

    },
    linkContent: {

        fontSize: nf(16),
        fontFamily: Fonts.regular,
        textAlign: 'left',
        color: '#262626'
    },

    modalText: {
        paddingLeft: wpx(61),
        paddingRight: wpx(61),
        paddingTop: hpx(22),
        fontSize: nf(16),
        fontFamily: Fonts.regular,
        color: '#2B2B2B',
        textAlign: 'center'
    },
    modalButtonText: {
        paddingLeft: wpx(121),
        paddingTop: hpx(6),
        fontSize: nf(13),
        fontFamily: Fonts.regular,
        textAlign: 'left',
        color: Colors.white
    },
    icon: {
        width: wpx(23),
        height: hpx(23),


        resizeMode: 'contain',
    },

    bgContainer: {
        width: "100%",
        height: "100%",
    },
    logo: {
        width: wpx(60),
        height: hpx(91),

        resizeMode: 'contain',
    },
    modalInput: {
        marginLeft: wpx(11),
        marginRight: wpx(11),
        width: wpx(277), height: hpx(25),
        backgroundColor: 'white',
        paddingTop: hpx(3),
        paddingBottom: hpx(3),
        fontSize: nf(15),
        fontFamily: Fonts.regular
    },
    modalButtonContainer: {
        marginTop: hpx(11),
        marginLeft: wpx(11),
        marginRight: wpx(11),
        width: wpx(277),
        height: hpx(30),
        backgroundColor: '#ED624A'
    },
    classListView: {
        alignSelf: 'flex-start',
        marginLeft: wpx(7),
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: hpx(12),
        paddingBottom: hpx(100),
    },
    logoContainer:
    {
        marginTop: hpx(19),

    },
    topContainer: {
        marginTop: hpx(23),
        marginLeft: wpx(20)
    },
    contentContainer: {
        marginTop: hpx(8),

    },
    content: {
        fontSize: nf(30),
        fontFamily: Fonts.bold,
        textAlign: 'center',
        color: Colors.white
    },
    contentContainer2: {
        marginTop: hpx(3),

    },
    content2: {
        fontSize: nf(15),
        fontFamily: Fonts.semiBold,
        textAlign: 'center',
        color: Colors.white,
    },
    middleContent: {
        paddingLeft: wpx(105),
        paddingTop: hpx(13),
        paddingRight: wpx(104),
        fontSize: nf(18),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: Colors.white
    },
    middleContent1: {
        fontSize: nf(13),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: Colors.white
    },
    middleContent2: {
        fontSize: nf(13),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: Colors.white,
        paddingRight: wpx(20)
    },
    middleContainer: {
        marginTop: hpx(36),
        marginLeft: wpx(8),
        marginRight: wpx(8),
        width: wpx(359),
        height: hpx(50),
        backgroundColor: '#D3D3D3'
    },
    middleContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hpx(13),
        marginLeft: wpx(21),
        alignSelf: 'stretch'
    },
    triangleBottomCorner: {
        right: wpx(80),
        bottom: 0,
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: wpx(8),
        borderRightWidth: wpx(8),
        borderBottomWidth: wpx(14),
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "white",
        // position: "absolute",
        // marginTop: DeviceInfo.hasNotch() ? 70 / 375 * screenWidth : 35 / 375 * screenWidth,
    },

});
export default HomeScreenGroup;





