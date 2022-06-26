import React, { useCallback, useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { FooterTab } from '../footer'
import { Colors } from '../../constants/constants'
import { TeacherHomeScreen } from '../teacher';
import StudentHomeScreen from '../student/StudentHomeScreen';
import MyBookings from '../myBookings/MyBooking';
import TeacherAccount from '../teacherAccount/TeacherAccount';
import { types } from '../../store/ActionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FooterScreen = () => {
    const [role, setRole] = useState(0);
    const dispatch = useDispatch();
    const { footerIndex } = useSelector(state => ({
        footerIndex: state.globalReducer.footerIndex
    }), shallowEqual);

    // Tab Screens
    // role == 2 -> Student Account
    // role == 3 -> Teacher Account
    const currentTabScreen = useCallback(
        () => {
            switch (footerIndex) {
                case 0: return (role == 2 ? <StudentHomeScreen /> : <TeacherHomeScreen />)
                case 1: return <MyBookings />
                case 2: return (role == 2 ? <StudentAccount /> : <TeacherAccount />)
            }
        },
        [footerIndex],
    )

    useEffect(() => {
        AsyncStorage.getItem('userData').then((resp) => {
            resp = JSON.parse(resp)
            console.log('Data', resp);
            setRole(resp?.Data.role)
        })
    }, [])



    return (
        <View style={styles.container} >
            {currentTabScreen()}
            <FooterTab />
        </View>
    )
}
export default FooterScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.darkBg, }
})
