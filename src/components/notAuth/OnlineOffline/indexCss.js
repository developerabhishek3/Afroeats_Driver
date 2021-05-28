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
  headeView:{
    flexDirection:"row",
    margin:4,
    width:"99%",
    borderWidth:0,
    backgroundColor:"#2e2e30",
    borderColor:"#FFFFFF",
    justifyContent:"space-between",
    alignItems:'center'
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
