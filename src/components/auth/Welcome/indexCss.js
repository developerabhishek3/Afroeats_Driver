
import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F2EF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bgImgStyle: {
    flex: 2,
    borderWidth: 0,
    width: '100%',
  },
  continueBtn: {
    backgroundColor: '#b41565',
    margin: 3,
    borderRadius: 5,
    width: '50%',
    alignSelf: 'center',
  },
  headerView: {
    marginTop: -20,
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
    fontSize: 26,
    fontWeight: '700',
    margin: 1,
    color: '#FFFFFF',
    marginStart: 50,
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
  continueBtnTxt: {
    margin: 10,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'center',
  },
});
