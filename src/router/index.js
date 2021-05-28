import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Auth component...
import Login from '../components/auth/Login/';
import Splash from '../components/auth/splash';

import Signup from '../components/auth/SignUp';

// import Splash2 from '../components/auth/Splash2';
// import ForgotPassword from '../components/auth/ForgotPassword'
import Welcome from '../components/auth/Welcome';

// import FacebookLogin from '../components/auth/SocialLogin/FacebookLogin'
// import GoogleLogin from '../components/auth/SocialLogin/GoogleLogin';

// Not Auth Component....
import Home from '../components/notAuth/Home';
import Profile from '../components/notAuth/Profile';
import MyOrder from '../components/notAuth/MyOrder';
import OnlineOffline from '../components/notAuth/OnlineOffline';
import OrderDetails from '../components/notAuth/OrderDetails';
import MyProfile from '../components/notAuth/ProfileDetails/MyProfile'
import EditProfile from '../components/notAuth/ProfileDetails/EditProfile';
import Parameter from '../components/notAuth/ProfileDetails/Parameter';
import ChangePassword from '../components/notAuth/ProfileDetails/ChangePassword';
import MyCommsion from '../components/notAuth/ProfileDetails/MyCommision';
import QuestionAnswer from '../components/notAuth/ProfileDetails/QA';
import MyDocs from '../components/notAuth/ProfileDetails/MyDocs';
import AddDocs from '../components/auth/AddDocs';


const AppNavigator = createStackNavigator(
  {
    splash: {
      screen: Splash,
      navigationOptions: {
        headerShown: false,
      },
    },
    login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    welcome: {
      screen: Welcome,
      navigationOptions: {
        headerShown: false,
      },
    },
    // notification: {
    //   screen: Notification,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },

    // forgotpasswordreq2: {
    //   screen: forgotpasswordReq2,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },
    // forgotpasswordreq3: {
    //   screen: forgotpasswordReq3,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },

    // facebooklogin: {
    //   screen: FacebookLogin,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },

    singup: {
      screen: Signup,
      navigationOptions: {
        headerShown: false,
      },
    },
    adddocs: {
      screen: AddDocs,
      navigationOptions: {
        headerShown: false,
      },
    },
    home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    onlineoffline: {
      screen: OnlineOffline,
      navigationOptions: {
        headerShown: false,
      },
    },
    mydocs: {
      screen: MyDocs,
      navigationOptions: {
        headerShown: false,
      },
    },
    myorder: {
      screen: MyOrder,
      navigationOptions: {
        headerShown: false,
      },
    },
    orderdetails: {
      screen: OrderDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
    profile: {
      screen: Profile,
      navigationOptions: {
        headerShown: false,
      },
    },
    myprofile: {
      screen: MyProfile,
      navigationOptions: {
        headerShown: false,
      },
    },
    editprofile: {
      screen: EditProfile,
      navigationOptions: {
        headerShown: false,
      },
    },
    parameter: {
      screen: Parameter,
      navigationOptions: {
        headerShown: false,
      },
    },
    changepassword: {
      screen: ChangePassword,
      navigationOptions: {
        headerShown: false,
      },
    },
    mycommision: {
      screen: MyCommsion,
      navigationOptions: {
        headerShown: false,
      },
    },
    questionanswer: {
      screen: QuestionAnswer,
      navigationOptions: {
        headerShown: false,
      },
    },
    // forgotpassword:{
    //   screen:ForgotPassword,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    //   },
  },
  {
    unmountInactiveRoutes: true,
    initialRouteName: 'splash',
  },
);

export default createAppContainer(AppNavigator);
