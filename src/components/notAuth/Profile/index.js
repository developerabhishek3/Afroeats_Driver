import React, {Component,Fragment} from 'react';
import {View,Text,Image,TouchableOpacity, ScrollView,Alert,BackHandler} from 'react-native';
import BottomNavigator from '../../../router/BottomNavigator'
import Styles from './indexCss';
import {getDriverProfile} from '../../../Api/afterAuth';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
        driverProfile:[],
        Alert_Visibility: false,
        isBodyLoaded: false,
        isSpinner: true,  
        profileImage:"",
        fullname:""

    }
}




    componentDidMount = async () => {      
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
  
      GetdriverProfileFunction = async () => {       
        const user_id = await AsyncStorage.getItem('user_id');
        const UserId = JSON.parse(user_id)    
        const getDriverProfileResponse = await getDriverProfile({driver_id:UserId});
        if (getDriverProfileResponse.result == true) {
          console.log('getting result here --------',getDriverProfileResponse.response,);
          if (getDriverProfileResponse.response.error == 'true') {
            Alert.alert('Message', getDriverProfileResponse.response.errorMessage);
            if(getDriverProfileResponse.response.errorMessage == "Incompatibilité de jetons"){
                Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
                AsyncStorage.clear()
                this.props.navigation.navigate("login")
              }
          } else {
            console.log('getting reponse here=================',getDriverProfileResponse.response,);  
            var driverProfile = getDriverProfileResponse.response.usersDetails
            let fullname =    getDriverProfileResponse.response.usersDetails.fullname
            let profileImage =    getDriverProfileResponse.response.usersDetails.image
            this.setState({driverProfile,isBodyLoaded:true,isSpinner:false,fullname,profileImage})         
          }
        } else {
          this.myAlert('Error', getDriverProfileResponse.response.errorMessage);
          console.log('getting error here-------------');
        }
        return;
      };



    render() {
        return(
            <View style={Styles.container}>
                <Image source={require("../../../assets/icons/logoTxt.png")} resizeMode="contain" style={{alignSelf:"center",height:27,width:'50%',margin:20}} />
                <Spinner visible={this.state.isSpinner} />
                <View style={{flex:1}}>
                {
                  this.state.isBodyLoaded == true ?
                  <Fragment>

<View style={{flexDirection:"row"}}>
                  {
                    this.state.profileImage != "" || this.state.profileImage != null || this.state.profileImage != undefined ?
                    <Image
                    source={{ uri: this.state.profileImage }} 
                    style={{height:50,width:50,margin:7,marginStart:16,borderRadius:40}} />
                  
                    :
                    <Image source={require("../../../assets/icons/1.png")} style={{height:50,width:50,margin:7}} />
                  }
                  
                   
                    <View style={{margin:20}}>
                        <Text style={{color:"#e8af04",fontSize:18,fontWeight:"700",fontFamily:"Ariel"}}>Mon Profil</Text>
                        <Text style={{color:"#cdcdcd",fontSize:12,fontWeight:"600",fontFamily:"Ariel"}}>{this.state.fullname}</Text>
                    </View>
                </View>

                <ScrollView>
                    <TouchableOpacity  onPress={()=>{this.props.navigation.navigate("myprofile")}} style={{flexDirection:"row",margin:4,paddingStart:4,alignItems:"center",marginStart:20}}>
                        <Image source={require("../../../assets/icons/user.png")} style={{height:21,width:21,margin:7}} />
                        <Text style={{color:"#cdcdcd",fontSize:14,fontWeight:"600",fontFamily:"Ariel",margin:15}}>Mon Profil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("mydocs")}} style={{flexDirection:"row",margin:4,paddingStart:4,alignItems:"center",marginStart:20}}>
                        <Image source={require("../../../assets/icons/qq.png")} style={{height:21,width:21,margin:7}} />
                        <Text style={{color:"#cdcdcd",fontSize:14,fontWeight:"600",fontFamily:"Ariel",margin:15}}>Mes documents</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("mycommision")}}  style={{flexDirection:"row",margin:4,paddingStart:4,alignItems:"center",marginStart:20}}>
                        <Image source={require("../../../assets/icons/qw.png")} style={{height:21,width:21,margin:7}} />
                        <Text style={{color:"#cdcdcd",fontSize:14,fontWeight:"600",fontFamily:"Ariel",margin:15}}>Mes gains de livraison</Text>
                    </TouchableOpacity>

                    
                    <TouchableOpacity  onPress={()=>{this.props.navigation.navigate("parameter")}} style={{flexDirection:"row",margin:4,paddingStart:4,alignItems:"center",marginStart:20}}>
                        <Image source={require("../../../assets/icons/setting.png")} style={{height:21,width:21,margin:7}} />
                        <Text style={{color:"#cdcdcd",fontSize:14,fontWeight:"600",fontFamily:"Ariel",margin:15}}>Parameter</Text>
                    </TouchableOpacity>

                    
                    <TouchableOpacity  onPress={()=>{this.props.navigation.navigate("questionanswer")}}  style={{flexDirection:"row",margin:4,paddingStart:4,alignItems:"center",marginStart:20}}>
                        <Image source={require("../../../assets/icons/qe.png")} style={{height:21,width:21,margin:7}} />
                        <Text style={{color:"#cdcdcd",fontSize:14,fontWeight:"600",fontFamily:"Ariel",margin:15}}>J'ai une question</Text>
                    </TouchableOpacity>


                    {/* <TouchableOpacity style={Styles.continueBtn}>
                        <Text style={Styles.continueBtnTxt}>Parameter vos amis et SE sur votre prochaire commande</Text>
                    </TouchableOpacity>


                    <Image source={require("../../../assets/icons/qr.png")} style={{height:40,width:40,margin:7,marginTop:-30,alignSelf:"flex-end"}} /> */}

                </ScrollView>

</Fragment>
                  :null

                }


                

                </View>
                <BottomNavigator
                    currentRoute={'profile'}
                    navigation={this.props.navigation}
                />
            </View>
        )
    }
}

export default Profile;