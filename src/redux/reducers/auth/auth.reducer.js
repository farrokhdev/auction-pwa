import types from './auth.types';
import typesAll from '../all/all.types';
import {removeToken, Token} from '../../../utils/utils'

const initial_state = {
    user: null,
    data: "",
    pending: false,
    error: null,
    is_approved: null,
    first_name: "",
    last_name: "",
    username: null,
    otp: null,
    is_logged_in: Boolean(Token())
}


const authReducer = (state = initial_state, {type, payload}) => {
    switch (type) {
        case types.LOGIN_START:
            return {
                ...state,
                pending: true,
                error: null
            }

        case types.REGISTER_START:
            console.log('REGISTER_START')
            return {
                ...state,
                pending: true,
                data: null,
                error: null
                
            }

        case types.SET_PHONENUMBER :
            return {
                ...state,
                username: payload.username
                // data : payload
            }


        case types.LOGIN_SUCCESS:
            return {
                ...state,
                pending: false,
                data: {...state.data, ...payload},
                is_logged_in: true
            }


        case types.REGISTER_SUCCESS:
            console.log('REGISTER_SUCCESS')

            return {
                ...state,
                pending: false,
                data: {...state.data, ...payload},


            }
        case types.LOGIN_ERROR:
        case types.REGISTER_ERROR:
            console.log('REGISTER_ERROR')

            return {
                ...state,
                pending: false,
                error: payload
            }

        case types.CLEAR_STORAGE:
            removeToken()

            return {
                initial_state,
                pending: false,
                data: null,
                error: null,
                is_approved: null,
                is_logged_in: false
            }
        case typesAll.CLEAR_STORAGE_ALL:
            return {...initial_state,is_logged_in:false}
        case types.SET_PROFILE :
            console.log('Set Profile Done', payload)
            return {
                ...state,
                username: payload.username

            }

        case types.GET_OTP :
            console.log('Get Otp Code Done', payload)
            return {
                ...state,
                otp: payload.otp,

            }


        default :
            return state;
    }
}

export default authReducer;