import React, {Component,Fragment} from 'react';
import {View,Text,Image,TouchableOpacity, ScrollView,TextInput,Switch,Modal,TouchableHighlight,Dimensions,BackHandler} from 'react-native';
// import BottomNavigator from '../../../router/BottomNavigator'
import Styles from './indexCss';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import ImagePicker from 'react-native-image-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import {getDriverDocument} from '../../../../Api/afterAuth';
import AsyncStorage from '@react-native-community/async-storage'
import Spinner from 'react-native-loading-spinner-overlay';
import { WebView } from 'react-native-webview';
class MyDocs extends Component {
  constructor(props){
    super(props)
    this.state={
        isEnabled:false,
        filePath:"",
        path:"",
        Model_Visibility: false,
        Alert_Visibility: false,
        address_proof:"",
        driving_license:"",
        id_proof:"",
        insurance:"",
        rc_card:"",
        documentRecord:[],
        isBodyLoaded: false,
        isSpinner: true,  

        
    }
}
Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate("home")
  }



// chooseFile = () => {
//     var options = {
//       title: 'Choisir une photo',     
//       storageOptions: {
//         skipBackup: false,
//         path: 'images',
//       },
//     };
//     // let options = {
//     //   title: 'Choisir une photo',
//     //   maxWidth: 256,
//     //   maxHeight: 256,
//     //   storageOptions: {
//     //     skipBackup: true
//     //   }
//     // };
//     ImagePicker.showImagePicker(options, response => {
//       // console.log('Response = ', response);

//       if (response.didCancel) {
//         // console.log('User cancelled image picker');
//       } else if (response.error) {
//         // console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         // console.log('User tapped custom button: ', response.customButton);
//         alert(response.customButton);
//       } else {
//         let source = response.data;
//         let path = response.uri
//         // console.log("Getting source response here"+source)
//         setTimeout(() => {
//             this.setState({
//                 filePath: source,
//                 path:path                
//               });
//         }, 1000);
       
//       }
//     });
//   };


  getDriverDocumentFunction = async () => {       
    const user_id = await AsyncStorage.getItem('user_id');
    const UserId = JSON.parse(user_id)    
    const getDriverDocumentResponse = await getDriverDocument({driver_id:UserId});
    if (getDriverDocumentResponse.result == true) {
      console.log('getting result here for driver documents --------',getDriverDocumentResponse.response,);
      if (getDriverDocumentResponse.response.error == 'true') {
        Alert.alert('Message', getDriverDocumentResponse.response.errorMessage);
        if(getDriverDocumentResponse.response.errorMessage == "Incompatibilité de jetons"){
            Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
            AsyncStorage.clear()
            this.props.navigation.navigate("login")
          }
      } else {
        console.log('getting reponse here=================',getDriverDocumentResponse.response.record,);  
        let documentRecord =[];
        let address_proof
        let driving_license
        let rc_card
        let insurance
        let id_proof
      documentRecord = getDriverDocumentResponse.response.record;
          documentRecord.map((singleDocument)=>{
            driving_license = singleDocument.driving_license
            id_proof = singleDocument.id_proof
            rc_card = singleDocument.rc_card
            insurance = singleDocument.insurance
            address_proof = singleDocument.address_proof
          })               
        
        this.setState({documentRecord,driving_license,id_proof,rc_card,insurance,address_proof,isBodyLoaded:true,isSpinner:false})         
      }
    } else {
      this.myAlert('Error', getDriverDocumentResponse.response.errorMessage);
      console.log('getting error here-------------');
    }
    return;
  };




//   Document_Picker = async (data) => {
//     console.log("upload_data", data)
//     try {
//         const res = await DocumentPicker.pick({
//             type: [DocumentPicker.types.images],
//         });
//         console.log(
//             "url", res.uri,
//             "type", res.type, // mime type
//             "name", res.name,
//             "size", res.size
//         );
//         if (data == "document1") {
//             this.setState({
//                 document1: RNFetchBlob.wrap(res.uri),
//                 document_name1: res.name
//             })
//         }
//         else if (data == "document2") {
//             this.setState({
//                 document2: RNFetchBlob.wrap(res.uri),
//                 document_name2: res.name
//             })
//         }
//         else if (data == "document3") {
//             this.setState({
//                 document3: RNFetchBlob.wrap(res.uri),
//                 document_name3: res.name
//             })
//         }
//         else if (data == "document4") {
//             this.setState({
//                 document4: RNFetchBlob.wrap(res.uri),
//                 document_name4: res.name
//             })
//         }
//         else if (data == "document5") {
//             this.setState({
//                 document5: RNFetchBlob.wrap(res.uri),
//                 document_name5: res.name
//             })
//         }
//         else if (data == "document6") {
//             this.setState({
//                 document6: RNFetchBlob.wrap(res.uri),
//                 document_name6: res.name
//             })
//         }
//     } catch (err) {
//         if (DocumentPicker.isCancel(err)) {
//             // User cancelled the picker, exit any dialogs or menus and move on
//         } else {
//             throw err;
//         }
//     }
// }





