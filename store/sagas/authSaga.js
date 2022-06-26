import { Platform, Linking } from 'react-native';
import { RNS3 } from 'react-native-aws3';
import { delay, select, takeLatest, put, call } from 'redux-saga/effects';
import { s3UploadConfig, serviceUrl } from '../../constants/constants';
import { types } from '../ActionTypes';
import { apiCall } from '../../util/utility'
import NavigationService from '../../routing/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';


function* signUp(value) {
    try {
        let {
            email, password, full_name, phone,
            username, birth_date, gender, bio, certificates,
            profileImage, experience, location_address,certificate_no
        } = value.payload;
        let certificate_urls = []
        let profileUrl = "";
        if (profileImage) {
            let profile = {
                uri: profileImage.uri,
                name: profileImage.fileName,
                type: profileImage.type
            }
            profileUrl = yield uploadFile(profile)
        }
        if (certificates.length > 0) {
            for (let i = 0; i < certificates.length; i++) {
                let file = {
                    uri: certificates[i].uri,
                    name: certificates[i].fileName,
                    
                    type: certificates[i].type
                }

                let url = { "url": yield uploadFile(file) }
                console.log('url', url)
                certificate_urls.push(url)
            }

        }
        let body = {
            email: email.toLowerCase(),
            password: password,
            full_name: full_name,
            phone: phone,
            username: username,
            birth_date: birth_date,
            gender: gender,
            bio: bio,
            profile_picture: profileUrl,
            experience: experience ? experience : '',
            location_address: location_address,
            certificate_url: certificate_urls,
            certificate_no:certificate_no
        }
        console.log("authSagaBody", body)

        let { status, response } = yield call(apiCall, `${serviceUrl.user}signup`, body, "POST");
        //  console.log(status)
        //console.log(response)
        if (status) {
            yield put({
                type: types.TOGGLE_SUCCESS_MODAL,
                payload: true
            })
            yield put({
                type: types.SET_SUCCESS_MESSAGE,
                payload: "Congratulations Your Profile has been Successfully Created"
            })
            yield delay(2000)
            yield put({
                type: types.TOGGLE_SUCCESS_MODAL,
                payload: false
            })
            yield put({
                type: types.SET_SUCCESS_MESSAGE,
                payload: ""
            })
            NavigationService.navigate('Login')

        } else {
            alert('Something went wrong !')
        }


    } catch (error) {
        console.log(error)
    }

}

function* login(value) {
    try {
        let body = {
            email: value.payload.email.toLowerCase(),
            password: value.payload.password
        }
        let { status, response } = yield call(apiCall, `${serviceUrl.user}login`, body, "POST");

        if (status) {
            // console.log('data', response)
            if (response?.Data?.Token) {


                AsyncStorage.setItem('accessToken', response.Data.Token.token)
                AsyncStorage.setItem('refreshToken', response.Data.Token.refresh_token)
                AsyncStorage.setItem('userData', JSON.stringify(response.Data))

                yield put({ type: types.RE_RENDER_APP_STACK })
                yield put({
                    type: types.ACTIVE_FOOTER_INDEX,
                    payload: 0
                })
            }
        }

    } catch (error) {
        console.log(error)
    }

}
function* logout() {
    try {
        yield AsyncStorage.removeItem('accessToken')
        yield AsyncStorage.removeItem('refreshToken')
        yield AsyncStorage.removeItem('userData')
        yield put({ type: types.RE_RENDER_APP_STACK })

    } catch (error) {
        console.log(error)
    }

}

async function uploadFile(file) {
    let data = await RNS3.put(file, s3UploadConfig)
    return data?.body?.postResponse?.location
}

export default function* watchAuthSaga() {
    yield takeLatest(types.SIGN_UP, signUp)
    yield takeLatest(types.LOGIN, login)
    yield takeLatest(types.LOGOUT, logout)
}
