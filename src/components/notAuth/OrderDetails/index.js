import React,{Component,Fragment} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView,Modal,Dimensions,BackHandler} from 'react-native';
import BottomNavigator from '../../../router/BottomNavigator';
import Styles from './indexCss';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import AsyncStorage from '@react-native-community/async-storage';
import {myorderDetail} from '../../../Api/afterAuth';
import Spinner from 'react-native-loading-spinner-overlay';
class OrderDetails extends Component {
    constructor(props){
        super(props)
        this.state={
          Model_Visibility: false,
          Alert_Visibility: false,
          Model_Visibility1: false,
          Alert_Visibility1: false,
          orderDetails:[],
          isBodyLoaded: false,
          isSpinner: true,  
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
  













    myorderDetailFunction = async () => {       
      const user_id = await AsyncStorage.getItem('user_id');
      const UserId = JSON.parse(user_id) 
      let orderId = this.props.navigation.getParam("orderId")   
      const myorderDetailResponse = await myorderDetail({order_id:orderId});
      if (myorderDetailResponse.result == true) {
      
        if (myorderDetailResponse.response.error == 'true') {
          Alert.alert('Message', myorderDetailResponse.response.errorMessage);
          if(myorderDetailResponse.response.errorMessage == "Token mismatch"){
              Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
              AsyncStorage.clear()
              this.props.navigation.navigate("login")
            }
        } else {
          // console.log('getting reponse here=================',myorderDetailResponse.response,);  
          var orderDetails = myorderDetailResponse.response.order_record
          console.log('getting result here for orderDetails order --------',orderDetails);         
          this.setState({orderDetails,isSpinner:false,isBodyLoaded:true})         
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

  render() {

    const {orderDetails}  = this.state;
    console.log("getting order details herev- -  -  - -  -",orderDetails)

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




{
                orderDetails.map((singleOrderDetails)=>{
                  return(
                    <View>
                       <View style={Styles.contentView}>


                                


            <Image source={require("../../../assets/icons/27.jpg")} style={{alignSelf:"center",width:"90%",height:200,margin:6,borderRadius:3}} />                                    
            {/* <Image source={singleOrderDetails.user_image} style={{alignSelf:"center",width:"90%",height:200,margin:6,borderRadius:3}} />                                     */}
            <View style={{margin:20}}>
                        <Text style={{color:"#cccccc",fontSize:14,fontFamily:"Ariel",fontWeight:"700"}}>1x SOYA</Text>
                        <Text style={{color:"#606060",fontSize:12,fontFamily:"Ariel",fontWeight:"700"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</Text>
                    </View>
                    <View style={{margin:20}}>
                        <Text style={{color:"#cccccc",fontSize:14,fontFamily:"Ariel",fontWeight:"700"}}>2x SOYA</Text>
                        <Text style={{color:"#606060",fontSize:12,fontFamily:"Ariel",fontWeight:"700"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</Text>
                    </View>

                    <View style={{flexDirection:"row",margin:20,justifyContent:"space-between"}}>
                    <Text style={{color:"#cccccc",fontSize:18,fontFamily:"Ariel",fontWeight:"700"}}>TOTAL</Text>
                        <Text style={{color:"#cccccc",fontSize:18,fontFamily:"Ariel",fontWeight:"700"}}>{singleOrderDetails.price}€</Text>
                    </View>

                    <View style={{margin:20}}>
                        <Text style={{color:"#cccccc",fontSize:18,fontFamily:"Ariel",fontWeight:"700"}}>Détails de la livraison</Text>                        
                    </View>


                    <Text style={{color:"#e17e2d",fontSize:10,paddingStart:20,margin:4,fontFamily:"Ariel",fontWeight:"700"}}>Adresse de livraison</Text>                        
                    <View style={{margin:0,flexDirection:"row",marginStart:20}}>
                        <Image source={require("../../../assets/icons/address1.png")} style={{height:16,width:16,margin:3}} />
                        <Text style={{color:"#cccccc",fontSize:10,fontFamily:"Ariel",fontWeight:"700",margin:4,width:SCREEN_WIDTH*0.85}}>{singleOrderDetails.delivery_address}</Text>                        
                    </View>

                    <Text style={{color:"#e17e2d",fontSize:10,marginTop:20,margin:4,paddingStart:20,fontFamily:"Ariel",fontWeight:"700"}}>Nom d'utilisateur</Text>                        
                    <View style={{margin:1,flexDirection:"row",marginStart:20,justifyContent:"space-between"}}>
                        <View style={{flexDirection:"row"}}>
                          <Image source={require("../../../assets/icons/pic1.png")} style={{height:40,width:40,margin:0,borderRadius:30}} />
                          <View style={{margin:7}}>
                          <Text style={{color:"#cccccc",fontSize:10,fontFamily:"Ariel",fontWeight:"700",margin:1}}>John Smith</Text>                        
                          <Text style={{color:"#cccccc",fontSize:10,fontFamily:"Ariel",fontWeight:"700",margin:1}}>+ 33 090 090 090</Text>                        
                            </View>
                          
                        </View>
                        <View>
                        <Image source={require("../../../assets/icons/p.png")} style={{height:30,width:30,margin:10}} />
                        </View>
                    </View>

                    <TouchableOpacity onPress={()=>{this.Show_Custom_Alert()}} style={Styles.continueBtn}>
                      <Text style={Styles.continueBtnTxt}>Annuler</Text>
                    </TouchableOpacity>
          




                        </View>

                    </View>
                  )
                })
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
                  onPress={() => this.Hide_Custom_Alert()}                 
                  style={Styles.continueBtn}>
                  <Text
                    style={Styles.continueBtnTxt}>
                    Oui
                  </Text>
                </TouchableOpacity>


                <TouchableOpacity
                  onPress={() => this.Show_Custom_Alert1()}                 
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
