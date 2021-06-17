import React, {Component,Fragment} from 'react';
import {View,Text,Image,TouchableOpacity, ScrollView,TextInput,Switch,Modal,TouchableHighlight,Dimensions,BackHandler} from 'react-native';
// import BottomNavigator from '../../../router/BottomNavigator'
import Styles from './indexCss';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import ImagePicker from 'react-native-image-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob'
import { Alert } from 'react-native';
class AddDocs extends Component {
    constructor(props){
        super(props)
        this.state={
            isEnabled:false,
            filePath:"",
            path:"",
            document2:"",
            document3:"",
            document4:"",
            document5:"",
            document6:"",
            Model_Visibility: false,
            Alert_Visibility: false,           
            
        }
    }
    Show_Custom_Alert(visible) {
        this.setState({Alert_Visibility: visible});
      }
      Hide_Custom_Alert() {
        this.setState({Alert_Visibility: false});
        this.props.navigation.navigate("home")
      }

    

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
        ImagePicker.showImagePicker(options, response => {
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
                    path:path                
                  });
            }, 1000);
           
          }
        });
      };
    




      Document_Picker = async (data) => {
        console.log("upload_data", data)
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            console.log(
                "url", res.uri,
                "type", res.type, // mime type
                "name", res.name,
                "size", res.size
            );
            if (data == "document1") {
                this.setState({
                    document1: RNFetchBlob.wrap(res.uri),
                    document_name1: res.name
                })
            }
            else if (data == "document2") {
                this.setState({
                    document2: RNFetchBlob.wrap(res.uri),
                    document_name2: res.name
                })
            }
            else if (data == "document3") {
                this.setState({
                    document3: RNFetchBlob.wrap(res.uri),
                    document_name3: res.name
                })
            }
            else if (data == "document4") {
                this.setState({
                    document4: RNFetchBlob.wrap(res.uri),
                    document_name4: res.name
                })
            }
            else if (data == "document5") {
                this.setState({
                    document5: RNFetchBlob.wrap(res.uri),
                    document_name5: res.name
                })
            }
            else if (data == "document6") {
                this.setState({
                    document6: RNFetchBlob.wrap(res.uri),
                    document_name6: res.name
                })
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }





    upload_document = async () => {
       


        const token = await AsyncStorage.getItem('token');
        const user_id = await AsyncStorage.getItem('user_id'); 
        console.log("@!ST CONSOLE : : :  : : : : :",typeof token +"USER ID TYPE :  : : :",typeof user_id)       
        const TokenValue = JSON.parse(token);
        // const UserId = JSON.parse(user_id);

        console.log("getting USET+RID ::::"+ user_id + "@ND :::::::"+ token+"@3rd ::::::::" + this.state.document_name3)
        console.log("@ND CONSOLE : : :  : : : : :",typeof token +"USER ID TYPE :  : : :"+user_id )
    


        
        this.setState({isLoading:true})
        let headers = {
          "Content-Type": "multipart/form-data",
          "user-id":user_id,
          "token" : TokenValue,
    
      };
         RNFetchBlob.fetch('POST', 'https://food.afroeats.fr/api/uploadDriverDocument',   headers ,  [
          { name: 'id_proof', filename: 'photo.jpg', type: 'image/png', data: this.state.document2 },
          { name: 'address_proof', filename: 'photo.jpg', type: 'image/png', data: this.state.document3  },
          { name: 'driving_license', filename: 'photo.jpg', type: 'image/png', data: this.state.document4 },
          { name: 'insurance', filename: 'photo.jpg', type: 'image/png', data: this.state.document5 },
          { name: 'rc_card', filename: 'photo.jpg', type: 'image/png', data: this.state.document6 },
          { name: 'driver_id',  data:user_id }
         
          ],
         ).then((resp) => {
          console.log("response:::::::" + JSON.stringify(resp.json()));
          console.log("response:::::::" + resp.json().document_status);
          if(resp.json().error == "false"){
            this.props.navigation.navigate("home")
           console.log("sucesss")
            this.setState({isLoading:false})
            
          }
          else {
            console.log("unsucesss")
            Alert.alert("Message",resp.errorMessage)
            this.setState({isLoading:false})
          }
          // console.log("resp:::::::::::::",resp)
         }).catch((err) => {
          console.log("response::::err:::" + err);
         
          });
    }




    validateUser = (data) => {  
        console.log("Getting state value here - -  - - -",data)
        const {      
            document_name2,
            document_name3,
            document_name4,
            document_name5,
            document_name6,          
        } = this.state;
         if (document_name2 != undefined || document_name2 != null || document_name2 != "") {              
          Alert.alert('Message', `Veuillez télécharger votre Preuve d'identité`);
        } else if (document_name3 != undefined || document_name3 != null || document_name3 != "") { 
          Alert.alert("Message",`Veuillez télécharger votre Preuve d'adresse`)
        }
        else if (document_name4 != undefined || document_name4 != null || document_name4 != "") { 
            Alert.alert("Message",`Veuillez télécharger votre Licence de conducteur`)
          }        
          else if (document_name5 != undefined || document_name5 != null || document_name5 != "") { 
         Alert.alert("Message",`Veuillez télécharger votre Assurance des véhicules`)
        }
        else if (document_name6 != undefined || document_name6 != null || document_name6 != "") {           
          Alert.alert("Message",`Veuillez télécharger votre Enregistrement des véhicules`)
        }         
        else {                  
          this.upload_document();
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
                        <Image
                            source={require('../../../assets/icons/2.png')}
                            style={Styles.headerIMG}
                        />
                        <Text style={Styles.headerTxt}>Télécharger des documents</Text>
                    </View>
                </View>
                <ScrollView>


                    {/* <View style={{margin:4,marginTop:7}}>
                   
                    <View style={{flexDirection:"row",alignItems:'center',alignSelf:"center",justifyContent:"space-between",width:"96%",flexWrap:"wrap",borderWidth:0,borderColor:"red",borderBottomColor:"#DDDDDD",borderBottomWidth:1}}>
                        {
                            this.state.document_name1 == "" || this.state.document_name1 == undefined || this.state.document_name1 == null ?

                            <Text style={{color:"#000000",fontSize:13,margin:6,fontFamily:"Arial",fontWeight:'700'}}>Photo de profil</Text>
                            :

                             <Text numberOfLines={2} style={{marginStart:0,color:"#000000",fontSize:10,fontWeight:"600",fontFamily:"Arial",width:"60%"}} >{this.state.document_name1}</Text> 
                        }
                    
                        
                        <TouchableOpacity style={{flexDirection:"row"}}
                        
                        onPress={() => this.Document_Picker("document1")}
                        // onPress={this.chooseFile.bind(this)}
                        
                        >
                            <Image source={require("../../../assets/icons/photo-camera.png")} style={{height:20,width:20,margin:2}} />
                            <Text style={Styles.continueBtnTxt1}>Télécharger</Text>
                        </TouchableOpacity>
                    </View>
                    </View> */}

                    <View style={{margin:4,marginTop:7}}>
                   
                   <View style={{flexDirection:"row",alignItems:'center',alignSelf:"center",justifyContent:"space-between",width:"96%",flexWrap:"wrap",borderWidth:0,borderColor:"red",borderBottomColor:"#DDDDDD",borderBottomWidth:1}}>
                       {
                            this.state.document_name2 == "" || this.state.document_name2 == undefined || this.state.document_name2 == null  ?

                           <Text style={{color:"#000000",fontSize:13,margin:6,fontFamily:"Arial",fontWeight:'700'}}>Preuve d'identité</Text>
                           :

                            <Text numberOfLines={2} style={{marginStart:0,color:"#000000",fontSize:10,fontWeight:"600",fontFamily:"Arial",width:"60%"}} >{this.state.document2}</Text> 
                       }
                   
                       
                       <TouchableOpacity style={{flexDirection:"row"}}  onPress={() => this.Document_Picker("document2")}>
                           <Image source={require("../../../assets/icons/photo-camera.png")} style={{height:20,width:20,margin:2}} />
                           <Text style={Styles.continueBtnTxt1}>Télécharger</Text>
                       </TouchableOpacity>
                   </View>
                   </View>



                   <View style={{margin:4,marginTop:7}}>
                   
                   <View style={{flexDirection:"row",alignItems:'center',alignSelf:"center",justifyContent:"space-between",width:"96%",flexWrap:"wrap",borderWidth:0,borderColor:"red",borderBottomColor:"#DDDDDD",borderBottomWidth:1}}>
                       {
                            this.state.document_name3 == "" || this.state.document_name3 == undefined || this.state.document_name3 == null  ?

                           <Text style={{color:"#000000",fontSize:13,margin:6,fontFamily:"Arial",fontWeight:'700'}}>Preuve d'adresse</Text>
                           :

                            <Text numberOfLines={2} style={{marginStart:0,color:"#000000",fontSize:10,fontWeight:"600",fontFamily:"Arial",width:"60%"}} >{this.state.document3}</Text> 
                       }
                   
                       
                       <TouchableOpacity style={{flexDirection:"row"}} onPress={() => this.Document_Picker("document3")} >
                           <Image source={require("../../../assets/icons/photo-camera.png")} style={{height:20,width:20,margin:2}} />
                           <Text style={Styles.continueBtnTxt1}>Télécharger</Text>
                       </TouchableOpacity>
                   </View>
                   </View>


                   <View style={{margin:4,marginTop:7}}>
                   
                   <View style={{flexDirection:"row",alignItems:'center',alignSelf:"center",justifyContent:"space-between",width:"96%",flexWrap:"wrap",borderWidth:0,borderColor:"red",borderBottomColor:"#DDDDDD",borderBottomWidth:1}}>
                       {
                          this.state.document_name4 == "" || this.state.document_name4 == undefined || this.state.document_name4 == null  ?

                           <Text style={{color:"#000000",fontSize:13,margin:6,fontFamily:"Arial",fontWeight:'700'}}>Licence de conducteur</Text>
                           :

                            <Text numberOfLines={2} style={{marginStart:0,color:"#000000",fontSize:10,fontWeight:"600",fontFamily:"Arial",width:"60%"}} >{this.state.document4}</Text> 
                       }
                   
                       
                       <TouchableOpacity style={{flexDirection:"row"}}   onPress={() => this.Document_Picker("document4")} >
                           <Image source={require("../../../assets/icons/photo-camera.png")} style={{height:20,width:20,margin:2}} />
                           <Text style={Styles.continueBtnTxt1}>Télécharger</Text>
                       </TouchableOpacity>
                   </View>
                   </View>




                   <View style={{margin:4,marginTop:7}}>
                   
                   <View style={{flexDirection:"row",alignItems:'center',alignSelf:"center",justifyContent:"space-between",width:"96%",flexWrap:"wrap",borderWidth:0,borderColor:"red",borderBottomColor:"#DDDDDD",borderBottomWidth:1}}>
                       {
                           this.state.document_name5 == "" || this.state.document_name5 == undefined || this.state.document_name5 == null  ?

                           <Text style={{color:"#000000",fontSize:13,margin:6,fontFamily:"Arial",fontWeight:'700'}}>Assurance des véhicules</Text>
                           :

                            <Text numberOfLines={2} style={{marginStart:0,color:"#000000",fontSize:10,fontWeight:"600",fontFamily:"Arial",width:"60%"}} >{this.state.document5}</Text> 
                       }
                   
                       
                       <TouchableOpacity style={{flexDirection:"row"}} onPress={() => this.Document_Picker("document5")} >
                           <Image source={require("../../../assets/icons/photo-camera.png")} style={{height:20,width:20,margin:2}} />
                           <Text style={Styles.continueBtnTxt1}>Télécharger</Text>
                       </TouchableOpacity>
                   </View>
                   </View>



                   <View style={{margin:4,marginTop:7}}>
                   
                   <View style={{flexDirection:"row",alignItems:'center',alignSelf:"center",justifyContent:"space-between",width:"96%",flexWrap:"wrap",borderWidth:0,borderColor:"red",borderBottomColor:"#DDDDDD",borderBottomWidth:1}}>
                       {
                          this.state.document_name6 == "" || this.state.document_name6 == undefined || this.state.document_name6 == null  ?

                           <Text style={{color:"#000000",fontSize:13,margin:6,fontFamily:"Arial",fontWeight:'700'}}>Enregistrement des véhicules</Text>
                           :

                            <Text numberOfLines={2} style={{marginStart:0,color:"#000000",fontSize:10,fontWeight:"600",fontFamily:"Arial",width:"60%"}} >{this.state.document6}</Text> 
                       }
                   
                       
                       <TouchableOpacity style={{flexDirection:"row"}} onPress={() => this.Document_Picker("document6")}  >
                           <Image source={require("../../../assets/icons/photo-camera.png")} style={{height:20,width:20,margin:2}} />
                           <Text style={Styles.continueBtnTxt1}>Télécharger</Text>
                       </TouchableOpacity>
                   </View>
                   </View>




                   <View style={{margin:4,marginTop:7}}>
                   
                   <View style={{flexDirection:"row",alignItems:'center',alignSelf:"center",justifyContent:"space-between",width:"96%",flexWrap:"wrap",borderWidth:0,borderColor:"red",borderBottomColor:"#DDDDDD",borderBottomWidth:1}}>
                   
                           <Text style={{color:"#000000",fontSize:13,margin:6,fontFamily:"Arial",fontWeight:'700',width:"60%"}}>Choisissez le mode de livraison 
                           que vous souhaitez </Text>
                                  
                        <TouchableOpacity style={{flexDirection:"row",margin:1}}>
                            <ModalDropdown options={['option 1', 'option 2','option 3','option 4','option 5']} 
                                defaultValue="à pied"                  
                                textStyle={{ color:"#ff8c2d",marginTop:6,fontWeight:"700"}} />                                       
                            <Image source={require("../../../assets/icons/2-1.png")} style={{height:10,width:10,marginTop:10,margin:3}} />
                        </TouchableOpacity>
                   </View>
                   </View>



                    
                    
                    <TouchableOpacity 
                    // onPress={()=>{this.Show_Custom_Alert()}}
                    onPress={()=>{this.upload_document()}}
                     style={Styles.continueBtn}>
                            <Text style={Styles.continueBtnTxt}>Télécharger</Text>
                    </TouchableOpacity>

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
                            marginTop:-20,
                            color: '#ffffff',
                            textAlign: 'center',
                            fontFamily: 'Montserrat-Regular',
                        }}>
                          Activation de compte
                        </Text>

                        <Text
                        style={{
                            fontSize: 12,
                            alignSelf: 'center',
                            fontWeight: '700',
                            margin:10,
                            marginTop:0,
                            color: '#ffffff',
                            textAlign: 'center', 
                            width:SCREEN_WIDTH/2.1             
                        }}>
                     Felicitations! votre compte a ete active
                        </Text>


                        </View>                    
                    
                    <View style={{flexDirection:"row",justifyContent:"center",marginTop:-30}}>
                        <TouchableOpacity
                        onPress={() => this.Hide_Custom_Alert()}                 
                        style={Styles.continueBtn1}>
                        <Text
                            style={Styles.continueBtnTxt2}>
                            Continuer
                        </Text>
                        </TouchableOpacity>

                        
                    </View>
                    
                    
                    </View>
                </View>
                </Modal>





            

                   
                {/* <BottomNavigator
                    currentRoute={'profile'}
                    navigation={this.props.navigation}
                /> */}
            </View>
        )
    }
}

export default AddDocs;