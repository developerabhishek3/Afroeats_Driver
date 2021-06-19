import React, {Component, Fragment} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView,Dimensions,TextInput,BackHandler,Alert} from 'react-native';
import Styles from './indexCss';
import DatePicker from 'react-native-datepicker';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import {getDriverfaq} from '../../../../Api/afterAuth';
import AsyncStorage from '@react-native-community/async-storage'
import SearchInput, {createFilter} from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['question', 'answer',];
import Spinner from 'react-native-loading-spinner-overlay';

import Collapsible from 'react-native-collapsible';
class QuestionAnswer extends Component {
    constructor(props){
        super(props)
        this.state={
          FAQs: [],
          searchTerm: '',
          isCollapseOpen:false,
          collapsed:{},
          isBodyLoaded:false,
          isSpinner:true
        }
    }

    getDriverfaqFunction = async () => {       
       
      const getDriverfaqResponse = await getDriverfaq();
      let isCollapsedData={}
      if (getDriverfaqResponse.result == true) {
      
        if (getDriverfaqResponse.response.error == 'true') {
          // console.log("getting here - i am abhishek - - -")
          this.setState({isBodyLoaded:true,isSpinner:false})         
          Alert.alert('Message', getDriverfaqResponse.response.errorMessage);
          if(getDriverfaqResponse.response.errorMessage == "Incompatibilité de jetons"){
              Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
              AsyncStorage.clear()
              this.props.navigation.navigate("login")
            }
        } else {
          console.log('getting reponse here=================',getDriverfaqResponse.response.record,);  
          var FAQs = getDriverfaqResponse.response.record
          FAQs.map((singleMap,Index) =>{
            let key=`collapsed${Index+1}`
            isCollapsedData={...isCollapsedData,[key]:true}
          })
          this.setState({isBodyLoaded:true,isSpinner:false,FAQs,collapsed:isCollapsedData})         
        }
      } else {
      Alert.alert('Error', getDriverfaqResponse.response.errorMessage);
        console.log('getting error here-------------');
      }
      return;
    };


    searchUpdated(term) {
      this.setState({searchTerm: term});
    }


    isCollapsedSelected(name,value){
      let data=this.state.collapsed
      data={...data,[name]:!value}
      this.setState({collapsed:data})
    }
    
    
    toggleExpanded1 = () => {
      //Toggling the state of single Collapsible
      this.setState({ collapsed2: !this.state.collapsed2 });
    };
    

    componentDidMount = async () => {  
      
      
      
      this.getDriverfaqFunction()
    
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

const {FAQs} = this.state;
    const filteredFAQs = FAQs.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
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

        <Spinner visible={this.state.isSpinner} />


        
                     <View style={{flexDirection:"row",backgroundColor:"#404040",width:SCREEN_WIDTH*0.9,alignSelf:"center",alignItems:'center',height:45,elevation:1,borderRadius:6,marginTop:10}}>
              <Image source={require("../../../../assets/icons/16.png")} style={{height:18,width:18,margin:10,}} />
            <SearchInput
             onChangeText={(term) => { this.searchUpdated(term) }} 
            //  placeholderTextColor="#404040"
             placeholder="  "
             style={{padding:0,margin:1,fontSize:15,fontWeight:"700",fontFamily:"Ariel",paddingStart:0,marginStart:0,color:"#FFFFFF",borderColor:"#FFFFFF",borderWidth:0,width:"85%",borderRadius:7,alignItems:"center",alignSelf:"center",width:SCREEN_WIDTH*0.8,height:40}}              
            />           
          </View>
                    <Text style={Styles.headerTxt1}>Question frequemment posees</Text>

      { 
          this.state.isBodyLoaded == true ?




          <ScrollView>


          {filteredFAQs.map((singleQuestion, index) => {
              let key=`collapsed${index+1}`
              return (              
                <View style={{flexWrap: 'wrap',borderWidth:0,width:SCREEN_WIDTH*0.84,alignSelf:'center',marginTop:10}}>
                  <TouchableOpacity onPress={() => this.isCollapsedSelected(key,this.state.collapsed[key])}>                  
                      <View style={{flexDirection:'row',justifyContent:'space-between',margin:4,borderWidth:0,borderColor:'red'}}> 
                          <Text style={Styles.headerTxt2}>
                            {singleQuestion.question}
                          </Text>
                          <Image source={require("../../../../assets/icons/downArrow.png")} style={{height:15,width:15,margin:10}} />
                      </View>                
                      <Collapsible  collapsed={this.state.collapsed[key]} align="center" style={{borderWidth:0}}>
                      <View style={{borderColor:'orange',borderWidth:0,height:90}}>
                        <Text style={Styles.headerTxt2}>{singleQuestion.answer}</Text>
                        </View>
                      </Collapsible>                   
                  </TouchableOpacity>               
                </View>            
              );
            })}
  
  
  
          </ScrollView> 

          :
          <View>
            <Text></Text>
          </View>


      }


        
      </View>
    );
  }
}

export default QuestionAnswer;
