import { types } from '../ActionTypes';

const INITIAL_STATE = {
    classTypeList: [],
    createClassTabIndex: 0,
    setAvailability: [],
    userAccountDetails: null,
    timeZoneList: [
        { id: 1, title: "IST", value: 1 },
        { id: 2, title: "GMT", value: 2 },
    ],
    createdClassSlots: [],
    setAvailabilityDate: null,
    setAvailabilityTime: null,

}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case types.SET_CLASS_TYPE_LIST: {
            return { ...state, classTypeList: payload }
        }
        case types.CREATE_CLASS_TAB_INDEX: {
            return { ...state, createClassTabIndex: payload }
        }
        case types.SET_AVAILABILTY: {
            return { ...state, setAvailability: payload }
        }
        case types.SET_ACCOUNT_DETAILS: {
            return { ...state, userAccountDetails: payload }
        }
        case types.SET_CREATED_CLASS_SLOTS: {
            return { ...state, createdClassSlots: payload }
        }
        case types.SET_AVAILABILITY_DATE: {
            return { ...state, setAvailabilityDate: payload }
        }
        case types.SET_AVAILABILITY_TIME: {
            return { ...state, setAvailabilityTime: payload }
        }
        default: return state

    }

}