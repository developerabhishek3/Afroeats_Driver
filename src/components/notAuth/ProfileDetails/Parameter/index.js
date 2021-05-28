import React, {Component,Fragment} from 'react';
import {View,Text,Image,TouchableOpacity, ScrollView,TextInput,Switch,Modal,TouchableHighlight,Dimensions,BackHandler} from 'react-native';
// import BottomNavigator from '../../../router/BottomNavigator'
import Styles from './indexCss';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
class Parameter extends Component {
    constructor(props){
        super(props)
        this.state={
            isEnabled:false,
            Model_Visibility: false,
            Alert_Visibility: false,
      
        }
    }
   


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


    Show_Custom_Alert(visible) {
        this.setState({Alert_Visibility: visible, });
    
      }
      Hide_Custom_Alert() {
        this.setState({Alert_Visibility: false});
        
      }
    




   async toggleSwitch(){
        this.setState({isEnabled:!this.state.isEnabled})
    }
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
                        <Text style={Styles.headerTxt}>Paramètres</Text>
                    </View>

                 
                </View>
                <ScrollView>


              



                <TouchableOpacity>
                <View style={{backgroundColor:"#363636",  borderWidth: 0,
    borderRadius: 5,
    borderColor: '#FFFFFF',
    borderBottomWidth: 0,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation:7,
    
                    width:"94%",alignSelf:'center',margin:10,borderRadius:6,flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:"#FFFFFF",margin:15,fontFamily: "Ariel",fontWeight:"700",}}>Notifications</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#ff8c2d" }}
                                thumbColor={this.state.isEnabled ? "#ff8c2d" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=> this.toggleSwitch()}
                                value={this.state.isEnabled}
                            />            
                        </View>
                    </TouchableOpacity>


                    

                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("changepassword")}}>
                        <View   style={{backgroundColor:"#363636",  borderWidth: 0,
                                borderRadius: 5,
                                borderColor: '#FFFFFF',
                                borderBottomWidth: 0,
                                shadowColor: '#FFFFFF',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.9,
                                shadowRadius: 3,
                                elevation:7,
    
                    width:"94%",alignSelf:'center',margin:10,borderRadius:6,flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:"#FFFFFF",margin:15,  fontFamily: "Ariel",fontWeight:"700",}}>Changer de mot de passe</Text>
                            <Image source={require("../../../../assets/icons/193.png")}  style={{height:24,width:24,margin:15}} />
                        </View>
                    </TouchableOpacity>



                    <TouchableOpacity onPress={()=>{this.Show_Custom_Alert()}}>
                        <View style={{backgroundColor:"#363636",  borderWidth: 0,
    borderRadius: 5,
    borderColor: '#FFFFFF',
    borderBottomWidth: 0,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation:7,
    
                    width:"94%",alignSelf:'center',margin:10,borderRadius:6,flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:"#FFFFFF",margin:15,  fontFamily: "Ariel",fontWeight:"700",}}>Supprimer un compte</Text>
                            <Image source={require("../../../../assets/icons/15.png")}  style={{height:24,width:24,margin:15}} />
                        </View>
                    </TouchableOpacity>
              

                    <Text style={{color:"#ef6931",margin:3,paddingLeft:15,marginTop:16,  fontFamily: "Ariel",fontWeight:"600",}}>Terms et consitions</Text>
                    <Text style={{color:"#ef6931",margin:3,paddingLeft:15,  fontFamily: "Ariel",fontWeight:"600",}}>Politique de confidentialité</Text>              


                  
                    {/* <TouchableOpacity 
                        onPress={()=>{this.props.navigation.navigate("Parameter")}}
                        style={{flexDirection:"row",margin:4,paddingStart:4,alignItems:"center"}}>
                        <Image source={require("../../../assets/icons/15.png")} style={{height:30,width:30,margin:7}} />
                        <Text style={{color:"#cdcdcd",fontSize:14,fontWeight:"700",fontFamily:"Ariel",margin:15}}>Mon Profile</Text>
                    </TouchableOpacity> */}

                    
                    {/* <TouchableOpacity onPress={()=>{this.props.navigation.navigate("profile")}} style={Styles.continueBtn}>
                            <Text style={Styles.continueBtnTxt}>Enregistrer</Text>
                    </TouchableOpacity> */}

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
                                        width: '90%',
                                        height: 240,
                                        backgroundColor: '#000000',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: 10,
                                        borderRadius: 10,
                                        // borderColor:"red",borderWidth:1
                                    }}>
                                    <View style={{justifyContent: 'center', alignItems: 'center'}}>              
                                    <Text
                                                            style={{
                                                            fontSize: 18,
                                                            alignSelf: 'center',
                                                            fontFamily: "Poppins-Bold",
                                                            margin: 0,
                                                            marginTop: 20,
                                                            color: '#ffffff',
                                                            textAlign: 'center',                      
                                                            }}>
                                                        Supprimer un compte
                                                        </Text>

                                        <Text style={{marginTop:10,fontSize:12,  fontFamily: "Poppins-Medium",color:"#d4d9d7",alignSelf:'center'}}>Êtes-vous sûr de vouloir supprimer </Text>
                                                        <Text style={{margin:2,fontSize:12,  fontFamily: "Poppins-Medium",color:"#d4d9d7",alignSelf:'center'}}>votre compte ? Si vous supprimez </Text>
                                                        <Text style={{margin:2,fontSize:12,  fontFamily: "Poppins-Medium",color:"#d4d9d7",alignSelf:'center'}}>votre compte, vous ne pourrez </Text>
                                                        <Text style={{margin:2,fontSize:12,  fontFamily: "Poppins-Medium",color:"#d4d9d7",alignSelf:'center'}}>pas le réactiver tardivement</Text>


                                        </View>                    
                                    
                                    <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                                        <TouchableOpacity
                                        onPress={() => this.Hide_Custom_Alert()}                 
                                        style={Styles.continueBtn}>
                                        <Text
                                            style={Styles.continueBtnTxt}>
                                            Oui
                                        </Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity
                                        onPress={() => this.Hide_Custom_Alert()}                  
                                        style={Styles.continueBtn}>
                                        <Text
                                            style={Styles.continueBtnTxt}>
                                            Non
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

export default Parameter;