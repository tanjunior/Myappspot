import { View, Text, Image } from 'react-native'
import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

const Chat = () => {
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
            width: 130,
            height: 100,
            resizeMode: "cover",
            borderRadius: 10,
          }}
        />
        <Text style={{marginBottom:5, marginTop: 5,fontWeight:"600" }}>{transportName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text  style={{left:30, fontSize:24,marginTop:20,  fontWeight:"600"}}>
        ช่องทางแชท</Text>
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
        <View style={{margin:20, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
      {renderCard(
        "ThaiPost",
        "https://faceticket.net/wp-content/uploads/2020/06/Thaipost-Logo.jpg",
        "https://international.thailandpost.com/faq_cat/popular-th/?fbclid=IwAR1O2DZJ0FMEq5SN9s8lKQPr8V_aPdzOS6atHrBD_AnNfBWnmD-zQZdnUAY"
      )}
      {renderCard(
        "Flash Express",
        "https://image.makewebeasy.net/makeweb/m_1920x0/Ex64W2e9S/DefaultData/flash_express_1.jpg?v=202311151122",
        "https://flashexpress.com/call-center/?fbclid=IwAR08kUHlRuPVndr970uSVghM4gthD5qkqlNxYSSUk-kstI_jd2L5rjOFwq8"
      )}
      {renderCard(
        "J&T",
        "https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_J%26T_Merah_Square.jpg",
        "https://imc.jtexpress.co.th/pc?code=web&fbclid=IwAR2qpguF_n420ZYZnDbwQe_QAH-3-IlS5K49zOgib4OFfBdwn24k7BO50mQ"
      )}
      {renderCard(
        "Kerry Express",
        "https://stocklittle.com/wp-content/uploads/2017/09/KERRY-express-logo.jpg",
        "https://th.kerryexpress.com/th/home?fbclid=IwAR0oe746SYuIna6qnJy_xNIqO_AmSqcFL7_qk-1UnXjGZRlkaK2OAzbyMoc"
      )}
    </View>
    {/* </ScrollView> */}
    </View>
  );
};

export default Chat