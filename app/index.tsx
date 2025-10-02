import React, { use, useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { HeaderComponent } from '@/components/ui';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';
import { CityList } from '@/services/api';
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
} from 'react-native-autocomplete-dropdown';
import { Typehead } from '@/components/common';

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  inputWrapper: {
    width: '80%',
  },
  ctaButtonToggle: {
    marginTop: '10%',
  },
  ctaButton: {
    marginTop: '10%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

const HomeComponent = () => {
  const [startLocation, setStartLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [value, setValue] = useState('');
  const [citySuggestions, setCitySuggestions] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState(null);
  let dropdownData: any[] = [];

  // Debounced API call
  useEffect(() => {
    if (startLocation.length < 2) {
      setCitySuggestions([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      getCityDetails(startLocation);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [startLocation]);

  const getCityDetails = (text: string) => {
    CityList(text).then((res) => {
      if (res && res.data) {
        setCitySuggestions(res.data); // Store the API response
        console.log('City suggestions:', res.data);
      }
    }).catch((err) => {
      console.log('Error fetching cities:', err);
    });
  };

  const handleStartLocationChange = (text: string) => {
    setStartLocation(text);
  };

  return (
    <View>
      <HeaderComponent />
      <View style={styles.centerContainer}>
        <Typehead
          data={citySuggestions}
          onSelect={(item) => {
            console.log('Selected item:', item);
            setStartLocation(item.name);
          }}
          placeholder="Enter start location"
          onInputChange={handleStartLocationChange}
        />
        <TextInput
          style={{ marginTop: 30 }}
          label="Enter end location"
          value={toLocation}
          mode="outlined"
          onChangeText={(text) => setToLocation(text)}
          right={<TextInput.Icon icon="close" onPress={() => setToLocation('')} />}
        />

        <Button mode="contained" onPress={() => console.log('Pressed')} style={styles.ctaButton}>
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
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeComponent;