// upload_document = async () => {
   


//     const token = await AsyncStorage.getItem('token');
//     const user_id = await AsyncStorage.getItem('user_id'); 
//     console.log("@!ST CONSOLE : : :  : : : : :",typeof token +"USER ID TYPE :  : : :",typeof user_id)       
//     const TokenValue = JSON.parse(token);
//     // const UserId = JSON.parse(user_id);

//     console.log("getting USET+RID ::::"+ user_id + "@ND :::::::"+ token+"@3rd ::::::::" + this.state.document_name3)
//     console.log("@ND CONSOLE : : :  : : : : :",typeof token +"USER ID TYPE :  : : :"+user_id )



    
//     this.setState({isLoading:true})
//     let headers = {
//       "Content-Type": "multipart/form-data",
//       "user-id":user_id,
//       "token" : TokenValue,

//   };
//      RNFetchBlob.fetch('POST', 'https://food.afroeats.fr/api/uploadDriverDocument',   headers ,  [
//       { name: 'id_proof', filename: 'photo.jpg', type: 'image/png', data: this.state.document2 },
//       { name: 'address_proof', filename: 'photo.jpg', type: 'image/png', data: this.state.document3  },
//       { name: 'driving_license', filename: 'photo.jpg', type: 'image/png', data: this.state.document4 },
//       { name: 'insurance', filename: 'photo.jpg', type: 'image/png', data: this.state.document5 },
//       { name: 'rc_card', filename: 'photo.jpg', type: 'image/png', data: this.state.document6 },
//       { name: 'driver_id',  data:user_id }
     
//       ],
//      ).then((resp) => {
//       console.log("response:::::::" + JSON.stringify(resp.json()));
//       console.log("response:::::::" + resp.json().document_status);
//       if(resp.json().error == "false"){
//        console.log("sucesss")
//         this.setState({isLoading:false})
        
//       }
//       else {
//         console.log("unsucesss")
//         Alert.alert("Message",resp.errorMessage)
//         this.setState({isLoading:false})
//       }
//       // console.log("resp:::::::::::::",resp)
//      }).catch((err) => {
//       console.log("response::::err:::" + err);
     
