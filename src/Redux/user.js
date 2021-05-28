import AsyncStorage from '@react-native-community/async-storage';
import {UserProfile} from '../Api/afterAuth';

const FETCH_USERDETAILS_REQUEST = 'FETCH_USERDETAILS_REQUEST';
const FETCH_USERDETAILS_SUCCESS = 'FETCH_USERDETAILS_SUCCESS';
const FETCH_USERDETAILS_ERROR = 'FETCH_USERDETAILS_ERROR';


const userInitialState = {

  authToken: null,
  userDetails: {},
  loading: true,
};

const userDetailsProcess = () => {
  return {
    type: FETCH_USERDETAILS_REQUEST,
  };
};
const userDetailsFail = () => {
  return {
    type: FETCH_USERDETAILS_ERROR,
  };
};
const userDetailsSucess = () => {
  return {
    type: FETCH_USERDETAILS_SUCCESS,
  };
}

export const userLogoutSucess = (payload) => {
  //resetInboxOnLogout();
  return {
    type: USER_lOGOUT_SUCCESS,
    payload
  };
};

const userReducer = (initialState = userInitialState, action) => {
  const {type} = action;

  switch (type) {
    case FETCH_USERDETAILS_REQUEST:
      return {
        isUserLoggedIn: null,
        authToken: null,
        userDetails: {},
        loading: true,
      };

    case FETCH_USERDETAILS_ERROR:
      return {
        isUserLoggedIn: false,
        authToken: null,
        userDetails: {},
        loading: false,
      };    
    case FETCH_USERDETAILS_SUCCESS:
      return {
        isUserLoggedIn: false,
        authToken: null,
        userDetails: {},
        loading: false,
      };
    default:
      return initialState;
  }
};

export const GetUserDetails = () => {
  
}






// export const validateIsUserLoggedIn = () => async (dispatch) => {
//   dispatch(userAlreadyLoginProcess());

//   const validateUserLoggedIn = await AsyncStorage.getItem('userLoggedIn');
//   if (
//     validateUserLoggedIn != undefined &&
//     validateUserLoggedIn != null &&
//     validateUserLoggedIn === 'true'
//   ) {
//     console.log('I am already Logged in');
//     const userLogginData = await UserProfile();
//     if (userLogginData.result) {
//       dispatch(
//         userAlreadyLoginSuccess(
//           userLogginData.Authorization,
//           userLogginData.response,
//         ),
//       );   
//     } else {
//       console.log('user logged in but token expire');
//       dispatch(userAlreadyLoginFail());
//     }
//   } else {
//     console.log('User is not logged in');
//     dispatch(userAlreadyLoginFail());
//   }
// };


export default userReducer;
