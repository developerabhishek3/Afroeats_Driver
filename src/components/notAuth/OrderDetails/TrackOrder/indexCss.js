import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e30',
    borderWidth: 0,
    borderColor: 'red',
  },
  headerView:{
    height:60,width:"100%",
    flexDirection:"row",
    alignItems:"center",
    paddingStart:20,
    justifyContent:"space-between"
  },
  headerTxt:{
    fontFamily:"Ariel",
    fontWeight:"700",
    fontSize:20,
    alignSelf:'center',
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
    height:36,width:36,margin:1,

  },headerTopTxtView:{
    flexDirection:"row",justifyContent:"space-between",width:"90%",
    alignSelf:"center"
  },
  mainContainer:{
      flex:2,
      
  },

  upperContentView:{
      width:"90%",
      alignSelf:'center',
      height:160,
      marginTop:10,
      borderRadius:7,
      backgroundColor:"#0c1129",
      borderColor:"#707070",
      borderWidth:3,
      justifyContent:'center',alignItems:'center'
  },
  btnStyles: {
    backgroundColor: '#ff8c2d',
    margin: 20,
    borderRadius: 10,
    justifyContent:'center',  
    alignSelf:"center",
    marginBottom:30,
  },
  btnTextStyle: {
    marginStart: 30,
    marginEnd: 30,
    margin: 10,
    fontSize: 14,
    color:"#FFFFFF",
    textAlign:"center",
    fontWeight:"700",
    fontFamily:"Ariel"
  }

});
