import Axios from 'axios';
import {commonHeader, endPoints, commonHeaderById} from '@constants';
import AsyncStorage from '@react-native-community/async-storage';







export async function dchangePassword(body ={}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)

  console.log("getting token and id --------------",TokenValue,UserId)
  try {      
    const ChangePasswordResponse = await Axios.post(
      'https://food.afroeats.fr/api/dchangePassword',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}  
      },
    );
    if (ChangePasswordResponse.status) {
      return {result: true, response: ChangePasswordResponse.data};
    } else {
      return {result: false, response: ChangePasswordResponse.data};
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




//ADD CHATTING TEXT APi calling here--------

export async function getDriverProfile(body ={}) {

const token = await AsyncStorage.getItem('token');
const user_id = await AsyncStorage.getItem('user_id');

const TokenValue = JSON.parse(token);
// const TokenValue = `5c4eb24aba0d2f09808a86203076d372d3ec44a4e44e2eb5f34cd86`
const UserId = JSON.parse(user_id)
try {      
  const getDriverProfile = await Axios.post(
    'https://food.afroeats.fr/api/getDriverProfile',
    body,
    {
      headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}  
    },
  );
  if (getDriverProfile.status) {
    return {result: true, response: getDriverProfile.data};
  } else {
    return {result: false, response: getDriverProfile.data};
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



export async function update_driver_lat_long(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  // const TokenValue = `5c4eb24aba0d2f09808a86203076d372d3ec44a4e44e2eb5f34cd86`
  const UserId = JSON.parse(user_id)
  try {      
    const update_driver_lat_long = await Axios.post(
      'https://food.afroeats.fr/api/update_driver_lat_long',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}  
      },
    );
    if (update_driver_lat_long.status) {
      return {result: true, response: update_driver_lat_long.data};
    } else {
      return {result: false, response: update_driver_lat_long.data};
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
  

  export async function getDriverDocument(body ={}) {

    const token = await AsyncStorage.getItem('token');
    const user_id = await AsyncStorage.getItem('user_id');
    
    const TokenValue = JSON.parse(token);
    // const TokenValue = `5c4eb24aba0d2f09808a86203076d372d3ec44a4e44e2eb5f34cd86`
    const UserId = JSON.parse(user_id)
    try {      
      const getDriverDocument = await Axios.post(
        'https://food.afroeats.fr/api/getDriverDocument',
        body,
        {
          headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}  
        },
      );
      if (getDriverDocument.status) {
        return {result: true, response: getDriverDocument.data};
      } else {
        return {result: false, response: getDriverDocument.data};
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

//  UPDATE STUDENT LEVEL APi calling here------------------------


export async function update_profile_status(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  // const TokenValue = `5c4eb24aba0d2f09808a86203076d372d3ec44a4e44e2eb5f34cd86`
  const UserId = JSON.parse(user_id)
  try {      
    const update_profile_status = await Axios.post(
      'https://food.afroeats.fr/api/update_profile_status',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}  
      },
    );
    if (update_profile_status.status) {
      return {result: true, response: update_profile_status.data};
    } else {
      return {result: false, response: update_profile_status.data};
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
  









  export async function getmyOrders(body ={}) {

    const token = await AsyncStorage.getItem('token');
    const user_id = await AsyncStorage.getItem('user_id');
    
    // const TokenValue = JSON.parse(token);

    const TokenValue = `5c4eb24aba0d2f09808a86203076d372d3ec44a4e44e2eb5f34cd86008f16ae0`
    const UserId = JSON.parse(user_id)
    try {      
      const getmyOrders = await Axios.post(
        'https://food.afroeats.fr/api/getmyOrders',
        body,
        {
          headers: {...commonHeader, 'user-id' : 60, 'token' :`${TokenValue}`}  
        },
      );
      if (getmyOrders.status) {
        // console.log("getting responsehere   - - -- -- ",getmyOrders.data)
        return {result: true, response: getmyOrders.data};
        
      } else {
        // console.log("getting else   - - -- -- ",getmyOrders.data)
        return {result: false, response: getmyOrders.data};
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
    




    

  export async function myorderDetail(body ={}) {

    const token = await AsyncStorage.getItem('token');
    const user_id = await AsyncStorage.getItem('user_id');
    
    // const TokenValue = JSON.parse(token);

    const TokenValue = `5c4eb24aba0d2f09808a86203076d372d3ec44a4e44e2eb5f34cd86008f16ae0`
    const UserId = JSON.parse(user_id)
    try {      
      const myorderDetail = await Axios.post(
        'https://food.afroeats.fr/api/myorderDetail',
        body,
        {
          headers: {...commonHeader, 'user-id' : 60, 'token' :`${TokenValue}`}  
        },
      );
      if (myorderDetail.status) {
        // console.log("getting responsehere   - - -- -- ",myorderDetail.data)
        return {result: true, response: myorderDetail.data};
        
      } else {
        // console.log("getting else   - - -- -- ",myorderDetail.data)
        return {result: false, response: myorderDetail.data};
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











    

    export async function logout_function(body ={}) {

      const token = await AsyncStorage.getItem('token');
      const user_id = await AsyncStorage.getItem('user_id');
      
      const TokenValue = JSON.parse(token);
  
      // const TokenValue = `5c4eb24aba0d2f09808a86203076d372d3ec44a4e44e2eb5f34cd86008f16ae0`
      const UserId = JSON.parse(user_id)
      try {      
        const logout_function = await Axios.post(
          'https://food.afroeats.fr/api/logout_function',
          body,
          {
            headers: {...commonHeader, 'user-id' : UserId, 'token' :`${TokenValue}`}  
          },
        );
        if (logout_function.status) {
          // console.log("getting responsehere   - - -- -- ",logout_function.data)
          return {result: true, response: logout_function.data};
          
        } else {
          // console.log("getting else   - - -- -- ",logout_function.data)
          return {result: false, response: logout_function.data};
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
  
  
  







// GET WAITING TIME APi calling here---------------


      // export async function get_waiting_timeFunction() {

      //   const token = await AsyncStorage.getItem('token');
      //   const user_id = await AsyncStorage.getItem('user_id');
        
      //   const TokenValue = JSON.parse(token);
      //   const UserId = JSON.parse(user_id)
        
      //   console.log("getting token and user id here inside the function-----------",UserId)
       
      //   try {
      //     const get_waiting_timeRresponse = await Axios.get(
      //       'https://www.spyk.fr/api_teacher/my_profile',      
      //       {
      //         headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      //       },
      //     );
      //     if (get_waiting_timeRresponse.status) {
      //       // console.log("getting response on the function--------",get_waiting_timeRresponse.data)
      //       return {result: true, response: get_waiting_timeRresponse.data};
      //     } else {
      //       // console.log("getting error on the function--------",get_waiting_timeRresponse.data)
      //       return {result: false, error: get_waiting_timeRresponse.data};
      //     }
      //   } catch (error) {
      //     return {result: false, error};
      //   }
      // }
      




