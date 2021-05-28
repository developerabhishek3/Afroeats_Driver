import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e30',
  
  },
  headerView:{
    height:60,width:"100%",
    flexDirection:"row",
    alignItems:"center",
    paddingStart:20
  },
  headerTxt:{
    fontFamily:"Ariel",
    fontWeight:"700",
    fontSize:20,
    
    margin:10,color:"#FFFFFF",
  },
  headerTxt1:{
    fontFamily:"Ariel",
    fontWeight:"700",
    fontSize:20,
    margin:10,color:"#fcfcfc",
  },
  headerTxt2:{
    fontFamily:"Ariel",
    fontWeight:"700",
    fontSize:20,
    margin:10,color:"#fc6e3d",
  },
  headerIMG:{
    height:36,width:36,margin:9,

  },headerTopTxtView:{
    flexDirection:"row",justifyContent:"space-between",width:"90%",
    alignSelf:"center"
  },
  contentView:{
    flex:2,borderColor:"red",
    marginBottom:20,
  },
  continueBtn: {
    backgroundColor: '#dda016',
    borderRadius: 5,  
    alignSelf: 'center',
    margin:20,
  },
  continueBtnTxt: {
    margin: 7,
    marginStart:20,marginEnd:20,
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
    alignSelf: 'center',
    fontFamily:"Ariel"
  },


});
