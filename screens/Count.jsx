// ShippingCostPage.js
import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import Track from "./Track";
import Chat from "./Chat";
import { ScrollView } from "react-native-gesture-handler";

const Count = () => {
  const navigation = useNavigation();

  const handleCardPress = useCallback(
    (transportName, url) => {
      navigation.navigate("ShippingStack", {
        screen: "WebViewScreen",
        params: { transportName, url },
      });
    },
    [navigation]
  );

  const renderCard = (transportName, imageUrl, url) => (
    <TouchableOpacity onPress={() => handleCardPress(transportName, url)}>
      <View style={{ alignItems: "center",}}>
        <Image
          source={{ uri: imageUrl }}
          
          style={{
            width: 140,
            height: 100,
            resizeMode: "cover",
            borderRadius: 10,
          }}
        />
        <Text style={{marginBottom:8, marginTop: 5,fontWeight:"600", }}>{transportName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
    <Text  style={{ left:20,fontSize:20,marginTop:30, marginBottom:15, fontWeight:"600"}}>
    คำนวนค่าจัดส่ง</Text>
    {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
    <View style={{padding:10, justifyContent: 'space-evenly', flexDirection: 'row',  alignItems: 'center', flexWrap: 'wrap' }}>
  {renderCard(
        "ThaiPost",
        "https://faceticket.net/wp-content/uploads/2020/06/Thaipost-Logo.jpg",
        "https://www.ค่าจัดส่ง.com/thailandpost"
      )}
      {renderCard(
        "Flash Express",
        "https://image.makewebeasy.net/makeweb/m_1920x0/Ex64W2e9S/DefaultData/flash_express_1.jpg?v=202311151122",
        "https://www.ค่าจัดส่ง.com/flash-express"
      )}
      {renderCard(
        "J&T",
        "https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_J%26T_Merah_Square.jpg",
        "https://www.ค่าจัดส่ง.com/jtexpress"
      )}
      {renderCard(
        "Kerry Express",
        "https://stocklittle.com/wp-content/uploads/2017/09/KERRY-express-logo.jpg",
        "https://www.ค่าจัดส่ง.com/kerry-express"
      )}
    </View>
    {/* </ScrollView> */}
    </View>
  );
};

export default Count;
