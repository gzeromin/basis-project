import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  SAVE_IMAGE
} from "./types";

export async function loginUser(dataToSubmit) {
  const request = await axios.post('/api/user/login', dataToSubmit)
    .then(res => res.data );
  return {
    type: LOGIN_USER,
    payload: request
  }
}

export async function registerUser(dataToSubmit) {
  const request = await axios.post('/api/user/register', dataToSubmit)
    .then(res => res.data );
  return {
    type: REGISTER_USER,
    payload: request
  }
}

export async function auth(dataToSubmit) {
  const request = await axios.get('/api/user/auth', dataToSubmit)
    .then(res => res.data );
  return {
    type: AUTH_USER,
    payload: request
  }
}

export async function saveImage(formData, config) {
  const request = await axios.post('/api/user/uploadImage', formData, config).then(res => res.data);
  return {
    type: SAVE_IMAGE,
    payload: request
  }
}