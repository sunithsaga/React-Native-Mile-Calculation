import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

interface Location  {
  latitude: number;
  longitude: number;
};

interface RouteMapProps  {
  fromLocation: Location;
  toLocation: Location;
}

export default function RouteMap({ fromLocation, toLocation }:RouteMapProps)   {

  const initialRegion = {
          ...fromLocation,
          latitudeDelta: 0.2,
          longitudeDelta: 0.5,
          }

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates([fromLocation, toLocation], {
        edgePadding: {
          top: 80,
          right: 80,
          bottom: 80,
          left: 80,
        },
        animated: true,
      });
    }
  }, []);

  return (
    <View>
      map will be here
     </View> 
    // <View style={styles.container}>
    //   <MapView
    //     ref={mapRef}
    //     style={styles.map}
    //     initialRegion={initialRegion}
    //   >
    //     <Marker coordinate={fromLocation} title="From" description="Start Location" />
    //     <Marker coordinate={toLocation} title="To" description="End Location" />

    //     <Polyline
    //       coordinates={[fromLocation, toLocation]}
    //       strokeColor="#000"
    //       strokeWidth={3}
    //     />
    //   </MapView>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

