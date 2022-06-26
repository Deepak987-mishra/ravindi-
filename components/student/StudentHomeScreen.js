import React from 'react'
import { View, Text, StyleSheet, } from 'react-native'
import { hpx, wpx, hp, wp, nf, Fonts, Icons, Colors } from '../../constants/constants';

const StudentHomeScreen = () => {
    return (
        <View style={styles.container} >
            <Text style={{ fontSize: nf(20), fontFamily: Fonts.medium }}>Features Coming soon</Text>
        </View>
    );
}
export default StudentHomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
    },
})