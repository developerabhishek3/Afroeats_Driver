import React,{Component} from 'react';
import {View,Text,TouchableOpacity,Image,ScrollView, ImageBackground,Switch,Modal,Dimensions,BackHandler,Alert} from 'react-native';

import Styles from './indexCss'

// import MapView from 'react-native-maps';  
// import { Marker } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import Spinner from 'react-native-loading-spinner-overlay';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import {driverTrackOrder,pickedupOrder,orderDelivered} from '../../../../Api/afterAuth';

import AsyncStorage from '@react-native-community/async-storage';
var mapStyle =[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eff1f1"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9d7da"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9d7da"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#cbe6e6"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]


const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
var pickupMarker = [];

var cur_lat
var cur_long




console.disableYellowBox = true;
class PartnerNearMe extends Component {
  constructor(props){
    super(props)
    this.state={
        isEnabled:false,
        Model_Visibility: false,
        Alert_Visibility: false,
        isSwitchOn: false,
        shipping_charge:0,
        switchValue: false,  
        // currentLatitude:0,
        // currentLongitude:0,     
        isBodyLoaded: false,
        isSpinner: true,  
        pickup_true:true,
        status:"",
        statusText:"",
        region: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        //  for mapping 
        currentlatitude: 37.78825,
        currentlongitude: -122.4324,
        pick_up_latitude: 22.7529416,
        pick_up_longitude: 75.8926063,
        delivery_latitude: 22.7529416,
        delivery_longitude: 75.8926063,
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
}
  async toggleSwitch(){
    this.setState({isEnabled:!this.state.isEnabled})
}

Show_Custom_Alert(visible) {
  this.setState({Alert_Visibility: visible});
}

Hide_Custom_Alert() {
  console.log("inside hidfe ==============")
  this.setState({Alert_Visibility: false});
  // this.props.navigation.navigate("home")
}

Hide_Custom_Alert1() {
  this.setState({Alert_Visibility: false});
  this.props.navigation.navigate("myorder")
}

getCurrentLocationOnTrack(){
    
    Geolocation.getCurrentPosition(pos => {
        this.setState({currentLatitude:pos.coords.latitude,currentLongitude:pos.coords.longitude })      
      }, err => {
        // console.error(err);
        // alert("fetching position failed")
      });

   }

   updateDriverStatus() {
    return new Promise((resolve, reject) => {
      Geolocation.watchPosition(success => {
          console.log("success watchman:::" + JSON.stringify(success));
          this.setState({
            currentlatitude: info.coords.latitude,
            currentlongitude: info.coords.longitude,
          })
        },
        );
    Geolocation.getCurrentPosition(info => {
      cur_lat =info.coords.latitude
      cur_long= info.coords.longitude
      this.setState({
        currentlatitude: info.coords.latitude,
        currentlongitude: info.coords.longitude,
      })
    },
    );
  })
}


   



driverTrackOrderFunction = async () => {       
  const user_id = await AsyncStorage.getItem('user_id');
  let orderId = this.props.navigation.getParam("orderId") 
  const UserId = JSON.parse(user_id)    
  const driverTrackOrderResponse = await driverTrackOrder({order_id:orderId});
  if (driverTrackOrderResponse.result == true) {
  
    if (driverTrackOrderResponse.response.error == 'true') {
      // console.log("getting here - i am abhishek - - -")
      this.setState({isBodyLoaded:true,isSpinner:false})         
      Alert.alert('Message', driverTrackOrderResponse.response.errorMessage);
      if(driverTrackOrderResponse.response.errorMessage == "Incompatibilité de jetons"){
          Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
          AsyncStorage.clear()
          this.props.navigation.navigate("login")
        }
    } else {
      // console.log('getting reponse here=================',driverTrackOrderResponse.response.order_record,);
      let status =   driverTrackOrderResponse.response.order_record.status;
      let pick_up_latitude = driverTrackOrderResponse.response.order_record.latitude;
      let pick_up_longitude = driverTrackOrderResponse.response.order_record.longitude;
      let delivery_latitude = driverTrackOrderResponse.response.order_record.delivery_latitude      
      let delivery_longitude = driverTrackOrderResponse.response.order_record.delivery_longitude
      let statusText = driverTrackOrderResponse.response.order_record.status_message
      let shipping_charge = driverTrackOrderResponse.response.order_record.shipping_charge

      this.setState({isBodyLoaded:true,statusText,shipping_charge,isSpinner:false,status,pick_up_latitude,pick_up_longitude,delivery_latitude,delivery_longitude})         
    }
  } else {
    this.myAlert('Error', driverTrackOrderResponse.response.errorMessage);
    console.log('getting error here-------------');
  }
  return;
};








// for pickup order  . . . . . . .
PickuporderFunction(){  
  
  
  this.setState({ isSpinner: true }, async () => { 

    const user_id = await AsyncStorage.getItem('user_id');
    let orderId = this.props.navigation.getParam("orderId") 
    const UserId = JSON.parse(user_id)    
    const PickuporderResponse = await pickedupOrder({
      order_id:orderId,
      driver_id:UserId
    });
    if (PickuporderResponse.result == true) {
      this.setState({isSpinner:false})
      if (PickuporderResponse.response.error == 'true') {
        // console.log("getting here - i am abhishek - - -")
        this.setState({isBodyLoaded:true,isSpinner:false})         
        Alert.alert('Message', PickuporderResponse.response.errorMessage);
        if(PickuporderResponse.response.errorMessage == "Incompatibilité de jetons"){
            Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
            AsyncStorage.clear()
            this.props.navigation.navigate("login")
            this.setState({isSpinner:false})
          }
      } else {
        console.log('getting reponse inside the pickup order =================',PickuporderResponse.response,);
        this.driverTrackOrderFunction()  
        this.setState({isBodyLoaded:true,isSpinner:false,})         
      }
    } else {
      this.setState({isSpinner:false})
      this.myAlert('Error', driverTrackOrderResponse.response.errorMessage);
      console.log('getting error here-------------');
    }
    return;


  })

};





// for pickup delivered  . . . . . . .
DeliveredOrderFunction() {    
  
  this.setState({ isSpinner: true }, async () => { 

    const user_id = await AsyncStorage.getItem('user_id');
    let orderId = this.props.navigation.getParam("orderId") 
    const UserId = JSON.parse(user_id)    
    const DeliveredOrderResponse = await orderDelivered({
      order_id:orderId,
      driver_id:UserId
    });
    if (DeliveredOrderResponse.result == true) {
      this.setState({isSpinner:false})
      if (DeliveredOrderResponse.response.error == 'true') {
        // console.log("getting here - i am abhishek - - -")
        this.setState({isBodyLoaded:true,isSpinner:false})         
        Alert.alert('Message', DeliveredOrderResponse.response.errorMessage);
        if(DeliveredOrderResponse.response.errorMessage == "Incompatibilité de jetons"){
            Alert.alert("","La session a expiré. Veuillez vous connecter à nouveau")
            AsyncStorage.clear()
            this.props.navigation.navigate("login")
            this.setState({isSpinner:false})
          }
      } else {
        console.log('getting reponse inside the pickup order =================',DeliveredOrderResponse.response,);
        
        this.setState({isBodyLoaded:true,isSpinner:false,})   
        this.driverTrackOrderFunction()    
        this.showAlert1()    
      }
    } else {
      this.myAlert('Error', driverTrackOrderResponse.response.errorMessage);
      console.log('getting error here-------------');
        this.setState({isSpinner:false})
    }
    return;

   })
 
};



componentDidMount = async () => { 

    // setInterval(() => {
        // setInterval(() => {
          this.driverTrackOrderFunction()  
        // }, 3000);

   
   
     
  
    BackHandler.addEventListener('hardwareBackPress', () =>
        this.handleBackButton(this.props.navigation),
    );      
};






// componentWillMount() {
//   //alert('uhgfc')
//    //return new Promise((resolve, reject) => {
//      const { navigation } = this.props;
//      navigation.addListener('willFocus', () => {

//      Geolocation.watchPosition(success => {
//          console.log("success watchman:::" + JSON.stringify(success));
//          cur_lat =success.coords.latitude
//          cur_long= success.coords.longitude
//          this.setState({
//            currentlatitude: success.coords.latitude,
//            currentlongitude: success.coords.longitude,
//          })
      
//          this.map.animateToRegion({
//            latitude: cur_lat,
//            longitude: cur_long,
//            latitudeDelta: LATITUDE_DELTA,
//            longitudeDelta: LONGITUDE_DELTA,
//          })
//         //  this.getTrackData(success.coords.latitude,success.coords.longitude)
//         //  this.loop_call()
//        },
//        );
     
//    Geolocation.getCurrentPosition(info => {
//      console.log('Current Latitude TrackOrder ', info.coords.latitude)
//      console.log('Current Longitude TrackOrder ', info.coords.longitude)
//      cur_lat =info.coords.latitude
//      cur_long= info.coords.longitude
//      this.getTrackData(info.coords.latitude,info.coords.longitude)
//      this.loop_call()
//      this.setState({
//        currentlatitude: info.coords.latitude,
//        currentlongitude: info.coords.longitude,
//      })
//    },
//    ); 
//  //})
   
//  })





//  BackHandler.removeEventListener('hardwareBackPress', () =>
//  this.handleBackButton(this.props.navigation),
// );
//  }





 componentWillMount() {
     
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
   //  this.getTrackData(success.coords.latitude,success.coords.longitude)
   //  this.loop_call()
  },
  );

Geolocation.getCurrentPosition(info => {
console.log('Current Latitude TrackOrder ', info.coords.latitude)
console.log('Current Longitude TrackOrder ', info.coords.longitude)
cur_lat =info.coords.latitude
cur_long= info.coords.longitude
console.log("gettug curene  -  - - -",cur_lat,cur_long)
//  this.getTrackData(info.coords.latitude,info.coords.longitude)
//  this.loop_call()
this.setState({
  currentlatitude: info.coords.latitude,
  currentlongitude: info.coords.longitude,
})
},
); 
      
