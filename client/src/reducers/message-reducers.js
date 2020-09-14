import { 
    FETCH_MESSAGE_BY_ID_SUCCESS,
    FETCH_MESSAGE_BY_ID_INIT,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_INIT,
    FETCH_MESSAGES_FAIL,
    UPDATE_MESSAGE_SUCCESS,
    UPDATE_MESSAGE_FAIL,
    RESET_MESSAGE_ERRORS } from '../actions/types';

const INITIAL_STATE = {
  messages: {
    data: [],
    errors: []
  },
  message: {
    data: {},
    errors: []
  }
}

export const messageReducer = (state = INITIAL_STATE.messages, action) => {
 switch(action.type) {
   case FETCH_MESSAGES_INIT:
     return {...state, data: [], errors: []};
   case FETCH_MESSAGES_SUCCESS:
     return {...state, data: action.messages};
   case FETCH_MESSAGES_FAIL:
     return Object.assign({}, state, {errors: action.errors, data: []});
    default:
     return state;
 }
}


export const selectedMessageReducer = (state = INITIAL_STATE.message, action) => {
 switch(action.type) {
   case FETCH_MESSAGE_BY_ID_INIT:
    return {...state, data: {}};
   case FETCH_MESSAGE_BY_ID_SUCCESS:
    return Object.assign({}, state, { data: action.message});
   case UPDATE_MESSAGE_SUCCESS:
    return {...state, data: action.message};
   case UPDATE_MESSAGE_FAIL:
    return {...state, errors: action.errors};
   case RESET_MESSAGE_ERRORS:
    return {...state, errors: []};
   default:
    return state;
 }
}