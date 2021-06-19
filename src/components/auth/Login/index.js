import React, {Component, Fragment} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView,Alert,BackHandler,} from 'react-native';
import Styles from './indexCss';
import FloatingLabel from 'react-native-floating-labels';
import {CheckBox, Overlay, Button} from 'react-native-elements';

import {loginUser} from '../../../Api/auth';
import AsyncStorage from '@react-native-community/async-storage';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      checked1: false,
    };
  }

  userLoginFunction = async () => {
    // console.log("getting inside the function uuid --------",this.state.device_token)
    const {email, password, deviceToken} = this.state;
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log("insdie the login page getting fcm token    - - - -- - ",fcmToken)    
    const loginUserResponse = await loginUser({
      email,
      password,
      deviceToken:fcmToken
    });
    if (loginUserResponse.result == true) {
      console.log(
        'getting result here --------',
        loginUserResponse.response,
      );
      if (loginUserResponse.response.error == 'true') {
        Alert.alert('Message', loginUserResponse.response.errorMessage);
      } else {
        console.log(
          'getting reponse here=================',
          loginUserResponse.response,
        );
        console.log("TEST FOR TOKEN : : : : : : : : : : :",loginUserResponse.response.token)
        console.log("TEST FOR USREID : : : : : : : : : : :",loginUserResponse.response.usersDetails.id)
        await AsyncStorage.setItem('userLoggedIn', 'true');
        // await AsyncStorage.setItem('userLoggedInData',JSON.stringify(loginUserResponse.response));
        await AsyncStorage.setItem('token',JSON.stringify(loginUserResponse.response.token));
        await AsyncStorage.setItem('user_id',JSON.stringify(loginUserResponse.response.usersDetails.id));       


        // this.props.navigation.navigate('home');
        let document_upload = loginUserResponse.response.usersDetails.document_upload
        let personal_document_verification = loginUserResponse.response.usersDetails.document_verification
        if(document_upload == 0){
          console.log("FIRST CASE :  : : ")
          // await AsyncStorage.setItem('isDocumentUploadPending', 'true');
          this.props.navigation.navigate('adddocs');         
        }      
       
        else if(personal_document_verification == 0){
          console.log("THIRD CASE :  : : ")
          // await AsyncStorage.setItem('isPersonalDocumentPending', 'true');
          this.props.navigation.navigate('home');
          // this.myAlert("Message",`Votre document n'est pas approuvé par l'administrateur`)
        }
        else if(document_upload == 1){
          console.log("SECOND CASE :  : : ")
          // await AsyncStorage.setItem('isDocumentUploadDone', 'true');
          this.props.navigation.navigate('home');         
          // this.myAlert("Message",`Veuillez télécharger votre document personnel pour vérification.`)
        }
        else {
          this.props.navigation.navigate('home');
        }
       
      }
    } else {
      this.myAlert('Error', loginUserResponse.response.errorMessage);
      console.log('getting error here-------------');
    }
    return;
  };



 async checkRemeberMe() {  
   console.log("inside the checked function - - - - - -  -",this.state.checked1)
        const rememberChecked = {
          email: this.state.email,
          password: this.state.password,
          checked1: true
        };
        const rememberUnchecked = {
          email: "",
          password: "",
          checked1: false
        };
        console.log(this.state.checked1);
        this.setState(
          {
            checked1: !this.state.checked1
          },
          () => {
            if (this.state.checked1) {
              AsyncStorage.setItem("storeData", JSON.stringify(rememberChecked));
            } else {
              AsyncStorage.setItem("storeData", JSON.stringify(rememberUnchecked));
            }
          }
        );
      }

















  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };

  validateUser = () => {
    const {email, password,checked1} = this.state;

    if (email.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre adresse e-mail!');
    } else if (password.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre mot de passe!');
    } else {
      const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
      if (!email.match(mailformat)) {
        this.myAlert('Message', 'Courriel non valide!');
        return false;
      }
      this.userLoginFunction();
    }
  };


async componentDidMount(){
  let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('FCM token$$$ ' + fcmToken);

    try {
      var storeData = JSON.parse(await AsyncStorage.getItem("storeData"));
      console.log(storeData, "store data");
      if (storeData !== null) {
        this.setState({
          email: storeData.email,
          password: storeData.password,
          remenberChcek: storeData.remenberChcek
        });
      }
    } catch (e) {
      console.error(e.message);
    }

  BackHandler.addEventListener('hardwareBackPress', () => this.handleBackButton(this.props.navigation));
}




