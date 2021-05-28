import React, {Component, Fragment} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView,Dimensions,BackHandler} from 'react-native';
import Styles from './indexCss';
import DatePicker from 'react-native-datepicker';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import calenderIcon from '../../../../assets/icons/191.png'
class MyCommsion extends Component {
    constructor(props){
        super(props)
        this.state={
            date:[
                {
                    "restro_name":"RESTAURANT AFRO",
                    "order_no":"#094547",
                    "address":"12 fevier 2019",
                    "amount":"32,45€"
                },
                {
                    "restro_name":"RESTAURANT AFRO",
                    "order_no":"#094547",
                    "address":"12 fevier 2019",
                    "amount":"32,45€"
                },
                {
                    "restro_name":"RESTAURANT AFRO",
                    "order_no":"#094547",
                    "address":"12 fevier 2019",
                    "amount":"32,45€"
                }
                
            ],
            from_date: new Date(),
            to_date: new Date(),
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
          <Text style={Styles.headerTxt}>Mes gains de livraison</Text>
        </View>
        {/* <View style={Styles.headerTopTxtView}>
          <TouchableOpacity>
            <Text style={Styles.headerTxt1}>de</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Text style={Styles.headerTxt1}>jusqu'a</Text>
          </TouchableOpacity>
        </View> */}
          <View style={Styles.subhaderView}>
          <View style={{flexDirection: 'column'}}>
          <Text style={Styles.subheadingTxt}>de</Text>
          <View style={{backgroundColor:"#000000",height:40,width:130,margin:4,marginRight:10}}>
              
              <DatePicker
                style={{width: SCREEN_WIDTH*0.40,borderWidth:0}}
                date={this.state.from_date}
                placeholder="Date of Birth"                    
                format="DD-MM-YYYY"   
                hideText={false}                
              // maxDate={this.state.date}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={calenderIcon}
                
                customStyles={{
                  dateIcon: {
                    left:-20,
                    height:18,width:18,
                  },
                  dateInput: {
                    marginLeft: 0,
                    color:"#FFFFFF",
                    borderColor: 'red',
                    borderWidth: 0,
                    marginRight: 0,
                  },          
                }}
                onDateChange={(from_date) => {
                  this.setState({from_date});
                }}
              />
              </View>
          {/* <View style={{borderColor: 'gray', borderWidth: 1, width: 130,marginStart:10}} /> */}
            
          </View>



          <View style={{flexDirection: 'column'}}>
            <Text style={Styles.subheadingTxt}>jusqu'à</Text>
          
            <View style={{backgroundColor:"#000000",height:40,width:130,margin:4,marginRight:10}}>
            <DatePicker
              style={{width: SCREEN_WIDTH*0.40,borderWidth:0}}
              date={this.state.to_date}
              placeholder="Date of Birth"                    
              format="DD-MM-YYYY"                   
              // maxDate={this.state.date}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
               iconSource={calenderIcon}                
                customStyles={{
                  dateIcon: {
                    left:-20,
                    height:18,width:18,
                  },                
                  dateInput: {
                    marginLeft: 0,
                    borderColor: 'red',
                    borderWidth: 0,
                    marginRight: 0,
                  },          
                }}
                onDateChange={(to_date) => {
                  this.setState({to_date});
                }}
              />
              </View>
                {/* <View style={{borderColor: 'gray', borderWidth: 1, width: 130}} /> */}
          </View>

          {/* <TouchableOpacity onPress={()=>{this.validate()}} style={{margin:10,backgroundColor:"#b41565",justifyContent:'center',alignItems:'center',height:30,marginTop:24}}>            
            <Text style={{fontSize:14,fontWeight:'700',color:"#FFFFFF",marginStart:15,marginEnd:15,margin:0}}>Go</Text>
            </TouchableOpacity> */}


        </View>
        <ScrollView>
            <View style={Styles.contentView}>
                    {
                        this.state.date.map((singleMAp)=>{
                            return(
                                
                                <TouchableOpacity 
                                    onPress={()=>{this.props.navigation.navigate("orderdetails")}}
                                style={{backgroundColor:"#404040",width:"100%",margin:7,alignSelf:"center",borderRadius:7}}>
                                    <View style={{flexDirection:"row",}}>
                                        <View>
                                             <Image source={require("../../../../assets/icons/27.jpg")} style={{width:150,height:120,margin:6,borderRadius:3}} />                                    
                                        </View>
                                        <View style={{margin:10}}>
                                            <Text style={{fontSize:15,fontWeight:"700",fontFamily:"Ariel",color:"#FFFFFF",margin:1}}>{singleMAp.restro_name}</Text>
                                            <Text style={{fontSize:12,fontWeight:"700",fontFamily:"Ariel",color:"#FFFFFF",margin:1}}>Numéro d'ordre {singleMAp.order_no}</Text>
                                            <Text style={{fontSize:12,fontWeight:"700",fontFamily:"Ariel",color:"#FFFFFF",margin:1}}>{singleMAp.address}</Text>                                            
                                            <Text style={{fontSize:17,fontWeight:"700",fontFamily:"Ariel",color:"#FFFFFF",margin:15,paddingTop:24,alignSelf:"flex-end",}}> {singleMAp.amount}</Text>
                                        </View>
                                        </View>
                                </TouchableOpacity>
                            )
                        })
                    }
            </View>
        </ScrollView>    
      </View>
    );
  }
}

export default MyCommsion;
