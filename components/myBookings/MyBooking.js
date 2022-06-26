import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import { hpx, wpx, hp, wp, nf, Fonts, Icons, Colors } from '../../constants/constants';

const MyBookings = () => {
    return (
        <View style={styles.container} >
            <Text style={{ fontSize: nf(20) }}>Features Coming soon</Text>
        </View>
    );
}
export default MyBookings;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
    },
})