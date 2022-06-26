import React, { useState, useEffect } from 'react'
import {
    View, Text, ImageBackground, StyleSheet,
    Image,
    ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { wp, wpx, hp, hpx, Fonts, nf, Icons, Colors } from '../../constants/constants'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { CustomButton, CustomInputText, CustomInputPhone } from '../common'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({

    fullname: Yup.string().required(),
    mobile: Yup.string()
        .required("required")
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, "too short")
        .max(10, "too long"),
    email: Yup.string().required().email().label("Email"),
    certificateNo: Yup.string(),
    password: Yup.string().required().min(4).label("Password"),
})

const Registration = () => {
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const [countryCode, setCountryCode] = useState('IN')
    const [callingCode, setcallingCode] = useState('91')
    const navigation = useNavigation();

    const handleRegistration = (values) => {
        values.mobile = "+" + callingCode + "-" + values.mobile;
        navigation.navigate('CreateProfileStep1', { registrationValues: values })
    }

    return (
        //<KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableshift}>


        <KeyboardAvoidingView behavior="height"
            // keyboardVerticalOffset={Platform.OS == "android" ? -hpx(270) : 0}
            style={styles.container}>
            <ImageBackground source={Icons.bg}
                resizeMode='cover'
                style={styles.image}>
                <>
                    <ScrollView bounces={false}
                        style={styles.container}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: hpx(100) }}>

                        <View style={styles.logocontainer}>
                            <Image source={Icons.logoLogin} style={styles.logoimage} />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.signupText} >Sign up</Text>
                        </View>
                        <View style={styles.content1}>
                            <Text style={styles.infoText}>Add Info To Register With Ravindi</Text>

                        </View>
                        <Formik
                            initialValues={{ fullname: 'Bhawna', mobile: '8989898989', certificateNo: '', email: 'ashu@gmail.com', password: 'Ashu12345' }}
                            onSubmit={values => handleRegistration(values)}
                            validationSchema={validationSchema}
                        >
                            {({ handleChange, handleSubmit, errors, setFieldTouched, touched, values }) => (
                                <>
                                    <View style={styles.textinputContainer}>

                                        <Text style={styles.inputLabel}>Full Name*</Text>
                                        <CustomInputText
                                            value={values.fullname}
                                            onChangeText={handleChange("fullname")}
                                            onBlur={() => setFieldTouched("fullname")}

                                        />
                                        {touched.fullname && errors.fullname && <Text style={styles.error}>{errors.fullname}</Text>}

                                        <Text style={styles.inputLabel}>Mobile Number</Text>
                                        <View Style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <CustomInputPhone
                                                style={{}}
                                                onChangeText={handleChange("mobile")}
                                                onBlur={() => setFieldTouched("mobile")}
                                                value={values.mobile}
                                                countryCode={countryCode}
                                                callingCode={callingCode}
                                                onChangeCountryCode={(val) => setCountryCode(val)}
                                                onChangeCallingCode={(val) => setcallingCode(val)}

                                            />
                                        </View>
                                        {touched.mobile && errors.mobile
                                            && <Text style={styles.error}>
                                                {errors.mobile}
                                            </Text>}
                                        <Text style={styles.inputLabel}>
                                            Ravindi Certificate Number</Text>
                                        <CustomInputText
                                            value={values.certificateNo}
                                            onChangeText={handleChange("certificateNo")}
                                            onBlur={() => setFieldTouched("certificateNo")}

                                        />

                                        {touched.certificateNo && errors.certificateNo
                                            && <Text style={styles.error}>
                                                {errors.certificateNo}
                                            </Text>}

                                        <Text style={styles.inputLabel}>Email Id*</Text>
                                        <CustomInputText
                                            keyboardType="email-address"
                                            value={values.email}
                                            onChangeText={handleChange("email")}
                                            onBlur={() => setFieldTouched("email")}
                                        />
                                        {touched.email && errors.email
                                            && <Text style={styles.error}>
                                                {errors.email}
                                            </Text>}
                                        <Text style={styles.inputLabel}>Password*</Text>

                                        <View style={styles.password}>
                                            <TouchableOpacity style={{
                                                marginLeft: wpx(10)
                                            }} onPress={() => {
                                                setIsSecureEntry((prev) => !prev);
                                            }} >
                                                <CustomInputText
                                                    value={values.password}
                                                    autoCapitalize="none"
                                                    autoCorrect={false}
                                                    secureTextEntry={isSecureEntry}
                                                    onChangeText={handleChange("password")}
                                                    onBlur={() => setFieldTouched("password")} />


                                                <View style={styles.pass}>
                                                    {isSecureEntry ?
                                                        <Image source={Icons.eyeActive} style={styles.passImage} />
                                                        :
                                                        <Image source={Icons.eyeInactive} style={styles.passImage} />}
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                        {touched.password && errors.password
                                            && <Text style={styles.error}>
                                                {errors.password}
                                            </Text>}
                                    </View>
                                    <View style={styles.container2}>
                                        <Text style={styles.bottomText}>By Continuing you agree to our </Text>

                                    </View>
                                    <TouchableOpacity >
                                        <Text style={styles.termsCondition}>Terms & Condition</Text>
                                    </TouchableOpacity>
                                    <View style={styles.ButtonContainer}>
                                        <CustomButton name="Continue" onPress={handleSubmit} />
                                    </View>


                                    <View style={styles.ButtonContainer1}>
                                        <Text style={styles.accountText}>Already have an account ? </Text>
                                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                            <Text style={styles.buttonText1}>Sign in now</Text>
                                        </TouchableOpacity>
                                    </View>

                                </>
                            )}
                        </Formik>
                    </ScrollView>
                </>
            </ImageBackground>
        </KeyboardAvoidingView>

    )
}
export default Registration;
const styles = StyleSheet.create({
    container: {
        flex: 1,



    },
    image: {
        height: "100%",
        width: "100%",

    },
    logocontainer: {
        alignSelf: 'center',
        marginTop: hpx(80)
    },
    logoimage: {
        width: wpx(69),
        height: hpx(106),
        resizeMode: 'contain'


    }, textinputContainer: {
        marginTop: hpx(24),
        marginLeft: wpx(20)
    }
    , text: {
        fontSize: 40,
        fontWeight: 'bold'
    }, content: {

        marginTop: hpx(16),
        alignSelf: 'center'

    }, content1: {
        flexDirection: 'column',
        marginTop: hpx(4),
        justifyContent: 'center',
        alignItems: 'center'


    },
    innerView: {},
    mobilepickerView: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wpx(34),
        marginLeft: wpx(-200),

    },
    verticalLine: {
        height: hpx(37),
        width: 1,
        backgroundColor: Colors.white,
        marginLeft: wpx(-140),
        marginTop: hpx(-45)
    },
    signupText: {
        fontSize: nf(24),

        fontFamily: Fonts.semiBold,
        textAlign: 'center',
        color: Colors.white

    }, infoText: {
        fontSize: nf(16),
        //fontWeight: 'bold',
        fontFamily: Fonts.regular,
        textAlign: 'center',
        color: Colors.white
    }, input_container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hpx(10),

        marginLeft: wpx(20)
    },
    textinput: {
        fontSize: nf(15),
        marginTop: hpx(8),

        fontFamily: Fonts.semiBold,
        textAlign: 'left',
        color: Colors.white

    },
    textinput2: {
        fontSize: nf(15),

        marginRight: wpx(281),
        marginTop: hpx(11),
        fontFamily: Fonts.semiBold,
        textAlign: 'left',
        color: Colors.white

    },
    error: {
        fontSize: nf(15),
        color: Colors.white,
        fontFamily: Fonts.regular,
    },
    inputLabel: {
        fontSize: nf(15),
        marginTop: hpx(11),
        fontFamily: Fonts.semiBold,
        textAlign: 'left',
        color: Colors.white

    }, mobileInput: {
        justifyContent: 'center',
        alignItems: 'center',

    }, certificate: {
        fontSize: nf(15),
        marginTop: hpx(17),
        fontFamily: Fonts.semiBold,
        textAlign: 'left',
        color: Colors.white
    },
    password: {
        justifyContent: 'center',
        alignItems: 'center',

    }, pass: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wpx(47),
        marginLeft: wpx(311),
    }, passImage: {

        width: wpx(17),
        height: hpx(11),
        marginTop: hpx(-40),
        resizeMode: 'contain',

    },
    container2: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: hpx(19),
    },
    bottomText: {
        fontSize: nf(13),
        fontFamily: Fonts.regular,
        color: '#130808',
        textAlign: 'center'

    },
    termsCondition: {
        fontSize: nf(13),
        textAlign: 'center',
        fontFamily: Fonts.regular,
        color: Colors.primaryOrange


    }, ButtonContainer: {

        flexDirection: 'row',

        marginTop: hpx(30),
        marginLeft: wpx(38),
        marginRight: wpx(37),

    }, ButtonContainer1: {

        flexDirection: 'row',
        marginLeft: wpx(44),
        marginTop: hpx(42),



    }, button: {
        backgroundColor: '#ED624A',
        width: wpx(300),
        height: hpx(50),
        borderRadius: 5
    }, buttonText: {
        paddingLeft: wpx(114),
        paddingRight: wpx(113),
        paddingTop: hpx(14),
        paddingBottom: hpx(13),
        fontSize: nf(16),
        fontFamily: Fonts.regular,
        textAlign: 'left',
        color: Colors.white
    }, accountText: {

        fontSize: nf(15),
        fontFamily: Fonts.regular,
        color: '#000000',


    }, buttonText1: {


        fontSize: nf(15),
        fontFamily: Fonts.semiBold,
        color: '#ED624A',
        marginRight: wpx(43),


    }


});


