// App.js
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Add this line
import FirstPage from "./screens/FirstPage";
import SecondPage from "./screens/SecondPage";
import ProhibitedGoodsPage from "./screens/ProhibitedGoodsPage";
import ShippingCostPage from "./screens/ShippingCostPage";
import ShippingCostPageWithStack from "./screens/ShippingCostPage";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons from react-native-vector-icons
import Start from "./screens/Start";
import * as Updates from 'expo-updates';
import Comment from "./screens/Comment";
import { supabase } from "./utils/supabase";
import Auth from "./Components/Auth";
import Account from "./Components/Account";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthProvider, { useAuth } from "./Context/Auth";



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Add this line

function MyTabs() {
  const {session} = useAuth();

  if (!session) return <Auth />
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "ProhibitedGoods") {
            iconName = focused ? "list" : "list-outline"; // Assuming you have an appropriate icon for the prohibited goods
          } else if (route.name === "Shipping") {
            iconName = focused ? "cube" : "cube-outline"; // Assuming you have an appropriate icon for the Shipping menu
          } else if (route.name === "Comment") {
            iconName = focused ? "cube" : "cube-outline"; // Assuming you have an appropriate icon for the Shipping menu
          } else if (route.name === "Account") {
            iconName = focused ? "cube" : "cube-outline"; // Assuming you have an appropriate icon for the Shipping menu
          }

          // Return the icon component directly
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={FirstPage} options={{ headerShown: false }} />
      
      <Tab.Screen name="Shipping" component={ShippingCostPage} options={{headerShown: false, title: 'เช็คพัสดุ'}} />
      <Tab.Screen name="ProhibitedGoods" component={ProhibitedGoodsPage} options={{ title: 'สิ่งของต้องห้าม' }} />
      <Tab.Screen name="Comment" component={Comment} options={{ title: 'comment' }} />
      <Tab.Screen name="Account" component={Account} options={{ title: 'Account' }} />

    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
      <Stack.Screen name="Tabs" component={MyTabs} options={{ headerShown: false }} />
      <Stack.Screen name="FirstPage" component={FirstPage} options={{ headerShown: false }} />
      <Stack.Screen name="SecondPage" component={SecondPage} options={{ headerTitle: "MapPage" }} />
      <Stack.Screen name="ShippingCostPage" component={ShippingCostPage}  options={{ headerShown: false }} />
      <Stack.Screen name="ShippingStack" component={ShippingCostPageWithStack} options={{ headerShown: false }} />
      
    </Stack.Navigator>
  );
}


const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
