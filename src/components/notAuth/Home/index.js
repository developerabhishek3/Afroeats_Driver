import React, {Component,Fragment} from 'react';
import {View,Text,Image,TouchableOpacity, ScrollView,PermissionsAndroid,Alert,BackHandler,Modal,Dimensions,TouchableWithoutFeedback} from 'react-native';
import Styles from './indexCss';
import BottomNavigator from '../../../router/BottomNavigator';
import ModalDropdown from 'react-native-modal-dropdown';

import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {update_driver_lat_long,logout_function} from '../../../Api/afterAuth';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import GetLocation from 'react-native-get-location'
import Spinner from 'react-native-loading-spinner-overlay';
class Home extends Component {

    constructor(props){
        super(props)
        this.state={
            currentLongitude: 0,
            currentLatitude: 0,
            Alert_Visibility: false,
            isBodyLoaded:false,
            isSpinner:false,
        }
    }
    Show_Custom_Alert(visible) {
      this.setState({Alert_Visibility: visible});
    }
    Hide_Custom_Alert() {
      this.setState({Alert_Visibility: false});     
    }
    Hide_Custom_Alert2() {
      this.setState({Alert_Visibility: false});
      this.props.navigation.navigate('myprofile')
    }
    Hide_Custom_Alert3() {
      this.setState({Alert_Visibility: false}); 
      this.userLogoutFunction()
    }
    // async componentDidMount(){
    //     let token = await AsyncStorage.getItem('token');
    //     let userId =  await AsyncStorage.getItem('user_id');
    //     console.log("getting on the home userid  :: : : :: :",userId, "token :: ::::::" +token)
    // }
    // async callLocation(that){
    //     //alert("callLocation Called");
    //       Geolocation.getCurrentPosition(
    //         //Will give you the current location
    //          (position) => {
    //             const currentLongitude = JSON.stringify(position.coords.longitude);
    //             //getting the Longitude from the location json
    //             const currentLatitude = JSON.stringify(position.coords.latitude);
    //             //getting the Latitude from the location json
    //             that.setState({ currentLongitude:currentLongitude });
    //             //Setting state Longitude to re re-render the Longitude Text
    //             that.setState({ currentLatitude:currentLatitude });
    //             //Setting state Latitude to re re-render the Longitude Text
                
    //          },
    //          (error) => console.log(error.message),
    //          { timeout: 200000, maximumAge: 10000 }
    //       );
    //       that.watchID = Geolocation.watchPosition((position) => {
    //         //Will give you the location on location change
    //           // console.log(position);
    //           const currentLongitude = JSON.stringify(position.coords.longitude);
    //           console.log("inside DID MOUNT : : : : : : ::",currentLongitude)
    //           //getting the Longitude from the location json
    //           const currentLatitude = JSON.stringify(position.coords.latitude);
    //           console.log("inside DID MOUNT : : : : : : ::",currentLatitude)
    //           //getting the Latitude from the location json
    //          that.setState({ currentLongitude:currentLongitude });
    //          //Setting state Longitude to re re-render the Longitude Text
    //          that.setState({ currentLatitude:currentLatitude });
    //          //Setting state Latitude to re re-render the Longitude Text
      
      
             
    //     //           AsyncStorage.setItem("currentLatitude",JSON.stringify(this.state.currentLatitude));
      
    //     //    AsyncStorage.setItem("currentLongitude",JSON.stringify(this.state.currentLongitude));
      
    //       //  console.log("getting inside the didmount",this.state.currentLatitude)
      
      
      
    //       });
    //    }

