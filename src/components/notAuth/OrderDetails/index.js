import React,{Component,Fragment} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView,Modal,Dimensions,BackHandler,Linking,Alert} from 'react-native';
import BottomNavigator from '../../../router/BottomNavigator';
import Styles from './indexCss';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import AsyncStorage from '@react-native-community/async-storage';
import {myorderDetail,rejectOrderDriver} from '../../../Api/afterAuth';
import Spinner from 'react-native-loading-spinner-overlay';
import GetLocation from 'react-native-get-location';
class OrderDetails extends Component {
    constructor(props){
        super(props)
        this.state={      
          Alert_Visibility: false,        
          Alert_Visibility1: false,
          orderDetails:[],
          isBodyLoaded: false,
          isSpinner: true,  
          currentLatitude:0,
          currentLongitude:0,
          delivery_address:"",
          user_image:"",
          user_mobNumber:"",
          username:"",
          lastname:"",
          delivery_latitude:"",
          delivery_longitude:"",
          latitude:"",
          longitude:""

        }
    }
    Show_Custom_Alert(visible) {
      this.setState({Alert_Visibility: visible});
    }
    Show_Custom_Alert1(visible) {
      this.setState({Alert_Visibility1: visible});
      this.Hide_Custom_Alert()
    }
    Hide_Custom_Alert() {
      this.setState({Alert_Visibility: false});      
    }
    Hide_Custom_Alert2() {
      this.setState({Alert_Visibility1: false}); 
      this.props.navigation.navigate("profile")     
    }
    Hide_Custom_Alert3() {
      this.setState({Alert_Visibility: false}); 
      this.rejectOrderFunction()     
    }













    myorderDetailFunction = async () => {       
      const user_id = await AsyncStorage.getItem('user_id');
      const UserId = JSON.parse(user_id) 
      let orderId = this.props.navigation.getParam("orderId")   
      const myorderDetailResponse = await myorderDetail({order_id:orderId});
      if (myorderDetailResponse.result == true) {      
        if (myorderDetailResponse.response.error == 'true') {
          Alert.alert('Message', myorderDetailResponse.response.errorMessage);
          if(myorderDetailResponse.response.errorMessage == "Incompatibilité de jetons"){
              Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
              AsyncStorage.clear()
              this.props.navigation.navigate("login")
            }
        } else {
          // console.log('getting reponse here=================',myorderDetailResponse.response,);  
          var orderDetails = myorderDetailResponse.response.order_record
          let delivery_address;
          let user_image;
          let user_mobNumber;
          let username;
          let lastname;
          let delivery_latitude;
          let delivery_longitude;
          let latitude;
          let longitude;

          orderDetails.map((singleOrder)=>{
            console.log("getting order details inside map =  - - - -",singleOrder)
            delivery_address = singleOrder.delivery_address
            user_image = singleOrder.user_image
            user_mobNumber = singleOrder.user_mobNumber  
            username = singleOrder.username   
            lastname = singleOrder.lastname  
            delivery_latitude = singleOrder.delivery_latitude   
            delivery_longitude = singleOrder.delivery_longitude  
            latitude = singleOrder.latitude 
            longitude = singleOrder.longitude 
          })
          // console.log('getting result here for orderDetails order --------',orderDetails);         
          this.setState({orderDetails,isSpinner:false,isBodyLoaded:true,delivery_address,
            longitude,latitude,delivery_longitude,delivery_latitude,lastname,user_image,user_mobNumber,username})         
        }
      } else {
        this.myAlert('Error', myorderDetailResponse.response.errorMessage);
        console.log('getting error here-------------');
      }
      return;
    };

  



  
    componentDidMount = async () => {      
    
      setTimeout(() => {
          this.myorderDetailFunction()
          
      }, 1000);
      setInterval(() => {
        this.getCurrentLocation()
      }, 1000);


      BackHandler.addEventListener('hardwareBackPress', () =>
        this.handleBackButton(this.props.navigation),
      );      
    };


