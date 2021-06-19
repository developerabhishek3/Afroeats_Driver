import React, {Component,Fragment} from 'react';
import {View,Text,Image,TouchableOpacity, ScrollView,TextInput,Alert,BackHandler,} from 'react-native';
// import BottomNavigator from '../../../router/BottomNavigator'
import Styles from './indexCss';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {getDriverProfile} from '../../../../Api/afterAuth'
class EditProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            nom:"",
            nom_de_famille:"",
            last_name:"",
            courriel:"",
            n_de_rau:"",
            rau:"",
            postcode:"",
            telephone:"",
            filePath:"",
            path:"",
            password:"",
            isBodyLoaded:false,
            isSpinner:true,
            imgsource:"",
            driverProfile:[]
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
          let  courriel = getDriverProfileResponse.response.usersDetails.email 
          let nom = getDriverProfileResponse.response.usersDetails.fullname 
          let path = getDriverProfileResponse.response.usersDetails.image
          let nom_de_famille = getDriverProfileResponse.response.usersDetails.last_name;           
        
          let n_de_rau = getDriverProfileResponse.response.usersDetails.street_number
         let  rau = getDriverProfileResponse.response.usersDetails.street 
         let postcode = getDriverProfileResponse.response.usersDetails.postal_code
          let telephone = getDriverProfileResponse.response.usersDetails.mobile    
          this.setState({driverProfile,isBodyLoaded:true,isSpinner:false,n_de_rau,courriel,nom,path,nom_de_famille,rau,postcode,telephone})         
        }
      } else {
        this.myAlert('Error', getDriverProfileResponse.response.errorMessage);
        console.log('getting error here-------------');
      }
      return;
    };




    uploadWholeData(){


        this.setState({ isSpinner: true }, async () => { 
            
          console.log("inside the function calling for upload form data------------------------------")
          const token = await AsyncStorage.getItem('token');
          const user_id = await AsyncStorage.getItem('user_id');        
          const TokenValue = JSON.parse(token);
          // const UserId = JSON.parse(user_id);
          // console.log("USER ID ::::::::"+typeof JSON.stringify(UserId), "USER ID _ _ _ _ __"+ typeof (UserId))

        


          console.log("getting TOKEN : : : :",TokenValue + "nom_de_famille : : : : ::  : :" +this.state.nom_de_famille+"FILE PATH : :  : : :",this.state.imgsource + "NAME"+this.state.nom)
          

          const URL = `https://food.afroeats.fr/api/EditDriverProfile`
          let headers = {
            "Content-Type": "multipart/form-data",
            "user-id":user_id,
            "token" : `${TokenValue}`,
            };
          
            RNFetchBlob.fetch("POST",URL,headers,[                                 
              { name: 'first_name', data: this.state.nom },
              { name: 'email', data: this.state.courriel },
              { name: 'telephone', data: this.state.telephone },               
              { name: 'last_name', data: this.state.nom_de_famille },                                                   
              { name: 'street_number', data: this.state.n_de_rau },
              { name: 'street', data: this.state.rau },
              { name: 'postal_code', data: this.state.postcode }, 
              { name: 'driver_id', data:user_id },                         
              { name: 'image', filename: 'photo.jpg', type: 'image/png', data: RNFetchBlob.wrap(this.state.imgsource) },               
               
              ]).then((resp) => {  
                Alert.alert(resp.json().errorMessage)        
                this.setState({
                  isSpinner:false
                }); 
            console.log("response:::::::" + JSON.stringify(resp.text()));
            
            if(resp.json().error === "false"){
              Alert.alert("Message","Mise à jour du profil réussie")  
              this.GetdriverProfileFunction()          
              this.props.navigation.navigate("home")   
            this.setState({
              isSpinner:false
            });  
            }else if(resp.json().error=== "true"){
                Alert.alert(resp.json().errorMessage)           
            this.setState({
              isSpinner:false
            });      
            }
            }).catch((err) => {
            this.setState({
              isSpinner:false
            });
            console.log("response::::err:::" + err);
            });
        })
        }

        



        myAlert = (title = '', message = '') => {
            Alert.alert(title, message);
          };
        

        validateUser = async () => {         
            const {      
                nom,  
                nom_de_famille,            
                courriel,
                n_de_rau,
                rau,
                postcode,
                telephone,
                password
            } = this.state;
             if (nom.length === 0) {            
              this.myAlert('Message', 'Veuillez saisir votre nom!');
            } 
            else if (nom_de_famille.length === 0) {
             
              this.myAlert('Message', 'Veuillez entrer votre Nom de famille!');
            }
            else if (courriel.length === 0) {
             
              this.myAlert('Message', 'Veuillez entrer votre courriel!');
            }
            else if (n_de_rau.length === 0) {          
              this.myAlert('Message', 'Veuillez entrer votre N de Rau!');
            }            
            else if (rau.length === 0) {              
              this.myAlert('Message', 'Veuillez entrer votre Rau!');
            } else if (postcode.length === 0) {              
              this.myAlert('Message', 'Veuillez entrer votre Code postal!');
            } 
             else if (telephone.length === 0) {            
              this.myAlert('Message', 'Veuillez saisir votre numéro de téléphone!');
            }            
            else {
           
              const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              if (!courriel.match(mailformat)) {
                this.myAlert('Message', 'Email-id invalide');
                return false;
              }  
              this.uploadWholeData();
            }
          };
        
         



    

  chooseFile = () => {
    var options = {
      title: 'Choisir une photo',     
      storageOptions: {
        skipBackup: false,
        path: 'images',
      },
    };
    // let options = {
    //   title: 'Choisir une photo',
    //   maxWidth: 256,
    //   maxHeight: 256,
    //   storageOptions: {
    //     skipBackup: true
    //   }
    // };
    ImagePicker.launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response.data;
        let path = response.uri
        // console.log("Getting source response here"+source)
        setTimeout(() => {
            this.setState({
                filePath: source,
                path:path,
                imgsource:response.uri          
              });
        }, 1000);
       
      }
    });
  };

    render() {
      const {driverProfile} = this.state;
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
                        <Text style={Styles.headerTxt}>Editer le Profil</Text>
                    </View>

                 
                </View>
                <Spinner visible={this.state.isSpinner}/>   
                { 

                  this.state.isBodyLoaded == true ?






                  <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} showsVerticalScrollIndicator={false}>
                  <ScrollView>
                  <TouchableOpacity>
  
                <Image
                          source={require('../../../../assets/icons/food.png')}
                          style={{height:180,width:'100%'}}
                      />
  
                  </TouchableOpacity>
             
  
                
                      <View >
                   
              {
               this.state.path == "" ?
               <View style={{marginTop: -60}}>
                <Image
                               source={{ uri: this.state.profileImage }} 
                              style={{height:80,width:80,alignSelf:"center"}}
                          />
             </View>
            :
               <View style={{marginTop: -60}}>
               <Image  source={{ uri: this.state.path }}  style={{height:80,width:80,alignSelf:"center",borderRadius:60}} />
             </View>
             }
                     
  
                          <TouchableOpacity onPress={this.chooseFile.bind(this)} style={{height:30,width:30,alignSelf:'center'}}>
                              <Image   source={require('../../../../assets/icons/edit.png')} style={{height:30,width:30,margin:-15,alignSelf:'center'}} />
                          </TouchableOpacity>
  
  
                          <Text style={{color:"#ce9617",fontSize:16,fontFamily:"Ariel",marginTop:-10,fontWeight:"700",alignSelf:"center"}}>{this.state.nom}</Text>
                      </View>
  
                      {/* <View style={{margin:16,marginStart:15}}>
                          <Text style={{color:"#ce9617",fontSize:10,fontFamily:"Ariel",margin:3,fontWeight:"700"}}>Nom</Text>
                          <Text style={{color:"#f1f1f1",fontSize:12,fontFamily:"Ariel",margin:4,fontWeight:"700"}}>John Smith</Text>
                      </View> */}
  
                      <View>
                          <TextInput
                              value={this.state.nom}
                              onChangeText={(nom)=>this.setState({nom})}
                              placeholder="Nom"
                              placeholderTextColor="#FFFFFF"
                              style={{padding:7,margin:10,fontSize:12,fontWeight:"700",fontFamily:"Ariel",paddingStart:15,color:"#FFFFFF",backgroundColor:"#404040",borderColor:"#FFFFFF",borderWidth:1,width:"85%",borderRadius:7,alignItems:"center",alignSelf:"center"}}
                          ></TextInput>
                      </View>
  
                      
                      {/* <View>
                          <TextInput
                              value={this.state.nom_de_famille}
                              onChangeText={(nom_de_famille)=>this.setState({nom_de_famille})}
                              placeholder="Nom de famille"
                              placeholderTextColor="#FFFFFF"
                              style={{padding:7,margin:10,fontSize:12,fontWeight:"700",fontFamily:"Ariel",paddingStart:15,color:"#FFFFFF",backgroundColor:"#404040",borderColor:"#FFFFFF",borderWidth:1,width:"85%",borderRadius:7,alignItems:"center",alignSelf:"center"}}
                          >
  
                          </TextInput>
                      </View> */}
  
  
                      <View>
                          <TextInput
                              value={this.state.courriel}
                              onChangeText={(courriel)=>this.setState({courriel})}
                              placeholder="Courriel"
                              placeholderTextColor="#FFFFFF"
                              style={{padding:7,margin:10,fontSize:12,fontWeight:"700",fontFamily:"Ariel",paddingStart:15,color:"#FFFFFF",backgroundColor:"#404040",borderColor:"#FFFFFF",borderWidth:1,width:"85%",borderRadius:7,alignItems:"center",alignSelf:"center"}}
                          ></TextInput>
                      </View>
  
  
                      <View>
                          <TextInput
                              value={this.state.n_de_rau}
                              onChangeText={(n_de_rau)=>this.setState({n_de_rau})}
                              placeholder="N De Rau"
                              keyboardType="numeric"
                              placeholderTextColor="#FFFFFF"
                              style={{padding:7,margin:10,fontSize:12,fontWeight:"700",fontFamily:"Ariel",paddingStart:15,color:"#FFFFFF",backgroundColor:"#404040",borderColor:"#FFFFFF",borderWidth:1,width:"85%",borderRadius:7,alignItems:"center",alignSelf:"center"}}
                          ></TextInput>
                      </View>
  
                      <View>
                          <TextInput
                              value={this.state.rau}
                              onChangeText={(rau)=>this.setState({rau})}
                              placeholder="Rue"
                              placeholderTextColor="#FFFFFF"
                              style={{padding:7,margin:10,fontSize:12,fontWeight:"700",fontFamily:"Ariel",paddingStart:15,color:"#FFFFFF",backgroundColor:"#404040",borderColor:"#FFFFFF",borderWidth:1,width:"85%",borderRadius:7,alignItems:"center",alignSelf:"center"}}
                          ></TextInput>
                      </View>
  
  
                      <View>
                          <TextInput
                              value={this.state.postcode}
                              onChangeText={(postcode)=>this.setState({postcode})}
                              placeholder="Code postal"
                              keyboardType="numeric"
                              placeholderTextColor="#FFFFFF"
                              style={{padding:7,margin:10,fontSize:12,fontWeight:"700",fontFamily:"Ariel",paddingStart:15,color:"#FFFFFF",backgroundColor:"#404040",borderColor:"#FFFFFF",borderWidth:1,width:"85%",borderRadius:7,alignItems:"center",alignSelf:"center"}}
                          ></TextInput>
                      </View>
  
                      <View>
                          <TextInput
                              value={this.state.telephone}
                              onChangeText={(telephone)=>this.setState({telephone})}
                              placeholder="Telephone"
                              keyboardType="numeric"
                              placeholderTextColor="#FFFFFF"
                              style={{padding:7,margin:10,fontSize:12,fontWeight:"700",fontFamily:"Ariel",paddingStart:15,color:"#FFFFFF",backgroundColor:"#404040",borderColor:"#FFFFFF",borderWidth:1,width:"85%",borderRadius:7,alignItems:"center",alignSelf:"center"}}
                          ></TextInput>
                      </View>
  
  
                    
                      <TouchableOpacity 
                      onPress={()=>{this.uploadWholeData()}}
                      // onPress={()=>{this.validateUser()}}
                      
                      style={Styles.continueBtn}>
                              <Text style={Styles.continueBtnTxt}>Enregistrer</Text>
                      </TouchableOpacity>
  
                      {/* <TouchableOpacity 
                          onPress={()=>{this.props.navigation.navigate("EditProfile")}}
                          style={{flexDirection:"row",margin:4,paddingStart:4,alignItems:"center"}}>
                          <Image source={require("../../../assets/icons/15.png")} style={{height:30,width:30,margin:7}} />
                          <Text style={{color:"#cdcdcd",fontSize:14,fontWeight:"700",fontFamily:"Ariel",margin:15}}>Mon Profile</Text>
                      </TouchableOpacity> */}
  
                      
  
                  </ScrollView>
                  </KeyboardAwareScrollView>


                  :<View>
                    <Text></Text>
                  </View>
                
                }




                {/* <BottomNavigator
                    currentRoute={'profile'}
                    navigation={this.props.navigation}
                /> */}
            </View>
        )
    }
}

export default EditProfile;