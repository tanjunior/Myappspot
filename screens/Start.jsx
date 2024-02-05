import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontFamily, Color } from "./Servies/GlobalStyles";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Start = ({navigation}) => {
   
    const onPress = () => {
        navigation.navigate('Tabs')
    }
    
  return (
    <View style={{}}>
      <Image style={{opacity:1,position:'absolute',zIndex:-1}} source={require("../assets/BG.jpg")} />
    <Text style={styles.letstart}>
        Let's Get Start
      </Text>
      <Image
        style={styles.Image}
        contentFit="cover"
        source={require("../assets/K (1).png")}
      />
      <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Start</Text>
    </Pressable>

    </View>
  )
}

export default Start

const styles = StyleSheet.create({
    letstart:{
        fontSize:40,
        color:'#511CE8',
        marginTop:'20%',
        fontStyle: "italic",
        fontWeight: "600",
        position: "absolute",
        alignSelf:'center'
    },
    Image:{
        justifyContent:'center',
        alignSelf:'center',
        marginTop:'30%',
        width:450,
        height:450,
        
    },
    button: {
        alignSelf:'center',
        justifyContent: 'center',
        marginTop:'20%',
        paddingVertical: 16,
        borderRadius: 50,
        width:230,
        elevation: 5,
        backgroundColor: '#511CE8',
      },
      text: {
        fontSize: 20,
        fontWeight: 'bold',
        
        color: 'white',
        alignSelf:'center'
      },

})