
import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image, TextInput, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { wp, hp, nf, wpx, hpx, Fonts, Icons, Colors } from '../../constants/constants'
import { CustomButton, CustomInputText } from '../common'
import { useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { ClassCard } from '../common/CommonCards';
import { useDispatch } from 'react-redux';
import { types } from '../../store/ActionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
const TeacherHomeScreen = () => {
    const upcomingClasses = useSelector(state => state.homeReducer.upcomingClasses)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: types.GET_UPCOMING_CLASSES,

        })
    }, [])

    return (
        <>
            <ImageBackground source={Icons.bg} style={styles.bgContainer} resizeMode='cover' >

                <View style={styles.topContainer}>
                    <Image source={Icons.ellipseBellWhiteIcon} style={styles.ellipseBell} />
                    <Image source={Icons.ellipseBellIcon} style={styles.ellipseBell1} />
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
                        <Text style={styles.content}>WELCOME TO RAVINDI</Text>
                    </View>
                    <View style={styles.contentContainer2}>
                        <Text style={styles.content2}>Upcoming class</Text>
                    </View>
                    <View style={styles.upcomingClass}>
                        <View style={styles.upcomingClassOpqView}></View>
                        <Text style={styles.upcomingClassText}>25 July 2021 @3:00 – 4:00 pm IST</Text>
                    </View>

                    {/* Home screen class list */}
                    <View style={styles.classListView}>
                        {upcomingClasses?.map((item, index) => {
                            return <ClassCard item={item} key={index} index={index} screenName="Home" />
                        })}


                    </View>

                </ScrollView>

            </ImageBackground>

        </>
    );
}
export default TeacherHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    ellipseBell: {
        height: hpx(27),
        width: wpx(27),
        resizeMode: 'contain',
        zIndex: 0
    },
    ellipseBell1: {
        height: hpx(12),
        width: wpx(13),
        resizeMode: 'contain',
        position: 'absolute',
        top: 5,
        left: 6
    },
    bellIconContainer: {
        position: 'absolute',
        top: hpx(6),
        left: wpx(7)
    },
    bellIcon: {
        height: hpx(13),
        width: wpx(12),
        resizeMode: 'contain',
        // color: '#EE808F'
    },
    bgContainer: {
        width: "100%",
        height: "100%"
    },
    logo: {
        width: wpx(60),
        height: hpx(91),

        resizeMode: 'contain',
    },
    logoContainer:
    {
        marginTop: hpx(41),
    },
    contentContainer: {
        marginTop: hpx(8),
    },
    content: {
        width: wpx(206),
        fontSize: nf(30),
        fontFamily: Fonts.bold,
        textAlign: 'center',
        color: Colors.lightGrey
    },
    upcomingClassText: {
        fontSize: nf(15),
        color: Colors.white,
        fontFamily: Fonts.semiBold,
        position: "absolute"
    },
    upcomingClass: {
        alignItems: "center",
        justifyContent: "center",
    },
    upcomingClassOpqView: {
        height: hpx(30),
        width: wpx(281),
        backgroundColor: Colors.white,
        borderColor: Colors.lightGreyBorder,
        borderWidth: 1,
        opacity: 0.4,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: hpx(3),
        shadowColor: Colors.shadowGrey,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 3,
    },

    contentContainer2: {
        marginTop: hpx(15)
    },
    content2: {
        fontSize: nf(21),
        fontFamily: Fonts.semiBold,
        textAlign: 'center',
        color: Colors.cardWhite,
    },
    topContainer: {
        marginTop: hpx(45),
        marginBottom: hpx(10),
        alignSelf: "flex-end",
        right: wpx(17)
    },
    classListView: {
        alignSelf: 'flex-start',
        flexDirection: "row",
        marginLeft: wpx(7),
        flexWrap: "wrap",
        marginTop: hpx(40),
        paddingBottom: hpx(100),
    },
    contentStyle: {
        flexGrow: 1,
        marginBottom: hp(10),
        alignItems: "center",
        justifyContent: "center",

    }

});


