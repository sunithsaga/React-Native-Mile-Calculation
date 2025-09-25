import React from 'react';
import { View } from 'react-native';

import { HeaderComponent } from '@/components/header';
import { Button, TextInput } from 'react-native-paper';

const HomeComponent = () => {
    const [text, setText] = React.useState("");
  return (

    <View >
<HeaderComponent/>

  <view style={{padding:40, marginTop:30, width:'80%'}}>
   <TextInput
      label="Enter start location"
      value={text}
      mode='outlined'
     
      onChangeText={text => setText(text)}
    />
    <TextInput
    style={{marginTop:30}}
      label="Enter end location"
      value={text}
      mode='outlined'
      onChangeText={text => setText(text)}
    />

    <Button  mode="contained" onPress={() => console.log('Pressed')}>
   Calculate Miles
  </Button>
  </view>

    </View>

  );
};


export default HomeComponent;