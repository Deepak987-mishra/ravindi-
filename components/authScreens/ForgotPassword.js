import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Login from './Login'
import { useNavigation } from '@react-navigation/native';
import { wp, wpx, hp, hpx, Fonts, nf, Icons, Colors } from '../../constants/constants'
import { CustomButton, CustomInputText } from '../common'

const ForgotPassword = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <ImageBackground source={Icons.bg}
                resizeMode='cover'
                style={styles.bgImage}>

                <View style={styles.imagecontainer}>
                    <Image source={Icons.forget} style={styles.forgetImage} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.forgetpassText} >Forget Password</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.infoText}>Don’t worry, we will help you.</Text>
                    <Text style={styles.infoText} > Please Enter your email to get a</Text>
                    <Text style={styles.infoText} > password, reset sent to your inbox.</Text>
                </View>

                < View style={styles.textinputContainer}>
                    <Text style={styles.textinput}>Email Id </Text>
                    <CustomInputText
                        keyboardType="email-address"
                        //  onChangeText={handleChange("email")}
                        onBlur={() => setFieldTouched("email")}

                    />
                </View>

                <View style={styles.buttonContainer}>
                    <CustomButton name="Submit" />
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginLeft: wpx(129), marginTop: hpx(68),
                }}>
                    <Text style={{
                        fontSize: nf(15), fontFamily: Fonts.regular, color: '#000000',

                    }}>Back To  </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.touchable1}>Sign in </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View >
    )
}
export default ForgotPassword;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    bgImage: {
        height: "100%",
        width: "100%",

    }, imagecontainer: {

        marginTop: hpx(49),
        alignSelf: 'center'
    },
    forgetImage: {
        width: wpx(191),
        height: hpx(191),
        resizeMode: 'contain'


    }, content: {

        marginTop: hpx(24),


    }, forgetpassText: {
        fontSize: nf(26),
        fontFamily: Fonts.semiBold,
        textAlign: 'center',
        color: Colors.white

    }, textContainer: {
        flexDirection: 'column',
        marginTop: hpx(15),
        alignSelf: 'stretch'


    }, infoText: {
        fontSize: nf(16),

        fontFamily: Fonts.regular,
        textAlign: 'center',
        color: Colors.white
    },
    textinputContainer: {
        marginTop: hpx(23),
        marginLeft: wpx(20)
    }, textinput: {
        fontSize: nf(15),
        marginLeft: wpx(11),
        fontFamily: Fonts.semiBold,
        textAlign: 'left',
        color: Colors.white
    }, touchable1: {
        fontSize: nf(15),
        fontFamily: Fonts.semiBold,
        color: '#2093DB',

        textDecorationLine: "underline"


    }, buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hpx(42),

    }
})


