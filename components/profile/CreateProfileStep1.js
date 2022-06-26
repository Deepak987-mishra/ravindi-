import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image, TextInput, ScrollView, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { wp, hp, nf, wpx, hpx, Fonts, Icons, Colors } from '../../constants/constants'
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CammeraGalleryModal, CustomButton, CustomInputText } from '../common';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { types } from '../../store/ActionTypes';
import { Formik } from 'formik';
import * as Yup from 'yup'

const CreateProfileStep1 = (props) => {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [gender, setGender] = useState(null)
    const [genderError, setGenderError] = useState(false)
    const [dateOfBirth, setDateOfBirth] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false)
    const [profileImage, setProfileImage] = useState(null);
    const genderList = [
        { gender: "Male", activeIcon: Icons.maleActive, inactiveIcon: Icons.maleInactive },
        { gender: "Female", activeIcon: Icons.femaleActive, inactiveIcon: Icons.femaleInactive },
        { gender: "Others", activeIcon: Icons.otherActive, inactiveIcon: Icons.otherInactive },
    ]

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setDateOfBirth(currentDate);
        if (Platform.OS == "android")
            setShow(false)
    };
    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode);
    }
    const showDatepicker = () => {
        showMode('date');
    };
    const openCameraGalleryModal = () => {
        dispatch({
            type: types.TOGGLE_CAMERA_GALLERY_OPTION_MODAL,
            payload: true
        })
    };
    const uploadImage = (image) => {
        console.log(image)
        setProfileImage(image[0])

    }
    const experienceRegExp = /^[1-9]*$/

    const validationSchema = Yup.object().shape(
        props.route.params.registrationValues?.certificateNo ? {
            username: Yup.string("").required("*Please enter username"),
            experience: Yup.number(0).required("*Please enter experience")
                .min(1, "*Required minimum 1 year Experience")
                .integer("*Please enter experience in years")
        } :
            {
                username: Yup.string("").required("*Please enter username")
            })
    const handleProfile = (values) => {
        if (!gender) {
            setGenderError(true)
            return
        }
        navigation.navigate("CreateProfileStep2",
            {
                registrationValues: {
                    ...props.route.params.registrationValues,
                    username: values.username,
                    experience: values.experience ? values.experience : 0,
                    gender: gender,
                    dateOfBirth: dateOfBirth
                }

            })

    }


    return (
        <>
            <CammeraGalleryModal uploadImage={uploadImage} imageSelectionLimit={1} />
            <ImageBackground source={Icons.bg} style={styles.bgContainer} resizeMode='cover'>

                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={Icons.back} style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.content}> Complete Profile</Text>
                </View>
                <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        style={styles.container}
                        contentContainerStyle={styles.contentStyle}>

                        <View style={styles.circleView}>
                            <Image source={profileImage ? { uri: profileImage.uri } : Icons.mask}
                                style={{
                                    width: hpx(150),
                                    height: hpx(150),
                                    borderRadius: hpx(75),

                                }}

                            />
                            <TouchableOpacity style={styles.cameraParent} onPress={() => openCameraGalleryModal()}>
                                <Image source={Icons.camera} style={styles.cameraIcon} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.middleContent}>Set your profile photo</Text>
                        <Text style={styles.middleContent2}>Please upload a picture for your profile</Text>
                        <View style={styles.horizontalLine} />
                        <Formik
                            initialValues={{ username: '', experience: '' }}
                            onSubmit={values => handleProfile(values)}
                            validationSchema={validationSchema}
                        >
                            {({ handleChange, handleSubmit, errors, setFieldTouched, touched, values }) => (
                                <View style={styles.textInputContainer}>
                                    <Text style={styles.inputName}>Username</Text>
                                    <CustomInputText onChangeText={handleChange("username")}
                                        onBlur={() => setFieldTouched("username")}
                                        value={values.username}
                                    />
                                    {touched.username && errors.username
                                        && <Text style={styles.error}>
                                            {errors.username}
                                        </Text>}
                                    <Text style={styles.inputName}>Date of Birth</Text>
                                    <TouchableOpacity style={styles.calendarContainer} onPress={() => setShow(!show)}>
                                        {/* <TouchableOpacity onPress={showDatepicker}> */}
                                        {/* <TextInput editable={false} value={moment(date).format('DD-MM-YYYY')} style={styles.calendartext} /> */}
                                        <View style={styles.opaqueView}></View>
                                        <Text style={styles.calendartext}>{moment(dateOfBirth).format('DD-MM-YYYY')}</Text>
                                        <Image source={Icons.whiteCalendar} style={styles.calendarImage} />

                                    </TouchableOpacity>
                                    {show && (
                                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                                            <DateTimePicker
                                                style={styles.datePicker}
                                                value={dateOfBirth}
                                                mode={mode}
                                                display={Platform.OS == "android" ? "default" : "spinner"}
                                                onChange={onChange}
                                            />
                                            {/* {Platform.OS == "ios" && <View style={{ flexDirection: "row", justifyContent: "space-between", width: wpx(300) }}>
                                                <CustomButton style={styles.pickerButtonStyle} textStyle={styles.pickerBtnText} name="Confirm" onPress={() => setShow(false)} />
                                            </View>} */}
                                        </View>
                                    )}
                                    {props.route.params.registrationValues?.certificateNo ?
                                        <>
                                            <Text style={styles.inputName}>Experience(In Years)</Text>
                                            <CustomInputText
                                                onChangeText={handleChange("experience")}
                                                onBlur={() => setFieldTouched("experience")}
                                                value={values.experience}
                                            />
                                            {touched.experience && errors.experience
                                                && <Text style={styles.error}>
                                                    {errors.experience.includes("NaN") ? "*Please enter experience in years" : errors.experience}
                                                </Text>}
                                        </> : null}

                                    <View style={{ alignSelf: 'flex-start', marginTop: hpx(12) }}>
                                        <Text style={styles.selectGenderText}>Select Gender*</Text>
                                    </View>
                                    <View style={styles.genderContainer}>
                                        {genderList.map((item) => {
                                            return <TouchableOpacity onPress={() => setGender(item.gender)} style={styles.genderButton}>
                                                <Image source={gender == item.gender ? item.activeIcon : item.inactiveIcon} style={styles.genderIcon} />
                                                <Text style={gender == item.gender ? styles.genderText : styles.genderTextInactive}>{item.gender}</Text>
                                                {gender == item.gender && <LinearGradient
                                                    start={{ x: 1, y: 0.5 }}
                                                    end={{ x: 0.3, y: 0.5 }}
                                                    colors={Colors.genderActiveColors}
                                                    style={styles.gradientView}>
                                                </LinearGradient>}
                                            </TouchableOpacity>
                                        })}

                                    </View>
                                    {genderError && <Text style={styles.genderErr}>*Please select gender</Text>}
                                    <View style={styles.buttonContainer}>
                                        <CustomButton name='Next' onPress={handleSubmit}
                                            style={{}} />
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </>

    );
}
export default CreateProfileStep1;

