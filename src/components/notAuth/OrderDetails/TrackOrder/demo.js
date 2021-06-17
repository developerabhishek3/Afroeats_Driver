import React from 'react';
import { geolib, ImageBackground, StatusBar, TextInput, ActivityIndicator, View, ScrollView, Text, Image, Button, Dimensions, TouchableOpacity, Linking, AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import strings from './localization';
import RBSheet from "react-native-raw-bottom-sheet";
import Geolocation from '@react-native-community/geolocation';


const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
var pickupMarker = [];

var cur_lat
var cur_long


const { width, height } = Dimensions.get("window");
import PopupDialog, {
  DialogTitle, DialogContent, DialogFooter, DialogButton, SlideAnimation, ScaleAnimation,
} from 'react-native-popup-dialog';


import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBbBQGifDkFrJdCIS9Oi6KNDaWm0ALn9Jo';


export default class FoodpickupAddress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deatailDialog: false,
      cancelDialog: false,
      animating: false,loop_time:'',loop_distance:'',
      lodingDialog: false,
      token: '',price_alert:false,
      number: 5,
      userid: '',
      currentlatitude: 37.78825,
      currentlongitude: -122.4324,
      order_id: '',alert1:false,
      profile_status: '',price_value:'',
      order_status: 5,
      pick_up_latitude: 22.7529416,
      pick_up_longitude: 75.8926063,
      delivery_latitude: 22.7529416,
      delivery_longitude: 75.8926063,
      pickup_true:false,

      data: '',

      markersPickup: [
        {
          coordinate: {
            latitude: 23.2599,
            longitude: 77.4126
          },
        }
      ],
      markerDelivery :[
        {
          coordinate: {
            latitude: 23.2599,
            longitude: 77.4126
          },
        }
      ]




    }
    console.log('Order Id', this.props.order_id)
  };

  componentWillMount() {
   //alert('uhgfc')
    //return new Promise((resolve, reject) => {
      const { navigation } = this.props;
      navigation.addListener('willFocus', () => {

      Geolocation.watchPosition(success => {
          console.log("success watchman:::" + JSON.stringify(success));
          cur_lat =success.coords.latitude
          cur_long= success.coords.longitude
          this.setState({
            currentlatitude: success.coords.latitude,
            currentlongitude: success.coords.longitude,
          })
       
          this.map.animateToRegion({
            latitude: cur_lat,
            longitude: cur_long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          })
          this.getTrackData(success.coords.latitude,success.coords.longitude)
          this.loop_call()
        },
        );
      
    Geolocation.getCurrentPosition(info => {
      console.log('Current Latitude TrackOrder ', info.coords.latitude)
      console.log('Current Longitude TrackOrder ', info.coords.longitude)
      cur_lat =info.coords.latitude
      cur_long= info.coords.longitude
      this.getTrackData(info.coords.latitude,info.coords.longitude)
      this.loop_call()
      this.setState({
        currentlatitude: info.coords.latitude,
        currentlongitude: info.coords.longitude,
      })
    },
    ); 
  //})
    
  })

  }

 


  alertBox(data) {
    Alert.alert(
      strings.alert,
      data,
      [

        { text: "Ok", onPress: () => console.log('cancel Pressed'), style: 'cancel', },
      ],
      { cancelable: true },
    )

  }
final_push(){
this.setState({price_alert:false})
 // Actions.push('FoodRating', { order_id: this.props.order_id })
 Actions.push('Home')
}
  
  componentWillUnmount() {
   Geolocation.clearWatch(watchID);

    //clearInterval(this.state.location_api_call)
}
  render() {
    // var from = turf.point([-75.343, 39.984]);
    var markerArray = [];
    markerArray.push({
      coordinate: {
        latitude: this.state.currentlatitude,
        longitude: this.state.currentlongitude,
      },
    });


    // let newlyAddedValue = {
    //   latitude: this.state.pick_up_latitude,
    //   longitude: this.state.pick_up_longitude
    // }

    // let newDeliveryvalue = {
    //   latitude: this.state.delivery_latitude,
    //   longitude: this.state.delivery_longitude
    // }


    // let driverlatlong = {
    //   latitude: this.state.currentlatitude,
    //   longitude: this.state.currentlongitude
    // }

   
    return (

      <View style={styles.containerWhite}>
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
       




          <View style={{ flex: 1, backgroundColor: 'blue' }}>
{cur_long != '' &&cur_long != null?
            <MapView style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            ref = {(ref)=>this.map=ref}
              initialRegion={{
                latitude: cur_lat,
                longitude: cur_long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
             // this.map.animateToRegion(this.state.initialRegion);
              mapType={'standard'}
              customMapStyle={mapStyle} 
             provider={PROVIDER_GOOGLE}
             minZoomLevel={2}  // default => 0
             maxZoomLevel={15} // default => 20
           
              //enableZoomControl={true}
              showsMyLocationButton={true}
              //zoomEnabled={true}
            >
              {!!this.state.currentlatitude && !!this.state.currentlongitude && <MapView.Marker
              //  image={require('../assets/truck_icon.png')} image={require('../assets/truck_icon.png')}

                coordinate={{ "latitude": cur_lat, "longitude": cur_long }}
              >
                <Image source ={require('../assets/bike1.png')} style={{width:30,height:30,resizeMode:'contain'}} />
              </MapView.Marker>}

              {markerArray.map((marker, index) => (
                <MapView.Marker
                  image={require('../assets/map_icon.png')}
                  coordinate={marker.coordinate}
                />
              ))}

              {/* {this.state.markersPickup.map((marker, index) => (
                <MapView.Marker
                  coordinate={marker.coordinate}
                  image={require('../assets/map_icon2.png')}
                />
              ))} */}
              {this.state.pickup_true == true && (
                <View>
                   {this.state.markerDelivery.map((marker, index) => (
                <MapView.Marker
                  coordinate={marker.coordinate}
                  image={require('../assets/map_icon2.png')}
                />
              ))}

                </View>
              )

              }
               {this.state.pickup_true == false && (
                <View>
                   {this.state.markersPickup.map((marker, index) => (
                <MapView.Marker
                  coordinate={marker.coordinate}
                  image={require('../assets/map_icon2.png')}
                />
              ))}

                </View>
              )

              }

              {this.state.pickup_true == true && cur_long !='' && cur_lat !=null&&this.state.delivery_latitude!= ''&&this.state.delivery_latitude!= null&& (
                <MapViewDirections
                origin={{
                  latitude: cur_lat,
                  longitude: cur_long
                }}
               
                destination={{
                  latitude: this.state.delivery_latitude,
                  longitude: this.state.delivery_longitude
                }}
                apikey={'AIzaSyBbBQGifDkFrJdCIS9Oi6KNDaWm0ALn9Jo'}
                strokeWidth={5}
                zoomEnabled={true}
                strokeColor="#1E90FF"
              />
              )
              }
                {this.state.pickup_true == false && cur_long !='' && cur_lat !=null&&this.state.pick_up_latitude!=''&& this.state.pick_up_latitude!=null&& (
                <MapViewDirections
                origin={{
                  latitude: cur_lat,
                  longitude: cur_long
                }}
                destination={{
                  latitude: this.state.pick_up_latitude,
                  longitude: this.state.pick_up_longitude
                }}
                apikey={'AIzaSyBbBQGifDkFrJdCIS9Oi6KNDaWm0ALn9Jo'}
                strokeWidth={5}
                zoomEnabled={true}
                strokeColor="#1E90FF"
              />
              )
              }

              
            </MapView>
          :null}
          </View>

        
    
          
        </View>
      </View>
    );
  }
}
