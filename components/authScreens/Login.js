import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image, TextInput, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { wp, hp, nf, wpx, hpx, Fonts, Icons, Colors } from '../../constants/constants'
import { CustomButton, CustomInputText } from '../common';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { types } from '../../store/ActionTypes';


///formik validation////
const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().label("Password"),
})

export default Login = () => {
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogin = (values) => {
        dispatch({
            type: types.LOGIN,
            payload: values
        })
    }
    return (

        <View style={styles.container}>
            <ImageBackground
                source={Icons.bg}
                style={styles.bgcontainer} resizeMode='cover'
            >
                <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.contentStyles}>
                    <View style={styles.logoContainer}>
                        <Image source={Icons.logoLogin} style={styles.logo} resizeMode="contain" />
                    </View>

                    <View style={styles.contentContainer}>
                        <Text style={styles.welcomeText}>Welcome Back!</Text>
                    </View>

                    <View style={styles.contentContainer2}>
                        <Text style={styles.detailText}> Enter the following details and get Connected</Text>
                    </View>

                    {/* Formik Initial Values */}
                    <Formik
                        initialValues={{ email: 'bhawna@yopmail.com', password: 'Test1234' }}
                        onSubmit={values => handleLogin(values)}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                            <>
                                {/* Login View Starts here */}
                                <View style={styles.inputContainer}>

                                    <Text style={styles.inputLabel}>Email ID</Text>

                                    <CustomInputText
                                        keyboardType='email-address'
                                        onChangeText={handleChange("email")}
                                        onBlur={() => setFieldTouched("email")} />
                                    {touched.email && errors.email
                                        && <Text style={styles.errMsg}>* {errors.email}</Text>}

                                    <Text style={[styles.inputLabel, { marginTop: hpx(20) }]}>Password </Text>
                                    <View style={styles.textInputParent}>
                                        <View style={styles.opaqueView}></View>
                                        <TextInput style={{
                                            width: wpx(280),
                                            height: hpx(55),
                                            fontSize: nf(13.5),
                                            fontFamily: Fonts.regular,
                                            color: Colors.white,
                                        }}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            secureTextEntry={isSecureEntry}
                                            onChangeText={handleChange("password")}
                                            onBlur={() => setFieldTouched("password")} />

                                        {/* Show and hide password field fucntion */}
                                        <TouchableOpacity style={styles.eyeIconParent} onPress={() => { setIsSecureEntry(!isSecureEntry) }}>
                                            {isSecureEntry ?
                                                <Image source={Icons.eyeActive} style={styles.eyeIcon} resizeMode="contain" />
                                                : <Image source={Icons.eyeInactive} style={styles.eyeIcon} resizeMode="contain" />}
                                        </TouchableOpacity>

                                    </View>
                                    {touched.password && errors.password
                                        && <Text style={styles.errMsg}>* {errors.password}</Text>}
                                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={styles.forgotpasswordContainer}>
                                        <Text style={styles.forgotpasswordContent}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* Login View ends here */}


                                <View style={styles.signInButton}>
                                    <CustomButton onPress={handleSubmit} name='Sign in' icon={false} />

                                </View>
                            </>
                        )}
                    </Formik>
                    <View style={styles.bottomContainer}>
                        <Text style={styles.bottomtext}>Dont have an Account ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Registration")} ><Text style={styles.bottomtext2}>Register Now</Text></TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgcontainer: {
        width: "100%",
        height: "100%",
    },
    contentStyles: {
        flexGrow: 1,
        paddingBottom: hpx(100),
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        width: wpx(69),
        height: hpx(106),
    },
    logoContainer: {
        marginTop: hpx(80),
    },
    contentContainer: {
        marginTop: hpx(19),
    },
    welcomeText: {
        fontSize: nf(24),
        fontFamily: Fonts.semiBold,
        textAlign: 'center',
        color: Colors.white,
    },
    contentContainer2: {
        marginTop: hpx(19),
        width: wpx(220)
    },
    detailText: {
        fontSize: nf(16),
        fontFamily: Fonts.regular,
        textAlign: 'center',
        color: Colors.white
    },
    inputContainer:
    {
        marginTop: hpx(37),
        alignItems: "center",
        width: wpx(335),
    },
    inputLabel: {
        fontSize: nf(15),
        alignSelf: "flex-start",

        fontFamily: Fonts.semiBold,
        color: Colors.white,
    },
    textInput: {
        paddingHorizontal: wpx(10),
        marginTop: hpx(5),
        width: wpx(335),
        height: hpx(45),
        borderWidth: 1,
        borderColor: Colors.lightGreyBorder,
        backgroundColor: Colors.lightGreyBorder,
    },
    textInputParent: {
        paddingHorizontal: wpx(10),
        marginTop: hpx(5),
        width: wpx(335),
        height: hpx(45),
        overflow: "hidden",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",

    },
    passwordInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wpx(47),
        marginLeft: wpx(311),


    },
    errMsg: {
        color: 'red',
        fontSize: nf(13),
        color: Colors.white,
        alignSelf: "flex-start"
    },
    forgotpasswordContainer: {
        alignSelf: "flex-end",
        marginTop: hpx(10)
    },
    forgotpasswordContent: {
        fontSize: nf(14),
        fontFamily: Fonts.regular,
        textAlign: 'left',
        color: Colors.white,
    },

    signInButton: {
        marginTop: hpx(40),
        shadowColor: Colors.shadowGrey,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 3
    },
    bottomContainer: {
        flexDirection: 'row',
        marginTop: hpx(104)
    },
    bottomtext: {
        fontSize: nf(15),
        fontFamily: Fonts.regular,
        textAlign: 'left',
        color: '#000000',
    },
    bottomtext2: {
        fontSize: nf(15),
        fontFamily: Fonts.semiBold,
        textAlign: 'left',
        color: '#ED624A',
        marginLeft: wpx(5)
    },
    eyeIconParent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wpx(30),
        height: "100%"
    },
    eyeIcon: {
        width: hpx(18),
        height: hpx(18),
    },
    opaqueView: {
        position: "absolute",
        alignItems: "center",
        width: wpx(335),
        height: hpx(45),
        borderWidth: 1,
        borderColor: Colors.lightGreyBorder,
        backgroundColor: Colors.white,
        opacity: 0.4,
        zIndex: 0
    },

});



