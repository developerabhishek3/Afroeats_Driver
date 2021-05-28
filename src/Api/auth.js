import Axios from 'axios';
import {commonHeader, endPoints} from '@constants';
import AsyncStorage from '@react-native-community/async-storage';

const CommonURL = `https://www.spyk.fr/api_teacher//`


export async function createUser(body = {}) {
  try {
    const createUserRegister = await Axios.post(
      'https://food.afroeats.fr/api/driverSignup',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (createUserRegister.status) {
      console.log('getting response here-------', createUserRegister.data);
      return {result: true, response: createUserRegister.data};
    } else {
      console.log('getting error here----------', createUserRegister.data);
      return {result: false, error: createUserRegister.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function loginUser(body ={}) {
  try {      
    const loginUserResponse = await Axios.post(
      'https://food.afroeats.fr/api/Driverlogin',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (loginUserResponse.status) {
      return {result: true, response: loginUserResponse.data};
    } else {
      return {result: false, response: loginUserResponse.data};
    }
  } catch (err) {
    let error = new Error();
    const {data, status} = err.response;
    error.response = err.response;
    if (status == 400 && data.error === 'invalid_grant') {
      error.message = 'Invalid Credentials';
    } else {
      error.message = 'Request Failed';
    }
    throw error;
  }
}




export async function add_update_academic_info(body = {}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  try {
    const add_update_academic_infoResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/add_update_academic_info',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`}   
      },
    );
    if (add_update_academic_infoResponse.status) {
      console.log('getting response here-------', add_update_academic_infoResponse.data);
      return {result: true, response: add_update_academic_infoResponse.data};
    } else {
      console.log('getting error here----------', add_update_academic_infoResponse.data);
      return {result: false, error: add_update_academic_infoResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}








export async function level_academic_info() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  // console.log('getting ion level acedemic welcom page==========', UserId);
  // console.log('getting ion level acedemic welcom page==========', TokenValue);

  try {
    const level_academic_infoResponse = await Axios.get(
      `https://www.spyk.fr/api_teacher/level_academic_info`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (level_academic_infoResponse.status) {
      // console.log("getting response on the function--------",level_academic_infoResponse.data)
      return {result: true, response: level_academic_infoResponse.data};
    } else {
      return {result: false, error: level_academic_infoResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}