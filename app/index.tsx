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
  const [startLocation, setStartLocation] = useState(0);
  const [toLocation, setToLocation] = useState(0);
  const [value, setValue] = useState('');
  const [citySuggestions, setCitySuggestions] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestion, setSuggestion] = useState('');

  // Debounced API call
  useEffect(() => {
    if (suggestion.length < 2) {
      setCitySuggestions([]);
      return;
    }

    getCityDetails(suggestion);

  }, [suggestion]);

  const getCityDetails = (text: string) => {
    CityList(text)
      .then((res) => {
        if (res && res.data) {
          setCitySuggestions(res.data); // Store the API response
          console.log('City suggestions:', res.data);
        }
      })
      .catch((err) => {
        console.log('Error fetching cities:', err);
      });
  };

  
  const handleLocationChange = (text: string) => {
    console.log('To location changed:', text);
    setSuggestion(text);
  }
  const calculateMiles = () => { 
    console.log('Calculating miles from', startLocation, 'to', toLocation, 'in', value);
   }

  return (
    <View>
      <HeaderComponent />
      <View style={styles.centerContainer}>
        <Typehead
          data={citySuggestions}
          onSelect={(item) => {
            setStartLocation(item.id);
          }}
          placeholder="Enter start location"
          onInputChange={handleLocationChange}
        />

        <Typehead
          data={citySuggestions}
          onSelect={(item) => {
            console.log('To location selected:', item);
            setToLocation(item.id);
          }}
          placeholder="Enter start location"
          onInputChange={handleLocationChange}
        />

        <Button mode="contained" onPress={calculateMiles} style={styles.ctaButton}>
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
