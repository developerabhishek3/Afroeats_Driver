// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import AppContainer from './src/router/index'
// class App extends React.Component {
//   render(){
//     return(
//       <AppContainer />
//     )
//   }
  
// }

// export default App;





import React from 'react';
import {AppRegistry, Alert, View,SafeAreaView} from 'react-native';
import firebase from 'react-native-firebase';

import Appcontainer from './src/router/index';


import AsyncStorage from '@react-native-community/async-storage';
import { topLevelNavigate, setTopLevelNav } from './navigationService';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      push_val: '',
    };
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
      this.createNotificationListeners();
    } else {
      this.requestPermission();
    }
  }

  async createNotificationListeners() {
    const user_id = await AsyncStorage.getItem('user_id');
    const UserId = JSON.parse(user_id)
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      console.log("getting notification value here-------------",notification.data)
      // const { title, body } = notification;
      // this.showAlert(title, body);   
      let  OrderKey = notification.data.fcm_push_response;
      let fcm_order_id = notification.data.fcm_order_id
      console.log("getting orderKey one time - - -  - -",OrderKey,fcm_order_id)
      if(OrderKey == "OrderAssigned" ) {
          topLevelNavigate('orderrecieved', {           
            OrderKey:OrderKey,
            fcm_order_id:fcm_order_id   
          });
        }
       
         
                 
      });      
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      console.log("getting notification open value here-------------",notificationOpen.notification.data)
          // if(notificationOpen._data.reciever_id == UserId ){
            // const { title, body } = notificationOpen.notification;
            // this.showAlert(title, body);
        let  OrderKey = notificationOpen.notification.data.fcm_push_response;
        let fcm_order_id = notificationOpen.notification.data.fcm_order_id
        console.log("getting orderKey 2nd time - - -  - -",OrderKey , fcm_order_id)
        if(OrderKey == "OrderAssigned" ) {
          topLevelNavigate('orderrecieved', {           
            OrderKey:OrderKey,
            fcm_order_id:fcm_order_id       
          });
        }
        // if(OrderKey != null && OrderKey != undefined && OrderKey != "" ) {
        //   topLevelNavigate('orderrecieved', {
        //     OrderKey:OrderKey,
        //     fcm_order_id:fcm_order_id,       
        //   });
        // }
         
        // }        
      });
      
      const notificationOpen = await firebase.notifications().getInitialNotification();
      if (notificationOpen) {
        let  OrderKey = notificationOpen.notification.data.fcm_push_response;
        let fcm_order_id = notificationOpen.notification.data.fcm_order_id
        console.log("getting orderKey 3rd time - - -  - -",OrderKey , fcm_order_id)
        if(OrderKey == "OrderAssigned" ) {
          topLevelNavigate('orderrecieved', {           
            OrderKey:OrderKey,
            fcm_order_id:fcm_order_id    
          });
        }
        // if(OrderKey != null && OrderKey != undefined && OrderKey != "" ) {
        //   topLevelNavigate('orderrecieved', {
        //     OrderKey:OrderKey,
        //     fcm_order_id:fcm_order_id,       
        //   });
        // }
    //   const { title, body } = notificationOpen.notification;
    //  this.showAlert(title, body);
      }
      
      this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
      });
  }

  showAlert = (title, message) => {
    Alert.alert(
    title,
    message,
    [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
    );
  }
  
  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('FCM token$$$ ' + fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();      
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }
  
  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
      this.createNotificationListeners();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }
  render() {
      return (
        <SafeAreaView style={{ flex:1}}>
          <Appcontainer ref={(r) => setTopLevelNav(r)} />
        </SafeAreaView>
      )
  }
}