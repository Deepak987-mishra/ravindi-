
import React, { } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Modal,
    ImageBackground,
} from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Colors, Fonts, hpx, Icons, nf } from '../../constants/constants';
import { types } from '../../store/ActionTypes';



const SuccessModal = ({ uploadImage, imageSelectionLimit }) => {
    // const [filePath, setFilePath] = useState({});
    const { successModal, successMessage } = useSelector(state => ({
        successModal: state.globalReducer.successModal,
        successMessage: state.globalReducer.successMessage,
    }), shallowEqual);
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch({
            type: types.TOGGLE_SUCCESS_MODAL,
            payload: false
        })
        dispatch({
            type: types.SET_SUCCESS_MESSAGE,
            payload: ""
        })
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={sccessModal}
            onRequestClose={() => { }}
            onDismiss={() => { }}>
            <ImageBackground source={Icons.bg} style={styles.modalBg}>
                <Image source={Icons.success} style={styles.successIcon} />
                <Text style={styles.successText}>Success!</Text>
                <View style={styles.successMsgParent}>
                    <Text style={styles.successMsg}>{successMessage}</Text>
                </View>
            </ImageBackground>
        </Modal >
    );
};

export default SuccessModal;

const styles = StyleSheet.create({
    modalBg: {
        width: "100%",
        height: "100%",
        alignItems: "center"
    },
    successIcon: {
        marginTop: hpx(80),
        width: hpx(300),
        height: hpx(300),
    },
    successMsgParent: {
        width: hpx(200),

    },
    successMsg: {
        fontSize: nf(18),
        fontFamily: Fonts.regular,
        color: Colors.white,
        opacity: 0.7,
        textAlign: "center"
    },
    successText: {
        fontSize: nf(44),
        fontFamily: Fonts.semiBold,
        color: Colors.white
    }
});
