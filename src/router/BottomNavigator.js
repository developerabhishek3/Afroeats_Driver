import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  BackHandler,
  Alert,
  Dimensions
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;




// sleceted route image.....

import Home from '../assets/BottomNavIcons/5.png'
import MyOrder from '../assets/BottomNavIcons/7.png'
import Profie from '../assets/BottomNavIcons/8.png'


// unselected route image.....

// import UnSelectedReservation from '../assets/BottomIcon/3.png'
// import UnSelectedHome from '../assets/BottomIcon/7.png'
// import UnSelectedChat from '../assets/../assets/icon/10-1.png'
// import UnSelectedProfie from '../assets/BottomIcon/4.png'
// import AntDesign from 'react-native-vector-icons/AntDesign';


// AntDesign.loadFont();


class BottomNavigator extends Component{
    
    render(){
        let {currentRoute} = this.props;
        console.log("current route name-",currentRoute)
        return(
            <View keyboardShouldPersistTaps="always">
                
                <View style={styles.TabNavigatorView}>

                <TouchableOpacity
                   style={{width: '33%',borderWidth:0}}
                  onPress={() => {
                    if (currentRoute != 'home') {
                      this.props.navigation.navigate('home', {
                        proceedView: undefined,
                      });
                    }
                  }}>
                    {currentRoute == 'home' ? (
                   <Image source={Home} style={styles.routesImageView} />
                  ) : (
                    <Image source={Home} style={styles.routesImageView} />
                  )}  
                                
                </TouchableOpacity>

                <TouchableOpacity
                  style={{width: '33%',borderWidth:0}}
                  onPress={() => {
                    if (currentRoute != 'myorder') {
                      this.props.navigation.navigate('myorder', {
                        proceedView: undefined,
                      });
                    }
                  }}>                
                     {currentRoute == 'myorder' ? (
                   <Image source={MyOrder} style={styles.routesImageView} />
                  ) : (
                    <Image source={MyOrder} style={styles.routesImageView} />
                  )}                 
                </TouchableOpacity>

            
               

                <TouchableOpacity
                   style={{width: '33%',borderWidth:0}}
                  onPress={() => {
                    if (currentRoute != 'profile') {
                      this.props.navigation.navigate('profile', {
                        proceedView: undefined,
                      });
                    }
                  }}>
                
                {currentRoute == 'profile' ? (
                   <Image source={Profie} style={styles.routesImageView} />
                  ) : (
                    <Image source={Profie} style={styles.routesImageView} />
                  )}                    
                </TouchableOpacity>
                           
                </View>
            </View>
        )
    }
}


export default BottomNavigator;

const styles = StyleSheet.create({
    TabNavigatorView: {
      backgroundColor: '#a6a6a6',
      height: 60,
      borderColor: '#a6a6a6',
      borderWidth: 1,
      width: '103%',
      alignSelf:'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom:-3,
      // borderTopLeftRadius:30,
      // borderTopRightRadius:30
    },
    routesImageView: {
      alignSelf: 'center',
      height: 22,
      width: 22
    },
    routeTextView: {
      textAlign: 'center',
      fontSize: 12,  
      color: '#696969',
      paddingTop: 5,
    },
    selectedRouteTextView: {
      textAlign: 'center',
      fontSize: 12,
      fontWeight: '700',
      color: '#793422',
      paddingTop: 5,
    },
    routesImageView1:{
      height:70,
      width:30,
      alignSelf:'center',
      borderColor:'red',
      borderWidth:0,
      marginBottom:30
    },
  });