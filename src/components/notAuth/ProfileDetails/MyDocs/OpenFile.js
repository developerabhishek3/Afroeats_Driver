import React, { Component,Fragment, } from 'react'
import {View,Text,BackHandler,TouchableOpacity,Image} from 'react-native'
import { WebView } from 'react-native-webview';





export default class OpenFile extends Component {
    constructor(props) {
        super(props)
        this.state={
            document:""
        }
    }

    

    componentDidMount(){
        let docDate = this.props.navigation.getParam("document")
        this.setState({document:docDate})


        BackHandler.addEventListener('hardwareBackPress', () =>
        this.handleBackButton(this.props.navigation),
      );    
    }

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
        console.log("inide the render screen -  - - -",this.state.document)
        return (
            // <View style={{flex:1,backgroundColor:"#000000"}}>
            //         <WebView source={{ uri: this.state.document }} />
            // </View>
            <View style={{flex:1}}>          
            <View style={{ height:70,width:"100%",
    flexDirection:"row",
    alignItems:"center",
    paddingStart:20,
    backgroundColor: '#2e2e30',
    justifyContent:"space-between"}}>
                     <View style={{flexDirection:"row"}}>
                     <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image
            source={require('../../../../assets/icons/2.png')}
            style={{  height:36,width:36,margin:9,}}
          />
          </TouchableOpacity>
                        <Text style={{  fontFamily:"Ariel",
    fontWeight:"700",
    fontSize:20,
    margin:10,color:"#FFFFFF",}}>Mes documents</Text>
                    </View>
                </View>
            
                <WebView style={{backgroundColor:"#2e2e30"}} source={{ uri: this.state.document }} />
       </View>
        )
     
    }
}
