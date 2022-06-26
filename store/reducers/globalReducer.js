import { types } from '../ActionTypes';

const INITIAL_STATE = {
    loader: false,
    footerIndex: 0,

    cameraGalleryOptModal: false,
    successModal: false,
    successMessage: '',
    reRenderStack: false
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case types.TOGGLE_LOADING: {
            return { ...state, loader: payload }
        }
        case types.ACTIVE_FOOTER_INDEX: {
            return { ...state, footerIndex: payload }
        }

        case types.TOGGLE_CAMERA_GALLERY_OPTION_MODAL: {
            return { ...state, cameraGalleryOptModal: payload }
        }
        case types.TOGGLE_SUCCESS_MODAL: {
            return { ...state, successModal: payload }
        }
        case types.SET_SUCCESS_MESSAGE: {
            return { ...state, successMessage: payload }
        }
        case types.RE_RENDER_APP_STACK: {
            //renders the stack so that we can swicth to auth or home stack as per async data
            return { ...state, reRenderStack: !state.reRenderStack }
        }

        default: return state
    }
}