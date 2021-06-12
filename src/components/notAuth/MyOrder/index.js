import React, {Component, Fragment} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView,BackHandler,Alert,Dimensions} from 'react-native';
import BottomNavigator from '../../../router/BottomNavigator';
import {getmyOrders} from '../../../Api/afterAuth';
import Styles from './indexCss';
import AsyncStorage from '@react-native-community/async-storage';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import Spinner from 'react-native-loading-spinner-overlay';

class MyOrder extends Component {
    constructor(props){
        super(props)
        this.state={
          currentOrderData:[],
          pastOrderData:[],
          isCurrentOrderData:true,
          isPastOrderData:false,
          isBodyLoaded: false,
          isSpinner: true,  

            date:[
                {
                    "restro_name":"RESTAURANT AFRO",
                    "address":"12 février 2019",
                    "amount":"32,45€"
                },
                {
                    "restro_name":"RESTAURANT AFRO",
                    "address":"12 février 2019",
                    "amount":"32,45€"
                },
                {
                    "restro_name":"RESTAURANT AFRO",
                    "address":"12 février 2019",
                    "amount":"32,45€"
                }
                
            ]
        }
    }










    getmyOrdersFunction = async () => {       
      const user_id = await AsyncStorage.getItem('user_id');
      const UserId = JSON.parse(user_id)    
      const getmyOrdersResponse = await getmyOrders({driver_id:UserId});
      if (getmyOrdersResponse.result == true) {
      
        if (getmyOrdersResponse.response.error == 'true') {
          Alert.alert('Message', getmyOrdersResponse.response.errorMessage);
          if(getmyOrdersResponse.response.errorMessage == "Token mismatch"){
              Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
              AsyncStorage.clear()
              this.props.navigation.navigate("login")
            }
        } else {
          console.log('getting reponse here=================',getmyOrdersResponse.response,);  
          var currentOrderData = getmyOrdersResponse.response.current_orders
          console.log('getting result here for current order --------',currentOrderData);
          var pastOrderData = getmyOrdersResponse.response.past_orders  
          // console.log('getting result here for past order --------',currentOrderData); 
          this.setState({currentOrderData,pastOrderData,isBodyLoaded:true,isSpinner:false})         
        }
      } else {
        this.myAlert('Error', getmyOrdersResponse.response.errorMessage);
        console.log('getting error here-------------');
      }
      return;
    };


  


isCurrentOrderDataFunction(){  
    this.setState({isCurrentOrderData:true,isPastOrderData:false})  
}

isPastOrderDataFunction(){  
    this.setState({isPastOrderData:true,isCurrentOrderData:false})    
}











    
    componentDidMount = async () => {    
      setTimeout(() => {
          this.getmyOrdersFunction()        
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
    const {pastOrderData,currentOrderData} = this.state;

    // console.log("inside the render- -  - - - - ",pastOrderData)

    return (
      <View style={Styles.container}>
        <View style={Styles.headerView}>
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image
            source={require('../../../assets/icons/2.png')}
            style={Styles.headerIMG}
          />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Mes ordres</Text>
        </View>
        <Spinner visible={this.state.isSpinner} />
        <View style={Styles.headerTopTxtView}>
          <TouchableOpacity onPress={()=>{this.isPastOrderDataFunction()}} >
            {
              this.state.isPastOrderData == true ?
              <Text style={Styles.headerTxt2}>Passé</Text>
              :
              <Text style={Styles.headerTxt1}>Passé</Text>

            }
            
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>{this.isCurrentOrderDataFunction()}}>
            {
              this.state.isCurrentOrderData == true ?
              <Text style={Styles.headerTxt2}>À venir</Text>
              :
              <Text style={Styles.headerTxt1}>À venir</Text>

            }
            
          </TouchableOpacity>
        </View>
        <ScrollView>
        {
          this.state.isBodyLoaded == true ?

          <Fragment>

        
          {
            this.state.isPastOrderData == true ?


            <Fragment>
              {
                this.state.pastOrderData.length > 0 ?

                

<View style={Styles.contentView}>
            {
                this.state.pastOrderData.map((singleMAp)=>{
                    return(
                        
                        <TouchableOpacity 
                            onPress={()=>{this.props.navigation.navigate("orderdetails",{
                              orderId:singleMAp.order_id
                            })}}
                        style={{backgroundColor:"#404040",width:"100%",margin:7,alignSelf:"center",borderRadius:7}}>
                            <View style={{flexDirection:"row",}}>
                                <View>
                                     <Image source={require("../../../assets/icons/27.jpg")} style={{width:150,height:120,margin:6,borderRadius:3}} />                                    
                                     {/* <Image source={`https://food.afroeats.fr/public/upload/products/${singleMAp.image}`} style={{width:150,height:120,margin:6,borderRadius:3}} />                                     */}
                                </View>
                                <View style={{margin:10,flexWrap:"wrap"}}>
                                    <Text style={{fontSize:12,fontWeight:"700",fontFamily:"Ariel",color:"#FFFFFF",margin:1,width:SCREEN_WIDTH/2.3}}>{singleMAp.pick_up_address}</Text>
                                    <Text style={{fontSize:10,fontWeight:"700",fontFamily:"Ariel",color:"#FFFFFF",margin:1,borderWidth:0,borderColor:"red",width:SCREEN_WIDTH/2.3}}>{singleMAp.delivery_address}</Text>
                                    <Text style={{fontSize:16,fontWeight:"700",fontFamily:"Ariel",color:"#FFFFFF",margin:15,paddingTop:24,alignSelf:"flex-end",}}> {singleMAp.total} €</Text>
                                </View>
                                </View>
                        </TouchableOpacity>
                    )
                })
            }

               </View>



                :
                <View style={{flex:2,justifyContent:'center',alignItems:"center",marginTop:SCREEN_HEIGHT/3.5,}}>
                <Text  style={{alignSelf:"center",color:"#FFFFFF",textAlign:'center'}}>No Past Order Found</Text>
              </View>

              }

        
            
            </Fragment>

            :
            <Fragment>
              {
                this.state.currentOrderData.length > 0 ?


     
                <View style={Styles.contentView}>
                {
                    this.state.currentOrderData.map((singleMAp)=>{
                        return(
                            
                            <TouchableOpacity 
                                onPress={()=>{this.props.navigation.navigate("orderdetails",{
                                  orderId:singleMAp.order_id
                                })}}
                            style={{backgroundColor:"#404040",width:"100%",margin:7,alignSelf:"center",borderRadius:7}}>
                                <View style={{flexDirection:"row",}}>
                                    <View>
                                         <Image source={require("../../../assets/icons/27.jpg")} style={{width:150,height:120,margin:6,borderRadius:3}} />                                    
                                         {/* <Image source={`https://food.afroeats.fr/public/upload/products/${singleMAp.image}`} style={{width:150,height:120,margin:6,borderRadius:3}} />                                     */}
                                    </View>
                                    <View style={{margin:10,flexWrap:"wrap"}}>
                                        <Text style={{fontSize:12,fontWeight:"700",fontFamily:"Ariel",color:"#FFFFFF",margin:1,width:SCREEN_WIDTH/2.3}}>{singleMAp.pick_up_address}</Text>
                                        <Text style={{fontSize:10,fontWeight:"700",fontFamily:"Ariel",color:"#FFFFFF",margin:1,borderWidth:0,borderColor:"red",width:SCREEN_WIDTH/2.3}}>{singleMAp.delivery_address}</Text>
                                        <Text style={{fontSize:16,fontWeight:"700",fontFamily:"Ariel",color:"#FFFFFF",margin:15,paddingTop:24,alignSelf:"flex-end",}}> {singleMAp.total} €</Text>
                                    </View>
                                    </View>
                            </TouchableOpacity>
                        )
                    })
                }

            </View>


                :
                <View style={{flex:2,justifyContent:'center',alignItems:"center",marginTop:SCREEN_HEIGHT/3.5,}}>
                  <Text style={{alignSelf:"center",color:"#FFFFFF",textAlign:'center'}}>No Current Order Found</Text>
                </View>
              }

         
            </Fragment>           
           



          }
           




      </Fragment>
       


          :
          <View>
            <Text></Text>
          </View>
        }


        </ScrollView>
      

        <BottomNavigator
          currentRoute={'myorder'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

export default MyOrder;
