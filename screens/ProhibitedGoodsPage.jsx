// Import necessary components
import React, { useState } from "react";
import { View, Text, TextInput, FlatList,StyleSheet } from "react-native";

// Your existing imports...

// ProhibitedGoods component
const ProhibitedGoodsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([
    
      {
        "name": "ThaiPost-1) สัตว์มีชีวิต ",
        "id": 1
      },
      {
        "name": "ThaiPost-2) สิ่งเสพติด ",
        "id": 2
      },
      {
        "name": "ThaiPost-3) วัตถุลามกอนาจาร ",
        "id": 3
      },
      {
        "name": "ThaiPost-4) วัตถุมีคมที่ไม่มีสิ่งหุ้มห่อ ",
        "id": 4
      },
      {
        "name": "ThaiPost-5) วัตถุระเบิดหรือวัตถุไวไฟทุกชนิด ",
        "id": 5
      },
      {
        "name": "ThaiPost-6) ธนบัตร ",
        "id": 6
      },
      {
        "name": "ThaiPost-7) สิ่งของปลอมแปลงหรือลอกเลียนแบบโดยละเมิดลิขสิทธิ์",
        "id": 7
      },
      {
        "name": "Kerry-1) สิ่งของผิดกฎหมาย ",
        "id": 8
      },
      {
        "name": "Kerry-2) วัตถุระเบิด ",
        "id": 9
      },
      {
        "name": "Kerry-3) แบตเตอรี่รถทุกชนิด ",
        "id": 10
      },
      {
        "name": "Kerry-4) บรรจุหีบห่อที่ไม่เหมาะสมหรือเพียงพอ ",
        "id": 11
      },
      {
        "name": "Kerry-5) เครื่องดื่มแอลกอฮอล์",
        "id": 12
      },
      {
        "name": "Kerry-6) หุ้นและพันธบัตร ",
        "id": 13
      },
      {
        "name": "Kerry-7) บัตรเครดิต ",
        "id": 14
      },
      {
        "name": "Kerry-8) บัตรประชาชน ",
        "id": 15
      },
      {
        "name": "Kerry-9) จดหมาย ",
        "id": 16
      },
      {
        "name": "Kerry-10) ทองแท่ง ",
        "id": 17
      },
      {
        "name": "Kerry-11) ของสะสม ",
        "id": 18
      },
      {
        "name": "Kerry-12) ซากมนุษย์/สัตว์ ",
        "id": 19
      },
      {
        "name": "Kerry-13) ยาสูบทุกประเภท ",
        "id": 20
      },
      {
        "name": "Kerry-14) สิ่งมีชีวิต ",
        "id": 21
      },
      {
        "name": "Kerry-15) พัสดุบรรจุกล่องโฟม ",
        "id": 22
      },
      {
        "name": "Kerry-16) พัสดุความกว้างกว่า 200 x 200 cm ",
        "id": 23
      },
      {
        "name": "Kerry-17) พัสดุที่อาจทำให้เกิดความล่าช้าหรือความเสียหายแก่พัสดุอุปกรณ์หรือบุคคล ",
        "id": 24
      },
      {
        "name": "Kerry-18) พัสดุที่ต้องการให้เราได้รับใบอนุญาตพิเศษ",
        "id": 25
      },
      {
        "name": "Flass Express-1) สินค้าที่ แฟลช เอ็กซ์เพรส เห็นว่าไม่สมควรในการจัดส่ง ",
        "id": 26
      },
      {
        "name": "Flass Express-2) อาวุธทุกชนิด ",
        "id": 27
      },
      {
        "name": "Flass Express-3) สื่อสิ่งพิมพ์ที่ผิดกฎหมาย ",
        "id": 28
      },
      {
        "name": "Flass Express-4) วัตถุไวไฟและวัตถุระเบิดทุกชนิด ",
        "id": 29
      },
      {
        "name": "Flass Express-5) สารชีวเคมี ",
        "id": 30
      },
      {
        "name": "Flass Express-6) ภาชนะที่บรรจุส่วนประกอบของสารกัมมันตรังสี ",
        "id": 31
      },
      {
        "name": "Flass Express-7) สารเคมีที่มีพิษสูง ",
        "id": 32
      },
      {
        "name": "Flass Express-8) ยาเสพติดหรือสิ่งเสพติดทุกชนิด",
        "id": 33
      },
      {
        "name": "Flass Express-9) ผลิตภัณฑ์ชีวเคมีประเภท ",
        "id": 34
      },
      {
        "name": "Flass Express-10) สัตว์ สิ่งมีชีวิตและร่างกายมนุษย์ ",
        "id": 35
      },
      {
        "name": "Flass Express-11) สินค้าที่ผิดกฎหมายและไม่เป็นไปตามข้อบังคับทางกฎหมายของประเทศ ",
        "id": 36
      },
      {
        "name": "Flass Express-12) เอกสารทั้งหมด ที่ทางราชการออกให้ ",
        "id": 37
      },
      {
        "name": "Flass Express-13) เอกสารที่เกี่ยวกับสถาบันการเงิน ",
        "id": 38
      },
      {
        "name": "Flass Express-14) สินค้าที่ไม่สามารถประเมินค่าได้",
        "id": 39
      },
      {
        "name": "Flass Express-15) อุปกรณ์การเรียนทางการแพทย์ รวมถึงตัวอย่างสัตว์และพืช ",
        "id": 40
      },
      {
        "name": "Flass Express-16)วัตถุที่ก่อให้เกิดการแพร่ระบาดและติดเชื้อ",
        "id": 41
      },
      {
        "name": "JT-1) ยาเสพติด ",
        "id": 42
      },
      {
        "name": "JT-2) ใบกัญชา ",
        "id": 43
      },
      {
        "name": "JT-3) ชิ้นส่วนสัตว์ ",
        "id": 44
      },
      {
        "name": "JT-4) สิ่งของต้องห้าม ",
        "id": 45
      },
      {
        "name": "JT-5) สื่อลามกอนาจาร ",
        "id": 46
      },
      {
        "name": "JT-6) สัตว์สงวน ",
        "id": 47
      },
      {
        "name": "JT-7) หีบห่อที่ไม่เหมาะสมอาจเป็นอันตรายได้ ",
        "id": 48
      },
      {
        "name": "JT-8) อาหารสด ",
        "id": 49
      },
      {
        "name": "JT-9) หีบห่อที่ไม่เหมาะสมอาจเป็นอันตรายได้ ",
        "id": 50
      },
      {
        "name": "JT-10) ทรัพย์สินมีค่า ",
        "id": 51
      },
      {
        "name": "JT-11) สิ่งมีชีวิต ",
        "id": 52
      },
      {
        "name": "JT-12) วัตถุอันตราย",
        "id": 53
      }
     
  ]);

  // Function to filter items based on search query
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      {/* List of Prohibited Goods */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
  },
});

export default ProhibitedGoodsPage;