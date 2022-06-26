
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Colors, Fonts, hpx, nf, wpx } from '../../constants/constants';
import { types } from '../../store/ActionTypes';
import { checkCameraPermission, checkGalleryPermission } from '../../util/reusableFunctions';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const CammeraGalleryModal = ({ uploadImage, imageSelectionLimit }) => {
    // const [filePath, setFilePath] = useState({});
    const { cameraGalleryOptModal } = useSelector(state => ({
        cameraGalleryOptModal: state.globalReducer.cameraGalleryOptModal
    }), shallowEqual);
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch({
            type: types.TOGGLE_CAMERA_GALLERY_OPTION_MODAL,
            payload: false
        })
    }

    const openCamera = (type) => {
        checkCameraPermission().then((permission) => {
            if (permission) {
                let options = {
                    mediaType: "photos"
                };

                launchCamera(options, (response) => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                        closeModal()
                        // alert('User cancelled camera picker');
                        return;
                    } else if (response.errorCode == 'camera_unavailable') {
                        closeModal()
                        alert('Camera not available on device');
                        return;
                    } else if (response.errorCode == 'permission') {
                        closeModal()
                        alert('Permission not satisfied');
                        return;
                    } else if (response.errorCode == 'others') {
                        closeModal()
                        alert(response.errorMessage);
                        return;
                    }
                    else {
                        uploadImage(response.assets);
                        closeModal()
                    }
                });

            } else {
                alert("Allow camera permission")
            }
        })
    }


    const openGallery = (type) => {
        checkGalleryPermission().then((permission) => {
            let options = {
                mediaType: type,
                maxWidth: 300,
                maxHeight: 550,
                quality: 1,
                selectionLimit: imageSelectionLimit

            };
            if (permission) {
                let options = {
                    mediaType: type,
                    quality: 1,
                    selectionLimit: imageSelectionLimit
                };

                launchImageLibrary(options, (response) => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                        // alert('User cancelled camera picker');
                        closeModal()
                        return;
                    }
                    else if (response.errorCode == 'camera_unavailable') {
                        closeModal()
                        alert('Camera not available on device');
                        return;
                    }
                    else if (response.errorCode == 'permission') {
                        closeModal()
                        alert('Permission not satisfied');
                        return;
                    }
                    else if (response.errorCode == 'others') {
                        closeModal()
                        alert(response.errorMessage);
                        return;
                    }
                    else {
                        uploadImage(response.assets);
                        closeModal()
                    }
                });
            } else {
                alert("Allow gallery permission")
            }
        })
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={cameraGalleryOptModal}
            onRequestClose={() => { closeModal() }}
            onDismiss={() => { }}>
            <TouchableOpacity activeOpacity={1} style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ backgroundColor: Colors.white, borderRadius: wpx(20), padding: hpx(20) }}>
                    <Text style={styles.fpContentStyles}>Choose Option</Text>
                    <View style={styles.optionContainer}>
                        {/* open camera  */}
                        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => openCamera('photos')}>
                            <Text style={styles.imageText}>
                                Camera
                            </Text>
                        </TouchableOpacity>
                        {/* open gallery  */}
                        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => openGallery('photos')}>
                            <Text style={styles.imageText}>
                                Gallery
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* cancel button  */}
                    <TouchableOpacity style={styles.buttonParent} onPress={closeModal}>
                        <Text style={styles.cancelButton}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal >
    );
};

export default CammeraGalleryModal;

const styles = StyleSheet.create({
    fpContentStyles: {
        paddingHorizontal: wpx(35),
        marginTop: hpx(20),
        fontSize: nf(20),
        color: Colors.primaryOrange,
        fontFamily: Fonts.medium,
        textAlign: "center"
    },
    buttonParent: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        // justifyContent:"space-between",
        marginBottom: hpx(15),
        marginTop: hpx(30),
        paddingHorizontal: wpx(35),
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        // paddingHorizontal:10/375*width,
        marginTop: hpx(30),
    },
    imageText: {
        marginTop: hpx(5),
        fontSize: nf(18),
        color: Colors.chestnutRose,
        fontFamily: Fonts.regular,
        alignSelf: 'center'
    },
    image: {
        width: wpx(90),
        height: wpx(90),
    },
    cancelButton: {
        fontSize: nf(14),
        color: Colors.blackText,
        fontFamily: Fonts.regular,
        alignSelf: 'center'
    },
});
