//USAGE:     import { Colors, Icons, hp, wp, hpx, wpx, nf, Fonts } from '../../constants/constants'
import { Dimensions, PixelRatio, Platform } from 'react-native';

// const baseURL = "https://nvijpz7i1a.execute-api.ap-south-1.amazonaws.com/staging/api/v1/";

    

const baseURL = "https://5eiz5igr56.execute-api.ap-south-1.amazonaws.com/staging/api/v1/"



export const serviceUrl = {
    baseURL: baseURL,
    user: baseURL + 'user/',
    teacher: baseURL + 'teacher/',
    admin: baseURL + 'admin/'

}


//ICONS CONSTANTS
export const Icons = {

    bg: require('../assets/icons/bg.png'),
    yoga: require('../assets/icons/yogaios.png'),
    active: require('../assets/icons/active_crouselios.png'),
    inactive: require('../assets/icons/inactive_crouselios.png'),
    ellipse: require('../assets/icons/Ellipseios.png'),
    teacher: require('../assets/icons/teacherios.png'),
    logoLogin: require('../assets/icons/logo_login.png'),
    rightArrow: require('../assets/icons/right_arrowios.png'),
    rightArrowBlack: require('../assets/icons/right_arrow.png'),
    eyeActive: require('../assets/icons/eye_activeios.png'),
    eyeInactive: require('../assets/icons/eye_inactiveios.png'),

    back: require('../assets/icons/back.png'),
    backios: require('../assets/icons/back_ios.png'),
    calendar: require('../assets/icons/calendar_ios.png'),

    maleActive: require('../assets/icons/active-maleios.png'),
    maleInactive: require('../assets/icons/male_inactive_ios.png'),

    femaleInactive: require('../assets/icons/female-inactiveios.png'),
    femaleActive: require('../assets/icons/female_active.png'),

    otherInactive: require('../assets/icons/others-inactiveios.png'),
    otherActive: require('../assets/icons/others_active_ios.png'),

    camera: require('../assets/icons/cameraios.png'),
    mask: require('../assets/icons/MaskGroup.png'),

    illustration1: require('../assets/icons/illustration1.png'),
    forget: require('../assets/icons/forget_password.png'),
    ellipse412: require('../assets/icons/ellipse412.png'),
    group2279: require('../assets/icons/Group2279.png'),
    homeActive: require('../assets/icons/home_active.png'),
    homeInactive: require('../assets/icons/Home_inactive.png'),
    bookingInactive: require('../assets/icons/booking_inactive.png'),
    bookingActive: require('../assets/icons/booking_active.png'),
    profileInactive: require('../assets/icons/profile_inactive.png'),
    profileActive: require('../assets/icons/profile_active.png'),
    profileImage: require('../assets/icons/profile_image.png'),
    iconFinder: require('../assets/icons/iconfiner.png'),
    bellicon: require('../assets/icons/Path2000.png'),
    ellipseBellWhiteIcon: require('../assets/icons/Ellipse402.png'),
    ellipseBellIcon: require('../assets/icons/Path2545.png'),
    addIcon: require('../assets/icons/add_icon.png'),
    imageContainer: require('../assets/icons/image_container.png'),
    dropDownWhite: require('../assets/icons/dropdown_white.png'),
    Image29: require('../assets/icons/Image29.png'),
    Image30: require('../assets/icons/Image30.png'),
    editProfile: require('../assets/icons/editProfile.png'),
    clock: require('../assets/icons/Group2275.png'),
    video: require('../assets/icons/Group2276.png'),
    profile: require('../assets/icons/Group2278.png'),
    certificate1: require('../assets/icons/certificate1.png'),
    certificate2: require('../assets/icons/certificate2.png'),
    dropDownWhite: require('../assets/icons/dropDownWhite.png'),

    whiteCalendar: require('../assets/icons/whiteCalendar.png'),
    crossOutline: require('../assets/icons/cross-outline.png'),
    crossRed: require('../assets/icons/cross-red.png'),
    success: require('../assets/icons/success.png'),
    copy: require('../assets/icons/copy.png'),
    upload: require('../assets/icons/upload.png'),
    arrowRight: require('../assets/icons/arrow_right.png'),
    toggleOn: require('../assets/icons/toggle_on.png'),
    toggleOff: require('../assets/icons/toggle-off.png'),
    groupIcon: require('../assets/icons/group_class.png'),
    privateIcon: require('../assets/icons/private_class.png'),
    editIconOrange: require('../assets/icons/edit_profile.png'),
    dropDownGrey: require('../assets/icons/drop_down_grey.png'),
    groupWhite:require('../assets/icons/group_white.png'),
    groupGrey:require('../assets/icons/group_grey.png'),
    privateWhite:require('../assets/icons/private_white.png'),
    privateGrey:require('../assets/icons/private_grey.png'),

}



//COLORS CONSTANTS
export const Colors = {
    black: '#000000',
    white: '#FFFFFF',
    grey: '#EBEBEB',
    primaryOrange: '#ED624A',
    cardWhite: '#F7F7F7',
    greyBorder: '#D5D5D5',
    blackText: '#2B2B2B',
    lightGrey: '#F1F1F1',
    lightGreyBorder: '#D3D3D3',
    shadowGrey: '#0000001A',
    shadowGrey2: '#00000029',
    greyShade2: '#F2F2F2',
    greyShade4: '#7C7C7C',
    greyBorder2: '#ECECEC',
    chestnutRose: '#D1536A',
    genderActiveColors: ['#FB6A3C', '#B5448C'],
    errorRed: 'red',
    headerBlackText: '#262626',
    greyShade3: "#595252",
    gradient1: ['#F06447', '#BF497F']


};

//FONT STYLE CONSTANTS
export const Fonts = {
    bold: 'Poppins-Bold',
    boldItalic: 'Poppins-BoldItalic',
    medium: 'Poppins-Medium',
    mediumItalic: 'Poppins-MediumItalic',
    regular: 'Poppins-Regular',
    semiBold: 'Poppins-SemiBold',
    light: 'Poppins-Light'
};

//DYNAMIC UI FUNCTIONS:
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

//FONT SCALING
//Usage: nf(16)
const scale = SCREEN_HEIGHT / 812;
const normalizeFont = (size) => {
    const newSize = size * scale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
    // if (Platform.OS === 'ios') {
    //     return Math.round(PixelRatio.roundToNearestPixel(newSize))
    // } else {
    //     return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1
    // }
}

//DYNAMIC DIMENSION CONSTANTS   
//Usage: wp(5), hp(20)
const widthPercentageToDP = widthPercent => {
    // Convert string input to decimal number
    const elemWidth = parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel(SCREEN_WIDTH * elemWidth / 100);
};
const heightPercentageToDP = heightPercent => {
    // Convert string input to decimal number
    const elemHeight = parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel(SCREEN_HEIGHT * elemHeight / 100);
};

//Usage: wpx(141), hpx(220)
const widthFromPixel = (widthPx, w = 375) => {
    const newSize = widthPx * (SCREEN_WIDTH / w)
    return newSize
};
const heightFromPixel = (heightPx, h = 812) => {
    const newSize = heightPx * (SCREEN_HEIGHT / h)
    return newSize
};
const s3UploadConfig = {
    keyPrefix: 'RA',
    bucket: 'ravindiassets',
    region: 'ap-south-1',
    accessKey: 'AKIA2LCW7HMZOEME5PHI',
    secretKey: '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',
    successActionStatus: 201,
}
export {
    normalizeFont as nf,
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    widthFromPixel as wpx,
    heightFromPixel as hpx,
    s3UploadConfig
};
