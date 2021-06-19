import React,{Component,Fragment} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView,TextInput,Dimensions,BackHandler,Alert,KeyboardAvoidingView} from 'react-native';

import Styles from './indexCss';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import AsyncStorage from '@react-native-community/async-storage';
import {getOrderchat,orderchat} from '../../../../Api/afterAuth';
import Spinner from 'react-native-loading-spinner-overlay';
class ChatScreen extends Component {
    constructor(props){
        super(props)
        this.state={
          Model_Visibility: false,
          Alert_Visibility: false,
          Model_Visibility1: false,
          Alert_Visibility1: false,
          chatData:[],
          isBodyLoaded: false,
          isSpinner: true,  
          message:""
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
  













    mychatDataFunction = async () => {       
      const user_id = await AsyncStorage.getItem('user_id');
      const UserId = JSON.parse(user_id) 
      let orderId = this.props.navigation.getParam("orderId") 
      console.log("inside the funciton order id getting - -  - - - - -",orderId)  
      const getChatDataResponse = await getOrderchat({order_id:orderId});
      if (getChatDataResponse.result == true) {      
        if (getChatDataResponse.response.error == 'true') {
          this.setState({isSpinner:false,isBodyLoaded:true})         
          // Alert.alert('Message', getChatDataResponse.response.errorMessage);
          // console.log("inside the funciton order id getting - -  - - - - -",getChatDataResponse.response) 
          if(getChatDataResponse.response.errorMessage == "Token mismatch"){
              Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
              AsyncStorage.clear()
              this.props.navigation.navigate("login")
            }
        } else {
          // console.log('getting reponse here=================',getChatDataResponse.response,);  
          var chatData = getChatDataResponse.response.DriverOrderChat
          // console.log('getting result here for chatData order --------',chatData);         
          this.setState({chatData,isSpinner:false,isBodyLoaded:true})         
        }
      } else {
        this.myAlert('Error', getChatDataResponse.response.errorMessage);
        console.log('getting error here-------------');
      }
      return;
    };


  


    
    postChatDataFunction(){   
      
      this.setState({ isSpinner: true }, async () => {  

        const user_id = await AsyncStorage.getItem('user_id');
        const UserId = JSON.parse(user_id) 
        let orderId = this.props.navigation.getParam("orderId") 
        // let sender_id = this.props.navigation.getParam("driver_id")
        console.log("inside the funciton order id getting - -  - - - - -",orderId)  
        const postOrderResponse = await orderchat({
                order_id:orderId,
                sender_id:UserId,
                message_by:2,
                message:this.state.message
            });
        if (postOrderResponse.result == true) { 
          this.setState({
            isSpinner:false
          });      
          if (postOrderResponse.response.error == 'true') {
            Alert.alert('Message', postOrderResponse.response.errorMessage);
            if(postOrderResponse.response.errorMessage == "Token mismatch"){
                Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
                AsyncStorage.clear()
                this.props.navigation.navigate("login")
                this.setState({
                  isSpinner:false
                }); 
              }
          } else {
            // console.log('getting reponse here=================',postOrderResponse.response,);  
                this.mychatDataFunction()  
                 this.setState({message:"",  isSpinner:false})      
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
  

    validateFunction(){
        if(this.state.message.length == 0){
          Alert.alert("Message","Veuillez ajouter un message!")
        }
        else{
          this.postChatDataFunction()
        }
      }
    














  
    componentDidMount = async () => {      
    
      setInterval(() => {
          this.mychatDataFunction()
      }, 2000);


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

    const {chatData}  = this.state;
    console.log("getting order details herev- -  -  - -  -",chatData)

    return (
      <View style={Styles.container}>
        <View style={Styles.headerView}>
        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image
            source={require('../../../../assets/icons/2.png')}
            style={Styles.headerIMG}
          />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Chat</Text>          
          <Text style={Styles.headerTxt}>         </Text>      
        </View>
        <Spinner visible={this.state.isSpinner} 
        />
        <KeyboardAvoidingView
                style={{ flex: 1 }}
                behaviour="padding"
                keyboardVerticalOffset={10}
                enabled
            >
       <View style={{margin:1,borderWidth:0,borderColor:"#DDDDDD",flex:2}}>
      {
        this.state.isBodyLoaded == true ?
        <Fragment>
         {
           this.state.chatData.length > 0 ?
         
           <ScrollView ref="scrollView"           
           onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})} >
        {
          this.state.chatData.map((singleMap)=>{
            // console.log("getting -------------------",singleMap)
            return(
              <Fragment>
                <View style={{margin:1,borderWidth:0}}>
                  {
                    singleMap.message_by == 1 ?
                    <View style={{backgroundColor:'#5d4e3b',alignSelf:'flex-start',borderRadius:10,margin:4,flexDirection:'row',marginEnd:70}}>
                      <Image  source={{
              uri:singleMap.image ,
            }}  style={{height:40,width:40,marginStart:-5,borderRadius:30,}} />
                      <View style={{flexDirection:"column"}}>
                       <Text style={{borderRadius:1,color:"#cecac6",fontWeight:"700",marginStart:10,marginEnd:50,margin:4,fontSize:16}}>{singleMap.message}</Text>
                       <Text style={{fontSize:9,marginStart:13,marginEnd:13,margin:1,color:"#cecac6",fontWeight:"100"}}>{singleMap.time}</Text>
                       </View>
                    </View>
                    :
                    <View style={{backgroundColor:'#3c3c3d',alignSelf:'flex-end',borderRadius:10,margin:4,flexDirection:'row',marginStart:70}}>
                        <Image  source={{
              uri:singleMap.image ,
            }}  style={{height:40,width:40,marginStart:-5,borderRadius:30,}} />
                    <View style={{flexDirection:"column"}}>
                       <Text style={{borderRadius:1,color:"#e0e0e0",fontWeight:"700",marginStart:10,marginEnd:50,margin:4,fontSize:16}}>{singleMap.message}</Text>
                       <Text style={{fontSize:9,marginStart:13,marginEnd:13,margin:1,color:"#cecac6",fontWeight:"100"}}>{singleMap.time}</Text>
                       </View>
                    </View>
                  }                
                </View>
              </Fragment>
            )
          })
        }
    </ScrollView>
    :<View style={{alignItems:'center',justifyContent:'center',marginTop:200}}>
    <Text style={{fontSize:18,fontWeight:'700',textAlign:'center'}}></Text>
  </View>
}
        </Fragment>          
        :<View>
        <Text></Text>
    </View>
      }        
    </View>

        

   

                <View style={Styles.bottomView}>
                <View style={{borderWidth:0,flexDirection:'row',}}>

                <TextInput
                  value={this.state.message}
                  onChangeText={(message) => this.setState({message})}
                style={{width:'80%',borderWidth:0,borderRadius:20,marginStart:10,color:"#cecac6"}}
                placeholderTextColor="#cecac6"
                placeholder="Entrez votre message" />
                <TouchableOpacity
                     onPress={()=>{this.validateFunction()}}
                >
                  {
                    this.state.message != "" ?
                    <Image source={require("../../../../assets/icons/send1.png")} style={{height:25,width:25,marginEnd:0,margin:6,alignSelf:'flex-end'}} />
                    : null
                  }
                  
                </TouchableOpacity>
                </View>
                </View>
        </KeyboardAvoidingView>




     
      </View>
    );
  }
}

export default ChatScreen;
