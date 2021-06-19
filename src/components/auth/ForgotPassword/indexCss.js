import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  
  },

  bgImgStyle: {
    flex: 2,
    borderWidth: 0,
    width: '100%',
  },
 
  headerView: {
    flexDirection:"row",
    borderWidth:0,
    alignItems:"center",

  },
  backArrowStyles:{
    height:34,
    width:34,
    margin:15
  },
  headerLogo: {
    height: 80,
    width: 60,
    margin: 3,
    marginEnd: 50,
    marginTop:20,
    alignSelf: 'center',
  },
  headerTxt: {
    margin: 1,
    fontSize:22,
    color: '#ff8c2d',
    fontWeight:"700",
    marginStart: 50,
    fontFamily:"Arial-Bold"
  },
  forgotPwd: {
    alignSelf: 'flex-end',
    margin: 3,
    color: 'green',
    fontWeight: '700',
  },
  txtStyle: {
    fontSize: 15,
    fontWeight: '600',
    marginStart: 20,
    alignSelf: 'flex-start',
    marginBottom: 30,
    margin: 10,
  },
  subHeader: {
    marginTop: 80,
    margin: 10,
  },
  txtStyle1: {
    fontSize: 16,
    fontWeight: '600',
    marginStart: 10,
    alignSelf: 'flex-start',
    color: 'gray',
  },
  txtStyle2: {
    fontSize: 15,
    fontWeight: '600',
    marginStart: 20,
    alignSelf: 'flex-start',
    color: 'gray',
  },
  txtStyle3: {
    fontSize: 16,
    fontWeight: '700',
    marginStart: 0,
    alignSelf: 'flex-start',
    color: 'green',
  },

  textInputView: {
    borderWidth: 0,
    width: '96%',
    margin: 30,
    alignSelf: 'center',
  },

  textInputField: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    margin: 10,
    color:"gray",
    paddingStart: 10,
    fontFamily:"OpenSans-Regular"
  },
  textInputField1: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    margin: 10,
    paddingStart: 10,
    fontFamily:"OpenSans-Regular"
  },

  socialLogo: {
    height: 30,
    width: 30,
    margin: 16,
    alignSelf: 'center',
  },
  continueBtn: {
    backgroundColor: '#ff8c2d',
    margin: 3,
    borderRadius: 5,
    width: '40%',
    alignSelf: 'center',
    margin:30,
  },
  continueBtnTxt: {
    margin: 10,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'center',
  },
  mainContainer:{
    flex:2,
    width:"100%",
    alignSelf:'center',
    borderWidth:0,
    borderColor:"red",
    marginTop:10,marginBottom:10
}, mainContainer:{
  flex:2,
  width:"100%",
  alignSelf:'center',
  borderWidth:0,
  borderColor:"red"
},
textInputMainView:{
alignSelf:'center',
width:"100%",
borderWidth:0,
borderColor:"red",
marginTop:30,
},    
input:{
fontSize:12,
color:"#313131",
borderWidth:0,
width:"100%",
padding:7,paddingStart:30,
alignSelf:"center",
borderBottomColor:"#DDDDDD",borderBottomWidth:1,
},
label:{
fontSize:10,  fontFamily:"Arial",
color:"#313131",
marginStart:0,
fontWeight:"700"

},
OuStyle:{
  color:"gray",
  fontWeight:"700",
  fontFamily:"Arial",
  alignSelf:"center"
},
formInput:{

  borderWidth:0,borderColor:"red"      
},
singupTxt:{
  color:"#ff8c2d",
  alignSelf:"center",
  margin:15,
  fontWeight:"700",
  fontSize:16,
  fontFamily:"Arial",
  textDecorationLine: 'underline',
  
  
},

continueBtn1: {
  flexDirection:"row",
  backgroundColor: '#4c5c94',
  margin: 3,
  borderRadius: 5,
  width: '40%',
  alignSelf: 'center',
  margin:30,
},
continueBtnTxt1: {
  margin: 1,

  color: '#FFFFFF',
  fontWeight: '700',
  fontSize: 9,
  alignSelf: 'center',
  fontFamily:"Arial",
},

continueBtn2: {
  flexDirection:"row",
  backgroundColor: '#d34e3e',
  margin: 3,
  borderRadius: 5,
  width: '40%',
  alignSelf: 'center',
  margin:0,
},
continueBtnTxt2: {
  margin: 1,  
  color: '#FFFFFF',
  fontWeight: '700',
  fontSize: 9,
  alignSelf: 'center',
  fontFamily:"Arial",
},

});
