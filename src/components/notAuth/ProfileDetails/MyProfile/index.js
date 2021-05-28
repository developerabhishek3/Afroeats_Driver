import React, {Component,Fragment} from 'react';
import {View,Text,Image,TouchableOpacity, ScrollView,Alert,BackHandler,} from 'react-native';
// import BottomNavigator from '../../../router/BottomNavigator'
import Styles from './indexCss';
import {getDriverProfile} from '../../../../Api/afterAuth';
import AsyncStorage from '@react-native-community/async-storage'
import Spinner from 'react-native-loading-spinner-overlay';
class MyProfile extends Component {

    constructor(props){
        super(props)
        this.state={
            driverProfile:[],
            
            isBodyLoaded: false,
            isSpinner: true,  
  
        }
    }






    GetdriverProfileFunction = async () => {       
        const user_id = await AsyncStorage.getItem('user_id');
        const UserId = JSON.parse(user_id)    
        const getDriverProfileResponse = await getDriverProfile({driver_id:UserId});
        if (getDriverProfileResponse.result == true) {
          console.log('getting result here --------',getDriverProfileResponse.response,);
          if (getDriverProfileResponse.response.error == 'true') {
            Alert.alert('Message', getDriverProfileResponse.response.errorMessage);
            if(getDriverProfileResponse.response.errorMessage == "Token mismatch"){
                Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
                AsyncStorage.clear()
                this.props.navigation.navigate("login")
              }
          } else {
            console.log('getting reponse here=================',getDriverProfileResponse.response,);  
            var driverProfile = getDriverProfileResponse.response.usersDetails     
            this.setState({driverProfile,isBodyLoaded:true,isSpinner:false})         
          }
        } else {
          this.myAlert('Error', getDriverProfileResponse.response.errorMessage);
          console.log('getting error here-------------');
        }
        return;
      };


    





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
    render() {
        const {driverProfile} = this.state;
        console.log("getting inside the render method  -  - -      - -  -  -",driverProfile)
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
                        <Text style={Styles.headerTxt}>Mes Profile</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("editprofile")}}>
                    <Image
                        source={require('../../../../assets/icons/edit.png')}
                        style={Styles.headerIMG1}
                    />
                    </TouchableOpacity>
                </View>
                <Spinner visible={this.state.isSpinner} />
                <ScrollView>
                {
                  this.state.isBodyLoaded == true ?
                  <Fragment>




              <TouchableOpacity>
                    <Image
                        source={require('../../../../assets/icons/food.png')}
                        style={{height:180,width:'100%'}}
                    />

                </TouchableOpacity>

              
                    <View style={{marginTop:-40}}>
                        <Image
                            source={require('../../../../assets/icons/13.png')}
                            style={{height:80,width:80,alignSelf:"center"}}
                        />
                    </View>
                    <Text style={{color:"#ce9617",fontSize:15,fontFamily:"Ariel",margin:3,fontWeight:"700",alignSelf:"center"}}>Clark Smith</Text>

                    <View style={{margin:16,marginStart:15}}>
                        <Text style={{color:"#ce9617",fontSize:10,fontFamily:"Ariel",margin:3,fontWeight:"600"}}>Nom</Text>
                        <Text style={{color:"#f1f1f1",fontSize:12,fontFamily:"Ariel",margin:4,fontWeight:"600"}}>{driverProfile.fullname}  </Text>
                    </View>


                    <View style={{margin:16,marginStart:15}}>
                        <Text style={{color:"#ce9617",fontSize:10,fontFamily:"Ariel",margin:3,fontWeight:"600"}}>Telephone</Text>
                        <Text style={{color:"#f1f1f1",fontSize:12,fontFamily:"Ariel",margin:4,fontWeight:"600"}}>{driverProfile.mobile}</Text>
                    </View>



                    <View style={{margin:16,marginStart:15}}>
                        <Text style={{color:"#ce9617",fontSize:10,fontFamily:"Ariel",margin:3,fontWeight:"600"}}>Email</Text>
                        <Text style={{color:"#f1f1f1",fontSize:12,fontFamily:"Ariel",margin:4,fontWeight:"600"}}>{driverProfile.email}</Text>
                    </View>



                    <View style={{margin:16,marginStart:15}}>
                        <Text style={{color:"#ce9617",fontSize:10,fontFamily:"Ariel",margin:3,fontWeight:"600"}}>Pays</Text>
                        <Text style={{color:"#f1f1f1",fontSize:12,fontFamily:"Ariel",margin:4,fontWeight:"600"}}>{driverProfile.default_lang}</Text>
                    </View>








                </Fragment>





                  :
                  <View>
                    <Text></Text>
                  </View>
                }



                    {/* <TouchableOpacity 
                        onPress={()=>{this.props.navigation.navigate("myprofile")}}
                        style={{flexDirection:"row",margin:4,paddingStart:4,alignItems:"center"}}>
                        <Image source={require("../../../assets/icons/15.png")} style={{height:30,width:30,margin:7}} />
                        <Text style={{color:"#cdcdcd",fontSize:14,fontWeight:"700",fontFamily:"Ariel",margin:15}}>Mon Profile</Text>
                    </TouchableOpacity> */}

                    

                </ScrollView>

                {/* <BottomNavigator
                    currentRoute={'profile'}
                    navigation={this.props.navigation}
                /> */}
            </View>
        )
    }
}

export default MyProfile;