import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { hpx, wpx, hp, wp, nf, Fonts, Icons, Colors } from '../../constants/constants';
import SeeMore from 'react-native-see-more-inline';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { types } from '../../store/ActionTypes';
import { useSelector } from 'react-redux';
// import Certificate from '../common/certificate';

const TeacherAccount = () => {
    const dispatch = useDispatch()
    const [readMore, setReadmore] = useState('false')
    const navigation = useNavigation()
    const userAccountDetails = useSelector(state => state.createClassReducer.userAccountDetails)
    console.log('set account details', userAccountDetails)
    useEffect(() => {
        dispatch({
            type: types.GET_ACCOUNT_DETAILS
        })

    }, [])

    return (
        <View style={styles.container}>
            <ScrollView bounces={false} style={styles.container}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: hpx(100), alignItems: "center" }}>
                <LinearGradient colors={Colors.gradient1} style={styles.linearGradient} />
                <View style={styles.header}>
                    <Text style={styles.header_text}>My Account</Text>
                    <TouchableOpacity style={styles.editProfile}>
                        <Image source={Icons.editProfile} style={styles.editIcon} />
                        <Text style={styles.headerText}>Edit Profile </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.profile}>
                    <Image source={userAccountDetails?.profile_picture ? { uri: userAccountDetails?.profile_picture } : Icons.profileImage} style={styles.profile_image} />
                    <View style={styles.profile_detail}>
                        <Text style={styles.detail_text1}>{userAccountDetails?.full_name} </Text>
                        <Text style={styles.detail_text2}>Experience : {userAccountDetails?.experience} Years </Text>
                        <Text style={styles.detail_text3}>Email : {userAccountDetails?.email} </Text>
                    </View>
                </View>
                <View style={styles.booking_container}>
                    <View style={styles.content}>
                        <Text style={styles.contentHeading}>Bookings</Text>
                        <Text style={styles.text2}>{userAccountDetails?.total_booking}</Text>
                    </View>
                    <View style={styles.verticalLine} ></View>
                    <View style={styles.content}>
                        <Text style={styles.contentHeading} >Upcoming</Text>
                        <Text style={styles.text2} >{userAccountDetails?.upcoming}</Text>

                    </View>
                    <View style={styles.verticalLine} ></View>
                    <View style={styles.content}>
                        <Text style={styles.contentHeading}>Completed</Text>
                        <Text style={styles.text2}>{userAccountDetails?.completed}</Text>
                    </View>
                </View>

                <LinearGradient colors={Colors.gradient1} style={styles.earningCard}
                    useAngle={true}
                    angle={90}
                >
                    <View style={styles.gradientText}>
                        <Text style={styles.earning} >Total Earning :</Text>
                        <Text style={styles.totalEarning}>${userAccountDetails?.total_earning}</Text>
                    </View>
                </LinearGradient>

                <View style={styles.locationContainer}>
                    <View style={styles.location}>
                        <Text style={styles.profileText1}>Location :</Text>
                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image source={Icons.editIconOrange} style={styles.loc_image} />
                            <Text style={styles.profileText2}>Edit Location</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: wpx(305),
                        marginTop: hpx(10),
                    }}>
                        <Text style={styles.locText} >{userAccountDetails?.location_address}</Text>
                    </View>
                </View>

                <View style={styles.bioContainer}>
                    <Text style={styles.bioText}>Bio</Text>
                    <View style={{ marginTop: hpx(10) }}>
                        {userAccountDetails?.bio ?
                            <SeeMore numberOfLines={4}
                                style={{ fontFamily: Fonts.regular, fontSize: nf(11), color: Colors.greyShade3 }}
                                linkStyle={{ fontFamily: Fonts.bold, fontSize: nf(11), color: Colors.greyShade3 }}
                                linkColor={Colors.greyShade3}
                                seeMoreText={"Read more"}
                                seeLessText={"Read less"}>
                                {userAccountDetails?.bio}
                            </SeeMore> : null}
                    </View>
                </View>
                <View style={styles.certificateContainer}>
                    <Text style={styles.certificate} >Certificate</Text>
                    <ScrollView
                        style={styles.certifImages}
                        showsHorizontalScrollIndicator={false}
                        horizontal>
                        {userAccountDetails?.certificates.map((item, index) => {
                            return (
                                <LinearGradient colors={Colors.gradient1}
                                    key={index}
                                    style={styles.certifGradient}
                                    useAngle={true}
                                    angle={91}>
                                    <View style={styles.certParent}>
                                        <Image source={{ uri: item.certificate_url }} style={styles.certifImg1} resizeMode="contain" />
                                    </View>
                                </LinearGradient>)
                        })}
                    </ScrollView>
                </View>
                <View style={styles.inputsContainer}>

                    <View style={styles.inputs}>
                        <Text style={styles.inputText} >Change Password</Text>
                        <Image source={Icons.arrowRight} style={[styles.inputIcon, {}]} />
                    </View>
                    <TouchableOpacity style={styles.inputs} onPress={() => navigation.navigate('CreateClass')}>
                        <Text style={styles.inputText}>Set Price </Text>
                        <Image source={Icons.arrowRight} style={styles.inputIcon} />
                    </TouchableOpacity>
                    <View style={styles.inputs}>
                        <Text style={styles.inputText} >View Calendar </Text>
                        <Image source={Icons.arrowRight} style={[styles.inputIcon, {}]} />
                    </View>
                    <TouchableOpacity style={styles.inputs} onPress={() => navigation.navigate("Settings")}>
                        <Text style={styles.inputText} >Settings</Text>
                        <Image source={Icons.arrowRight} style={styles.inputIcon} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        width: "100%",
    },
    linearGradient: {
        width: wpx(600),
        height: hpx(224),
        borderBottomLeftRadius: wpx(400),
        borderBottomRightRadius: wpx(400),
        alignItems: "center",
        position: "absolute",
        alignSelf: "center"
    },
    header: {
        flexDirection: 'row',
        marginTop: hpx(47),
        width: wpx(335),
        alignItems: "center",
        justifyContent: "space-between"
    },
    header_text: {
        color: 'white',
        fontFamily: Fonts.semiBold,
        fontSize: nf(16)
    },
    editProfile: {
        flexDirection: "row",
        alignItems: "center"
    },
    editIcon: {
        height: hpx(15),
        width: wpx(15),
        marginRight: wpx(2)
    },
    headerText: {
        color: Colors.white,
        fontFamily: Fonts.medium,
        fontSize: nf(12),
    },
    profile: {
        flexDirection: 'row',
        marginTop: hpx(25),
        width: wpx(335)
    },
    profile_image: {
        height: hpx(90),
        width: hpx(90),
        borderRadius: hpx(45),
        borderWidth: 2,
        borderColor: "white"

    },
    profile_detail: {
        flexDirection: 'column',
        marginLeft: wpx(22),
        marginTop: hpx(13)
    },
    detail_text1: {
        color: Colors.white,
        fontFamily: Fonts.semiBold,
        fontSize: nf(18),
        // marginLeft: wpx(10),
        // marginTop: hpx(5)
    },
    detail_text2: {
        color: Colors.white,
        fontFamily: Fonts.regular,
        fontSize: nf(11),
        marginTop: hpx(4)
    },
    detail_text3: {
        color: Colors.white,
        fontFamily: Fonts.regular,
        fontSize: nf(11),
        marginTop: hpx(4)
    },
    booking_container: {
        height: hpx(80),
        width: wpx(335),
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: 'white',
        borderRadius: wpx(10),
        marginTop: hpx(13),
        backgroundColor: Colors.white,
        elevation: 10,
        shadowColor: Colors.shadowGrey2,
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.9,
        paddingHorizontal: wpx(15)
    },
    verticalLine: {
        height: hpx(50),
        width: 1.5,
        backgroundColor: Colors.lightGreyBorder,
        marginTop: hpx(15)

    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    contentHeading: {
        color: Colors.greyShade3,
        fontFamily: Fonts.regular,
        fontSize: nf(10),
    },
    text2: {
        color: '#000000',
        fontFamily: Fonts.medium,
        fontSize: nf(12),
        textAlign: 'center'
        // marginLeft: wpx(30)
    }, content2: {
        marginTop: hpx(20),
    },
    content3: {
        marginTop: hpx(20)
    },
    earningCard: {
        height: hpx(61),
        width: wpx(335),
        marginTop: hpx(15),
        borderRadius: wpx(10),
        paddingHorizontal: wpx(15)
    },
    gradientText: {
        flexDirection: 'row',
        justifyContent: 'space-around',

        marginTop: hpx(21),

    }, earning: {
        color: Colors.white,
        fontFamily: Fonts.regular,
        fontSize: nf(14),
        marginRight: wpx(180),
        marginLeft: wpx(15)


    }, totalEarning: {
        color: Colors.white,
        fontFamily: Fonts.semiBold,
        fontSize: nf(22),
        marginRight: wpx(15),
        marginTop: hpx(-5)

    },
    locationContainer: {
        flexDirection: 'column',
        width: wpx(335),
        minHeight: hpx(76),
        marginTop: hpx(15),
        backgroundColor: Colors.white,
        elevation: 5,
        borderRadius: wpx(10),
        padding: wpx(15),
        borderWidth: 1,
        borderColor: Colors.grey
    },
    location: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
    },
    loc_image: {

    },
    profileText2: {
        color: '#E25C58',
        fontFamily: Fonts.semiBold,
        fontSize: nf(10),
        textDecorationLine: 'underline',
        marginLeft: wpx(5)

    },
    profileText1: {
        color: Colors.greyShade3,
        fontFamily: Fonts.semiBold,
        fontSize: nf(14),
        textAlign: 'left'
    },
    locText: {
        color: Colors.greyShade3,
        fontFamily: Fonts.regular,
        fontSize: nf(11),
    },
    bioContainer: {
        flexDirection: 'column',
        marginTop: hpx(15),
        width: wpx(335)
    },
    bioText: {
        color: Colors.greyShade3,
        fontFamily: Fonts.semiBold,
        fontSize: nf(14),

    },
    certificateContainer: {
        flexDirection: 'column',
        marginTop: hpx(15),
        width: wpx(335)
    },
    certificate: {
        color: Colors.greyShade3,
        fontFamily: Fonts.semiBold,
        fontSize: nf(14),
    },
    certifImages: {
        flexDirection: 'row',
        marginTop: hpx(10)
    },
    certifGradient: {
        height: hpx(80),
        width: wpx(110),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wpx(5),
        marginHorizontal: wpx(5)
    },
    certParent: {
        backgroundColor: "white",
        height: hpx(73),
        width: wpx(104),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wpx(5),
    },
    certifImg1: {
        height: hpx(70),
        width: wpx(100),
    },
    inputsContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    inputs: {
        flexDirection: 'row',
        justifyContent: "space-between",
        height: hpx(50),
        width: wpx(335),
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: wpx(3),
        marginTop: hpx(15),
        paddingHorizontal: wpx(15),
        alignItems: "center"
    },
    inputText: {
        color: Colors.greyShade3,
        fontFamily: Fonts.regular,
        fontSize: nf(13),
    },
    inputIcon: {

    }




})

export default TeacherAccount