// async componentWillMount() {
  
// }




  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackButton(this.props.navigation));
  }
  handleBackButton = (nav) => {
    if (!nav.isFocused()) {
      console.log("getting inside the if conditin--------------")
      return true;
    } else {
      console.log("getting inside the else conditin---------------")
      Alert.alert(
        'Exit App',
        'Do you want to Exit..', [{
          text: 'Cancel',
          style: 'cancel'
        }, {
          text: 'Exit',
          onPress: () => BackHandler.exitApp()
        },], {
        cancelable: false
      })
      return true;
    }
  }









  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.headerView}>
          <Image
            style={Styles.backArrowStyles}
            source={require('../../../assets/icons/2.png')}
          />
          <Text style={Styles.headerTxt}>Se Connecter</Text>
        </View>
        <View style={Styles.mainContainer}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={Styles.textInputMainView}>
              <FloatingLabel
                autoCapitalize="none"
                labelStyle={Styles.label}
                inputStyle={Styles.input}
                value={this.state.email}
                onChangeText={email => this.setState({email})}>
                Email
              </FloatingLabel>

              <FloatingLabel
                autoCapitalize="none"
                labelStyle={Styles.label}
                inputStyle={Styles.input}
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={password => this.setState({password})}>
                Mot de passe
              </FloatingLabel>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 0,
                  borderWidth: 0,
                  marginStart: -10,
                  marginTop: -3,
                }}>
                <CheckBox
                  checked={this.state.checked1}                  
                  onPress={() => this.checkRemeberMe()}
                  checkedIcon={
                    <Image
                      source={require('../../../assets/icons/check-box.png')}
                      style={{
                        width: 15,
                        height: 15,
                        margin: 3,
                      }}
                    />
                  }
                  uncheckedIcon={
                    <Image
                      source={require('../../../assets/icons/211.png')}
                      style={{
                        width: 15,
                        height: 15,
                        margin: 3,
                      }}
                    />
                  }
                />
                <Text
                  style={{
                    color: '#ff8c2d',
                    fontFamily: 'Arial',
                    fontWeight: '700',
                    marginTop: 16,
                    marginStart: -10,
                  }}>
                  Se souvenir de moi
                </Text>
              </View>




                                  {/* <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.checkRemeberMe()}>
                                        {this.state.checked1 === true ?
                                            <View style={{ width: 20, height: 20, backgroundColor: '#FFB612', borderRadius: 4, flexDirection: 'row',justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../../assets/icons/check-box.png')} style={{ width: 15, height: 15 }} />
                                            </View> :
                                            <View style={{ width: 20, height: 20, borderColor: '#FFB612', borderWidth: 1, borderRadius: 4 }} />
                                        }
                                    </TouchableOpacity>
                                    <Text
                  style={{
                    color: '#ff8c2d',
                    fontFamily: 'Arial',
                    fontWeight: '700',
                    marginTop: 16,
                    marginStart: -10,
                  }}>
                  Se souvenir de moi
                </Text>
                                </View> */}
 <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('forgotpassword');
              }}>
 <Text
                style={{
                  color: '#ff8c2d',
                  fontFamily: 'Arial',
                  fontWeight: '700',
                  marginTop: 16,
                  marginStart: 30,
                }}>
                Mot de passe oublié?
              </Text>
 </TouchableOpacity>
              
            </View>

            <TouchableOpacity
              // onPress={() => {
              //   this.props.navigation.navigate('forgotpassword');
              // }}

              onPress={() => {
                this.validateUser();
              }}
              style={Styles.continueBtn}>
              <Text style={Styles.continueBtnTxt}>Se Connecter</Text>
            </TouchableOpacity>

            <Text style={Styles.OuStyle}>Ou</Text>

            <TouchableOpacity
              // onPress={() => {
              //   this.props.navigation.navigate('home');
              // }}
              style={Styles.continueBtn1}>
              <Image
                source={require('../../../assets/icons/facebook.png')}
                style={{height: 30, width: 30, margin: 6}}
              />
              <Text style={Styles.continueBtnTxt1}>Continue with facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => {
              //   this.props.navigation.navigate('home');
              // }}
              style={Styles.continueBtn2}>
              <Image
                source={require('../../../assets/icons/gmail.png')}
                style={{height: 30, width: 30, margin: 7}}
              />
              <Text style={Styles.continueBtnTxt2}>Continue with gmail</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('singup');
              }}
             >
              <Text style={Styles.singupTxt}>S'inscrire</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Login;
