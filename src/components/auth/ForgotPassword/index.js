import React, {Component, Fragment} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView,Alert,BackHandler,} from 'react-native';
import Styles from './indexCss';
import FloatingLabel from 'react-native-floating-labels';
import {CheckBox, Overlay, Button} from 'react-native-elements';

import {driverForgotPassword} from '../../../Api/afterAuth';
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
    
    console.log("insdie the login page getting fcm token    - - - -- - ",email)    
    const driverForgotPasswordResponse = await driverForgotPassword({
      email,     
    });
    if (driverForgotPasswordResponse.result == true) {
      console.log(
        'getting result here --------',
        driverForgotPasswordResponse.response,
      );
      if (driverForgotPasswordResponse.response.error == 'true') {
        Alert.alert('Message', driverForgotPasswordResponse.response.errorMessage);
      } else {
        console.log(
          'getting reponse here=================',
          driverForgotPasswordResponse.response,
        );   
        Alert.alert('Message',`Vérifiez votre email, j'ai envoyé un mot de passe à votre email.`)
          this.props.navigation.navigate('login');
        
       
      }
    } else {
      this.myAlert('Error', driverForgotPasswordResponse.response.errorMessage);
      console.log('getting error here-------------');
    }
    return;
  };

















  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };

  validateUser = () => {
    const {email, password,checked1} = this.state;

    if (email.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre adresse e-mail!');
    }  else {
      const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
      if (!email.match(mailformat)) {
        this.myAlert('Message', 'Courriel non valide!');
        return false;
      }
      this.userLoginFunction();
    }
  };


async componentDidMount(){

  BackHandler.addEventListener('hardwareBackPress', () => this.handleBackButton(this.props.navigation));
}




// async componentWillMount() {
  
// }




  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackButton(this.props.navigation));
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
    return (
      <View style={Styles.container}>
        <View style={Styles.headerView}>
          <Image
            style={Styles.backArrowStyles}
            source={require('../../../assets/icons/2.png')}
          />
          <Text style={Styles.headerTxt}>Mot de passe</Text>
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
             
            </View>

           
            <TouchableOpacity
              // onPress={() => {
              //   this.props.navigation.navigate('home');
              // }}

              onPress={() => {
                this.validateUser();
              }}
              style={Styles.continueBtn}>
              <Text style={Styles.continueBtnTxt}>Confirmer</Text>
            </TouchableOpacity>

           {/*  */}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Login;
