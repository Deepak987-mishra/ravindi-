
import React, { useCallback } from 'react'
import { takeLatest, put, call } from 'redux-saga/effects';
import { serviceUrl } from '../../constants/constants';
import { types } from '../ActionTypes';
import { apiCall } from '../../util/utility'
import NavigationService from '../../routing/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* getUpcomingClass() {
    try {
        let { status, response } = yield call(apiCall, `${serviceUrl.teacher}teacher-booking-list`, null, 'GET')
        if (status) {

            yield put({
                type: types.SET_UPCOMING_CLASSES,
                payload: response.Data
            })
        }

    } catch (error) {
        console.log(error)
    }
}


function* getClassBooking(value) {

    try {

        const class_id = value.payload

        let body = {
            class_id: class_id
        }
        let { status, response } = yield call(apiCall, `${serviceUrl.teacher}teacher-booking-detail`, body, "POST")

        console.log(status)
        console.log(response)

        if (status) {
            yield put({
                type: types.SET_BOOKING_CLASSES,
                payload: response.Data
            })
            NavigationService.navigate('HomeScreenGroup')
        }

    } catch (error) {
        console.log(error)
    }

}

function* updateMeetingLink(value) {

    try {

        const { class_id, meeting_link } = value.payload

        let body = {
            class_id: class_id,
            meeting_link: meeting_link
        }
        let { status, response } = yield call(apiCall, `${serviceUrl.teacher}update-meeting-link`, body, "POST")

        console.log(status)
        console.log(response)


    } catch (error) {
        console.log(error)
    }

}


export default function* watchHomeSaga() {
    yield takeLatest(types.GET_UPCOMING_CLASSES, getUpcomingClass)
    yield takeLatest(types.GET_CLASS_BOOKING, getClassBooking)
    yield takeLatest(types.UPDATE_MEETING_LINK, updateMeetingLink)

}
