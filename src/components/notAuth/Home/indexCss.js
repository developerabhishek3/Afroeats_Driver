import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e30',  
  },
  headeView:{
      flexDirection:"row",
      margin:4,
      width:"99%",
      borderWidth:0,
      borderColor:"#FFFFFF",
      justifyContent:"space-between",
      alignItems:'center'
  },
  DropdownStyle:{
    color:"#FFFFFF",marginTop:6
  },
  headerTxt:{
      fontSize:16,fontWeight:"700",
      fontFamily:"Ariel",
      color:"#e2e2e3",margin:3,paddingStart:7,
      textAlign:"center"
  },
  continueBtn: {
    backgroundColor: '#ff8c2d',
    margin: 3,
    borderRadius: 10,
    width: '45%',
    alignSelf: 'center',
    margin:60,
  },
  continueBtnTxt: {
    margin: 10,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'center',
  },
});
