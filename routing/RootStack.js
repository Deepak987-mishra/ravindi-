import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './NavigationService';
import { Onboarding } from '../components/onboarding';

import { Login, Registration, ForgotPassword, AuthLoading } from '../components/authScreens';
import { CreateProfileStep1, CreateProfileStep2 } from '../components/profile';
import { HomeScreenGroup, TeacherHomeScreen } from '../components/teacher';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FooterScreen } from '../components/footer';
import { shallowEqual, useSelector } from 'react-redux';
import SetAvailability from '../components/teacherAccount/SetAvailability';
import CreateClass from '../components/teacherAccount/CreateClass';
import TeacherAccount from '../components/teacherAccount/TeacherAccount';
import Settings from '../components/settings/Settings';
import BookingDetail from '../components/bookingDetails/BookingDetail';
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();

export default RootStack = () => {

    const screenOptions = {
        gestureEnabled: false,
        headerShown: false
    }
    const [screenType, setScreenType] = useState(0)
    const { reRenderStack } = useSelector(state => ({
        reRenderStack: state.globalReducer.reRenderStack
    }), shallowEqual);


    useEffect(() => {
        // AsyncStorage.removeItem('accessToken')
        // AsyncStorage.removeItem('refreshToken')

        AsyncStorage.getItem('accessToken').then((token) => {

            if (token) {
                console.log("Token", token)
                console.log("reRenderStack", reRenderStack)
                setScreenType(1)
            }
            else {
                setScreenType(0)
            }
        })
    }, [reRenderStack])

    return (
        <NavigationContainer ref={navigationRef}>
            {
                screenType == 1
                    ? (
                        <HomeStack.Navigator
                            screenOptions={screenOptions}>

                            <HomeStack.Screen name="FooterScreen" component={FooterScreen} />
                            <HomeStack.Screen name="HomeScreenGroup" component={HomeScreenGroup} />
                            <HomeStack.Screen name="SetAvailability" component={SetAvailability} />
                            <HomeStack.Screen name="TeacherAccount" component={TeacherAccount} />
                            <HomeStack.Screen name="CreateClass" component={CreateClass} />

                            <HomeStack.Screen name="Settings" component={Settings} />
                            <HomeStack.Screen name="BookingDetail" component={BookingDetail} />
                        </HomeStack.Navigator>
                    ) : screenType == 0 ? (
                        <AuthStack.Navigator screenOptions={screenOptions}>
                            <AuthStack.Screen name="AuthLoading" component={AuthLoading} />
                            <AuthStack.Screen name="Onboarding" component={Onboarding} />
                            <AuthStack.Screen name="Login" component={Login} />
                            <AuthStack.Screen name="CreateProfileStep1" component={CreateProfileStep1} />
                            <AuthStack.Screen name="CreateProfileStep2" component={CreateProfileStep2} />
                            <AuthStack.Screen name="Registration" component={Registration} />
                            <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
                            <AuthStack.Screen name="TeacherHomeScreen" component={TeacherHomeScreen} />
                            <AuthStack.Screen name="HomeScreenGroup" component={HomeScreenGroup} />


                        </AuthStack.Navigator>
                    ) : null
            }
        </NavigationContainer>
    )

}

