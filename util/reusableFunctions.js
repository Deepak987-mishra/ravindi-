import { PermissionsAndroid } from "react-native";
import Permissions, { PERMISSIONS } from 'react-native-permissions'
export const verifyEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
        return false;
    }
    else {
        return true;
    }
}


export const checkCameraPermission = async () => {
    if (Platform.OS == "ios") {
        let iosPermission = null;
        iosPermission = await Permissions.check(PERMISSIONS.IOS.CAMERA)

        if (iosPermission === 'authorized' || iosPermission === 'granted') {
            return true;
        }
        else {
            let req = await Permissions.request(PERMISSIONS.IOS.CAMERA)
            if (req === 'authorized' || req === 'granted') {
                return true;
            }
            else {
                return false
            }
        }
    }
    else {
        try {
            const granted = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Ravindi  App Camera Permission',
                    'message': 'Ravindi App needs access to your camera ' +
                               'so you can take pictures.'
                  }
                
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Launch Gallery:
                return true
            } else {
                return requestCameraPermission()
            }
        } catch (err) {
            console.warn(err);
            return false
        }
    }

}

export const checkGalleryPermission = async () => {
    if (Platform.OS == "ios") {
        let iosPermission = null;
        iosPermission = await Permissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY)
        if (iosPermission === 'authorized' || iosPermission === 'granted' || iosPermission === 'limited') {
            return true;
        }
        else {
            let req = null;
            await Permissions.request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((permission) => {
                req = permission;
            })
            if (req === 'authorized' || req === 'granted') {
                return true;
            }
            else {
                return false
            }
        }
    }
    else {
        try {
            const granted = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            );
            if (granted === true) {
                // Launch Gallery:
                return true
            } else {
                return requestGalleryPermission()
            }
        } catch (err) {
            console.warn(err);
            return false
        }
    }

}
//Request Camera Permission (android)
export const requestCameraPermission = async () => {
    try {

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Ravindi App Camera Permission",
                message:
                    "Ravindi App needs access to your camera so you can take pictures.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Launch Camera:
            return true
        } else {
            return false
        }
    } catch (err) {
        console.warn(err);
        return false
    }
}

//Request Gallery Permission (android)
export const requestGalleryPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: "Ravindi App Gallery Permission",
                message:
                    "Ravindi App needs access to your gallery so you can choose pictures.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Launch Gallery:
            return true
        } else {
            return false
        }
    } catch (err) {
        console.warn(err);
        return false
    }
}

