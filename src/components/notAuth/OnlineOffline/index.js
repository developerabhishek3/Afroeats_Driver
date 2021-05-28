import React,{Component} from 'react';
import {View,Text,TouchableOpacity,Image,ScrollView, ImageBackground,Switch,Modal,Dimensions,BackHandler} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Styles from './indexCss'
import BottomNavigator from '../../../router/BottomNavigator'
import CountDown from 'react-native-countdown-component';
import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';
import ModalDropdown from 'react-native-modal-dropdown';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import {update_profile_status} from '../../../Api/afterAuth'
let email_global;
let switch_global;
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
  
  
  
    }
}
  async toggleSwitch(){
    this.setState({isEnabled:!this.state.isEnabled})
}

Show_Custom_Alert(visible) {
  this.setState({Alert_Visibility: visible});
}

Hide_Custom_Alert() {
  console.log("inside hidfe ==============")
  this.setState({Alert_Visibility: false});
  // this.props.navigation.navigate("home")
}

Hide_Custom_Alert1() {
  this.setState({Alert_Visibility: false});
  this.props.navigation.navigate("myorder")
}




componentDidMount = async () => {      
    
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



Fetchupdate_profile_status = async (value, email_global) => {
  const {
    // email_notification:email_global,
    online_offline,
  } = this.state;
  // console.log(
  //   'email confiramtion  and push confirmation -------------------',
  //   email_global,
  //   value,
  //   push_global,
  // );
  const update_profile_statusResponse = await update_profile_status({
    profile_status: email_global,
    driver_id:2,
  });
  if (update_profile_statusResponse.result === true) {
    // console.log(
    //   'getting result here ----------------->>>>>>>>>>>>>>>>>>>-',
    //   update_profile_statusResponse.response,
    // );
  } else {
    Alert.alert('Error', update_profile_statusResponse.error);
    console.log('getting error here-------------');
  }
  return;
};

// Getonline_offline_status = () => {
//   this.setState({isSpinner: true}, async () => {
//     const online_offline_statusResponse = await online_offline_status();
//     if (online_offline_statusResponse.result === true) {
//       // console.log(
//       //   'getting date here>>>>>>>>>>>>>>>>>>>>',
//       //   online_offline_statusResponse.response,
//       // );
//       // var online_offline = parseInt(online_offline_statusResponse.response.online_offline)

//       var online_offline =
//         online_offline_statusResponse.response.online_offline;
//       // console.log('I am here-------------------', online_offline);

//       if (online_offline == 0) {
//         this.setState({
//           online_offline: 0,
//           SwitchOnValueHolder: false,
//         });
//       } else if (online_offline == 1) {
//         this.setState({online_offline: 1, SwitchOnValueHolder: true});
//       }

//       if (online_offline == 0) {
//         this.setState({online_offline: 0, SwitchOnValueHolder2: false});
//       } else if (online_offline == 1) {
//         this.setState({online_offline: 1, SwitchOnValueHolder2: true});
//       }
//       this.setState({
//         isBodyLoaded: true,
//         isSpinner: false,
//         isCurrenetComponentRefreshing: false,
//         // online_offline: online_offline_statusResponse.response.online_offline,
//         // email_notification:email_notification,
//         online_offline: online_offline,
//       });
//     } else {
//       this.setState({isBodyLoaded: false, isSpinner: false}, () => {
//         Alert.alert('Message', 'Something Went Wrong Try Again!', [
//           {
//             text: 'OK',
//             onPress: () => {
//               this.props.navigation.goBack();
//             },
//           },
//         ]);
//       });
//     }
//   });
// };

checkSwitch = (value) => {


  if (value == true) {
    console.log('inside true  11111>>>>>', value);
    this.setState({
      online_offline: 1,
      SwitchOnValueHolder: value,
    });
    (email_global = 1), (switch_global = value);
  } else if (value == false) {
    // console.log('inside false111111111 >>>>>', value);
    this.setState({
      online_offline: 0,
      SwitchOnValueHolder: value,
    });
    (email_global = 0), (switch_global = value);
    // console.log(
    //   'getting finally here---111111111111--------',
    //   switch_global,
    //   email_global,
    // );
  }
  this.Fetchupdate_profile_status(value, email_global);
};






    render(){
        return(
            <View style={Styles.container}>
              <View style={Styles.headeView}>
               
                    <Image source={require("../../../assets/icons/logoTxt.png")} resizeMode='contain'  style={{height:36,width:200,borderWidth:0,borderColor:"red",margin:10}} />
                      <TouchableOpacity style={{flexDirection:"row",margin:1}}>
                    <ModalDropdown options={['option 1', 'option 2','option 3','option 4','option 5']} 
                    defaultValue="Ghita"                  
                    textStyle={{ color:"#FFFFFF",marginTop:6}} />                                       
                    <Image source={require("../../../assets/icons/10.png")} style={{height:10,width:10,marginTop:10,margin:3}} />
                    </TouchableOpacity>
                    <Image source={require("../../../assets/icons/1.png")}   style={{height:40,width:40,margin:10}} />
                  
                </View>
                <TouchableOpacity>
                        <View style={{backgroundColor:"#2e2e30",width:"94%",alignSelf:'center',margin:10,borderRadius:6,flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:"#ff8c2d",margin:15,fontFamily: "Ariel",}}>Aller en Ligne</Text>
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
    zoomEnabled={false}    
    minZoomLevel={1}
    maxZoomLevel={200}
    enableZoomControl={true}
    initialRegion={{  
      // latitude:parseFloat(this.state.latitude),   
      // longitude:parseFloat(this.state.longitude),
      latitude:48.8566,
      longitude:2.3522,
      latitudeDelta: 0.0922,  
      longitudeDelta: 0.0421,  
    }}>  

    <Marker  
      coordinate={{ latitude: 22.719568, longitude: 75.857727 }}  
      title={"indore"}  
       
    />  
  </MapView>  
  </View>



                <View style={{position:"absolute",bottom:30,alignSelf:'center'}}>
                <TouchableOpacity style={Styles.btnStyles}  onPress={()=>{this.Show_Custom_Alert()}}>
                  
                                <Text style={Styles.btnTextStyle}>
                                Commencez par
                                </Text>                  
                      </TouchableOpacity>  
                </View>

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