    rejectOrderFunction(){   
      
      this.setState({ isSpinner: true }, async () => {  

        const user_id = await AsyncStorage.getItem('user_id');
        const UserId = JSON.parse(user_id) 
        let orderId = this.props.navigation.getParam("orderId") 
    
        console.log("inside the funciton order id getting - -  - - - - -",orderId,)  
        const CancelOrderDetails = await rejectOrderDriver({
                order_id:orderId, 
                driver_id:UserId,           
            });
        if (CancelOrderDetails.result == true) { 
          this.setState({
            isSpinner:false
          });      
          if (CancelOrderDetails.response.error == 'true') {
            Alert.alert('Message', CancelOrderDetails.response.errorMessage);
            if(CancelOrderDetails.response.errorMessage == "Incompatibilité de jetons"){
                Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
                AsyncStorage.clear()
                this.props.navigation.navigate("login")
                this.setState({
                  isSpinner:false
                }); 
              }
          } else {
            // console.log('getting reponse here=================',CancelOrderDetails.response,);             
                 this.setState({isSpinner:false})      
                 this.props.navigation.navigate("home")                 
          }
        } else {
          this.setState({
            isSpinner:false
          }); 
          ALert.alert('Error', postOrderResponse.response.errorMessage);
          console.log('getting error here-------------');
        }
        return;


      })
      };

