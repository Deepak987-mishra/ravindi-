import React, { useState, useEffect } from 'react'
import { View, Text, useWindowDimensions, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, Animated, FlatList, Alert } from 'react-native';
import { TabView, SceneMap, } from 'react-native-tab-view';
import { Fonts, hpx, Icons, nf, wpx, wp, hp, Colors } from '../../constants/constants';
import { CammeraGalleryModal, CustomButton, CustomInputText } from '../common';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { types } from '../../store/ActionTypes';
import { useSelector } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup'

import AsyncStorage from '@react-native-async-storage/async-storage';
// 

const PrivateClass = ({ route }) => {
    const dispatch = useDispatch();

    const [certificateImages, setCertificateImages] = useState([]);
    const [image, setImage] = useState('')
    const [viewClassList, setViewClassList] = useState(false)
    const [viewTZList, setViewTZList] = useState(false)
    const { createClassTabIndex, classTypeList, timeZoneList } = useSelector(state => ({
        createClassTabIndex: state.createClassReducer.createClassTabIndex,
        classTypeList: state.createClassReducer.classTypeList,
        timeZoneList: state.createClassReducer.timeZoneList,

    }));
    ///formik validation////
    const validationSchema = Yup.object().shape({
        price: Yup.number().required().label("Enter Price"),
        details: Yup.string().required().label("Details"),
        //title: Yup.string().required().label("Upload"),
    })


    const handleCreateclass = (values) => {

        let body = {
            "class_mode": values.class_mode,
            "description": values.details,
            "price": values.price,
            "class_id": values.selectedClass.id,
            "timezone": values.selectedTime.title,
            "image": image
        }
        console.log('body', body)

        if (!(body.class_id || body.timezone)) {
            Alert.alert("Select Class type and TimeZone")
            return
        }
       else if (!(body.class_id)) {
            Alert.alert("Select Class type")
            return
        }
        if (!body.timezone) {
            Alert.alert("Select TimeZone ")
            return
        }

        dispatch({
            type: types.CREATE_CLASS,
            payload: body,
        })

    }
    const openCameraGalleryModal = () => {
        dispatch({
            type: types.TOGGLE_CAMERA_GALLERY_OPTION_MODAL,
            payload: true
        })
    };
    const uploadImage = (image) => {
        console.log('uploadImage', image)
        setImage(image[0])

    }


    return (
        <View style={styles.setPricecontainer}>
            <CammeraGalleryModal imageSelectionLimit={1} uploadImage={uploadImage} />
            <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: hpx(100) }}
                showsVerticalScrollIndicator={false} >
                <View style={styles.row}>
                    <View style={styles.column}>
                        {/* Formik Initial Values */}
                        <Formik
                            initialValues={{
                                price: '', details: '', title: '',
                                class_mode: createClassTabIndex == 0 ? "private" : "group",
                                selectedClass: '', selectedTime: '',
                            }}
                            onSubmit={values => handleCreateclass(values)}
                            validationSchema={validationSchema}
                        >
                            {({ handleChange, handleSubmit, errors, setFieldTouched, setFieldValue, touched, values }) => (
                                <>

                                    <Text style={styles.priceText}>Price($) * </Text>
                                    <TextInput style={styles.priceInput}
                                        value={values.price}
                                        onChangeText={handleChange("price")}
                                        onBlur={() => setFieldTouched("price")}
                                    />
                                    {touched.price && errors.price
                                        && <Text style={styles.errMsg}>* {errors.price}</Text>}

                                    <Text style={styles.detailText}> Details *</Text>
                                    <TextInput style={styles.detailInput} multiline
                                        textAlignVertical="top"
                                        onChangeText={handleChange("details")}
                                        onBlur={() => setFieldTouched("details")}

                                    />
                                    {touched.details && errors.details
                                        && <Text style={styles.errMsg}>* {errors.details}</Text>}

                                    <View style={styles.horizontalLine} />

                                    <View style={styles.selectClasscontainer}>
                                        <Text style={styles.selectClasstext}>{"Select Class*"}</Text>
                                        <View style={{ flexDirection: "column" }}>
                                            <TouchableOpacity
                                                style={[styles.picker, viewClassList ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {}]}
                                                onPress={() => {
                                                    setViewClassList(!viewClassList);
                                                    setViewTZList(false);
                                                }}>
                                                <Text style={{ color: Colors.greyShade4, fontFamily: Fonts.light, fontSize: nf(12) }}>{values.selectedClass.title}</Text>
                                                <Image source={Icons.dropDownGrey} />
                                            </TouchableOpacity>
                                            {viewClassList && <ScrollView
                                                style={{ width: wpx(134), maxHeight: hpx(100) }}
                                                contentContainerStyle={styles.listContainer}
                                            >
                                                {classTypeList.map((item, index) => <TouchableOpacity
                                                    onPress={() => {
                                                        setFieldValue('selectedClass', item);
                                                        setViewClassList(!viewClassList)
                                                        setViewTZList(false)
                                                    }}>
                                                    <Text style={styles.listOption}>
                                                        {item.title}
                                                    </Text>
                                                </TouchableOpacity>)}
                                            </ScrollView>}
                                        </View>

                                    </View>
                                    <View style={styles.timezoneView}>
                                        <Text style={styles.selectClasstext}>{"Select TimeZone*"}</Text>
                                        <View style={{ flexDirection: "column" }}>
                                            <TouchableOpacity
                                                style={[styles.picker, viewTZList ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {}]}
                                                onPress={() => {
                                                    setViewTZList(!viewTZList)
                                                    setViewClassList(false)
                                                }}>
                                                <Text style={{ color: Colors.greyShade4, fontFamily: Fonts.light, fontSize: nf(12) }}>{values.selectedTime.title}</Text>
                                                <Image source={Icons.dropDownGrey} />
                                            </TouchableOpacity>
                                            {viewTZList && <ScrollView
                                                style={{ width: wpx(134), maxHeight: hpx(100) }}
                                                contentContainerStyle={styles.listContainer}
                                            >
                                                {timeZoneList.map((item, index) => <TouchableOpacity
                                                    onPress={() => {
                                                        setFieldValue('selectedTime', item);
                                                        setViewTZList(!viewTZList)
                                                        setViewClassList(false)
                                                    }}>
                                                    <Text style={styles.listOption}>
                                                        {item.title}
                                                    </Text>
                                                </TouchableOpacity>)}
                                            </ScrollView>}
                                        </View>

                                    </View>

                                    {/* <View style={styles.timezoneView}>
                                        <Text style={styles.timezoneText}>Select TimeZone</Text>
                                        <Picker
                                            style={styles.picker}
                                            selectedValue={values.selectedTime}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setFieldValue('selectedTime', itemValue)
                                            }>
                                            <Picker.Item label="IST" value="1" />
                                            <Picker.Item label="GMT" value="2" />
                                        </Picker>
                                    </View> */}
                                    <View style={styles.uploadContainer}>
                                        <Text style={styles.uploadText}>Upload</Text>
                                        <View style={styles.uploadTextInput}>
                                            <TouchableOpacity onPress={() => openCameraGalleryModal()}
                                                style={styles.uploadInput}>
                                                <Text numberOfLines={1} style={{
                                                    paddingHorizontal: wpx(10),
                                                    fontSize: nf(13),
                                                    color: Colors.greyShade4,
                                                    height: hpx(25),
                                                    width: wpx(280),
                                                }}>{image ? image.uri.replace(/^.*[\\\/]/, '').replace("rn_image_picker_lib_temp_", "") : null}</Text>

                                                <View style={styles.uploadImageContainer}>
                                                    <Image source={Icons.upload}
                                                        style={styles.uploadImage} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        {touched.upload && errors.upload
                                            && <Text style={styles.errMsg}>* {errors.upload}</Text>}

                                    </View>

                                    <View style={{ marginTop: hpx(44), alignSelf: "center" }}>
                                        <CustomButton name="Set" onPress={handleSubmit} />
                                    </View>
                                </>
                            )}
                        </Formik>
                    </View>
                </View>
            </ScrollView>
        </View >
    )
};
export default PrivateClass;

