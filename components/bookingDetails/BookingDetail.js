import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { hpx, wpx, hp, wp, nf, Fonts, Icons, Colors } from '../../constants/constants';
import { useNavigation } from '@react-navigation/native';
import SeeMore from 'react-native-see-more-inline';
const BookingDetail = () => {
    return (
        <View style={styles.container} >
            <ScrollView bounces={false}
                style={styles.container}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: hpx(100) }}>
                <LinearGradient colors={Colors.gradient1} start={{ x: 0, y: 1 }} end={{ x: 0, y: -1 }} style={styles.linearGradient} />

                <View style={styles.header}>
                    <Image source={Icons.back}
                        style={styles.backArrow} />
                    <Text style={styles.headerText}>Booking Detail</Text>
                </View>

                <View style={styles.circleView}>
                    <Image source={Icons.mask} style={styles.profile}

                    />

                </View>

                <View style={styles.topCard}>
                    <Text style={styles.topCardName}>Rachel Reynolds</Text>
                    <View style={styles.topContainer} >
                        <View style={styles.topContentContainer}>
                            <Text style={styles.classText}> class</Text>
                            <Text style={styles.privateText}> Private</Text>

                        </View>

                        <View style={[styles.topContentContainer, { marginHorizontal: wp(15) }]}>
                            <Text style={styles.classText}> Booking ID</Text>
                            <Text style={styles.privateText}>#A123</Text>

                        </View>
                        <View style={styles.topContentContainer}>
                            <Text style={styles.classText}>Status</Text>
                            <Text style={styles.privateText}> Booked</Text>

                        </View>
                    </View>
                </View>

                <View style={[styles.topCard, { marginTop: hpx(30), height: hpx(76), elevation: 1, marginLeft: wpx(15) }]}>
                    <Text style={styles.locationText}>Location:</Text>
                    <Text style={[styles.locationText, { paddingTop: hpx(10), fontSize: nf(11) }]}>3152 Clay Lick Road, Centennial, Colorado, 80112</Text>

                </View>

                <View style={[styles.topCard, { marginTop: hpx(15), height: hpx(137), elevation: 5 }]}>
                    <View style={styles.topContentContainer}>
                        <View style={styles.topRowContainer}>
                            <Text style={styles.privateDateText}>Private class date</Text>
                            <Text style={styles.date}>14th jan,2021</Text>
                        </View>
                        <View style={styles.topRowContainer}>
                            <Text style={[styles.privateDateText, { paddingTop: hpx(10) }]}>Booked Date </Text>
                            <Text style={[styles.date, { paddingTop: hpx(10), paddingHorizontal: wpx(143) }]}>12th jan,2021</Text>
                        </View>
                        <View style={styles.topRowContainer}>
                            <Text style={[styles.privateDateText, { paddingTop: hpx(10) }]}>Time</Text>
                            <Text style={[styles.date, { paddingTop: hpx(10), paddingHorizontal: wpx(160) }]}>06:00 - 06:30 am IST</Text>
                        </View>
                        <View style={styles.topRowContainer}>
                            <Text style={[styles.privateDateText, { paddingTop: hpx(10) }]}>class</Text>
                            <Text style={[styles.date, { paddingTop: hpx(10), paddingHorizontal: wpx(190) }]}>Meditation</Text>
                        </View>
                    </View>

                </View>

                <View style={styles.bioContainer}>


                    <SeeMore seeMoreText={'Read more'} seeLessText={'Read less'} numberOfLines={2} linkStyle={{ fontWeight: 'bold' }} linkColor={'#000000'} style={{ fontFamily: Fonts.regular, fontSize: nf(11), color: Colors.greyShade3 }}>
                        Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been the industry's standard
                        dummy text ever since the 1500sLorem Ipsum is
                        simply dummy text of the printing Read more

                    </SeeMore>
                </View>
                <Text style={styles.paymentDetailsText}>Payment detail</Text>
                <View style={[styles.topCard, { marginTop: hpx(10), height: hpx(83), elevation: 5 }]}>
                    <View style={styles.topContentContainer}>
                        <View style={styles.topRowContainer}>
                            <Text style={styles.privateDateText}>1 class:</Text>
                            <Text style={styles.amountText}>$299</Text>
                        </View>
                        <View style={styles.topRowContainer}>
                            <Text style={styles.privateDateText}>Amount Paid:</Text>
                            <Text style={[styles.amountText, { paddingHorizontal: wpx(184) }]}>$299</Text>
                        </View>
                    </View>
                </View>

                <Text style={{ paddingTop: hpx(15), fontSize: nf(14), fontFamily: Fonts.semiBold, color: Colors.greyShade3, paddingLeft: wpx(20) }}>Rating & Review</Text>
                <View style={[styles.topCard, { marginTop: hpx(10), height: hpx(70), elevation: 1 }]}>
                    <View style={styles.topContentContainer}>
                        <Text style={{ fontSize: nf(11), fontFamily: Fonts.regular, color: Colors.greyShade3, textAlign: 'left', padding: wpx(2) }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 Lorem Ipsum is simply dummy text of the printing.</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}
