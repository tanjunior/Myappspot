// SecondPage.js

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconSix from 'react-native-vector-icons/FontAwesome6';
import StarRating from 'react-native-star-rating-widget';
import * as Location from 'expo-location';


const SecondPage = ({ route }) => {
  const [errorMsg, setErrorMsg] = useState(null);

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

    return location = await Location.getCurrentPositionAsync({});
  }
  
  const { params: { transportName = null } = {} } = route || {};

  // Dummy data for the transporters
  const transportersData = [
    {
      transporter: "ThaiPost",
      image: require("../assets/markers/TH.png"),
      branches: [
        {
          "transporter name": "ไปรษณีย์",
          branchName: "1. ไปรษณีย์ สาขา ปณ.สำนักงานใหญ่ ปตท.",
          lat: 13.81824697,
          long: 100.5574672,
          star: 10,
          address:
            "อาคารจอดรถสำนักงานใหญ่ ปตท. ถ.วิภาวดี แขวงจตุจักร เขตจตุจักร กทม. 10908 (สถานที่ใกล้เคียง: สวนรถไฟ, ตึก BOI)",
        },
        {
          "transporter name": "ไปรษณีย์",
          branchName: "2. ไปรษณีย์ สาขา ปณร.จตุจักร 202 (เซ็นทรัลลาดพร้าว)",
          lat: 13.81625027,
          long: 100.5600999,
          address:
            "ศูนย์การค้าเซ็นทรัลพลาซ่า สาขาลาดพร้าว ห้องเลขที่ RMU 204 ชั้น 2 เลขที่ 1697 ถ.พหลโยธิน แขวงจตุจักร เขตจตุจักร กทม. 10900 (สถานที่ใกล้เคียง: ศูนย์การค้าเซ็นทรัลพลาซ่า สาขาลาดพร้าว)",
        },
        {
          "transporter name": "ไปรษณีย์",
          branchName: "3. ไปรษณีย์ สาขา ปณ.ซันทาวเวอร์",
          lat: 13.80821777,
          long: 100.5584204,
          address:
            "123 อาคารซันทาวเวอร์ส B ชั้น G ซ.เฉยพ่วง ถ.วิภาวดีรังสิต แขวงลาดยาว เขตจตุจักร กทม. 10905 (สถานที่ใกล้เคียง: ธนาคารทหารไทย)",
        },
        {
          "transporter name": "ไปรษณีย์",
          branchName: "4. ไปรษณีย์ สาขา ปณ.ตึกช้าง",
          lat: 13.82538494,
          long: 100.5683132,
          address:
            "115 อาคารตึกช้าง ถ.พหลโยธิน แขวงจอมพล เขตจตุจักร กทม. 10906 (สถานที่ใกล้เคียง: ที่ทำการไปรษณีย์เสนานิคม)",
        },
        {
          "transporter name": "ไปรษณีย์",
          branchName: "5. ไปรษณีย์ สาขา คปณ.JJ Mall",
          lat: 13.80044047,
          long: 100.5383352,
          address:
            "ภายในศูนย์การค้า JJ Mall (ห้องเลขที่ GP01 ชั้น G) เลขที่ 588 อาคาร เจ.เจ.มอลล์ ถ.กำแพงเพชร 2 แขวงจตุจักร เขตจตุจักร กทม. 10900 (สถานที่ใกล้เคียง: สวนจตุจักร)",
        },
        {
          "transporter name": "ไปรษณีย์",
          branchName: "6. ไปรษณีย์ สาขา คปณ.ตลาดลุงเพิ่ม",
          lat: 13.80641438,
          long: 100.562153,
          address:
            "ภายในตลาดลุงเพิ่ม 224 ถ.วิภาวดีรังสิต ซ.22 แขวงจอมพล เขตจตุจักร กทม. 10900 (สถานที่ใกล้เคียง: ที่จอดรถตลาดลุงเพิ่ม)",
        },
        {
          "transporter name": "ไปรษณีย์",
          branchName: "7. ไปรษณีย์ สาขา คปณ.ตลาดนัดสวนจตุจักร",
          lat: 13.79980923,
          long: 100.5487264,
          address:
            "ตลาดนัดจตุจักร ถ.กำแพงเพชร 2 แขวงลาดยาว เขตจตุจักร กทม. 10900 (สถานที่ใกล้เคียง: อยู่ใกล้ ประตู 2 ถ.กำแพงเพชร อยู่ระหว่าง ธ.ออมสิน และ ธ.ไทยพาณิชย์)",
        },
        {
          "transporter name": "ไปรษณีย์",
          branchName: "8. ไปรษณีย์ สาขา ปณ.สามแยกลาดพร้าว",
          lat: 13.80987564,
          long: 100.5664328,
          address:
            "228/24-25 ถ.ลาดพร้าว แขวงจอมพล เขตจตุจักร กทม. 10901 (สถานที่ใกล้เคียง: ยูเนี่ยนมอลล์, บิ๊กซีเอ็กซ์ตร้าลาดพร้าว)",
        },
        {
          "transporter name": "ไปรษณีย์",
          branchName: "9. ไปรษณีย์ไทย สาขาจันทรเกษม",
          lat: 13.81973617,
          long: 100.5760018,
          address:
            "ภายในบริเวณ มหาวิทยาลัยราชภัฏจันทรเกษม ถ.รัชดาภิเษก เขตจตุจักร กรุงเทพมหานคร 10904",
        },
      ],
    },
    {
      transporter: "Flash Express",
      image: require("../assets/markers/flash.png"),
      branches: [
        {
          "transporter name": "Flash Express",
          branchName: "17. แฟลช โฮม สาขาซอยเสือใหญ่",
          lat: 13.82230658,
          long: 100.5794825,
          address:
            "15/124 ห้องที่ 2 ซอยรัชดา 36 แยก 7 จันทรเกษม เขตจตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "Flash Express",
          branchName: "18. Flash Express สาขา Shop Union Mall",
          lat: 13.81336369,
          long: 100.5618612,
          address:
            "Union Mall ชั้น F2, 54 ซอย ลาดพร้าว 1 แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "Flash Express",
          branchName: "19. Flash Express สาขามิกซ์ จตุจักร",
          lat: 13.79940124,
          long: 100.5480982,
          address:
            "ชั้น1 โซนB ห้อง1053-1056 เลขที่8 ถนน กำแพงเพชร 3 แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "Flash Express",
          branchName: "20. FLASH เจเจมอล์",
          lat: 13.80152254,
          long: 100.5489264,
          address:
            "จตุจักร จตุจักร กรุงเทพ 10900 ห้อง S168-S169 ชั้น S เลขที่ 588 ถนนกำแพงเพชร 2 แขวงจตุจักร เขตจตุจักร กรุงเทพ 10900",
        },
        {
          "transporter name": "Flash Express",
          branchName: "21. Flash Home จตุจักร 25",
          lat: 13.81349448,
          long: 100.5640011,
          address:
            "243, 147 ถ. ลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "Flash Express",
          branchName: "20. Flash home",
          lat: 13.80266633,
          long: 100.5593645,
          address:
            "ลาดยาว 62/69 เมอร์ริต แมนชั่น 42 ถนน วิภาวดีรังสิต กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "Flash Express",
          branchName: "22. Flash Home สาขาจตุจักร 29",
          lat: 13.81934079,
          long: 100.5795759,
          address:
            "42/154 624 คอนโดเลตรัชดา ซอย รัชดาภิเษก 36 จันเกษม เขตจตุจักร กรุงเทพมหานคร 10900",
        },
      ],
    },
    {
      transporter: "J&T",
      image: require("../assets/markers/JT.png"),
      branches: [
        {
          "transporter name": "JT",
          branchName: "24. J&T Express สาขา 01Bang Sue006",
          lat: 13.82152859,
          long: 100.531015,
          address:
            "เลขที่ 127/84 ซ.ริมทางรถไฟบางซื่อ แขวงบางซื่อ เขตบางซื่อ กรุงเทพมหานคร",
        },
        {
          "transporter name": "JT",
          branchName: "25. J&T Express สาขา CV181",
          lat: 13.83110731,
          long: 100.5736824,
          address: "ซอยพหลโยธิน 30 เขตจตุจักร กรุงเทพฯ 10900",
        },
        {
          "transporter name": "JT",
          branchName: "26. J&T Express สาขา 01Chatuchak022",
          lat: 13.81264587,
          long: 100.5627566,
          address:
            "189/16-17 ซอยลาดพร้าว1 แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "JT",
          branchName: "27. J&T Express สาขา 01Chatuchak017",
          lat: 13.82941357,
          long: 100.5472642,
          address:
            "599/3 หมู่บ้านกลางกรุง The Royal vienna ถ.รัชดาภิเษก แขวงจตุจักร เขตจตุจักร กทม. 10900",
        },
        {
          "transporter name": "JT",
          branchName: "28. J&T Express สาขา01MRT_Chatuchak01",
          lat: 13.80281985,
          long: 100.5534374,
          address:
            "เลขที่ 41 MRT จตุจักร ถนน พหลโยธิน แขวง จตุจักร เขต จตุจักร กทม. 10900",
        },
        {
          "transporter name": "JT",
          branchName:
            "29. ศูนย์กระจายสินค้า J&T Express สาขาจตุจักร 065 แขวงลาดยาว",
          lat: 13.84912113,
          long: 100.5452201,
          address:
            "70/1 ถ. เทศบาลรังสรรค์เหนือ แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "JT",
          branchName: "30. เจแอนด์ที เอ็กเพลส สาขาจตุจักร07",
          lat: 13.82622303,
          long: 100.55602,
          address:
            "7/555 ซ. วิภาวดีรังสิต 17 แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "JT",
          branchName: "31. ศูนย์กระจายสินค้า J&Tจตุจักร06",
          lat: 13.83182177,
          long: 100.5764543,
          address:
            "171 ซอย พหลโยธิน 30 แขวงจันทรเกษม เขตจตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "JT",
          branchName: "32. J&T express สาขา จันทรเกษม รัชดา36",
          lat: 13.82224129,
          long: 100.5793516,
          address:
            "15 149 ถ. รัชดาภิเษก แขวงจันทรเกษม เขตจตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "JT",
          branchName: "33. J&T Express สาขา MRT พหลโยธิน",
          lat: 13.81347073,
          long: 100.5610682,
          address: "16 ถ. ลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "JT",
          branchName: "34.J&T Home สาขา ลาดพร้าว ซ.1",
          lat: 13.81268393,
          long: 100.5627266,
          address: "ถ. ลาดพร้าว Chomphol, เขตจตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "JT",
          branchName: "35.J&T Express สาขา MRT จตุจักร",
          lat: 13.80271839,
          long: 100.5533961,
          address:
            "เลขที่ 41 Metro Mall ถนนพหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "JT",
          branchName: "36. J&T Express สาขา MRT กำแพงเพชร",
          lat: 13.79787726,
          long: 100.5487195,
          address:
            "QGXX+5F5 MRT กำแพงเพชร ถนน กำแพงเพชร แขวง จตุจักร เขตจตุจักร จตุจักร กรุงเทพมหานคร 10900",
        },
      ],
    },
    {
      transporter: "Kerry Express",
      image: require("../assets/markers/kerry.png"),
      branches: [
        {
          "transporter name": "Kerry Express",
          branchName: "10. Kerry Express สาขา มิกซ์ จตุจักร",
          lat: 13.80184552,
          long: 100.5508717,
          address:
            "1071-1072 ชั้น F1 เลขที่ 8 ถ.กำแพงเพชร 3 จตุจักร จตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "Kerry Express",
          branchName: "11. Kerry Express สาขา ถนนกำแพงเพชร 2",
          lat: 13.80262028,
          long: 100.548044,
          address:
            "824 ห้อง A15 ถนนกำแพงเพชร จตุจักร จตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "Kerry Express",
          branchName: "12. Kerry Express สาขา เจเจ มอลล์",
          lat: 13.80166304,
          long: 100.5488912,
          address: "588 ห้อง A จตุจักร จตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "Kerry Express",
          branchName: "13. Kerry Express สาขา เจเจ มอลล์ 2",
          lat: 13.79909772,
          long: 100.5480993,
          address:
            "588 อาคาร JJ Mall ห้อง 121-123 ชั้น 2 โซน E ถนนกำแพงเพชร 2 จตุจักร จตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "Kerry Express",
          branchName: "14. Kerry Express สาขา ซัสโก้พหลโยธิน 24",
          lat: 13.81986496,
          long: 100.5685558,
          address: "1410/1 ถนนพหลโยธิน จอมพล จตุจักร กรุงเทพมหานคร 10900",
        },
        {
          "transporter name": "Kerry Express",
          branchName: "15. Kerry Express Retail Service Point",
          lat: 13.82668668,
          long: 100.5642387,
          address:
            "เลขที่ 18 อาคารไทยพานิชย์ ปาร์ค พลาซ่า ชั้น G ห้องเลขที่ 2128-2130 ถนนรัชดาภิเษก จตุจักร กรุงเทพมหานคร 10900 ",
        },
        {
          "transporter name": "Kerry Express",
          branchName: "16. Kerry Express สาขา ตลาดจินดา",
          lat: 13.80255833,
          long: 100.5623383,
          address: "18 ซอยทรงสะอาด จอมพล จตุจักร กรุงเทพมหานคร 10900",
        },
      ],
    },
    // Add more transporters if needed
  ];

  // Filter the transporters based on the selected transporter name
  console.log(transportName);
  const filteredTransporters = transportName
    ? transportersData.filter((item) => item.transporter === transportName)
    : transportersData;

  const allBranches = transportersData.reduce((branches, transporter) => {
    return branches.concat(
      transporter.branches.map((branch) => ({
        ...branch,
        transporter: transporter.transporter,
        image: transporter.image,
      }))
    );
  }, []);

  const coordinates = transportName
    ? filteredTransporters[0].branches.map((branch) => ({
        latitude: branch.lat,
        longitude: branch.long,
        title: filteredTransporters[0].transporter,
        description: branch.branchName,
        image: filteredTransporters[0].image,
        stars: branch.stars,
      }))
    : allBranches.map((branch) => ({
        latitude: branch.lat,
        longitude: branch.long,
        title: branch.transporter,
        description: branch.branchName,
        image: branch.image,
        stars: branch.stars,
      }));

      const [activeMarker, setActiveMarker] = useState(null);
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);


  
  const [region, setRegion] = useState({
    latitude: coordinates.length > 0 ? coordinates[0].latitude : 0,
    longitude: coordinates.length > 0 ? coordinates[0].longitude : 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
        {coordinates.map((coordinate, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            }}
            title={coordinate.title}
            description={coordinate.description}
            onPress={() => {
              setActiveMarker(coordinate)
              bottomSheetRef.current?.present()
            }}
          >
            {/* Custom Marker Image */}
            {coordinate.image ? (
              <Image
                source={coordinate.image}
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
    </GestureHandlerRootView>
  );
};

function BottomSheetContent({activeMarker}) {
  const [rating, setRating] = useState(0);

  return <View style={{ flex: 1, alignItems: 'center'}}>
    <Image
      source={activeMarker.image}
      style={{ width: 40, height: 40 }}
    />
    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
      <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{activeMarker.title}</Text>
      {
        (activeMarker.stars > 0) ? (
          <Icon.Button name="star" color="#FFC107" size={20} onPress={() => {
            //add star count
          }}>
            <Text>{activeMarker.stars}</Text>
          </Icon.Button>
        ) : (
          <Icon name="star-o" size={20} onPress={() => {
            //add star count
          }} />
        )
      }
    </View>
    <Text>{activeMarker.description}</Text>
    <StarRating rating={rating} onChange={setRating} />
  </View>
}

export default SecondPage;
