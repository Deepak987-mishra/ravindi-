import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { wp, hp, nf, wpx, hpx, Fonts, Icons, Colors } from '../../constants/constants'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { types } from '../../store/ActionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const ClassCard = ({ item, screenName = "" }) => {

    const navigation = useNavigation()
    const dispatch = useDispatch();
    const class_id = item.class_id

    const fullName = item.full_name
    const getInitials = (fullName) => {
        let initials = fullName.split(' ');

        if (initials.length > 1) {
            initials = initials.shift().charAt(0) + initials.pop().charAt(0);
        } else {
            initials = fullName.substring(0, 2);
        }

        return initials.toUpperCase();
    }

    useEffect(() => {
        dispatch({
            type: types.CARD_DATA,
            payload: item
        })
    }, [])

    const onNavigate = () => {
        if (screenName == "GroupClass") {
            navigation.navigate("BookingDetail")
        }
        else if (screenName == "Home") {
            if (item.booking_type == "group") {
                dispatch({
                    type: types.GET_CLASS_BOOKING,
                    payload: class_id.toString()

                })
            }
            else if (item.booking_type == "private") {
                navigation.navigate("BookingDetail")
            }

        }
    }
    return (

        <TouchableOpacity onPress={() => onNavigate()}>
            <View style={styles.cardContainer}>

                <View style={{
                    flex: 0.85, borderColor: Colors.greyBorder,
                    borderWidth: 1,
                    borderTopLeftRadius: hpx(5),
                    borderTopRightRadius: hpx(5),
                    borderBottomWidth: 0.2,
                    paddingTop: hpx(22)
                }}>

                    <View style={styles.intialsParent}>
                        <Image source={Icons.ellipse412} style={styles.intialsBgImg} />
                        <Text style={styles.intialsText}> {getInitials(fullName)}</Text>
                    </View>

                    <Text style={styles.userName}>{item.full_name}</Text>
                    <Text style={styles.bookingId}>Booking ID:{item.class_id}</Text>

                    <View style={styles.cardimagesContent}>
                        <View style={styles.cardImages}>
                            <Image source={Icons.video} style={styles.cardIcon} resizeMode="contain" />
                            <Text style={styles.smallText}>{"video"}</Text>
                        </View>
                        <View style={[styles.cardImages, { marginHorizontal: wp(2) }]}>
                            <Image source={Icons.clock} style={styles.cardIcon} resizeMode="contain" />
                            <Text style={styles.smallText}>{item.scheduled_at}</Text>
                        </View>
                        <View style={styles.cardImages}>
                            <Image source={Icons.profile} style={styles.cardIcon} resizeMode="contain" />
                            <Text style={styles.smallText}>{item.booking_type}</Text>
                        </View>

                    </View>
                </View>
                <View style={styles.priceView}>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
            </View>

        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({


    cardContainer: {
        margin: hpx(2),
        width: wpx(178),
        height: hpx(208),
        backgroundColor: Colors.cardWhite,
        borderRadius: hpx(5),

    },
    intialsBgImg: {
        width: wpx(52),
        height: wpx(52),
    },
    intialsText: {
        fontSize: nf(16),
        fontFamily: Fonts.medium,
        color: Colors.cardWhite,
        textAlign: "center",
        position: "absolute"
    },
    intialsParent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
    },
    userName: {
        marginTop: hpx(5),
        fontSize: nf(13),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        color: Colors.blackText
    },
    bookingId: {
        marginTop: hpx(1),
        fontSize: nf(10),
        fontFamily: Fonts.regular,
        textAlign: 'center',
        color: Colors.blackText
    },
    cardImages: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    cardimagesContent: {
        marginTop: hp(0.5),
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    smallText: {
        fontFamily: Fonts.medium,
        fontSize: nf(10),
        color: Colors.blackText,
        textAlign: 'center',
        marginTop: hp(1)
    },
    cardIcon: {
        width: wpx(12),
        height: wpx(12),
    },
    cardContent5: {
        fontFamily: Fonts.medium,
        fontSize: nf(10),
        color: Colors.blackText, textAlign: 'center',
        paddingLeft: wpx(20)
    },
    priceView: {
        backgroundColor: Colors.greyShade2,
        flex: 0.18,
        borderWidth: 1,
        borderColor: Colors.greyBorder,
        shadowColor: Colors.shadowGrey,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 3,
        alignItems: "center",
        justifyContent: "center",
    },
    price: {
        fontSize: nf(15),
        fontFamily: Fonts.bold,
        textAlign: 'center',
        color: Colors.chestnutRose
    },






});

