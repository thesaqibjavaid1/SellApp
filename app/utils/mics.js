import {AsyncStorage} from 'react-native';
export const FIREBASEURL = 'https://sellitapp-8786d.firebaseio.com';
export const APIKEY = 'AIzaSyCOAynMl1cIWwBHdOHRDX2tBHOr2nTEbJM';
export const SIGNUP =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}';
export const SIGNIN =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}';
export const REFRESH = '';

export const getTokens = cb => {
  AsyncStorage.multiGet([
    '@nbaApp@token',
    '@nbaApp@refreshToken',
    '@nbaApp@expireToken',
    '@nbaApp@uid',
  ]).then(value => {
    cb(value);
  });
};
export const setTokens = (values, cb) => {
  const dateNow = new Date();
  const expiration = dateNow.getTime() + 3600 * 1000;

  AsyncStorage.multiSet([
    ['@nbaApp@token', values.token],
    ['@nbaApp@refreshToken', values.refToken],
    ['@nbaApp@expireToken', expiration.toString()],
    ['@nbaApp@uid', values.uid],
  ]).then(reponse => {
    cb();
  });
};
