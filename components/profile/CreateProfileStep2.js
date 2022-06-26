import React, { useState, useEffect, useCallback } from 'react'
import {
    View, Text, ImageBackground, StyleSheet, Image, TextInput,
    ScrollView, TouchableOpacity, FlatList, Dimensions, KeyboardAvoidingView,
    TouchableWithoutFeedback, Keyboard, Platform
} from 'react-native'
import { wp, wpx, hp, hpx, Fonts, nf, Icons, Colors } from '../../constants/constants'
import { CustomButton, CustomInputTextArea, CustomInputText, CammeraGalleryModal, SuccessModal } from '../common'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { types } from '../../store/ActionTypes';

const CreateProfileStep2 = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    //state variables for images

    const [count, setcount] = useState(0);
    const [location, setLocation] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const [certError, showCertError] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [certificateImages, setCertificateImages] = useState([]);

    useFocusEffect(
        useCallback(() => {
            if (Platform.OS == 'android') {
                const keyboardDidShowListener = Keyboard.addListener(
                    'keyboardDidShow',
                    () => {
                        console.log('keyboardDidShow')
                        setKeyboardVisible(true); // or some other action
                    }
                );
                const keyboardDidHideListener = Keyboard.addListener(
                    'keyboardDidHide',
                    () => {
                        console.log('keyboardDidShow')
                        setKeyboardVisible(false); // or some other action
                    }
                );
                return () => {
                    keyboardDidHideListener.remove();
                    keyboardDidShowListener.remove();
                };
            }
        }, [])
    );

    const openCameraGalleryModal = () => {
        dispatch({
            type: types.TOGGLE_CAMERA_GALLERY_OPTION_MODAL,
            payload: true
        })
    };

    const uploadImage = (image) => {
        let imgs = [...certificateImages, ...image]
        setCertificateImages(imgs);
        showCertError(false);

    }
    const removeCertificate = (index) => {
        let imgs = certificateImages.filter((val, i) => index !== i);
        setCertificateImages(imgs)
        if (imgs.length < 1) {
            showCertError(true)
        }

    }
    const userRegistration = () => {
        try {
            if (props.route.params.registrationValues?.certificateNo && certificateImages.length < 1) {
                showCertError(true)

                return
            }
            let values = props.route.params.registrationValues;
            let obj = {
                email: values.email?.trim(),
                password: values.password?.trim(),
                full_name: values.fullname?.trim(),
                phone: values.mobile?.trim(),
                username: values.username?.trim(),
                birth_date: values.dateOfBirth,
                gender: values.gender?.trim(),
                bio: aboutMe?.trim(),
                profileImage: values.profileImage,
                experience: values.experience ? values.experience?.trim() : values.experience,
                location_address: location?.trim(),
                certificates: certificateImages,
                certificate_no: values.certificateNo?.trim()
            }
            console.log("ProfileStep2", obj)
            dispatch({
                type: types.SIGN_UP,
                payload: obj
            })
        } catch (error) {
            console.log(error)
        }
    }

    const renderItem = ({ item, index }) => {
        if (item && item.uri) {
            return (
                <View style={{ flexDirection: "row" }}>

                    <ImageBackground source={Icons.imageContainer} style={styles.bg}>
                        <Image source={{ uri: item.uri }} style={styles.media} />
                    </ImageBackground>
                    <TouchableOpacity style={styles.crossIconParent} onPress={() => removeCertificate(index)}>
                        <Image source={Icons.crossRed} resizeMode="contain" style={styles.crossIcon} />
                    </TouchableOpacity>

                </View>
            );
        }
    };
    return (
        <View style={styles.container}>
            <SuccessModal />
            <CammeraGalleryModal uploadImage={uploadImage} imageSelectionLimit={5 - certificateImages.length} />
            <ImageBackground source={Icons.bg} resizeMode='cover' style={styles.bgimage}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={Icons.back} style={styles.image} />
                    </TouchableOpacity>
                    <Text style={styles.headertext}>Complete Profile</Text>

                </View>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <KeyboardAvoidingView behavior="height" style={styles.container}
                        contentContainerStyle={styles.container}>
                        <ScrollView style={styles.container}
                            contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between", paddingBottom: hpx(90) }}
                        >
                            <View style={{ width: wpx(335), alignSelf: "center" }}>
                                <Text style={styles.inputLabel}>Location</Text>
                                {/* Teacher Profile view starts here  */}

                                <CustomInputText style={styles.textinput}
                                    value={location}
                                    onChangeText={(val) => setLocation(val)} />

                                <Text style={styles.inputLabel}>About Me(Bio)</Text>
                                <CustomInputTextArea textStyle={styles.aboutInput}
                                    value={aboutMe}
                                    onChangeText={(val) => setAboutMe(val)} />


                                {props.route.params.registrationValues?.certificateNo ?
                                    <>
                                        <View style={styles.horizontalLine} />
                                        <Text style={styles.inputLabel}>Upload Certification*</Text>
                                        <View style={styles.certificateContainer}>
                                            {/* <View style={{ flexDirection: 'row' }}> */}
                                            {certificateImages.length > 4 ? null : <ImageBackground source={Icons.imageContainer}
                                                style={styles.bg2}
                                            >
                                                <View>

                                                    <TouchableOpacity onPress={() => openCameraGalleryModal()}>
                                                        <View style={styles.addContainer}>
                                                            <Image source={Icons.addIcon} resizeMode='contain' style={styles.add} />
                                                            <Text style={styles.addText} >Add</Text>
                                                        </View>

                                                    </TouchableOpacity>
                                                </View>

                                            </ImageBackground>}
                                            <FlatList
                                                style={styles.flalist}
                                                contentContainerStyle={styles.listContent}
                                                data={certificateImages}
                                                keyExtractor={(item, index) => item + index}
                                                renderItem={renderItem}
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                            />
                                        </View>
                                        {certError && <Text style={styles.error}>*Please add certificate</Text>}
                                    </> : null}

                            </View>
                            {!keyboardVisible && <View style={styles.buttonContainer}>
                                <CustomButton name="Submit" onPress={() => userRegistration()} />
                            </View>}
                        </ScrollView>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>

                {/* teacher profile viw ends here */}
            </ImageBackground>


        </View >
    );

}
export default CreateProfileStep2;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    bgimage: {
        height: "100%",
        width: "100%",
    },
    bg: {
        height: hpx(93),
        width: wpx(120),
        borderRadius: hpx(5),
        overflow: "hidden"
        // marginLeft: wpx(10)
    },
    bg2: {
        height: hpx(93),
        width: wpx(120),
        borderRadius: hpx(5),
        overflow: "hidden"
    },
    add: {
        height: hpx(17),
        width: wpx(17),
        marginLeft: wpx(49),
        marginTop: hpx(33)
    },
    header: {
        flexDirection: 'row',
        marginTop: hpx(50)
        // justifyContent:'flex-start'
    },
    image: {
        width: wpx(23),
        height: hpx(23),
        marginLeft: wpx(20),

        resizeMode: 'contain',
        // marginRight: wpx(332)
    },
    headertext: {

        fontFamily: Fonts.semiBold,
        fontSize: nf(16), textAlign: 'left',
        color: Colors.white,
        marginLeft: wpx(10),

    },
    inputContainer: {


        marginTop: hpx(42),
        marginLeft: wpx(29)


    },
    inputLabel: {
        marginTop: hpx(42),
        fontSize: nf(15),
        fontFamily: Fonts.semiBold,
        textAlign: 'left',
        color: Colors.white,
        // marginLeft: wpx(10),
        // marginTop: hpx(42)

    }, aboutText: {
        fontSize: nf(15),

        fontFamily: Fonts.semiBold,
        color: Colors.white,

        marginTop: hpx(63),
        marginLeft: wpx(29)

    }, addText: {
        fontSize: nf(15),
        color: '#130808',
        fontFamily: Fonts.regular,
        marginLeft: wpx(45),
        marginTop: hpx(2)
        //marginRight:wpx(45)

    },
    textinput: {

        marginTop: hpx(8),
        paddingHorizontal: wpx(10)

    },
    addContainer: {
        flexDirection: 'column',
        justifyContent: 'center',


    },
    aboutInput: {
        color: Colors.black,
        opacity: 0.7,
        fontFamily: Fonts.regular,
        fontSize: nf(14)
    },
    horizontalLine: {

        marginTop: hpx(60),
        width: wpx(335),
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,

    },
    buttonContainer: {
        width: wpx(335),

        // bottom: hpx(90),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"

    },
    certificateText: {
        marginTop: hpx(30),
        marginLeft: wpx(30),
        fontSize: nf(16),
        fontFamily: Fonts.semiBold,
        textAlign: 'left',
        color: '#F7F7F7'
    },
    certificateContainer: {
        flexDirection: 'row',
        marginTop: hpx(10),
        height: hpx(120),
        alignItems: "center",
        justifyContent: "center"
    },
    media: {


        width: wpx(110),
        height: hpx(80),
        margin: hpx(5),
        marginTop: hpx(6),


        backgroundColor: 'rgba(0,0,0,0.2)',

    }, buttonDelete: {

        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#6D52E1',
        borderRadius: 4,
    },
    titleDelete: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#000',
    },
    flalist: {
        height: hpx(120),

    },
    listContent: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: wpx(15)
    },
    crossIcon: {
        width: wpx(23),
        height: hpx(23),
    },
    crossIconParent: {
        zIndex: 1,
        alignSelf: "flex-start",
        right: wpx(12),
        bottom: wpx(7)
    },
    error: {
        fontSize: nf(13),
        color: Colors.errorRed,
        fontFamily: Fonts.regular,
    },
})
