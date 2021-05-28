import React, {Component,Fragment} from 'react';
import {View,Text,Image,TouchableOpacity,Alert, ScrollView,TextInput,Switch,Modal,TouchableHighlight,Dimensions,BackHandler} from 'react-native';
// import BottomNavigator from '../../../router/BottomNavigator'
import Styles from './indexCss';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import {dchangePassword} from '../../../../Api/afterAuth'
import AsyncStorage from '@react-native-community/async-storage';
class ChangePassword extends Component {
    constructor(props){
        super(props)
        this.state={
            isEnabled:false,
            Model_Visibility: false,
            Alert_Visibility: false,
            old_password:"",
            new_password:"",
            confirm_password:"",
            showPassword1: true,
            showPassword2:true,
            showPassword3:true,   
        }
        this.toggleSwitch3 = this.toggleSwitch3.bind(this);  
        this.toggleSwitch1 = this.toggleSwitch1.bind(this);
        this.toggleSwitch2 = this.toggleSwitch2.bind(this); 
    }
   



    Show_Custom_Alert(visible) {
        this.setState({Alert_Visibility: visible, });
    
      }
      Hide_Custom_Alert() {
        this.setState({Alert_Visibility: false});
        
      }
    

      toggleSwitch1() {
        this.setState({ showPassword1: !this.state.showPassword1 });
      }
    
      
      toggleSwitch2() {
        this.setState({ showPassword2: !this.state.showPassword2 });
      }
  toggleSwitch3() {
    this.setState({ showPassword3: !this.state.showPassword3 });
  }




   async toggleSwitch(){
        this.setState({isEnabled:!this.state.isEnabled})
    }



  
    userLoginFunction = async () => {
      const user_id = await AsyncStorage.getItem('user_id');

        const UserId = JSON.parse(user_id)  
      const { old_password, new_password} = this.state;
      const dchangePasswordResponse = await dchangePassword({
        driver_id:UserId,
        old_password,
        new_password,
      });
      if (dchangePasswordResponse.result == true) {
        console.log(
          'getting result here --------',
          dchangePasswordResponse.response,
        );
        if (dchangePasswordResponse.response.error == 'true') {
          Alert.alert('Message', dchangePasswordResponse.response.errorMessage);
        } else {
          ALert,alert("Message","Password Update Successfully !")
          this.props.navigation.navigate("home")
          console.log(
            'getting reponse here=================',
            dchangePasswordResponse.response,
          );   

        }
      } else {
        this.myAlert('Error', dchangePasswordResponse.response.errorMessage);
        console.log('getting error here-------------');
      }
      return;
    };
  
    myAlert = (title = '', message = '') => {
      Alert.alert(title, message);
    };
  
    validateUser = () => {
      const {old_password, new_password,confirm_password} = this.state;
  
      if (old_password.length === 0) {
        this.myAlert('Message', 'Veuillez entrer votre old password!');
      } else if (new_password.length === 0) {
        this.myAlert('Message', 'Veuillez entrer votre new password!');
      }else if (confirm_password.length === 0) {
        this.myAlert('Message', 'Veuillez entrer votre confirm password!');
      }  else {       
        this.userLoginFunction();
      }
    };








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








