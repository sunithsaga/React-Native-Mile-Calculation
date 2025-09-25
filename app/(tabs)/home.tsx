import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from "react-native-paper";

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#fff",
    elevation: 4, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  header: {
    backgroundColor: "#6200ee", // theme color
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
  },
  headingSection: {
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
  },
  headingText: {
    fontWeight: "600",
    color: "#333",
  },
});

const HomeComponent = () => {
  return (
        <View style={styles.headerContainer}>
      <Appbar.Header style={styles.header} mode='center-aligned'>
        <Appbar.Content title="Mile Calculator" titleStyle={styles.headerTitle} />
      </Appbar.Header>


    </View>
  );
};


export default HomeComponent;