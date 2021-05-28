import React, {Component, Fragment} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView,Alert,BackHandler} from 'react-native';
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
    const loginUserResponse = await loginUser({
      email,
      password,
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
        this.props.navigation.navigate('home');
      }
    } else {
      this.myAlert('Error', loginUserResponse.response.errorMessage);
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
    } else if (password.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre mot de passe!');
    } else if (checked1 == false) {
      this.myAlert('Message', `Veuillez vérifier l'état!`);
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



  BackHandler.addEventListener('hardwareBackPress', () => this.handleBackButton(this.props.navigation));
}









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
          <ScrollView>
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
                  onPress={() =>
                    this.setState({checked1: !this.state.checked1})
                  }
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
            </View>

            <TouchableOpacity
              // onPress={() => {
              //   this.props.navigation.navigate('home');
              // }}

              onPress={() => {
                this.validateUser();
              }}
              style={Styles.continueBtn}>
              <Text style={Styles.continueBtnTxt}>Se Connecter</Text>
            </TouchableOpacity>

            <Text style={Styles.OuStyle}>Ou</Text>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('home');
              }}
              style={Styles.continueBtn1}>
              <Image
                source={require('../../../assets/icons/facebook.png')}
                style={{height: 30, width: 30, margin: 6}}
              />
              <Text style={Styles.continueBtnTxt1}>Continue with facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('home');
              }}
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
