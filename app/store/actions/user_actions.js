import {SIGN_IN, SIGN_UP} from '../types';
import axios from 'axios';
import {FIREBASEURL, SIGNIN, SIGNUP, REFRESH} from '../../utils/mics';
export function signUp(data) {
  const request = axios({
    method: 'POST',
    url: SIGNUP,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return false;
    });

  return {
    type: 'SIGN_UP',
    payload: request,
  };
}
export function signIn(data) {
  const request = axios({
    method: 'POST',
    url: SIGNIN,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return false;
    });

  return {
    type: 'SIGN_IN',
    payload: request,
  };
}