    render() {

    
        return(
            <View style={Styles.container}>
                <View style={Styles.headerView}>
                     <View style={{flexDirection:"row"}}>
                     <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                      <Image
                        source={require('../../../../assets/icons/2.png')}
                        style={Styles.headerIMG}
                      />
                      </TouchableOpacity>
                        <Text style={Styles.headerTxt}>Changer de mot de passe</Text>
                    </View>
                </View>
                <ScrollView>

                    <View>
                        {/* <TextInput
                            value={this.state.old_password}
                            onChangeText={(old_password)=>this.setState({old_password})}
                            placeholder="Ancien Mot De Passe"
                            placeholderTextColor="#FFFFFF"
                            style={{padding:7,margin:10,fontSize:12,fontWeight:"700",fontFamily:"Ariel",paddingStart:15,color:"#FFFFFF",backgroundColor:"#404040",borderColor:"#FFFFFF",borderWidth:1,width:"85%",borderRadius:7,alignItems:"center",alignSelf:"center"}}
                        /> */}




                        

                <View  style={{height:45,padding:7,margin:10,fontSize:12,flexDirection:"row",justifyContent:"space-between",backgroundColor:"#404040",borderColor:"#FFFFFF",borderWidth:1,width:"85%",borderRadius:7,alignItems:"center",alignSelf:"center"}}>
                  <TextInput
                    style={{color:"#FFFFFF",padding:6,fontWeight:"700",fontFamily:"Ariel",paddingStart:10,width:"80%",borderWidth:0,borderColor:"red",color:"#FFFFFF",}}
                    value={this.state.old_password}
                    onChangeText={(old_password)=>this.setState({old_password})}
                    placeholder="Ancien Mot De Passe"
                    placeholderTextColor="#FFFFFF"
                    secureTextEntry={this.state.showPassword1 && this.state.old_password.length > 0 ? true:false}                    
                  />
                   <TouchableOpacity  
                      onPress={this.toggleSwitch1}            
                      value={!this.state.showPassword1}>
                        {
                          this.state.showPassword1 == true ?
                          <Image  source={require('../../../../assets/icons/PwdShow.png')} style={{width: 30, height: 30,marginTop:10,margin:6}} />
                        
                          :
                          <Image  source={require('../../../../assets/icons/invisible.png')} style={{width: 30, height: 30,marginTop:10,margin:6}} />
                        }                 
                 </TouchableOpacity>
                      </View>
                    </View>
                  

                    <View>
                        {/* <TextInput
                            value={this.state.new_password}
                            onChangeText={(new_password)=>this.setState({new_password})}
                            placeholder="Nouveau Mot de Passe"
                            placeholderTextColor="#FFFFFF"
                            style={{padding:7,margin:10,fontSize:12,fontWeight:"700",fontFamily:"Ariel",paddingStart:15,color:"#FFFFFF",backgroundColor:"#404040",borderColor:"#FFFFFF",borderWidth:1,width:"85%",borderRadius:7,alignItems:"center",alignSelf:"center"}}
                        /> */}



                        
<View  style={{height:45,padding:7,margin:10,fontSize:12,flexDirection:"row",justifyContent:"space-between",backgroundColor:"#404040",borderColor:"#FFFFFF",borderWidth:1,width:"85%",borderRadius:7,alignItems:"center",alignSelf:"center"}}>
                  <TextInput
                   style={{color:"#FFFFFF",padding:6,fontWeight:"700",fontFamily:"Ariel",paddingStart:10,width:"80%",borderWidth:0,borderColor:"red",color:"#FFFFFF",}}
                    value={this.state.new_password}
                    onChangeText={(new_password)=>this.setState({new_password})}
                    placeholder="Nouveau Mot de Passe"
                    placeholderTextColor="#FFFFFF"
                    secureTextEntry={this.state.showPassword2 && this.state.new_password.length > 0 ? true:false}                   
                  />
                   <TouchableOpacity  
                      onPress={this.toggleSwitch2}            
                      value={!this.state.showPassword2}>
                        {
                          this.state.showPassword2 == true ?
                          <Image  source={require('../../../../assets/icons/PwdShow.png')} style={{width: 30, height: 30,marginTop:10,margin:6}} />
                        
                          :
                          <Image  source={require('../../../../assets/icons/invisible.png')} style={{width: 30, height: 30,marginTop:10,margin:6}} />
                        }                 
                 </TouchableOpacity>
                      </View>









                   
                    </View>
                  



                    <View>
                        {/* <TextInput
                            value={this.state.confirm_password}
                            onChangeText={(confirm_password)=>this.setState({confirm_password})}
                            placeholder="Confirm Le Mot De Passe"
                            placeholderTextColor="#FFFFFF"
                            style={{padding:7,margin:10,fontSize:12,fontWeight:"700",fontFamily:"Ariel",paddingStart:15,color:"#FFFFFF",backgroundColor:"#404040",borderColor:"#FFFFFF",borderWidth:1,width:"85%",borderRadius:7,alignItems:"center",alignSelf:"center"}}
                        /> */}



<View  style={{height:45,padding:7,margin:10,fontSize:12,flexDirection:"row",justifyContent:"space-between",backgroundColor:"#404040",borderColor:"#FFFFFF",borderWidth:1,width:"85%",borderRadius:7,alignItems:"center",alignSelf:"center"}}>
                  <TextInput
                    style={{color:"#FFFFFF",padding:6,fontWeight:"700",fontFamily:"Ariel",paddingStart:10,width:"80%",borderWidth:0,borderColor:"red",color:"#FFFFFF",}}
                    placeholderTextColor="#FFFFFF"
                    value={this.state.confirm_password}
                    onChangeText={(confirm_password) => this.setState({ confirm_password })}
                    secureTextEntry={this.state.showPassword3 && this.state.confirm_password.length > 0 ? true:false}
                    placeholder="Confirmer le mot de passe" 
                  />
                   <TouchableOpacity  
                      onPress={this.toggleSwitch3}            
                      value={!this.state.showPassword3}>
                        {
                          this.state.showPassword3 == true ?
                          <Image  source={require('../../../../assets/icons/PwdShow.png')} style={{width: 30, height: 30,marginTop:10,margin:6}} />
                        
                          :
                          <Image  source={require('../../../../assets/icons/invisible.png')} style={{width: 30, height: 30,marginTop:10,margin:6}} />
                        }                 
                 </TouchableOpacity>
                      </View>
                    </View>
                  
                    {/* <TouchableOpacity 
                        onPress={()=>{this.props.navigation.navigate("ChangePassword")}}
                        style={{flexDirection:"row",margin:4,paddingStart:4,alignItems:"center"}}>
                        <Image source={require("../../../assets/icons/15.png")} style={{height:30,width:30,margin:7}} />
                        <Text style={{color:"#cdcdcd",fontSize:14,fontWeight:"700",fontFamily:"Ariel",margin:15}}>Mon Profile</Text>
                    </TouchableOpacity> */}

                    
                    <TouchableOpacity 
                          // onPress={()=>{this.props.navigation.navigate("profile")}} 
                          onPress={()=>{this.validateUser()}}
                          style={Styles.continueBtn}>
                            <Text style={Styles.continueBtnTxt}>Changer</Text>
                    </TouchableOpacity>

                </ScrollView>





            

                   
                {/* <BottomNavigator
                    currentRoute={'profile'}
                    navigation={this.props.navigation}
                /> */}
            </View>
        )
    }
}

export default ChangePassword;