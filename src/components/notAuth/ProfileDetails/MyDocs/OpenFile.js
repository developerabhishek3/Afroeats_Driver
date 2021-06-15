import React, { Component,Fragment, } from 'react'
import {View,Text,BackHandler} from 'react-native'
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
            <View style={{flex:1,backgroundColor:"#000000"}}>
                    <WebView source={{ uri: this.state.document }} />
            </View>
        )
     
    }
}
