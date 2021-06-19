import React, {Component, Fragment} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView,Dimensions,BackHandler} from 'react-native';
import Styles from './indexCss';
import DatePicker from 'react-native-datepicker';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import calenderIcon from '../../../../assets/icons/191.png'
import AsyncStorage from '@react-native-community/async-storage'
import {driverearnings} from '../../../../Api/afterAuth'
import Spinner from 'react-native-loading-spinner-overlay';
class MyCommsion extends Component {
    constructor(props){
        super(props)
        this.state={
          orderData:[],
          isBodyLoaded: false,
          isSpinner:true,
            date:[
                {
                    "restro_name":"RESTAURANT AFRO",
                    "order_no":"#094547",
                    "address":"12 fevier 2019",
                    "amount":"32,45€"
                },
                {
                    "restro_name":"RESTAURANT AFRO",
                    "order_no":"#094547",
                    "address":"12 fevier 2019",
                    "amount":"32,45€"
                },
                {
                    "restro_name":"RESTAURANT AFRO",
                    "order_no":"#094547",
                    "address":"12 fevier 2019",
                    "amount":"32,45€"
                }
                
            ],
            from_date: new Date(),
            to_date: new Date(),
        }
    }




 

    driverearningsFunction = async () => {       
      const user_id = await AsyncStorage.getItem('user_id');
      const UserId = JSON.parse(user_id)    
      const driverearningsResponse = await driverearnings({driver_id:UserId});
      if (driverearningsResponse.result == true) {
      
        if (driverearningsResponse.response.error == 'true') {
          // console.log("getting here - i am abhishek - - -")
          this.setState({isBodyLoaded:true,isSpinner:false})         
          Alert.alert('Message', driverearningsResponse.response.errorMessage);
          if(driverearningsResponse.response.errorMessage == "Incompatibilité de jetons"){
              Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
              AsyncStorage.clear()
              this.props.navigation.navigate("login")
            }
        } else {
          let orderData = driverearningsResponse.response.orderInfo
          console.log('getting reponse here=================',driverearningsResponse.response.orderInfo,);          
          this.setState({isBodyLoaded:true,isSpinner:false,orderData})         
        }
      } else {
        this.myAlert('Error', driverearningsResponse.response.errorMessage);
        console.log('getting error here-------------');
      }
      return;
    };




    componentDidMount = async () => {  
      setTimeout(() => {
        this.driverearningsFunction()

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
    const { orderData} = this.state;
    return (
      <View style={Styles.container}>
        <View style={Styles.headerView}>
        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image
            source={require('../../../../assets/icons/2.png')}
            style={Styles.headerIMG}
          />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Mes gains de livraison</Text>
        </View>
        <Spinner visible={this.state.isSpinner} />
        {/* <View style={Styles.headerTopTxtView}>
          <TouchableOpacity>
            <Text style={Styles.headerTxt1}>de</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Text style={Styles.headerTxt1}>jusqu'a</Text>
          </TouchableOpacity>
        </View> */}
          {/* <View style={Styles.subhaderView}>
          <View style={{flexDirection: 'column'}}>
          <Text style={Styles.subheadingTxt}>de</Text>
          <View style={{backgroundColor:"#000000",height:40,width:130,margin:4,marginRight:10}}>
              
              <DatePicker
                style={{width: SCREEN_WIDTH*0.40,borderWidth:0}}
                date={this.state.from_date}
                placeholder="Date of Birth"                    
                format="DD-MM-YYYY"   
                hideText={false}                
              // maxDate={this.state.date}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={calenderIcon}
                
                customStyles={{
                  dateIcon: {
                    left:-20,
                    height:18,width:18,
                  },
                  dateInput: {
                    marginLeft: 0,
                    color:"#FFFFFF",
                    borderColor: 'red',
                    borderWidth: 0,
                    marginRight: 0,
                  },          
                }}
                onDateChange={(from_date) => {
                  this.setState({from_date});
                }}
              />
              </View>          
            
          </View>





        </View> */}
        <ScrollView>
          { this.state.isBodyLoaded == true ?


<View style={Styles.contentView}>
{
    this.state.orderData.map((singleMAp)=>{
        return(
            
            <View              
            style={{backgroundColor:"#404040",width:"100%",margin:7,alignSelf:"center",borderRadius:7}}>
                
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        
                  
                    <View style={{margin:10}}>
                        <Text style={{fontSize:15,fontWeight:"700",fontFamily:"Ariel",color:"#FFFFFF",margin:1}}>Numéro d'ordre : {singleMAp.order_id}</Text>
                        <Text style={{fontSize:12,fontWeight:"700",fontFamily:"Ariel",color:"#FFFFFF",margin:1}}>Nom du client :  {singleMAp.fullname}</Text>
                        <Text style={{fontSize:12,fontWeight:"700",fontFamily:"Ariel",color:"#FFFFFF",margin:1}}>Heure/Date d'arrivée : {singleMAp.delivered_time}</Text>                                            
                        {/* <Text style={{fontSize:17,fontWeight:"700",fontFamily:"Ariel",color:"#FFFFFF",margin:15,paddingTop:24,alignSelf:"flex-end",}}> {singleMAp.amount}</Text> */}
                    </View>


                    <View style={{margin:10,borderWidth:1,borderColor:"#ffffff",borderRadius:7,alignSelf:"center"}}>
                        <Text style={{fontSize:15,margin:1,fontWeight:"700",fontFamily:"Ariel",color:"#FFFFFF",margin:4}}>{singleMAp.payment} €</Text>                                           
                    </View>
                    </View>
                   
            </View>
        )
    })
}
</View>


            :<View>
              <Text></Text>
            </View>
          
          
          }
           
        </ScrollView>    
      </View>
    );
  }
}

export default MyCommsion;
