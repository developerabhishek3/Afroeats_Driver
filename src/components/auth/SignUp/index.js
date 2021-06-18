import React, {Component,Fragment} from 'react';
import {View,Text,Image,TouchableOpacity, ScrollView,Alert,BackHandler} from 'react-native';
import Styles from './indexCss';
import FloatingLabel from 'react-native-floating-labels';
import { CheckBox, Overlay, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {createUser} from '../../../Api/auth';
class Login extends Component {
    constructor(props){
        super(props)
        this.state={            
            Prenom:"",
            Nom:"",
            Courriel:"",
            N_de_reu:"",
            Rue:"",
            CodePostel:"",
            Telephone:"",
            MotdePasse:"",

            password:"",
            checked1:false
        }
    }




    UserRegistrationFunction = async () => {

    
        this.setState({spinner: true});
        const {      
            Prenom,
            Nom,
            Courriel,
            N_de_reu,
            Rue,
            CodePostel,
            Telephone,
            MotdePasse
        } = this.state;
        const createUserResponse = await createUser({ 
            first_name : Prenom,
            last_name:Nom,
            email: Courriel,
            street_number: N_de_reu,
            street:Rue,
            postal_code:CodePostel,
            telephone:Telephone,
            password:MotdePasse                 
        });
        if (createUserResponse.result == true) {                     
            Alert.alert('Message', createUserResponse.response.errorMessage);
            if (createUserResponse.response.error == 'true') {             
              console.log('GEtting value----------',createUserResponse.response.error);
            } else {
              console.log('getting reponse here=================',createUserResponse.response,);
              // this.props.navigation.navigate('adddocs');

              this.props.navigation.navigate('login');
            }
          } else {
            this.myAlert('Error', createUserResponse.error);
            console.log('getting error here-------------');
          }
        return;
      };
    
      myAlert = (title = '', message = '') => {
        Alert.alert(title, message);
      };












    validateUser = () => {  
        const {      
            Prenom,
            Nom,
            Courriel,
            N_de_reu,
            Rue,
            CodePostel,
            Telephone,
            MotdePasse,
            checked1
        } = this.state;
         if (Prenom.length === 0) {              
          Alert.alert('Message', 'Veuillez entrer votre prénom!');
        } else if (Nom.length === 0) {        
          Alert.alert("Message","Veuillez entrer votre nom de famille!")
        }
        else if (Courriel.length === 0) {           
            Alert.alert("Message","Veuillez entrer votre adresse électronique!")
          }        
        else if (N_de_reu.length === 0) {        
         Alert.alert("Message","Veuillez entrer votre N de reu!")
        }
         else if (Rue.length === 0) {             
          Alert.alert("Message","Veuillez entrer votre Rue!")
        } 
         else if (CodePostel.length === 0) {        
          Alert.alert("Message","Veuillez saisir votre numéro de CodePostel!")
        } 
       
        else if (Telephone.length === 0) {
            Alert.alert('Message', 'Veuillez entrer votre Telephone!');
        }      
       else if (MotdePasse.length === 0) {              
           Alert.alert('Message', 'Veuillez entrer votre mot de passe!');
          }
          else if (checked1 == false) {              
            Alert.alert('Message', `Veuillez vérifier l'état!`);
           }
           
        else {         
          const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!Courriel.match(mailformat)) {           
            Alert.alert('Message', 'Courriel non valide!');
            return false;
          }  
    
          this.UserRegistrationFunction();
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
                    <Image style={Styles.backArrowStyles} source={require("../../../assets/icons/2.png")} />
                    <Text style={Styles.headerTxt}>S'inscrire</Text>
                </View>
                <View style={Styles.mainContainer}>
                <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} showsVerticalScrollIndicator={false}>
                    <ScrollView> 
                    <View style={Styles.textInputMainView}>


                                <FloatingLabel                    
                                        autoCapitalize="none"
                                        labelStyle={Styles.label}
                                        inputStyle={Styles.input}
                                        value={this.state.Prenom}
                                        onChangeText={(Prenom) => this.setState({ Prenom })}
                                >
                                    Prenom
                                </FloatingLabel>

                                <FloatingLabel                    
                                        autoCapitalize="none"
                                        labelStyle={Styles.label}
                                        inputStyle={Styles.input}
                                        value={this.state.Nom}
                                        onChangeText={(Nom) => this.setState({ Nom })}
                                >
                                    Nom
                                </FloatingLabel>
                                <FloatingLabel                    
                                        autoCapitalize="none"
                                        labelStyle={Styles.label}
                                        inputStyle={Styles.input}
                                        value={this.state.Courriel}
                                        onChangeText={(Courriel) => this.setState({ Courriel })}
                                >
                                    Courriel
                                </FloatingLabel>
                                <FloatingLabel                    
                                        autoCapitalize="none"
                                        labelStyle={Styles.label}
                                        keyboardType="numeric"
                                        inputStyle={Styles.input}
                                        value={this.state.N_de_reu}
                                        onChangeText={(N_de_reu) => this.setState({ N_de_reu })}
                                >
                                    N de reu
                                </FloatingLabel>
                                <FloatingLabel                    
                                        autoCapitalize="none"
                                        labelStyle={Styles.label}
                                        inputStyle={Styles.input}
                                        value={this.state.Rue}
                                        onChangeText={(Rue) => this.setState({ Rue })}
                                >
                                    Rue
                                </FloatingLabel>
                                <FloatingLabel                    
                                        autoCapitalize="none"
                                        keyboardType="numeric"
                                        labelStyle={Styles.label}
                                        inputStyle={Styles.input}
                                        value={this.state.CodePostel}
                                        onChangeText={(CodePostel) => this.setState({ CodePostel })}
                                >
                                    Code Postel
                                </FloatingLabel>




                                <FloatingLabel                    
                                        autoCapitalize="none"
                                        keyboardType="numeric"
                                        labelStyle={Styles.label}
                                        inputStyle={Styles.input}
                                        value={this.state.Telephone}
                                        onChangeText={(Telephone) => this.setState({ Telephone })}
                                >
                                    Telephone
                                </FloatingLabel>


                                <FloatingLabel                    
                                        autoCapitalize="none"
                                        labelStyle={Styles.label}
                                        inputStyle={Styles.input}
                                        value={this.state.MotdePasse}
                                        onChangeText={(MotdePasse) => this.setState({ MotdePasse })}
                                >
                                    Mot de Passe
                                </FloatingLabel>

                    </View> 

                    <View style={{flexDirection:'row',margin:0,borderWidth:0,marginStart:-4,marginTop:-3}}>
                     
                     <CheckBox
                   checked={this.state.checked1}
                   onPress={() =>
                     this.setState({checked1: !this.state.checked1})
                   }
                   checkedIcon={
                     <Image
                     source={require("../../../assets/icons/check-box.png")}
                       style={{
                         width: 15,
                         height: 15,
                        margin:3              
                       }}
                     />
                   }
                   uncheckedIcon={
                     <Image
                     source={require("../../../assets/icons/211.png")}
                       style={{
                         width: 15,
                         height: 15,
                        margin:3            
                       }}
                     />
                   }
                 />
                  <Text style={{color:"#ff8c2d",fontFamily:"Arial",fontWeight:"700",marginTop:16,marginStart:-10}}>Accepter tous les termes et conditions</Text>
                 </View>
 


                    <TouchableOpacity style={Styles.continueBtn}
                        // onPress={()=>{this.props.navigation.navigate("adddocs")}} 
                        onPress={() =>{this.validateUser()}}                    
                    >
                            <Text style={Styles.continueBtnTxt}>S'inscrire</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("singup")}}>
                            <Text style={Styles.singupTxt}>Se Connecter</Text>
                    </TouchableOpacity>


                    </ScrollView>
                    </KeyboardAwareScrollView>
                </View>
                
            </View>
        )
    }
}

export default Login;