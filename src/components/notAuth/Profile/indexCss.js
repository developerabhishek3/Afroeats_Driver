import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2e2e',
  
  },

  continueBtn: {
    backgroundColor: '#dda016',
    margin: 3,
    borderRadius: 5,
    alignSelf: 'center',
    margin:60,
    width:"80%"
  },
  continueBtnTxt: {
    margin: 10,

    color: '#000000',
    fontWeight: '700',
    fontSize: 9,
    alignSelf: 'center',
  },
});
