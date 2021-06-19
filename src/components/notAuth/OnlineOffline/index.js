import React,{Component} from 'react';
import {View,Text,TouchableOpacity,Image,ScrollView, ImageBackground,Switch,Modal,Dimensions,BackHandler,Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Styles from './indexCss'
import BottomNavigator from '../../../router/BottomNavigator'
import CountDown from 'react-native-countdown-component';

import ModalDropdown from 'react-native-modal-dropdown';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import {update_profile_status,getDriverProfileStatus,getDriverProfile} from '../../../Api/afterAuth'
import AsyncStorage from '@react-native-community/async-storage'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
let email_global;
let switch_global;
var cur_lat =  37.78825
var cur_long =  -122.4324

class PartnerNearMe extends Component {
  constructor(props){
    super(props)
    this.state={
        isEnabled:false,
        Model_Visibility: false,
        Alert_Visibility: false,
        isSwitchOn: false,
        switchValue: false,
        SwitchOnValueHolder: false,
        SwitchOnValueHolder2: false,
        currentlatitude: 37.78825,
        currentlongitude: -122.4324,
        profile_status:0,
        fullname:"",
        profileImage:"",
  
    }
}
  async toggleSwitch(){
    this.setState({isEnabled:!this.state.isEnabled})
}

Show_Custom_Alert(visible) {
  this.setState({Alert_Visibility: visible});
}

Hide_Custom_Alert() {
  // console.log("inside hidfe ==============")
  this.setState({Alert_Visibility: false});
  // this.props.navigation.navigate("home")
}

Hide_Custom_Alert1() {
  this.setState({Alert_Visibility: false});
  this.props.navigation.navigate("myorder")
}




componentDidMount = async () => {      
    this.updateDriverStatus()  
    this.getDriverProfileStatusFunction() 
    this.GetdriverProfileFunction() 
  BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );      
};


componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
}

handleBackButton = (nav) => {
  if (!nav.isFocused()) {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
    return false;
  } else {
    nav.goBack();
    return true;
  }
};





getDriverProfileStatusFunction = async () => {       
  const user_id = await AsyncStorage.getItem('user_id');
  const UserId = JSON.parse(user_id)    
  const getDriverProfileStatusResponse = await getDriverProfileStatus({driver_id:UserId});
  if (getDriverProfileStatusResponse.result == true) {
  
    if (getDriverProfileStatusResponse.response.error == 'true') {
      // console.log("getting here - i am abhishek - - -")
      this.setState({isBodyLoaded:true,isSpinner:false})         
      Alert.alert('Message', getDriverProfileStatusResponse.response.errorMessage);
      if(getDriverProfileStatusResponse.response.errorMessage == "Incompatibilité de jetons"){
          Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
          AsyncStorage.clear()
          this.props.navigation.navigate("login")
        }
    } else {
      console.log('getting reponse here=================',getDriverProfileStatusResponse.response,); 
      let profile_status = getDriverProfileStatusResponse.response.usersDetails.profile_status



      if (profile_status == 0) {
        this.setState({      
        profile_status: 0,  SwitchOnValueHolder:false }); }
        else if(profile_status == 1){
          this.setState({ profile_status: 1, SwitchOnValueHolder:true })
        }            
      
      this.setState({isBodyLoaded:true,isSpinner:false,profile_status})         
    }
  } else {
    Alert.alert('Error', getDriverProfileStatusResponse.response.errorMessage);
    console.log('getting error here-------------');
  }
  return;
};







Fetchupdate_profile_status = async (email_global,newValue) => {   
  console.log("getting profile status inside API - - - - ",newValue)    

  const user_id = await AsyncStorage.getItem('user_id');
  const UserId = JSON.parse(user_id)    
  const update_profile_statusResponse = await update_profile_status({
    profile_status: newValue,
    driver_id:UserId,
  });
  if (update_profile_statusResponse.result == true) {
  
    if (update_profile_statusResponse.response.error == 'true') {
      // console.log("getting here - i am abhishek - - -")
      this.setState({isBodyLoaded:true,isSpinner:false})         
      // Alert.alert('Message', update_profile_statusResponse.response.errorMessage);
      if(update_profile_statusResponse.response.errorMessage == "Incompatibilité de jetons"){
          Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
          AsyncStorage.clear()
          this.props.navigation.navigate("login")
        }
    } else {     
      console.log('getting reponse here=================',update_profile_statusResponse.response,); 
      this.getDriverProfileStatusFunction()
      this.props.navigation.navigate("home")          
      this.setState({isBodyLoaded:true,isSpinner:false})         
    }
  } else {
    Alert.alert('Error', update_profile_statusResponse.response.errorMessage);
    // console.log('getting error here-------------');
  }
  return;
};





