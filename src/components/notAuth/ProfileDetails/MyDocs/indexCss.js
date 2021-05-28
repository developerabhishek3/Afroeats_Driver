import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e30',
  
  },
  headerView:{
    height:70,width:"100%",
    flexDirection:"row",
    alignItems:"center",
    paddingStart:20,
    justifyContent:"space-between"
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

  },
  headerIMG1:{
    height:36,width:36,margin:9,

  },
  continueBtn: {
    backgroundColor: '#dda016',
    margin: 3,
    borderRadius: 5,
    alignSelf: 'center',
    margin:20,

  },
  continueBtnTxt: {
    margin: 10,
    fontFamily:"Ariel",
    color: '#000000',
    fontWeight: '600',
    fontSize: 14,
    marginStart:30,marginEnd:30,
    alignSelf: 'center',
  },
  continueBtn1: {
    backgroundColor: '#fb9846',
    margin: 0,
    borderTopRightRadius:6,
    borderBottomEndRadius:6,
    width:100,
    justifyContent:"center",    
    alignSelf: 'center',
    margin:20,
    height:"100%",
    alignItems:'center',marginRight:-1

  },
  continueBtnTxt1: {
    margin:7,
  
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12, 
    alignSelf: 'center',
  },
});
