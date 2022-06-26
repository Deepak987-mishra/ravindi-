import React from "react";
import { TextInput, View, StyleSheet, Text, Image } from "react-native";
//import { Images } from "../../constants/constants";
import { wp, wpx, hp, hpx, Fonts, nf, Icons, Colors } from '../../constants/constants';
import CountryPicker from 'react-native-country-picker-modal'


export const CustomInputText = ({ onChangeText, value, style, ...props }) => {

    return (
        <View style={styles.customTextInput}>
            <View style={styles.opaqueView}></View>
            <TextInput style={styles.textInputField}
                onChangeText={onChangeText}

                value={value}
                //  onBlur={onBlur}
                {...props}
            />
        </View>

    );

}
export const CustomInputTextArea = ({ onChangeText, value, style = {}, textStyle = {}, ...props }) => {

    return (
        <View style={{ ...styles.customTextInputArea, ...style }}>
            <View style={styles.opaqueViewTextArea}></View>
            <TextInput
                style={{ ...textStyle, ...styles.textAreaInputField }}
                onChangeText={onChangeText}
                multiline={true}
                value={value}
                //  onBlur={onBlur}
                {...props}
            />
        </View>

    );

}
export const CustomInputPhone = ({
    onChangeText, value, style,
    onChangeCountryCode, onChangeCallingCode,
    countryCode, callingCode, onBlur }) => {

    return (
        <View style={styles.phoneTextInputParent}>
            <View style={styles.opaqueView}></View>

            <CountryPicker
                theme={{
                    fontSize: nf(15),
                    fontFamily: Fonts.medium,
                    onBackgroundTextColor: Colors.white,
                    backgroundColor: "#000",

                }}
                containerButtonStyle={{ width: wpx(50) }}
                withFlagButton={false}
                countryCode={countryCode || undefined}
                withCountryNameButton={false}
                withCallingCode
                withCallingCodeButton
                withFilter
                onSelect={(country) => {
                    const { cca2, callingCode } = country;
                    onChangeCountryCode(cca2);
                    onChangeCallingCode(callingCode[0]);

                }}
            />

            <View style={styles.verticalLine}>
                <Image source={Icons.dropDownWhite} style={styles.dropdown} />
            </View>
            <TextInput
                style={styles.textInputField}
                onChangeText={onChangeText}
                value={value}
                onBlur={onBlur}
                keyboardType="phone-pad"
            />
        </View>
    );

}

const styles = StyleSheet.create({
    customTextInput: {
        width: wpx(335),
        height: hpx(45),
        color: Colors.white
    },
    customTextInputArea: {
        height: hpx(105),
        width: wpx(335),
        paddingHorizontal: wpx(10),
    },
    phoneTextInputParent: {
        width: wpx(335),
        flexDirection: "row",
        marginTop: hpx(3),
        paddingHorizontal: wpx(10),
        alignItems: "center",
        justifyContent: "space-between"
    },
    opaqueViewTextArea: {
        position: "absolute",
        alignItems: "center",
        height: hpx(105),
        width: wpx(335),
        borderWidth: 1,
        borderColor: Colors.lightGreyBorder,
        backgroundColor: Colors.white,
        opacity: 0.4,
        zIndex: 0
    },
    opaqueView: {
        position: "absolute",
        alignItems: "center",
        width: wpx(335),
        height: hpx(45),
        borderWidth: 1,
        borderColor: Colors.lightGreyBorder,
        backgroundColor: Colors.white,
        opacity: 0.4,
        zIndex: 0
    },
    textInputField: {
        width: wpx(335),
        height: hpx(50),
        paddingHorizontal: wpx(10),
        color: Colors.white,
        fontSize: nf(13.5)
    },
    textAreaInputField: {
        height: hpx(100),
        width: wpx(335),
        color: Colors.white,
        fontSize: nf(13.5),
        textAlignVertical: "top"
    },
    dropdown: {
        marginTop: hpx(12),
        zIndex: -1,
        alignSelf: "center",
        justifyContent: "center"
    },
    verticalLine: {
        marginLeft: wpx(-5),
        paddingRight: wpx(7),
        height: hpx(31),
        zIndex: -1,
        borderRightWidth: 1,
        borderRightColor: Colors.white
    },
    codeButton: {
        width: wpx(70),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})
