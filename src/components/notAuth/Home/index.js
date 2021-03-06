import React, {Component,Fragment} from 'react';
import {View,Text,Image,TouchableOpacity, ScrollView,PermissionsAndroid,RefreshControl,Alert,BackHandler,Modal,Dimensions,TouchableWithoutFeedback} from 'react-native';
import Styles from './indexCss';
import BottomNavigator from '../../../router/BottomNavigator';
import ModalDropdown from 'react-native-modal-dropdown';

import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {update_driver_lat_long,logout_function,getDriverProfile,getDriverProfileStatus} from '../../../Api/afterAuth';
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
            fullname:"",
            profileImage:"",
            isCurrenetComponentRefreshing:false,
            profile_status:0
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
        this.GetdriverProfileFunction()
        this.getDriverProfileStatusFunction()
          setInterval(() => {
            this.getCurrentLocation()
            
            
          }, 3000);

            setInterval(() => {
              this.callFunctionForLocation()
             
            }, 5000);
         
          
  


           BackHandler.addEventListener('hardwareBackPress', () =>
           this.handleBackButton(this.props.navigation),
         );
           
    }
      
    GetdriverProfileFunction = async () => {       
      const user_id = await AsyncStorage.getItem('user_id');
      const UserId = JSON.parse(user_id)    
      const getDriverProfileResponse = await getDriverProfile({driver_id:UserId});
      if (getDriverProfileResponse.result == true) {
        // console.log('getting result here --------',getDriverProfileResponse.response,);
        if (getDriverProfileResponse.response.error == 'true') {
          // Alert.alert('Message', getDriverProfileResponse.response.errorMessage);
          if(getDriverProfileResponse.response.errorMessage == "Incompatibilit?? de jetons"){
              // Alert.alert("","La session a expir??. Veuillez vous connecter ?? nouveau")
              console.log("thi is happening here get Profile - -  - - - -  --")
              AsyncStorage.clear()
              this.props.navigation.navigate("login")
            }
        } else {
          // console.log('getting reponse here=================',getDriverProfileResponse.response,);  
          var driverProfile = getDriverProfileResponse.response.usersDetails
          let fullname =    getDriverProfileResponse.response.usersDetails.fullname
          let profileImage =    getDriverProfileResponse.response.usersDetails.image
          this.setState({driverProfile,isBodyLoaded:true,isSpinner:false,fullname,profileImage,  isCurrenetComponentRefreshing:false,})         
        }
      } else {
        this.myAlert('Error', getDriverProfileResponse.response.errorMessage);
        // console.log('getting error here-------------');
      }
      return;
    };





    getDriverProfileStatusFunction = async () => {       
      const user_id = await AsyncStorage.getItem('user_id');
      const UserId = JSON.parse(user_id)    
      const getDriverProfileStatusResponse = await getDriverProfileStatus({driver_id:UserId});
      if (getDriverProfileStatusResponse.result == true) {
      
        if (getDriverProfileStatusResponse.response.error == 'true') {
          // console.log("getting here - i am abhishek - - -")
          this.setState({isBodyLoaded:true,isSpinner:false})         
          // Alert.alert('Message', getDriverProfileStatusResponse.response.errorMessage);
          if(getDriverProfileStatusResponse.response.errorMessage == "Incompatibilit?? de jetons"){
              // Alert.alert("","La session a expir??. Veuillez vous connecter ?? nouveau")
              console.log("thi is happening here get  status - -  - - - -  --")
              AsyncStorage.clear()
              this.props.navigation.navigate("login")
            }
        } else {
          // console.log('getting reponse here=================',getDriverProfileStatusResponse.response,); 
          let profile_status = getDriverProfileStatusResponse.response.usersDetails.profile_status
          
          this.setState({isBodyLoaded:true,isSpinner:false,profile_status})         
        }
      } else {
        Alert.alert('Error', getDriverProfileStatusResponse.response.errorMessage);
        console.log('getting error here-------------');
      }
      return;
    };





    update_driver_lat_longFunction = async () => {    
        // console.log("GETTING LAT AND LONG : :  : : : : :: : ",this.state.currentLatitude, this.state.currentLongitude)  
        // longitude:22.7532848,
        // longitude:75.8936962
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
            // Alert.alert('Message', update_driver_lat_longResponse.response.errorMessage);
            if(update_driver_lat_longResponse.response.errorMessage == "Incompatibilit?? de jetons"){
                // Alert.alert("","La session a expir??. Veuillez vous connecter ?? nouveau")
                console.log("thi is happening here upate driver lat long - -  - - - -  --")
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
              // console.log("getting logout response---------------",LogoutResponse.response)
              await AsyncStorage.setItem('userLoggedIn','false')
              let keys = ['token'];
              AsyncStorage.multiRemove(keys)
              this.props.navigation.navigate("login")  
              this.setState({isSpinner: false})          
              // Alert.alert("Message","D??connexion r??ussie!")
          }
          else{
              this.setState({isSpinner: false})          
              // console.log("getting error on logout -------------",LogoutResponse.error)
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
            `Quitter l'application`,
            'Voulez-vous sortir...',
            [
              {
                text: 'Annuler',              
              },
              {
                text: 'Quitter',
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
    



    //   showAlert1() {  
    //     Alert.alert(  
    //         'D??connexion',
    //         '??tes-vous s??r de vouloir vous d??connecter ?'              
    //         [  
    //             {  
    //                 text: 'Annuler',  
    //                 onPress: () => console.log('Cancel Pressed'),                     
    //             },  
    //             {text: 'OK', onPress: () => console.log('OK Pressed')},  
    //         ]  
    //     );  
    // }  
    showAlert1() {  
      Alert.alert(  
          'D??connexion',  
          '??tes-vous s??r de vouloir vous d??connecter ?',  
          [  
              {  
                  text: 'Annuler',  
                  onPress: () => {this.Hide_Custom_Alert()}
              },  
              {text: 'Oui', onPress: () => {this.Hide_Custom_Alert3()}},  

          ]  
      );  
  }  



    render() {
      console.log("getting insdie reneder -  - -- ",this.state.profile_status)
        return(
            <View style={Styles.container}>
                <View style={Styles.headeView}>
               
                    <Image source={require("../../../assets/icons/logoTxt.png")} resizeMode='contain'  style={{height:36,width:200,borderWidth:0,borderColor:"red",margin:10}} />
                    <TouchableOpacity style={{flexDirection:"row",margin:1}} onPress={() =>{this.Show_Custom_Alert()}}>
                        <Text style={{color:"#FFF",fontSize:12,fontWeight:"700",margin:7}}>{this.state.fullname} </Text>
                    <Image source={require("../../../assets/icons/10.png")} style={{height:10,width:10,marginTop:10,margin:3}} />
                    </TouchableOpacity>
                    {
                        this.state.profileImage != "" ?

                        <Image
                        source={{ uri: this.state.profileImage }} 
                        style={{height:40,width:40,margin:7,marginEnd:16,borderRadius:30}} />

                        :
                        <Image source={require("../../../assets/icons/1.png")}   style={{height:40,width:40,marginEnd:16}} />

                    }


                  
                </View>
                <Spinner visible={this.state.isSpinner}/>

                <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={
                          <RefreshControl refreshing={this.state.isCurrenetComponentRefreshing} onRefresh={()=>{  this.setState({ isCurrenetComponentRefreshing: true }); setTimeout(()=>{
                        this.GetdriverProfileFunction();
                      },100)  }} />
                    }>



            

                <View>
                    <Image source={require("../../../assets/icons/logo.png")} resizeMode="contain" style={{height:90,width:90,alignSelf:"center",margin:30}} />
                </View>

                <View style={{alignSelf:"center",justifyContent:"center"}}>
                    <Text style={Styles.headerTxt}>Connectez-vous en ligne</Text>
                    <Text style={Styles.headerTxt}>Pour recevoir une demande </Text>
                    <Text style={Styles.headerTxt}>de trajet </Text>
                </View>

                <TouchableOpacity style={Styles.continueBtn} 
                    onPress={()=>{this.props.navigation.navigate("onlineoffline",{
                      latitude:this.state.currentLatitude,            
                      longitude:this.state.currentLongitude,
                    })}}
                    // onPress={()=>{this.props.navigation.navigate("myorder")}}

                >
                    <Text style={Styles.continueBtnTxt}>Aller en Ligne/hors</Text>
                  {/* {
                    this.state.profile_status == 1 ?
                    <Text style={Styles.continueBtnTxt}>Aller en Ligne/hors</Text>
                    :
                    <Text style={Styles.continueBtnTxt}>Aller en Ligne</Text>
                  }                 */}
                </TouchableOpacity>

              

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
                      width:99,
                      height:120,
                      backgroundColor: '#FFFFFF',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 10,
                      borderRadius: 10,
                    }}>
                      <TouchableOpacity style={{alignSelf:"flex-end",margin:1,marginEnd:7,marginTop:-3}} onPress={() =>{this.Hide_Custom_Alert()}}>
                          <Image resizeMode="contain" source={require("../../../assets/icons/17.png")} style={{height:30,width:24,alignSelf:'flex-end'}} />
                      </TouchableOpacity>
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
                         Mon Profil
                      </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() =>{this.showAlert1()}}>
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
                     D??connexion
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