import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';

//npm으로 설치해야 하는 사항들
import AsyncStorage from '@react-native-async-storage/async-storage'
// npm i @react-native-community/async-storage
import CalendarPicker from 'react-native-calendar-picker';
// npm install react-native-calendar-picker
import { NavigationContainer } from '@react-navigation/native';
//npm install @react-navigation/native
import { createStackNavigator } from '@react-navigation/stack';
//npm install @react-navigation/stack
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//npm i react-native-keyboard-aware-scroll-view


const Stack = createStackNavigator ();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = " " component={HomeScreen} options={{headerStyle:{backgroundColor: '#FFE4E1'}, 
              headerTintColor:'purple'}}/>
        <Stack.Screen name = "오늘의 편지" component={LetterScreen} options={{headerStyle:{backgroundColor: '#FFE4E1'},
              headerTintColor:'purple', headerTitleStyle:{fontSize:15}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}){
  async function date_change(d) {
    console.log(d.format('YYYYMMDD'));
    var date = d.format('YYYYMMDD');
  
    var val_to = '';
    var val_title = '';
    var val_letter = '';

    
    var value = await AsyncStorage.getItem(date);
    var value_t = await AsyncStorage.getItem(date + 't');
    var value_l = await AsyncStorage.getItem(date + 'l');

    console.log(value);

    if (value !== null){
      val_to = value;
      val_title = value_t;
      val_letter = value_l;
    }
    navigation.navigate("오늘의 편지",
    { date: d, to: val_to, title: val_title, letter: val_letter });
  }

  return (
    <View style={{flex:1, backgroundColor:'#D8BFD8'}}>
      <View style={{margin:10,
         marginTop:15, backgroundColor: '#FEFBF5', 
         borderRadius: 10, shadowColor: 'black', 
         shadowOpacity: 0.7, shadowOffset:{width:2, height:2}, 
         height:380, backgroundColor: 'white'}}>
        <View style={{borderTopLeftRadius:5, 
          borderTopRightRadius:5, backgroundColor:'gray',
          height:25, flexDirection:'row', }}>
          <View style={{height:25, width: 50,flexDirection:'row',alignItems:'center', justifyContent:'space-evenly'}}>
           <View style={{height:10, width:10, borderRadius:100, backgroundColor:'#ff5f57'}}/>
           <View style={{height:10, width:10, borderRadius:100, backgroundColor:'#febc2c'}}/>
           <View style={{height:10, width:10, borderRadius:100, backgroundColor:'#27c940'}}/>
          </View>
        </View>
        <Text style={{fontSize:10}}/>
        <CalendarPicker onDateChange={date_change}
          previousTitle='<'
          nextTitle='>'
          selectedDayColor='pink' 
          todayBackgroundColor='white'
          todayTextStyle={{color:'gray'}}
          selectedDayTextColor='black'
          textStyle={{fontWeight:'bold', color:'black'}}/>
      </View>
    </View>
  );
}
function LetterScreen({ route, navigation }) {
  
  var d = route.params.date;

  const [date, setDate] = useState(d.format('YYYYMMDD'));
  const [date1, setDate1] = useState(d.format('MMMM DD, YYYY'));
  const [to, setTo] = useState(route.params.to);
  const [title, setTitle] = useState(route.params.title);
  const [letter, setLetter] = useState(route.params.letter);

  async function save_letter() {
    console.log(date);
    await AsyncStorage.setItem(date, to)
    await AsyncStorage.setItem(date + 't', title)
    await AsyncStorage.setItem(date + 'l', letter)
    Alert.alert('Save!')
  }

  return (
    <View style={{flex: 1, backgroundColor: '#D8BFD8'}}>
      <View style={{margin:10, marginTop:15,
            backgroundColor: '#FEFBF5', borderRadius: 7,
            shadowColor: 'black', shadowOpacity: 0.7,
            shadowOffset:{width:2, height:2},}}>
      <View style={{borderTopLeftRadius:5, 
          borderTopRightRadius:5, backgroundColor:'gray',
          height:25, flexDirection:'row', }}>
          <View style={{height:25, width: 50,flexDirection:'row',alignItems:'center', justifyContent:'space-evenly'}}>
           <View style={{height:10, width:10, borderRadius:100, backgroundColor:'#ff5f57'}}/>
           <View style={{height:10, width:10, borderRadius:100, backgroundColor:'#febc2c'}}/>
           <View style={{height:10, width:10, borderRadius:100, backgroundColor:'#27c940'}}/>
          </View>
        </View>
        <KeyboardAwareScrollView style={styles.container_sign2}>
            <Text style={styles.datetext}>   { date1 }</Text>
            <TextInput style={styles.to} placeholder='누구에게 닿을 편지인가요?'
                    onChangeText={setTo} value={to}/>
            <Text style={{height: 10}}/>
            <TextInput style={styles.to} placeholder='오늘의 제목'
                          onChangeText={setTitle} value={title}/>
            <Text style={{height: 10}}/>
            <TextInput style={styles.letter} placeholder="전하고 싶은 말"
                  onChangeText={setLetter} value={letter} multiline={true}/>
            <View style={{alignItems:'flex-end', padding:10}}>
              <Button color='#D8BFD8' title="save" onPress={save_letter}/>
            </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex:1,
    marginTop: 10,
    backgroundColor: '#D8BFD8',
  },
  box: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  datetext: {
    fontSize: 17,
    marginVertical: 10,
    color: '#B0B0B0',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 15,
    height:150,
    backgroundColor:'#FFE4E1',
    marginHorizontal: 10,
    color: 'black',
    padding: 10,
    paddingTop: 10,
    borderRadius: 10,
  },
  to: {
    backgroundColor:'#FFE4E1',
    height: 40,
    marginHorizontal: 10,
    fontSize: 13,
    color: 'black',
    borderRadius: 10,
    padding:10,
    shadowColor: 'black',
    shadowOpacity: 0.7,
    shadowOffset:{width:2, height:2},
  },
  letter: {
    height:480,
    backgroundColor:'#FFE4E1',
    marginHorizontal: 10,
    fontSize: 13,
    color: 'black',
    flexShrink:1,
    textAlignVertical: "top",
    padding: 10,
    paddingTop: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.7,
    shadowOffset:{width:2, height:2},
   },
});