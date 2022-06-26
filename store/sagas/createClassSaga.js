import React, { useState, useEffect } from 'react'
import { Platform, Linking } from 'react-native';
import { RNS3 } from 'react-native-aws3';
import { delay, select, takeLatest, put, call } from 'redux-saga/effects';
import { s3UploadConfig, serviceUrl } from '../../constants/constants';
import { types } from '../ActionTypes';
import { apiCall } from '../../util/utility'
import NavigationService from '../../routing/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';


function* createClass(value) {
    try {
        let { class_mode, description, price, class_id, timezone, image } = value.payload;
        let imageUrl = ""
        if (image) {
            let imgObj = {
                uri: image.uri,
                name: image.fileName?.replace("rn_image_picker_lib_temp", ""),
                type: image.type
            }
            imageUrl = yield uploadFile(imgObj)
        }
        let body = {
            price: price,
            description: description,
            class_mode: class_mode,
            class_id: class_id.toString(),
            timezone: timezone,
            class_img: imageUrl,
            
        }
        console.log('body', body)
        let { status, response } = yield call(apiCall, `${serviceUrl.teacher}create-class`, body, "POST");

        console.log('createclasssagaa', response)

        if (status) {
            yield put({
                type: types.TOGGLE_SUCCESS_MODAL,
                payload: true
            })
            yield put({
                type: types.SET_SUCCESS_MESSAGE,
                payload: "Congratulations, class has been created"
            })
            yield delay(4000)
            yield put({
                type: types.TOGGLE_SUCCESS_MODAL,
                payload: false
            })
            yield put({
                type: types.SET_SUCCESS_MESSAGE,
                payload: ""
            })
            NavigationService.goBack()

        } else {
            alert(response.message)
        }


    } catch (error) {
        console.log(error)
    }

}

function* createGroupClass(value) {
    try {
        let { title, class_mode, description, price, class_id, timezone, image, total_students_allowed,
            start_time, end_time, availability
        } = value.payload;
        let imageUrl = ""
        if (image) {
            let imgObj = {
                uri: image.uri,
                name: image.fileName?.replace("rn_image_picker_lib_temp", ""),
                type: image.type
            }
            imageUrl = yield uploadFile(imgObj)
        }
        let body = {
            title: title,
            price: price,
            description: description,
            class_mode: class_mode,
            class_id: class_id.toString(),
            timezone: timezone,
            class_img: imageUrl,
            total_students_allowed: total_students_allowed,
            start_time: start_time,
            end_time: end_time,
            availability: availability,

        }
        console.log('body', body)
        let { status, response } = yield call(apiCall, `${serviceUrl.teacher}create-class`, body, "POST");

        console.log('createclasssagaa', response)

        if (status) {
            yield put({
                type: types.TOGGLE_SUCCESS_MODAL,
                payload: true
            })
            yield put({
                type: types.SET_SUCCESS_MESSAGE,
                payload: "Congratulations, class has been created"
            })
            yield delay(4000)
            yield put({
                type: types.TOGGLE_SUCCESS_MODAL,
                payload: false
            })
            yield put({
                type: types.SET_SUCCESS_MESSAGE,
                payload: ""
            })
            yield put({
                type: types.SET_AVAILABILITY_DATE,
                payload: null
            })
            yield put({
                type: types.SET_AVAILABILITY_TIME,
                payload: null
            })
            NavigationService.goBack()

        } else {
            yield put({
                type: types.SET_AVAILABILITY_DATE,
                payload: null
            })
            yield put({
                type: types.SET_AVAILABILITY_TIME,
                payload: null
            })
            alert(response.message)
        }
    } catch (error) {
        console.log(error)
    }

}


function* getClassTypeList() {
    try {

        let { status, response } = yield call(apiCall, `${serviceUrl.admin}class-types`, null, "GET");
        if (status) {
            yield put({
                type: types.SET_CLASS_TYPE_LIST,
                payload: response.Data
            })
        }
    } catch (error) {

    }
}
function* getAccountDeatils() {
    try {
        let { status, response } = yield call(apiCall, `${serviceUrl.user}my-account-detail`, null, "GET");
        console.log('Get data', response)
        if (status) {
            yield put({
                type: types.SET_ACCOUNT_DETAILS,
                payload: response.Data
            })
        }
    } catch (error) {

    }
}


function* getClassCreatedSlots(value) {
    try {

        console.log("createClass", value.payload)

        let { status, response } = yield call(apiCall, `${serviceUrl.teacher}slot-detail`, value.payload, "POST");

        if (status) {
            yield put({
                type: types.SET_CREATED_CLASS_SLOTS,
                payload: response.Data ? response.Data : []
            })
        } else {
            alert(response.message)
        }


    } catch (error) {
        console.log(error)
    }

}



async function uploadFile(file) {
    let data = await RNS3.put(file, s3UploadConfig)
    return data?.body?.postResponse?.location
}

export default function* watchCreateClassSaga() {
    yield takeLatest(types.CREATE_CLASS, createClass)
    yield takeLatest(types.CREATE_GROUP_CLASS, createGroupClass)
    yield takeLatest(types.GET_CLASS_TYPE_LIST, getClassTypeList)
    yield takeLatest(types.GET_ACCOUNT_DETAILS, getAccountDeatils)
    yield takeLatest(types.GET_CLASS_CREATED_SLOTS, getClassCreatedSlots)


}