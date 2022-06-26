import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { wp, wpx, hp, hpx, Fonts, nf, Icons, Colors } from '../../constants/constants'


export const CustomButton = ({ onPress, name, icon = false, style, textStyle = {} }) => {

    return (
        <TouchableOpacity onPress={onPress}
            style={[styles.buttonView, style]}>
            <Text style={[styles.buttontext, { ...textStyle }]}>{name}</Text>
            {icon ?
                <Image
                    source={Icons.rightArrow}

                    style={styles.arrow}

                />
                :
                null}
        </TouchableOpacity>

    )

}

const styles = StyleSheet.create({
    buttontext: {
        fontSize: nf(16),
        textAlign: 'left',
        color: Colors.white,
        fontFamily: Fonts.regular,
        paddingHorizontal: wpx(5)
    },
    arrow: {
        width: wpx(20),
        height: hpx(13.5),
        resizeMode: 'stretch',
    },
    buttonView: {
        width: wpx(300),
        height: hpx(50),
        backgroundColor: '#ED624A',
        borderRadius: hpx(5),
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",

    },


});


