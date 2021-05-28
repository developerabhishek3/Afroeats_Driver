import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  
  },
  headerView:{
    height:70,width:"100%",
    flexDirection:"row",
    alignItems:"center",
    paddingStart:20,
    justifyContent:"space-between",
  },
  headerTxt:{
    fontFamily:"Ariel",
    fontWeight:"700",
    fontSize:20,
    margin:10,color:"#ff8c2d",
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

  },
  headerIMG1:{
    height:36,width:36,margin:9,

  },
  continueBtn: {
    backgroundColor: '#ff8c2d',
    margin: 3,
    borderRadius: 5,
    alignSelf: 'center',
    margin:20,

  },
  continueBtnTxt: {
    margin: 10,
    fontFamily:"Ariel",
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
    marginStart:30,marginEnd:30,
    alignSelf: 'center',
  },
  continueBtn1: {
    backgroundColor: '#fb9846',
    margin: 0,
    borderRadius:3,
    margin:10,
    marginTop:50,
    justifyContent:"center",    
    alignSelf: 'center',    
    alignItems:'center'

  },
  continueBtnTxt1: {
    margin:7, 
    color: '#ff8c2d',
    fontWeight: '700',
    fontSize: 12, 
    alignSelf: 'center',
  },
  continueBtnTxt2: {
    margin:7,
    marginStart:30,marginEnd:30,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12, 
    alignSelf: 'center',
  },
});
