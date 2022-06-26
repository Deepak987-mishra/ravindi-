
import React, { useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { hp, wp, Icons, nf, Fonts, hpx, wpx, Colors } from '../../constants/constants'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { types } from '../../store/ActionTypes';
import PrivateClass from './PrivateClass';
import GroupClass from './GroupClass';
import { SuccessModal } from '../common';
import { useNavigation } from '@react-navigation/native';

export default function CreateClass() {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { createClassTabIndex } = useSelector(state => ({
        createClassTabIndex: state.createClassReducer.createClassTabIndex
    }), shallowEqual);

    const changeTabIndex = (index) => {
        dispatch({
            type: types.CREATE_CLASS_TAB_INDEX,
            payload: index
        })
    }
    useEffect(() => {
        dispatch({
            type: types.GET_CLASS_TYPE_LIST
        })
    }, [])
    return (
        <>
            <SuccessModal />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Icons.back} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.headertext}>Set Price </Text>

            </View>
            <View style={styles.tabCont}>

                <TouchableOpacity
                    style={createClassTabIndex == 0 ? styles.tabActive : styles.tabInactive}
                    onPress={() => changeTabIndex(0)}>
                    <Image style={styles.tabIcon} resizeMode='contain' source={createClassTabIndex == 0 ? Icons.privateWhite : Icons.privateGrey} />
                    <Text style={createClassTabIndex == 0 ? styles.activeText : styles.inactiveText}>Private</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={createClassTabIndex == 1 ? styles.tabActive : styles.tabInactive}
                    onPress={() => changeTabIndex(1)}>
                    <Image style={styles.tabIcon} resizeMode='contain' source={createClassTabIndex == 1 ? Icons.groupWhite : Icons.groupGrey} />
                    <Text style={createClassTabIndex == 1 ? styles.activeText : styles.inactiveText}>Group</Text>
                </TouchableOpacity>

            </View>
            <View style={{ flex: 1 }} >
                {createClassTabIndex == 0 ? <PrivateClass /> : <GroupClass />}
                {/* {createClassTabIndex == 0 ? <PrivateClass /> : <View><Text>Feature coming soon</Text> </View>} */}

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    tabCont: {

        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: Colors.greyShade2,
        width: wpx(310),
        height: hpx(40),
        // borderRadius: hpx(35),
        justifyContent: "space-between",
        marginTop: hpx(21)


    },
    tabActive: {
        height: hpx(35),
        width: wpx(140),
        borderRadius: hpx(10),
        backgroundColor: Colors.primaryOrange,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: Colors.shadowGrey2,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 3,
    },
    tabInactive: {
        height: hpx(35),
        width: wpx(140),
        borderRadius: hpx(10),
        backgroundColor: Colors.greyShade2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: Colors.shadowGrey2,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 3,
        // borderWidth: 1
    },
    tabIcon: {
        height: hpx(18),
        width: wpx(18),
        resizeMode: 'contain'
    },
    activeText: {
        fontSize: nf(10),
        fontFamily: Fonts.regular,
        color: Colors.white,
        marginLeft: wp(1)
    },
    inactiveText: {
        fontSize: nf(10),
        fontFamily: Fonts.regular,
        color: Colors.headerBlackText,
        marginLeft: wp(1)

    }
    ,
    header: {
        flexDirection: 'row',
        paddingTop: hpx(45),
        backgroundColor: Colors.white,
        alignItems: 'center',
        paddingBottom: hpx(22)
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
        color: Colors.headerBlackText,
        marginLeft: wpx(10),

    },
})
