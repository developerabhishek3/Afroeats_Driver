import React,{Component} from 'react';

import {View,Text,TouchableOpacity,Modal,BackHandler,ImageBackground,Image,Alert} from 'react-native';
import {getmyOrdersRealTime,rejectOrder,acceptOrder} from '../../Api/afterAuth';
import AsyncStorage from '@react-native-community/async-storage';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';

import Spinner from 'react-native-loading-spinner-overlay';
export default class index extends Component {
  constructor(props){
    super(props)
    this.state={        
        Model_Visibility: false,
        Alert_Visibility: false, 
        OrderDetails:[],  
        pickup_address:"",  
        isSpinner:false,
        isBodyLoaded:false,
        endSeconds:45,
        delivery_address:"",
      }
    }

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  
  Hide_Custom_Alert() {
    console.log("inside hidfe ==============")
    this.setState({Alert_Visibility: false});
    this.rejectOrderFunction()
   
  }
  
  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility: false});
    // this.props.navigation.navigate("myorder")
    this.acceptOrderFunction()
   
  }
  
  componentDidMount = async () => {      
    this.Show_Custom_Alert()
    this.getmyOrdersRealTimeFunction()
    // setTimeout(() => {
    
    // }, 200);   

   
    let fcm_order_id = this.props.navigation.getParam("fcm_order_id")
    console.log("getting order id inside did mount  - -  -  -,",fcm_order_id)



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
      nav.navigate("home");
      return true;
    }
  };






  

  getmyOrdersRealTimeFunction = async () => {       
    const user_id = await AsyncStorage.getItem('user_id');
    const UserId = JSON.parse(user_id)    
    const getmyOrdersRealTimeResponse = await getmyOrdersRealTime({driver_id:UserId});
    if (getmyOrdersRealTimeResponse.result == true) {
      // console.log('getting result here --------',getmyOrdersRealTimeResponse.response,);
      if (getmyOrdersRealTimeResponse.response.error == 'true') {
        Alert.alert('Message', getmyOrdersRealTimeResponse.response.errorMessage);
        if(getmyOrdersRealTimeResponse.response.errorMessage == "Incompatibilité de jetons"){
            Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
            AsyncStorage.clear()
            this.props.navigation.navigate("login")
          }
      } else {
        // console.log('getting reponse here=================',getmyOrdersRealTimeResponse.response.orderDetails,);  
        var pickup_address = getmyOrdersRealTimeResponse.response.orderDetails.pickup_address     
        var outlet_name = getmyOrdersRealTimeResponse.response.orderDetails.outlet_name     
        var delivery_address = getmyOrdersRealTimeResponse.response.orderDetails.delivery_address     
        this.setState({pickup_address,outlet_name,delivery_address,isBodyLoaded:true,isSpinner:false})         
      }
    } else {
      ALert.alert('Error', getmyOrdersRealTimeResponse.response.errorMessage);
      console.log('getting error here-------------');
    }
    return;
  };






  rejectOrderFunction(){  
    this.setState({ isSpinner: true }, async () => { 

      let fcm_order_id = this.props.navigation.getParam("fcm_order_id")
      console.log("getting order id here  - -  -  -,",fcm_order_id)
      const user_id = await AsyncStorage.getItem('user_id');
      const UserId = JSON.parse(user_id)    
      const rejectOrderResponse = await rejectOrder({
          driver_id:UserId,
          order_id:fcm_order_id
        });
      if (rejectOrderResponse.result == true) {
        // console.log('getting result here --------',rejectOrderResponse.response,);
        if (rejectOrderResponse.response.error == 'true') {
          Alert.alert('Message', rejectOrderResponse.response.errorMessage);
          if(rejectOrderResponse.response.errorMessage == "Incompatibilité de jetons"){
              Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
              AsyncStorage.clear()
              this.props.navigation.navigate("login")
            }
        } else {
          console.log('getting reponse here=================',rejectOrderResponse.response);  
          Alert.alert("Message",rejectOrderResponse.response.errorMessage)
          this.props.navigation.navigate("home")  
          this.setState({isSpinner:false})            
        }
      } else {
        ALert.alert('Error', rejectOrderResponse.response.errorMessage);
        console.log('getting error here-------------');
      }
      return;
    })
    
  };



  

  acceptOrderFunction(){  
    this.setState({ isSpinner: true }, async () => { 

      let fcm_order_id = this.props.navigation.getParam("fcm_order_id")
      console.log("getting order id here  - -  -  -,",fcm_order_id)
      const user_id = await AsyncStorage.getItem('user_id');
      const UserId = JSON.parse(user_id)    
      const acceptOrderResponse = await acceptOrder({
          driver_id:UserId,
          order_id:fcm_order_id
        });
      if (acceptOrderResponse.result == true) {
        // console.log('getting result here --------',acceptOrderResponse.response,);
        if (acceptOrderResponse.response.error == 'true') {
          Alert.alert('Message', acceptOrderResponse.response.errorMessage);
          if(acceptOrderResponse.response.errorMessage == "Incompatibilité de jetons"){
              Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
              AsyncStorage.clear()
              this.props.navigation.navigate("login")
            }
        } else {
          Alert.alert("Message",acceptOrderResponse.response.errorMessage)
          this.setState({isSpinner:false}) 
          console.log('getting reponse here=================',acceptOrderResponse.response);  
          this.props.navigation.navigate("home")              
        }
      } else {
        ALert.alert('Error', acceptOrderResponse.response.errorMessage);
        console.log('getting error here-------------');
      }
      return;
    })
    
  };
 





  render(){
    return(
    <View style={{flex:1}}>
        
<Spinner visible={this.state.isSpinner}/>   
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
               
                // marginTop:SCREEN_HEIGHT,
                justifyContent: 'center',
                alignItems: 'center',
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
                      {this.state.pickup_address}
                  </Text> 


                   <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 13,
                      marginTop:7,
                      margin:6,
                      fontWeight: '700',
                      alignSelf: 'center',
                      fontFamily:"Ariel",
                    }}>
                      {this.state.outlet_name}
                  </Text>                 
                </View>





              


                 


                <View style={{justifyContent:'center',alignItems:'center'}}>
                   <ImageBackground
                   source={require("../../assets/icons/watch.png")}                  
                    style={{justifyContent:'center',alignItems:'center',height:210,width:210,marginTop:27}}
                   >  
                   <View style={{marginTop:30}}>
                   <CountDown
                   size={8}                
                   until={45}
                   onFinish={() => this.Hide_Custom_Alert()}
                   digitStyle={{backgroundColor: '#FFF', borderWidth: 0, borderColor: '#e17e2d',}}
                   digitTxtStyle={{color: '#e17e2d'}}
                   timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                   separatorStyle={{color: '#e17e2d'}}
                   timeToShow={['H', 'M', 'S']}
                   timeLabels={{m: null, s: null}}
                   showSeparator
                 />
                 </View>


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
                {/* 25/A Christina Church, France  */}
                {this.state.delivery_address}
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

    </View>
    )   
  }
}