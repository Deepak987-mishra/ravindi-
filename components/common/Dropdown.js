import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { wp, hp, nf, wpx, hpx, Fonts, Icons, Colors } from '../../constants/constants'

export const Dropdown = ({ item }) => {
  
    return (

        
            <View style={styles.cardContainer}>
              
                   

                    <Text style={styles.userName}>{item.classType}</Text>
                    

                </View>
               

     

    );
}

const styles = StyleSheet.create({


    cardContainer: {
        margin: hpx(2),
        width: wpx(100),
        height: hpx(15),
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
