import axios from 'axios';
import authService from '../services/auth-service';
import axiosService from '../services/axios-service';

import { FETCH_MESSAGE_BY_ID_SUCCESS,
         FETCH_MESSAGE_BY_ID_INIT,
         FETCH_MESSAGES_SUCCESS,
         FETCH_MESSAGES_INIT,
         FETCH_MESSAGES_FAIL,
         LOGIN_SUCCESS,
         LOGIN_FAILURE,
         LOGOUT,
         UPDATE_MESSAGE_SUCCESS,
         UPDATE_MESSAGE_FAIL,
         RESET_MESSAGE_ERRORS} from './types';

const axiosInstance = axiosService.getInstance();

export const verifyMessageOwner = (messageId) => {
  return axiosInstance.get(`/message/${messageId}/verifyUser`);
}


// MESSAGE ACTIONS ---------------------------

const fetchMessageByIdInit = () => {
  return {
    type: FETCH_MESSAGE_BY_ID_INIT
  }
}

const fetchMessageByIdSuccess = (message) => {
  return {
    type: FETCH_MESSAGE_BY_ID_SUCCESS,
    message
  }
}

const fetchMessagesSuccess = (messages) => {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    messages
  }
}

const fetchMessagesInit = () => {
    return {
      type: FETCH_MESSAGES_INIT
    }
}
  
  const fetchMessagesFail = (errors) => {
    return {
      type: FETCH_MESSAGES_FAIL,
      errors
    }
}
  
  export const fetchMessages = () => {
    const url = '/message/retrieveAllMessages';
  
    return dispatch => {
      dispatch(fetchMessagesInit());
  
      axiosInstance.get(url)
        .then(res => res.data )
        .then(messages => dispatch(fetchMessagesSuccess(messages)))
        .catch(({response}) => dispatch(fetchMessagesFail(response.data.errors)))
    }
}
  
export const fetchMessageById = (messageId) => {
    return function(dispatch) {
      dispatch(fetchMessageByIdInit());
  
      axios.get(`/api/v1/messages/${messageId}`)
        .then(res => res.data )
        .then(message => dispatch(fetchMessageByIdSuccess(message))
      );
    }
}
  
export const createMessage = (messageData) => {
    return axiosInstance.post('/message/addMessage', messageData).then(
      res => res.data,
      err => Promise.reject(err.response.data.errors)
    )
}
  
export const resetMessageErrors = () => {
    return {
      type: RESET_MESSAGE_ERRORS
    }
}
  
const updateMessageSuccess = (updatedMessage) => {
    return {
      type: UPDATE_MESSAGE_SUCCESS,
      message: updatedMessage
    }
}
  
const updateMessageFail = (errors) => {
    return {
      type: UPDATE_MESSAGE_FAIL,
      errors
    }
}
  
export const updateMessage = (id, messageData) => dispatch => {
    return axiosInstance.patch(`/message/updateMessage/${id}`, messageData)
      .then(res => res.data)
      .then(updatedMessage => {
        dispatch(updateMessageSuccess(updatedMessage));
      })
      .catch(({response}) => dispatch(updateMessageFail(response.data.errors)))
}
  
  
  // USER MESSAGES ACTIONS ---------------------------
  
  export const getUserMessages = () => {
    return axiosInstance.get('/message/manage').then(
      res => res.data,
      err => Promise.reject(err.response.data.errors)
    )
}
  
export const deleteMessage = (messageId) => {
    return axiosInstance.delete(`/message/deleteMessage/${messageId}`).then(
      res => res.data,
      err => Promise.reject(err.response.data.errors))
}
  
  // AUTH ACTIONS ---------------------------
  
  const loginSuccess = () => {
    const username = authService.getUsername();
  
    return {
      type: LOGIN_SUCCESS,
      username
    }
}
  
  const loginFailure = (errors) => {
    return {
      type: LOGIN_FAILURE,
      errors
    }
}
  
  export const register = (userData) => {
    return axios.post('/api/v1/auth/register', userData).then(
      res => res.data,
      err => Promise.reject(err.response.data.errors)
    )
}
  
export const checkAuthState = () => {
    return dispatch => {
      if (authService.isAuthenticated()) {
        dispatch(loginSuccess());
      }
    }
}
  
export const login = (userData) => {
    return dispatch => {
      return axios.post('/api/v1/auth/login', userData)
        .then(res => res.data)
        .then(token => {
          authService.saveToken(token);
          dispatch(loginSuccess());
        })
        .catch(({response}) => {
          dispatch(loginFailure(response.data.errors));
        })
    }
}
  
export const logout = () => {
    authService.invalidateUser();
  
    return {
      type: LOGOUT
    }
}
  
