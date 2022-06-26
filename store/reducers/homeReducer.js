import { types } from '../ActionTypes';

const INITIAL_STATE = {
    upcomingClasses: [],
    bookingClasses: [],
    cardData: null
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case types.SET_UPCOMING_CLASSES: {
            return { ...state, upcomingClasses: payload }
        }
        case types.SET_BOOKING_CLASSES: {
            return { ...state, bookingClasses: payload }
        }
        case types.CARD_DATA: {
            return { ...state, cardData: payload }
        }

        default: return state
    }
}