export default BookingDetail;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: Colors.white
    },
    header: {
        flexDirection: 'row',
        marginTop: hpx(23),
        marginLeft: wpx(20)

    }, headerText: {
        color: Colors.white,
        fontFamily: Fonts.semiBold,
        fontSize: nf(16),
        textAlign: 'left',
        marginLeft: wpx(10)

    },

    backArrow: {
        height: hpx(23),
        width: hpx(23)
    },
    linearGradient: {
        width: wpx(600),
        height: hpx(224),
        borderBottomLeftRadius: wpx(790),
        borderBottomRightRadius: wpx(790),
        alignItems: "center",
        position: "absolute",
        alignSelf: "center"
    },
    circleView: {
        marginTop: hpx(37),
        width: hpx(100),
        height: hpx(100),
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: hpx(50),
        top: hpx(47), zIndex: 10,
        borderColor: Colors.white,
        borderWidth: wpx(4),
        elevation: 11
    },
    bioContainer: {

        alignSelf: 'center',

        marginTop: hpx(15),
        height: hpx(80),
        width: wpx(319)
    },
    profile: {
        width: hpx(90),
        height: hpx(90),
        borderRadius: hpx(45),
    },
    topCard: {
        width: wpx(335),
        height: hpx(160),
        marginTop: hpx(82),
        borderRadius: wpx(5),
        backgroundColor: Colors.white,
        alignSelf: 'center',

        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10
    },

    topCardName: {
        fontSize: nf(18),
        fontFamily: Fonts.semiBold,
        color: '#000000',
        textAlign: 'center',
        paddingTop: hpx(60)
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hpx(19)
    },
    topContentContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    classText: {
        color: Colors.greyShade3,
        fontFamily: Fonts.regular,
        fontSize: nf(10),
        textAlign: 'center',

    },
    privateText: {
        color: '#000000',
        fontFamily: Fonts.medium,
        fontSize: nf(12),
        textAlign: 'center',

    },
    locationText: {
        paddingTop: hpx(15),
        fontSize: nf(14),
        fontFamily: Fonts.semiBold,
        color: Colors.greyShade3,

    },
    privateDateText: {
        paddingTop: hpx(15),
        fontSize: nf(12),
        fontFamily: Fonts.regular,
        color: Colors.greyShade3,
        paddingLeft: wpx(10)
    },
    topRowContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    date: {
        paddingTop: hpx(15),
        fontSize: nf(12),
        paddingHorizontal: wpx(120),
        fontFamily: Fonts.semiBold,
        color: '#000000',
        paddingRight: wpx(10)
    },
    amountText: {
        paddingTop: hpx(15),
        fontSize: nf(12),
        paddingHorizontal: wpx(220),
        fontFamily: Fonts.medium,
        color: Colors.greyShade3,
        paddingRight: wpx(10)
    },
    paymentDetailsText: {
        marginTop: hpx(-10),
        fontSize: nf(14),
        fontFamily: Fonts.semiBold,
        color: Colors.greyShade3,
        textAlign: 'left',
        paddingLeft: wpx(20)
    }


})
