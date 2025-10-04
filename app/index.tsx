import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  PaperProvider,
  Portal,
  SegmentedButtons,
  Surface,
  Text,
} from 'react-native-paper';

import { HeaderComponent } from '@/components/ui';
import { CityList, GetMileDetails } from '@/services/api';
import { Typehead } from '@/components/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  centerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  typeahead: {
    width: '100%',
    marginBottom: 20,
  },
  ctaButton: {
    width: '100%',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 20,
  },
  ctaButtonLabel: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  surface: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 4,
    width: '60%',
  },
  distanceText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  segmentContainer: {
    marginTop: 10,
    width: '60%',
  },
  dialogTitle: { textAlign: 'center' },
});

const HomeComponent = () => {
  const [startLocation, setStartLocation] = useState(0);
  const [toLocation, setToLocation] = useState(0);
  const [citySuggestions, setCitySuggestions] = useState<any[]>([]);
  const [distance, setDistance] = useState(0);
  const [suggestion, setSuggestion] = useState('');
  const [dimension, setDimension] = useState<'mile' | 'KM'>('mile');
  const [errorVisible, setErrorVisible] = useState(false);
  const [endLocationInput, setEndLocationInput] = useState('');
  const [startLocationInput, setStartLocationInput] = useState('');

  useEffect(() => {
    if (suggestion.length < 2) {
      setCitySuggestions([]);
      return;
    }
    getCityDetails(suggestion);
  }, [suggestion]);

  const getCityDetails = (text: string) => {
    if(text==='') return; 
    CityList(text)
      .then((res) => {
        if (res && res.data) {
          setCitySuggestions(res.data);
        }
      })
      .catch((err) => {
        setErrorVisible(true);
      });
  };

  const handleLocationChange = (text: string) => {
    setSuggestion(text);
  };

  const calculateMiles = () => {
    if(startLocation===0 || toLocation===0) return;
    GetMileDetails(startLocation, toLocation)
      .then((res) => {
        setDistance(res.data);
      })
      .catch((err) => {
        setErrorVisible(true);
      });
  };

  const handleDimensionChange = (value: 'mile' | 'KM') => {
    if (dimension !== value) {
      if (value === 'KM') {
        setDistance((prev) => Number((prev * 1.6).toFixed(2)));
      } else {
        setDistance((prev) => Number((prev / 1.6).toFixed(2)));
      }
      setDimension(value);
    }
  };
  const hideDialog = () => setErrorVisible(false);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <HeaderComponent />
        <View style={styles.centerContainer}>
          {/* Start Location */}
          <View style={styles.typeahead}>
            <Typehead
              data={citySuggestions}
              value={startLocationInput}
              onValueChange={setStartLocationInput}
              onSelect={(item) => {
                setStartLocation(item.id);
                setStartLocationInput(item.name); // Set selected name
              }}
              placeholder="Enter start location"
              onInputChange={handleLocationChange}
              clearField={function (): void {
                setStartLocation(0);
              }}
            />
          </View>

          {/* End Location */}
          <View style={styles.typeahead}>
            <Typehead
              data={citySuggestions}
              value={endLocationInput}
              onValueChange={setEndLocationInput}
              onSelect={(item) => {
                setToLocation(item.id);
                setEndLocationInput(item.name); // Set selected name
              }}
              placeholder="Enter end location"
              onInputChange={handleLocationChange}
              clearField={function (): void {
                setToLocation(0);
              }}
            />
          </View>

          {/* Calculate Button */}
          <Button
            mode="contained"
            onPress={calculateMiles}
            style={styles.ctaButton}
            labelStyle={styles.ctaButtonLabel}
          >
            Calculate Distance
          </Button>

          {/* Distance Display */}
          <Surface style={styles.surface}>
            <Text style={styles.distanceText}>
              {distance} {dimension === 'KM' ? 'km' : 'mi'}
            </Text>
          </Surface>

          {/* Unit Toggle */}
          <View style={styles.segmentContainer}>
            <SegmentedButtons
              value={dimension}
              onValueChange={handleDimensionChange}
              buttons={[
                { value: 'mile', label: 'Miles' },
                { value: 'KM', label: 'KM' },
              ]}
            />
          </View>
          {/* Error Dialog */}
          <Portal>
            <Dialog visible={errorVisible} onDismiss={hideDialog}>
              <Dialog.Icon icon="alert" />
              <Dialog.Title style={styles.dialogTitle}>Error</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">Something went wrong please check later</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Close</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </View>
    </PaperProvider>
  );
};

export default HomeComponent;
