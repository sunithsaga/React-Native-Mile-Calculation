import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

interface TypeaheadItem {
  id: number;
  name: string;
  country: string;
}

interface TypeaheadProps {
  data: TypeaheadItem[];
  onSelect: (item: TypeaheadItem) => void;
  placeholder?: string;
  onInputChange: (text: string) => void;
  clearField: () => void;
  value: string; // controlled input
  onValueChange: (val: string) => void; // handler for input value
}

export default function Typeahead({
  data,
  onSelect,
  placeholder = 'Type to search...',
  onInputChange,
  clearField,
  value,
  onValueChange
}: TypeaheadProps) {
  const [filtered, setFiltered] = useState<TypeaheadItem[]>([]);

  useEffect(() => {
    if (value?.length >= 2) {
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(filteredData);
    } else {
      setFiltered([]);
    }
  }, [value, data]);

  const handleSelect = (item: TypeaheadItem) => {
    const text = `${item.name}, ${item.country}`;
    onValueChange(text); 
    setFiltered([]);
    onSelect(item);
  };

  const handleClear = () => {
    onValueChange('');    // clear input field
    setFiltered([]);      // clear suggestions
    clearField();         // call parent clear logic (e.g., setToLocation(0))
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => {
          onValueChange(text);
          onInputChange?.(text);
        }}
        right={
          value.length > 0 ? (
            <TextInput.Icon icon="close" style={styles.texticon} onPress={handleClear} />
          ) : null
        }
      />

      {filtered.length > 0 && (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          style={styles.suggestions}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text style={styles.suggestionItem}>{item.name}, {item.country}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  suggestions: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
    width: '100%',
    zIndex: 100,
    borderWidth: 1,
    borderColor: '#aaa',
    borderTopWidth: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  texticon: {
    marginTop: 10,
  },
});