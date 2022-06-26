import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import { hp, wp, Icons, nf, Fonts, hpx, wpx, Colors } from '../../constants/constants'
import CalendarStrip from 'react-native-calendar-strip';
import { CustomButton } from '../common';
import { types } from '../../store/ActionTypes';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { put } from 'redux-saga/effects';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
//import ShowMore from 'react-native-show-more-button';

const SetAvailability = () => {
    const { createdClassSlots } = useSelector(state => ({
        createdClassSlots: state.createClassReducer.createdClassSlots
    }), shallowEqual);
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const slotList = [
        { displayTime: "8:00-9:00 AM", startTime: "8:00 AM", endTime: "9:00 AM", isBooked: false },
        { displayTime: "9:00-10:00 AM", startTime: "9:00 AM", endTime: "10:00 AM", isBooked: false },
        { displayTime: "10:00-11:00 AM", startTime: "10:00 AM", endTime: "11:00 AM", isBooked: false },
        { displayTime: "11:00-12:00 AM", startTime: "11:00 AM", endTime: "12:00", isBooked: false },
        { displayTime: "12:00-1:00 PM", startTime: "12:00", endTime: "1:00 PM", isBooked: false },
        { displayTime: "1:00-2:00 PM", startTime: "1:00 PM", endTime: "2:00 PM", isBooked: false },
        { displayTime: "2:00-3:00 PM", startTime: "2:00 PM", endTime: "3:00 PM", isBooked: false },
        { displayTime: "3:00-4:00 PM", startTime: "3:00 PM", endTime: "4:00 PM", isBooked: false },
        { displayTime: "4:00-5:00 PM", startTime: "4:00 PM", endTime: "5:00 PM", isBooked: false },
        { displayTime: "5:00-6:00 PM", startTime: "5:00 PM", endTime: "6:00 PM", isBooked: false },
        { displayTime: "6:00-7:00 PM", startTime: "6:00 PM", endTime: "7:00 PM", isBooked: false },
        { displayTime: "7:00-8:00 PM", startTime: "7:00 PM", endTime: "8:00 PM", isBooked: false },
    ]

    const handleAvailabiliity = (date) => {
        // let d = new Date(date)
        // let time = selectedList.filter(value => value.isSelected == true)
        // if (time.length > 0) {

        // }
        let fullYear = new Date(date._d).getFullYear();
        let fullMonth = new Date(date._d).getMonth() > 9 ? new Date(date._d).getMonth() : ("0" + new Date(date._d).getMonth());
        let fullDay = new Date(date._d).getDay() > 9 ? new Date(date._d).getDay() : ("0" + new Date(date._d).getDay());
        let completeDate = (fullYear + "-" + fullMonth + "-" + fullDay + " " + new Date(date._d).toLocaleTimeString());
        dispatch({
            type: types.SET_AVAILABILITY_DATE,
            payload: completeDate
        })
        setSelectedDate(date)
    }

    useEffect(() => {
        dispatch({
            type: types.GET_CLASS_CREATED_SLOTS,
            payload: { date: selectedDate }
        })
    }, [selectedDate])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Icons.back} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.headertext}>Set Price </Text>

            </View>

            <CalendarStrip
                useIsoWeekday={true}
                scrollable
                scrollToOnSetSelectedDate={false}
                style={{ height: 130, paddingTop: 20, width: wpx(375), paddingHorizontal: wpx(20) }}
                calendarColor={'#F2F2F2'}
                calendarHeaderStyle={{ color: 'black' }}
                dateNumberStyle={{ color: 'black' }}
                minDate={new Date()}
                maxDate={new Date().setDate(new Date().getDate() + 90)}
                // startingDate={new Date()}
                dateNameStyle={{ color: 'black' }}
                highlightDateContainerStyle={{
                    backgroundColor: Colors.primaryOrange,
                    borderRadius: wpx(1), color: Colors.white
                }}
                dateContainerStyle={{
                    //height: 45, width: 45,
                    backgroundColor: Colors.shadowGrey,
                }}

                highlightDateNumberStyle={{ color: Colors.white }}
                highlightDateNameStyle={{ color: Colors.white }}
                selectedDate={selectedDate}
                onDateSelected={handleAvailabiliity}

            />
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={{ marginLeft: wpx(37) }}>Available Time Slot </Text>
                <View style={styles.horizontalLine} />

            </View>
            {/* <ShowMore> */}
            <View style={styles.timeSlotContainer}>
                {/* {slotList.map((item) => {

                    return <TouchableOpacity style={selectedSlot === item.isSelected ? styles.selectedSlotStyle : styles.unSelectedSlot}
                        onPress={() => setSelectedSlot(item)}>
                        <Text style={styles.slotText}>{item.displayTime}</Text>

                    </TouchableOpacity>


                })} */}
                <FlatList
                    style={styles.flalist}
                    numColumns={3}
                    contentContainerStyle={styles.listContent}
                    data={slotList}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) => <TouchableOpacity style={index == selectedSlot ? styles.selectedSlotStyle : styles.unSelectedSlot}
                        onPress={() => setSelectedSlot(index)}>
                        <Text style={index == selectedSlot ? styles.selectedSlotText : styles.slotText}>{item.displayTime}</Text>
                    </TouchableOpacity>}
                    showsHorizontalScrollIndicator={false}
                />
            </View>


            {/* </View> */}
            <View style={styles.horizontalLine} />
            {/* </ShowMore> */}
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hpx(100) }}>
                <CustomButton name="Proceed" onPress={() => {
                    dispatch({
                        type: types.SET_AVAILABILITY_TIME,
                        payload: slotList.filter((val, i) => selectedSlot == i)[0]
                    })
                    navigation.goBack()
                }} />
            </View>
        </View>
    );

}