//       });
// }





      componentDidMount = async () => {
        setTimeout(() => {
          this.getDriverDocumentFunction()  
        }, 3000);
        
        
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
      const { id_proof,address_proof,driving_license} = this.state;
      console.log("inside render - - -  - -",id_proof,address_proof,driving_license)
    
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
                        <Text style={Styles.headerTxt}>Mes documents</Text>
                    </View>
                </View>
                <Spinner visible={this.state.isSpinner} />
                <ScrollView>
                {
                  this.state.isBodyLoaded == true ?
                  <Fragment>
             

                    <View style={{margin:4,marginTop:7}}>
                    <Text style={{color:"#f7f7f7",fontSize:13,margin:6,fontFamily:"Arial",fontWeight:'800',marginStart:24}}>Preuve d'identité</Text>
                    <View style={{alignSelf:"center",flexDirection:"row",alignItems:'center',justifyContent:"space-between",height:45,width:"86%",backgroundColor:"#000000",borderWidth:0,borderColor:"red",borderTopLeftRadius:6,borderBottomLeftRadius:6}}>
                        <Text numberOfLines={2} style={{marginStart:7,color:"#f7f7f7",fontSize:10,fontWeight:"600",fontFamily:"Arial",width:"60%"}} >{this.state.id_proof}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("openfile",{
                          document:this.state.id_proof
                        })} style={Styles.continueBtn1}>
                            <Text style={Styles.continueBtnTxt1}>Télécharger</Text>
                        </TouchableOpacity>
                    </View>
                    </View>


                    <View style={{margin:4,marginTop:7}}>
                    <Text style={{color:"#f7f7f7",fontSize:13,margin:6,fontFamily:"Arial",fontWeight:'800',marginStart:24}}>Preuve d'adresse</Text>
                    <View style={{alignSelf:"center",flexDirection:"row",alignItems:'center',justifyContent:"space-between",height:45,width:"86%",backgroundColor:"#000000",borderWidth:0,borderColor:"red",borderTopLeftRadius:6,borderBottomLeftRadius:6}}>
                        <Text numberOfLines={2} style={{marginStart:7,color:"#f7f7f7",fontSize:10,fontWeight:"600",fontFamily:"Arial",width:"60%"}} >{this.state.address_proof}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("openfile",{
                          document:this.state.address_proof
                        })} style={Styles.continueBtn1}>
                            <Text style={Styles.continueBtnTxt1}>Télécharger</Text>
                        </TouchableOpacity>
                    </View>
                    </View>




                    <View style={{margin:4,marginTop:7}}>
                    <Text style={{color:"#f7f7f7",fontSize:13,margin:6,fontFamily:"Arial",fontWeight:'800',marginStart:24}}>Licence de conducteur</Text>
                    <View style={{alignSelf:"center",flexDirection:"row",alignItems:'center',justifyContent:"space-between",height:45,width:"86%",backgroundColor:"#000000",borderWidth:0,borderColor:"red",borderTopLeftRadius:6,borderBottomLeftRadius:6}}>
                        <Text numberOfLines={2} style={{marginStart:7,color:"#f7f7f7",fontSize:10,fontWeight:"600",fontFamily:"Arial",width:"60%"}} >{this.state.driving_license}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("openfile",{
                          document:this.state.driving_license
                        })} style={Styles.continueBtn1}>
                            <Text style={Styles.continueBtnTxt1}>Télécharger</Text>
                        </TouchableOpacity>
                    </View>
                    </View>




                    <View style={{margin:4,marginTop:7}}>
                    <Text style={{color:"#f7f7f7",fontSize:13,margin:6,fontFamily:"Arial",fontWeight:'800',marginStart:24}}>Assurance des véhicules</Text>
                    <View style={{alignSelf:"center",flexDirection:"row",alignItems:'center',justifyContent:"space-between",height:45,width:"86%",backgroundColor:"#000000",borderWidth:0,borderColor:"red",borderTopLeftRadius:6,borderBottomLeftRadius:6}}>
                        <Text numberOfLines={2} style={{marginStart:7,color:"#f7f7f7",fontSize:10,fontWeight:"600",fontFamily:"Arial",width:"60%"}} >{this.state.insurance}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("openfile",{
                          document:this.state.insurance
                        })} style={Styles.continueBtn1}>
                            <Text style={Styles.continueBtnTxt1}>Télécharger</Text>
                        </TouchableOpacity>
                    </View>
                    </View>




                    <View style={{margin:4,marginTop:7}}>
                    <Text style={{color:"#f7f7f7",fontSize:13,margin:6,fontFamily:"Arial",fontWeight:'800',marginStart:24}}>Enregistrement des véhicules</Text>
                    <View style={{alignSelf:"center",flexDirection:"row",alignItems:'center',justifyContent:"space-between",height:45,width:"86%",backgroundColor:"#000000",borderWidth:0,borderColor:"red",borderTopLeftRadius:6,borderBottomLeftRadius:6}}>
                        <Text numberOfLines={2} style={{marginStart:7,color:"#f7f7f7",fontSize:10,fontWeight:"600",fontFamily:"Arial",width:"60%"}} >{this.state.rc_card}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("openfile",{
                          document:this.state.rc_card
                        })} style={Styles.continueBtn1}>
                            <Text style={Styles.continueBtnTxt1}>Télécharger</Text>
                        </TouchableOpacity>
                    </View>
                    </View>



{/* 
                    <View style={{width:"86%",alignItems:"center",backgroundColor:"#404040",borderWidth:1,alignSelf:"center",margin:15,borderColor:"#a9a6a6",borderRadius:7,flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{color:"#f7f7f7",fontFamily:"Arial",width:"60%",margin:10,fontSize:12,fontWeight:"700"}}>Choisissez le mode de livraison que vous souhaitez </Text>
                        <TouchableOpacity style={{flexDirection:"row",margin:1,marginRight:10}}>
                                <ModalDropdown options={['option 1', 'option 2','option 3','option 4','option 5']} 
                                defaultValue="à pied"                  
                                textStyle={{ color:"#f8892d",marginTop:6,fontWeight:"700"}} />                                       
                                <Image source={require("../../../../assets/icons/2-1.png")} style={{height:10,width:10,marginTop:10,margin:3}} />
                       </TouchableOpacity>
                    </View> */}


                    
                    
                    {/* <TouchableOpacity onPress={()=>{this.props.navigation.navigate("profile")}} style={Styles.continueBtn}>
                            <Text style={Styles.continueBtnTxt}>Enregister</Text>
                    </TouchableOpacity> */}

                  </Fragment>
                     :
                     <View>
                       <Text></Text>
                     </View>
                   }
   

                </ScrollView>





            

                   
                {/* <BottomNavigator
                    currentRoute={'profile'}
                    navigation={this.props.navigation}
                /> */}
            </View>
        )
    }
}

export default MyDocs;