const styles = StyleSheet.create({
    container: { flex: 1 },
    contentStyle: {
        flexGrow: 1,

        alignItems: "center",
        justifyContent: "center",

    },
    bgContainer: { width: "100%", height: "100%", },
    topContainer: { flexDirection: 'row', marginTop: hpx(50) },

    icon: {
        width: wpx(23),
        height: hpx(23),
        marginLeft: wpx(15),
        resizeMode: 'contain',
    },
    content: {
        fontFamily: Fonts.semiBold,
        fontSize: nf(16),
        textAlign: 'left',
        color: '#FFFFFF',
        marginLeft: wpx(10),
        marginRight: wpx(187)
    },
    circleView: { marginTop: hpx(32), width: hpx(150), height: hpx(150), borderRadius: hpx(75), },
    cameraParent: {
        width: hpx(34),
        height: hpx(34),
        borderRadius: hpx(34 / 2),
        backgroundColor: '#FA6A3D',
        borderColor: 'white',
        borderWidth: wpx(2),
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        bottom: hpx(10),
        right: hpx(10)
    },
    cameraIcon: {
        width: wpx(14),
        height: hpx(13),
        resizeMode: 'contain',
    },
    middleContent: { marginTop: hpx(11), fontFamily: Fonts.semiBold, fontSize: nf(16), textAlign: 'left', color: '#FFFFFF', },
    middleContent2: { marginTop: hpx(2), fontFamily: Fonts.regular, fontSize: nf(14), textAlign: 'left', color: '#FFFFFF', },
    horizontalLine: {
        alignSelf: "stretch",
        marginRight: wpx(20),
        marginLeft: wpx(20),
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 0.3,
        marginTop: hpx(32),


    },
    textInputContainer: {
        marginTop: hpx(20),

    },
    inputName: {
        fontSize: nf(15),
        textAlign: 'left',
        fontFamily: Fonts.semiBold,
        color: '#F7F7F7',
        marginTop: hpx(7),
        marginBottom: hpx(3)
    },
    textInput1: {
        marginTop: hpx(5),
        marginRight: wpx(20),
        width: wpx(335), height: hpx(45),
        borderWidth: 1, borderColor: '#D3D3D3',
        backgroundColor: '#D3D3D3'
    },
    textExperience: {
        marginTop: hpx(11),
        fontSize: nf(15),
        textAlign: 'left',
        fontFamily: Fonts.semiBold,
        color: '#F7F7F7'
    },
    birthText: {
        marginTop: hpx(11),
        fontSize: nf(15),
        textAlign: 'left',
        fontFamily: Fonts.semiBold,
        color: '#F7F7F7'

    },
    calendarContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: wpx(10),
        width: wpx(335),
        height: hpx(45),

    },
    calendarView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    calendarImage: {
        marginRight: wpx(5),
        width: wpx(15),
        height: hpx(15),
        resizeMode: 'contain',
    },
    calendartext: {
        fontSize: nf(14),
        fontFamily: Fonts.regular,
        color: Colors.white

    },
    selectGenderText: {

        // marginLeft: wpx(30),
        fontSize: nf(16), fontFamily: Fonts.semiBold,
        textAlign: 'left',
        color: '#F7F7F7'
    }, genderContainer: {
        flexDirection: "row", marginTop: hpx(7),
        justifyContent: "space-between"

    },
    genderButton: {
        width: wpx(93),
        height: hpx(103),
        borderRadius: hpx(5),
        overflow: "hidden",
        backgroundColor: Colors.white,
        alignItems: "center",
        justifyContent: "center",
    },

    genderIcon: {

        width: wpx(26),
        height: hpx(26),

        resizeMode: 'contain',


    },
    genderText: {
        paddingTop: hpx(2),
        fontSize: nf(15),
        textAlign: 'left',
        fontFamily: Fonts.medium,
        color: Colors.black
    },
    genderTextInactive: {
        paddingTop: hpx(2),
        fontSize: nf(15),
        textAlign: 'left',
        fontFamily: Fonts.regular,
        color: Colors.black,
        opacity: 0.7
    },
    gradientView: {
        width: wpx(93),
        height: hpx(19),
        position: "absolute",
        bottom: 0
    },
    genderIcon2: {
        width: wpx(15),
        height: hpx(25),
        marginLeft: wpx(39),
        marginTop: hpx(32),
        resizeMode: 'contain',
    },
    error: {
        width: wpx(335),
        fontSize: nf(12),
        color: Colors.white,
        fontFamily: Fonts.regular,
    },
    genderErr: {
        fontSize: nf(12),
        color: Colors.errorRed,
        fontFamily: Fonts.regular,
        marginTop: hp(1)
    },
    femaleText: {
        paddingLeft: wpx(23),
        paddingTop: hpx(3),
        fontSize: nf(15),
        textAlign: 'left',
        fontFamily: Fonts.regular,
        color: '#130808'
    },
    genderIcon3: {
        width: wpx(23),
        height: hpx(26),
        marginLeft: wpx(35),
        marginTop: hpx(33),
        resizeMode: 'contain',
    },
    othersText: {
        paddingTop: hpx(2),
        fontSize: nf(15),
        fontFamily: Fonts.regular,
        color: '#130808'
    },
    buttonContainer: { marginTop: hpx(35), marginBottom: hpx(71), marginLeft: wpx(20) },
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
    datePicker: {
        width: wpx(300),
        height: hpx(150),
        marginTop: hpx(5),
        backgroundColor: Colors.white,
        alignSelf: "center"
    },
    pickerButtonStyle: {
        alignSelf: "center",
        width: wpx(300),
        height: hpx(40),
        borderRadius: 0,
        backgroundColor: Colors.white
    },
    pickerBtnText: {
        fontSize: nf(12),
        fontFamily: Fonts.regular,
        color: '#130808'
    },
})