getCurrentLocationOnTrack(){
    
  Geolocation.getCurrentPosition(pos => {
      this.setState({currentLatitude:pos.coords.latitude,currentLongitude:pos.coords.longitude })      
    }, err => {
      // console.error(err);
      // alert("fetching position failed")
    });

 }

 updateDriverStatus() {

    Geolocation.watchPosition(success => {
        // console.log("success watchman:::" + JSON.stringify(success));
        this.setState({
          currentlatitude: success.coords.latitude,
          currentlongitude: success.coords.longitude,
        })
      },
      );
  Geolocation.getCurrentPosition(info => {
    cur_lat =info.coords.latitude
    cur_long= info.coords.longitude
    this.setState({
      currentlatitude: info.coords.latitude,
      currentlongitude: info.coords.longitude,
    })
  },
  );

}


 











componentWillMount() {
   
Geolocation.watchPosition(success => {
  // console.log("success watchman:::" + JSON.stringify(success));
  cur_lat =success.coords.latitude
  cur_long= success.coords.longitude
  this.setState({
    currentlatitude: success.coords.latitude,
    currentlongitude: success.coords.longitude,
  })

},
);

Geolocation.getCurrentPosition(info => {
// console.log('Current Latitude TrackOrder ', info.coords.latitude)
// console.log('Current Longitude TrackOrder ', info.coords.longitude)
cur_lat =info.coords.latitude
cur_long= info.coords.longitude
// console.log("gettug curene  -  - - -",cur_lat,cur_long)
this.setState({
currentlatitude: info.coords.latitude,
currentlongitude: info.coords.longitude,
})
},
); 
    
BackHandler.removeEventListener('hardwareBackPress', () =>
this.handleBackButton(this.props.navigation),
);

}