      getCurrentLocation(){
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
      })
      .then(location => {
        // var currentLatitude =
        // var currentLongitude = 
          // console.log("LAT : :  : : : : : :"+location.latitude);
          // console.log("LONG : : : :::: : : :  : :"+location.longitude);
          this.setState({currentLatitude: location.latitude,currentLongitude:location.longitude})
    
      })
      .catch(error => {
          const { code, message } = error;
          // console.warn(code, message);
      })
       }






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

  render() {
    let orderId = this.props.navigation.getParam("orderId") 
    let isPastOrder = this.props.navigation.getParam("isPastOrder") 
    
    const {orderDetails,currentLatitude,currentLongitude}  = this.state;
    console.log("getting order details herev- -  -  - -  -",orderId,isPastOrder)

    return (
      <View style={Styles.container}>
        <View style={Styles.headerView}>
        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image
            source={require('../../../assets/icons/2.png')}
            style={Styles.headerIMG}
          />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Détail de l'ordre</Text>          
        </View>
        <Spinner visible={this.state.isSpinner} 
        />
        {/* <View style={Styles.headerTopTxtView}>
          <TouchableOpacity>
            <Text style={Styles.headerTxt1}>Passe</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={Styles.headerTxt2}>A Venir</Text>
          </TouchableOpacity>
        </View> */}
        <ScrollView showsVerticalScrollIndicator={true}>


          {
            this.state.isBodyLoaded == true ?

            <Fragment>



              <View>




{
                orderDetails.map((singleOrderDetails)=>{
                  let nestedArrayValue
                  singleOrderDetails.image_record.map((NEstedsingle)=>{
                    nestedArrayValue = NEstedsingle
                    // console.log("getting again value  -  - - - - - ",NEstedsingle)
                  })


                  return(
                    <View>
                       <View style={Styles.contentView}>


                                


            <Image  source={{uri:nestedArrayValue }} style={{alignSelf:"center",width:"90%",height:200,margin:6,borderRadius:3}} />                                    
            {/* <Image source={singleOrderDetails.user_image} style={{alignSelf:"center",width:"90%",height:200,margin:6,borderRadius:3}} />                                     */}
            <View style={{margin:20}}>
                        <Text style={{color:"#cccccc",fontSize:18,fontFamily:"Ariel",fontWeight:"700"}}>{singleOrderDetails.cat_name}</Text>
                        <Text style={{color:"#606060",fontSize:14,fontFamily:"Ariel",fontWeight:"700",margin:6}}>{singleOrderDetails.description}</Text>
                    </View>
                    {/* <View style={{margin:20}}>
                        <Text style={{color:"#cccccc",fontSize:14,fontFamily:"Ariel",fontWeight:"700"}}>2x SOYA</Text>
                        <Text style={{color:"#606060",fontSize:12,fontFamily:"Ariel",fontWeight:"700"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</Text>
                    </View> */}

                    <View style={{flexDirection:"row",margin:20,justifyContent:"space-between"}}>
                    <Text style={{color:"#cccccc",fontSize:16,fontFamily:"Ariel",fontWeight:"700"}}>TOTAL</Text>
                        <Text style={{color:"#cccccc",fontSize:18,fontFamily:"Ariel",fontWeight:"700"}}>{singleOrderDetails.price}€</Text>
                    </View>

                   



                        </View>

                    </View>
                  )
                })
              }





              </View>


              <View style={{margin:20}}>
                        <Text style={{color:"#cccccc",fontSize:16,fontFamily:"Ariel",fontWeight:"700"}}>Détails de la livraison</Text>                        
                    </View>


                    <Text style={{color:"#e17e2d",fontSize:10,paddingStart:20,margin:4,fontFamily:"Ariel",fontWeight:"700"}}>Adresse de livraison</Text>                        

                    {
                        isPastOrder == true ?



                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("trackorder",{
                          delivery_address:this.state.delivery_address,
                          orderId:orderId,
                          delivery_latitude:JSON.parse(this.state.delivery_latitude),
                          delivery_longitude:JSON.parse(this.state.delivery_longitude),
                          // lat:currentLatitude,
                          // long:currentLongitude
                          lat:JSON.parse(this.state.latitude),
                          long:JSON.parse(this.state.longitude)
                        })}} style={{margin:0,flexDirection:"row",marginStart:20}}>
                            <Image source={require("../../../assets/icons/address1.png")} style={{height:16,width:16,margin:3}} />
                            <Text style={{color:"#cccccc",fontSize:10,fontFamily:"Ariel",fontWeight:"700",margin:4,width:SCREEN_WIDTH*0.85}}>{this.state.delivery_address}</Text>                        
                        </TouchableOpacity>
                        :

                        <View  style={{margin:0,flexDirection:"row",marginStart:20}}>
                        <Image source={require("../../../assets/icons/address1.png")} style={{height:16,width:16,margin:3}} />
                        <Text style={{color:"#cccccc",fontSize:10,fontFamily:"Ariel",fontWeight:"700",margin:4,width:SCREEN_WIDTH*0.85}}>{this.state.delivery_address}</Text>                        
                    </View>


                    }
                  



                 
                    <Text style={{color:"#e17e2d",fontSize:10,marginTop:20,margin:4,paddingStart:20,fontFamily:"Ariel",fontWeight:"700"}}>Nom d'utilisateur</Text>                        
                    <View style={{margin:1,flexDirection:"row",marginStart:20,justifyContent:"space-between",alignItems:'center'}}>
                        <View style={{flexDirection:"row"}}>
                          <Image source={{ uri : this.state.user_image}} style={{height:40,width:40,margin:0,borderRadius:30}} />
                          <View style={{margin:7}}>
                          <Text style={{color:"#cccccc",fontSize:10,fontFamily:"Ariel",fontWeight:"700",margin:1}}>{this.state.username} {this.state.lastname}</Text>                        
                          <Text style={{color:"#cccccc",fontSize:10,fontFamily:"Ariel",fontWeight:"700",margin:1}}>{this.state.user_mobNumber}</Text>                        
                            </View>
                          
                        </View>
                        {   
                          isPastOrder == true ?

                          <View style={{flexDirection:"row"}}>
                          <TouchableOpacity onPress={() =>{this.props.navigation.navigate("chat",{
                            orderId:orderId,
                            // driver_id:singleOrderDetails.driver_id
                          })}}>
                            <Image source={require("../../../assets/icons/chat.png")} style={{height:27,width:27,margin:10}} />
                        </TouchableOpacity>
                        <TouchableOpacity                
                            onPress={()=>{
                              Linking.openURL(`tel:${this.state.user_mobNumber}`)
                            }}
                        >
                        <Image source={require("../../../assets/icons/p.png")} style={{height:30,width:30,margin:10}} />
                        </TouchableOpacity>
                        </View>
                          :null


                        }
                      
                    </View>
                        {
                           isPastOrder == true ?
                           <TouchableOpacity onPress={()=>{this.Show_Custom_Alert()}} style={Styles.continueBtn}>
                           <Text style={Styles.continueBtnTxt}>Annuler</Text>
                         </TouchableOpacity>
                           :null
                        }
                 
          






            </Fragment>






            :
            <View>
              <Text></Text>
            </View>


          }
           

          

        </ScrollView>


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
              backgroundColor: 'rgba(60, 60, 60, 0.8)',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',            
            }}>
            <View
              style={{
                width: '85%',
                height: 180,                         
                backgroundColor: '#000000',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
                borderRadius: 10,
                borderColor:"red",

              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>              
                <Text
                  style={{
                    fontSize: 18,
                    alignSelf: 'center',
                    fontWeight: '700',
                    margin:10,
                    marginTop:20,
                    color: '#ffffff',
                    textAlign: 'center',
                    fontFamily: 'Montserrat-Regular',
                  }}>
                    Annuler la livraison
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    alignSelf: 'center',
                    fontWeight: '700',
                    margin:20,
                    marginTop:0,
                    color: '#ffffff',
                    textAlign: 'center', 
                    width:SCREEN_WIDTH/1.7              
                  }}>
                 Vous etes sur de vouloir annuler is commande?
                </Text>


                </View>                    
            
            <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:-30}}>
                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert3()}                 
                  style={Styles.continueBtn}>
                  <Text
                    style={Styles.continueBtnTxt}>
                    Oui
                  </Text>
                </TouchableOpacity>


                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert()}                 
                  style={Styles.continueBtn}>
                  <Text
                    style={Styles.continueBtnTxt}>
                       Non
                  </Text>
                </TouchableOpacity>
            </View>
             
              
            </View>
          </View>
        </Modal>





        <Modal
          visible={this.state.Alert_Visibility1}
          animationType={'slide'}
          transparent={true}
          onRequestClose={() => {
            this.Show_Custom_Alert1(!this.state.Alert_Visibility1);
          }}>
          <View
            style={{
              // backgroundColor:'#FFF',
              backgroundColor: 'rgba(60, 60, 60, 0.8)',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',              
            }}>
            <View
              style={{
                width: '90%',
                height: 200,                
                backgroundColor: '#000000',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
                borderRadius: 10,
                // borderWidth:1,
                // borderColor:"red"
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center',marginBottom:0}}>              
               
                <Text
                  style={{
                    fontSize: 16,
                    alignSelf: 'center',
                    fontWeight: '700',
                    margin:5,                                        
                    padding:3,
                    color: '#ffffff',
                    textAlign: 'center', 
                    width:SCREEN_WIDTH/2              
                  }}>
               Commande Livree
                </Text>

               
                <Text
                  style={{
                    fontSize: 10,
                    alignSelf: 'center',
                    fontWeight: '700',
                    margin:1,                    
                    padding:1,
                    color: '#ffffff',
                    textAlign: 'center', 
                    width:SCREEN_WIDTH/2              
                  }}>
                 Vous avez livre votre 
                </Text>

              
                <Text
                  style={{
                    fontSize: 10,
                    alignSelf: 'center',
                    fontWeight: '700',
                    margin:1,                    
                    padding:1,
                    color: '#ffffff',
                    textAlign: 'center', 
                    width:SCREEN_WIDTH/2              
                  }}>
                commando avec succes

                </Text>

                <Text
                  style={{
                    fontSize: 10,
                    alignSelf: 'center',
                    fontWeight: '700',
                    margin:1,                    
                    padding:1,
                    color: '#ffffff',
                    textAlign: 'center', 
                    width:SCREEN_WIDTH/2              
                  }}>
               veuillez noter lutilisateur.
                </Text>


                </View>                    
            
            
                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert2()}                 
                  style={Styles.continueBtn}>
                  <Text
                    style={Styles.continueBtnTxt}>
                     Continuer
                  </Text>
                </TouchableOpacity>


             
              
            </View>
          </View>
        </Modal>








        <BottomNavigator
          currentRoute={'myorder'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

export default OrderDetails;
