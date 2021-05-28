import React,{Component,Fragment} from 'react';
import {View,Text, ImageBackground,Image, TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
class Welcome extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          isLoading: true,
          isSpinner: true,
        }
      }
      async componentDidMount() {

        try{
          const userLoggedIn = await AsyncStorage.getItem('userLoggedIn') || 'false';   
            if(userLoggedIn == 'true'){
    
              console.log("geting login true side------------------")
              setTimeout(()=>{
                this.setState({ isLoading: false,isSpinner:false },()=>{
                  this.props.navigation.navigate('home');
                });
              },10);
            }
            else {
              setTimeout(()=>{
                console.log("geting login false side------------------")
                this.setState({ isLoading: false,isSpinner:false },()=>{
                  this.props.navigation.navigate('login');
                });
              },10);
            }      
        }
        catch(error){
          console.log("getting ERRROR============")
        }
      }
    render(){
        const { 
            isLoading
          } = this.state;
        return(
            <Fragment>
                  <Spinner visible={this.state.isSpinner}
        />
           {
         !isLoading &&  
           <ImageBackground source={require("../../../assets/bgImgs/2.png")} resizeMode="stretch" style={{flex:1}}>
                    <View>
                        <Image source={require("../../../assets/icons/logoTxt.png")} resizeMode="contain" style={{marginTop:60,alignSelf:"center"}} />
                    </View>


                    <View style={{flex:2,flexDirection:"row", justifyContent:"flex-end",alignItems:"flex-end",alignSelf:"center",marginBottom:90}}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("login")}}>
                            <Text style={{padding:9,color:"#FFFFFF",fontSize:18,fontFamily:"times-new-roman"}}>Se connecter</Text>
                        </TouchableOpacity>

                        <View style={{height:20,width:1,borderWidth:0.3,borderColor:"#FFFFFF",margin:9,marginTop:4}} />

                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("singup")}}>
                            <Text style={{padding:9,color:"#FFFFFF",fontSize:18,fontFamily:"times-new-roman",}}>S'incrire</Text>
                        </TouchableOpacity>
                    </View>
            </ImageBackground>
                    }
            </Fragment>
        )
    }
}

export default Welcome;