checkSwitch  = (value) => {
  console.log("getting value inside the function--1111111111-------------",value)  // this.setState({email_notification:!this.state.email_notification})
    let newValue
    if (value == true) { 
      console.log("inside true  11111>>>>>", value)
      this.setState({
      setting_notification:1,   
      SwitchOnValueHolder: value
      
      })
      email_global = 1,switch_global = value
      newValue = 1
      }
    
      else if (value == false) {
        console.log("inside false111111111 >>>>>", value)         
          this.setState({
            setting_notification:0, SwitchOnValueHolder: value
            }) 
            newValue = 0
            email_global = 0,switch_global = value     
      console.log("getting finally here---111111111111--------",switch_global,email_global)
      }
     

    this.Fetchupdate_profile_status(newValue,email_global)    
  };



  GetdriverProfileFunction = async () => {       
    const user_id = await AsyncStorage.getItem('user_id');
    const UserId = JSON.parse(user_id)    
    const getDriverProfileResponse = await getDriverProfile({driver_id:UserId});
    if (getDriverProfileResponse.result == true) {
      // console.log('getting result here --------',getDriverProfileResponse.response,);
      if (getDriverProfileResponse.response.error == 'true') {
        Alert.alert('Message', getDriverProfileResponse.response.errorMessage);
        if(getDriverProfileResponse.response.errorMessage == "Incompatibilité de jetons"){
            Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
            AsyncStorage.clear()
            this.props.navigation.navigate("login")
          }
      } else {
        // console.log('getting reponse here=================',getDriverProfileResponse.response,);  
        var driverProfile = getDriverProfileResponse.response.usersDetails
        let fullname =    getDriverProfileResponse.response.usersDetails.fullname
        let profileImage =    getDriverProfileResponse.response.usersDetails.image
        this.setState({driverProfile,isBodyLoaded:true,isSpinner:false,fullname,profileImage})         
      }
    } else {
      this.myAlert('Error', getDriverProfileResponse.response.errorMessage);
      // console.log('getting error here-------------');
    }
    return;
  };





    render(){



      console.log("inside the render - - - - - ",this.state.currentlatitude,cur_long)

        return(
            <View style={Styles.container}>
              {/* <View style={Styles.headeView}>
               
                    <Image source={require("../../../assets/icons/logoTxt.png")} resizeMode='contain'  style={{height:36,width:200,borderWidth:0,borderColor:"red",margin:10}} />
                      <TouchableOpacity style={{flexDirection:"row",margin:1}}>                                                     
                    <Image source={require("../../../assets/icons/10.png")} style={{height:10,width:10,marginTop:10,margin:3}} />
                    </TouchableOpacity>
                    <Image source={require("../../../assets/icons/1.png")}   style={{height:40,width:40,margin:10}} />
                  
                </View> */}

<View style={Styles.headeView}>
               
               <Image source={require("../../../assets/icons/logoTxt.png")} resizeMode='contain'  style={{height:36,width:200,borderWidth:0,borderColor:"red",margin:10}} />
               {/* <TouchableOpacity style={{flexDirection:"row",margin:1}} onPress={() =>{this.Show_Custom_Alert()}}> */}
                   <Text style={{color:"#FFF",fontSize:12,fontWeight:"700",margin:7}}>{this.state.fullname} </Text>
               {/* <Image source={require("../../../assets/icons/10.png")} style={{height:10,width:10,marginTop:10,margin:3}} /> */}
               {/* </TouchableOpacity> */}
               {
                   this.state.profileImage != "" ?



                   <Image
                   source={{ uri: this.state.profileImage }} 
                   style={{height:40,width:40,margin:7,marginEnd:16,borderRadius:30}} />

                   :
                   <Image source={require("../../../assets/icons/1.png")}   style={{height:40,width:40,marginEnd:16}} />

               }


             
           </View>
                <TouchableOpacity>
                        <View style={{backgroundColor:"#2e2e30",width:"94%",alignSelf:'center',margin:10,borderRadius:6,flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:"#ff8c2d",margin:15,fontFamily: "Ariel",}}>Aller en Ligne</Text>
                            {/* <Switch
              trackColor={{true: '#b41565', false: 'grey'}}
              // thumbColor='#6FB8EF'

              onTintColor="#b41565"
              thumbColor="#fff"
              onValueChange={(value) => this.checkSwitch(value)}
              value={this.state.SwitchOnValueHolder}></Switch>           */}

                <Switch
              trackColor={{true: '#b41565', false: 'grey'}}
                  // thumbColor='#6FB8EF'

                  onTintColor="#b41565"
                  thumbColor="#fff"
              onValueChange={(value) => this.checkSwitch(value)}
              value={this.state.SwitchOnValueHolder}></Switch>
                        </View>
                    </TouchableOpacity>
                <View style={Styles.mainContainer}>             
               
                <View style={{                  
                    position: 'absolute',  
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  
    alignItems: 'center',  
    justifyContent: 'flex-end',  }}>  
  
  <MapView  
    style={{ position: 'absolute',  
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  }}  
    showsUserLocation={true}  
    zoomEnabled={true}    
    minZoomLevel={1}
    maxZoomLevel={200}
    enableZoomControl={true}
    initialRegion={{  
      // latitude:parseFloat(this.state.latitude),   
      // longitude:parseFloat(this.state.longitude),
      latitude:this.state.currentlatitude,
      longitude:this.state.currentlongitude,
      latitudeDelta: 0.0922,  
      longitudeDelta: 0.0421,  
    }}>  

<MapView.Marker
  //  image={require('../assets/truck_icon.png')} image={require('../assets/truck_icon.png')}

    coordinate={{ "latitude": cur_lat, "longitude": cur_long }}
  >
    <Image source={require('../../../assets/icons/dboy.png')} style={{width:30,height:30,resizeMode:'contain'}} />
  </MapView.Marker>
  </MapView>  
  </View>



                {/* <View style={{position:"absolute",bottom:30,alignSelf:'center'}}>
                <TouchableOpacity style={Styles.btnStyles}  onPress={()=>{this.Show_Custom_Alert()}}>
                  
                                <Text style={Styles.btnTextStyle}>
                                Commencez par
                                </Text>                  
                      </TouchableOpacity>  
                </View> */}

                </View>


              


                <Modal
            visible={this.state.Alert_Visibility}
            animationType={'slide'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert(!this.state.Alert_Visibility);
            }}>
            <View
              style={{
                // backgroundColor:'#FFF',
                backgroundColor: 'rgba(225,126,45,255)',
                flex: 1,
               marginTop:75,
                // marginTop:SCREEN_HEIGHT,
                // justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <View
                style={{
                  width: '99%',
                  // backgroundColor: 'rgba(0,0,230,0.700)',
                  // alignItems: 'center',
                  // justifyContent: 'center',
                  // marginTop:70,
                  margin: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#2e2e30',
                    fontWeight: '700',
                    fontSize: 18,
                    alignSelf: 'center',
                    marginTop: 30,
                    margin: 10,
                    fontFamily:"Ariel"
                  }}>
                 Lieu de ramassage
                </Text>

                <View
                  style={{
                    marginTop: -4,                 
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 13,
                      fontWeight: '700',
                      alignSelf: 'center',
                      fontFamily:"Ariel",
                    }}>
                   23, Simple Streets, France
                  </Text>                 
                </View>





              


                 


                <View style={{justifyContent:'center',alignItems:'center'}}>
                   <ImageBackground
                   source={require("../../../assets/icons/Artbort1.png")}                  
                    style={{justifyContent:'center',alignItems:'center',height:210,width:210,marginTop:27}}
                   >  
                   {/* <View style={{marginTop:30}}>
                   <CountDown
                   size={8}
                  //  until={this.state.secondBetweenTwoDate}
                  until={10}
                  //  onFinish={() => this.setState({secondBetweenTwoDate:0,isButtonEnable:false})}
                   digitStyle={{backgroundColor: '#FFF', borderWidth: 0, borderColor: '#b41565',}}
                   digitTxtStyle={{color: '#b41565'}}
                   timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                   separatorStyle={{color: '#b41565'}}
                   timeToShow={['H', 'M', 'S']}
                   timeLabels={{m: null, s: null}}
                   showSeparator
                 />
                 </View> */}


                   </ImageBackground>
              </View> 


              <View
                  style={{
                    marginTop: 27,
                    marginStart: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color: '#2e2e30',
                      fontSize: 17,
                      fontWeight: '700',
                      alignSelf: 'center',
                      fontFamily:"Ariel"
                    }}>
                Lieu de dépôt
                  </Text>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 13,
                      marginTop:5,
                      fontWeight: '700',
                      alignSelf: 'center',
                    }}>
                25/A Christina Church, France 
                  </Text>
                </View>

               
                  <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    margin: 30,
                    marginTop: 40,
                    marginBottom: 30,
                  }}>
                  <TouchableOpacity
                    onPress={()=>{this.Hide_Custom_Alert1()}}
                   
                    style={{
                      backgroundColor: '#ffffff',
                      justifyContent: 'center',
                      margin: 10,
                      marginStart: 25,
                      marginEnd: 25,
                      height: 35,
                      borderRadius: 30,
                    }}>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 14,
                        marginStart: 20,
                        marginEnd: 20,
                        fontWeight: '600',
                        textAlign: 'center',
                        fontFamily:"Ariel"
                      }}>
                     Accepter
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.Hide_Custom_Alert();
                    }}
                    // onPress={()=>{this.fetchreservation_request_Reject()}}
                    style={{
                      backgroundColor: '#000000',
                      justifyContent: 'center',
                      margin: 10,
                      marginStart: 25,
                      marginEnd: 25,
                      height: 35,
                      borderRadius: 30,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 14,
                        marginStart: 20,
                        marginEnd: 20,
                        fontWeight: '600',
                        textAlign: 'center',
                        fontFamily:"Ariel"
                      }}>
                    Décliner
                    </Text>
                  </TouchableOpacity>
                </View>

                

              

             

              </View>
            </View>
          </Modal>




              
          <BottomNavigator
                    currentRoute={'home'}
                    navigation={this.props.navigation}
                />


            </View>
        )
    }
}

export default PartnerNearMe;