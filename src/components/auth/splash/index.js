import React, {Component} from 'react';
import {View, StatusBar,Dimensions, ImageBackground} from 'react-native';
                

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class Splash extends Component {
  constructor() {
    super();
    //  this.RotateValueHolder = new Animated.Value(0);
  }

  componentDidMount() {

 

    setTimeout(() => {
      this.props.navigation.replace('welcome');
    }, 3000);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',          
        }}>
          <StatusBar hidden={true} />
        <ImageBackground
          resizeMode="stretch"
          style={{
            width: '100%',
            height: '100%',
            justifyContent:'center'
          }}
          source={require('../../../assets/bgImgs/splash.png')}          
        > 
      
        </ImageBackground>
      </View>
    );
  }
}
