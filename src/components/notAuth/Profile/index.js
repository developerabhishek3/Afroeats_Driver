import React, {Component,Fragment} from 'react';
import {View,Text,Image,TouchableOpacity, ScrollView,Alert,BackHandler} from 'react-native';
import BottomNavigator from '../../../router/BottomNavigator'
import Styles from './indexCss';
import {getDriverProfile} from '../../../Api/afterAuth';
class Profile extends Component {




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
                <Image source={require("../../../assets/icons/logoTxt.png")} resizeMode="contain" style={{alignSelf:"center",height:27,width:'50%',margin:20}} />
                
                <View style={{flexDirection:"row"}}>
                    <Image source={require("../../../assets/icons/1.png")} style={{height:50,width:50,margin:7}} />
                    <View style={{margin:20}}>
                        <Text style={{color:"#e8af04",fontSize:18,fontWeight:"700",fontFamily:"Ariel"}}>Mon Profil</Text>
                        <Text style={{color:"#cdcdcd",fontSize:12,fontWeight:"600",fontFamily:"Ariel"}}>Ghita Benzakour</Text>
                    </View>
                </View>

                <ScrollView>
                    <TouchableOpacity  onPress={()=>{this.props.navigation.navigate("myprofile")}} style={{flexDirection:"row",margin:4,paddingStart:4,alignItems:"center",marginStart:20}}>
                        <Image source={require("../../../assets/icons/user.png")} style={{height:21,width:21,margin:7}} />
                        <Text style={{color:"#cdcdcd",fontSize:14,fontWeight:"600",fontFamily:"Ariel",margin:15}}>Mon Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("mydocs")}} style={{flexDirection:"row",margin:4,paddingStart:4,alignItems:"center",marginStart:20}}>
                        <Image source={require("../../../assets/icons/qq.png")} style={{height:21,width:21,margin:7}} />
                        <Text style={{color:"#cdcdcd",fontSize:14,fontWeight:"600",fontFamily:"Ariel",margin:15}}>Mes documents</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("mycommision")}}  style={{flexDirection:"row",margin:4,paddingStart:4,alignItems:"center",marginStart:20}}>
                        <Image source={require("../../../assets/icons/qw.png")} style={{height:21,width:21,margin:7}} />
                        <Text style={{color:"#cdcdcd",fontSize:14,fontWeight:"600",fontFamily:"Ariel",margin:15}}>Mes gains de livraison</Text>
                    </TouchableOpacity>

                    
                    <TouchableOpacity  onPress={()=>{this.props.navigation.navigate("parameter")}} style={{flexDirection:"row",margin:4,paddingStart:4,alignItems:"center",marginStart:20}}>
                        <Image source={require("../../../assets/icons/setting.png")} style={{height:21,width:21,margin:7}} />
                        <Text style={{color:"#cdcdcd",fontSize:14,fontWeight:"600",fontFamily:"Ariel",margin:15}}>Parameter</Text>
                    </TouchableOpacity>

                    
                    <TouchableOpacity  onPress={()=>{this.props.navigation.navigate("questionanswer")}}  style={{flexDirection:"row",margin:4,paddingStart:4,alignItems:"center",marginStart:20}}>
                        <Image source={require("../../../assets/icons/qe.png")} style={{height:21,width:21,margin:7}} />
                        <Text style={{color:"#cdcdcd",fontSize:14,fontWeight:"600",fontFamily:"Ariel",margin:15}}>J'ai une question</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={Styles.continueBtn}>
                        <Text style={Styles.continueBtnTxt}>Parameter vos amis et SE sur votre prochaire commande</Text>
                    </TouchableOpacity>


                    <Image source={require("../../../assets/icons/qr.png")} style={{height:40,width:40,margin:7,marginTop:-30,alignSelf:"flex-end"}} />

                </ScrollView>

                <BottomNavigator
                    currentRoute={'profile'}
                    navigation={this.props.navigation}
                />
            </View>
        )
    }
}

export default Profile;