       getCurrentLocation(){
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
      })
      .then(location => {
        var currentLatitude = location.latitude
        var currentLongitude = location.longitude
          // console.log(location.latitude);
          // console.log(location.longitude);
          this.setState({currentLatitude,currentLongitude})

      })
      .catch(error => {
          const { code, message } = error;
          // console.warn(code, message);
      })
       }


       callFunctionForLocation(){
         if(this.state.currentLatitude!=0 && this.state.currentLongitude != 0) {
           this.update_driver_lat_longFunction()
         }
       }
      
      
      
         
       componentDidMount = async () => {

          setInterval(() => {
            this.getCurrentLocation()
          }, 1000);

            setInterval(() => {
              this.callFunctionForLocation()
            }, 5000);
          
          
  


           BackHandler.addEventListener('hardwareBackPress', () =>
           this.handleBackButton(this.props.navigation),
         );
           
    }
      


    update_driver_lat_longFunction = async () => {    
        // console.log("GETTING LAT AND LONG : :  : : : : :: : ",this.state.currentLatitude, this.state.currentLongitude)  
        const user_id = await AsyncStorage.getItem('user_id');
        const UserId = JSON.parse(user_id)    
        const update_driver_lat_longResponse = await update_driver_lat_long({
            driver_id:UserId,
            latitude:this.state.currentLatitude,
            longitude:this.state.currentLongitude,
        });
        if (update_driver_lat_longResponse.result == true) {
        //   console.log('getting result here --------',update_driver_lat_longResponse.response,);
          if (update_driver_lat_longResponse.response.error == 'true') {
            Alert.alert('Message', update_driver_lat_longResponse.response.errorMessage);
            if(update_driver_lat_longResponse.response.errorMessage == "Token mismatch"){
                Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
                AsyncStorage.clear()
                this.props.navigation.navigate("login")
              }
          } else {
            // console.log('getting reponse here=================',update_driver_lat_longResponse.response,);                     
          }
        } else {
          this.myAlert('Error', update_driver_lat_longResponse.response.errorMessage);
          // console.log('getting error here-------------');
        }
        return;
      };

      userLogoutFunction() {

          this.setState({ isSpinner: true }, async () => {    
            const user_id = await AsyncStorage.getItem('user_id');
            const UserId = JSON.parse(user_id)  
          const LogoutResponse = await logout_function({
            driver_id:UserId
          });
        
          if(LogoutResponse.result === true) {
              console.log("getting logout response---------------",LogoutResponse.response)
              await AsyncStorage.setItem('userLoggedIn','false')
              let keys = ['token'];
              AsyncStorage.multiRemove(keys)
              this.props.navigation.navigate("login")  
              this.setState({isSpinner: false})          
              // Alert.alert("Message","Déconnexion réussie!")
          }
          else{
              this.setState({isSpinner: false})          
              console.log("getting error on logout -------------",LogoutResponse.error)
          }    

        })          
        // console.log("getting country response----------------",countryData.country_list)
      };


      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () =>
          this.handleBackButton(this.props.navigation),
        );
        
    
      }
      handleBackButton = (nav) => {
        if (!nav.isFocused()) {
          // console.log('getting inside the if conditin--------------');
          return true;
        } else {
          // console.log('getting inside the else conditin---------------');
          Alert.alert(
            'Exit App',
            'Do you want to Exit..',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Exit',
                onPress: () => BackHandler.exitApp(),
              },
            ],
            {
              cancelable: false,
            },
          );
          return true;
        }
      };
    









    render() {
        let data = [{
            value: 'Banana',
          }, {
            value: 'Mango',
          }, {
            value: 'Pear',
          }];
        return(
            <View style={Styles.container}>
                <View style={Styles.headeView}>
               
                    <Image source={require("../../../assets/icons/logoTxt.png")} resizeMode='contain'  style={{height:36,width:200,borderWidth:0,borderColor:"red",margin:10}} />
                    <TouchableOpacity style={{flexDirection:"row",margin:1}} onPress={() =>{this.Show_Custom_Alert()}}>
                        <Text style={{color:"#FFF",fontSize:12,fontWeight:"700",margin:7}}>Ghita </Text>
                    <Image source={require("../../../assets/icons/10.png")} style={{height:10,width:10,marginTop:10,margin:3}} />
                    </TouchableOpacity>
                    <Image source={require("../../../assets/icons/1.png")}   style={{height:40,width:40,marginTop:10}} />
                  
                </View>
                <Spinner visible={this.state.isSpinner}/>


                <View>
                    <Image source={require("../../../assets/icons/logo.png")} resizeMode="contain" style={{height:90,width:90,alignSelf:"center",margin:30}} />
                </View>

                <View style={{alignSelf:"center",justifyContent:"center"}}>
                    <Text style={Styles.headerTxt}>Connectez-vous en ligne</Text>
                    <Text style={Styles.headerTxt}>Pour recevoir une demande </Text>
                    <Text style={Styles.headerTxt}>de trajet </Text>
                </View>

                <TouchableOpacity style={Styles.continueBtn} onPress={()=>{this.props.navigation.navigate("onlineoffline")}}>
                        <Text style={Styles.continueBtnTxt}>Aller en Ligne</Text>
                </TouchableOpacity>

                <ScrollView>


                </ScrollView>

                <TouchableWithoutFeedback onPress={() => this.setState({ Alert_Visibility: false })}>
                 <Modal
                visible={this.state.Alert_Visibility}
                animationType={'fade'}
                transparent={true}
                onRequestClose={() => {
                  this.Show_Custom_Alert(!this.state.Alert_Visibility);
                }}>
                  <TouchableWithoutFeedback onPress={() => this.setState({Alert_Visibility: true })}>
                <View
                  style={{                
                    flex: 1,  
                    top:36,
                    right:SCREEN_WIDTH/7,
                    position:"absolute"               
                  }}>
                  <View
                    style={{
                      width:60,
                      height:100,
                      backgroundColor: '#ffffff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 10,
                      borderRadius: 10,
                    }}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}> 

                      <TouchableOpacity 
                      onPress={()=>{this.Hide_Custom_Alert2()}}
                      // onPress={() =>{this.props.navigation.navigate("myprofile")}}
                      >                     
                      <Text
                        style={{
                          fontSize: 12,
                          alignSelf: 'center',
                          fontWeight: '700',
                          margin:10,
                          marginTop:10,
                          color: '#000000',
                          textAlign: 'center',
                          fontFamily: 'Montserrat-Regular',
                        }}>
                          Profile
                      </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() =>{this.Hide_Custom_Alert3()}}>
                      <Text
                        style={{
                          fontSize: 12,
                          alignSelf: 'center',
                          fontWeight: '700',
                          margin:10,
                          marginTop:10,
                          color: '#000000',
                          textAlign: 'center',
                          fontFamily: 'Montserrat-Regular',
                        }}>
                      Logout
                      </Text>
                      </TouchableOpacity>
                  
                  </View>
                  </View>
                </View>
                </TouchableWithoutFeedback>
              </Modal>
              </TouchableWithoutFeedback>

                <BottomNavigator
                    currentRoute={'home'}
                    navigation={this.props.navigation}
                />

            </View>
        )
    }
}

export default Home;