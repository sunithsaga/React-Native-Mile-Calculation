import React from 'react';
import { StyleSheet, View } from 'react-native';

import { HeaderComponent } from '@/components/header';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';

const styles = StyleSheet.create({
    ctaButtonToggle: {
        marginTop: "20%",
    },
    ctaButton: {
        marginTop: "20%",
    },
})

const HomeComponent = () => {
    const [startLocation, setStartLocation] = React.useState("");
     const [toLocation, setToLocation] = React.useState("");
    const [value, setValue] = React.useState('');
  return (

    <View >
<HeaderComponent/>

  <view style={{padding:40, marginTop:30, width:'80%'}}>
   <TextInput
      label="Enter start location"
      value={startLocation}
      mode='outlined'
      onChangeText={text => setStartLocation(text)}
      right={<TextInput.Icon icon="close" onPress={() => setStartLocation("")} />}
    />
    <TextInput
    style={{marginTop:30}}
      label="Enter end location"
      value={toLocation}
      mode='outlined'
      onChangeText={text => setToLocation(text)}
      right={<TextInput.Icon icon="close" onPress={() => setToLocation("")} />}
    />

    <Button  mode="contained" onPress={() => console.log('Pressed')} style={styles.ctaButton}>
   Calculate Miles
  </Button>

  <View style={styles.ctaButtonToggle}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'mile',
            label: 'Miles',
          },
          {
            value: 'KM',
            label: 'Kilometres',
          }
        ]}
      />
    </View>
  </view>

    </View>

  );
};


export default HomeComponent;