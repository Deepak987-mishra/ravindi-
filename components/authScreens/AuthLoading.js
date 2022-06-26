/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { hp, Icons, wp } from '../../constants/constants';
import { useNavigation } from '@react-navigation/native';


function AuthLoading(props) {
    const navigation = useNavigation();
    useEffect(() => {
        SplashScreen.hide();
        setTimeout(() => {
            AsyncStorage.getItem("SkipWalkThrough").then((skip) => {
                if (skip == '1') {
                    navigation.navigate('Login')
                }
                else {
                    navigation.navigate('Onboarding')
                }
            })

        }, 1000);

    }, []);


    return (
        <View style={styles.container}>
            <ActivityIndicator style={{ flex: 1 }} animating={true} size="small" />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})



export default AuthLoading;
