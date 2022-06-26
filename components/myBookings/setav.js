
// import React, { useState } from 'react';
// import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

// import HorizontalDatePicker from '@logisticinfotech/react-native-horizontal-date-picker';
// import moment from 'moment';
// const SetAvailability = () => {

//     const [date1, setDate1] = useState('')
//     const [date2, setDate2] = useState('')
//     const [date3, setDate3] = useState('')
//     const [time1, setTime1] = useState('')
//     const [time2, setTime2] = useState('')
//     const [time3, setTime3] = useState('')
//     const [dateTime1, setDateTime1] = useState('')
//     const [dateTime2, setDateTime2] = useState('')
//     const [dateTime3, setDateTime3] = useState('')

//     const onDateSelected = date => {


//             setDate1(date)
//             // setDate2(moment(date, 'DD-MM-YYYY').format('DD MMM YYYY'))
//             // setDate3(moment(date, 'DD-MM-YYYY').format('Do MMMM YYYY'))

// }

//     const onTimeSelected = time => {

//         setTime1(time)
//             // setTime2(moment(time, 'hh:mm a').format('HH:mm'))
//             // setTime3(moment(time, 'hh:mm a').format('HH:mm a'))

// }

//    const onDateTimeSelected = datetime => {

//             setDateTime1(datetime.datetime)
//         //      setDateTime2(moment(datetime.datetime, 'DD-MM-YYYY hh:mm a').format('DD MMM YYYY HH:mm'))
//         //  setDateTime3(moment(datetime.datetime, 'DD-MM-YYYY hh:mm a').format('Do MMMM YYYY [@] hh:mm a'))

//     };


//     return (
//         <SafeAreaView style={styles.container}>
//             <HorizontalDatePicker
//                 onDateSelected={onDateSelected}
//                 onTimeSelected={onTimeSelected}
//                 onDateTimeSelected={onDateTimeSelected}
//             />
//             <View style={styles.gapStyle} />

//             <View style={styles.displayContainer}>
//                 <Text style={[styles.instructions, styles.textColor1]}>{date1}</Text>
//                 <Text style={[styles.instructions, styles.textColor1]}>{time1}</Text>
//                 <Text style={[styles.instructions, styles.textColor1]}>{dateTime1}</Text>
//             </View>


//         </SafeAreaView>
//     );
// }


// export default SetAvailability;
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//         paddingVertical: 20,
//     },
//     gapStyle: {
//         height: 50,
//     },
//     displayContainer: {
//         marginVertical: 10,
//         marginHorizontal: 15,
//     },
//     instructions: {
//         width: '75%',
//         textAlign: 'left',
//         fontSize: 15,
//         marginVertical: 2,
//         fontWeight: 'bold',
//     },
//     textColor1: {
//         color: '#0d47a1',
//     },
//     textColor2: {
//         color: '#004d40',
//     },
//     textColor3: {
//         color: '#d84315',
//     },
// });

