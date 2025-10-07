import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
