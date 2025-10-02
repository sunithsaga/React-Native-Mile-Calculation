import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TypeaheadItem {
  id: number;
  name: string;
}

interface TypeaheadProps {
  data: TypeaheadItem[];
  onSelect: (item: TypeaheadItem) => void;
  placeholder?: string;
  onInputChange?: (text: string) => void
}

export default function Typeahead({ data, onSelect, placeholder = "Type to search...", onInputChange }: TypeaheadProps) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<TypeaheadItem[]>([]);
  console.log(data,'data in typehead');

  const handleInput = (text:string) => {

    setQuery(text);
    if (!text) {
      setFiltered([]);
      return;
    }
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    console.log(filteredData,'filteredData');
    setFiltered(filteredData);
    onInputChange?.(text); 
  };

  const handleSelect = (item: TypeaheadItem) => {
    setQuery(item.name);
    setFiltered([]);
    onSelect && onSelect(item);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={query}
        onChangeText={handleInput}
      />
      {filtered.length > 0 && (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id.toString()}
          style={styles.suggestions}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text style={styles.suggestionItem}>{item.name}</Text>
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
});

function onInputChange(text: string) {
  throw new Error('Function not implemented.');
}
