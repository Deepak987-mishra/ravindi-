import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../routing/NavigationService';
import { store } from '../store/configureStore'
import { types } from '../store/ActionTypes'
import { serviceUrl } from '../constants/constants';

exports.apiCall = async function (url, body, method, token = null) {
    console.log(url, "url")

    if (!token) {
        token = await AsyncStorage.getItem("accessToken")
    }
    console.log(token)
    return fetch(url, {
        method: method,
        headers: !token ? //anonymous apis
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'client_secret': 'G6943LMRJB&jqdAVrAiPbpRloAfE1fqp0eVAJIChQcVkv3gWgBAzWztBEdFY',
            }
            :
            {      // logged in user
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access_token': `${token}`,

            },
        body: body ? JSON.stringify(body) : null,
    })
        .then((response) => {
            return new Promise(function (resolve, reject) {
                response.json().then(responseParsed => {
                    if (response.status == 200 || response.status == 201 || response.status == 204) {               // success
                        resolve({ status: true, response: responseParsed })
                    } else if (response.status == 401 || response.status == 403) {             // access token unauthorised
                        // BY CALLBACK
                        exports.apiCallForRefreshToken(function () {
                            resolve(exports.apiCall(url, body, method))
                        })
                        // BY PROMISE
                        resolve({ status: false, response: responseParsed })
                    } else if (response.status == 404) {
                        if (token) {
                            AsyncStorage.clear();
                        }
                    }
                    else {
                        resolve({ status: false, response: responseParsed })                                         // failed
                    }
                })

            })
        })
        .catch((err) => {
            console.log('Something went wrong, please check your network.')
        })
}

// to refresh token by calling api BY PROMISE
exports.apiCallForRefreshToken = async function () {

    let refreshToken = await AsyncStorage.getItem("refreshToken")
    let deviceToken = await AsyncStorage.getItem("deviceToken")
    await AsyncStorage.removeItem('accessToken')

    return new Promise(function (resolve, reject) {
        resolve(exports.apiCall(`${serviceUrl.user}access-token/new`,
            {
                "refreshToken": refreshToken,
                "deviceToken": deviceToken
            },
            "POST",
            null
        )
            .then(function (response) {
                console.log("apiCallForRefreshTokenRES", response)
                if (response.status) {
                    AsyncStorage.setItem('userTokens', JSON.stringify(response.data));
                    AsyncStorage.setItem('accessToken', response.response.data.accessToken);
                    // AsyncStorage.setItem('refreshToken', response.data.refreshToken);
                } else {
                    AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'deviceToken', 'userTokens', 'twitchTokens'])
                        // AsyncStorage.clear()
                        .catch(err => {
                            console.log("can not be removed due to", err)
                        });
                    store.dispatch({
                        type: types.RENDER_AGAIN_STACK_NAV
                    })
                    NavigationService.reset(0, 'IntroScreen')
                    return true
                }
            })
            .catch(function (error) {
                console.log("Error at utility in function3: apiCallForRefreshToken" + error + error.message)
                return { error: true, errorMessage: error }
            })
        )
    })
}

