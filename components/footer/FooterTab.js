
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

import { hp, wp, Icons, nf, Fonts, hpx, wpx, Colors } from '../../constants/constants'

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { types } from '../../store/ActionTypes';

export default function FooterTab() {
    const dispatch = useDispatch()
    const { footerIndex } = useSelector(state => ({
        footerIndex: state.globalReducer.footerIndex
    }), shallowEqual);

    const changeFooterIndex = (index) => {
        dispatch({
            type: types.ACTIVE_FOOTER_INDEX,
            payload: index
        })
    }
    return (
        <View style={styles.footerTabCont}>
            <TouchableOpacity
                style={footerIndex == 0 ? styles.tabActive : styles.tabInactive}
                onPress={() => changeFooterIndex(0)}>
                <Image style={styles.tabIcon} resizeMode='contain' source={footerIndex == 0 ? Icons.homeActive : Icons.homeInactive} />
                {footerIndex == 0 ? <Text style={styles.activeText}>Home</Text> : null}
            </TouchableOpacity>
            <TouchableOpacity
                style={footerIndex == 1 ? styles.tabActive : styles.tabInactive}
                onPress={() => changeFooterIndex(1)}>
                <Image style={styles.tabIcon} resizeMode='contain' source={footerIndex == 1 ? Icons.bookingActive : Icons.bookingInactive} />
                {footerIndex == 1 ? <Text style={styles.activeText}>My Booking</Text> : null}
            </TouchableOpacity>
            <TouchableOpacity
                style={footerIndex == 2 ? styles.tabActive : styles.tabInactive}
                onPress={() => changeFooterIndex(2)}>
                <Image style={styles.tabIcon} resizeMode='contain' source={footerIndex == 2 ? Icons.profileActive : Icons.profileInactive} />
                {footerIndex == 2 ? <Text style={styles.activeText}>Account</Text> : null}
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    footerTabCont: {
        bottom: hpx(23),
        position: 'absolute',
        zIndex: 20,
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white",
        width: wpx(217),
        height: hpx(63),
        borderRadius: hpx(35),
        justifyContent: "space-between",
        paddingHorizontal: wpx(20),
        shadowColor: Colors.shadowGrey,
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 10,
    },
    tabActive: {
        height: hpx(38),
        width: wpx(100),
        borderRadius: hpx(20),
        backgroundColor: Colors.grey,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

    },
    tabInactive: {

    },
    tabIcon: {
        height: hpx(18),
        width: wpx(18),
        resizeMode: 'contain'
    },
    activeText: {
        fontSize: nf(10),
        fontFamily: Fonts.regular,
        color: Colors.primaryOrange,
        marginLeft: wp(1)
    }
})
