import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { hpx, wpx, hp, wp, nf, Fonts, Icons, Colors } from '../../constants/constants';
import SeeMore from 'react-native-see-more-inline';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { types } from '../../store/ActionTypes';


const StudentAccount = () => {
    const dispatch = useDispatch()
    const [readMore, setReadmore] = useState('false')
    const navigation = useNavigation()
    const userAccountDetails = useSelector(state => state.createClassReducer.userAccountDetails)
    useEffect(() => {
        dispatch({
            type: types.GET_ACCOUNT_DETAILS
        })

    }, [])

    return (
        <View style={styles.container}>
            <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: hpx(100) }}>
                <LinearGradient colors={Colors.gradient1} style={styles.linearGradient}>
                    <View style={styles.header}>

                        <Text style={styles.header_text}>My Account</Text>
                        <Image source={Icons.editProfile}
                            style={styles.header_image} />

                        <Text style={styles.header_text2}>Edit Profile </Text>


                    </View>
                    <View style={styles.profile}>
                        <Image source={Icons.profileImage} style={styles.profile_image} />

                        <View style={styles.profile_detail}>
                            <Text style={styles.detail_text1}>{userAccountDetails?.full_name} </Text>
                            <Text style={styles.detail_text3}>Email : {userAccountDetails?.email}  </Text>

                        </View>


                    </View>

                </LinearGradient>
                <View style={styles.booking_container}>
                    <View style={styles.booking_detail}>
                        <View style={styles.content1}>
                            <Text style={styles.text1}>Bookings</Text>
                            <Text style={styles.text2}>1235</Text>

                        </View>
                        <View style={styles.verticalLine} ></View>
                        <View style={styles.content2}>
                            <Text style={styles.text1} >Upcoming</Text>
                            <Text style={styles.text2} >052</Text>

                        </View>
                        <View style={styles.verticalLine} ></View>
                        <View style={styles.content3}>
                            <Text style={styles.text1}>Completed</Text>
                            <Text style={styles.text2}>1350</Text>

                        </View>


                    </View>

                </View>

                <View style={styles.locationContainer}>
                    <View style={styles.location}>
                        <Text style={styles.profileText1}>Location :  </Text>
                        <Image source={Icons.edit_profile_1} style={styles.loc_image} />
                        <Text style={styles.profileText2}>Edit Location</Text>

                    </View>
                    <View>
                        <Text style={styles.locText} >{userAccountDetails?.location_address} </Text>
                    </View>

                </View>

                <View style={styles.bioContainer}>
                    <Text style={styles.bioText}>Bio</Text>
                    <View style={{ paddingRight: 20 }}>
                        {userAccountDetails?.bio ? <SeeMore numberOfLines={2} linkStyle={{ fontWeight: '500' }}>
                            {userAccountDetails?.bio}
                        </SeeMore> : null}
                        {/* <Text>uhreufruireuiuieueuefuhruhre8uyh9re89er8re8
                        ujrioireireirioreioriro
                    </Text> */}

                    </View>


                </View>




                <View style={styles.inputsContainer}>

                    <View style={styles.inputs}>
                        <Text style={styles.inputText} >Change Password</Text>
                        <Image source={Icons.rightArrowBlack} style={[styles.inputIcon, {}]} />
                    </View>

                    <TouchableOpacity style={styles.inputs} >
                        <Text style={styles.inputText}>Become a teacher </Text>
                        <Image source={Icons.rightArrowBlack} style={styles.inputIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.inputs} onPress={() => navigation.navigate("Settings")}>
                        <Text style={styles.inputText} >Settings</Text>
                        <Image source={Icons.rightArrowBlack} style={styles.inputIcon} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        width: wpx(375),
        height: hpx(224),
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    },
    header: {
        flexDirection: 'row',
        marginTop: hpx(23),
        marginLeft: wpx(20)
    },
    header_text: {
        color: 'white',
        fontFamily: Fonts.semiBold,
        fontSize: nf(16)
    },
    header_image: {
        height: hpx(15),
        width: wpx(15),
        marginLeft: wpx(166)
    },
    header_text2: {
        color: Colors.white,
        fontFamily: Fonts.medium,
        fontSize: nf(12),
        marginLeft: wpx(10),
    },
    profile: {
        flexDirection: 'row',
        marginTop: hpx(38)
    },
    profile_image: {
        height: hpx(90),
        width: hpx(90),
        borderRadius: hpx(45),
        marginLeft: wpx(20),
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
        borderWidth: 1,
        borderColor: 'white',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopEndRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginLeft: wpx(20),
        marginTop: hpx(-15),
        backgroundColor: 'white',
        elevation: 10

    },
    booking_detail: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'

    }, verticalLine: {
        height: hpx(50),
        width: 1,
        backgroundColor: Colors.greyShade2,
        marginTop: hpx(15)

    },
    content1: {
        marginLeft: wpx(30),
        marginTop: hpx(24)
    },
    text1: {
        color: Colors.greyShade3,
        fontFamily: Fonts.regular,
        fontSize: nf(10),
    }, text2: {
        color: '#000000',
        fontFamily: Fonts.medium,
        fontSize: nf(12),
        textAlign: 'center'
        // marginLeft: wpx(30)
    }, content2: {
        marginTop: hpx(20),
    }, content3: {
        marginTop: hpx(20)
    },

    Gradient2: {
        height: hpx(61),
        width: wpx(335),
        marginTop: hpx(15),
        marginLeft: wpx(20),
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    gradientText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: hpx(21),

    },
    earning: {
        color: Colors.white,
        fontFamily: Fonts.regular,
        fontSize: nf(14),
        marginRight: wpx(180),
        marginLeft: wpx(15)
    },
    totalearning: {
        color: Colors.white,
        fontFamily: Fonts.semiBold,
        fontSize: nf(22),
        marginRight: wpx(15),
        marginTop: hpx(-5)

    },
    locationContainer: {
        flexDirection: 'column',
        width: wpx(335),
        height: hpx(76),
        marginTop: hpx(15),
        marginLeft: wpx(20),
        backgroundColor: 'white',
        elevation: 5
    },
    location: {
        flexDirection: 'row',
        marginLeft: wpx(15)
    },
    loc_image: {
        marginTop: hpx(18),
        marginLeft: wpx(167)
    },
    profileText2: {
        marginTop: hpx(18),
        marginRight: wpx(15),
        color: '#E25C58',
        fontFamily: Fonts.semiBold,
        fontSize: nf(10),
        textDecorationLine: 'underline',
        marginLeft: wpx(5)

    },
    profileText1: {
        marginTop: hpx(15),
        color: Colors.greyShade3,
        fontFamily: Fonts.semiBold,
        fontSize: nf(14),
        textAlign: 'left'
    },
    locText: {
        marginTop: hpx(15),
        color: Colors.greyShade3,
        fontFamily: Fonts.regular,
        fontSize: nf(11),
        marginLeft: wpx(15)
    },
    bioContainer: {
        flexDirection: 'column',
        marginLeft: wpx(20),
        marginTop: hpx(15)
    },
    bioText: {
        color: Colors.greyShade3,
        fontFamily: Fonts.semiBold,
        fontSize: nf(14),
    },
    certificateContainer: {
        flexDirection: 'column',
        marginTop: hpx(15),
    },
    certificate: {
        color: Colors.greyShade3,
        fontFamily: Fonts.semiBold,
        fontSize: nf(14),
        marginLeft: wpx(20)
    },
    certifImages: {
        flexDirection: 'row',
        marginLeft: wpx(20),
        padding: wpx(5)
    },
    certifGradient: {
        height: hpx(85),
        width: wpx(110),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4
    },
    certifImg1: {
        height: hpx(65),
        width: wpx(95),
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
        borderWidth: 1, borderColor: '#D3D3D3',
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

export default StudentAccount
