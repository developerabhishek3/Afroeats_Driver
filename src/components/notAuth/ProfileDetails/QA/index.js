import React, {Component, Fragment} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView,Dimensions,TextInput,BackHandler} from 'react-native';
import Styles from './indexCss';
import DatePicker from 'react-native-datepicker';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
class QuestionAnswer extends Component {
    constructor(props){
        super(props)
        this.state={
                    
        }
    }




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
    return (
      <View style={Styles.container}>
        <View style={Styles.headerView}>
        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image
            source={require('../../../../assets/icons/2.png')}
            style={Styles.headerIMG}
          />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>j'ai une question</Text>
        </View>

           <View style={{flexDirection:"row",backgroundColor:"#404040",width:"90%",alignSelf:"center",alignItems:'center',height:45,elevation:10,borderRadius:6,marginTop:10}}>
                    <Image source={require("../../../../assets/icons/16.png")} style={{height:18,width:18,margin:10,}} />
                        <TextInput
                            // value={this.state.telephone}
                            // onChangeText={(telephone)=>this.setState({telephone})}
                            // placeholder="Telephone"
                            // placeholderTextColor="#FFFFFF"
                            style={{padding:0,margin:1,fontSize:12,fontWeight:"700",fontFamily:"Ariel",paddingStart:15,color:"#FFFFFF",borderColor:"#FFFFFF",borderWidth:0,width:"85%",borderRadius:7,alignItems:"center",alignSelf:"center"}}
                        />
                    </View>
                    <Text style={Styles.headerTxt1}>Question frequemment posees</Text>
        <ScrollView>
            <View style={Styles.contentView}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",margin:4,borderColor:"red",borderWidth:0,marginStart:15,alignItems:"center"}}>
                        <Text style={Styles.headerTxt2}>Question frequemment posees</Text>
                        <Image source={require("../../../../assets/icons/ar.png")} style={{height:15,width:15,margin:10}} />
                    </View>

                    <View style={{flexDirection:"row",justifyContent:"space-between",margin:4,borderColor:"red",borderWidth:0,marginStart:15,alignItems:"center"}}>
                        <Text style={Styles.headerTxt2}>Question frequemment posees</Text>
                        <Image source={require("../../../../assets/icons/ar.png")} style={{height:15,width:15,margin:10}} />
                    </View>


                    <View style={{flexDirection:"row",justifyContent:"space-between",margin:4,borderColor:"red",borderWidth:0,marginStart:15,alignItems:"center"}}>
                        <Text style={Styles.headerTxt2}>Question frequemment posees</Text>
                        <Image source={require("../../../../assets/icons/ar.png")} style={{height:15,width:15,margin:10}} />
                    </View>


                    <View style={{flexDirection:"row",justifyContent:"space-between",margin:4,borderColor:"red",borderWidth:0,marginStart:15,alignItems:"center"}}>
                        <Text style={Styles.headerTxt2}>Question frequemment posees</Text>
                        <Image source={require("../../../../assets/icons/ar.png")} style={{height:15,width:15,margin:10}} />
                    </View>


            </View>
        </ScrollView>    
      </View>
    );
  }
}

export default QuestionAnswer;