 BackHandler.removeEventListener('hardwareBackPress', () =>
  this.handleBackButton(this.props.navigation),
 );
  
 }



//  componentWillUnmount() {
//   Geolocation.clearWatch(watchID);

//    //clearInterval(this.state.location_api_call)
// }


showAlert1() {  
  Alert.alert(  
      'Commande livrée avec succès !',  
      `Félicitations Vous avez obtenu ${this.state.shipping_charge} €`,  
      [                
          {text: 'OK', onPress: () =>{this.props.navigation.navigate("home")}},  
      ]  
  );  
}

handleBackButton = (nav) => {
  if (!nav.isFocused()) {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
    return false;
  } else {
    nav.goBack();
    return true;
  }
};

onRegionChange(region) {
  this.setState({ region });
}


    render(){

      var markerArray = [];
      markerArray.push({
        coordinate: {
          latitude: this.state.currentlatitude,
          longitude: this.state.currentlongitude,
        },
      });
  

      console.log("status value =  = = = = = = =",this.state.status)


        const {currentLatitude,currentLongitude} = this.state;
        //  console.log("Getting current lat long delta", this.state.pick_up_latitude, this.state.pick_up_longitude,this.state.status)
        // let newlat = JSON.parse(currentLatitude)
        // let newLong = JSON.parse(currentLongitude)

        // console.log("Getting current lat long delta", currentLatitude,currentLongitude)
        let delivery_address = this.props.navigation.getParam("delivery_address")
        let delivery_latitude = this.props.navigation.getParam("delivery_latitude")
        let delivery_longitude = this.props.navigation.getParam("delivery_longitude")
        let lat = this.props.navigation.getParam("lat")
        let long = this.props.navigation.getParam("long")
       
        return(
            <View style={Styles.container}>
             <View style={Styles.headerView}>
        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image
            source={require('../../../../assets/icons/2.png')}
            style={Styles.headerIMG}
          />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Address de Livraison</Text>          
          <Text style={Styles.headerTxt}>         </Text>      
        </View>        
                <TouchableOpacity>
                        <View style={{backgroundColor:"#2e2e30",width:"94%",alignSelf:'center',margin:10,borderRadius:6,flexDirection:'row',}}>
                        <Image source={require("../../../../assets/icons/address1.png")} style={{height:24,width:24,margin:4}} />
                            <Text style={{color:"#FFFFFF",margin:5,fontFamily: "Ariel",marginEnd:7,fontSize:13,fontWeight:"600"}}>{delivery_address}</Text>                                
                        </View>
                    </TouchableOpacity>

{
  this.state.isBodyLoaded == true ?


  <View style={Styles.mainContainer}>  

                
  {cur_long != '' && cur_long != null?
                      
        <View>  

        {/* <MapView  
          style={{ position: 'absolute',  
          top: 0,  
          left: 0,  
          right: 0,  
          bottom: 0,  }}  
          showsUserLocation={true}  
          zoomEnabled={true}    
          provider={PROVIDER_GOOGLE}
          minZoomLevel={2}  
          maxZoomLevel={15} 
          enableZoomControl={true}
          customMapStyle={mapStyle} 
          showsMyLocationButton={true}            
          initialRegion={{                     
          latitude:cur_lat,
          longitude:cur_long,
          latitudeDelta: 0.0922,  
          longitudeDelta: 0.0421,  
          
          }}
          
          >  */}


<MapView  
    style={{ position: 'absolute',  
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  }}  
    showsUserLocation={true}  
    zoomEnabled={false}    
    minZoomLevel={1}
    maxZoomLevel={200}
    enableZoomControl={true}
    initialRegion={{  
      // latitude:parseFloat(this.state.latitude),   
      // longitude:parseFloat(this.state.longitude),
      latitude:48.8566,
      longitude:2.3522,
      latitudeDelta: 0.0922,  
      longitudeDelta: 0.0421,  
    }}>  


    {!!this.state.currentlatitude && !!this.state.currentlongitude && 
    <MapView.Marker
  //  image={require('../assets/truck_icon.png')} image={require('../assets/truck_icon.png')}

    coordinate={{ "latitude": cur_lat, "longitude": cur_long }}
  >
    <Image source={require('../../../../assets/icons/dboy.png')} style={{width:30,height:30,resizeMode:'contain'}} />
  </MapView.Marker>}



  {!!this.state.pick_up_latitude && !!this.state.pick_up_longitude && this.state.status == 3 &&
    <MapView.Marker
  //  image={require('../assets/truck_icon.png')} image={require('../assets/truck_icon.png')}

    coordinate={{ "latitude": JSON.parse(this.state.pick_up_latitude), "longitude": JSON.parse(this.state.pick_up_longitude) }}
  >
    <Image source={require('../../../../assets/icons/logo.png')} style={{width:30,height:30,resizeMode:'contain'}} />
  </MapView.Marker>}



  {!!this.state.delivery_latitude && !!this.state.delivery_longitude && this.state.status == 6 &&
    <MapView.Marker
  //  image={require('../assets/truck_icon.png')} image={require('../assets/truck_icon.png')}

    coordinate={{ "latitude": JSON.parse(this.state.delivery_latitude), "longitude": JSON.parse(this.state.delivery_longitude) }}
  >
    <Image source={require('../../../../assets/icons/logo.png')} style={{width:30,height:30,resizeMode:'contain'}} />
  </MapView.Marker>}



  {this.state.status == 3 && cur_long !='' && cur_lat !=null&&this.state.pick_up_latitude!=''&& this.state.pick_up_latitude!=null&& (
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
  {this.state.status == 6 && cur_long !='' && cur_lat !=null&&this.state.delivery_latitude!=''&& this.state.delivery_longitude!=null&& (
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
         




        </MapView>  
        </View>
    :null
    }






    {
      this.state.status == 3 ?

      <View style={{position:"absolute",bottom:30,alignSelf:'center'}}>
      <TouchableOpacity style={Styles.btnStyles}  onPress={()=>{this.PickuporderFunction()}}>
        
                      <Text style={Styles.btnTextStyle}>
                        Pickup
                      </Text>                  
            </TouchableOpacity>  
      </View>

      :
      null

    }

    {
      this.state.status == 6 ?

      <View style={{position:"absolute",bottom:30,alignSelf:'center'}}>
      <TouchableOpacity style={Styles.btnStyles}  onPress={()=>{this.DeliveredOrderFunction()}}>
        
                      <Text style={Styles.btnTextStyle}>
                      livrée
                      </Text>                  
            </TouchableOpacity>  
      </View>

      :
      null

    }
  

    </View>


  :
  <View>
    <Text></Text>
  </View>


}

               






            </View>
        )
    }
}

export default PartnerNearMe;