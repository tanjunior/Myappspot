import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Track from './Track'
import Chat from './Chat'
import { createStackNavigator } from "@react-navigation/stack";
import { WebView } from "react-native-webview";
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';


const ShippingCostPage = () => {
  return (
    <View style={{flex:1 ,backgroundColor:'#67F9A1'}}>
      <Image style={{position:'absolute',zIndex:-1,
              width:Dimensions.get('screen').width*1.4,  
              height:Dimensions.get('screen').height*2,}} 
              source={require("../assets/BG.jpg")}/>
    <ScrollView horizontal={false} showsHorizontalScrollIndicator={true}>
    <View style={{marginTop:'20%',}}>
      <Track/>
      <Chat/>
    </View>
    </ScrollView>
    </View>
  )
};

const ShippingStack = createStackNavigator();

const ShippingCostPageWithStack = () => {
  return (
    <ShippingStack.Navigator>
      <ShippingStack.Screen
        name="ShippingCostPage"
        component={ShippingCostPage}
        options={{ headerShown: false }}
      />
      <ShippingStack.Screen name="WebViewScreen" component={WebViewScreen} />
      {/* Add more screens as needed */}
    </ShippingStack.Navigator>
  );
};

const WebViewScreen = ({ route }) => {
  const { transportName, url } = route.params;

  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
};

export default ShippingCostPageWithStack;

