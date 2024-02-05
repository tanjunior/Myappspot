// FirstPage.js

import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, Button, StyleSheet, Pressable, Dimensions } from 'react-native';
import Track from './Track';
import { ScrollView } from 'react-native-gesture-handler';
import Chat from './Chat';
import Count from './Count';



const FirstPage =  ({ navigation }) => {
  const handleCardPress = (transportName) => {
    navigation.navigate('SecondPage', { transportName });
  };

  const renderCard = (transportName, imageUrl,) => (
    <TouchableOpacity  onPress={() => handleCardPress(transportName,)}>
      <View style={{ alignItems: "center", marginRight: 10, }}>
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: 170,
            height: 120,
            resizeMode: "cover",
            borderRadius: 10,
            
          }}
        />
        <Text style={{fontWeight:'600', marginTop: 8 }}>{transportName}</Text>
      </View>
    </TouchableOpacity>
  );

  const onPress = () => {
    navigation.navigate('SecondPage')
}

  return (
    <View style={{flex:1 ,backgroundColor:'#000',}}>
      <Image style={{position:'absolute',zIndex:-1,
              width:Dimensions.get('screen').width*1.2,  
              height:Dimensions.get('screen').height*0.7,}} 
              source={require("../assets/BG.jpg")}/>
    <View style={{margin:15, top:20}}>
      <Text style= {{fontSize:20, marginTop:30, marginBottom:10, fontWeight:"600"}}>
        แผนที่บริษัท</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
      <View style={{marginBottom:20, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
        {renderCard('ThaiPost', 'https://faceticket.net/wp-content/uploads/2020/06/Thaipost-Logo.jpg')}
        {renderCard('Flash Express', 'https://image.makewebeasy.net/makeweb/m_1920x0/Ex64W2e9S/DefaultData/flash_express_1.jpg?v=202311151122')}
        {renderCard('J&T', 'https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_J%26T_Merah_Square.jpg')}
        {renderCard('Kerry Express', 'https://stocklittle.com/wp-content/uploads/2017/09/KERRY-express-logo.jpg')}
      </View>
      </ScrollView>
      
     
    </View>
    <Pressable style={[styles.button,styles.shadowprop]} onPress={onPress}>
      <Text style={styles.text}>ไปแผนที่รวม</Text>
    </Pressable>
    <View style={styles.BG}>
      
      <Count/>
      </View>
    </View>
    
  );
  
};

export default FirstPage;

const styles = StyleSheet.create({
  
  button: {
      alignSelf:'center',
      justifyContent: 'center',
      paddingVertical: 8,
      borderRadius: 50,
      width:250, 
      backgroundColor: '#511CE8',
      margin:'3%',
    },
  shadowprop:{
    shadowColor: '#52006A',  
      elevation: 10, 
  },
    text: {
      fontSize: 18,
      lineHeight: 28,
      fontWeight: '600',
      letterSpacing: 0.25,
      color: 'white',
      alignSelf:'center'
      
    },
    BG: {
      width:Dimensions.get('screen').width*1,
      height:'100%',
      borderTopLeftRadius:50,
      borderTopRightRadius:50,
      bottom:0,
      backgroundColor:'#ffff',
      zIndex:-1,
    },

})


 