const styles = StyleSheet.create({
    setPricecontainer: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
    row: {
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: wpx(310),
        alignSelf: "center",
    },
    priceText: {
        fontFamily: Fonts.regular,
        fontSize: nf(14),
        color: "#262626",
        marginTop: hpx(42)
    },
    detailText: {
        fontFamily: Fonts.regular,
        fontSize: nf(14),
        color: "#262626",
        marginTop: hpx(35)
    },
    priceInput: {
        backgroundColor: Colors.white,
        borderColor: '#D3D3D3',
        height: hpx(45),
        width: wpx(310),
        fontFamily: Fonts.regular,
        color: Colors.greyShade4,
        fontSize: nf(12),

    },
    detailInput: {
        fontFamily: Fonts.regular,
        color: Colors.greyShade4,
        fontSize: nf(12),
        backgroundColor: Colors.white,
        borderColor: '#D3D3D3',
        height: hpx(150),
        width: wpx(310)
    },
    horizontalLine: {
        borderBottomWidth: 1,
        borderColor: '#EAEAEA',
        marginVertical: hpx(30)
    },
    selectClasscontainer: {
        flexDirection: 'row',
        width: wpx(310),
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: -1,
    },
    selectClasstext: {
        fontFamily: Fonts.regular,
        fontSize: nf(14),
        color: "#262626",
        marginTop: hpx(7),
    },
    picker: {
        flexDirection: "row",
        height: hpx(35),
        width: wpx(134),
        backgroundColor: Colors.white,
        borderRadius: wpx(20),
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wpx(10)
    },
    timezoneView: {
        justifyContent: "space-between",
        flexDirection: 'row',
        marginTop: hpx(26),
        zIndex: -1
    },
    timezoneText: {
        fontFamily: Fonts.regular,
        fontSize: nf(14),
        color: "#262626",
    },
    uploadText: {
        fontFamily: Fonts.regular,
        fontSize: nf(14),
        color: "#262626",
        marginBottom: hpx(5)
    },
    uploadInput: {
        backgroundColor: 'white',
        borderColor: '#D3D3D3',
        color: Colors.black,
        height: hpx(45),
        width: wpx(310),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    tabBar: {
        flexDirection: 'row',
        // backgroundColor: '#ED624A',
        marginTop: hpx(50),
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20, borderTopRightRadius: 20
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: wp(3),
        flexDirection: 'row',
        width: wpx(140), height: hpx(35),
        marginBottom: hpx(10), padding: 0,
    },
    textTab: {
        color: 'black',
        fontSize: nf(16),
        fontFamily: Fonts.bold,
        marginBottom: hp(0.5)
    }, titleText: {

        fontFamily: Fonts.regular,
        fontSize: nf(14),
        color: "#262626", marginTop: hpx(42)

    }, price: {

        fontFamily: Fonts.regular,
        fontSize: nf(14),
        color: "#262626", marginTop: hpx(35)

    }, totalStudent: {
        fontFamily: Fonts.regular,
        fontSize: nf(14),
        color: "#262626",

    }, studentContainer: {

        height: hpx(35),
        width: wpx(100),
        backgroundColor: Colors.white,
        marginTop: hpx(-10),
        marginLeft: wpx(47),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,



    }, decrementText: {

        marginLeft: wpx(22), marginTop: hpx(12), fontFamily: Fonts.light,
        fontSize: nf(12)

    }, quantityText: {

        marginLeft: wpx(10), marginTop: hpx(12), fontFamily: Fonts.light,
        fontSize: nf(12)

    }, incText: {

        marginLeft: wpx(10), marginTop: hpx(12), fontFamily: Fonts.light,
        fontSize: nf(12),

    }, classContainer: {

        height: hpx(35),
        width: wpx(134),
        backgroundColor: Colors.white,
        marginLeft: wpx(55),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,



    },
    buttonView: {
        marginTop: hpx(44), marginLeft: wpx(38)
    },
    uploadContainer: {
        flexDirection: 'column',
        marginTop: hpx(26),
        zIndex: 0
    },
    uploadTextInput: {

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'

    },
    uploadImageContainer: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    }, uploadImage: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    listOption: {
        color: Colors.greyShade4,
        fontFamily: Fonts.light,
        fontSize: nf(12),
        marginVertical: hpx(5),
        borderBottomWidth: 1,
        borderBottomColor: Colors.shadowGrey
    },
    listContainer: {
        flexGrow: 1,
        backgroundColor: Colors.white,
        padding: wpx(5),
        borderBottomLeftRadius: wpx(10),
        borderBottomRightRadius: wpx(10)
    }



    // textTab: {
    //     color: 'white',
    //     fontSize: nf(16),
    //     fontFamily: Fonts.bold,
    //     marginBottom: hp(0.5)
    // }
});