export default SetAvailability
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    header: {
        flexDirection: 'row',
        paddingTop: hpx(45),
        minHeight: hpx(80),
        backgroundColor: Colors.white,
        alignItems: 'center',
        width: "100%"
        // justifyContent:'flex-start'
    }, image: {
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

    }, horizontalLine: {
        marginLeft: wpx(35),
        marginTop: hpx(15),
        width: wpx(300),
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        marginRight: wpx(35)

    },
    timeSlotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: hpx(10),
        //marginLeft: wpx(20)
    }, timeslot: {

        height: hpx(36), width: wpx(96),
        backgroundColor: Colors.white, marginTop: hpx(10), marginLeft: wpx(37)

    }, morningSlot: {

        height: hpx(36), width: wpx(96),
        backgroundColor: Colors.white,
        marginTop: hpx(10), marginLeft: wpx(37)

    },
    selectedSlotStyle: {
        alignItems: "center",
        justifyContent: "center",
        height: hpx(36),
        width: wpx(96),
        backgroundColor: Colors.primaryOrange,
        margin: "1.5%",
        borderRadius: wpx(6)
    },
    unSelectedSlot: {
        alignItems: "center",
        justifyContent: "center",
        height: hpx(36),
        width: wpx(96),
        backgroundColor: Colors.white,
        margin: "1.5%",
        borderColor: Colors.lightGreyBorder,
        borderWidth: 1,
        borderRadius: wpx(6)
    },
    slotText: {
        fontFamily: Fonts.regular,
        fontSize: nf(11),
        color: Colors.blackText

    },
    selectedSlotText: {
        fontFamily: Fonts.regular,
        fontSize: nf(11),
        color: Colors.white
    },
    morningSlot2: {

        height: hpx(36), width: wpx(96),
        backgroundColor: Colors.white, marginTop: hpx(10), marginLeft: wpx(10)

    }, selectedMorningSlot2: {


        height: hpx(36), width: wpx(96),
        backgroundColor: Colors.primaryOrange, marginTop: hpx(10), marginLeft: wpx(10)


    },

    flalist: {
        width: wpx(335),

    },
    listContent: {
        alignItems: "center",
        justifyContent: "center",
    },
});
