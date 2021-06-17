import React,{Component,Fragment} from 'react';
import {View,Text, ImageBackground,Image, TouchableOpacity,Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import {getDriverDocStatus} from '../../../Api/afterAuth'
class Welcome extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          isLoading: true,
          isSpinner:true,
          document_upload:0,
          personal_document_verification:0,          

        }
      }
 

      fetchgetDriverDocStatus = async () => {       
        const user_id = await AsyncStorage.getItem('user_id');
        const UserId = JSON.parse(user_id)    
        const driverDocumentResponse = await getDriverDocStatus({driver_id:UserId});
        if (driverDocumentResponse.result == true) {
        
          if (driverDocumentResponse.response.error == 'true') {
            // console.log("getting here - i am abhishek - - -")
            this.setState({isSpinner:false,isBodyLoaded:true}, () => {
              this.CheckScreenStatus2();
            });         
            // Alert.alert('Message', driverDocumentResponse.response.errorMessage);
            // if(driverDocumentResponse.response.errorMessage == "Incompatibilité de jetons"){
            //     Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
            //     AsyncStorage.clear()
            //     this.props.navigation.navigate("login")
            //   }
          } else {
            // console.log('getting reponse here=================',driverDocumentResponse.response,);  
            var DocuementData = driverDocumentResponse.response.record
            let document_upload;
            let personal_document_verification;
            DocuementData.map((singleMap)=>{
              document_upload = singleMap.document_upload,
              personal_document_verification = singleMap.personal_document_verification
            })
            this.setState({document_upload,personal_document_verification,isSpinner:false,isBodyLoaded:true}, () => {
              this.checkScreenStatus();
            });         
          }
        } else {
          Alert.alert('Error', driverDocumentResponse.response.errorMessage);
          console.log('getting error here-------------');
        }
        return;
      };
  
  
      // checkdocsAPIStatus(){
      //   const userLoggedIn = await AsyncStorage.getItem('userLoggedIn') || 'false';   
      //   if(userLoggedIn == 'true'){
    
      //     console.log("geting login true side------------------")
      //     setTimeout(()=>{
      //       this.setState({ isLoading: false,isSpinner:false },()=>{
      //         this.fetchgetDriverDocStatus()
      //       });
      //     },10);
      //   }
      // }
      async checkScreenStatus () {

        console.log("coming inside function ort not================================================")
      
        this.state.document_upload, this.state.personal_document_verification
      
        
          try{
            const userLoggedIn = await AsyncStorage.getItem('userLoggedIn') || 'false';          
            if(this.state.document_upload == 0){
              this.props.navigation.navigate('adddocs');     
            }           
            else if(this.state.personal_document_verification == 0){            
              Alert.alert("Message",`Votre document n'est pas approuvé par l'administrateur`)
              this.props.navigation.navigate('home');
            } 
            else if(this.state.document_upload == 1){
              // Alert.alert("Message",`Veuillez télécharger votre document personnel pour vérification.`) 
              this.props.navigation.navigate('home');                      
            }          
            else if(userLoggedIn == 'true'){                
                this.props.navigation.navigate('home');                                        
            }    
            setTimeout(()=>{
              this.setState({ isLoading: false,isSpinner:false });
            },100);      
          }catch(error){
          }   
      }



      
    async componentDidMount() {
        this.fetchgetDriverDocStatus()
      
    }


      async CheckScreenStatus2() {

        try{
          const userLoggedIn = await AsyncStorage.getItem('userLoggedIn') || 'false';   
            if(userLoggedIn == 'true'){
    
              console.log("geting login true side------------------")
              setTimeout(()=>{
                this.setState({ isLoading: false,isSpinner:false },()=>{
                  this.props.navigation.navigate('home');
                });
              },10);
            }
            else {
              setTimeout(()=>{
                console.log("geting login false side------------------")
                this.setState({ isLoading: false,isSpinner:false },()=>{
                  // this.props.navigation.navigate('login');
                });
              },10);
            }      
        }
        catch(error){
          console.log("getting ERRROR============")
        }
      }
    render(){
        const { 
            isLoading
          } = this.state;
          console.log("State value - -- ",this.state.document_upload, this.state.personal_document_verification)
        return(
            <Fragment>
                  <Spinner visible={this.state.isSpinner}
        />
           {
         !isLoading &&  
           <ImageBackground source={require("../../../assets/bgImgs/2.png")} resizeMode="stretch" style={{flex:1}}>
                    <View>
                        <Image source={require("../../../assets/icons/logoTxt.png")} resizeMode="contain" style={{marginTop:60,alignSelf:"center"}} />
                    </View>


                    <View style={{flex:2,flexDirection:"row", justifyContent:"flex-end",alignItems:"flex-end",alignSelf:"center",marginBottom:90}}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("login")}}>
                            <Text style={{padding:9,color:"#FFFFFF",fontSize:18,fontFamily:"times-new-roman"}}>Se connecter</Text>
                        </TouchableOpacity>

                        <View style={{height:20,width:1,borderWidth:0.3,borderColor:"#FFFFFF",margin:9,marginTop:4}} />

                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("singup")}}>
                            <Text style={{padding:9,color:"#FFFFFF",fontSize:18,fontFamily:"times-new-roman",}}>S'incrire</Text>
                        </TouchableOpacity>
                    </View>
            </ImageBackground>
                    }
            </Fragment>
        )
    }
}

export default Welcome;