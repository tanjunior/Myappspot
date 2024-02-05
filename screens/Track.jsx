import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


const Track = () => {
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
      <View style={{ alignItems: "center", marginRight: 10 }}>
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: 140,
            height: 100,
            resizeMode: "cover",
            borderRadius: 10,
            
          }}
        />
        <Text style={{ marginTop: 8,fontWeight:"600" }}>{transportName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.BG, styles.shadowProp]}>
       <View style={{borderTopLeftRadius:20, borderTopRightRadius:20,height:80,backgroundColor:'#E6E6FA',}} >
        <Text  style={{paddingTop:10,paddingLeft:8, fontSize:24,  fontWeight:"600"}}>
          ติดตามพัสดุ</Text>
        <Text style={{left:20,fontWeight:"500",fontSize:16}}>เช็คพัสดุที่คุณจัดส่ง</Text>
          </View>
      <View style={{padding:3,}}>
        <Text  style={{marginBottom:20,paddingTop:10,fontSize:16, fontWeight:"600"}}>
        เลือกบริษัท</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>      
      {renderCard(
       "ThaiPost",
        "https://faceticket.net/wp-content/uploads/2020/06/Thaipost-Logo.jpg",
        "https://ems.thaiware.com/"
      )}
      {renderCard(
        "Flash Express",
        "https://image.makewebeasy.net/makeweb/m_1920x0/Ex64W2e9S/DefaultData/flash_express_1.jpg?v=202311151122",
        "https://flashexpress.com/th/tools/tracking-min/"
      )}
      {renderCard(
        "J&T",
        "https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_J%26T_Merah_Square.jpg",
        "https://jtexpress.co.th/"
      )}
      {renderCard(
        "Kerry Express",
        "https://stocklittle.com/wp-content/uploads/2017/09/KERRY-express-logo.jpg",
        "https://th.kerryexpress.com/th/track/"
      )}
    </View>
    </ScrollView>
    </View>
    </View>
  );
};



export default Track

const styles = StyleSheet.create({
  BG:{
    backgroundColor: 'white',  
    borderRadius: 20,  
      
    width:Dimensions.get('screen').width*0.9,  
    height:Dimensions.get('screen').height*0.38,
    alignSelf:'center'
  },
  shadowProp: {  
    shadowColor: '#52006A',  
    elevation: 10,  
  },  
})