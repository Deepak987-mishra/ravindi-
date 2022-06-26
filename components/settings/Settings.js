import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { useDispatch } from 'react-redux';
import { Colors, Fonts, hpx, Icons, nf, wpx } from '../../constants/constants'
import { types } from '../../store/ActionTypes';


const Settings = () => {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch({
            type: types.LOGOUT
        })

    }
    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Icons.back} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.headertext}>Settings</Text>

            </View>
            <View style={styles.settings}>
                <View style={styles.settingCard}>
                    <Text style={styles.cardText}>Notifications</Text>
                    <Image source={Icons.toggleOn} />
                </View>
                <View style={styles.settingCard}>
                    <Text style={styles.cardText}>Add Bank Details</Text>
                    <Image source={Icons.arrowRight} />
                </View>
                <View style={styles.settingCard}>
                    <Text style={styles.cardText}>Help & FAQ's</Text>
                    <Image source={Icons.arrowRight} />
                </View>
                <View style={styles.settingCard}>
                    <Text style={styles.cardText}>Terms & Condition</Text>
                    <Image source={Icons.arrowRight} />
                </View>
                <View style={styles.settingCard}>
                    <Text style={styles.cardText}>Privacy Policy</Text>
                    <Image source={Icons.arrowRight} />
                </View>
                <View style={styles.settingCard}>
                    <Text style={styles.cardText}>Contact us</Text>
                    <Image source={Icons.arrowRight} />
                </View>
                <View style={styles.settingCard}>
                    <Text style={styles.cardText}>About us</Text>
                    <Image source={Icons.arrowRight} />
                </View>
                <TouchableOpacity style={styles.settingCard} onPress={logout}>
                    <Text style={styles.cardText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
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
    },
    headertext: {
        fontFamily: Fonts.semiBold,
        fontSize: nf(16),
        textAlign: 'left',
        color: Colors.headerBlackText,
        marginLeft: wpx(10),
    },
    settings: {
        flex: 1,
        alignItems: "center",
    },
    settingCard: {
        flexDirection: "row",
        borderColor: Colors.lightGreyBorder,
        borderWidth: 1,
        borderRadius: wpx(3),
        width: wpx(335),
        height: hpx(50),
        alignItems: "center",
        paddingHorizontal: wpx(15),
        justifyContent: "space-between",
        marginTop: hpx(15)
    },
    cardText: {
        color: Colors.greyShade3,
        fontSize: nf(13),
        fontFamily: Fonts.regular

    }
})
