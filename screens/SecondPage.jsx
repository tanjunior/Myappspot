// SecondPage.js

import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconSix from 'react-native-vector-icons/FontAwesome6';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import Flash from '../assets/markers/flash.png'
import Jt from '../assets/markers/JT.png'
import Kerry from '../assets/markers/kerry.png'
import Th from '../assets/markers/TH.png'
import * as Linking from 'expo-linking';
import { supabase } from '../utils/supabase'
import { useAuth } from "../Context/Auth";
import { Link } from "@react-navigation/native";




async function getCurrentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // setErrorMsg('Permission to access location was denied');
      return;
    }

  return location = await Location.getCurrentPositionAsync({});
}

const SecondPage = ({ route }) => {  
  const { params: { transportName = null } = {} } = route || {};
  const [branches, setBranches] = useState([])
  const [activeMarker, setActiveMarker] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({});
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    fetchBranches()
  }, []);

  useEffect(() => {
    if (branches.length === 0) return
    setRegion({
      latitude: branches[0].lat,
      longitude: branches[0].long,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  }, [branches]);
  
  async function fetchBranches() {
    let { data: branches, error } = await supabase
    .from('branches')
    .select('*')

    if (error) {
      setErrorMsg(error.message)
      return console.log('error', error)
    }
    // console.log(branches)
    if (!transportName) setBranches(branches)
    else setBranches(filterBranches(branches))
  }

  function filterBranches(branches) {
    return branches.filter((branch) => branch.company === transportName)
  }

  function getMarkerImage(company) {
    // console.log(company)
    if (company === "Flash Express") return Flash
    if (company === "J&T") return Jt
    if (company === "Kerry Express") return Kerry
    if (company === "ThaiPost") return Th
    return null
  }

  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        <BottomSheetModal
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <BottomSheetContent activeMarker={activeMarker}/>
        </BottomSheetModal>
      <MapView
        style={{ width: '100%',height: '100%', }}
        region={region}    
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      >
        {branches.map((branch, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: branch.lat,
              longitude: branch.long,
            }}
            title={branch.company}
            description={branch.name}
            onPress={() => {
              setActiveMarker(branch)
              bottomSheetRef.current?.present()
            }}
          >
            {/* Custom Marker Image */}
            {getMarkerImage(branch.company) ? (
              <Image
                source={getMarkerImage(branch.company)}
                style={{ width: 40, height: 40 }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: "red",
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                }}
              />
              // You can customize the marker for the case when transportName is null
            )}
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity
        style={{position: "absolute", bottom: "55%", right: "5%"}}
        onPress={async () => {
          const {coords} = await getCurrentLocation()
          console.log(coords)

          setRegion({longitude: coords.longitude, latitude: coords.latitude})
        }
      }>
        <IconSix name="location-crosshairs" size={40}/>
      </TouchableOpacity>
    </View>
    </BottomSheetModalProvider>
  );
};

function BottomSheetContent({activeMarker}) {
  const [stars, setStars] = useState(0)
  const [rating, setRating] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hasReviewed, setHasReviewed] = useState(false)
  const {session} = useAuth()

  useEffect(() => {
    getTotalStars()
  }, [activeMarker])

  async function getTotalStars() {
    
    const { data: reviews, error } = await supabase
    .from('reviews')
    .select("*")
    .eq('branch', activeMarker.id)

    if (error) {
      setErrorMsg(error.message)
      return console.log('error', error)
    }

    const totalStars = reviews.reduce((accumulator, review) => {
      if (review.user === session.user.id) {
        // console.log("hasReviewed")
        setHasReviewed(true)
        setRating(review.stars)
      }
      return accumulator + review.stars;
    }, 0)

    setStars(totalStars)
  }

  async function addReview(stars) {
    const { data, error } = await supabase
    .from('reviews')
    .insert([{
      user: session.user.id,
      branch: activeMarker.id,
      stars: stars
    }])

    if (error) {
      setErrorMsg(error.message)
      return console.log('error', error)
    }
  }

  async function onStarChange(rating) {
    setHasReviewed(true)
    setRating(rating)
    await addReview(rating)

    setStars(prev => prev + rating)
  }

  return <View style={{ flex: 1, alignItems: 'center'}}>
    <Image
      source={activeMarker.image}
      style={{ width: 40, height: 40 }}
    />
    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
      <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{activeMarker.company}</Text>
      {
        (stars > 0) ? (
          <Icon.Button name="star" color="#FFC107" size={20}>
            <Text>{stars}</Text>
          </Icon.Button>
        ) : (
          <Icon name="star-o" size={20} />
        )
      }
    </View>
    <Text>{activeMarker.name}</Text>
    {hasReviewed? <StarRatingDisplay rating={rating}/> :<StarRating rating={rating} onChange={onStarChange} />}
    <TouchableOpacity onPress={async () => {
      
      const {coords} = await getCurrentLocation()

      const currentLocation = `${coords.latitude},${coords.longitude}`
      const destination = `${activeMarker.lat},${activeMarker.long}`

      const label = `${activeMarker.company} - ${activeMarker.name}`
      
      const url = Platform.select({ 
        ios: `googleMaps://app?saddr=${currentLocation}&daddr=${destination}(${label})`, 
        android: `geo://${currentLocation}?q=${destination}(${label})` 
      });
      
      Linking.canOpenURL(url).then((supported) => {
        if (supported) Linking.openURL(url);
        else Linking.openURL(`https://www.google.co.th/maps/dir/?api=1&destination=${destination}&dir_action=navigate`)
      }).catch(() => {
        Linking.openURL(`maps://${currentLocation}?q=${destination}`) 
      })
    }}>
      <Text>Go</Text>
    </TouchableOpacity>
  </View>
}

export default SecondPage;
